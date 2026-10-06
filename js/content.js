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
      photo: 'assets/photos/m_pfp.jpg',      
      
      subjects: ['Statistics', 'Discrete Math', 'Java',  'Computer Science', 'Research'], // TODO: check which courses
      rpg: {
        cls: 'Java Paladin',       
        stats: [['Patience', 10],['Lessons` strucutre', 99], ['Debugging', 99], ['Humor', 67], ['Lab difficuly', 9], ['Deadline mercy', 1]],
        moves: ['Cache miss debuff', 'Recursive Refactor', 'Standard Deviation Dodge', 'Kernel proccess freeze'],
        ultimate: 'Zero-latency CPU acceleration',
      },
      // short lines shown as comments/reviews "by" this teacher — TODO: replace with their real catchphrases
      says: {
        review: 'Approved. Statistically significant improvement (p < 0.05).',
        comment: 'Have you tried defining the problem before solving it?',
      },
      quote: '«Guys, you can do everything yourself if you study »', // TODO
    },
    {
      id: 'emil',
      name: 'Emil Bilgaziev',
      short: 'Emil agai',
      handle: '@emil',
      initials: 'EB',
      color: '#58a6ff',
      photo: 'assets/photos/e_pfp.jpg',          
      subjects: [ 'AIT Solutions', 'Data Structures', 'Algorithms', 'Python', 'Software dev Patterns',], // TODO: check which courses

      rpg: {
        cls: 'Algorithm Alchemist',                    // TODO
        stats: [['Patience', 2], ['Improvisation', 10], ['Debugging', 99], ['Humor', 99], ['Gambling', 10], ['Deadline mercy', 7]],
        moves: ['NullPointer Parry', 'BigTech friends summoning', 'Garbage Collector Sweep', "Infinite Loop trap"],
        ultimate: 'Sudden exam',
      },
      says: {
        review: 'LGTM 🚀  …you forgot a semicolon. Just kidding, it’s Python.',
        comment: 'Did you read the error message? The whole thing?',
      },
      quote: '« Persistence is the key »', // TODO
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
    { user: 'student_09', likes: 1431, text: 'Best teachers I know: studying in co-working for exams during the weekends is truly worth it ☕' },
    { user: 'student_10', likes: 1105, text: 'Thanks to them I read the stack trace first and panic second 🧠' },
    { user: 'student_11', likes: 1690, text: '"I love Ms.Munara`s lessons. Her classes are structured amazingly! ALways a syllabus, psemester plan or presentation!' },
    { user: 'student_12', likes: 2500, text: 'Thank you for believing our code would compile one day. It does now. Mostly. 🚀' },
  ],

  // Sticky notes in MEMORY.exe — screenshots of funny messages (image only, no text)
  messages: [
    { img: 'assets/photos/funnote.jpg' },
    { img: 'assets/photos/funnote1.jpg' },
    { img: 'assets/photos/funnote3.jpg' },
    { img: 'assets/photos/funnote4.jpg' },
    { img: 'assets/photos/funnote5.jpg' },
    { img: 'assets/java_quiz.jpg' },
  ],

  // Photos / videos in MEMORY.exe — TODO: drop files and update captions
  memories: [
    { src: 'assets/photos/first_exam.webm', caption: 'First exam' },
    { src: 'assets/java_quiz.jpg', caption: 'Weekly Java quiz' },
    { src: 'assets/photos/m_outfits.jpg', caption: 'Many outfits of the Vogue' },
    { src: 'assets/photos/group_photo.jpg', caption: 'AIT Solutions ' },
  ],

  // "The best reels" window in MEMORY.exe (portrait videos, shown under the photos)
  reels: [
    { src: 'assets/photos/reel1.mp4', caption: 'Reel #1' },
    { src: 'assets/photos/reel2.mp4', caption: 'Reel #2' },
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
