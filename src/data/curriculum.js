// LearnCode curriculum — authored course content.
// Lesson bodies teach in short beats; each lesson carries one code sample and one tip.

export const courses = [
  {
    slug: 'html-css',
    title: 'HTML & CSS',
    tagline: 'Build your first web page',
    description:
      'Every website starts here. Learn how pages are structured with HTML, then bring them to life with colour, type and layout in CSS.',
    level: 'Beginner',
    hours: 6,
    glyph: '</>',
    color: '#F97316',
    soft: '#FFF3E9',
    objectives: [
      'Write clean, semantic HTML',
      'Style with colour, type and spacing',
      'Build layouts with Flexbox that fit any screen',
    ],
    lessons: [
      {
        slug: 'html-basics',
        title: 'Your first HTML page',
        minutes: 6,
        body: [
          'HTML gives a page its structure. Elements are written as tags, and most come in pairs: an opening tag, your content, then a closing tag with a slash.',
          'A heading uses h1, a paragraph uses p. The browser reads these tags and decides what each piece of text means — not just how big it looks.',
        ],
        lang: 'html',
        code: '<h1>Hello, LearnCode</h1>\n<p>I just wrote my first page.</p>',
        note: 'Use one h1 per page. Screen readers rely on it to understand the page topic.',
      },
      {
        slug: 'css-colors',
        title: 'Colour, type & spacing',
        minutes: 7,
        body: [
          'CSS styles what HTML describes. A rule picks elements with a selector, then sets properties inside curly braces.',
          'Colour, font size and spacing are the three levers you will reach for most. Small, consistent values always beat a long list of one-offs.',
        ],
        lang: 'css',
        code: 'p {\n  color: #2b2350;\n  font-size: 16px;\n  line-height: 1.6;\n}',
        note: 'Line height of 1.5 to 1.7 keeps long paragraphs comfortable to read.',
      },
      {
        slug: 'flexbox',
        title: 'Layouts with Flexbox',
        minutes: 9,
        body: [
          'Flexbox arranges children along one axis. Set display: flex on the parent and its children line up in a row, ready to be spaced.',
          'justify-content spreads items across the main axis, align-items lines them up on the other. That pair alone handles most mobile layouts.',
        ],
        lang: 'css',
        code: '.row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}',
        note: 'gap is cleaner than margins on children — it never adds spacing to the outer edge.',
      },
    ],
  },
  {
    slug: 'python',
    title: 'Python',
    tagline: 'The friendliest first language',
    description:
      'Readable, powerful and everywhere — from data science to scripting. Python is the language most beginners fall in love with.',
    level: 'Beginner',
    hours: 8,
    glyph: 'py',
    color: '#3B82F6',
    soft: '#EAF2FF',
    objectives: [
      'Store and transform data in variables',
      'Loop through collections with confidence',
      'Write reusable functions with parameters',
    ],
    lessons: [
      {
        slug: 'variables',
        title: 'Variables & types',
        minutes: 6,
        body: [
          'A variable is a name pointing at a value. In Python you just assign it — no type keyword, no semicolon.',
          'The basic types are str for text, int for whole numbers, float for decimals and bool for true/false.',
        ],
        lang: 'python',
        code: 'name = "Rani"\nlevel = 4\nxp = 1280.5\nis_logged_in = True\n\nprint(f"{name} is level {level}")',
        note: 'f-strings are the modern way to combine text and values. Put an f before the quote.',
      },
      {
        slug: 'loops',
        title: 'Lists & loops',
        minutes: 8,
        body: [
          'A list holds many values in order. Square brackets create one, and each item gets a position starting at zero.',
          'A for loop walks the list once per item, which is how you turn a collection into an action.',
        ],
        lang: 'python',
        code: 'languages = ["html", "python", "javascript"]\n\nfor lang in languages:\n    print(lang.upper())',
        note: 'If you need the index too, use enumerate(languages) instead of counting by hand.',
      },
      {
        slug: 'functions',
        title: 'Functions',
        minutes: 7,
        body: [
          'Functions bundle a piece of logic under one name so you can reuse it. def starts the definition, return hands a value back.',
          'Give a function the smallest job that still makes sense, and name it after the action it performs.',
        ],
        lang: 'python',
        code: 'def xp_for_lesson(streak_days, base=10):\n    bonus = min(streak_days, 5) * 2\n    return base + bonus\n\nprint(xp_for_lesson(3))',
        note: 'Default arguments make a function easy to call without making it confusing.',
      },
    ],
  },
  {
    slug: 'javascript',
    title: 'JavaScript',
    tagline: 'Make pages come alive',
    description:
      'The language of the web. Respond to taps, fetch data, update the screen — everything interactive starts with JavaScript.',
    level: 'Intermediate',
    hours: 9,
    glyph: 'js',
    color: '#EAB308',
    soft: '#FEF7E3',
    objectives: [
      'Work with variables, types and conditions',
      'Write arrow functions and callbacks',
      'Transform arrays with map and filter',
    ],
    lessons: [
      {
        slug: 'variables-types',
        title: 'Variables & types',
        minutes: 7,
        body: [
          'const declares a value you will not reassign, let declares one you will. Prefer const until you actually need to change it.',
          'JavaScript is loosely typed, so the same variable could hold a number now and text later — read carefully.',
        ],
        lang: 'javascript',
        code: 'const learner = "Rani";\nlet xp = 1280;\nxp += 40;\n\nconsole.log(`${learner} has ${xp} XP`);',
        note: 'Template strings use backticks and ${} to insert values inside text.',
      },
      {
        slug: 'arrow-functions',
        title: 'Functions & arrow syntax',
        minutes: 8,
        body: [
          'A function takes input, does work, and returns output. Arrow functions are a shorter way to write the same idea.',
          'When the body is a single expression you can drop the braces and the return keyword entirely.',
        ],
        lang: 'javascript',
        code: 'const double = (n) => n * 2;\nconst greet = (name) => `Hi ${name}!`;\n\nconsole.log(double(21), greet("Rani"));',
        note: 'Arrow functions do not have their own this — that matters once you touch objects.',
      },
      {
        slug: 'arrays',
        title: 'Arrays & objects',
        minutes: 9,
        body: [
          'Arrays hold ordered lists, objects hold named fields. Together they model almost every piece of data in a real app.',
          'map builds a new array from each item, filter keeps only the ones that pass a test. Neither changes the original.',
        ],
        lang: 'javascript',
        code: 'const lessons = [\n  { title: "HTML", done: true },\n  { title: "CSS", done: false }\n];\n\nconst finished = lessons.filter((l) => l.done);\nconsole.log(finished.length);',
        note: 'Chain filter().map() to turn raw records into exactly what the screen needs.',
      },
    ],
  },
  {
    slug: 'php',
    title: 'PHP',
    tagline: 'Power the server side',
    description:
      'The language behind a huge share of the web. Handle forms, sessions and databases, and understand how servers build pages.',
    level: 'Intermediate',
    hours: 7,
    glyph: 'php',
    color: '#8B5CF6',
    soft: '#F4EEFF',
    objectives: [
      'Write and run a PHP script',
      'Work with strings and variables',
      'Loop over arrays to render output',
    ],
    lessons: [
      {
        slug: 'first-script',
        title: 'Your first script',
        minutes: 6,
        body: [
          'PHP runs on the server and sends finished HTML to the browser. Code lives between <?php and ?> tags.',
          'echo writes output. Every statement ends with a semicolon — forget it and the script stops.',
        ],
        lang: 'php',
        code: '<?php\n$name = "LearnCode";\necho "Welcome to $name";\n?>',
        note: 'Double-quoted strings expand variables; single quotes keep the text literal.',
      },
      {
        slug: 'strings',
        title: 'Strings & numbers',
        minutes: 7,
        body: [
          'PHP converts between text and numbers on its own, which is convenient — and occasionally surprising.',
          'String functions like strtoupper and strlen are your first tools for cleaning up user input.',
        ],
        lang: 'php',
        code: '<?php\n$title = "learn code";\necho strtoupper($title);\necho " (" . strlen($title) . ")";',
        note: 'The dot joins strings in PHP — the plus would try to do maths instead.',
      },
      {
        slug: 'arrays',
        title: 'Arrays & loops',
        minutes: 8,
        body: [
          'A PHP array maps keys to values. Use it for simple lists, or for labelled data with named keys.',
          'foreach visits each entry without you tracking a counter.',
        ],
        lang: 'php',
        code: '<?php\n$courses = ["HTML", "PHP", "Python"];\n\nforeach ($courses as $course) {\n  echo "<li>$course</li>";\n}\n?>',
        note: 'foreach ($arr as $key => $value) also gives you the key on each pass.',
      },
    ],
  },
  {
    slug: 'golang',
    title: 'Golang',
    tagline: 'Fast, simple, concurrent',
    description:
      'Go is compact, compiled and built for services that stay fast under load. A short language with very few surprises.',
    level: 'Advanced',
    hours: 8,
    glyph: 'go',
    color: '#06B6D4',
    soft: '#E4FAFE',
    objectives: [
      'Understand packages and imports',
      'Declare typed variables',
      'Write loops and conditionals',
    ],
    lessons: [
      {
        slug: 'hello-go',
        title: 'Hello, Go',
        minutes: 6,
        body: [
          'Every Go file belongs to a package. The main package with a main function is what runs.',
          'fmt is the standard formatting package. Println writes a line to the console.',
        ],
        lang: 'go',
        code: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, LearnCode")\n}',
        note: 'Unused imports are a compile error in Go — the language insists on tidy files.',
      },
      {
        slug: 'types',
        title: 'Typed variables',
        minutes: 7,
        body: [
          'Go is statically typed: a variable keeps the type it started with. The := shorthand declares and infers in one step.',
          'Explicit types make large codebases far easier to reason about, which is precisely why Go keeps them.',
        ],
        lang: 'go',
        code: 'xp := 1280\nname := "Rani"\nvar rate float64 = 1.5\n\nfmt.Println(name, xp, rate)',
        note: ':= only works inside functions. At package level use var.',
      },
      {
        slug: 'loops',
        title: 'Loops & conditions',
        minutes: 8,
        body: [
          'Go has one loop keyword: for. Used alone it repeats forever, with a condition it behaves like while.',
          'If statements do not use parentheses, but the braces are required.',
        ],
        lang: 'go',
        code: 'for i := 1; i <= 3; i++ {\n\tif i == 2 {\n\t\tfmt.Println("two")\n\t\tcontinue\n\t}\n\tfmt.Println(i)\n}',
        note: 'continue skips to the next pass; break leaves the loop completely.',
      },
    ],
  },
  {
    slug: 'flutter',
    title: 'Flutter',
    tagline: 'One codebase, every device',
    description:
      'Build real mobile apps with a single Dart codebase. Widgets compose into screens, and everything is a widget.',
    level: 'Intermediate',
    hours: 10,
    glyph: 'fl',
    color: '#0EA5E9',
    soft: '#E4F5FE',
    objectives: [
      'Understand the widget tree',
      'Compose layouts with rows and columns',
      'Hold and update screen state',
    ],
    lessons: [
      {
        slug: 'widgets',
        title: 'Widgets everywhere',
        minutes: 7,
        body: [
          'In Flutter the interface is a tree of widgets. Even padding and alignment are widgets wrapping others.',
          'You describe what the screen should look like for the current data, and Flutter handles the drawing.',
        ],
        lang: 'dart',
        code: 'Text(\n  "Hello, LearnCode",\n  style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),\n)',
        note: 'Widgets are immutable — to change the screen you rebuild with new values.',
      },
      {
        slug: 'layout',
        title: 'Layout with rows & columns',
        minutes: 8,
        body: [
          'Row lays children out horizontally, Column vertically. Both accept mainAxisAlignment for spacing.',
          'Wrap a Column in SingleChildScrollView whenever the content might outgrow the screen.',
        ],
        lang: 'dart',
        code: 'Column(\n  mainAxisAlignment: MainAxisAlignment.start,\n  children: [\n    Text("Level 4"),\n    SizedBox(height: 12),\n    ProgressBar(value: 0.68),\n  ],\n)',
        note: 'SizedBox is the idiomatic way to add a fixed gap between widgets.',
      },
      {
        slug: 'state',
        title: 'Holding state',
        minutes: 9,
        body: [
          'State is the data a screen depends on. Change it, and Flutter rebuilds only what needs to change.',
          'setState marks the widget dirty and schedules a rebuild — that single call is enough for most screens.',
        ],
        lang: 'dart',
        code: 'int streak = 3;\n\nvoid addDay() {\n  setState(() {\n    streak += 1;\n  });\n}',
        note: 'Keep state as high in the tree as the widgets that need it, and no higher.',
      },
    ],
  },
  {
    slug: 'dart',
    title: 'Dart',
    tagline: 'The language under Flutter',
    description:
      'Dart is the typed, friendly language that powers Flutter apps. Learn it once and read any Flutter project with confidence.',
    level: 'Beginner',
    hours: 6,
    glyph: 'dart',
    color: '#14B8A6',
    soft: '#E3F9F6',
    objectives: [
      'Declare variables with clear types',
      'Use null safety correctly',
      'Write classes and methods',
    ],
    lessons: [
      {
        slug: 'basics',
        title: 'Variables & null safety',
        minutes: 6,
        body: [
          'Dart is typed, but var infers the type for you. final means the value never changes after assignment.',
          'Null safety asks you to say whether a value can be missing by adding a question mark to its type.',
        ],
        lang: 'dart',
        code: 'var name = "Rani";\nfinal int level = 4;\nString? nickname;\n\nprint("$name is level $level");',
        note: 'String? can be null, String cannot. The compiler enforces the difference.',
      },
      {
        slug: 'collections',
        title: 'Lists & maps',
        minutes: 7,
        body: [
          'Lists keep order, maps keep keyed values. Both are created with square or curly brackets.',
          'Methods like map, where and forEach let you reshape a collection without writing a manual loop.',
        ],
        lang: 'dart',
        code: 'final langs = ["html", "dart", "flutter"];\nfinal scores = {"html": 90, "dart": 76};\n\nprint(langs.where((l) => l.length > 4).toList());',
        note: 'where returns a lazy iterable — add toList() when you need a real list.',
      },
      {
        slug: 'classes',
        title: 'Classes & objects',
        minutes: 8,
        body: [
          'A class groups data with the behaviour that belongs to it. The constructor builds one instance.',
          'This short constructor syntax assigns fields automatically, which keeps model classes tiny.',
        ],
        lang: 'dart',
        code: 'class Lesson {\n  final String title;\n  final int minutes;\n\n  Lesson(this.title, this.minutes);\n}\n\nfinal l = Lesson("Widgets", 7);',
        note: 'Mark fields final when they never change after construction — safer by default.',
      },
    ],
  },
];

export const quizzes = [
  {
    slug: 'html-essentials',
    title: 'HTML Essentials',
    type: 'Multiple Choice',
    level: 'Beginner',
    courseSlug: 'html-css',
    minutes: 4,
    xp: 60,
    questions: [
      {
        prompt: 'Which tag creates the largest heading on a page?',
        options: ['<head>', '<h1>', '<title>', '<p>'],
        answer: 1,
        explanation: 'h1 is the top-level heading. head and title describe the document itself, not its visible content.',
      },
      {
        prompt: 'Which element holds a paragraph of text?',
        options: ['<span>', '<div>', '<p>', '<br>'],
        answer: 2,
        explanation: 'p is the paragraph element. div groups blocks without meaning, and br only inserts a line break.',
      },
      {
        prompt: 'What does semantic HTML mean?',
        options: ['Using the tag that describes the meaning of the content', 'Writing tags in uppercase', 'Adding inline styles', 'Nesting as few tags as possible'],
        answer: 0,
        explanation: 'Semantic tags describe meaning — header, nav, main — so browsers, search engines and screen readers understand the structure.',
      },
    ],
  },
  {
    slug: 'python-predict',
    title: 'Predict the Output',
    type: 'Predict the Output',
    level: 'Beginner',
    courseSlug: 'python',
    minutes: 5,
    xp: 70,
    questions: [
      {
        prompt: 'What does this print?',
        code: 'scores = [10, 20, 30]\nprint(scores[1])',
        options: ['10', '20', '30', 'An error'],
        answer: 1,
        explanation: 'Indexes start at zero, so position 1 is the second item: 20.',
      },
      {
        prompt: 'What is the output?',
        code: 'print(len("learn"))',
        options: ['4', '5', '6', 'An error'],
        answer: 1,
        explanation: 'len counts characters: l-e-a-r-n is five characters.',
      },
      {
        prompt: 'What prints here?',
        code: 'total = 0\nfor n in [1, 2, 3]:\n    total += n\nprint(total)',
        options: ['3', '6', '123', '0'],
        answer: 1,
        explanation: 'The loop adds every number: 1 + 2 + 3 = 6.',
      },
    ],
  },
  {
    slug: 'js-complete-syntax',
    title: 'Complete the Syntax',
    type: 'Complete the Syntax',
    level: 'Intermediate',
    courseSlug: 'javascript',
    minutes: 5,
    xp: 80,
    questions: [
      {
        prompt: 'Which keyword declares a value that will not be reassigned?',
        code: '___ totalXp = 1280;',
        options: ['var', 'let', 'const', 'final'],
        answer: 2,
        explanation: 'const declares a binding you cannot reassign. let allows reassignment, var is the legacy form.',
      },
      {
        prompt: 'Fill in the arrow function body.',
        code: 'const double = (n) ___ n * 2;',
        options: ['=>', '->', '=', '{'],
        answer: 0,
        explanation: 'Arrow functions use => between the parameters and the body.',
      },
      {
        prompt: 'Which array method keeps only items that pass a test?',
        code: 'const passed = lessons.___((l) => l.done);',
        options: ['map', 'filter', 'find', 'push'],
        answer: 1,
        explanation: 'filter returns a new array with the items that returned true.',
      },
    ],
  },
  {
    slug: 'loops-logic',
    title: 'Loop Logic Challenge',
    type: 'Logic Challenge',
    level: 'Advanced',
    courseSlug: 'javascript',
    minutes: 6,
    xp: 100,
    questions: [
      {
        prompt: 'How many times does the body run?',
        code: 'for (let i = 0; i < 4; i++) {\n  console.log(i);\n}',
        options: ['3 times', '4 times', '5 times', 'Forever'],
        answer: 1,
        explanation: 'i takes the values 0, 1, 2 and 3 before the condition fails — four passes.',
      },
      {
        prompt: 'What is logged?',
        code: 'let xp = 10;\nfor (let i = 0; i < 2; i++) {\n  xp *= 2;\n}\nconsole.log(xp);',
        options: ['14', '20', '40', '100'],
        answer: 2,
        explanation: 'The loop doubles xp twice: 10 → 20 → 40.',
      },
      {
        prompt: 'Which loop order skips even numbers?',
        options: ['for (let i = 0; i < 6; i++) console.log(i)', 'for (let i = 1; i < 6; i += 2) console.log(i)', 'for (let i = 6; i > 0; i--) console.log(i)', 'while (true) console.log(2)'],
        answer: 1,
        explanation: 'Starting at 1 and stepping by 2 visits 1, 3 and 5 — odd numbers only.',
      },
    ],
  },
];

export const achievements = [
  { slug: 'first-step', title: 'First Step', desc: 'Complete your very first lesson', requirement: 'Finish 1 lesson', xp: 20, tone: '#4F46E5', metric: 'lessons', threshold: 1 },
  { slug: 'triple-streak', title: 'Warming Up', desc: 'Learn three days in a row', requirement: 'Reach a 3-day streak', xp: 40, tone: '#F59E0B', metric: 'streak', threshold: 3 },
  { slug: 'week-warrior', title: 'Week Warrior', desc: 'A full week of daily practice', requirement: 'Reach a 7-day streak', xp: 90, tone: '#F97316', metric: 'streak', threshold: 7 },
  { slug: 'xp-collector', title: 'XP Collector', desc: 'Bank your first 500 XP', requirement: 'Earn 500 XP', xp: 50, tone: '#3B82F6', metric: 'xp', threshold: 500 },
  { slug: 'xp-legend', title: 'XP Legend', desc: 'Two thousand XP and counting', requirement: 'Earn 2,000 XP', xp: 150, tone: '#8B5CF6', metric: 'xp', threshold: 2000 },
  { slug: 'quiz-rookie', title: 'Quiz Rookie', desc: 'Finish your first quiz', requirement: 'Complete 1 quiz', xp: 30, tone: '#14B8A6', metric: 'quizzes', threshold: 1 },
  { slug: 'quiz-machine', title: 'Quiz Machine', desc: 'Five quizzes completed', requirement: 'Complete 5 quizzes', xp: 120, tone: '#0EA5E9', metric: 'quizzes', threshold: 5 },
  { slug: 'perfect-score', title: 'Perfect Score', desc: 'Answer every question correctly', requirement: 'Score 100% on any quiz', xp: 100, tone: '#22C55E', metric: 'perfect', threshold: 1 },
  { slug: 'course-complete', title: 'Course Complete', desc: 'Finish every lesson in a course', requirement: 'Complete 1 full course', xp: 200, tone: '#EC4899', metric: 'courses', threshold: 1 },
  { slug: 'explorer', title: 'Explorer', desc: 'Try lessons from three languages', requirement: 'Start 3 different courses', xp: 60, tone: '#6366F1', metric: 'languages', threshold: 3 },
];

export const languages = courses.map((c) => ({ slug: c.slug, title: c.title, glyph: c.glyph, color: c.color, soft: c.soft }));

export const findCourse = (slug) => courses.find((c) => c.slug === slug);
export const findQuiz = (slug) => quizzes.find((q) => q.slug === slug);

export const lessonKey = (courseSlug, lessonSlug) => `${courseSlug}/${lessonSlug}`;

export const allLessons = courses.flatMap((c) =>
  c.lessons.map((l) => ({ ...l, courseSlug: c.slug, courseTitle: c.title, key: lessonKey(c.slug, l.slug) }))
);

export const totalLessonCount = allLessons.length;

export const findLesson = (courseSlug, lessonSlug) => {
  const course = findCourse(courseSlug);
  if (!course) return null;
  const index = course.lessons.findIndex((l) => l.slug === lessonSlug);
  if (index === -1) return null;
  return { course, lesson: course.lessons[index], index };
};