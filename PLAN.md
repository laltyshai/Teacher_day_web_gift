# Teacher's Day Site — "TeacherOS" for Ms. Munara & Emil agai

## Context
- Gift for 2 CS professors — **Munara Tolubaeva (Ms. Munara)** and **Emil Bilgaziev (Emil agai)**: born in the 80s, Stack Overflow veterans, ex-big-tech (Meta/Google/Intel…), taught CS, Java, Python, statistics, discrete math, software engineering. Strong sense of humor → jokes are welcome.
- Decided: **one-page scrollable site, English, shown live on a laptop/projector, ready today/tomorrow**.
- Hard requirements: no backend, no internet, no login, runs on localhost (and by double-click), input = taps + scroll only.
- Content: names known now; photos + inside jokes pasted later → everything personal lives in **one data file** with visible placeholders.
- **Adding / swapping / removing a section must be a one-line change.**

## Tech decision: plain HTML + CSS + JS (no React, no build)
- Every idea below is CSS animation + scroll trigger + small click handler; React adds npm/build/offline risk and no benefit.
- **Classic `<script>` tags, not ES modules** — ES modules break when opened via `file://` (CORS); classic scripts work by double-click AND on localhost.
- **Zero external URLs** — no CDN, no Google Fonts. System font stacks; confetti/charts hand-written (canvas/SVG).
- Lives **outside the CarMobile repo**: `/Users/bambook/offtop/teacher_day_web/` (folder exists, empty; inside the `~/offtop` git repo — no commits unless asked).
- **Scope approved: the ★ default set (8 sections), default order.**

## Structure
```
/Users/bambook/offtop/teacher_day_web/
├── PLAN.md               # copy of this plan
├── index.html            # shell + one <script> line per section — LINE ORDER = PAGE ORDER
├── css/base.css          # theme tokens (GitHub-dark palette), typography, reveal animations
├── js/core.js            # Site.register, mount, scroll-trigger, nav dots, keyboard, helpers
├── js/content.js         # ALL names, jokes, quotes, photo paths, messages — the only file to edit for content
├── sections/<id>.js      # one self-contained file per section (html + css + behaviour)
└── assets/photos/        # drop jpg/mp4 here
```

**Section contract** (each `sections/*.js`):
```js
Site.register({
  id: 'leetcode',               // becomes <section id="leetcode">
  title: 'Two Professors',      // label on the side nav dot
  css: `#leetcode .x { … }`,    // injected once, scoped by id
  render: (c) => `<div>…</div>`,// c = window.CONTENT
  onEnter: (el, c) => { … },    // runs when ~35% visible (counters, typing, charts)
});
```
- **Add** = new file + 1 `<script>` line. **Swap order** = move the line. **Remove** = delete/comment the line. Nothing else changes.

**`js/core.js` provides** (shared, so sections stay tiny):
- Mount sections in registration order; inject CSS; build right-side nav dots from `title`.
- `IntersectionObserver` → adds `.visible` (CSS fade/slide-in) + calls `onEnter` once.
- Presenter keys: `Space`/`→`/`PageDown` = next section, `←`/`PageUp` = previous, `R` = replay current section (re-render + re-run `onEnter`).
- Helpers: `Site.typeLines(el, lines, ms)`, `Site.countUp(el, to, ms)`, `Site.confetti()` (canvas, ~50 lines), `Site.sleep(ms)`, `Site.photo(src, label)` (missing file → dashed placeholder "drop photo: assets/photos/x.jpg").

**`js/content.js` shape** (placeholders marked `TODO`):
```js
window.CONTENT = {
  group: 'TODO', year: 2026, studentsCount: 0,
  teachers: [
    { id:'munara', name:'Munara Tolubaeva', short:'Ms. Munara', handle:'@munara',
      subjects:['TODO'], companies:['TODO'], rpgClass:'TODO', stats:{…}, moves:[…],
      quotes:[…], photo:'assets/photos/munara.jpg' },
    { id:'emil', name:'Emil Bilgaziev', short:'Emil agai', handle:'@emil', … },
  ],
  messages: [{ from:'…', text:'…' }],      // student notes
  memories: [{ src:'assets/photos/1.jpg', caption:'…' }],
  credits:  ['student names…'],
};
```

**Look:** dark dev-tool theme (GitHub-dark: bg `#0d1117`, panels `#161b22`, green `#3fb950`, blue `#58a6ff`, purple `#a371f7`, amber `#d29922`, red `#f85149`); monospace for "code", system-ui for prose. **Projector-sized:** base 20px, each section ≥ 100vh, max-width 1200px, high contrast. No sound (classroom).

---

## Section catalog — pick yours
★ = recommended default set (8 sections, fits today/tomorrow). Effort: S ≈ 20–40 min, M ≈ 45–90 min.
Reply with the numbers you want (and order); any can be swapped later with one line.

### Opening (pick 1)
1. ★ **BIOS Boot, 1986 edition** — S. Black screen, amber text types out: `TeacherOS BIOS v1.986 · Memory test 640K OK · Detecting professors… Munara Tolubaeva [OK] · Emil Bilgaziev [OK] · Loading patience.sys … ∞ · Mounting /coffee …` → "Press any key to celebrate". Tap → glitch flash → boots into the dashboard. Born-in-the-80s nod.
2. **Dial-up Handshake** — S. "Connecting at 56k…", animated modem waveform + progress bar → "Connected to TEACHERS_DAY_2026".

### About the two of them
3. ★ **TeacherOS Dashboard** — M. Two "production nodes" side by side (`node-munara`, `node-emil`) with pulsing green status lights. On scroll, counters roll up: Students compiled · Uptime 99.99% (live ticking clock) · Patience ∞ · Bugs fixed 9999+ · Coffee level bar · SO reputation · Status LEGENDARY. Incident log underneath: `02:14 student asked "will this be on the exam?" — auto-resolved`.
4. ★ **Character Select (8-bit RPG)** — M. "PLAYER 1 / PLAYER 2" pixel cards. Tap a professor → "SELECTED!" flash, stat bars fill (Patience 99/99, Debugging 100, Joke damage ∞), class title, special moves, ultimate "Curve Deployment".
5. **`git log` of Their Lives** — M. A git graph with two branches (`munara/`, `emil/`) from `198x: initial commit (born)` → first PC → first segfault → joined Stack Overflow → shipped at big tech → both **merge into `main: our-group`**, tag `v2026.10 Teacher's Day`. Lines draw as you scroll. *(Needs real bio facts.)*
6. **Big Tech Offer Letter** — S. "Dear Ms. Munara, Google would like to re-hire you…" → big red stamp **DECLINED — busy teaching us**. Then our counter-offer: salary ∞ gratitude, benefits: unlimited tea, PTO: none (sorry).

### Course-themed jokes
7. ★ **Stack Overflow Thread** — S. Question "How do I properly thank two professors?" by `students_2026`, *closed as off-topic: too emotional*. Answers from @munara and @emil with green ✅ accepted. Tap the upvote arrows → count climbs with floating "+10". Comment: "Possible duplicate of *Teacher's Day 2025*".
8. ★ **LeetCode #1: Two Professors** — S. A pun on "Two Sum": *"Given `teachers`, return the two that add up to `ourSuccess`."* Constraints `1 ≤ patience ≤ ∞`. Tap **Submit** → test cases go green one by one → **Accepted · Runtime beats 100% · Memory: unforgettable**.
9. ★ **Pull Request #2026: Merge students into production** — M. GitHub PR page. Diff of `student.py`: red `panic()`, `copy_from_stackoverflow()`; green `read_the_error_message()`, `debug()`. Reviewers @munara @emil: Approved. CI checks spin → ✓ one by one (`discrete_math ✓`, `no missing semicolons ✓`). Tap **Merge** → confetti + purple "Merged".
10. **Java vs Python: Hello, Gratitude** — S. Side-by-side editors: 40-line `GratitudeFactoryBeanImpl implements Thankable` vs `print("Thank you!")`. ▶ Run both: Java "compiling…" for 3 s, then the same output.
11. **Statistics: Survey Says** — M. SVG charts animate in: pie "Where our brain was during lectures", bell curve "Hours slept before exam", scatter "Office hours vs grade, r = 0.97 (correlation ≠ causation… but come on)", verdict `p < 0.05: significantly awesome`.
12. **Discrete Math: Proof by Induction** — S. "Theorem: ∀ lecture n, our professors are awesome." Tap to reveal base case → hypothesis → step → bouncing ∎. Plus a truth table where every row is **T**.
13. **Big-O of Our Class** — S. Curves draw on scroll: answering questions O(1), our understanding O(log n), patience O(∞), deadline-extension requests O(n!).
14. **Sprint Board (Jira)** — M. TODO / IN PROGRESS / DONE. Cards: "Understand recursion", "Understand recursion" (duplicate — recursion), "Pass discrete math", "Say thank you". Tap a card → it flies to DONE; all done → "Sprint completed 🎉".

### Interactive fun
15. **Lecture Speed Switcher** — S. Fake video player: 0.5x (pointer arithmetic) / 1x / 2x (5 min left, 12 slides) / Speedrun ("will this be on the test?") change the caption, waveform speed and progress bar.
16. **Semicolon Graveyard** — S. Tombstones `NullPointerException`, `off-by-one`, `IndentationError`, `missing ;`. Tap → flips to reveal the epitaph ("killed by Emil agai, 23:59, the night before the deadline").
17. **CAPTCHA: Select all great professors** — S. 3×3 grid of their photos plus a rubber duck; every tile is correct → "Verified: you are human. Also, they're the best." *(Needs photos.)*
18. **Professor API Docs (Swagger)** — S. Collapsible endpoints; "Try it out" → `GET /office-hours 200`, `POST /extend-deadline 403`, `GET /exam-hints 418 I'm a teapot`, `DELETE /homework 405`.
19. **Tamagotchi Professor** — M. 90s pixel pet with buttons ☕ coffee / 📄 grade papers / 🎉 Teacher's Day; mood meters change; Teacher's Day maxes happiness.
20. **Matrix Rain of Thanks** — M. Canvas green rain; tap → it freezes and the characters re-form into "THANK YOU MS. MUNARA & EMIL AGAI".

### Memories
21. ★ **RUN MEMORY.exe** — M. Big button. Tap → Windows-98 "Copying memories…" dialog with absurd estimates (3 years → 2 seconds → 5 years remaining) → a desktop of polaroid photo windows (tap to enlarge), a video player, sticky-note student messages and teacher quotes. *(Uses `memories`/`messages`; works with placeholders until photos arrive.)*
22. **Contribution Heatmap** — S. GitHub-style semester grid; tap a square → memory popup.

### Finale
23. ★ **Changelog + Credits** — S. Changelog `v2024.1 First contact with students · v2025.1 Students started understanding Python · v2026.1 Final release 😭`, then movie-style rolling credits of student names, ending *"You didn't just teach us how to code. You taught us how to think."* Button `git commit -m "Thank you"` → full-screen confetti + **Happy Teacher's Day!**
24. **Konami code easter egg** — XS. ↑↑↓↓←→←→BA switches the whole site to an 8-bit palette. Another 80s nod.

**Default order (★):** 1 BIOS → 4 Character Select → 7 Stack Overflow → 8 LeetCode → 9 Pull Request → 21 MEMORY.exe → 23 Credits.

---

## Build order
0. Copy this plan to `/Users/bambook/offtop/teacher_day_web/PLAN.md`.
1. Skeleton: `index.html`, `base.css`, `core.js` (register/mount/observer/nav/keys/helpers), `content.js` with TODO placeholders.
2. Chosen sections one file at a time, in page order; check each in the browser before starting the next.
3. Polish: projector sizing, transitions between sections, replay key.
4. Content pass when photos/jokes arrive: edit `content.js` + drop files in `assets/photos/` (shrink big photos first: `sips -Z 1600 *.jpg`).

## Content checklist for you (paste anytime)
- Per teacher: subjects they taught, companies, catchphrases/quotes, favourite language, 1 portrait photo.
- Group name, year, number of students, student names (for credits).
- Class photos/videos, inside jokes, short student messages.

## Verification
- Serve: `cd /Users/bambook/offtop/teacher_day_web && python3 -m http.server 8000`, open `http://localhost:8000` in the built-in browser; also open `index.html` directly (file://) — both must work.
- Per section: screenshots at 1920×1080 and 1280×720 (projector sizes); tap every control; console must show no errors.
- Offline guarantee: `grep -rn "http" /Users/bambook/offtop/teacher_day_web --include=*.{html,js,css}` → no external URLs.
- Swap test: comment out one `<script>` line → page and nav dots still work.
- Presenter run-through: full-screen Chrome, walk the whole page with Space/←/→ and `R`.
