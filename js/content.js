/* =====================================================================
 *  CONTENT — the one file to edit for names, numbers, jokes, photos
 *  and messages. Every section reads from here.
 *
 *  Lines marked TODO are placeholders — replace them before the show.
 *  Photos/videos go in assets/photos/ (shrink first: sips -Z 1600 *.jpg).
 *  A missing photo shows a dashed "drop file" box instead of breaking.
 * ===================================================================== */
window.CONTENT = {
  group: 'CS Group',            // TODO: your group name, e.g. "COM-22a"
  year: 2026,
  studentsName: 'students_2026', // the "username" students use on SO / GitHub / LeetCode jokes

  teachers: [
    {
      id: 'munara',
      name: 'Munara Tolubaeva',
      short: 'Ms. Munara',
      handle: '@munara',
      initials: 'MT',
      color: '#a371f7',
      photo: 'assets/photos/munara.jpg',       // TODO: drop a portrait with this name
      subjects: ['Statistics', 'Discrete Math', 'Python'], // TODO: check which courses
      teachingSince: '2018-09-01',              // TODO: drives the live "uptime" clock
      dashboard: { students: 1200, bugsFixed: 9999, soRep: 31337, jokesPerLecture: 7, coffee: 92 }, // TODO: tweak numbers
      rpg: {
        cls: 'Statistics Sorceress',            // TODO
        stats: [['Patience', 10], ['Debugging', 10], ['Humor', 10], ['Coffee', 9], ['Deadline mercy', 2]],
        moves: ['p-value Punch (p < 0.05)', 'Proof by Induction Combo', 'Standard Deviation Dodge'],
        ultimate: 'Curve Deployment',
      },
      // short lines shown as comments/reviews "by" this teacher — TODO: replace with their real catchphrases
      says: {
        review: 'Approved. Statistically significant improvement (p < 0.05).',
        comment: 'Have you tried defining the problem before solving it?',
      },
      quote: '« favourite quote of Ms. Munara goes here »', // TODO
    },
    {
      id: 'emil',
      name: 'Emil Bilgaziev',
      short: 'Emil agai',
      handle: '@emil',
      initials: 'EB',
      color: '#58a6ff',
      photo: 'assets/photos/emil.jpg',          // TODO: drop a portrait with this name
      subjects: ['Java', 'Software Engineering', 'Computer Science'], // TODO: check which courses
      teachingSince: '2019-09-01',              // TODO
      dashboard: { students: 1100, bugsFixed: 9999, soRep: 42424, jokesPerLecture: 9, coffee: 97 }, // TODO
      rpg: {
        cls: 'Java Paladin',                    // TODO
        stats: [['Patience', 10], ['Debugging', 10], ['Humor', 10], ['Coffee', 10], ['Deadline mercy', 1]],
        moves: ['NullPointer Parry', 'Recursive Refactor', 'Garbage Collector Sweep'],
        ultimate: 'Office Hours Heal',
      },
      says: {
        review: 'LGTM 🚀  …you forgot a semicolon. Just kidding, it’s Python.',
        comment: 'Did you read the error message? The whole thing?',
      },
      quote: '« favourite quote of Emil agai goes here »', // TODO
    },
  ],

  // Accepted answer on the Stack Overflow thread — the main "thank you" text. TODO: write your own
  thankYou: [
    'You build them a website. Seriously.',
    'Ms. Munara and Emil agai took a group of people who panicked at every red line in the console and turned us into people who read the stack trace first.',
    'They answered the same question for the 47th time without sighing. They made discrete math feel like a puzzle instead of a punishment, and they showed us what real engineering looks like.',
    'Thank you for your patience, your jokes, and for believing our code would compile one day. It does now. Mostly.',
  ],

  // Sticky notes in MEMORY.exe — TODO: paste real messages from classmates
  messages: [
    { from: 'Student 1', text: 'Thank you for every “one more example” when nobody got it the first time.' },
    { from: 'Student 2', text: 'I finally understand recursion. To understand it, see: this note.' },
    { from: 'Student 3', text: 'Office hours > Stack Overflow. Faster answers, better jokes.' },
    { from: 'Student 4', text: 'You made 9 a.m. lectures worth waking up for.' },
  ],

  // Photos / videos in MEMORY.exe — TODO: drop files and update captions
  memories: [
    { src: 'assets/photos/memory1.jpg', caption: 'First lecture — nobody knew what a pointer was' },
    { src: 'assets/photos/memory2.jpg', caption: 'Live coding: it compiled on the first try (it did not)' },
    { src: 'assets/photos/memory3.jpg', caption: 'Exam week, coffee level: critical' },
    { src: 'assets/photos/memory4.jpg', caption: 'Group photo' },
    { src: 'assets/photos/memory5.jpg', caption: 'The famous whiteboard' },
    { src: 'assets/photos/memory6.mp4', caption: 'Video: our best moment' },
  ],

  changelog: [
    {
      v: 'v2026.10', title: 'Teacher’s Day Edition', latest: true,
      notes: [
        'Added: a website, built by students, for two legendary teachers',
        'Added: gratitude (unbounded, O(∞))',
        'Fixed: students no longer panic on IndentationError',
      ],
    },
    {
      v: 'v2025.1', title: 'Students started understanding Python',
      notes: ['Added: list comprehensions (used everywhere, even where they should not be)', 'Removed: fear of the terminal'],
    },
    {
      v: 'v2024.1', title: 'First contact with students',
      notes: ['Initial release', 'Known issue: students think HTML is a programming language'],
    },
  ],

  // Rolling credits — TODO: your classmates' names
  credits: ['Student One', 'Student Two', 'Student Three', 'Student Four', 'Student Five', 'Student Six'],

  finalLine: 'You didn’t just teach us how to code. You taught us how to think.',
};
