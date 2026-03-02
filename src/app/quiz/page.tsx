'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const STEP_COLORS = [
  { bg: 'bg-indigo-100', text: 'text-indigo-600', ring: 'ring-indigo-200' },
  { bg: 'bg-violet-100', text: 'text-violet-600', ring: 'ring-violet-200' },
  { bg: 'bg-emerald-100', text: 'text-emerald-600', ring: 'ring-emerald-200' },
];

export default function QuizLauncher() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50/40 to-rose-50/30 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="launcher-dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="rgba(99,102,241,0.06)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#launcher-dots)" />
        </svg>
        <div className="absolute top-20 -right-20 w-64 h-64 rounded-full bg-indigo-200/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-violet-200/20 blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-rose-200/15 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md text-center relative z-10"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/25"
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
          <div className="p-4 rounded-xl border-2 border-indigo-200/60 bg-white/60 backdrop-blur-sm text-left shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-stone-900">Mixed Practice</div>
                <div className="text-sm text-stone-500">
                  Algebra, Geometry, Numbers
                </div>
              </div>
              <div className="text-xs font-semibold text-indigo-600 px-3 py-1.5 rounded-full bg-indigo-100 border border-indigo-200/60">
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
                bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold text-lg
                hover:from-indigo-600 hover:to-violet-700
                shadow-lg shadow-indigo-500/25
                transition-all duration-150
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
          className="mt-10 pt-8 border-t border-stone-200/50"
        >
          <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-5">
            How it works
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { step: '1', label: 'Pick an answer' },
              { step: '2', label: 'Rate your confidence' },
              { step: '3', label: 'Learn from feedback' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className={`w-11 h-11 mx-auto mb-2.5 rounded-xl ${STEP_COLORS[i].bg} ring-2 ${STEP_COLORS[i].ring} flex items-center justify-center text-lg font-bold ${STEP_COLORS[i].text}`}>
                  {item.step}
                </div>
                <p className="text-xs text-stone-500 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
