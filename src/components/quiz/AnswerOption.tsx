'use client';

import { motion } from 'framer-motion';
import { FeedbackType } from './types';

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
  labelBg?: string;
  labelText?: string;
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
  labelBg,
  labelText,
}: AnswerOptionProps) {
  const getCardStyle = () => {
    if (!showFeedback) {
      if (isSelected) {
        return 'border-indigo-500 bg-indigo-50/90 ring-2 ring-indigo-500/30 shadow-md backdrop-blur-sm';
      }
      return 'border-white/60 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:border-white/80 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] shadow-sm';
    }

    // Feedback states
    if (isSelected && isCorrectAnswer) {
      return 'border-emerald-500 bg-emerald-50/90 ring-2 ring-emerald-500/30 shadow-md backdrop-blur-sm';
    }
    if (isSelected && !isCorrectAnswer) {
      return 'border-red-400 bg-red-50/80 ring-2 ring-red-400/20 backdrop-blur-sm';
    }
    if (!isSelected && isCorrectAnswer) {
      return 'border-emerald-500 bg-emerald-50/90 ring-2 ring-emerald-500/30 shadow-md backdrop-blur-sm';
    }
    return 'border-white/30 bg-white/30 backdrop-blur-sm opacity-50';
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
            ${
              showFeedback && isCorrectAnswer
                ? 'bg-emerald-500 text-white'
                : showFeedback && isSelected && !isCorrectAnswer
                  ? 'bg-red-400 text-white'
                  : isSelected
                    ? 'bg-indigo-500 text-white'
                    : `${labelBg || 'bg-stone-100'} ${labelText || 'text-stone-500'}`
            }
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
        <span
          className={`
            text-base leading-relaxed pt-0.5
            ${
              showFeedback && isCorrectAnswer
                ? 'text-emerald-900 font-medium'
                : showFeedback && isSelected && !isCorrectAnswer
                  ? 'text-red-800'
                  : isSelected
                    ? 'text-indigo-900 font-medium'
                    : 'text-stone-700'
            }
          `}
        >
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
