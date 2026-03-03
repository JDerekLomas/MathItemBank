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
  color: string;
}

const TOPICS: TopicCard[] = [
  {
    id: 'all',
    label: 'Mixed Practice',
    description: 'All vibe coding topics',
    tags: [],
    count: 30,
    color: 'violet',
  },
  {
    id: 'prompt-engineering',
    label: 'Prompt Engineering',
    description: 'Write prompts that get great code',
    tags: ['prompt-engineering'],
    count: 6,
    color: 'amber',
  },
  {
    id: 'reading-code',
    label: 'Reading AI Code',
    description: 'Spot bugs, understand output',
    tags: ['reading-code'],
    count: 6,
    color: 'blue',
  },
  {
    id: 'tooling',
    label: 'Dev Tooling',
    description: 'Git, npm, terminals, deployment',
    tags: ['tooling'],
    count: 6,
    color: 'emerald',
  },
  {
    id: 'web',
    label: 'Web Fundamentals',
    description: 'React, Next.js, Tailwind, APIs',
    tags: ['react', 'nextjs', 'tailwind', 'deployment'],
    count: 4,
    color: 'red',
  },
  {
    id: 'debugging',
    label: 'Debugging with AI',
    description: 'Fix errors, read logs, ship faster',
    tags: ['debugging'],
    count: 4,
    color: 'indigo',
  },
];

const TOPIC_COLORS: Record<string, { iconBg: string; selectedBorder: string; selectedShadow: string }> = {
  violet: { iconBg: 'bg-violet-500', selectedBorder: 'border-violet-400', selectedShadow: 'shadow-violet-200/60' },
  amber: { iconBg: 'bg-amber-500', selectedBorder: 'border-amber-400', selectedShadow: 'shadow-amber-200/60' },
  blue: { iconBg: 'bg-blue-500', selectedBorder: 'border-blue-400', selectedShadow: 'shadow-blue-200/60' },
  emerald: { iconBg: 'bg-emerald-500', selectedBorder: 'border-emerald-400', selectedShadow: 'shadow-emerald-200/60' },
  red: { iconBg: 'bg-red-500', selectedBorder: 'border-red-400', selectedShadow: 'shadow-red-200/60' },
  indigo: { iconBg: 'bg-indigo-500', selectedBorder: 'border-indigo-400', selectedShadow: 'shadow-indigo-200/60' },
};

function TopicIcon({ topic }: { topic: string }) {
  const icons: Record<string, JSX.Element> = {
    all: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
    'prompt-engineering': (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    'reading-code': (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    tooling: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    web: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    debugging: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  };
  return icons[topic] || icons.all;
}

export default function QuizLauncher() {
  const [selectedTopic, setSelectedTopic] = useState('all');

  const selected = TOPICS.find((t) => t.id === selectedTopic)!;
  const tagParam = selected.tags.length > 0 ? `&tags=${selected.tags.join(',')}` : '';

  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      <DoodleBg src="/textures/vibecode-light-1.png" opacity={0.18} />

      <div className="mx-auto max-w-2xl px-6 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 px-8 py-6"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900">
            AI Growth
          </h1>
          <p className="mt-2 text-lg font-medium text-stone-500">
            Learn to build with AI. Your confidence matters as much as your answer.
          </p>
        </motion.div>

        {/* Topic cards */}
        <div className="space-y-3 mb-8">
          {TOPICS.map((topic, i) => {
            const isSelected = selectedTopic === topic.id;
            const colors = TOPIC_COLORS[topic.color];

            return (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTopic(topic.id)}
                className={`
                  w-full rounded-2xl border-2 p-5 flex items-center gap-4
                  transition-shadow duration-200 text-left cursor-pointer
                  ${isSelected
                    ? `bg-white ${colors.selectedBorder} shadow-lg ${colors.selectedShadow}`
                    : 'bg-white border-stone-200 shadow-sm hover:shadow-md hover:border-stone-300'
                  }
                `}
              >
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white ${colors.iconBg}`}>
                  <TopicIcon topic={topic.id} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-base font-extrabold leading-tight text-stone-900">
                    {topic.label}
                  </p>
                  <p className="text-sm font-medium mt-0.5 text-stone-500">
                    {topic.description}
                  </p>
                </div>

                <div className="flex-shrink-0 text-xs font-bold text-stone-400 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200">
                  {topic.count}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Start button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href={`/quiz/play?topic=${selectedTopic}${tagParam}`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                w-full py-4 rounded-2xl
                bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-extrabold text-lg
                shadow-xl shadow-indigo-500/25
                hover:from-indigo-600 hover:to-violet-600
                transition-all duration-150
                border-2 border-white/20
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
          transition={{ delay: 0.6 }}
          className="mt-10 bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 p-6"
        >
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-5 text-center">
            How it works
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Pick an answer', color: 'bg-violet-500' },
              { label: 'Rate your confidence', color: 'bg-indigo-500' },
              { label: 'Learn from feedback', color: 'bg-emerald-500' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <div
                  className={`w-11 h-11 mx-auto mb-2.5 rounded-xl ${item.color} flex items-center justify-center text-lg font-extrabold text-white`}
                >
                  {i + 1}
                </div>
                <p className="text-xs text-stone-500 font-semibold">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
