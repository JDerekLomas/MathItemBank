// Per-question color themes that cycle through the session
// Each theme defines a background gradient, accent color, and label badge color

export interface QuestionTheme {
  // Background gradient (from → to)
  bgFrom: string;
  bgTo: string;
  // Accent for question number badge
  badgeBg: string;
  badgeText: string;
  // Subtle accent for unselected answer label badges
  labelBg: string;
  labelText: string;
  // Dot pattern color
  dotColor: string;
  // Progress bar segment color
  progressColor: string;
}

export const QUESTION_THEMES: QuestionTheme[] = [
  {
    // Indigo (cool)
    bgFrom: 'from-indigo-50/80',
    bgTo: 'to-slate-50',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-600',
    labelBg: 'bg-indigo-50',
    labelText: 'text-indigo-400',
    dotColor: 'rgba(99,102,241,0.07)',
    progressColor: '#6366F1',
  },
  {
    // Violet (warm-cool)
    bgFrom: 'from-violet-50/80',
    bgTo: 'to-fuchsia-50/30',
    badgeBg: 'bg-violet-100',
    badgeText: 'text-violet-600',
    labelBg: 'bg-violet-50',
    labelText: 'text-violet-400',
    dotColor: 'rgba(139,92,246,0.07)',
    progressColor: '#8B5CF6',
  },
  {
    // Sky (fresh)
    bgFrom: 'from-sky-50/80',
    bgTo: 'to-cyan-50/30',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-600',
    labelBg: 'bg-sky-50',
    labelText: 'text-sky-400',
    dotColor: 'rgba(14,165,233,0.07)',
    progressColor: '#0EA5E9',
  },
  {
    // Teal (calm)
    bgFrom: 'from-teal-50/80',
    bgTo: 'to-emerald-50/30',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-600',
    labelBg: 'bg-teal-50',
    labelText: 'text-teal-400',
    dotColor: 'rgba(20,184,166,0.07)',
    progressColor: '#14B8A6',
  },
  {
    // Rose (warm)
    bgFrom: 'from-rose-50/80',
    bgTo: 'to-orange-50/30',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-600',
    labelBg: 'bg-rose-50',
    labelText: 'text-rose-400',
    dotColor: 'rgba(244,63,94,0.06)',
    progressColor: '#F43F5E',
  },
  {
    // Amber (warm)
    bgFrom: 'from-amber-50/80',
    bgTo: 'to-yellow-50/30',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    labelBg: 'bg-amber-50',
    labelText: 'text-amber-400',
    dotColor: 'rgba(245,158,11,0.07)',
    progressColor: '#F59E0B',
  },
  {
    // Lime (energetic)
    bgFrom: 'from-lime-50/80',
    bgTo: 'to-green-50/30',
    badgeBg: 'bg-lime-100',
    badgeText: 'text-lime-700',
    labelBg: 'bg-lime-50',
    labelText: 'text-lime-500',
    dotColor: 'rgba(132,204,22,0.08)',
    progressColor: '#84CC16',
  },
];

export function getTheme(questionIndex: number): QuestionTheme {
  return QUESTION_THEMES[questionIndex % QUESTION_THEMES.length];
}
