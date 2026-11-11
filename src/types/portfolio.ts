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
  /** Recruiter-facing positioning line shown under the name in the hero. */
  headline: string;
  /** Short focus tags revealed one by one in the hero. */
  focusTags: string[];
  /** Shown in the hero terminal's JSON response. Edit freely. */
  availability: string;
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

export type ProjectCategory = 'ai' | 'backend';

/** One hop in a project's architecture diagram. `kind` picks colour and icon. */
export interface PipelineStep {
  label: string;
  detail: string;
  kind: 'client' | 'guard' | 'llm' | 'service' | 'queue' | 'store';
}

export interface CaseStudy {
  id: string;
  category: ProjectCategory;
  pipeline: PipelineStep[];
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
  /** Which half of the skills matrix the group belongs to. */
  domain: 'core' | 'ai' | 'backend';
  items: string[];
}

export interface FeaturedSkill {
  name: string;
  kind: 'lang' | 'ai' | 'backend' | 'data' | 'cloud';
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
