'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  xp: number;
  accentColor?: string;
}

export default function ProgressBar({ current, total, xp, accentColor }: ProgressBarProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex-1 h-2.5 bg-white/50 backdrop-blur-sm rounded-full overflow-hidden shadow-inner">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: accentColor || '#6366F1' }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/60">
          <motion.span
            key={xp}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
            className="text-sm font-bold text-amber-600"
          >
            {xp}
          </motion.span>
          <span className="text-xs font-semibold text-amber-400">XP</span>
        </div>
      </div>
    </div>
  );
}
