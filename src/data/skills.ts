import type { Principle, SkillGroup } from '../types/portfolio';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages & Core',
    items: ['Go', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    title: 'AI & Agentic Systems',
    items: [
      'LangGraph',
      'Multi-Agent Orchestration',
      'Tool Calling',
      'RAG',
      'Agent Memory',
      'Guardrails',
      'Human-in-the-Loop',
      'Context/Token Optimization',
    ],
  },
  {
    title: 'Frameworks & Runtimes',
    items: ['Gin', 'Fiber', 'FastAPI', 'NestJS', 'Express', 'Next.js', 'Vue.js', 'Angular / Ionic', 'Node.js'],
  },
  {
    title: 'Distributed Systems & Messaging',
    items: [
      'Apache Kafka',
      'RabbitMQ',
      'BullMQ',
      'Apache Flink',
      'Redis Pub/Sub',
      'Microservices Architecture',
      'Rate Limiting',
    ],
  },
  {
    title: 'Databases & Storage',
    items: ['PostgreSQL', 'ClickHouse', 'StarRocks', 'TimescaleDB', 'MongoDB', 'MS-SQL', 'Redis'],
  },
  {
    title: 'DevOps, Cloud & Monitoring',
    items: ['Docker', 'AWS', 'GCP', 'CI/CD (Jenkins)', 'Datadog', 'k6', 'SonarQube'],
  },
];

/** How I work, each point grounded in a specific resume bullet. */
export const principles: Principle[] = [
  {
    title: 'Measure, then optimize',
    body: 'p95/p99 profiling with Datadog and k6 load tests came before the Redis caching and concurrency changes that cut API latency by 30%.',
  },
  {
    title: 'Correctness over fluency in AI',
    body: 'Guardrail models, deterministic validators and 73 pytest tests keep an LLM agent from returning numbers it cannot back up.',
  },
  {
    title: 'Keep the hot path light',
    body: 'Heavy work goes to RabbitMQ and Kafka. Moving background compute off the primary database reduced contention by 10%.',
  },
  {
    title: 'Concurrency with guardrails',
    body: 'Worker semaphores bound fan-out, goroutine leaks get eliminated, and an in-memory rate limiter avoids needless network hops.',
  },
  {
    title: 'Design for real-world conditions',
    body: 'An offline-first SQLite app with an async sync queue kept field agents productive, with a 40% efficiency gain.',
  },
  {
    title: 'Automate the toil',
    body: 'Scheduled jobs, an invoice generator (~1,000 bills a day) and a SonarQube-backed PR security scanner remove repetitive manual work.',
  },
];
