'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Confidence } from './types';

interface ConfidenceButtonsProps {
  visible: boolean;
  onSelect: (confidence: Confidence) => void;
}

export default function ConfidenceButtons({
  visible,
  onSelect,
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
            className="
              flex-1 py-3.5 px-6 rounded-xl
              border-2 border-stone-200 bg-white
              text-stone-600 font-medium text-base
              hover:border-stone-300 hover:bg-stone-50
              transition-colors duration-150
            "
          >
            I think...
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect('know')}
            className="
              flex-1 py-3.5 px-6 rounded-xl
              border-2 border-indigo-500 bg-indigo-500
              text-white font-semibold text-base
              hover:bg-indigo-600 hover:border-indigo-600
              shadow-md shadow-indigo-500/20
              transition-colors duration-150
            "
          >
            I know it.
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
