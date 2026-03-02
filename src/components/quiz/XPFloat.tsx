'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { QuizTheme } from './theme';

interface XPFloatProps {
  amount: number;
  visible: boolean;
  theme: QuizTheme;
}

export default function XPFloat({ amount, visible, theme }: XPFloatProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1, y: 0, scale: 0.8 }}
          animate={{ opacity: 1, y: -20, scale: 1 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="absolute top-0 right-4 pointer-events-none z-50"
        >
          <span className={`text-lg font-bold ${theme.xpText} drop-shadow-sm`}>
            +{amount} XP
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
