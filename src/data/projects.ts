import type { CaseStudy, Metric } from '../types/portfolio';

/**
 * Case studies of work described in the resume. These are client/employer
 * systems, so there is no public source code or live demo to link to.
 */
export const caseStudies: CaseStudy[] = [
  // TODO(Nov 2026): uncomment (Atrina role hidden for now)
  // {
  //   id: 'agentic-assistant',
  //   title: 'Agentic Financial Assistant',
  //   context: 'Atrina Technology · Client: 1 Finance',
  //   problem:
  //     'A financial assistant spanning **7 crypto exchanges**, where every number it returns has to match live data rather than an LLM guess.',
  //   contribution: [
  //     'Architected the agent in **Python** with **LangGraph** and **FastAPI**.',
  //     'Built **10 JWT-secured tools** that call **Go** backend services over **httpx**, with strict output validation against live DB state.',
  //     'Ported the core engine to **Node.js** with state checkpointing, per-user memory and **human-in-the-loop** approvals.',
  //   ],
  //   decisions: [
  //     'A **5-stage validation pipeline**: a **20B** guardrail model filters malicious queries before a **120B** reasoning model executes tools.',
  //     '**Deterministic validators** check results so the assistant returns **zero hallucinated numbers**.',
  //     '**Windowed context buffering** keeps only the **last 6 turns** in context.',
  //   ],
  //   results: [
  //     { value: '40%', label: 'lower LLM token consumption' },
  //     { value: '73', label: 'pytest unit & integration tests' },
  //     { value: '10', label: 'JWT-secured tools' },
  //   ],
  //   stack: ['Python', 'LangGraph', 'FastAPI', 'Pydantic', 'httpx', 'pytest', 'Go', 'Node.js'],
  // },
  {
    id: 'trading-platform',
    title: 'Unlisted Equity Trading Backend',
    context: 'Winsoft Technologies · Client: Choice Broking',
    problem:
      'Core services for an unlisted equity trading platform: order matching, placement and settlement have to be **ACID-compliant** and low-latency.',
    contribution: [
      'Built core **Go** (**Gin**, **GORM**) backend services implementing order matching, placement and settlement on **MS-SQL**.',
      'Profiled **p95/p99** latencies with **Datadog** and **k6** load tests.',
      'Implemented an in-memory **token-bucket rate limiter** in Go.',
    ],
    decisions: [
      'Targeted **Redis** caching plus fine-grained concurrency control with **goroutines, channels and sync.Mutex**.',
      'Rate limiting **in memory** gives burst handling without a **Redis network round-trip** on every request.',
    ],
    results: [{ value: '30%', label: 'lower API latency' }],
    stack: ['Go', 'Gin', 'GORM', 'MS SQL Server', 'Redis', 'Datadog', 'k6'],
  },
  {
    id: 'streaming-analytics',
    title: 'Real-time Trade Streaming & Notifications',
    context: 'Winsoft Technologies · Client: Choice Broking',
    problem:
      'Processing **millions** of notification messages and streaming real-time trade data fast enough for **sub-second analytics**.',
    contribution: [
      'Engineered an asynchronous **notification service** processing millions of messages via **RabbitMQ** and **Kafka**.',
      'Integrated **Apache Flink** to stream real-time trade data into **StarRocks** and **ClickHouse**.',
    ],
    decisions: [
      'Kept notification delivery **asynchronous**, behind message queues.',
      'Streamed trade data into columnar stores (**StarRocks**, **ClickHouse**) for **sub-second analytics**.',
    ],
    results: [{ value: 'Millions', label: 'of messages processed' }],
    stack: ['Apache Kafka', 'RabbitMQ', 'Apache Flink', 'StarRocks', 'ClickHouse'],
  },
  {
    id: 'field-ops',
    title: 'Offline-first Field Operations',
    context: 'Pivotroots',
    problem:
      'Field agents needed a mobile-friendly app that keeps working **offline**, plus automated checks on vehicle telemetry and live fleet tracking.',
    contribution: [
      'Built an **offline-first** web app on **SQLite** with an **asynchronous sync queue**, backed by **20+ Go/Node.js REST** endpoints.',
      'Deployed an **AI-powered OCR** and vision verification system for vehicle odometer and breathalyzer telemetry.',
      'Automated scheduled batch notifications and recurring jobs, plus a role-based image validation pipeline.',
    ],
    decisions: [
      'Moved heavy background compute onto **RabbitMQ** queues to take load off the primary database.',
      'Used **GCP Cloud Scheduler** and **Google Maps APIs** for scheduling and **live fleet tracking**.',
    ],
    results: [
      { value: '40%', label: 'field-agent efficiency gain' },
      { value: '30%', label: 'less operational workload' },
      { value: '20%', label: 'shorter lead review cycles' },
      { value: '10%', label: 'fewer data entry errors' },
      { value: '10%', label: 'less DB contention' },
    ],
    stack: ['Go', 'Node.js', 'SQLite', 'RabbitMQ', 'GCP', 'Google Maps APIs'],
  },
];

/** Smaller systems from the resume, shown as compact cards. */
export const otherWork: Array<{ title: string; body: string; metric?: Metric; stack: string[] }> = [
  {
    title: 'Courier tracking system',
    body: 'High-throughput tracking of real-time status dispatches through **RabbitMQ**.',
    metric: { value: '5k–10k', label: 'dispatches / day' },
    stack: ['Go', 'Next.js', 'RabbitMQ'],
  },
  {
    title: 'Internal automation services',
    body: 'An automated invoice generator and a custom pull-request security scanner integrated with **SonarQube**.',
    metric: { value: '~1,000', label: 'bills / day' },
    stack: ['FastAPI', 'Python', 'SonarQube'],
  },
  {
    title: 'Go microservices fleet',
    body: 'Maintained and optimized Go services on **Redis pub/sub**: removed goroutine leaks and bounded fan-out with worker **semaphores**.',
    metric: { value: '7', label: 'Go microservices' },
    stack: ['Go', 'Redis Pub/Sub'],
  },
  {
    title: 'Wealth-advisory CMS',
    body: '3 NestJS CMS modules for a wealth-advisory platform, with **S3** storage served via private **CloudFront** and signed URLs.',
    metric: { value: '570+', label: 'APIs on the platform' },
    stack: ['NestJS', 'AWS S3', 'CloudFront'],
  },
];
