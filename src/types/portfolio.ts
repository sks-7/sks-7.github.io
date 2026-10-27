/**
 * Content model for the portfolio. Text fields may contain **bold** markers,
 * rendered by <RichText>. All content comes from the resume PDF.
 */

export interface SocialLink {
  label: 'GitHub' | 'LinkedIn' | 'LeetCode';
  href: string;
  handle: string;
}

export interface Profile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
  tagline: string;
  intro: string;
  resume: {
    href: string;
    downloadName: string;
  };
  socials: SocialLink[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface Role {
  id: string;
  company: string;
  client?: string;
  title: string;
  start: string;
  end: string;
  location: string;
  current?: boolean;
  metrics: Metric[];
  highlights: string[];
  stack: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  context: string;
  problem: string;
  contribution: string[];
  decisions: string[];
  results: Metric[];
  stack: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Principle {
  title: string;
  body: string;
}

export interface Education {
  institution: string;
  credential: string;
  period: string;
}
