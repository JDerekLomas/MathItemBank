'use client';

import { motion } from 'framer-motion';
import { QuizQuestion, getFeedbackType } from './types';
import { QuizTheme } from './theme';
import DoodleBg from './DoodleBg';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface SessionSummaryProps {
  questions: QuizQuestion[];
  totalXP: number;
  onPlayAgain: () => void;
  onExit: () => void;
  theme: QuizTheme;
}

export default function SessionSummary({
  questions,
  totalXP,
  onPlayAgain,
  onExit,
  theme,
}: SessionSummaryProps) {
  const correct = questions.filter((q) => q.isCorrect).length;
  const total = questions.length;
  const confidentWrong = questions.filter(
    (q) =>
      q.confidence === 'know' && q.isCorrect === false
  ).length;
  const misconceptionsCleared = confidentWrong;

  useEffect(() => {
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
      className={`min-h-screen flex flex-col items-center justify-center px-6 ${theme.summaryBg} relative overflow-hidden`}
    >
      {/* Background pattern */}
      <DoodleBg src={theme.doodleBg} opacity={theme.doodleOpacity} tile={theme.doodleTile} />

      <div className="w-full max-w-md relative z-10">
        {/* Score circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          className={`mx-auto w-32 h-32 rounded-full ${theme.scoreBg} border-4 ${theme.scoreBorder} flex items-center justify-center mb-8 shadow-lg`}
        >
          <div className="text-center">
            <div className={`text-3xl font-bold ${theme.scoreText}`}>
              {correct}/{total}
            </div>
            <div className={`text-xs ${theme.scoreLabel} font-medium`}>correct</div>
          </div>
        </motion.div>

        {/* XP earned */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full ${theme.xpBg} mb-2`}>
            <span className={`text-3xl font-bold ${theme.xpText}`}>+{totalXP}</span>
            <span className={`text-lg font-semibold ${theme.xpLabel}`}>XP</span>
          </div>
          <div className={`text-sm ${theme.questionSubtext}`}>earned this session</div>
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
                  ${q.isCorrect ? `${theme.cardCorrectBg} ${theme.cardCorrectBorder}` : `${theme.cardWrongBg} ${theme.cardWrongBorder}`}
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
                  <p className={`text-sm font-medium ${theme.questionText} truncate`}>
                    {q.item.question}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  {ft === 'confident-wrong' && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${theme.mode === 'dark' ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-600'}`}>
                      misconception
                    </span>
                  )}
                  {ft === 'unsure-correct' && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${theme.mode === 'dark' ? 'bg-teal-900 text-teal-300' : 'bg-teal-100 text-teal-600'}`}>
                      lucky
                    </span>
                  )}
                  {q.confidence && (
                    <span className={`text-xs ${theme.questionSubtext} ml-2`}>
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
            className={`mb-8 p-4 rounded-xl ${theme.scoreBg} border ${theme.scoreBorder} text-center`}
          >
            <p className={`text-sm ${theme.scoreText} font-medium`}>
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
            className={`flex-1 py-3.5 rounded-xl border-2 ${theme.btnSecondaryBorder} ${theme.btnSecondaryBg} ${theme.btnSecondaryText} font-medium hover:opacity-80 transition-colors`}
          >
            Done
          </button>
          <button
            onClick={onPlayAgain}
            className={`flex-1 py-3.5 rounded-xl ${theme.btnPrimaryBg} ${theme.btnPrimaryText} font-semibold shadow-md transition-all`}
          >
            Play Again
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
