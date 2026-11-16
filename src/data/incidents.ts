import type { Level } from './levels';

/** One-click incident reporting: each type comes with an emergency checklist. */
export interface Incident {
  id: string;
  title: string;
  hint: string;
  level: Level;
  checklist: string[];
  avoid: string[];
}

export const INCIDENTS: readonly Incident[] = [
  {
    id: 'suspicious-message',
    title: 'I got a suspicious message',
    hint: 'E-mail, text, call or DM that feels off.',
    level: 'yellow',
    checklist: ['Don’t click links or open attachments', 'Take a screenshot', 'Send this report to your coordinator', 'Delete the message afterwards'],
    avoid: ['Replying to the sender', 'Forwarding the message with its link to colleagues'],
  },
  {
    id: 'clicked',
    title: 'I clicked a link or entered my password',
    hint: 'It happens to everyone – speed matters more than blame.',
    level: 'red',
    checklist: ['Disconnect from Wi-Fi if something was downloaded', 'Change the password from another device', 'Turn on two-factor authentication', 'Send this report now', 'Note what you clicked and when'],
    avoid: ['Waiting to see what happens', 'Keeping it to yourself'],
  },
  {
    id: 'account',
    title: 'My account was taken over',
    hint: 'You can’t log in, or things happen you didn’t do.',
    level: 'red',
    checklist: ['Try to reset your password', 'Call your coordinator', 'Warn contacts not to trust messages from you', 'Sign out unknown devices in your account settings'],
    avoid: ['Creating a new account and ignoring the old one'],
  },
  {
    id: 'device',
    title: 'I lost a device',
    hint: 'Laptop, phone or USB stick with work data.',
    level: 'yellow',
    checklist: ['Report it right away', 'Change passwords of accounts used on it', 'Lock or erase it remotely if possible', 'Note where and when you last had it'],
    avoid: ['Waiting a few days in case it turns up'],
  },
  {
    id: 'data-mistake',
    title: 'I shared data by mistake',
    hint: 'Wrong recipient, open link, public post.',
    level: 'yellow',
    checklist: ['Ask the recipient to delete it and confirm', 'Remove the link or access', 'Report it – the organisation may have to inform authorities within 72 hours', 'Note what data was shared and with whom'],
    avoid: ['Hoping nobody notices'],
  },
  {
    id: 'hate-wave',
    title: 'We are targeted by online hate',
    hint: 'Many accounts posting the same attacks at once.',
    level: 'yellow',
    checklist: ['Don’t engage or reply', 'Screenshot posts with names and time', 'Report and block on the platform', 'Inform your coordinator and anyone named', 'Check privacy settings of your personal accounts'],
    avoid: ['Arguing in the comments', 'Deleting evidence before saving it'],
  },
  {
    id: 'outage',
    title: 'Systems are down or locked',
    hint: 'Files encrypted, ransom note, nothing works.',
    level: 'red',
    checklist: ['Disconnect the device from the network', 'Call your emergency contact', 'Switch to the offline kit', 'Write down what you see on screen'],
    avoid: ['Paying or replying to the attackers', 'Restarting machines again and again'],
  },
];
