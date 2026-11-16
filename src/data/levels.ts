/** Security alert levels (traffic-light system) and the printable offline kit. */
export type Level = 'green' | 'yellow' | 'red';

export interface AlertLevel {
  id: Level;
  label: string;
  title: string;
  description: string;
  steps: string[];
}

export const SEVERITY: Record<Level, number> = { green: 0, yellow: 1, red: 2 };

export const LEVELS: readonly AlertLevel[] = [
  {
    id: 'green',
    label: 'Green',
    title: 'All clear',
    description: 'No known incident. Work as usual – and pause before you click.',
    steps: ['Work as usual', 'Report anything that feels odd – no report is too small', 'Keep your training up to date'],
  },
  {
    id: 'yellow',
    label: 'Yellow',
    title: 'Be careful',
    description: 'A phishing wave, a suspicious login or coordinated online hate is going on.',
    steps: ['Don’t click, don’t reply, don’t engage', 'Take screenshots and report them', 'Change your password if you entered it anywhere', 'Warn your team in the usual internal channel'],
  },
  {
    id: 'red',
    label: 'Red',
    title: 'Active incident',
    description: 'Accounts are compromised or systems are down. Switch to the offline guide.',
    steps: ['Disconnect affected devices from Wi-Fi and cable', 'Call your emergency contact – don’t use e-mail', 'Work with the offline kit below', 'Write down what happened and when'],
  },
];

export const levelById = (id: Level): AlertLevel => LEVELS.find((l) => l.id === id)!;

export const OFFLINE_KIT: readonly { title: string; items: string[] }[] = [
  { title: 'Who to call', items: ['Emergency contact: ______________', 'IT support: ______________', 'Management: ______________'] },
  { title: 'Keep working', items: ['Printed workshop plan for this week', 'Paper attendance lists', 'Phone list of all volunteers'] },
  { title: 'Get back on track', items: ['Reset passwords from a clean device', 'Turn on two-factor authentication', 'Restore files from the last good backup', 'Share what happened so everyone learns'] },
];
