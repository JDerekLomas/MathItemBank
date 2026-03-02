'use client';

import { motion } from 'framer-motion';
import { QuizQuestion, getFeedbackType } from './types';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface SessionSummaryProps {
  questions: QuizQuestion[];
  totalXP: number;
  onPlayAgain: () => void;
  onExit: () => void;
}

export default function SessionSummary({
  questions,
  totalXP,
  onPlayAgain,
  onExit,
}: SessionSummaryProps) {
  const correct = questions.filter((q) => q.isCorrect).length;
  const total = questions.length;
  const confidentWrong = questions.filter(
    (q) =>
      q.confidence === 'know' && q.isCorrect === false
  ).length;
  const misconceptionsCleared = confidentWrong; // In v0.2, track which ones were re-tested

  useEffect(() => {
    // Fire confetti on mount
    const end = Date.now() + 1500;
    const colors = ['#4F46E5', '#22C55E', '#F59E0B', '#EC4899'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-stone-50 to-white"
    >
      <div className="w-full max-w-md">
        {/* Score circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="mx-auto w-32 h-32 rounded-full bg-indigo-50 border-4 border-indigo-200 flex items-center justify-center mb-8"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-600">
              {correct}/{total}
            </div>
            <div className="text-xs text-indigo-400 font-medium">correct</div>
          </div>
        </motion.div>

        {/* XP earned */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <div className="text-4xl font-bold text-amber-500 mb-1">
            +{totalXP} XP
          </div>
          <div className="text-sm text-stone-400">earned this session</div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-3 mb-10"
        >
          {questions.map((q, i) => {
            const ft =
              q.confidence && q.isCorrect !== null
                ? getFeedbackType(q.confidence, q.isCorrect)
                : null;
            return (
              <div
                key={i}
                className={`
                  flex items-center gap-3 p-3 rounded-xl border
                  ${q.isCorrect ? 'bg-emerald-50/50 border-emerald-100' : 'bg-red-50/30 border-red-100'}
                `}
              >
                <div
                  className={`
                    w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0
                    ${q.isCorrect ? 'bg-emerald-500' : 'bg-red-400'}
                  `}
                >
                  {q.isCorrect ? '✓' : '✗'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-stone-700 truncate">
                    {q.item.question}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {ft === 'confident-wrong' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-600 font-medium">
                      misconception
                    </span>
                  )}
                  {ft === 'unsure-correct' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-600 font-medium">
                      lucky
                    </span>
                  )}
                  {q.confidence && (
                    <span className="text-xs text-stone-400 ml-2">
                      {q.confidence === 'know' ? 'sure' : 'unsure'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Insight */}
        {misconceptionsCleared > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-8 p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-center"
          >
            <p className="text-sm text-indigo-700 font-medium">
              You discovered {misconceptionsCleared} misconception
              {misconceptionsCleared > 1 ? 's' : ''} — these will come back in
              a future session so you can clear them.
            </p>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex gap-3"
        >
          <button
            onClick={onExit}
            className="flex-1 py-3.5 rounded-xl border-2 border-stone-200 text-stone-600 font-medium hover:bg-stone-50 transition-colors"
          >
            Done
          </button>
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3.5 rounded-xl bg-indigo-500 text-white font-semibold hover:bg-indigo-600 shadow-md shadow-indigo-500/20 transition-colors"
          >
            Play Again
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
