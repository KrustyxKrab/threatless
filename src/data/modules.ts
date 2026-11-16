import type { CsfId } from './csf';
import type { Role } from './game';

/**
 * Learning modules. Topics follow the product description (phishing, data privacy,
 * secure sharing, access rights, awareness). Phishing comes first because e-mail
 * phishing is the most common way attacks start (ENISA Threat Landscape, BSI report).
 */
export type Channel = 'email' | 'sms' | 'call' | 'social' | 'chat';

export interface Message {
  channel: Channel;
  from: string;
  subject?: string;
  body: string;
}

export interface QuizItem {
  prompt: string;
  message?: Message;
  options: string[];
  /** Index of the correct option. */
  answer: number;
  explain: string;
  signs?: string[];
}

export interface Lesson {
  title: string;
  text: string;
  points?: string[];
}

export interface Module {
  id: string;
  title: string;
  summary: string;
  badge: string;
  color: string;
  minutes: number;
  csf: CsfId[];
  requiredFor: Role[];
  lessons: Lesson[];
  roleTip: Record<Role, string>;
  quiz: QuizItem[];
}

const SPOT = ['Looks safe', 'Suspicious'];

export const MODULES: readonly Module[] = [
  {
    id: 'phishing',
    title: 'Spot phishing',
    summary: 'Recognise fake e-mails, texts and calls before they trick you.',
    badge: 'Phish Spotter',
    color: '#ec3075',
    minutes: 4,
    csf: ['detect', 'protect'],
    requiredFor: ['employee', 'volunteer'],
    lessons: [
      {
        title: 'What is phishing?',
        text: 'Phishing is a fake message that wants you to click, pay or share a password. It is the most common way cyberattacks start – by e-mail, text message, phone call or social media.',
      },
      {
        title: 'The four warning signs',
        text: 'Most phishing messages show at least one of these signs:',
        points: [
          'Pressure: “today”, “last chance”, “or we go public”.',
          'Odd sender or link: look-alike addresses such as spreuweizen-team.co.',
          'Unusual request: passwords, payments, gift cards, secrecy.',
          'Unexpected attachment: .zip files or “invoices” you didn’t expect.',
        ],
      },
      {
        title: 'Your habit: Stop – Check – Report',
        text: 'Stop before you click. Check the sender and the real link, or call the person on a number you already know. Report it – even if you already clicked. AI tools can help you check a link, but only if you pause first.',
      },
    ],
    roleTip: {
      employee: 'You handle invoices and partner contacts – always confirm payment changes by phone.',
      volunteer: 'Attackers know volunteers are new. Real coordinators never ask for passwords or gift cards.',
    },
    quiz: [
      {
        prompt: 'Safe or suspicious?',
        message: {
          channel: 'email',
          from: 'accounts@city-school-berlin.co',
          subject: 'OVERDUE: Workshop invoice #4471 – pay within 24h',
          body: 'Your invoice is overdue. Please transfer €1,480 to our NEW bank account today or we will cancel all future bookings. Invoice attached: invoice_4471.zip',
        },
        options: SPOT,
        answer: 1,
        explain: 'Check payment changes by phone, using a number you already know.',
        signs: ['Look-alike domain (.co)', 'Time pressure', 'New bank account', '.zip attachment'],
      },
      {
        prompt: 'Safe or suspicious?',
        message: {
          channel: 'email',
          from: 'no-reply@microsoft-365-security.help',
          subject: 'Your password expires today',
          body: 'Your work password expires in 2 hours. Keep your current password by signing in here: login-microsoft.365-security.help',
        },
        options: SPOT,
        answer: 1,
        explain: 'Open your accounts by typing the address yourself or using a bookmark.',
        signs: ['Real domain is “…security.help”', 'Urgency', 'Login via link'],
      },
      {
        prompt: 'Safe or suspicious?',
        message: {
          channel: 'email',
          from: 'team@spreuweizen.de',
          subject: 'Spring workshop dates are in the calendar',
          body: 'Hi all, the spring dates are now in the shared calendar. No action needed – have a look when you have time. Cheers, Anna',
        },
        options: SPOT,
        answer: 0,
        explain: 'Not every message is an attack. A known sender, no link, no pressure and no request is usually fine.',
      },
      {
        prompt: 'What should you do?',
        message: {
          channel: 'call',
          from: 'Unknown number – “It’s your manager”',
          body: '“I’m stuck in a meeting. Please buy five gift cards for a partner right now and text me the codes. Keep it between us.”',
        },
        options: ['Buy the cards – it’s urgent', 'Hang up and call back on the known number', 'Ask for more details first'],
        answer: 1,
        explain: 'Authority, secrecy and gift cards are classic scam signs. Call back on a number you already know.',
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Protect personal data',
    summary: 'Handle names, photos and lists of participants with care.',
    badge: 'Data Guardian',
    color: '#00b4ad',
    minutes: 3,
    csf: ['protect', 'govern'],
    requiredFor: ['employee', 'volunteer'],
    lessons: [
      {
        title: 'What is personal data?',
        text: 'Anything that identifies a person: names, e-mail addresses, phone numbers, photos, class lists or notes about participants. Data about children needs extra care.',
      },
      {
        title: 'Three simple rules',
        text: 'Data protection (GDPR) can be boiled down to:',
        points: ['Collect only what you really need.', 'Keep it only as long as you need it.', 'Store it only in approved tools – not on private devices or in private chats.'],
      },
      {
        title: 'Photos and social media',
        text: 'Only publish photos of participants with written consent. Never post class lists, children’s faces without consent, or the exact location of upcoming workshops on sensitive topics.',
      },
    ],
    roleTip: {
      employee: 'You decide which data the team collects. Ask: do we really need this?',
      volunteer: 'Don’t keep participant lists on your phone after a workshop – delete them.',
    },
    quiz: [
      {
        prompt: 'A teacher sends a list of all students with names and birthdays “for your records”. What do you do?',
        options: ['Save it on your laptop just in case', 'Thank them, say you don’t need it, and delete it', 'Forward it to the whole team'],
        answer: 1,
        explain: 'Only collect what you need. Data you don’t have can’t be lost.',
      },
      {
        prompt: 'You took a great workshop photo where children are clearly visible. Can you post it?',
        options: ['Yes, it’s good for the project', 'Only with written consent', 'Yes, if you don’t tag anyone'],
        answer: 1,
        explain: 'Photos of people are personal data. Children need consent from parents or the school.',
      },
      {
        prompt: 'Where should participant lists be stored?',
        options: ['In the organisation’s approved shared drive', 'In your private cloud storage', 'In a messenger group'],
        answer: 0,
        explain: 'Approved tools have access controls and backups. Private tools don’t.',
      },
      {
        prompt: 'Safe or suspicious?',
        message: {
          channel: 'social',
          from: '@press_berlin_news (new account)',
          body: 'Hi, I’m a journalist. Can you send me the schools you visited last month and the teachers’ contacts? Quick please, my deadline is today!',
        },
        options: SPOT,
        answer: 1,
        explain: 'Never share personal data with people you can’t verify. Forward press requests to the team.',
        signs: ['Unknown, new account', 'Asks for personal data', 'Time pressure'],
      },
    ],
  },
  {
    id: 'sharing',
    title: 'Share files safely',
    summary: 'Send documents to the right people – and only to them.',
    badge: 'Safe Sharer',
    color: '#ffe047',
    minutes: 3,
    csf: ['protect'],
    requiredFor: ['employee'],
    lessons: [
      {
        title: 'Links beat attachments',
        text: 'Share files through the shared drive with access for named people instead of attaching them. You can remove access to a link later – an e-mail attachment is out of your hands forever.',
      },
      {
        title: 'Check before you share',
        text: 'Ask yourself four quick questions:',
        points: ['Who exactly needs this file?', 'Is access limited to those people – not “anyone with the link”?', 'Can I set an expiry date?', 'Is the recipient’s address right? Autocomplete mistakes are common.'],
      },
      {
        title: 'Sensitive files',
        text: 'Protect sensitive files with a password and send the password through a different channel, for example by phone. Never put the password in the same e-mail.',
      },
    ],
    roleTip: {
      employee: 'Review shared folders every few months and remove people who no longer need access.',
      volunteer: 'If you receive a file you shouldn’t have, tell the sender and delete it.',
    },
    quiz: [
      {
        prompt: 'You need to send a participant list to a partner school. Best option?',
        options: ['Attach it to an e-mail', 'Share a link only for that teacher, with an expiry date', 'Post it in the group chat'],
        answer: 1,
        explain: 'Limited, expiring access keeps you in control.',
      },
      {
        prompt: 'You sent a file with personal data to the wrong person. What now?',
        options: ['Hope nobody notices', 'Report it right away', 'Delete your sent e-mail and move on'],
        answer: 1,
        explain: 'The organisation may have to inform the authorities within 72 hours. Reporting fast makes that possible.',
      },
      {
        prompt: 'A volunteer contact list is shared as “Anyone with the link can view”. This is …',
        options: ['Fine – the link is long', 'Too open – limit it to named people'],
        answer: 1,
        explain: 'Links get forwarded. Named access means only the right people can open it.',
      },
      {
        prompt: 'How do you send the password for a protected file?',
        options: ['In the same e-mail', 'Through another channel, e.g. by phone', 'In the file name'],
        answer: 1,
        explain: 'If one channel is compromised, the other still protects the file.',
      },
    ],
  },
  {
    id: 'access',
    title: 'Accounts & access',
    summary: 'Strong passwords, two-factor login and the right permissions.',
    badge: 'Key Keeper',
    color: '#c9b3f2',
    minutes: 3,
    csf: ['protect', 'identify', 'govern'],
    requiredFor: ['employee', 'volunteer'],
    lessons: [
      {
        title: 'Strong passwords, made easy',
        text: 'Use a long passphrase of four or more random words, and a different one for every account. A password manager remembers them for you.',
      },
      {
        title: 'Turn on two-factor login (2FA)',
        text: 'A second step – a code from an app or a security key – stops most account takeovers, even if your password leaks. Never share these codes with anyone.',
      },
      {
        title: 'Only the access you need',
        text: 'Fewer permissions mean less damage if an account is misused:',
        points: ['Ask only for the access your task needs.', 'Never share your login – ask for your own account.', 'When someone leaves, their access is removed the same day.', 'Lock your screen when you step away.'],
      },
    ],
    roleTip: {
      employee: 'When a volunteer leaves, remove their access to drives, groups and tools the same day.',
      volunteer: 'Waiting for your account? Ask your coordinator – don’t borrow someone else’s login.',
    },
    quiz: [
      {
        prompt: 'Which password is strongest?',
        options: ['Spreuweizen2026!', 'P@ssw0rd', 'lantern-cactus-river-violin'],
        answer: 2,
        explain: 'Length beats complexity. Four random words are long, strong and easy to remember.',
      },
      {
        prompt: 'A fellow volunteer wants to borrow your login because theirs isn’t ready. You …',
        options: ['Share it – it’s just for a day', 'Say no and ask the coordinator for help'],
        answer: 1,
        explain: 'Shared logins make it impossible to know who did what – and to remove access later.',
      },
      {
        prompt: 'Safe or suspicious?',
        message: {
          channel: 'chat',
          from: '“IT Support” (unknown number)',
          body: 'Hi, we’re moving all accounts today. Please send me the 6-digit code you just got by text so your account isn’t deleted.',
        },
        options: SPOT,
        answer: 1,
        explain: 'Real IT support never asks for your login codes.',
        signs: ['Asks for a 2FA code', 'Threat of deletion', 'Unknown number'],
      },
      {
        prompt: 'A volunteer stopped helping three months ago but can still open the shared drive. This is …',
        options: ['Fine – they might come back', 'A risk – access should end when people leave'],
        answer: 1,
        explain: 'Forgotten accounts are a favourite entry point for attackers.',
      },
    ],
  },
  {
    id: 'awareness',
    title: 'Everyday security habits',
    summary: 'Small routines, online hate and what to do when things go wrong.',
    badge: 'Calm Responder',
    color: '#ff9b3d',
    minutes: 4,
    csf: ['detect', 'respond', 'recover'],
    requiredFor: ['employee', 'volunteer'],
    lessons: [
      {
        title: 'Pause before you click',
        text: 'Most attacks play on haste and strong feelings – fear, anger, curiosity. A ten-second pause is your best defence.',
      },
      {
        title: 'Online hate & disinformation',
        text: 'Organisations working on democracy and media literacy are targets of coordinated online attacks.',
        points: ['Signs: many new accounts, identical messages, people tagged by name.', 'Don’t engage – screenshot, report, block.', 'Tell your coordinator so the team can support you.'],
      },
      {
        title: 'Small habits, big impact',
        text: 'These routines protect you every day:',
        points: ['Install updates soon after they appear.', 'Lock your screen when you leave it.', 'Be careful when logging in on public Wi-Fi.', 'Report anything odd – there are no silly reports.'],
      },
      {
        title: 'Know the traffic light',
        text: 'Green means all clear. Yellow means be careful – there is phishing or online hate going on. Red means an active incident: disconnect, call, and use the offline kit.',
      },
    ],
    roleTip: {
      employee: 'You are the first contact when volunteers report something. Thank them – every report helps.',
      volunteer: 'Unsure? Use the Report button. It guides you step by step.',
    },
    quiz: [
      {
        prompt: 'What is the best response?',
        message: {
          channel: 'social',
          from: '@true_patriot_8812 and 40 similar accounts',
          body: 'Within an hour, 40 new accounts post the same comment calling your organisation “state propaganda” and tag volunteers by name.',
        },
        options: ['Reply and correct the facts', 'Screenshot, report, and switch to Yellow', 'Delete your account'],
        answer: 1,
        explain: 'Coordinated attacks want a reaction. Save evidence, report, and let the team respond together.',
      },
      {
        prompt: 'You entered your password on a fake page. What first?',
        options: ['Wait and see', 'Change the password and report it right away', 'Say nothing – it’s embarrassing'],
        answer: 1,
        explain: 'Speed matters more than anything. Nobody gets blamed for reporting.',
      },
      {
        prompt: 'The traffic light is RED. Which is right?',
        options: ['Keep working as usual', 'Disconnect affected devices and follow the offline guide', 'E-mail everyone the details'],
        answer: 1,
        explain: 'During an active incident e-mail may be compromised. Disconnect and use the phone and the offline kit.',
      },
      {
        prompt: 'An AI chatbot says a link “looks safe”. Is that enough?',
        options: ['Yes, AI knows best', 'It helps, but still check sender, context and pressure'],
        answer: 1,
        explain: 'AI is a useful helper, but you still need to spot the warning signs yourself.',
      },
    ],
  },
];

export const moduleById = (id: string): Module | undefined => MODULES.find((m) => m.id === id);
