'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  xp: number;
}

export default function ProgressBar({ current, total, xp }: ProgressBarProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-indigo-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      <div className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 flex-shrink-0">
        <motion.span
          key={xp}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
        >
          {xp}
        </motion.span>
        <span className="text-amber-400">XP</span>
      </div>
    </div>
  );
}
