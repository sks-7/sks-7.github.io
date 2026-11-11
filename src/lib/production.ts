import { experience } from '../data/experience';

/** Skill names that appear under a different spelling in role stacks. */
const ALIASES: Record<string, string> = {
  'Tool Calling': 'LLM Tool Calling',
  'Multi-Agent Orchestration': 'AI Agents',
  'MS-SQL': 'MS SQL Server',
  GCP: 'Google Cloud Platform',
  AWS: 'AWS S3',
  'Rate Limiting': 'Token Bucket Rate Limiting',
};

const companiesBySkill = new Map<string, string[]>();
for (const role of experience) {
  for (const item of role.stack) {
    const key = item.toLowerCase();
    companiesBySkill.set(key, [...(companiesBySkill.get(key) ?? []), role.company]);
  }
}

/**
 * Companies where a skill was used in a listed role, or [] if it only appears
 * on the skills list. Drives the "production" badges in the skills matrix.
 */
export function usedAt(skill: string): string[] {
  return companiesBySkill.get((ALIASES[skill] ?? skill).toLowerCase()) ?? [];
}
