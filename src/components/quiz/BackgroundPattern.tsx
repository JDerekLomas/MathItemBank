'use client';

import { motion } from 'framer-motion';

interface BackgroundPatternProps {
  dotColor: string;
  questionIndex: number;
}

export default function BackgroundPattern({ dotColor, questionIndex }: BackgroundPatternProps) {
  // Alternate between dot grid and subtle cross-hatch per question
  const patternId = `pattern-${questionIndex}`;
  const isDots = questionIndex % 2 === 0;

  return (
    <motion.div
      key={questionIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {isDots ? (
            <pattern id={patternId} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill={dotColor} />
            </pattern>
          ) : (
            <pattern id={patternId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="10" x2="20" y2="10" stroke={dotColor} strokeWidth="0.8" />
              <line x1="10" y1="0" x2="10" y2="20" stroke={dotColor} strokeWidth="0.8" />
            </pattern>
          )}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      {/* Decorative floating shapes */}
      <motion.div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30"
        style={{ background: dotColor.replace(/[\d.]+\)$/, '0.15)') }}
        animate={{
          y: [0, -8, 0],
          x: [0, 4, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full opacity-20"
        style={{ background: dotColor.replace(/[\d.]+\)$/, '0.12)') }}
        animate={{
          y: [0, 6, 0],
          x: [0, -3, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
