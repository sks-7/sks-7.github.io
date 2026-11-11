import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: 0 | 1;
}

interface Packet {
  from: number;
  to: number;
  t: number;
  speed: number;
}

const LINK_DISTANCE = 130;
const POINTER_RADIUS = 180;
const MAX_PACKETS = 7;

function hexToRgb(value: string): string {
  const hex = value.trim().replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(hex)) return '0 240 255';
  const n = parseInt(hex, 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

function readPalette() {
  const css = getComputedStyle(document.documentElement);
  return {
    cyan: hexToRgb(css.getPropertyValue('--accent')),
    violet: hexToRgb(css.getPropertyValue('--accent-2')),
    green: hexToRgb(css.getPropertyValue('--metric')),
  };
}

/**
 * Decorative neural-network mesh for the hero: drifting nodes, links between
 * neighbours, data packets travelling along links and a spotlight that follows
 * the cursor. Runs only while visible; reduced-motion visitors get one static frame.
 */
export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let palette = readPalette();
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    const packets: Packet[] = [];
    const pointer = { x: -9999, y: -9999, active: false };
    let frame = 0;
    let running = false;
    let onScreen = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Density scales with area, capped so phones stay light.
      const count = Math.min(Math.round((width * height) / 15000), width < 640 ? 34 : 72);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.4 + 0.8,
        hue: Math.random() < 0.7 ? 0 : 1,
      }));
      packets.length = 0;
    };

    const spawnPacket = () => {
      const from = Math.floor(Math.random() * nodes.length);
      const a = nodes[from];
      if (!a) return;
      let best = -1;
      let bestDist = Infinity;
      nodes.forEach((b, i) => {
        if (i === from) return;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < LINK_DISTANCE && d > 40 && d < bestDist) {
          best = i;
          bestDist = d;
        }
      });
      if (best >= 0) packets.push({ from, to: best, t: 0, speed: 0.012 + Math.random() * 0.012 });
    };

    const draw = (animate: boolean) => {
      ctx.clearRect(0, 0, width, height);

      // Cursor spotlight.
      if (pointer.active) {
        const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 320);
        glow.addColorStop(0, `rgb(${palette.cyan} / 0.10)`);
        glow.addColorStop(0.5, `rgb(${palette.violet} / 0.05)`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }

      for (const n of nodes) {
        if (animate) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          // Gentle pull toward the cursor.
          if (pointer.active) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const d = Math.hypot(dx, dy);
            if (d < POINTER_RADIUS && d > 1) {
              n.x += (dx / d) * 0.18;
              n.y += (dy / d) * 0.18;
            }
          }
        }
      }

      // Links between neighbours.
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK_DISTANCE) {
            ctx.strokeStyle = `rgb(${palette.cyan} / ${(1 - d / LINK_DISTANCE) * 0.16})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // Links to the cursor.
        if (pointer.active) {
          const d = Math.hypot(a.x - pointer.x, a.y - pointer.y);
          if (d < POINTER_RADIUS) {
            ctx.strokeStyle = `rgb(${palette.violet} / ${(1 - d / POINTER_RADIUS) * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(pointer.x, pointer.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgb(${n.hue ? palette.violet : palette.cyan} / 0.75)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Data packets travelling along links.
      if (animate) {
        if (packets.length < MAX_PACKETS && Math.random() < 0.06) spawnPacket();
        for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i]!;
          p.t += p.speed;
          const a = nodes[p.from];
          const b = nodes[p.to];
          if (!a || !b || p.t >= 1) {
            packets.splice(i, 1);
            continue;
          }
          const x = a.x + (b.x - a.x) * p.t;
          const y = a.y + (b.y - a.y) * p.t;
          ctx.fillStyle = `rgb(${palette.green} / 0.95)`;
          ctx.shadowColor = `rgb(${palette.green})`;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(x, y, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    };

    const loop = () => {
      draw(true);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion || !onScreen || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => {
      resize();
      if (!running) draw(false);
    };

    resize();
    draw(false);
    start();

    const io = new IntersectionObserver(([entry]) => {
      onScreen = !!entry?.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    io.observe(canvas);

    // Recolour when the theme switches.
    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      if (!running) draw(false);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 size-full" />;
}
