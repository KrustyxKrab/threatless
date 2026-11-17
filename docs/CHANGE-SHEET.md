# Threatless – Change sheet after Digital Futures Challenge 2026

Source: 11 feedback cards (station "Threatless" / "Threat Less") + team notes.
Formerly "Krise-Quartett".

## What reviewers liked (keep it)

| Strength | Cards | What we protect |
| --- | --- | --- |
| Fun, short, not redundant game | 4, 5, 6, 10 | Lessons stay 3–4 min. No long reading. |
| Simple, easy, detailed prototype | 1, 8 | One clear action per screen. |
| Helps people with no IT knowledge (also older people) | 1, 3, 10 | Plain language, big buttons, no jargon. |
| Works inside an organisation | 9 | Roles (staff / volunteer), alert level for the whole team. |

## Ranked ideas

Score = reach of the idea across cards × impact for beginners ÷ effort. "Now" = done in this version.

| # | Idea | Cards | Impact | Effort | Decision |
| --- | --- | --- | --- | --- | --- |
| 1 | **"What if I already fell for it?"** – help shown at the end of every lesson, linked to Get help | 5, 11 | High | Low | **Now** |
| 2 | **Make the two jobs of the app visible:** *Learn* (path of lessons + basics) and *Help* (get help + alert level) | team | High | Low | **Now** |
| 3 | **Guide for low scores** – short "what to remember" list when not all answers were right | 2 | High | Low | **Now** |
| 4 | **Spot-the-fake checklist inside the game** – the hint in every practice shows the 4 warning signs | 4 | High | Low | **Now** |
| 5 | **Learning path with points and badges** (Duolingo-style stepping stones, XP per right answer, one badge per lesson) | 10 | Medium | Medium | **Now** (local, per browser) |
| 6 | **When to use it** – before a new account is activated (onboarding), then a 3-min refresh; Help is for any moment | 4 | Medium | Low | **Now** |
| 7 | **More channels** – social media story scam as a practice example | 3 | Medium | Low | **Now** (1 example) |
| 8 | **Inbox add-on (Outlook / Gmail):** "Report with Threatless" button + alert level next to the mail | 1, 8, 9, 11 | Very high | High | **Concept shown** in Help; build next |
| 9 | Team competitions / prizes ("who is the biggest expert?") | 10 | Medium | Medium | Later – needs shared backend + fair rules |
| 10 | Live check: "Is this real?" (verification / AI helper) | 7, 8, 11 | High | High | Later – must teach the signs first, AI only as second opinion |
| 11 | Training with the user's own e-mails | 1 | Medium | High | Later – privacy (GDPR). Alternative: use anonymised reports from the team as new examples |
| 12 | Simulated phishing outside the game (Hoxhunt-style) | 3 | High | High | Later – needs consent, works best with the inbox add-on |

## Change list (this version)

- [x] Renamed app to **Threatless** (header, title, manifest, package).
- [x] Removed prototype/mock texts and boxes ("practice mode", "prototype does not send anything").
- [x] Staff / volunteer switch moved to the footer (still saved per browser).
- [x] Home shows two clear entries: **Learn** and **Help**.
- [x] Learn page = stepping-stone path: done / next / later, badge per lesson, points total and rank.
- [x] End of lesson: badge + points, "remember this" list if not all right, "already clicked?" link to Get help.
- [x] Every practice hint shows the 4 warning signs.
- [x] New practice: fake giveaway in an Instagram-style story.
- [x] Get help now has a clear ending: "Done – you did the right thing" with what happens next and a way back.
- [x] Get help: short preview of the inbox add-on (report button + alert level).

## Next steps

1. Prototype the Outlook add-in (Office.js task pane): report button → coordinator, alert level banner.
2. Decide with SPREUWEIZEN *when* people play: during onboarding before account activation (Rechtematrix), then once per quarter.
3. Shared backend only if we want team points/competitions – keep personal progress private.
