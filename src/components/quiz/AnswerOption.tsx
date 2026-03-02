'use client';

import { motion } from 'framer-motion';
import { FeedbackType } from './types';
import { QuizTheme } from './theme';

interface AnswerOptionProps {
  text: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  feedbackType: FeedbackType | null;
  showFeedback: boolean;
  isCorrectAnswer: boolean;
  onSelect: (index: number) => void;
  disabled: boolean;
  theme: QuizTheme;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function AnswerOption({
  text,
  index,
  isSelected,
  feedbackType,
  showFeedback,
  isCorrectAnswer,
  onSelect,
  disabled,
  theme,
}: AnswerOptionProps) {
  const isDark = theme.mode === 'dark';
  const answerColor = theme.answerColors[index % theme.answerColors.length];

  const getCardStyle = () => {
    if (!showFeedback) {
      if (isSelected) {
        return `${theme.selectedBorder} ${theme.selectedBg} ring-2 ${theme.selectedRing} shadow-md`;
      }
      return `${theme.cardBorder} ${theme.cardBg} ${theme.cardHoverBg} hover:shadow-md hover:scale-[1.02] active:scale-[0.98] ${theme.cardShadow}`;
    }

    // Feedback: correct answer highlight
    if (isCorrectAnswer) {
      return isDark
        ? 'border-emerald-500 bg-emerald-900 ring-2 ring-emerald-500/30 shadow-md'
        : 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/30 shadow-md';
    }
    // Feedback: selected wrong answer
    if (isSelected && !isCorrectAnswer) {
      return isDark
        ? 'border-red-400 bg-red-900 ring-2 ring-red-400/20'
        : 'border-red-400 bg-red-50 ring-2 ring-red-400/20';
    }
    // Feedback: unselected non-correct (dim)
    if (isDark) {
      return `${theme.cardBorder} ${theme.cardBg} opacity-40`;
    }
    return 'border-stone-100 bg-white opacity-50';
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getAnimateProps = (): any => {
    if (
      showFeedback &&
      isSelected &&
      !isCorrectAnswer &&
      (feedbackType === 'confident-wrong' || feedbackType === 'unsure-wrong')
    ) {
      return {
        x: [0, -8, 8, -6, 6, -3, 3, 0],
        transition: { duration: 0.4, ease: 'easeInOut' },
      };
    }
    if (showFeedback && isSelected && isCorrectAnswer) {
      return {
        scale: [1, 1.05, 0.97, 1.02, 1],
        transition: { duration: 0.4, ease: 'easeOut' },
      };
    }
    return {};
  };

  const getLabelStyle = () => {
    if (showFeedback && isCorrectAnswer) return 'bg-emerald-500 text-white';
    if (showFeedback && isSelected && !isCorrectAnswer) return 'bg-red-400 text-white';
    if (isSelected) {
      return isDark ? 'bg-white text-indigo-600' : 'bg-indigo-500 text-white';
    }
    // Default: use per-answer theme colors
    return `${answerColor.bg} ${answerColor.text}`;
  };

  const getTextStyle = () => {
    if (showFeedback && isCorrectAnswer) return isDark ? 'text-emerald-200 font-medium' : 'text-emerald-900 font-medium';
    if (showFeedback && isSelected && !isCorrectAnswer) return isDark ? 'text-red-200' : 'text-red-800';
    if (isSelected) return `${theme.selectedText} font-medium`;
    return theme.cardText;
  };

  return (
    <motion.button
      layout
      onClick={() => !disabled && onSelect(index)}
      disabled={disabled}
      className={`
        relative w-full text-left rounded-xl border-2 p-4
        transition-colors duration-150
        ${getCardStyle()}
        ${disabled && !showFeedback ? 'cursor-default' : 'cursor-pointer'}
      `}
      animate={getAnimateProps()}
      whileHover={!disabled && !showFeedback ? { y: -2 } : {}}
      whileTap={!disabled && !showFeedback ? { scale: 0.97 } : {}}
    >
      <div className="flex items-start gap-3">
        <span
          className={`
            flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold
            ${getLabelStyle()}
          `}
        >
          {showFeedback && isCorrectAnswer ? (
            <CheckIcon />
          ) : showFeedback && isSelected && !isCorrectAnswer ? (
            <XIcon />
          ) : (
            OPTION_LABELS[index]
          )}
        </span>
        <span className={`text-base leading-relaxed pt-0.5 ${getTextStyle()}`}>
          {text}
        </span>
      </div>
    </motion.button>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 8 6.5 11.5 13 5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    >
      <line x1="3" y1="3" x2="11" y2="11" />
      <line x1="11" y1="3" x2="3" y2="11" />
    </svg>
  );
}
