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
      className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-indigo-50 via-violet-50/40 to-emerald-50/30 relative overflow-hidden"
    >
      {/* Background texture + decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: 'url(/textures/cream-dust.png)', backgroundRepeat: 'repeat' }}
        />
        <div className="absolute top-10 -right-20 w-60 h-60 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-emerald-200/20 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-violet-200/15 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Score circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className="mx-auto w-32 h-32 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 border-4 border-indigo-200/80 flex items-center justify-center mb-8 shadow-lg shadow-indigo-200/30"
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
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-50 border border-amber-200/60 mb-2">
            <span className="text-3xl font-bold text-amber-500">+{totalXP}</span>
            <span className="text-lg font-semibold text-amber-400">XP</span>
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
                  flex items-center gap-3 p-3 rounded-xl border backdrop-blur-sm
                  ${q.isCorrect ? 'bg-emerald-50/60 border-emerald-200/60' : 'bg-red-50/50 border-red-200/50'}
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
            className="flex-1 py-3.5 rounded-xl border-2 border-stone-200/60 bg-white/60 backdrop-blur-sm text-stone-600 font-medium hover:bg-white/80 transition-colors"
          >
            Done
          </button>
          <button
            onClick={onPlayAgain}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold hover:from-indigo-600 hover:to-violet-700 shadow-md shadow-indigo-500/20 transition-all"
          >
            Play Again
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
