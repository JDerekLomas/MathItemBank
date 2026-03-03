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

  // ── Prompt Engineering (continued) ──
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
  {
    id: 'vc_prompt_7',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'system-prompts'],
    difficulty: 'developing',
    title: 'System Prompts',
    question: 'You want Claude to always respond with TypeScript code that uses Tailwind CSS. Where is the best place to put this instruction?',
    correctAnswer: 'In a system prompt or CLAUDE.md file so it applies to every message without repeating yourself',
    distractors: [
      'Mention it at the end of every single message you send',
      'Put it in a comment inside your package.json',
      'Configure it in your tsconfig.json compiler options',
    ],
    explanation:
      'System prompts (or CLAUDE.md for Claude Code) set persistent context for the entire conversation. This avoids repeating instructions and ensures consistency. tsconfig.json controls TypeScript compiler behavior, not AI behavior. package.json comments don\'t affect anything.',
    misconceptions: ['Repeating the same instruction in every prompt instead of setting it once'],
  },
  {
    id: 'vc_prompt_8',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'few-shot'],
    difficulty: 'proficient',
    title: 'Few-Shot Examples',
    question: 'You want Claude to generate API routes in a specific format your team uses. What\'s the most reliable way to ensure consistency?',
    correctAnswer: 'Show Claude 2-3 examples of existing routes in your codebase and say "follow this same pattern"',
    distractors: [
      'Describe the format in a long paragraph of text',
      'Ask Claude to guess your team\'s style from the project name',
      'Tell Claude to use best practices and hope it matches',
    ],
    explanation:
      'Few-shot prompting (providing examples) is far more effective than describing patterns in words. Concrete examples remove ambiguity about spacing, naming, error handling, and structure. Descriptions can be misinterpreted. Guessing from a project name is unreliable. "Best practices" is subjective.',
    misconceptions: ['Describing patterns in words when showing an example would be clearer'],
  },
  {
    id: 'vc_prompt_9',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'chain-of-thought'],
    difficulty: 'proficient',
    title: 'Chain-of-Thought Prompting',
    question: 'You need Claude to design a complex database schema. Which prompt strategy helps it think through the problem better?',
    correctAnswer: '"First list the entities and their relationships, then define the tables, then add indexes based on the query patterns I\'ll describe"',
    distractors: [
      '"Give me the SQL for the entire database right now"',
      '"Think hard about this"',
      '"Be very careful and don\'t make mistakes"',
    ],
    explanation:
      'Breaking the reasoning into explicit steps (chain-of-thought) helps the AI work through complexity methodically. Asking for everything at once skips important design thinking. "Think hard" and "be careful" are vague meta-instructions that don\'t guide the actual reasoning process.',
    misconceptions: ['Thinking "be careful" or "think hard" are effective ways to improve AI output quality'],
  },
  {
    id: 'vc_prompt_10',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'persona'],
    difficulty: 'beginning',
    title: 'Persona-Based Prompting',
    question: 'You want code review feedback. Which prompt approach gets the most useful response?',
    correctAnswer: '"Review this code as a senior developer focused on security and performance. Flag any issues and explain why they matter."',
    distractors: [
      '"Is this code good?"',
      '"Rate this code from 1 to 10"',
      '"Find every possible thing wrong with this code"',
    ],
    explanation:
      'Giving the AI a specific role (senior developer) with clear focus areas (security, performance) and a format (flag + explain) produces targeted, actionable feedback. "Is this good?" gets a yes/no. Ratings aren\'t actionable. "Find everything wrong" produces overwhelming nitpicks.',
    misconceptions: ['Asking for vague quality assessments instead of specific review criteria'],
  },
  {
    id: 'vc_prompt_11',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'constraints'],
    difficulty: 'developing',
    title: 'Constraint Specification',
    question: 'You\'re generating a React component and want to avoid complexity. Which constraint is most useful to include in your prompt?',
    correctAnswer: '"Use only useState — no external state libraries, no useReducer, no context. Keep it under 80 lines."',
    distractors: [
      '"Make it simple"',
      '"Don\'t use anything complicated"',
      '"Write clean code"',
    ],
    explanation:
      'Explicit constraints (specific hooks, line limits, no external libraries) give the AI concrete boundaries. "Simple," "not complicated," and "clean" mean different things to different people — and to AI models. Measurable constraints produce predictable results.',
    misconceptions: ['Using subjective quality words instead of concrete technical constraints'],
  },
  {
    id: 'vc_prompt_12',
    domain: 'vibe-coding',
    tags: ['prompt-engineering', 'output-format'],
    difficulty: 'beginning',
    title: 'Output Format Specification',
    question: 'You want Claude to generate a component plus usage instructions. How should you specify the output format?',
    correctAnswer: '"Give me: 1) the component code in a single file, 2) an example of how to import and use it, 3) a list of the props it accepts"',
    distractors: [
      '"Give me everything I need"',
      '"Generate a component"',
      '"Write the code and also explain it, maybe with some examples or whatever seems useful"',
    ],
    explanation:
      'Numbered output sections tell the AI exactly what to produce and in what order. "Everything I need" is undefined. "Generate a component" omits the documentation you want. Vague instructions like "whatever seems useful" let the AI decide what matters, which may not match your needs.',
    misconceptions: ['Leaving the output structure entirely up to the AI'],
  },

  // ── Reading & Evaluating AI Code (continued) ──
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
  {
    id: 'vc_read_7',
    domain: 'vibe-coding',
    tags: ['reading-code', 'closures'],
    difficulty: 'proficient',
    title: 'Understanding Closures',
    question: 'Claude wrote a `createCounter()` function that returns an inner function. Each time you call the inner function, it increments a count. How does the inner function still access `count` after `createCounter` finishes?',
    correctAnswer: 'Closures — the inner function "remembers" variables from its parent scope even after the parent function has returned',
    distractors: [
      'JavaScript copies the variable into the inner function automatically',
      'The count variable is stored in the global scope',
      'It doesn\'t — the variable is garbage collected and this code will crash',
    ],
    explanation:
      'Closures are a core JavaScript concept: functions retain access to their enclosing scope\'s variables. The variable isn\'t copied or global — it lives in the closure. This is how patterns like private state and factory functions work. The code won\'t crash; closures prevent garbage collection of captured variables.',
    misconceptions: ['Thinking variables disappear when their parent function returns'],
  },
  {
    id: 'vc_read_8',
    domain: 'vibe-coding',
    tags: ['reading-code', 'prop-drilling'],
    difficulty: 'developing',
    title: 'Recognizing Prop Drilling',
    question: 'Claude built a component tree where `userId` is passed from App → Layout → Sidebar → UserMenu → Avatar. Each middle component just passes it through without using it. What is this pattern called?',
    correctAnswer: 'Prop drilling — passing data through multiple layers of components that don\'t need it themselves',
    distractors: [
      'Dependency injection — a clean way to share data',
      'Data binding — how React automatically syncs state',
      'Component composition — the recommended React pattern',
    ],
    explanation:
      'Prop drilling is when data passes through intermediary components that don\'t use it, just to reach a deeply nested component. It makes refactoring hard and clutters component interfaces. Solutions include React Context, state management libraries, or component composition patterns.',
    misconceptions: ['Thinking prop drilling is the standard way to share data in React'],
  },
  {
    id: 'vc_read_9',
    domain: 'vibe-coding',
    tags: ['reading-code', 'infinite-loops'],
    difficulty: 'proficient',
    title: 'Spotting Infinite Loops',
    question: 'Claude wrote: `useEffect(() => { setCount(count + 1); }, [count]);` — What will happen?',
    correctAnswer: 'Infinite loop — the effect runs when count changes, but it changes count, which triggers the effect again forever',
    distractors: [
      'It increments count once and stops',
      'React will automatically detect the loop and stop it',
      'It will throw a syntax error because you can\'t use count inside the effect',
    ],
    explanation:
      'This is a classic infinite loop: the effect depends on `count` and also modifies `count`, creating an endless cycle of updates. React doesn\'t auto-detect this. No syntax error occurs — the code is valid, just logically flawed. The page will freeze or crash.',
    misconceptions: ['Assuming React prevents infinite loops automatically'],
  },
  {
    id: 'vc_read_10',
    domain: 'vibe-coding',
    tags: ['reading-code', 'array-methods'],
    difficulty: 'developing',
    title: 'Reading Map/Filter/Reduce',
    question: 'What does this code return?\n\n`[1, 2, 3, 4, 5].filter(n => n > 2).map(n => n * 10)`',
    correctAnswer: '[30, 40, 50] — filter keeps numbers greater than 2, then map multiplies each by 10',
    distractors: [
      '[10, 20, 30, 40, 50] — map runs first, then filter',
      '[30, 40, 50, 60, 70] — filter adds 2 to each number',
      '[3, 4, 5] — only filter runs because map is after it',
    ],
    explanation:
      'Method chaining runs left to right: filter(n > 2) produces [3, 4, 5], then map(n * 10) produces [30, 40, 50]. Both methods run — chaining doesn\'t cancel anything. Filter keeps elements matching the condition; it doesn\'t transform them.',
    misconceptions: ['Misunderstanding the order of chained array methods'],
  },
  {
    id: 'vc_read_11',
    domain: 'vibe-coding',
    tags: ['reading-code', 'useeffect'],
    difficulty: 'proficient',
    title: 'useEffect Dependencies',
    question: 'What\'s the difference between `useEffect(() => { ... }, [])` and `useEffect(() => { ... })`?',
    correctAnswer: 'Empty array [] runs the effect once on mount. No array at all runs the effect after every single render.',
    distractors: [
      'They\'re identical — the empty array is optional',
      'No array means the effect never runs',
      'Empty array runs on every render, no array runs once',
    ],
    explanation:
      'The dependency array controls when effects re-run. [] means "no dependencies, run once." Omitting it entirely means "run after every render." This is a critical distinction — omitting the array is usually a bug that causes performance issues or infinite loops when the effect updates state.',
    misconceptions: ['Thinking the dependency array is optional with no behavioral difference'],
  },
  {
    id: 'vc_read_12',
    domain: 'vibe-coding',
    tags: ['reading-code', 'memory-leaks'],
    difficulty: 'proficient',
    title: 'Recognizing Memory Leaks',
    question: 'Claude\'s component adds an event listener in useEffect but never removes it:\n\n`useEffect(() => { window.addEventListener("resize", handleResize); }, []);`\n\nWhat\'s the problem?',
    correctAnswer: 'Memory leak — when the component unmounts, the listener stays active. You need a cleanup function that calls removeEventListener.',
    distractors: [
      'Nothing — React automatically cleans up event listeners',
      'addEventListener doesn\'t work inside useEffect',
      'You need to use useCallback for the handler, but otherwise it\'s fine',
    ],
    explanation:
      'useEffect cleanup functions run when the component unmounts. Without one, event listeners, timers, and subscriptions persist after the component is gone, leaking memory and potentially causing errors. Return a cleanup function: `return () => window.removeEventListener("resize", handleResize);`',
    misconceptions: ['Thinking React automatically cleans up browser-level side effects'],
  },

  // ── Dev Tooling & Workflow (continued) ──
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
  {
    id: 'vc_tool_7',
    domain: 'vibe-coding',
    tags: ['tooling', 'git'],
    difficulty: 'beginning',
    title: '.gitignore Purpose',
    question: 'What does a `.gitignore` file do?',
    correctAnswer: 'Tells git which files and folders to NOT track — like node_modules, .env files, and build artifacts',
    distractors: [
      'Deletes files from your project permanently',
      'Hides files so they\'re invisible on your computer',
      'Prevents other people from reading your code on GitHub',
    ],
    explanation:
      '.gitignore lists patterns of files/folders that git should ignore. This keeps your repo clean by excluding generated files (node_modules, .next), secrets (.env), and OS files (.DS_Store). The files still exist locally — they\'re just not tracked or pushed to the remote.',
    misconceptions: ['Thinking .gitignore deletes files or makes them invisible'],
  },
  {
    id: 'vc_tool_8',
    domain: 'vibe-coding',
    tags: ['tooling', 'npm'],
    difficulty: 'beginning',
    title: 'npm Scripts',
    question: 'In a Next.js project, what\'s the difference between `npm run dev`, `npm run build`, and `npm run start`?',
    correctAnswer: 'dev starts a local development server with hot reload, build creates an optimized production bundle, start runs the built production bundle',
    distractors: [
      'They all do the same thing — just different names for running the app',
      'dev deploys to staging, build deploys to production, start opens the browser',
      'dev installs dependencies, build compiles TypeScript, start uploads to npm',
    ],
    explanation:
      'These three scripts serve different stages: dev is for local development (fast, with hot reload), build creates optimized production files, and start serves those built files. You run dev while coding, build before deploying, and start in production. They are NOT interchangeable.',
    misconceptions: ['Using npm run dev in production instead of build + start'],
  },
  {
    id: 'vc_tool_9',
    domain: 'vibe-coding',
    tags: ['tooling', 'npm'],
    difficulty: 'developing',
    title: 'Package Lock Files',
    question: 'Your project has both `package.json` and `package-lock.json`. Why is the lock file important?',
    correctAnswer: 'It records the exact version of every dependency installed, so everyone on the team gets identical packages',
    distractors: [
      'It\'s a backup of package.json in case it gets deleted',
      'It locks the project so no one else can install packages',
      'It\'s automatically generated but safe to delete — it rebuilds itself',
    ],
    explanation:
      'package-lock.json ensures reproducible installs. Without it, `npm install` might get different versions on different machines (because package.json uses version ranges like ^1.2.0). The lock file pins exact versions. Always commit it to git. Deleting it can cause "works on my machine" bugs.',
    misconceptions: ['Thinking the lock file is unnecessary or should be gitignored'],
  },
  {
    id: 'vc_tool_10',
    domain: 'vibe-coding',
    tags: ['tooling', 'vscode'],
    difficulty: 'beginning',
    title: 'VS Code Shortcuts',
    question: 'You need to quickly open a file in a large project without clicking through folders. What VS Code shortcut helps?',
    correctAnswer: 'Cmd/Ctrl + P — opens a quick file finder where you can type any part of the filename',
    distractors: [
      'Cmd/Ctrl + S — searches through all files',
      'Cmd/Ctrl + N — creates a new file with that name',
      'Cmd/Ctrl + Z — finds recently opened files',
    ],
    explanation:
      'Cmd/Ctrl + P (Quick Open) is one of the most useful VS Code shortcuts. Type any part of a filename and it fuzzy-matches across the entire project. Cmd+S saves, Cmd+N creates a new file, Cmd+Z undoes. Knowing a few key shortcuts dramatically speeds up development.',
    misconceptions: ['Navigating large projects by clicking through the file tree'],
  },
  {
    id: 'vc_tool_11',
    domain: 'vibe-coding',
    tags: ['tooling', 'terminal'],
    difficulty: 'developing',
    title: 'Terminal Piping',
    question: 'What does the `|` (pipe) operator do in a terminal command like `cat log.txt | grep "error"`?',
    correctAnswer: 'It sends the output of the first command as input to the second — so this finds lines containing "error" in the log file',
    distractors: [
      'It runs both commands at the same time in parallel',
      'It means "or" — run the second command only if the first one fails',
      'It combines two files together',
    ],
    explanation:
      'The pipe operator (|) connects the output of one command to the input of another. `cat log.txt` outputs the file contents, and `grep "error"` filters for matching lines. This chaining is fundamental to the Unix philosophy of combining small tools. `||` (double pipe) is the "or" operator.',
    misconceptions: ['Confusing | (pipe) with || (or) in terminal commands'],
  },
  {
    id: 'vc_tool_12',
    domain: 'vibe-coding',
    tags: ['tooling', 'git'],
    difficulty: 'developing',
    title: 'SSH Keys for GitHub',
    question: 'GitHub asks you to set up SSH keys. What do they do?',
    correctAnswer: 'SSH keys let your computer authenticate with GitHub without typing your password every time you push or pull',
    distractors: [
      'They encrypt your code so no one can read it on GitHub',
      'They make git commands run faster by using a secure protocol',
      'They\'re required to create a GitHub account',
    ],
    explanation:
      'SSH keys are a passwordless authentication method. You generate a key pair (public + private), add the public key to GitHub, and your computer uses the private key to prove your identity. Code on GitHub isn\'t encrypted by SSH. Speed isn\'t the primary benefit. SSH keys are optional (HTTPS with tokens works too).',
    misconceptions: ['Thinking SSH keys encrypt your repository content'],
  },

  // ── Web Fundamentals (continued) ──
  {
    id: 'vc_web_5',
    domain: 'vibe-coding',
    tags: ['nextjs', 'server-components'],
    difficulty: 'proficient',
    title: 'Client vs Server Components',
    question: 'In Next.js App Router, what determines whether a component runs on the server or the client?',
    correctAnswer: 'Components are server components by default. Adding "use client" at the top of the file makes it a client component.',
    distractors: [
      'Files in the /server folder are server components, everything else is client',
      'Components with useState are automatically server components',
      'You choose in next.config.js which components are server vs client',
    ],
    explanation:
      'In Next.js App Router, all components are server components by default — they render on the server and send HTML. Adding "use client" makes a component render in the browser, enabling hooks like useState and useEffect. There\'s no /server folder convention or config setting for this.',
    misconceptions: ['Not understanding that server components are the default in App Router'],
  },
  {
    id: 'vc_web_6',
    domain: 'vibe-coding',
    tags: ['tailwind', 'responsive'],
    difficulty: 'developing',
    title: 'Responsive Design with Tailwind',
    question: 'What does `className="grid grid-cols-1 md:grid-cols-3"` do in Tailwind?',
    correctAnswer: 'Shows 1 column on mobile, then switches to 3 columns on medium-sized screens (768px+)',
    distractors: [
      'Always shows 3 columns but makes them narrower on mobile',
      'Shows 1 column on desktop and 3 columns on mobile',
      'Creates a grid that automatically picks between 1 and 3 columns based on content',
    ],
    explanation:
      'Tailwind\'s responsive prefixes (sm:, md:, lg:) apply styles at that breakpoint AND above. The base (no prefix) is mobile-first. So grid-cols-1 is the default, and md:grid-cols-3 kicks in at 768px+. This is mobile-first design — you style for small screens first, then add overrides for larger ones.',
    misconceptions: ['Thinking responsive prefixes target only that exact screen size'],
  },
  {
    id: 'vc_web_7',
    domain: 'vibe-coding',
    tags: ['css', 'flexbox'],
    difficulty: 'beginning',
    title: 'CSS Flexbox Basics',
    question: 'You want to center a div both horizontally and vertically on the page. Which Tailwind classes do this?',
    correctAnswer: '"flex items-center justify-center h-screen" — flex enables flexbox, items-center centers vertically, justify-center centers horizontally',
    distractors: [
      '"text-center" — this centers everything in the element',
      '"mx-auto my-auto" — auto margins center in both directions',
      '"position-center" — this is the CSS centering property',
    ],
    explanation:
      'Flexbox is the modern way to center elements. `flex` activates it, `items-center` aligns on the cross axis (vertical), `justify-center` aligns on the main axis (horizontal). text-center only centers inline content horizontally. mx-auto only works horizontally with a set width. There is no "position-center" property.',
    misconceptions: ['Thinking text-center handles all centering needs'],
  },
  {
    id: 'vc_web_8',
    domain: 'vibe-coding',
    tags: ['nextjs', 'api'],
    difficulty: 'developing',
    title: 'API Routes in Next.js',
    question: 'Where do you create an API endpoint at `/api/users` in Next.js App Router?',
    correctAnswer: 'Create src/app/api/users/route.ts with exported functions like GET and POST',
    distractors: [
      'Create src/api/users.ts and export a default function',
      'Add the endpoint in next.config.js under the "api" section',
      'Create src/pages/api/users.ts with a handler function',
    ],
    explanation:
      'In App Router, API routes use route.ts files (not page.ts) with named exports for HTTP methods (GET, POST, etc.). The file path determines the URL. pages/api/ is the old Pages Router pattern. There\'s no API config in next.config.js.',
    misconceptions: ['Confusing App Router route.ts with Pages Router pages/api/ conventions'],
  },
  {
    id: 'vc_web_9',
    domain: 'vibe-coding',
    tags: ['react', 'forms'],
    difficulty: 'developing',
    title: 'Form Handling in React',
    question: 'Claude generated a form with `<input value={name} />` but typing in it does nothing. Why?',
    correctAnswer: 'It\'s a controlled input with no onChange handler — React prevents the value from changing because nothing calls setName',
    distractors: [
      'You need to use defaultValue instead of value',
      'HTML inputs don\'t work in React — you need a special Input component',
      'The input is disabled by default in Next.js',
    ],
    explanation:
      'In React, setting `value` on an input makes it "controlled" — React owns the value, and you must provide an onChange handler to update state. Without it, the input appears frozen. Fix: add `onChange={(e) => setName(e.target.value)}`. Using defaultValue creates an "uncontrolled" input, which is a different pattern.',
    misconceptions: ['Not understanding controlled vs uncontrolled inputs in React'],
  },
  {
    id: 'vc_web_10',
    domain: 'vibe-coding',
    tags: ['nextjs', 'performance'],
    difficulty: 'proficient',
    title: 'Image Optimization',
    question: 'Why should you use Next.js `<Image>` instead of a plain `<img>` tag?',
    correctAnswer: 'Next.js Image automatically lazy-loads, serves optimized formats (WebP), and generates responsive sizes — improving performance without manual work',
    distractors: [
      'Plain img tags don\'t work in React at all',
      'Next.js Image adds copyright protection to your images',
      'It\'s just a style preference — they render identically',
    ],
    explanation:
      'The Next.js Image component handles lazy loading (only loads when visible), automatic format conversion (WebP/AVIF), responsive srcsets, and size optimization. Plain img tags work fine in React but miss these optimizations, leading to slower page loads. The difference is significant for performance.',
    misconceptions: ['Thinking img and Image are functionally identical'],
  },

  // ── Debugging with AI (continued) ──
  {
    id: 'vc_debug_5',
    domain: 'vibe-coding',
    tags: ['debugging', 'console'],
    difficulty: 'beginning',
    title: 'Console.log Strategies',
    question: 'Your component renders but shows wrong data. What\'s the best way to use console.log to debug it?',
    correctAnswer: 'Log the data right before it\'s rendered with a label: `console.log("users data:", users)` — then check the browser console',
    distractors: [
      'Add console.log everywhere in the file to see everything',
      'console.log only works in Node.js, not in the browser',
      'Use alert() instead — it\'s more reliable than console.log',
    ],
    explanation:
      'Strategic console.log with descriptive labels helps you pinpoint where data goes wrong. Log at the point of use, not everywhere. console.log works in both browsers and Node.js. alert() blocks execution and can\'t display objects — it\'s terrible for debugging.',
    misconceptions: ['Scattering console.log everywhere instead of placing it strategically'],
  },
  {
    id: 'vc_debug_6',
    domain: 'vibe-coding',
    tags: ['debugging', 'react-devtools'],
    difficulty: 'developing',
    title: 'React DevTools',
    question: 'Your component isn\'t getting the right props. What tool helps you inspect the actual props a component receives at runtime?',
    correctAnswer: 'React DevTools browser extension — it shows the component tree with current props, state, and hooks values',
    distractors: [
      'The Elements tab in Chrome DevTools — it shows all component props in the HTML',
      'TypeScript — if the types are correct, the props must be correct',
      'View Source — you can see the props in the page source code',
    ],
    explanation:
      'React DevTools adds a "Components" tab to browser devtools that shows the React component tree, current props, state, and hook values in real time. The Elements tab shows DOM, not React components. TypeScript checks types at compile time, not runtime values. View Source shows the initial HTML, not live React state.',
    misconceptions: ['Trying to debug React state by inspecting the DOM instead of using React DevTools'],
  },
  {
    id: 'vc_debug_7',
    domain: 'vibe-coding',
    tags: ['debugging', 'network'],
    difficulty: 'developing',
    title: 'Network Tab Debugging',
    question: 'Your app calls an API but nothing happens. Where do you check what the API actually returned?',
    correctAnswer: 'Browser DevTools Network tab — click the request to see the URL, status code, request headers, and response body',
    distractors: [
      'Check the Elements tab for the API response',
      'Look at the terminal where you ran npm run dev',
      'API responses aren\'t visible anywhere — you can only see them in your code',
    ],
    explanation:
      'The Network tab records every HTTP request your app makes. You can see the exact URL, request/response headers, status codes (200, 404, 500), and the response body. This is essential for debugging API issues. The dev server terminal shows server-side logs, not client-side API responses.',
    misconceptions: ['Not knowing the Network tab exists for debugging API calls'],
  },
  {
    id: 'vc_debug_8',
    domain: 'vibe-coding',
    tags: ['debugging', 'stack-traces'],
    difficulty: 'proficient',
    title: 'Reading Stack Traces',
    question: 'You see an error stack trace that lists 15 files. Which line should you look at first?',
    correctAnswer: 'The first line that references YOUR code (not node_modules or framework internals) — that\'s where the error originated in your project',
    distractors: [
      'Always the very first line — that\'s where the error is',
      'Always the very last line — errors start from the bottom',
      'Ignore the stack trace and just read the error message',
    ],
    explanation:
      'Stack traces show the call chain from the error point. Most lines are framework/library internals. Find the first reference to your own code (your src/ files) — that\'s usually where the bug is. The error message alone often isn\'t enough without knowing WHERE in your code it happens.',
    misconceptions: ['Ignoring stack traces because they look overwhelming'],
  },
  {
    id: 'vc_debug_9',
    domain: 'vibe-coding',
    tags: ['debugging', 'cors'],
    difficulty: 'proficient',
    title: 'CORS Errors',
    question: 'Your frontend at localhost:3000 tries to fetch from localhost:8000/api and gets a CORS error. What\'s happening?',
    correctAnswer: 'The browser blocks requests to a different origin (port counts). The backend needs to send Access-Control-Allow-Origin headers to permit it.',
    distractors: [
      'Your API is down — CORS errors mean the server isn\'t running',
      'You need to switch from fetch to axios to avoid CORS',
      'CORS is a Next.js bug that\'s fixed by updating to the latest version',
    ],
    explanation:
      'CORS (Cross-Origin Resource Sharing) is a browser security feature. Different ports = different origins. The fix is on the server side: add CORS headers allowing your frontend origin. Using axios doesn\'t bypass CORS (it\'s a browser restriction, not a library issue). CORS isn\'t a bug — it\'s intentional security.',
    misconceptions: ['Thinking CORS is a frontend bug or can be fixed by switching HTTP libraries'],
  },
  {
    id: 'vc_debug_10',
    domain: 'vibe-coding',
    tags: ['debugging', 'typescript'],
    difficulty: 'developing',
    title: 'TypeScript "any" Escape Hatch',
    question: 'Claude added `as any` to fix a TypeScript error. Why is this dangerous?',
    correctAnswer: 'It silences the type checker completely for that value — the bug is still there, you just can\'t see the warning anymore',
    distractors: [
      'It makes the code run slower because TypeScript can\'t optimize it',
      'It converts the value to a special "any" data type at runtime',
      'It\'s perfectly fine — that\'s what "any" is designed for',
    ],
    explanation:
      '`as any` tells TypeScript to stop checking types for that value. The underlying problem (wrong type, missing field, incompatible data) still exists — you just suppressed the warning. It\'s like turning off a smoke alarm instead of finding the fire. TypeScript types are compile-time only and don\'t affect runtime performance.',
    misconceptions: ['Using "as any" to fix type errors instead of fixing the actual type mismatch'],
  },

  // ── Testing & Quality ──
  {
    id: 'vc_test_1',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'beginning',
    title: 'Why Write Tests',
    question: 'Your app works perfectly right now. Why should you still write tests?',
    correctAnswer: 'Tests protect against future changes breaking existing features — they catch regressions before your users do',
    distractors: [
      'Tests are only needed for apps with bugs — if it works, don\'t test it',
      'Tests make your code run faster in production',
      'You only need tests if your team has a QA department',
    ],
    explanation:
      'Every code change risks breaking something else. Tests are a safety net: they verify existing behavior stays correct as you add features, refactor, or update dependencies. Even solo developers benefit because you can\'t manually re-test everything after every change. Tests don\'t affect runtime performance.',
    misconceptions: ['Thinking tests are only for buggy code or large teams'],
  },
  {
    id: 'vc_test_2',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'developing',
    title: 'Unit vs Integration Tests',
    question: 'What\'s the difference between a unit test and an integration test?',
    correctAnswer: 'A unit test checks one function or component in isolation. An integration test checks how multiple parts work together.',
    distractors: [
      'Unit tests are for JavaScript, integration tests are for TypeScript',
      'Unit tests run locally, integration tests only run in CI/CD',
      'Unit tests are written by developers, integration tests are written by QA',
    ],
    explanation:
      'Unit tests isolate a single piece (function, component) and verify it works correctly on its own. Integration tests check that pieces work together (e.g., a form component that calls an API). Both are written by developers, both run locally AND in CI, and both work with any language.',
    misconceptions: ['Thinking unit and integration tests differ by who writes them or where they run'],
  },
  {
    id: 'vc_test_3',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'beginning',
    title: 'Writing a First Test',
    question: 'What does this test do?\n\n`expect(add(2, 3)).toBe(5);`',
    correctAnswer: 'It calls the add function with 2 and 3, and checks that the result equals 5 — failing the test if it doesn\'t',
    distractors: [
      'It creates a function called add that returns 5',
      'It prints "5" to the console for manual verification',
      'It sets the add function\'s default return value to 5',
    ],
    explanation:
      'This is an assertion: call the function, then assert the result matches your expectation. `expect(X).toBe(Y)` means "X should equal Y." If add(2, 3) returns anything other than 5, the test fails. Tests don\'t create functions or print values — they verify behavior.',
    misconceptions: ['Confusing test assertions with function definitions or console output'],
  },
  {
    id: 'vc_test_4',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'proficient',
    title: 'Mocking',
    question: 'Your component fetches data from an API. Why would you mock the API in tests instead of calling the real one?',
    correctAnswer: 'Mocks make tests fast, reliable, and offline-capable — real API calls are slow, can fail, and make tests depend on external servers',
    distractors: [
      'You can\'t use fetch in a test environment at all',
      'Mocking is required by law for API calls in tests',
      'Real API calls would change your production database',
    ],
    explanation:
      'Mocking replaces real dependencies with controlled fakes. For API calls, this means tests run instantly (no network), work offline, and don\'t depend on server availability. You can also test error scenarios by making the mock return errors. fetch works in test environments; mocking is a choice, not a requirement.',
    misconceptions: ['Thinking mocking is required rather than a testing strategy choice'],
  },
  {
    id: 'vc_test_5',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'developing',
    title: 'Test-Driven Development Basics',
    question: 'In test-driven development (TDD), what do you do FIRST?',
    correctAnswer: 'Write a failing test that describes what the code should do, then write the code to make it pass',
    distractors: [
      'Write all the code first, then add tests at the end',
      'Write the test and the code at the same time in the same file',
      'Ask the AI to generate both the code and tests together',
    ],
    explanation:
      'TDD follows red-green-refactor: write a failing test (red), write minimal code to pass it (green), then clean up (refactor). Writing tests first forces you to think about what the code should do before how. This is especially useful with AI — describe the behavior in tests, then let AI implement it.',
    misconceptions: ['Thinking tests should always come after the implementation'],
  },
  {
    id: 'vc_test_6',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'proficient',
    title: 'Testing User Interactions',
    question: 'You want to test that clicking a "Submit" button shows a success message. Which testing approach is best?',
    correctAnswer: 'Use a testing library to simulate the click, then assert the success message appears in the DOM',
    distractors: [
      'Manually click the button in the browser and take a screenshot',
      'Check that the onClick function exists on the button element',
      'Verify the button\'s CSS class changes after clicking',
    ],
    explanation:
      'Libraries like React Testing Library let you simulate user interactions and check the resulting UI. Testing that the success message appears (the user-visible outcome) is more meaningful than checking implementation details like onClick existence or CSS classes. Manual testing doesn\'t scale.',
    misconceptions: ['Testing implementation details instead of user-visible behavior'],
  },
  {
    id: 'vc_test_7',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'advanced',
    title: 'Snapshot Testing',
    question: 'Claude added snapshot tests to your components. A test fails after you intentionally change a button\'s text. What should you do?',
    correctAnswer: 'Review the snapshot diff to confirm the change is intentional, then update the snapshot with --updateSnapshot',
    distractors: [
      'Revert your code change — the snapshot is always correct',
      'Delete all snapshot files and never use snapshot testing again',
      'Manually edit the .snap file to match your new code',
    ],
    explanation:
      'Snapshot tests capture a component\'s rendered output and flag changes. When you intentionally change something, the snapshot needs updating. Review the diff to make sure no unintended changes snuck in, then update. Don\'t manually edit .snap files — let the test runner regenerate them.',
    misconceptions: ['Treating snapshot test failures as always being bugs'],
  },
  {
    id: 'vc_test_8',
    domain: 'vibe-coding',
    tags: ['testing'],
    difficulty: 'developing',
    title: 'CI/CD Test Automation',
    question: 'What does it mean to "run tests in CI"?',
    correctAnswer: 'Tests run automatically on a server every time you push code — if any test fails, the deployment is blocked',
    distractors: [
      'CI stands for "Code Inspector" — it reviews your code style',
      'Tests run on your local machine when you save a file',
      'CI only applies to teams of 10+ developers',
    ],
    explanation:
      'CI (Continuous Integration) automatically runs tests on a server (like GitHub Actions) when you push code. If tests fail, the PR can\'t be merged and the deploy is blocked. This catches bugs before they reach production. CI works for solo developers too — it\'s about automation, not team size.',
    misconceptions: ['Thinking CI/CD is only for large teams'],
  },

  // ── Security ──
  {
    id: 'vc_sec_1',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'developing',
    title: 'XSS Prevention',
    question: 'Claude used `dangerouslySetInnerHTML` to render user-submitted content. Why is this risky?',
    correctAnswer: 'It renders raw HTML, so a user could inject malicious scripts that steal data from other users visiting the page',
    distractors: [
      'It\'s just named "dangerously" as a convention — it\'s actually safe',
      'It only affects server-side rendering, not the browser',
      'React automatically sanitizes all HTML passed to dangerouslySetInnerHTML',
    ],
    explanation:
      'XSS (Cross-Site Scripting) lets attackers inject scripts into pages other users view. dangerouslySetInnerHTML renders raw HTML without sanitization, including <script> tags. React normally escapes HTML in JSX — dangerouslySetInnerHTML bypasses that protection. The name "dangerously" is a real warning, not a convention.',
    misconceptions: ['Thinking the "dangerous" prefix is just naming convention, not a real warning'],
  },
  {
    id: 'vc_sec_2',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'developing',
    title: 'HTTPS Basics',
    question: 'Why does your browser show a padlock icon on some websites but a warning on others?',
    correctAnswer: 'The padlock means the connection uses HTTPS — data between your browser and the server is encrypted and can\'t be read by others on the network',
    distractors: [
      'The padlock means the website has no viruses',
      'It means the website is verified as trustworthy by the government',
      'The padlock means your password is stored securely on the server',
    ],
    explanation:
      'HTTPS encrypts data in transit between browser and server using TLS. Without it (plain HTTP), anyone on your network (coffee shop WiFi, ISP) can read your data. The padlock doesn\'t verify the site is trustworthy or virus-free — it only means the connection is encrypted. A scam site can have HTTPS.',
    misconceptions: ['Thinking HTTPS means a website is safe or trustworthy'],
  },
  {
    id: 'vc_sec_3',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'proficient',
    title: 'Password Hashing',
    question: 'Your app needs user login. How should passwords be stored in the database?',
    correctAnswer: 'Hash them with a strong algorithm like bcrypt — never store plain-text passwords',
    distractors: [
      'Encrypt them so you can decrypt and check them later',
      'Store them as plain text but in a "secure" database column',
      'Base64 encode them — that\'s how all major sites do it',
    ],
    explanation:
      'Hashing is one-way: you can verify a password matches a hash but can\'t reverse it. If your database is breached, attackers get useless hashes, not passwords. Encryption is two-way (reversible), which means a breach exposes the key and all passwords. Base64 is encoding, not security — it\'s trivially reversible.',
    misconceptions: ['Confusing hashing (one-way) with encryption (reversible)'],
  },
  {
    id: 'vc_sec_4',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'proficient',
    title: 'API Key Exposure',
    question: 'Claude put your OpenAI API key directly in a React component: `const key = "sk-abc123..."`. What\'s the problem?',
    correctAnswer: 'Client-side code is visible to anyone — users can open DevTools and steal your API key, running up your bill',
    distractors: [
      'React hides variables in components from the browser automatically',
      'It\'s fine as long as you don\'t push it to GitHub',
      'API keys in JavaScript are automatically encrypted by the browser',
    ],
    explanation:
      'ALL client-side JavaScript is visible in the browser. Anyone can open DevTools and find hardcoded keys. The fix: use server-side API routes (e.g., Next.js route handlers) to call APIs — the key stays on the server, never sent to the browser. Even if you don\'t push it to GitHub, it\'s in the bundle users download.',
    misconceptions: ['Thinking client-side code is hidden from users'],
  },
  {
    id: 'vc_sec_5',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'advanced',
    title: 'CORS Explained (Security Perspective)',
    question: 'Why do browsers enforce CORS instead of just letting any website call any API?',
    correctAnswer: 'Without CORS, a malicious site could make requests to your bank\'s API using your logged-in session cookies — CORS prevents this',
    distractors: [
      'CORS exists to make APIs faster by limiting requests',
      'It\'s an outdated security measure that modern apps should disable',
      'CORS only applies to GET requests, not POST or PUT',
    ],
    explanation:
      'CORS prevents a critical attack: a malicious site making authenticated requests to another site using your cookies. Without CORS, visiting evil.com could silently transfer money from your bank. CORS applies to all HTTP methods. It\'s not outdated — it\'s essential. Disabling it carelessly creates real vulnerabilities.',
    misconceptions: ['Thinking CORS is just an annoying restriction that should be disabled'],
  },
  {
    id: 'vc_sec_6',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'proficient',
    title: 'Input Sanitization',
    question: 'A user submits a form with the name: `<img src=x onerror=alert("hacked")>`. What should your app do?',
    correctAnswer: 'Sanitize the input by stripping or escaping HTML tags before storing or displaying it',
    distractors: [
      'Nothing — modern browsers automatically prevent this',
      'Check if the name contains the word "hacked" and reject it',
      'Store it as-is — the database will handle sanitization',
    ],
    explanation:
      'User input should never be trusted. The example injects an image tag with JavaScript in the onerror handler. Sanitization strips or escapes dangerous characters. Checking for specific words is trivially bypassed. Databases store data as-is — they don\'t sanitize HTML. Browsers help with JSX escaping in React, but raw HTML rendering bypasses that.',
    misconceptions: ['Trusting user input because "the framework handles it"'],
  },
  {
    id: 'vc_sec_7',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'advanced',
    title: 'JWT Basics',
    question: 'Your app uses JWTs (JSON Web Tokens) for authentication. What happens if a JWT is stolen?',
    correctAnswer: 'The attacker can impersonate the user until the token expires — JWTs can\'t be individually revoked without extra infrastructure',
    distractors: [
      'Nothing — JWTs are encrypted so they\'re useless without the secret key',
      'The server automatically detects stolen tokens and blocks them',
      'The JWT self-destructs after being used on a different device',
    ],
    explanation:
      'JWTs are signed (verified) but typically not encrypted — the payload is readable by anyone (it\'s base64 encoded). Once stolen, the attacker has full access until expiration. There\'s no built-in revocation. Mitigations: short expiration times, refresh token rotation, and token blacklists (which add complexity).',
    misconceptions: ['Thinking JWTs are encrypted and therefore safe if stolen'],
  },
  {
    id: 'vc_sec_8',
    domain: 'vibe-coding',
    tags: ['security'],
    difficulty: 'developing',
    title: 'Dependency Vulnerabilities',
    question: 'You run `npm audit` and it reports 5 high-severity vulnerabilities. What does this mean?',
    correctAnswer: 'Some of your project\'s dependencies have known security issues — you should update the affected packages',
    distractors: [
      'Your own code has 5 bugs that npm detected',
      'npm is broken and needs to be reinstalled',
      'These are warnings about code style, not security',
    ],
    explanation:
      'npm audit checks your dependency tree against a database of known vulnerabilities. High-severity means an attacker could exploit those packages. Run `npm audit fix` to auto-update where possible. These are in third-party packages, not your code. npm itself is fine — it\'s reporting on your dependencies.',
    misconceptions: ['Ignoring npm audit warnings because they\'re not in your own code'],
  },

  // ── AI Tool Selection ──
  {
    id: 'vc_aitool_1',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'beginning',
    title: 'Choosing AI Coding Tools',
    question: 'You have an idea for a new web app and want to create it from scratch quickly. Which tool is the best starting point?',
    correctAnswer: 'v0 or Claude Artifacts — they generate full working prototypes you can preview instantly, perfect for exploring ideas',
    distractors: [
      'Claude Code CLI — always start with the terminal for new projects',
      'GitHub Copilot — it writes code as you type, which is fastest',
      'ChatGPT — paste your idea and copy the code it gives you into files manually',
    ],
    explanation:
      'For rapid prototyping, visual tools like v0 or Claude Artifacts let you see results immediately without any setup. Once the idea is validated, move to Claude Code or Cursor for the real codebase. Copilot is great for existing code but doesn\'t generate full apps. Manually copying from ChatGPT is slow and error-prone.',
    misconceptions: ['Using the most powerful tool when a simpler one would be faster'],
  },
  {
    id: 'vc_aitool_2',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'developing',
    title: 'Claude Code vs Cursor',
    question: 'When would you choose Claude Code (CLI) over Cursor (IDE)?',
    correctAnswer: 'When you need to make changes across many files, run terminal commands, and manage your full development workflow from one tool',
    distractors: [
      'Claude Code is always better because it\'s made by Anthropic',
      'Only use Claude Code if you don\'t have VS Code installed',
      'Cursor is only for Python — Claude Code handles JavaScript',
    ],
    explanation:
      'Claude Code excels at cross-file edits, running commands, and autonomous multi-step workflows. Cursor is great for in-editor assistance while you code. Both handle any language. The choice depends on your workflow: want AI to drive? Claude Code. Want to drive with AI assisting? Cursor. Many developers use both.',
    misconceptions: ['Thinking one AI tool is always better than the others'],
  },
  {
    id: 'vc_aitool_3',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'proficient',
    title: 'When AI Struggles',
    question: 'Which type of task is AI LEAST reliable at?',
    correctAnswer: 'Complex state machines, precise mathematical algorithms, and anything requiring exact numerical correctness',
    distractors: [
      'Writing CSS and styling components',
      'Generating CRUD operations and boilerplate',
      'Converting designs into React components',
    ],
    explanation:
      'AI excels at pattern-heavy tasks (CRUD, styling, boilerplate, UI from designs) but struggles with precise logic: state machines with many edge cases, complex math, cryptographic code, and algorithms where off-by-one errors matter. For these, AI-generated code needs extra careful review and testing.',
    misconceptions: ['Trusting AI equally for all types of coding tasks'],
  },
  {
    id: 'vc_aitool_4',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'developing',
    title: 'Recognizing AI Hallucinations',
    question: 'Claude suggests using a library called `react-super-tables` that you\'ve never heard of. What should you do?',
    correctAnswer: 'Search npm for the library before installing it — AI sometimes invents package names that don\'t exist or confuses similar packages',
    distractors: [
      'Install it immediately — if Claude suggests it, it must exist',
      'Assume it\'s a new package you haven\'t learned about yet',
      'Ask Claude if it\'s real — it will always correct itself',
    ],
    explanation:
      'AI models can "hallucinate" package names, API methods, and library features. Always verify on npm, GitHub, or official docs before using suggested packages. Installing a non-existent package will fail; worse, a malicious package with that name could exist. Asking the AI to verify doesn\'t help — it may double down on the hallucination.',
    misconceptions: ['Blindly trusting AI-suggested package names without verification'],
  },
  {
    id: 'vc_aitool_5',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'developing',
    title: 'Artifacts vs CLI',
    question: 'When should you use Claude\'s Artifacts (web) instead of Claude Code (CLI)?',
    correctAnswer: 'When you want to quickly prototype a single component or page and see a live preview without setting up a project',
    distractors: [
      'Artifacts are always better because they have a visual preview',
      'CLI is only for DevOps tasks like deployment, not coding',
      'Use Artifacts for backend code and CLI for frontend code',
    ],
    explanation:
      'Artifacts excel at rapid visual prototyping — you see results instantly without git, npm, or any setup. Claude Code is better for real projects with multiple files, existing codebases, and deployment workflows. The choice isn\'t about frontend vs backend — it\'s about prototype vs production.',
    misconceptions: ['Thinking one mode replaces the other entirely'],
  },
  {
    id: 'vc_aitool_6',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'proficient',
    title: 'Model Selection',
    question: 'You need to choose between Claude Opus, Sonnet, and Haiku for a coding task. When should you use the cheaper, faster model?',
    correctAnswer: 'For simple, well-defined tasks like reformatting code, generating boilerplate, or making small edits where reasoning depth doesn\'t matter',
    distractors: [
      'Always use the cheapest model — the output quality is the same',
      'Never use the cheaper model for code — only the most expensive model can write code',
      'Use the cheaper model for the first draft and the expensive one to check it',
    ],
    explanation:
      'Faster/cheaper models (Haiku, Sonnet) handle routine tasks well: formatting, boilerplate, simple edits. Complex tasks (architecture decisions, debugging subtle bugs, multi-file refactors) benefit from more capable models (Opus). The quality difference matters most for tasks requiring deep reasoning.',
    misconceptions: ['Thinking all models produce identical output regardless of task complexity'],
  },
  {
    id: 'vc_aitool_7',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'advanced',
    title: 'Context Window Management',
    question: 'You\'re working with Claude Code on a large project and the conversation is getting very long. What should you do?',
    correctAnswer: 'Use /compact to summarize the conversation so far, or start a new session with relevant context — long conversations degrade response quality',
    distractors: [
      'Keep going — longer conversations always give better context',
      'Copy the entire conversation and paste it into a new chat',
      'Delete older messages manually to free up space',
    ],
    explanation:
      'AI models have context windows (how much text they can consider). As conversations grow, older context gets less attention. /compact in Claude Code summarizes the conversation to free up space while preserving key information. Starting fresh with targeted context can be better than dragging a massive thread forward.',
    misconceptions: ['Thinking longer conversations always mean better AI understanding'],
  },
  {
    id: 'vc_aitool_8',
    domain: 'vibe-coding',
    tags: ['ai-tool-selection'],
    difficulty: 'advanced',
    title: 'MCP Servers',
    question: 'What is an MCP server in the context of Claude Code?',
    correctAnswer: 'A plugin that gives Claude Code new capabilities — like connecting to databases, APIs, or external tools beyond its built-in features',
    distractors: [
      'A server that runs your Next.js application in production',
      'A special computer at Anthropic that processes your code',
      'A monitoring service that tracks errors in your deployed app',
    ],
    explanation:
      'MCP (Model Context Protocol) servers extend Claude Code\'s capabilities. They let Claude interact with external services: databases, GitHub, Jira, design tools, and more. Think of them as plugins that give AI access to real-world tools. They run locally or remotely but are not Anthropic\'s servers or your app\'s hosting.',
    misconceptions: ['Confusing MCP servers with application hosting or Anthropic infrastructure'],
  },

  // ── Architecture ──
  {
    id: 'vc_arch_1',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'developing',
    title: 'Component Decomposition',
    question: 'Claude generated a single 400-line React component. What\'s the best way to improve it?',
    correctAnswer: 'Break it into smaller, focused components — each handling one piece of the UI (header, form, list, etc.)',
    distractors: [
      'It\'s fine — large components are more efficient because React has fewer components to manage',
      'Split it into 400 separate files, one line each',
      'Convert it to a class component — they handle large files better',
    ],
    explanation:
      'Large components are hard to understand, test, and reuse. Breaking them into smaller pieces (each with a single responsibility) makes code maintainable. Fewer components doesn\'t mean better performance. One-line files are absurd. Class components aren\'t better for organization — the problem is structure, not syntax.',
    misconceptions: ['Thinking fewer, larger components are better for performance'],
  },
  {
    id: 'vc_arch_2',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'proficient',
    title: 'State Management Choices',
    question: 'When should you reach for a state management library like Zustand instead of just using React\'s useState?',
    correctAnswer: 'When multiple unrelated components need to share and update the same state, and prop drilling or Context gets unwieldy',
    distractors: [
      'Always — useState is only for small demos, not real apps',
      'Never — React\'s built-in state is always sufficient',
      'Only when you have more than 100 components',
    ],
    explanation:
      'useState is great for local component state. Context works for data a whole subtree needs. External state libraries shine when many distant components share complex state (like a shopping cart, auth, or multi-step forms). The right choice depends on your sharing pattern, not component count.',
    misconceptions: ['Thinking you always need an external state management library'],
  },
  {
    id: 'vc_arch_3',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'developing',
    title: 'Next.js Folder Structure',
    question: 'In a Next.js App Router project, what belongs in `src/app/` vs `src/components/` vs `src/lib/`?',
    correctAnswer: 'app/ for pages and routes, components/ for reusable UI pieces, lib/ for utility functions and shared logic',
    distractors: [
      'Put everything in app/ — Next.js only reads from that folder',
      'app/ for backend code, components/ for frontend code, lib/ for tests',
      'It doesn\'t matter — organize however you want with no conventions',
    ],
    explanation:
      'This is a common convention: app/ contains route-specific pages (page.tsx, layout.tsx, route.ts), components/ has reusable UI components used across multiple pages, and lib/ holds non-UI utilities (data fetching, helpers, types). Next.js only requires app/ for routing, but the structure helps maintainability.',
    misconceptions: ['Thinking all code must go inside the app/ directory'],
  },
  {
    id: 'vc_arch_4',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'proficient',
    title: 'API Design Basics',
    question: 'You\'re designing a REST API for a blog. What\'s the correct URL pattern for getting a specific post?',
    correctAnswer: 'GET /api/posts/123 — use the resource name (posts) and ID in the URL path',
    distractors: [
      'GET /api/getPost?id=123 — put the action in the URL',
      'POST /api/posts with { action: "get", id: 123 } in the body',
      'GET /api/post/find/123/details — be as descriptive as possible',
    ],
    explanation:
      'REST APIs use resource-based URLs: nouns (posts), not verbs (getPost). The HTTP method indicates the action (GET = read, POST = create, PUT = update, DELETE = delete). IDs go in the path. Putting actions in URLs or using POST for reads violates REST conventions and makes APIs harder to understand.',
    misconceptions: ['Putting action verbs in REST API URLs instead of using HTTP methods'],
  },
  {
    id: 'vc_arch_5',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'advanced',
    title: 'Database Selection',
    question: 'You\'re building a quick prototype that needs to store user profiles and their posts. Which database makes the most sense to start with?',
    correctAnswer: 'A simple relational database (like Supabase/Postgres or PlanetScale/MySQL) — structured data with relationships between users and posts fits naturally',
    distractors: [
      'MongoDB — it\'s the default choice for all modern apps',
      'Redis — it\'s the fastest database available',
      'A spreadsheet — databases are overkill for prototypes',
    ],
    explanation:
      'Relational databases excel at structured data with clear relationships (users have posts, posts have comments). MongoDB is great for unstructured/flexible data but adds complexity for relational data. Redis is an in-memory cache, not a primary database. Spreadsheets don\'t scale and lack proper querying.',
    misconceptions: ['Choosing a database based on popularity rather than data structure fit'],
  },
  {
    id: 'vc_arch_6',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'advanced',
    title: 'Monorepo vs Multi-Repo',
    question: 'Your project has a Next.js frontend and a Python API backend. Should they be in one repo or two?',
    correctAnswer: 'Either can work — a monorepo is simpler to manage for small teams, while separate repos give more deployment flexibility as the project grows',
    distractors: [
      'Always separate repos — mixing languages in one repo is impossible',
      'Always one repo — separate repos are an anti-pattern',
      'Frontend must always be in a repo called "frontend" and backend in "backend"',
    ],
    explanation:
      'Monorepos keep everything together (easier to find code, atomic changes across frontend/backend). Multi-repo gives independent deployment and CI. For solo devs or small teams, monorepo is usually simpler. For large teams, separate repos reduce coupling. Both are valid — choose based on team size and deployment needs.',
    misconceptions: ['Thinking there\'s one correct answer for repo organization'],
  },
  {
    id: 'vc_arch_7',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'proficient',
    title: 'Caching Strategies',
    question: 'Your app fetches the same user profile data on every page load. How can you avoid unnecessary API calls?',
    correctAnswer: 'Cache the response — store it in React state, a global store, or use a library like SWR/React Query that caches and revalidates automatically',
    distractors: [
      'Make the API faster so repeated calls don\'t matter',
      'Hardcode the user data in a JSON file so you never need to fetch it',
      'Use localStorage to save the data and never fetch again',
    ],
    explanation:
      'Caching avoids redundant fetches by storing results and serving them from memory. Libraries like SWR and React Query add smart features: background revalidation, stale-while-revalidate, and automatic retries. Making the API faster doesn\'t reduce unnecessary calls. Hardcoding isn\'t dynamic. localStorage without revalidation serves stale data forever.',
    misconceptions: ['Fetching the same data repeatedly without any caching strategy'],
  },
  {
    id: 'vc_arch_8',
    domain: 'vibe-coding',
    tags: ['architecture'],
    difficulty: 'developing',
    title: 'Environment-Specific Configs',
    question: 'Your app needs different API URLs for development (localhost:8000) and production (api.myapp.com). How do you handle this?',
    correctAnswer: 'Use environment variables — .env.local for development and set production values in your hosting platform (Vercel, Netlify)',
    distractors: [
      'Use an if statement in your code: if (dev) use localhost, else use production URL',
      'Create two separate copies of your codebase, one for each environment',
      'Always use the production URL, even during development',
    ],
    explanation:
      'Environment variables let the same code run in different environments without changes. Your code reads process.env.API_URL, and each environment sets it differently. Hardcoded if statements are fragile and easy to ship with wrong values. Two codebases doubles maintenance. Using production during dev risks corrupting real data.',
    misconceptions: ['Hardcoding environment-specific values instead of using env variables'],
  },

  // ── Shipping & Deployment ──
  {
    id: 'vc_ship_1',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'beginning',
    title: 'DNS and Domains',
    question: 'You bought myapp.com but it shows "this site can\'t be reached." What\'s missing?',
    correctAnswer: 'DNS records — you need to point your domain to your hosting provider\'s servers (add A or CNAME records)',
    distractors: [
      'The domain needs 48 hours to "warm up" before it works',
      'You need to upload your code directly to the domain registrar',
      'Buying a domain automatically creates a website',
    ],
    explanation:
      'A domain name is just an address — DNS records tell browsers which server to connect to. You set these up at your domain registrar (Namecheap, Google Domains) pointing to your hosting (Vercel, Netlify). DNS propagation can take time, but the records must be configured first. Buying a domain doesn\'t host a site.',
    misconceptions: ['Thinking buying a domain automatically creates a working website'],
  },
  {
    id: 'vc_ship_2',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'developing',
    title: 'Preview Deployments',
    question: 'Vercel creates a unique URL for every git push. What is this useful for?',
    correctAnswer: 'Preview deployments let you test and share changes before they go live — each branch/PR gets its own URL',
    distractors: [
      'They\'re old versions that should be deleted for security',
      'They replace your production site every time you push',
      'They\'re only visible to Vercel employees for debugging',
    ],
    explanation:
      'Preview deployments are one of the best features of modern hosting. Every push gets a unique URL you can share with teammates, clients, or testers. They don\'t affect production. When the PR merges, the main deployment updates. This workflow catches issues before they reach users.',
    misconceptions: ['Not using preview deployments for review before merging'],
  },
  {
    id: 'vc_ship_3',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'developing',
    title: 'Environment Variables in Production',
    question: 'Your app works locally but crashes in production with "undefined API key." What happened?',
    correctAnswer: 'You set the API key in your local .env file but forgot to add it to your hosting platform\'s environment variables',
    distractors: [
      '.env files are automatically uploaded during deployment',
      'The API key expired because production is a different environment',
      'Production servers can\'t read environment variables',
    ],
    explanation:
      '.env files are gitignored (never deployed). Each environment needs its own variable configuration. In Vercel, you set them in the project settings. This is a very common "it works locally" bug. The key didn\'t expire — it was never set. Production servers absolutely support environment variables.',
    misconceptions: ['Assuming .env files are automatically deployed with your code'],
  },
  {
    id: 'vc_ship_4',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'proficient',
    title: 'Monitoring and Error Tracking',
    question: 'Your deployed app has users, but you have no idea if they\'re encountering errors. What should you set up?',
    correctAnswer: 'An error tracking service like Sentry that captures runtime errors, shows stack traces, and alerts you when things break',
    distractors: [
      'Check the browser console of every user remotely',
      'Ask users to email you screenshots when something breaks',
      'If no one complains, there are no errors',
    ],
    explanation:
      'Error tracking services automatically capture unhandled errors in production, including context (browser, URL, user actions). You can\'t access users\' consoles, and most users don\'t report bugs — they just leave. Services like Sentry, LogRocket, and Datadog give you visibility into real-world issues.',
    misconceptions: ['Thinking no complaints means no errors'],
  },
  {
    id: 'vc_ship_5',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'developing',
    title: 'Performance Basics (Lighthouse)',
    question: 'You run Lighthouse on your deployed site and get a performance score of 45/100. What should you check first?',
    correctAnswer: 'Image sizes and unoptimized assets — large images are the most common cause of poor Lighthouse scores',
    distractors: [
      'Your JavaScript variable names — shorter names load faster',
      'The color scheme — dark mode is faster than light mode',
      'Your hosting provider — switch to a faster server immediately',
    ],
    explanation:
      'Lighthouse measures real performance metrics (load time, interactivity, visual stability). Large unoptimized images are the #1 culprit for bad scores. Other common fixes: lazy loading, code splitting, and using Next.js Image. Variable names don\'t affect bundle size meaningfully. Colors don\'t affect performance. Server speed matters, but assets matter more.',
    misconceptions: ['Blaming the server when unoptimized assets are the real bottleneck'],
  },
  {
    id: 'vc_ship_6',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'beginning',
    title: 'SEO Fundamentals',
    question: 'You built a beautiful portfolio site but it doesn\'t show up in Google search results. What\'s the most likely issue?',
    correctAnswer: 'Missing metadata — your pages need proper title tags, descriptions, and Open Graph tags for search engines to index them correctly',
    distractors: [
      'You need to pay Google to list your site',
      'Single-page apps can\'t appear in search results',
      'Google only indexes sites with more than 100 pages',
    ],
    explanation:
      'Search engines need metadata (title, description, canonical URL) to understand and rank your pages. Next.js makes this easy with the metadata export. You don\'t pay for organic search results. SPAs with server-side rendering (like Next.js) are indexable. Google indexes sites of all sizes, including single-page sites.',
    misconceptions: ['Thinking SEO requires paying Google or having a large site'],
  },
  {
    id: 'vc_ship_7',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'proficient',
    title: 'Analytics Setup',
    question: 'You want to know which features of your app users actually use. What\'s the best approach?',
    correctAnswer: 'Add analytics (like Vercel Analytics, PostHog, or Plausible) to track page views and key user actions (clicks, form submissions)',
    distractors: [
      'Watch users over their shoulder to see how they use the app',
      'Count the number of API requests in your server logs',
      'Ask every user to fill out a survey after each session',
    ],
    explanation:
      'Analytics tools automatically track user behavior at scale: which pages are visited, which buttons are clicked, where users drop off. Server logs show API requests but not user interactions. Surveys have low response rates and recall bias. Modern analytics tools are privacy-respecting and easy to add.',
    misconceptions: ['Relying on manual observation or surveys instead of automated analytics'],
  },
  {
    id: 'vc_ship_8',
    domain: 'vibe-coding',
    tags: ['shipping-deploy'],
    difficulty: 'proficient',
    title: 'Rollback Strategies',
    question: 'You deployed a new version but it has a critical bug. Users are affected right now. What\'s the fastest fix?',
    correctAnswer: 'Roll back to the previous deployment — platforms like Vercel let you instantly revert to the last working version',
    distractors: [
      'Fix the bug locally, test it, and deploy a new version (this could take hours)',
      'Take the site down completely while you fix the bug',
      'Email all users and ask them to clear their cache',
    ],
    explanation:
      'Rollback is the fastest way to stop user impact. Vercel, Netlify, and most platforms keep previous deployments and let you revert in seconds. Then you can calmly fix the bug and redeploy. Taking the site down is worse than rolling back. Fixing forward is slower. Cache clearing doesn\'t fix server-side bugs.',
    misconceptions: ['Trying to fix forward under pressure instead of rolling back first'],
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
