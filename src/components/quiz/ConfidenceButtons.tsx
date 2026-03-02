'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Confidence } from './types';
import { QuizTheme } from './theme';

interface ConfidenceButtonsProps {
  visible: boolean;
  onSelect: (confidence: Confidence) => void;
  theme: QuizTheme;
}

export default function ConfidenceButtons({
  visible,
  onSelect,
  theme,
}: ConfidenceButtonsProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex gap-3 mt-6"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect('think')}
            className={`
              flex-1 py-3.5 px-6 rounded-xl
              border-2 ${theme.thinkBorder} ${theme.thinkBg}
              ${theme.thinkText} font-medium text-base
              shadow-sm transition-colors duration-150
            `}
          >
            I think...
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect('know')}
            className={`
              flex-1 py-3.5 px-6 rounded-xl
              border-2 ${theme.knowBorder} ${theme.knowBg}
              ${theme.knowText} font-semibold text-base
              shadow-md transition-all duration-150
            `}
          >
            I know it.
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
