import type { CsfId } from './csf';

/** Self-check questions (Identify). Each answer is a 0–2 maturity score. */
export interface Question {
  id: string;
  csf: CsfId;
  group: 'situation' | 'training';
  text: string;
}

export const SCALE = [
  { value: 0, label: 'Not yet' },
  { value: 1, label: 'Partly' },
  { value: 2, label: 'Yes' },
] as const;

export const QUESTION_GROUPS = {
  situation: {
    title: 'Current situation',
    goal: 'Identify the most important challenges and where support is needed.',
  },
  training: {
    title: 'Training & emergency response',
    goal: 'Check how training, threat coverage and incident reporting are set up.',
  },
} as const;

export const QUESTIONS: readonly Question[] = [
  { id: 's1', csf: 'govern', group: 'situation', text: 'Is the biggest cybersecurity challenge clearly named and owned by someone?' },
  { id: 's2', csf: 'identify', group: 'situation', text: 'Are existing security measures documented, and are the biggest gaps known?' },
  { id: 's3', csf: 'recover', group: 'situation', text: 'Have past phishing incidents or outages been reviewed for lessons learned?' },
  { id: 's4', csf: 'protect', group: 'situation', text: 'Are access rights for volunteers managed and removed when they leave?' },
  { id: 's5', csf: 'detect', group: 'situation', text: 'Is digital security awareness among staff and volunteers regularly assessed?' },
  { id: 's6', csf: 'govern', group: 'situation', text: 'Are internal IT expertise and budget known – including where external support is needed?' },
  { id: 't1', csf: 'protect', group: 'training', text: 'Are employees and volunteers currently trained in cybersecurity?' },
  { id: 't2', csf: 'protect', group: 'training', text: 'Is there a short, hands-on training format (instead of long presentations)?' },
  { id: 't3', csf: 'detect', group: 'training', text: 'Are the most common threats (phishing, scam calls, hate waves) covered, based on data?' },
  { id: 't4', csf: 'respond', group: 'training', text: 'Is there an incident response plan and a simple way to report incidents?' },
];

export const MAX_SCORE = QUESTIONS.length * 2;
