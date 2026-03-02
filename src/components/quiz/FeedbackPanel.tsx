'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FeedbackType } from './types';
import { QuizTheme } from './theme';

interface FeedbackPanelProps {
  visible: boolean;
  feedbackType: FeedbackType | null;
  explanation: string;
  misconception?: string | undefined;
  onContinue: () => void;
  theme: QuizTheme;
}

interface FeedbackConfig {
  bg: string;
  border: string;
  icon: string;
  title: string;
  titleColor: string;
  iconBg: string;
  buttonBg: string;
  buttonText: string;
  explanationText: string;
  misconceptionBg: string;
  misconceptionBorder: string;
  misconceptionText: string;
}

function getFeedbackConfig(type: FeedbackType, isDark: boolean): FeedbackConfig {
  const configs: Record<FeedbackType, { light: FeedbackConfig; dark: FeedbackConfig }> = {
    'confident-correct': {
      light: {
        bg: 'bg-emerald-50', border: 'border-emerald-200', icon: '✓', title: 'Nailed it!',
        titleColor: 'text-emerald-700', iconBg: 'bg-emerald-500 text-white',
        buttonBg: 'bg-emerald-500 hover:bg-emerald-600', buttonText: 'text-white',
        explanationText: 'text-stone-700',
        misconceptionBg: '', misconceptionBorder: '', misconceptionText: '',
      },
      dark: {
        bg: 'bg-emerald-950', border: 'border-emerald-700', icon: '✓', title: 'Nailed it!',
        titleColor: 'text-emerald-300', iconBg: 'bg-emerald-500 text-white',
        buttonBg: 'bg-emerald-500 hover:bg-emerald-600', buttonText: 'text-white',
        explanationText: 'text-emerald-100/80',
        misconceptionBg: '', misconceptionBorder: '', misconceptionText: '',
      },
    },
    'unsure-correct': {
      light: {
        bg: 'bg-teal-50', border: 'border-teal-200', icon: '~', title: 'Correct — but worth reviewing',
        titleColor: 'text-teal-700', iconBg: 'bg-teal-500 text-white',
        buttonBg: 'bg-teal-500 hover:bg-teal-600', buttonText: 'text-white',
        explanationText: 'text-stone-700',
        misconceptionBg: '', misconceptionBorder: '', misconceptionText: '',
      },
      dark: {
        bg: 'bg-teal-950', border: 'border-teal-700', icon: '~', title: 'Correct — but worth reviewing',
        titleColor: 'text-teal-300', iconBg: 'bg-teal-500 text-white',
        buttonBg: 'bg-teal-500 hover:bg-teal-600', buttonText: 'text-white',
        explanationText: 'text-teal-100/80',
        misconceptionBg: '', misconceptionBorder: '', misconceptionText: '',
      },
    },
    'unsure-wrong': {
      light: {
        bg: 'bg-amber-50', border: 'border-amber-200', icon: '→', title: "Here's what's going on",
        titleColor: 'text-amber-800', iconBg: 'bg-amber-500 text-white',
        buttonBg: 'bg-amber-500 hover:bg-amber-600', buttonText: 'text-white',
        explanationText: 'text-stone-700',
        misconceptionBg: '', misconceptionBorder: '', misconceptionText: '',
      },
      dark: {
        bg: 'bg-amber-950', border: 'border-amber-700', icon: '→', title: "Here's what's going on",
        titleColor: 'text-amber-300', iconBg: 'bg-amber-500 text-white',
        buttonBg: 'bg-amber-500 hover:bg-amber-600', buttonText: 'text-white',
        explanationText: 'text-amber-100/80',
        misconceptionBg: '', misconceptionBorder: '', misconceptionText: '',
      },
    },
    'confident-wrong': {
      light: {
        bg: 'bg-red-50', border: 'border-red-200', icon: '!', title: 'Misconception found',
        titleColor: 'text-red-700', iconBg: 'bg-red-500 text-white',
        buttonBg: 'bg-red-500 hover:bg-red-600', buttonText: 'text-white',
        explanationText: 'text-stone-700',
        misconceptionBg: 'bg-red-100/60', misconceptionBorder: 'border-red-200/60', misconceptionText: 'text-red-800',
      },
      dark: {
        bg: 'bg-red-950', border: 'border-red-700', icon: '!', title: 'Misconception found',
        titleColor: 'text-red-300', iconBg: 'bg-red-500 text-white',
        buttonBg: 'bg-red-500 hover:bg-red-600', buttonText: 'text-white',
        explanationText: 'text-red-100/80',
        misconceptionBg: 'bg-red-900/60', misconceptionBorder: 'border-red-700/60', misconceptionText: 'text-red-200',
      },
    },
  };
  return isDark ? configs[type].dark : configs[type].light;
}

export default function FeedbackPanel({
  visible,
  feedbackType,
  explanation,
  misconception,
  onContinue,
  theme,
}: FeedbackPanelProps) {
  if (!feedbackType) return null;
  const config = getFeedbackConfig(feedbackType, theme.mode === 'dark');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{
            duration: 0.35,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: feedbackType === 'confident-wrong' ? 0.5 : 0.15,
          }}
          className={`
            mt-6 rounded-2xl border-2 p-5 shadow-sm
            ${config.bg} ${config.border}
          `}
        >
          <div className="flex items-start gap-3 mb-3">
            <div
              className={`
              flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
              text-sm font-bold ${config.iconBg}
            `}
            >
              {config.icon}
            </div>
            <div>
              <h3 className={`font-semibold text-base ${config.titleColor}`}>
                {config.title}
              </h3>
            </div>
          </div>

          {misconception && feedbackType === 'confident-wrong' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`mb-3 px-3 py-2 rounded-lg ${config.misconceptionBg} border ${config.misconceptionBorder}`}
            >
              <p className={`text-sm ${config.misconceptionText} font-medium`}>
                Common trap: {misconception}
              </p>
            </motion.div>
          )}

          <p className={`text-sm ${config.explanationText} leading-relaxed mb-4`}>
            {explanation}
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinue}
            className={`
              w-full py-3 rounded-xl font-semibold text-base
              ${config.buttonBg} ${config.buttonText}
              shadow-sm transition-colors duration-150
            `}
          >
            {feedbackType === 'confident-correct' ? 'Next' : 'Got it'}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
