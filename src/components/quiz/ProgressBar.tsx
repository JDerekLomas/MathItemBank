'use client';

import { motion } from 'framer-motion';
import { QuizTheme } from './theme';

interface ProgressBarProps {
  current: number;
  total: number;
  xp: number;
  theme: QuizTheme;
}

export default function ProgressBar({ current, total, xp, theme }: ProgressBarProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="flex items-center gap-4 w-full">
      <div className={`flex-1 h-2.5 ${theme.progressTrackBg} rounded-full overflow-hidden shadow-inner`}>
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: theme.progressFillColor }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${theme.xpBg}`}>
          <motion.span
            key={xp}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            className={`text-sm font-bold ${theme.xpText}`}
          >
            {xp}
          </motion.span>
          <span className={`text-xs font-semibold ${theme.xpLabel}`}>XP</span>
        </div>
      </div>
    </div>
  );
}
