import { QuizItem } from './types';

// ── Math items (legacy, still functional) ────────────────────────────

export const mathQuestions: QuizItem[] = [
  {
    id: 'math_1',
    domain: 'math',
    tags: ['linear-equations', 'algebra'],
    difficulty: 'developing',
    title: 'Solving Linear Equations',
    question: 'Solve for x: 3x + 7 = 22',
    correctAnswer: '5',
    distractors: ['3', '7', '15'],
    explanation:
      'Subtract 7 from both sides: 3x = 15. Then divide both sides by 3: x = 5. If you chose 15, you forgot to divide by 3. If you chose 7, you confused the constant with the answer.',
    hints: ['First isolate the variable term', 'Subtract 7 from both sides'],
    misconceptions: ['Forgetting to divide by the coefficient after isolating'],
  },
  {
    id: 'math_2',
    domain: 'math',
    tags: ['fractions', 'addition'],
    difficulty: 'developing',
    title: 'Fraction Operations',
    question: 'What is 2/3 + 1/4?',
    correctAnswer: '11/12',
    distractors: ['3/7', '3/12', '8/12'],
    explanation:
      'Find a common denominator (12). Convert: 8/12 + 3/12 = 11/12. If you chose 3/7, you added numerators and denominators separately. If you chose 3/12, you only converted one fraction.',
    misconceptions: ['Adding numerators and denominators separately'],
  },
  {
    id: 'math_3',
    domain: 'math',
    tags: ['geometry', 'area'],
    difficulty: 'proficient',
    title: 'Area of Triangles',
    question: 'A triangle has a base of 10 cm and a height of 6 cm. What is its area?',
    correctAnswer: '30 cm²',
    distractors: ['60 cm²', '16 cm²', '36 cm²'],
    explanation:
      'Area = (1/2) × base × height = (1/2) × 10 × 6 = 30 cm². If you chose 60, you forgot to multiply by 1/2. If you chose 16, you added instead of multiplying.',
    misconceptions: ['Forgetting to halve (using rectangle formula instead)'],
  },
  {
    id: 'math_4',
    domain: 'math',
    tags: ['order-of-operations'],
    difficulty: 'beginning',
    title: 'Order of Operations',
    question: 'What is 3 + 4 × 2?',
    correctAnswer: '11',
    distractors: ['14', '10', '24'],
    explanation:
      'Multiplication before addition (PEMDAS). 4 × 2 = 8, then 3 + 8 = 11. If you chose 14, you added first then multiplied.',
    misconceptions: ['Computing left-to-right without respecting precedence'],
  },
  {
    id: 'math_5',
    domain: 'math',
    tags: ['percentages'],
    difficulty: 'proficient',
    title: 'Percentage Calculations',
    question: 'A shirt costs $80 and is 25% off. What is the sale price?',
    correctAnswer: '$60',
    distractors: ['$55', '$65', '$20'],
    explanation:
      '25% of $80 = $20 discount. Sale price = $80 - $20 = $60. If you chose $20, that\'s the discount, not the price.',
    misconceptions: ['Reporting the discount amount instead of the final price'],
  },
  {
    id: 'math_6',
    domain: 'math',
    tags: ['negative-numbers', 'integers'],
    difficulty: 'developing',
    title: 'Negative Numbers',
    question: 'What is -8 + 3?',
    correctAnswer: '-5',
    distractors: ['-11', '5', '11'],
    explanation:
      'Starting at -8, move 3 right on the number line: -5. If you chose -11, you subtracted instead of adding.',
    misconceptions: ['Subtracting instead of adding when one number is negative'],
  },
  {
    id: 'math_7',
    domain: 'math',
    tags: ['ratio', 'proportion'],
    difficulty: 'proficient',
    title: 'Ratio and Proportion',
    question: 'Boys to girls ratio is 3:5, 24 students total. How many girls?',
    correctAnswer: '15',
    distractors: ['9', '12', '16'],
    explanation:
      '3+5=8 parts. Each part = 24÷8 = 3. Girls = 5×3 = 15. If you chose 9, you found boys instead.',
    misconceptions: ['Calculating the wrong part of the ratio'],
  },
];

// ── Vibe Coding items ────────────────────────────────────────────────

export const vibecodingQuestions: QuizItem[] = [
  // ── Prompt Engineering ──
  {
    id: 'vc_prompt_1',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'specificity'],
    difficulty: 'beginning',
    title: 'Prompt Specificity',
    question: 'You want Claude to build a login form. Which prompt will get the best result?',
    correctAnswer: 'Build a login form with email and password fields, a "Sign in" button, input validation that shows errors inline, and a "Forgot password?" link below',
    distractors: [
      'Make me a login page',
      'Create the best login form possible using modern best practices',
      'I need authentication for my app',
    ],
    explanation:
      'Specific prompts with concrete requirements (fields, button text, validation behavior, extra links) produce much better results than vague ones. "Make me a login page" leaves too many decisions to the AI. "Best practices" is subjective and vague. "Authentication" is a backend concept, not a UI instruction.',
    misconceptions: ['Thinking longer prompts are always better — it\'s about specificity, not length'],
  },
  {
    id: 'vc_prompt_2',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'iteration'],
    difficulty: 'developing',
    title: 'Iterating on AI Output',
    question: 'Claude generated a component but the styling is off. What\'s the most effective follow-up?',
    correctAnswer: 'Make the card corners more rounded (16px), increase padding to 24px, and change the background to a subtle gradient from white to gray-50',
    distractors: [
      'Make it look better',
      'The styling is wrong, fix it',
      'Start over with a completely new design',
    ],
    explanation:
      'Effective iteration gives specific, measurable corrections. "Make it look better" gives the AI no direction. "Fix it" doesn\'t say what\'s wrong. Starting over throws away working logic — iterate on what you have.',
    misconceptions: ['Restarting from scratch when the logic works but styling needs tweaks'],
  },
  {
    id: 'vc_prompt_3',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'context'],
    difficulty: 'proficient',
    title: 'Providing Context',
    question: 'You\'re adding a feature to an existing Next.js app. What context should you give Claude Code first?',
    correctAnswer: 'Show it the relevant existing files — the component you\'re extending, the data types, and the current routing structure',
    distractors: [
      'Describe the entire app architecture in detail before asking for anything',
      'Just ask for the feature and let it figure out the codebase',
      'Paste your entire package.json so it knows all dependencies',
    ],
    explanation:
      'Claude Code can read your files directly — pointing it to the relevant ones gives it real context without noise. Describing everything manually is error-prone and slow. Letting it guess leads to wrong assumptions. package.json shows dependencies but not how your app is structured.',
    misconceptions: ['Thinking you need to manually describe code that Claude Code can read directly'],
  },
  {
    id: 'vc_prompt_4',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'decomposition'],
    difficulty: 'proficient',
    title: 'Breaking Down Complex Tasks',
    question: 'You want to build a full e-commerce checkout flow. What\'s the best prompting strategy?',
    correctAnswer: 'Break it into steps: first the cart summary component, then the address form, then payment integration, then order confirmation',
    distractors: [
      'Write one detailed prompt describing the entire checkout flow at once',
      'Ask for the whole thing and then fix whatever is wrong',
      'Copy a checkout flow from another site and ask Claude to replicate it',
    ],
    explanation:
      'Complex features should be decomposed into sequential steps. Each step can be reviewed and corrected before building on it. One massive prompt often produces inconsistent results. "Fix what\'s wrong" is harder than building correctly step by step. Copying another site may violate IP and misses your specific needs.',
    misconceptions: ['Thinking AI can handle arbitrarily complex tasks in a single prompt'],
  },

  // ── Reading & Evaluating AI Code ──
  {
    id: 'vc_read_1',
    domain: 'vibe-coding',
    tags: ['reading-code', 'security'],
    difficulty: 'proficient',
    title: 'Spotting Security Issues',
    question: 'Claude generated an API route that takes user input and runs: `db.query("SELECT * FROM users WHERE name = \'" + name + "\'")`. What\'s the problem?',
    correctAnswer: 'SQL injection — user input is directly concatenated into the query string',
    distractors: [
      'The query is too slow and needs an index',
      'SELECT * is inefficient, should select specific columns',
      'The single quotes should be double quotes',
    ],
    explanation:
      'Concatenating user input directly into SQL queries allows attackers to inject malicious SQL. Use parameterized queries instead. While SELECT * and missing indexes are real concerns, they\'re performance issues, not security vulnerabilities. Quote style is irrelevant here.',
    misconceptions: ['Focusing on performance before security when reviewing AI-generated code'],
  },
  {
    id: 'vc_read_2',
    domain: 'vibe-coding',
    tags: ['reading-code', 'react'],
    difficulty: 'developing',
    title: 'Understanding React State',
    question: 'This React code doesn\'t update the UI when clicked:\n\n`let count = 0;\nconst handleClick = () => { count++; };`\n\nWhy?',
    correctAnswer: 'Regular variables don\'t trigger re-renders — you need useState to make React update the UI',
    distractors: [
      'The variable should be declared with const instead of let',
      'handleClick needs to be wrapped in useCallback',
      'You need to call forceUpdate() after changing the variable',
    ],
    explanation:
      'React only re-renders when state (via useState/useReducer) or props change. A plain variable changing doesn\'t tell React anything happened. const would make it unassignable. useCallback is for memoization, not reactivity. forceUpdate is a class component escape hatch, not the solution.',
    misconceptions: ['Not understanding that React needs useState to track changes and trigger re-renders'],
  },
  {
    id: 'vc_read_3',
    domain: 'vibe-coding',
    tags: ['reading-code', 'common-mistakes'],
    difficulty: 'developing',
    title: 'Off-by-One Errors',
    question: 'Claude wrote: `for (let i = 0; i <= arr.length; i++)` to loop through an array. What\'s wrong?',
    correctAnswer: 'It should be i < arr.length — using <= goes one past the end and will access undefined',
    distractors: [
      'Nothing is wrong, this is correct',
      'It should start at i = 1',
      'You should use arr.forEach() instead of a for loop',
    ],
    explanation:
      'Arrays are zero-indexed, so valid indices are 0 to length-1. Using <= accesses index === length, which is undefined and could cause bugs. Starting at 1 would skip the first element. forEach is a valid alternative but doesn\'t fix the bug — the question is about identifying the error.',
    misconceptions: ['Missing off-by-one errors because the code "looks close enough"'],
  },
  {
    id: 'vc_read_4',
    domain: 'vibe-coding',
    tags: ['reading-code', 'api'],
    difficulty: 'proficient',
    title: 'API Error Handling',
    question: 'Claude generated a fetch call but didn\'t handle errors:\n\n`const data = await fetch("/api/users").then(r => r.json());`\n\nWhat could go wrong?',
    correctAnswer: 'If the request fails or returns a non-200 status, r.json() will either throw or return error HTML parsed as JSON, crashing the app',
    distractors: [
      'Nothing — fetch handles errors automatically',
      'The await is unnecessary since .then() already handles the promise',
      'You need to use axios instead of fetch for error handling',
    ],
    explanation:
      'fetch doesn\'t throw on HTTP errors (404, 500) — it only throws on network failures. You need to check response.ok before parsing. The await is needed to get the final value from the .then() chain. axios isn\'t required — fetch works fine with proper error checking.',
    misconceptions: ['Assuming fetch throws on HTTP error status codes like 404 or 500'],
  },

  // ── Dev Tooling & Workflow ──
  {
    id: 'vc_tool_1',
    domain: 'vibe-coding',
    tags: ['tooling', 'ai-tools'],
    difficulty: 'beginning',
    title: 'Choosing the Right AI Tool',
    question: 'You need to add a feature to an existing codebase with 50+ files. Which tool is best?',
    correctAnswer: 'Claude Code (CLI) — it can read your files, understand the project structure, and make targeted edits',
    distractors: [
      'ChatGPT web — paste the files you think are relevant into the chat',
      'Cursor — it only works for small projects',
      'Write it manually — AI can\'t handle existing codebases',
    ],
    explanation:
      'Claude Code can explore your full codebase, read files, understand dependencies, and make precise edits. Pasting files into ChatGPT loses project context and structure. Cursor actually works well for existing projects too (it\'s not limited to small ones). AI handles existing codebases well when given proper access.',
    misconceptions: ['Thinking you need to manually paste code into AI chat for it to help'],
  },
  {
    id: 'vc_tool_2',
    domain: 'vibe-coding',
    tags: ['tooling', 'git'],
    difficulty: 'beginning',
    title: 'Git Basics',
    question: 'You just finished a feature. What\'s the correct order of git commands to save and share your work?',
    correctAnswer: 'git add, git commit, git push',
    distractors: [
      'git push, git commit, git add',
      'git commit, git push',
      'git save, git upload',
    ],
    explanation:
      'Git has a staging workflow: add (stage files) → commit (save a snapshot locally) → push (upload to remote). You can\'t push before committing, and you can\'t commit without adding. There are no "save" or "upload" commands in git.',
    misconceptions: ['Thinking git commit automatically uploads to GitHub'],
  },
  {
    id: 'vc_tool_3',
    domain: 'vibe-coding',
    tags: ['tooling', 'npm'],
    difficulty: 'developing',
    title: 'Package Management',
    question: 'You cloned a repo and ran `npm start` but got errors about missing modules. What should you do first?',
    correctAnswer: 'Run npm install — the node_modules directory isn\'t included in git repos, so you need to install dependencies locally',
    distractors: [
      'Delete the project and clone it again',
      'Manually download each missing module from npm\'s website',
      'Run npm update to get the latest versions of everything',
    ],
    explanation:
      'node_modules is gitignored (it\'s huge). After cloning, you need npm install to download dependencies listed in package.json. Re-cloning won\'t help since node_modules still won\'t be there. npm update changes versions, which could introduce breaking changes.',
    misconceptions: ['Not understanding that dependencies must be installed after cloning'],
  },
  {
    id: 'vc_tool_4',
    domain: 'vibe-coding',
    tags: ['tooling', 'environment'],
    difficulty: 'proficient',
    title: 'Environment Variables',
    question: 'Your app needs an API key. Where should you put it?',
    correctAnswer: 'In a .env file that\'s listed in .gitignore, and set as an environment variable in your deployment platform',
    distractors: [
      'Hardcode it in your JavaScript file — it\'s the simplest approach',
      'Put it in a comment in your code so you remember it',
      'Store it in package.json under a "secrets" field',
    ],
    explanation:
      'API keys should never be in code or version control. .env files + .gitignore keeps them out of git. Deployment platforms (Vercel, Netlify) have their own environment variable settings. Hardcoding, comments, or package.json all expose secrets in your git history.',
    misconceptions: ['Hardcoding secrets in source code because it\'s convenient'],
  },

  // ── Web Fundamentals ──
  {
    id: 'vc_web_1',
    domain: 'vibe-coding',
    tags: ['react', 'components'],
    difficulty: 'beginning',
    title: 'React Components',
    question: 'What is a React component?',
    correctAnswer: 'A function that returns JSX (HTML-like code) and can accept props as input',
    distractors: [
      'A CSS class that styles HTML elements',
      'A database table that stores user data',
      'A server that handles API requests',
    ],
    explanation:
      'React components are JavaScript functions that return UI (JSX). They can receive data via props and manage internal state. CSS classes are for styling, not components. Database tables and servers are backend concerns, not React concepts.',
    misconceptions: ['Confusing React components with HTML elements or CSS classes'],
  },
  {
    id: 'vc_web_2',
    domain: 'vibe-coding',
    tags: ['nextjs', 'routing'],
    difficulty: 'developing',
    title: 'Next.js File-Based Routing',
    question: 'In Next.js App Router, where do you create a file to make a page at /about?',
    correctAnswer: 'src/app/about/page.tsx',
    distractors: [
      'src/pages/about.tsx',
      'src/routes/about.tsx',
      'src/components/About.tsx',
    ],
    explanation:
      'Next.js App Router uses the file system for routing. A page.tsx inside app/about/ creates the /about route. pages/about.tsx is the old Pages Router pattern. routes/ doesn\'t exist in Next.js. Components don\'t automatically create routes.',
    misconceptions: ['Confusing App Router and Pages Router file conventions'],
  },
  {
    id: 'vc_web_3',
    domain: 'vibe-coding',
    tags: ['tailwind', 'css'],
    difficulty: 'beginning',
    title: 'Tailwind CSS Basics',
    question: 'What does `className="bg-blue-500 text-white p-4 rounded-lg"` do?',
    correctAnswer: 'Sets a blue background, white text, padding on all sides, and rounded corners',
    distractors: [
      'Creates a blue button with an onClick handler',
      'Imports the Blue component from Tailwind\'s library',
      'Generates a CSS file called blue-500.css',
    ],
    explanation:
      'Tailwind uses utility classes: bg-blue-500 (background), text-white (text color), p-4 (padding), rounded-lg (border radius). These are CSS classes, not components or file generators. No JavaScript behavior is added by className.',
    misconceptions: ['Thinking Tailwind classes add behavior, not just styling'],
  },
  {
    id: 'vc_web_4',
    domain: 'vibe-coding',
    tags: ['deployment', 'vercel'],
    difficulty: 'developing',
    title: 'Deploying to Vercel',
    question: 'What happens when you run `vercel --prod` in your Next.js project?',
    correctAnswer: 'Your code is uploaded to Vercel\'s servers, built remotely, and deployed to a live URL',
    distractors: [
      'It builds locally and uploads the built files',
      'It creates a Docker container on your machine',
      'It sends your code to npm for others to install',
    ],
    explanation:
      'Vercel builds remotely on their infrastructure (faster than local builds). It deploys to a live URL you can share. It does NOT build locally — that\'s a common misconception. Docker and npm are unrelated to Vercel deployment.',
    misconceptions: ['Thinking vercel --prod runs a local build'],
  },

  // ── Debugging with AI ──
  {
    id: 'vc_debug_1',
    domain: 'vibe-coding',
    tags: ['debugging', 'error-messages'],
    difficulty: 'beginning',
    title: 'Reading Error Messages',
    question: 'You see: "TypeError: Cannot read properties of undefined (reading \'map\')". What does this mean?',
    correctAnswer: 'You\'re calling .map() on a variable that is undefined — the data hasn\'t loaded yet or doesn\'t exist',
    distractors: [
      'The map() function has a bug in JavaScript itself',
      'Your computer doesn\'t have the Map library installed',
      'The array is too large for JavaScript to handle',
    ],
    explanation:
      'This error means something is undefined when you try to use .map() on it. Common cause: trying to map over API data before the fetch completes. Fix: add a loading check or default to an empty array. JavaScript\'s map works fine — the issue is your data.',
    misconceptions: ['Blaming the language or library instead of checking your data'],
  },
  {
    id: 'vc_debug_2',
    domain: 'vibe-coding',
    tags: ['debugging', 'ai-assisted'],
    difficulty: 'developing',
    title: 'Getting Help from AI with Bugs',
    question: 'Your app has a bug. What should you share with Claude to get the best fix?',
    correctAnswer: 'The error message, the relevant code, what you expected to happen, and what actually happened',
    distractors: [
      'Just the error message — that\'s enough context',
      'Your entire codebase — more context is always better',
      'A screenshot of the broken page — AI can figure it out visually',
    ],
    explanation:
      'Good bug reports have: error message, relevant code, expected vs. actual behavior. Just the error lacks context. Your entire codebase adds noise. Screenshots help but don\'t show the code causing the issue. The combination gives AI everything needed for a precise fix.',
    misconceptions: ['Thinking the error message alone is enough context for debugging'],
  },
  {
    id: 'vc_debug_3',
    domain: 'vibe-coding',
    tags: ['debugging', 'deployment'],
    difficulty: 'proficient',
    title: 'Build vs. Runtime Errors',
    question: 'Your app works perfectly in dev (`npm run dev`) but fails on Vercel. Most likely cause?',
    correctAnswer: 'TypeScript strict mode or build-time checks catch errors that dev mode ignores — check the Vercel build logs',
    distractors: [
      'Vercel uses a different programming language',
      'Your code only works on Mac, not Linux',
      'Vercel doesn\'t support Next.js',
    ],
    explanation:
      'Dev mode (next dev) is lenient — it skips type checking and some optimizations. Production builds (next build) are strict. Common failures: TypeScript errors, missing imports, dynamic code that assumes browser APIs exist during server rendering. Vercel is the company behind Next.js, so compatibility isn\'t the issue.',
    misconceptions: ['Assuming if it works in dev, it will work in production'],
  },
  {
    id: 'vc_debug_4',
    domain: 'vibe-coding',
    tags: ['debugging', 'hydration'],
    difficulty: 'advanced',
    title: 'Hydration Errors',
    question: 'You see "Hydration failed because the initial UI does not match what was rendered on the server." What causes this?',
    correctAnswer: 'Your component renders different content on the server vs. the browser — often from using browser-only values like window, Date, or Math.random() during render',
    distractors: [
      'Your CSS isn\'t loading fast enough',
      'React is out of date and needs to be updated',
      'Your HTML has invalid nesting (like a div inside a p tag)',
    ],
    explanation:
      'Hydration errors happen when server-rendered HTML doesn\'t match what React generates in the browser. Common causes: Date.now(), window.innerWidth, random values, or localStorage in the render path. While invalid HTML nesting can also cause this, browser-only APIs are the most common culprit. CSS timing and React versions are unrelated.',
    misconceptions: ['Not understanding server vs. client rendering in Next.js'],
  },

  // ── More prompt engineering ──
  {
    id: 'vc_prompt_5',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'claude-code'],
    difficulty: 'developing',
    title: 'CLAUDE.md Files',
    question: 'What is the purpose of a CLAUDE.md file in your project?',
    correctAnswer: 'It gives Claude Code persistent instructions about your project — coding style, conventions, and important context that applies to every session',
    distractors: [
      'It\'s a changelog that Claude writes after each session',
      'It\'s required for Claude Code to run — the CLI won\'t start without it',
      'It\'s a backup of your conversation history with Claude',
    ],
    explanation:
      'CLAUDE.md is like project-specific instructions that Claude Code reads at the start of every session. It\'s where you put coding conventions, deployment commands, key architecture decisions, and anything you\'d otherwise repeat every conversation. It\'s optional, not required, and not auto-generated.',
    misconceptions: ['Thinking CLAUDE.md is auto-generated or required'],
  },
  {
    id: 'vc_prompt_6',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'multi-turn'],
    difficulty: 'proficient',
    title: 'Multi-Turn Strategy',
    question: 'You\'re building a dashboard. After Claude creates the layout, you notice the charts aren\'t interactive. Best next prompt?',
    correctAnswer: 'Make the bar chart interactive — add hover tooltips showing the exact value, and clicking a bar should filter the table below to that category',
    distractors: [
      'The charts should be interactive',
      'Add interactivity to everything on the page',
      'Delete the charts and use a different charting library',
    ],
    explanation:
      'Good follow-ups are specific about what "interactive" means for YOUR use case. "Charts should be interactive" is vague. "Add interactivity to everything" is too broad and may break working parts. Switching libraries is drastic when the current one likely supports what you need.',
    misconceptions: ['Using vague follow-ups instead of specifying exact behaviors'],
  },

  // ── More reading code ──
  {
    id: 'vc_read_5',
    domain: 'vibe-coding',
    tags: ['reading-code', 'async'],
    difficulty: 'developing',
    title: 'Async/Await',
    question: 'What happens if you forget the `await` keyword before a fetch call?\n\n`const data = fetch("/api/users");`',
    correctAnswer: 'data will be a Promise object, not the actual response — any code using data.json() or data.status will fail or behave unexpectedly',
    distractors: [
      'The code will throw an error immediately',
      'The fetch will still work, just slightly slower',
      'Nothing — await is optional syntax sugar',
    ],
    explanation:
      'Without await, fetch returns a Promise (a placeholder for the future result). The code continues immediately with the unresolved Promise. It won\'t crash right away, but using the Promise as if it were the response will fail. await is not optional — it\'s how you get the actual value.',
    misconceptions: ['Thinking await is optional and fetch returns data directly'],
  },
  {
    id: 'vc_read_6',
    domain: 'vibe-coding',
    tags: ['reading-code', 'typescript'],
    difficulty: 'developing',
    title: 'TypeScript Types',
    question: 'Claude added `interface User { name: string; age: number; }` to your code. What does this do?',
    correctAnswer: 'It defines the shape of a User object — TypeScript will warn you if you try to create a User with missing or wrong-typed fields',
    distractors: [
      'It creates a User class with name and age methods',
      'It adds name and age columns to your database',
      'It generates a user registration form',
    ],
    explanation:
      'TypeScript interfaces define the structure of data — they\'re compile-time type checking, not runtime code. They don\'t create classes, touch databases, or generate UI. They help catch bugs early by ensuring your code uses data correctly.',
    misconceptions: ['Confusing TypeScript interfaces with classes, database schemas, or UI'],
  },

  // ── More tooling ──
  {
    id: 'vc_tool_5',
    domain: 'vibe-coding',
    tags: ['tooling', 'terminal'],
    difficulty: 'beginning',
    title: 'Terminal Basics',
    question: 'What does `cd` do in the terminal?',
    correctAnswer: 'Changes the current directory — like navigating to a different folder',
    distractors: [
      'Creates a new directory',
      'Copies a directory to a new location',
      'Deletes a directory permanently',
    ],
    explanation:
      'cd = "change directory." It navigates you to a different folder in your file system. mkdir creates directories. cp copies. rm deletes. These are fundamental terminal commands worth memorizing.',
    misconceptions: ['Confusing cd, mkdir, cp, and rm commands'],
  },
  {
    id: 'vc_tool_6',
    domain: 'vibe-coding',
    tags: ['tooling', 'git'],
    difficulty: 'developing',
    title: 'Git Branches',
    question: 'Why would you create a git branch before working on a new feature?',
    correctAnswer: 'To isolate your changes from the main code, so you can experiment without breaking what\'s already working',
    distractors: [
      'Git requires a new branch for every file change',
      'Branches make your code run faster',
      'You need a branch to be able to save files',
    ],
    explanation:
      'Branches let you work on features independently. If something goes wrong, main is unaffected. You can merge when ready. Git doesn\'t require branches for every change — it\'s a best practice for collaboration and safety. Branches have no effect on performance.',
    misconceptions: ['Thinking branches are required rather than a safety practice'],
  },
];

// ── Combined & utility functions ─────────────────────────────────────

export const sampleQuestions: QuizItem[] = vibecodingQuestions;

export const allQuestions: QuizItem[] = [...vibecodingQuestions, ...mathQuestions];

export function getQuestionsByDomain(domain: string): QuizItem[] {
  return allQuestions.filter((q) => q.domain === domain);
}

export function getQuestionsByTag(tag: string): QuizItem[] {
  return allQuestions.filter((q) => q.tags.includes(tag));
}

export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function buildQuizOptions(item: QuizItem): {
  options: string[];
  correctIndex: number;
} {
  const correctAnswer = String(item.correctAnswer);
  const distractors = item.distractors.map(String).slice(0, 3);

  while (distractors.length < 3) {
    distractors.push(`Option ${distractors.length + 2}`);
  }

  const allOptions = [correctAnswer, ...distractors];
  const shuffled = shuffleArray(allOptions);
  const correctIndex = shuffled.indexOf(correctAnswer);

  return { options: shuffled, correctIndex };
}
