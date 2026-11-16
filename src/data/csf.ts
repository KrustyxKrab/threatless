import type { QuizItem } from './modules';

/**
 * NIST Cybersecurity Framework 2.0 – explained in plain language.
 * Each function answers one simple question and links to the part of the app that trains it.
 */
export type CsfId = 'govern' | 'identify' | 'protect' | 'detect' | 'respond' | 'recover';

export interface CsfFunction {
  id: CsfId;
  label: string;
  color: string;
  question: string;
  plain: string;
  analogy: string;
  example: string;
  actions: string[];
  links: { label: string; href: string }[];
}

export const CSF: readonly CsfFunction[] = [
  {
    id: 'govern',
    label: 'Govern',
    color: '#f8f19c',
    question: 'Who is responsible, and what are our rules?',
    plain: 'Setting the rules, roles and priorities for security. It sits in the middle because it holds everything else together.',
    analogy: 'House rules: who gets a key, and who checks the smoke alarm.',
    example: 'Someone owns cybersecurity, and every new team member completes a short onboarding.',
    actions: ['Know who to contact when something feels wrong', 'Complete the modules for your role'],
    links: [{ label: 'Start learning', href: '/learn/' }],
  },
  {
    id: 'identify',
    label: 'Identify',
    color: '#4ab3e2',
    question: 'What do we have – and what could go wrong?',
    plain: 'Knowing your devices, accounts and data, and the risks they face.',
    analogy: 'Listing what is valuable in your house – and which doors are weak.',
    example: 'Listing which tools hold participant data and who can access them.',
    actions: ['Know which accounts and data you work with', 'Run the organisation check to find gaps'],
    links: [
      { label: 'Organisation check', href: '/framework/check/' },
      { label: 'Module: Accounts & access', href: '/learn/access/' },
    ],
  },
  {
    id: 'protect',
    label: 'Protect',
    color: '#948ced',
    question: 'How do we prevent damage?',
    plain: 'Safeguards that keep attacks out: strong passwords, two-factor login, updates and training.',
    analogy: 'Locks on the doors and windows.',
    example: 'Every new volunteer completes a short training before getting access to internal tools.',
    actions: ['Use a password manager and two-factor login', 'Share files only with people who need them'],
    links: [
      { label: 'Module: Protect personal data', href: '/learn/privacy/' },
      { label: 'Module: Share files safely', href: '/learn/sharing/' },
    ],
  },
  {
    id: 'detect',
    label: 'Detect',
    color: '#f9b74a',
    question: 'How do we notice that something is wrong?',
    plain: 'Spotting attacks early: strange e-mails, unusual logins or a wave of online hate.',
    analogy: 'The smoke alarm.',
    example: 'A volunteer recognises a fake invoice and reports it before anyone pays.',
    actions: ['Learn the warning signs of phishing', 'Report anything odd – no report is too small'],
    links: [{ label: 'Module: Spot phishing', href: '/learn/phishing/' }],
  },
  {
    id: 'respond',
    label: 'Respond',
    color: '#e4736f',
    question: 'What do we do when it happens?',
    plain: 'Acting quickly and calmly with a clear plan, so a small problem doesn’t become a big one.',
    analogy: 'Calling the fire brigade and following the escape plan.',
    example: 'The traffic light switches to Yellow: everyone knows not to click and to report.',
    actions: ['Use the one-click report', 'Follow the checklist for your situation'],
    links: [
      { label: 'Report an incident', href: '/report/' },
      { label: 'Traffic light', href: '/status/' },
    ],
  },
  {
    id: 'recover',
    label: 'Recover',
    color: '#7ef49a',
    question: 'How do we get back on our feet – and learn?',
    plain: 'Restoring systems and data, and improving for next time.',
    analogy: 'Repairing the damage and fitting a better lock.',
    example: 'Workshops continue with the offline kit while accounts are restored from backups.',
    actions: ['Keep the offline kit at hand', 'Share what happened so everyone learns'],
    links: [{ label: 'Offline kit', href: '/status/#offline' }],
  },
];

const LABELS = CSF.map((f) => f.label);
const pick = (id: CsfId) => CSF.findIndex((f) => f.id === id);

/** "Which function is it?" – quick check after exploring the framework. */
export const CSF_QUIZ: readonly QuizItem[] = [
  { prompt: 'A volunteer notices a strange login alert and reports it.', options: LABELS, answer: pick('detect'), explain: 'Noticing that something is wrong is Detect – the smoke alarm.' },
  { prompt: 'Everyone turns on two-factor login for their accounts.', options: LABELS, answer: pick('protect'), explain: 'Safeguards that keep attackers out belong to Protect.' },
  { prompt: 'The team decides who is responsible for IT security.', options: LABELS, answer: pick('govern'), explain: 'Roles, rules and responsibilities are Govern.' },
  { prompt: 'After an attack, files are restored from a backup.', options: LABELS, answer: pick('recover'), explain: 'Getting back on track is Recover.' },
  { prompt: 'The traffic light switches to Red and devices are disconnected.', options: LABELS, answer: pick('respond'), explain: 'Acting during an incident is Respond.' },
];
