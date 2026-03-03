// Quiz visual theme system
// Two modes: "dark" (Kahoot-style) and "light" (Duolingo-style)

export type ThemeMode = 'dark' | 'light';

export interface QuizTheme {
  mode: ThemeMode;

  // Page background
  pageBg: string;

  // Doodle background image (AI-generated PNG)
  doodleBg: string;
  doodleOpacity: number;
  doodleTile: boolean;

  // Question number badge
  badgeBg: string;
  badgeText: string;

  // Question text
  questionText: string;
  questionSubtext: string;

  // Answer cards (unselected) — FULLY OPAQUE, no transparency
  cardBg: string;
  cardBorder: string;
  cardHoverBg: string;
  cardText: string;
  cardShadow: string;

  // Answer label badges (A/B/C/D) — per-answer colors
  answerColors: Array<{ bg: string; text: string; border: string }>;

  // Selected state
  selectedBg: string;
  selectedBorder: string;
  selectedText: string;
  selectedRing: string;

  // Progress bar
  progressTrackBg: string;
  progressFillColor: string;

  // XP badge
  xpBg: string;
  xpText: string;
  xpLabel: string;

  // Close button
  closeBtnText: string;
  closeBtnHover: string;

  // Confidence buttons
  thinkBg: string;
  thinkBorder: string;
  thinkText: string;
  knowBg: string;
  knowBorder: string;
  knowText: string;

  // Summary page
  summaryBg: string;
  scoreBg: string;
  scoreBorder: string;
  scoreText: string;
  scoreLabel: string;
  cardCorrectBg: string;
  cardCorrectBorder: string;
  cardWrongBg: string;
  cardWrongBorder: string;
  btnPrimaryBg: string;
  btnPrimaryText: string;
  btnSecondaryBg: string;
  btnSecondaryBorder: string;
  btnSecondaryText: string;
}

// Kahoot-inspired answer label colors (bold, saturated)
const DARK_ANSWER_COLORS = [
  { bg: 'bg-red-500', text: 'text-white', border: 'border-red-500' },
  { bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-500' },
  { bg: 'bg-emerald-500', text: 'text-white', border: 'border-emerald-500' },
  { bg: 'bg-amber-500', text: 'text-white', border: 'border-amber-500' },
];

// Duolingo-inspired answer label colors (solid colored badges)
const LIGHT_ANSWER_COLORS = [
  { bg: 'bg-indigo-500', text: 'text-white', border: 'border-indigo-500' },
  { bg: 'bg-rose-500', text: 'text-white', border: 'border-rose-500' },
  { bg: 'bg-teal-500', text: 'text-white', border: 'border-teal-500' },
  { bg: 'bg-amber-500', text: 'text-white', border: 'border-amber-500' },
];

export const DARK_THEME: QuizTheme = {
  mode: 'dark',

  pageBg: 'bg-[#1a0a3e]',

  doodleBg: '/textures/vibecode-dark-2.png',
  doodleOpacity: 0.3,
  doodleTile: true,

  badgeBg: 'bg-white/15',
  badgeText: 'text-white/70',

  questionText: 'text-white',
  questionSubtext: 'text-white/40',

  // Solid dark cards — no transparency
  cardBg: 'bg-[#2a1a5e]',
  cardBorder: 'border-[#3d2b7a]',
  cardHoverBg: 'hover:bg-[#342470]',
  cardText: 'text-white',
  cardShadow: 'shadow-lg shadow-black/20',

  answerColors: DARK_ANSWER_COLORS,

  selectedBg: 'bg-indigo-600',
  selectedBorder: 'border-indigo-400',
  selectedText: 'text-white',
  selectedRing: 'ring-indigo-400/50',

  progressTrackBg: 'bg-white/10',
  progressFillColor: '#818CF8',

  xpBg: 'bg-amber-500/20',
  xpText: 'text-amber-300',
  xpLabel: 'text-amber-400/60',

  closeBtnText: 'text-white/40',
  closeBtnHover: 'hover:text-white/70 hover:bg-white/10',

  thinkBg: 'bg-[#2a1a5e]',
  thinkBorder: 'border-[#3d2b7a]',
  thinkText: 'text-white/80',
  knowBg: 'bg-indigo-500',
  knowBorder: 'border-indigo-500',
  knowText: 'text-white',

  summaryBg: 'bg-[#1a0a3e]',
  scoreBg: 'bg-[#2a1a5e]',
  scoreBorder: 'border-indigo-400/40',
  scoreText: 'text-indigo-300',
  scoreLabel: 'text-indigo-400/60',
  cardCorrectBg: 'bg-emerald-900/40',
  cardCorrectBorder: 'border-emerald-500/40',
  cardWrongBg: 'bg-red-900/40',
  cardWrongBorder: 'border-red-500/40',
  btnPrimaryBg: 'bg-indigo-500 hover:bg-indigo-600',
  btnPrimaryText: 'text-white',
  btnSecondaryBg: 'bg-[#2a1a5e]',
  btnSecondaryBorder: 'border-[#3d2b7a]',
  btnSecondaryText: 'text-white/70',
};

export const LIGHT_THEME: QuizTheme = {
  mode: 'light',

  pageBg: 'bg-[#f0f0f0]',

  doodleBg: '/textures/vibecode-light-1.png',
  doodleOpacity: 0.15,
  doodleTile: true,

  badgeBg: 'bg-indigo-100',
  badgeText: 'text-indigo-500',

  questionText: 'text-stone-900',
  questionSubtext: 'text-stone-400',

  // Solid white cards — thick border, strong shadow (Duolingo-style)
  cardBg: 'bg-white',
  cardBorder: 'border-stone-200',
  cardHoverBg: 'hover:bg-stone-50',
  cardText: 'text-stone-800',
  cardShadow: 'shadow-md shadow-stone-200/60',

  answerColors: LIGHT_ANSWER_COLORS,

  selectedBg: 'bg-indigo-50',
  selectedBorder: 'border-indigo-500',
  selectedText: 'text-indigo-900',
  selectedRing: 'ring-indigo-500/30',

  progressTrackBg: 'bg-stone-200',
  progressFillColor: '#6366F1',

  xpBg: 'bg-amber-50',
  xpText: 'text-amber-600',
  xpLabel: 'text-amber-400',

  closeBtnText: 'text-stone-400',
  closeBtnHover: 'hover:text-stone-600 hover:bg-stone-100',

  thinkBg: 'bg-white',
  thinkBorder: 'border-stone-300',
  thinkText: 'text-stone-600',
  knowBg: 'bg-indigo-500',
  knowBorder: 'border-indigo-500',
  knowText: 'text-white',

  summaryBg: 'bg-[#f0f0f0]',
  scoreBg: 'bg-white',
  scoreBorder: 'border-indigo-200',
  scoreText: 'text-indigo-600',
  scoreLabel: 'text-indigo-400',
  cardCorrectBg: 'bg-emerald-50',
  cardCorrectBorder: 'border-emerald-200',
  cardWrongBg: 'bg-red-50',
  cardWrongBorder: 'border-red-200',
  btnPrimaryBg: 'bg-indigo-500 hover:bg-indigo-600',
  btnPrimaryText: 'text-white',
  btnSecondaryBg: 'bg-white',
  btnSecondaryBorder: 'border-stone-300',
  btnSecondaryText: 'text-stone-600',
};

export function getThemeByMode(mode: ThemeMode): QuizTheme {
  return mode === 'dark' ? DARK_THEME : LIGHT_THEME;
}
