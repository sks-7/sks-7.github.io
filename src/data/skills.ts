import type { FeaturedSkill, Principle, SkillGroup } from '../types/portfolio';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages & Core',
    domain: 'core',
    items: ['Go', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    title: 'AI & Agentic Systems',
    domain: 'ai',
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
    domain: 'backend',
    items: ['Gin', 'Fiber', 'FastAPI', 'NestJS', 'Express', 'React', 'Next.js', 'Vue.js', 'Angular / Ionic', 'Node.js'],
  },
  {
    title: 'Distributed Systems & Messaging',
    domain: 'backend',
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
    domain: 'backend',
    items: ['PostgreSQL', 'ClickHouse', 'StarRocks', 'TimescaleDB', 'MongoDB', 'MS-SQL', 'Redis'],
  },
  {
    title: 'DevOps, Cloud & Monitoring',
    domain: 'backend',
    items: ['Docker', 'AWS', 'GCP', 'CI/CD (Jenkins)', 'Datadog', 'k6', 'SonarQube'],
  },
];

/**
 * The 20 headline skills cycled by the stack scanner on the portrait. Names
 * must match an entry in `skillGroups` exactly (warned about in dev mode).
 */
export const featuredStack: FeaturedSkill[] = [
  { name: 'Go', kind: 'lang' },
  { name: 'Python', kind: 'lang' },
  { name: 'TypeScript', kind: 'lang' },
  { name: 'Node.js', kind: 'backend' },
  { name: 'LangGraph', kind: 'ai' },
  { name: 'RAG', kind: 'ai' },
  { name: 'FastAPI', kind: 'backend' },
  { name: 'NestJS', kind: 'backend' },
  { name: 'Gin', kind: 'backend' },
  { name: 'React', kind: 'backend' },
  { name: 'Next.js', kind: 'backend' },
  { name: 'Apache Kafka', kind: 'data' },
  { name: 'RabbitMQ', kind: 'data' },
  { name: 'Apache Flink', kind: 'data' },
  { name: 'Redis', kind: 'data' },
  { name: 'PostgreSQL', kind: 'data' },
  { name: 'ClickHouse', kind: 'data' },
  { name: 'Docker', kind: 'cloud' },
  { name: 'AWS', kind: 'cloud' },
  { name: 'GCP', kind: 'cloud' },
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

if (import.meta.env.DEV) {
  const known = new Set(skillGroups.flatMap((group) => group.items));
  const unknown = featuredStack.filter((skill) => !known.has(skill.name)).map((skill) => skill.name);
  if (unknown.length) console.warn('featuredStack names missing from skillGroups:', unknown);
}
