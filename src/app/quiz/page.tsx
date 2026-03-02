'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function QuizLauncher() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/25"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="18" r="14" />
            <path d="M14 14c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2-1.5 3-3 3.5V20" />
            <circle cx="18" cy="24" r="0.5" fill="white" />
          </svg>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-stone-900 mb-3">
          Math Quiz
        </h1>
        <p className="text-stone-500 mb-10 leading-relaxed">
          7 questions. Answer honestly — tell us if you know it or just think so.
          Your confidence matters as much as your answer.
        </p>

        {/* Topic cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 mb-10"
        >
          <div className="p-4 rounded-xl border-2 border-indigo-100 bg-indigo-50/50 text-left">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-stone-900">Mixed Practice</div>
                <div className="text-sm text-stone-500">
                  Algebra, Geometry, Numbers
                </div>
              </div>
              <div className="text-xs font-medium text-indigo-500 px-2 py-1 rounded-full bg-indigo-100">
                7 Qs
              </div>
            </div>
          </div>
        </motion.div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/quiz/play">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                w-full py-4 rounded-2xl
                bg-indigo-500 text-white font-semibold text-lg
                hover:bg-indigo-600
                shadow-lg shadow-indigo-500/25
                transition-colors duration-150
              "
            >
              Start Session
            </motion.button>
          </Link>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 pt-8 border-t border-stone-100"
        >
          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">
            How it works
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-stone-100 flex items-center justify-center text-lg">
                1
              </div>
              <p className="text-xs text-stone-500">Pick an answer</p>
            </div>
            <div>
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-stone-100 flex items-center justify-center text-lg">
                2
              </div>
              <p className="text-xs text-stone-500">Rate your confidence</p>
            </div>
            <div>
              <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-stone-100 flex items-center justify-center text-lg">
                3
              </div>
              <p className="text-xs text-stone-500">Learn from feedback</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
