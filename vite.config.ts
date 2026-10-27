import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const RESUME_SOURCE = fileURLToPath(
  new URL('./src/Assests/Sachin_Kumar-SDE.pdf', import.meta.url),
);
const RESUME_PUBLIC_NAME = 'Sachin_Kumar-SDE.pdf';

/**
 * Serves the resume at a stable, un-hashed URL (/Sachin_Kumar-SDE.pdf) while
 * keeping src/Assests/Sachin_Kumar-SDE.pdf as the single file to update.
 */
function resumePlugin(): Plugin {
  return {
    name: 'portfolio-resume',
    configureServer(server) {
      server.middlewares.use(`/${RESUME_PUBLIC_NAME}`, (_req, res) => {
        res.setHeader('Content-Type', 'application/pdf');
        res.end(readFileSync(RESUME_SOURCE));
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: RESUME_PUBLIC_NAME,
        source: readFileSync(RESUME_SOURCE),
      });
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), resumePlugin()],
  build: {
    // GitHub Actions workflow uploads ./build to GitHub Pages.
    outDir: 'build',
  },
});
