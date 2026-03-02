// Quiz visual theme system
// Two modes: "dark" (Kahoot-style) and "light" (Duolingo-style)

export type ThemeMode = 'dark' | 'light';

export interface QuizTheme {
  mode: ThemeMode;

  // Page background
  pageBg: string;

  // Doodle pattern color for MathDoodleBg / PolkaDotBg
  patternColor: string;
  patternOpacity: number;

  // Question number badge
  badgeBg: string;
  badgeText: string;

  // Question text
  questionText: string;
  questionSubtext: string;

  // Answer cards (unselected)
  cardBg: string;
  cardBorder: string;
  cardHoverBg: string;
  cardText: string;

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

// Kahoot-inspired answer colors (red, blue, green, amber)
const DARK_ANSWER_COLORS = [
  { bg: 'bg-red-500', text: 'text-white', border: 'border-red-500' },
  { bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-500' },
  { bg: 'bg-emerald-500', text: 'text-white', border: 'border-emerald-500' },
  { bg: 'bg-amber-500', text: 'text-white', border: 'border-amber-500' },
];

// Duolingo-inspired answer colors (soft colored left borders)
const LIGHT_ANSWER_COLORS = [
  { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-400' },
  { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-400' },
  { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-400' },
  { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-400' },
];

export const DARK_THEME: QuizTheme = {
  mode: 'dark',

  pageBg: 'bg-[#1a0a3e]',

  patternColor: '#FFFFFF',
  patternOpacity: 0.04,

  badgeBg: 'bg-white/10',
  badgeText: 'text-white/60',

  questionText: 'text-white',
  questionSubtext: 'text-white/40',

  cardBg: 'bg-white/[0.08]',
  cardBorder: 'border-white/[0.12]',
  cardHoverBg: 'hover:bg-white/[0.14]',
  cardText: 'text-white/90',

  answerColors: DARK_ANSWER_COLORS,

  selectedBg: 'bg-indigo-600/40',
  selectedBorder: 'border-indigo-400',
  selectedText: 'text-white',
  selectedRing: 'ring-indigo-400/40',

  progressTrackBg: 'bg-white/10',
  progressFillColor: '#818CF8',

  xpBg: 'bg-amber-500/20',
  xpText: 'text-amber-300',
  xpLabel: 'text-amber-400/60',

  closeBtnText: 'text-white/40',
  closeBtnHover: 'hover:text-white/70 hover:bg-white/10',

  thinkBg: 'bg-white/[0.08]',
  thinkBorder: 'border-white/20',
  thinkText: 'text-white/80',
  knowBg: 'bg-indigo-500',
  knowBorder: 'border-indigo-500',
  knowText: 'text-white',

  summaryBg: 'bg-[#1a0a3e]',
  scoreBg: 'bg-indigo-500/20',
  scoreBorder: 'border-indigo-400/40',
  scoreText: 'text-indigo-300',
  scoreLabel: 'text-indigo-400/60',
  cardCorrectBg: 'bg-emerald-500/10',
  cardCorrectBorder: 'border-emerald-500/30',
  cardWrongBg: 'bg-red-500/10',
  cardWrongBorder: 'border-red-500/30',
  btnPrimaryBg: 'bg-indigo-500 hover:bg-indigo-600',
  btnPrimaryText: 'text-white',
  btnSecondaryBg: 'bg-white/[0.08]',
  btnSecondaryBorder: 'border-white/20',
  btnSecondaryText: 'text-white/70',
};

export const LIGHT_THEME: QuizTheme = {
  mode: 'light',

  pageBg: 'bg-[#f0f0f0]',

  patternColor: '#6366F1',
  patternOpacity: 0.06,

  badgeBg: 'bg-indigo-100',
  badgeText: 'text-indigo-500',

  questionText: 'text-stone-900',
  questionSubtext: 'text-stone-400',

  cardBg: 'bg-white',
  cardBorder: 'border-stone-200',
  cardHoverBg: 'hover:bg-stone-50',
  cardText: 'text-stone-700',

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
