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
      photo: 'assets/photos/m_pfp.jpg',       // TODO: drop a portrait with this name
      subjects: ['Statistics', 'Discrete Math', 'Python'], // TODO: check which courses
      teachingSince: '2018-09-01',              // TODO: drives the live "uptime" clock
      dashboard: { students: 1200, bugsFixed: 9999, soRep: 31337, jokesPerLecture: 7, coffee: 92 }, // TODO: tweak numbers
      rpg: {
        cls: 'Statistics Sorceress',            // TODO
        stats: [['Patience', 10], ['Debugging', 99], ['Humor', 99], ['Gambling', 5], ['Deadline mercy', 0]],
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
      photo: 'assets/photos/e_pfp.jpg',          // TODO: drop a portrait with this name
      subjects: ['Java', 'Software Engineering', 'Computer Science'], // TODO: check which courses
      teachingSince: '2019-09-01',              // TODO
      dashboard: { students: 1100, bugsFixed: 9999, soRep: 42424, jokesPerLecture: 9, coffee: 97 }, // TODO
      rpg: {
        cls: 'Java Paladin',                    // TODO
        stats: [['Patience', 2], ['Debugging', 99], ['Humor', 99], ['Gambling', 10], ['Deadline mercy', 7]],
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

  // Reply cards on the Stack Overflow thread (4 per row, 3 rows). likes must be 1000+. TODO: swap in real student quotes
  replies: [
    { user: 'student_01', likes: 2026, text: 'I love Ms. Munara’s lessons. Her classes are structured amazingly! 📚✨' },
    { user: 'student_02', likes: 1873, text: 'I love Emil agai’s lessons, especially business and career. Lifetime advice! 💼' },
    { user: 'student_03', likes: 1542, text: 'My English is bad and it is sometimes hard to understand them, but they are my motivation to try my best 💪' },
    { user: 'student_04', likes: 1999, text: 'Emil agai’s sudden exams became the funniest and yet the scariest part of my week. Love our agai 😅' },
    { user: 'student_05', likes: 2310, text: 'Munara eje is my role model and inspiration to pursue programming as a girl! 👩‍💻🔥' },
    { user: 'student_06', likes: 2147, text: 'They always ask “do you have any questions?” and are actually ready to explain it all over again, just for us 🥹' },
    { user: 'student_07', likes: 1288, text: 'Bug in my code for 3 hours. Munara eje found it in 3 seconds. Respect. 🐛' },
    { user: 'student_08', likes: 1764, text: 'Emil agai said “it is easy”. It was not easy. But somehow we did it 😭' },
    { user: 'student_09', likes: 1431, text: 'Best teachers I know: they make 9 a.m. lectures worth waking up for ☕' },
    { user: 'student_10', likes: 1105, text: 'Thanks to them I read the stack trace first and panic second 🧠' },
    { user: 'student_11', likes: 1690, text: '"I love Ms.Munara`s lessons. Her classes are structured amazingly! ALways a syllabus, psemester plan or presentation!' },
    { user: 'student_12', likes: 2500, text: 'Thank you for believing our code would compile one day. It does now. Mostly. 🚀' },
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
        'Fixed: students no longer panic seeing Emil agai with papers',
      ],
    },
    {
      v: 'v2025.9', title: 'Students started understanding Python',
      notes: ['Added: list comprehensions (used everywhere, even where they should not be)', 'Removed: fear of the terminal'],
    },
    {
      v: 'v2023.9', title: 'First contact with students',
      notes: ['Initial release. 25 students', 'Known issue: students think HTML is a programming language'],
    },
  ],

  // Rolling credits — TODO: your classmates' names
  credits: ['Isken & Altynai', 'Dinara', 'Adelia', 'the whole CS`26', 'the whole CS`25','CS`24 and CS`23' ],

  finalLine: 'You didn’t just teach us how to code. You taught us how to think.',
};
