import type { Education, Metric, Profile } from '../types/portfolio';

export const profile: Profile = {
  name: 'Sachin Kumar',
  title: 'Senior Software Engineer',
  location: 'Mumbai, Maharashtra, India',
  email: 'sachinsingh.kumar07@gmail.com',
  phone: '+91 7667456574',
  tagline: 'I build backends and AI agents that stay fast and correct under load.',
  intro:
    '3+ years designing and scaling high-concurrency distributed systems and agentic AI pipelines in Go, Python and Node.js, across trading platforms, streaming analytics and LLM agents.',
  summary:
    'Software Engineer with **3+ years** of experience designing and scaling **high-concurrency distributed systems** and **agentic AI** pipelines using **Go**, **Python**, and **Node.js**. Proven track record architecting multi-stage LLM agents (**LangGraph**), **low-latency** trading engines, and streaming analytics pipelines processing **millions** of events via **Kafka**, **Flink**, and **ClickHouse**. Specialized in backend performance tuning, concurrency control, and **zero-hallucination AI system design**.',
  resume: {
    href: `${import.meta.env.BASE_URL}Sachin_Kumar-SDE.pdf`,
    downloadName: 'Sachin-Kumar-Senior-Software-Engineer-Resume.pdf',
  },
  socials: [
    { label: 'GitHub', href: 'https://github.com/sks-7', handle: 'Sachin Kumar' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sachin-kumar-2a8a47231/',
      handle: 'Sachin Kumar',
    },
    {
      label: 'LeetCode',
      href: 'https://leetcode.com/u/sachinkumarsingh725/',
      handle: 'Sachin Kumar',
    },
  ],
};

/** Headline numbers shown in the hero — each one appears verbatim in the resume. */
export const headlineMetrics: Metric[] = [
  { value: '3+ yrs', label: 'designing & scaling distributed systems' },
  { value: '30%', label: 'lower API latency via Redis caching & concurrency tuning' },
  { value: '40%', label: 'lower LLM token consumption' },
  { value: '5k–10k', label: 'real-time dispatches processed daily' },
];

export const education: Education[] = [
  {
    institution: 'Veer Kunwar Singh University',
    credential: 'B.Sc. (Hons) in Mathematics',
    period: 'Sep 2018 – Sep 2022',
  },
  {
    institution: 'Masai School',
    credential: 'Certification in Full Stack Web Development',
    period: 'Feb 2022 – Feb 2023',
  },
];
