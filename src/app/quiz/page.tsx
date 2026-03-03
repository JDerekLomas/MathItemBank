'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import DoodleBg from '@/components/quiz/DoodleBg';

interface TopicCard {
  id: string;
  label: string;
  description: string;
  tags: string[];
  count: number;
  icon: string;
}

const TOPICS: TopicCard[] = [
  {
    id: 'all',
    label: 'Mixed Practice',
    description: 'All vibe coding topics',
    tags: [],
    count: 30,
    icon: '🎲',
  },
  {
    id: 'prompt-engineering',
    label: 'Prompt Engineering',
    description: 'Write prompts that get great code',
    tags: ['prompt-engineering'],
    count: 6,
    icon: '💬',
  },
  {
    id: 'reading-code',
    label: 'Reading AI Code',
    description: 'Spot bugs, understand output',
    tags: ['reading-code'],
    count: 6,
    icon: '🔍',
  },
  {
    id: 'tooling',
    label: 'Dev Tooling',
    description: 'Git, npm, terminals, deployment',
    tags: ['tooling'],
    count: 6,
    icon: '🛠',
  },
  {
    id: 'web',
    label: 'Web Fundamentals',
    description: 'React, Next.js, Tailwind, APIs',
    tags: ['react', 'nextjs', 'tailwind', 'deployment'],
    count: 4,
    icon: '🌐',
  },
  {
    id: 'debugging',
    label: 'Debugging with AI',
    description: 'Fix errors, read logs, ship faster',
    tags: ['debugging'],
    count: 4,
    icon: '🐛',
  },
];

const STEP_COLORS = [
  { bg: 'bg-violet-500/20', text: 'text-violet-300', ring: 'ring-violet-500/30' },
  { bg: 'bg-cyan-500/20', text: 'text-cyan-300', ring: 'ring-cyan-500/30' },
  { bg: 'bg-emerald-500/20', text: 'text-emerald-300', ring: 'ring-emerald-500/30' },
];

export default function QuizLauncher() {
  const [selectedTopic, setSelectedTopic] = useState('all');

  const selected = TOPICS.find((t) => t.id === selectedTopic)!;
  const tagParam = selected.tags.length > 0 ? `&tags=${selected.tags.join(',')}` : '';

  return (
    <div className="min-h-screen bg-[#1a0a3e] flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Doodle background */}
      <DoodleBg src="/textures/vibecode-dark-2.png" opacity={0.3} tile />

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
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-violet-500/25"
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
            <path d="M8 6h20c1.1 0 2 .9 2 2v20c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z" />
            <path d="M12 14l4 4-4 4" />
            <line x1="20" y1="22" x2="26" y2="22" />
          </svg>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-2">AI Growth</h1>
        <p className="text-white/50 mb-8 leading-relaxed">
          Learn to build with AI. Answer honestly — your confidence matters as much as your answer.
        </p>

        {/* Topic cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-2 mb-8 text-left"
        >
          {TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`w-full p-3.5 rounded-xl border-2 transition-all duration-150 ${
                selectedTopic === topic.id
                  ? 'border-indigo-400 bg-[#2a1a5e] shadow-lg shadow-black/20'
                  : 'border-[#3d2b7a] bg-[#2a1a5e] hover:border-indigo-400/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{topic.icon}</span>
                  <div>
                    <div className="font-semibold text-white text-sm">
                      {topic.label}
                    </div>
                    <div className="text-xs text-white/50">{topic.description}</div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-indigo-300 px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30">
                  {topic.count} Qs
                </div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href={`/quiz/play?topic=${selectedTopic}${tagParam}`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                w-full py-4 rounded-2xl
                bg-gradient-to-r from-violet-500 to-cyan-600 text-white font-semibold text-lg
                hover:from-violet-600 hover:to-cyan-700
                shadow-lg shadow-violet-500/25
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
          className="mt-10 pt-8 border-t border-white/10"
        >
          <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-5">
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
                <div
                  className={`w-11 h-11 mx-auto mb-2.5 rounded-xl ${STEP_COLORS[i].bg} ring-2 ${STEP_COLORS[i].ring} flex items-center justify-center text-lg font-bold ${STEP_COLORS[i].text}`}
                >
                  {item.step}
                </div>
                <p className="text-xs text-white/40 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
