'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import DoodleBg from '@/components/quiz/DoodleBg';

const PATHS = [
  {
    label: 'Practice Quiz',
    description: 'Test what you know with confidence-based questions',
    href: '/quiz',
    color: 'bg-violet-500',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    label: 'Learn Vibe Coding',
    description: 'Structured path from first conversation to shipped product',
    href: 'https://learnvibecoding.vercel.app/skill-map',
    color: 'bg-indigo-500',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    label: 'Item Bank',
    description: 'Browse K-12 math standards and assessment items',
    href: '/skills',
    color: 'bg-emerald-500',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
];

const FEATURES = [
  {
    title: 'Confidence Matters',
    description: '"I think" vs "I know" — earn more XP when you\'re honestly confident',
    color: 'bg-amber-500',
  },
  {
    title: 'Learn From Mistakes',
    description: 'Wrong answers with honesty still earn XP. Overconfidence costs you.',
    color: 'bg-rose-500',
  },
  {
    title: 'Build Real Things',
    description: 'Go beyond quizzes — follow the curriculum to ship your own AI projects',
    color: 'bg-blue-500',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      <DoodleBg src="/textures/vibecode-light-1.png" opacity={0.18} />

      <div className="mx-auto max-w-2xl px-6 py-12 relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10 bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 px-8 py-8"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-stone-900">
            AI Growth
          </h1>
          <p className="mt-3 text-lg font-semibold text-stone-500">
            Learn to build with AI — from zero to shipped product.
          </p>
        </motion.div>

        {/* Action cards */}
        <div className="space-y-3 mb-8">
          {PATHS.map((path, i) => {
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="
                  w-full rounded-2xl border-3 border-stone-200 bg-white
                  shadow-lg shadow-stone-200/60
                  p-5 flex items-center gap-5
                  cursor-pointer hover:border-stone-300
                  transition-shadow duration-200
                "
              >
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-white ${path.color}`}>
                  {path.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-extrabold leading-tight text-stone-900">
                    {path.label}
                  </p>
                  <p className="text-sm font-semibold mt-1 text-stone-500">
                    {path.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </motion.div>
            );

            if (path.href.startsWith('http')) {
              return (
                <a key={path.label} href={path.href} target="_blank" rel="noopener noreferrer" className="block no-underline">
                  {inner}
                </a>
              );
            }
            return (
              <Link key={path.label} href={path.href} className="block no-underline">
                {inner}
              </Link>
            );
          })}
        </div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <Link href="/onboard">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                w-full py-5 rounded-2xl
                bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-extrabold text-xl
                shadow-xl shadow-indigo-500/25
                hover:from-indigo-600 hover:to-violet-600
                transition-all duration-150
                border-2 border-white/20
                cursor-pointer
              "
            >
              Start Learning
            </motion.button>
          </Link>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 p-6"
        >
          <h3 className="text-xs font-extrabold text-stone-400 uppercase tracking-widest mb-6 text-center">
            Why AI Growth?
          </h3>
          <div className="space-y-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center text-white font-extrabold text-sm`}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-base font-extrabold text-stone-900">{feature.title}</p>
                  <p className="text-sm font-medium text-stone-500 mt-0.5">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
