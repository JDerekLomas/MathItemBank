'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DoodleBg from '@/components/quiz/DoodleBg';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface PlacementQuestion {
  question: string;
  options: string[];
}

const QUESTIONS: PlacementQuestion[] = [
  {
    question:
      'Have you used an AI coding tool (Claude, ChatGPT, Cursor) to generate code?',
    options: [
      'Never heard of it',
      "Heard of it but haven't tried",
      'Yes, a few times',
      'Yes, regularly',
    ],
  },
  {
    question: 'Can you open a terminal and run a command like `npm install`?',
    options: [
      "What's a terminal?",
      "I've seen one but not comfortable",
      'Yes, I use it sometimes',
      'Yes, daily',
    ],
  },
  {
    question: 'Have you ever deployed a website to the internet?',
    options: [
      'No',
      'Yes, with help from AI',
      'Yes, I know my way around Vercel/Netlify',
      'Yes, including custom domains and CI/CD',
    ],
  },
  {
    question: 'When AI-generated code has a bug, what do you usually do?',
    options: [
      "I don't know what a bug is",
      'Ask the AI to fix it',
      'Read the error message and describe it to AI',
      'Debug it myself, sometimes with AI help',
    ],
  },
  {
    question: 'How many projects have you built with AI assistance?',
    options: ['0', '1-2', '3-5', '6+'],
  },
];

interface Recommendation {
  label: string;
  description: string;
  href: string;
  color: string;
}

const RECOMMENDATIONS: Recommendation[] = [
  {
    label: 'The AI Landscape',
    description:
      'Start with the big picture — understand what AI tools exist and what they can do for you.',
    href: 'https://learnvibecoding.vercel.app/ai-landscape',
    color: 'from-violet-500 to-purple-600',
  },
  {
    label: 'Your First Build',
    description:
      'You have some awareness — now learn to go from a conversation with AI to a working project.',
    href: 'https://learnvibecoding.vercel.app/first-build',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    label: 'For Developers',
    description:
      'You know the basics. Level up your workflow with debugging, deployment, and real-world patterns.',
    href: 'https://learnvibecoding.vercel.app/for-developers',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    label: 'Level Up',
    description:
      "You're experienced. Push further with advanced patterns, CI/CD, and production-grade techniques.",
    href: 'https://learnvibecoding.vercel.app/level-up',
    color: 'from-amber-500 to-orange-600',
  },
];

function getRecommendation(score: number): Recommendation {
  if (score <= 3) return RECOMMENDATIONS[0];
  if (score <= 7) return RECOMMENDATIONS[1];
  if (score <= 11) return RECOMMENDATIONS[2];
  return RECOMMENDATIONS[3];
}

// ---------------------------------------------------------------------------
// Answer option colors (matching the light theme)
// ---------------------------------------------------------------------------

const OPTION_COLORS = [
  { bg: 'bg-indigo-500', text: 'text-white' },
  { bg: 'bg-rose-500', text: 'text-white' },
  { bg: 'bg-teal-500', text: 'text-white' },
  { bg: 'bg-amber-500', text: 'text-white' },
];

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function OnboardPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<'quiz' | 'result'>('quiz');
  const [direction, setDirection] = useState(1);

  const totalScore = answers.reduce((sum, a) => sum + a, 0);
  const recommendation = getRecommendation(totalScore);

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (selected !== null) return;
      setSelected(optionIndex);

      // Auto-advance after a brief pause
      setTimeout(() => {
        const newAnswers = [...answers, optionIndex];
        setAnswers(newAnswers);
        setSelected(null);

        if (currentIndex < QUESTIONS.length - 1) {
          setDirection(1);
          setCurrentIndex((prev) => prev + 1);
        } else {
          // Store result
          const finalScore = newAnswers.reduce((sum, a) => sum + a, 0);
          const rec = getRecommendation(finalScore);
          try {
            localStorage.setItem(
              'ai-growth-placement',
              JSON.stringify({
                score: finalScore,
                answers: newAnswers,
                recommendation: rec.label,
                timestamp: new Date().toISOString(),
              })
            );
          } catch {
            // localStorage may be unavailable
          }
          setPhase('result');
        }
      }, 400);
    },
    [selected, answers, currentIndex]
  );

  // -------------------------------------------------------------------------
  // Result screen
  // -------------------------------------------------------------------------

  if (phase === 'result') {
    return (
      <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
        <DoodleBg
          src="/textures/vibecode-light-1.png"
          opacity={0.18}
          tile
        />

        <div className="mx-auto max-w-lg px-6 py-12 relative z-10 flex flex-col items-center min-h-screen justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 p-8 text-center"
          >
            {/* Score badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 mb-6"
            >
              <span className="text-sm font-bold text-stone-500">
                Score: {totalScore}/15
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-extrabold text-stone-900 mb-2"
            >
              We recommend
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`inline-block text-3xl font-extrabold bg-gradient-to-r ${recommendation.color} bg-clip-text text-transparent mb-4`}
            >
              {recommendation.label}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base text-stone-500 font-medium mb-8 max-w-sm mx-auto"
            >
              {recommendation.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <a href={recommendation.href} className="block">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`
                    w-full py-4 rounded-2xl
                    bg-gradient-to-r ${recommendation.color} text-white font-extrabold text-lg
                    shadow-xl shadow-indigo-500/20
                    transition-all duration-150
                    border-2 border-white/20
                    cursor-pointer
                  `}
                >
                  Start here
                </motion.button>
              </a>
              <a
                href="https://learnvibecoding.vercel.app/skill-map"
                className="block"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    w-full py-4 rounded-2xl
                    bg-white text-stone-600 font-extrabold text-lg
                    border-2 border-stone-300
                    hover:bg-stone-50
                    transition-all duration-150
                    cursor-pointer
                  "
                >
                  Choose my own path
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Quiz screen
  // -------------------------------------------------------------------------

  const question = QUESTIONS[currentIndex];

  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden flex flex-col">
      <DoodleBg
        src="/textures/vibecode-light-1.png"
        opacity={0.18}
        tile
      />

      {/* Progress dots */}
      <div className="px-6 pt-6 pb-4 relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-3">
            {QUESTIONS.map((_, i) => (
              <motion.div
                key={i}
                className={`
                  w-3 h-3 rounded-full transition-colors duration-300
                  ${
                    i < currentIndex
                      ? 'bg-indigo-500'
                      : i === currentIndex
                        ? 'bg-indigo-500 ring-4 ring-indigo-500/20'
                        : 'bg-stone-300'
                  }
                `}
                initial={false}
                animate={{
                  scale: i === currentIndex ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col px-6 pb-8 relative z-10">
        <div className="max-w-lg mx-auto w-full flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="flex flex-col"
            >
              {/* Question number badge */}
              <div className="mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-100 text-indigo-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                  Question {currentIndex + 1} of {QUESTIONS.length}
                </span>
              </div>

              {/* Question text */}
              <h2 className="text-xl font-semibold text-stone-900 leading-relaxed mb-8">
                {question.question}
              </h2>

              {/* Answer options */}
              <div className="space-y-3">
                {question.options.map((option, i) => {
                  const isSelected = selected === i;
                  const color = OPTION_COLORS[i];

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}
                      className={`
                        relative w-full text-left rounded-xl border-2 p-4
                        transition-colors duration-150
                        ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500/30 shadow-md'
                            : 'border-stone-200 bg-white hover:bg-stone-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-stone-200/60'
                        }
                        ${selected !== null && !isSelected ? 'opacity-50' : ''}
                        ${selected !== null ? 'cursor-default' : 'cursor-pointer'}
                      `}
                      whileHover={
                        selected === null ? { y: -2 } : {}
                      }
                      whileTap={
                        selected === null ? { scale: 0.97 } : {}
                      }
                      animate={
                        isSelected
                          ? {
                              scale: [1, 1.03, 1],
                              transition: { duration: 0.3 },
                            }
                          : {}
                      }
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`
                            flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold
                            ${isSelected ? 'bg-indigo-500 text-white' : `${color.bg} ${color.text}`}
                          `}
                        >
                          {OPTION_LABELS[i]}
                        </span>
                        <span
                          className={`text-base leading-relaxed pt-0.5 ${
                            isSelected
                              ? 'text-indigo-900 font-medium'
                              : 'text-stone-800'
                          }`}
                        >
                          {option}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
