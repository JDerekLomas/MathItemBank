'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FeedbackType } from './types';

interface FeedbackPanelProps {
  visible: boolean;
  feedbackType: FeedbackType | null;
  explanation: string;
  misconception?: string | undefined;
  onContinue: () => void;
}

const FEEDBACK_CONFIG: Record<
  FeedbackType,
  {
    bg: string;
    border: string;
    icon: string;
    title: string;
    titleColor: string;
    buttonBg: string;
    buttonText: string;
  }
> = {
  'confident-correct': {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: '✓',
    title: 'Nailed it!',
    titleColor: 'text-emerald-700',
    buttonBg: 'bg-emerald-500 hover:bg-emerald-600',
    buttonText: 'text-white',
  },
  'unsure-correct': {
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    icon: '~',
    title: 'Correct — but worth reviewing',
    titleColor: 'text-teal-700',
    buttonBg: 'bg-teal-500 hover:bg-teal-600',
    buttonText: 'text-white',
  },
  'unsure-wrong': {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: '→',
    title: "Here's what's going on",
    titleColor: 'text-amber-800',
    buttonBg: 'bg-amber-500 hover:bg-amber-600',
    buttonText: 'text-white',
  },
  'confident-wrong': {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: '!',
    title: 'Misconception found',
    titleColor: 'text-red-700',
    buttonBg: 'bg-red-500 hover:bg-red-600',
    buttonText: 'text-white',
  },
};

export default function FeedbackPanel({
  visible,
  feedbackType,
  explanation,
  misconception,
  onContinue,
}: FeedbackPanelProps) {
  if (!feedbackType) return null;
  const config = FEEDBACK_CONFIG[feedbackType];

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
            mt-6 rounded-2xl border-2 p-5
            ${config.bg} ${config.border}
          `}
        >
          <div className="flex items-start gap-3 mb-3">
            <div
              className={`
              flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
              text-sm font-bold
              ${feedbackType === 'confident-correct' ? 'bg-emerald-500 text-white' : ''}
              ${feedbackType === 'unsure-correct' ? 'bg-teal-500 text-white' : ''}
              ${feedbackType === 'unsure-wrong' ? 'bg-amber-500 text-white' : ''}
              ${feedbackType === 'confident-wrong' ? 'bg-red-500 text-white' : ''}
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
              className="mb-3 px-3 py-2 rounded-lg bg-red-100/60 border border-red-200/60"
            >
              <p className="text-sm text-red-800 font-medium">
                Common trap: {misconception}
              </p>
            </motion.div>
          )}

          <p className="text-sm text-stone-700 leading-relaxed mb-4">
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
