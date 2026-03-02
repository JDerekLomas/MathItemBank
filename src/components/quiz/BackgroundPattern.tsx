'use client';

import { motion } from 'framer-motion';

// Cycle through real textures per question
const TEXTURES = [
  '/textures/cream-dust.png',
  '/textures/white-linen.png',
  '/textures/tactile-noise-light.png',
  '/textures/white-sand.png',
  '/textures/subtle-dots.png',
  '/textures/cream-dust.png',
  '/textures/white-linen.png',
];

interface BackgroundPatternProps {
  dotColor: string;
  questionIndex: number;
}

export default function BackgroundPattern({ dotColor, questionIndex }: BackgroundPatternProps) {
  const texture = TEXTURES[questionIndex % TEXTURES.length];

  return (
    <motion.div
      key={questionIndex}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {/* Real PNG texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{ backgroundImage: `url(${texture})`, backgroundRepeat: 'repeat' }}
      />

      {/* Decorative floating blobs */}
      <motion.div
        className="absolute -top-10 -right-10 w-48 h-48 rounded-full"
        style={{ background: dotColor.replace(/[\d.]+\)$/, '0.18)') }}
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-24 -left-12 w-64 h-64 rounded-full"
        style={{ background: dotColor.replace(/[\d.]+\)$/, '0.14)') }}
        animate={{
          y: [0, 8, 0],
          x: [0, -4, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/3 -right-6 w-32 h-32 rounded-full"
        style={{ background: dotColor.replace(/[\d.]+\)$/, '0.10)') }}
        animate={{
          y: [0, -6, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
