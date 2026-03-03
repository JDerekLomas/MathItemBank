'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import AnswerOption from './AnswerOption';
import ConfidenceButtons from './ConfidenceButtons';
import FeedbackPanel from './FeedbackPanel';
import ProgressBar from './ProgressBar';
import XPFloat from './XPFloat';
import SessionSummary from './SessionSummary';
import DoodleBg from './DoodleBg';
import { getThemeByMode, ThemeMode } from './theme';
import {
  QuizItem,
  QuizQuestion,
  Confidence,
  getFeedbackType,
  getXPForFeedback,
} from './types';
import { buildQuizOptions, shuffleArray } from './sample-questions';

interface QuizEngineProps {
  items: QuizItem[];
  sessionSize?: number;
  themeMode?: ThemeMode;
}

type EngineState = 'playing' | 'summary';

export default function QuizEngine({
  items,
  sessionSize = 7,
  themeMode = 'dark',
}: QuizEngineProps) {
  const [engineState, setEngineState] = useState<EngineState>('playing');
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    initQuestions(items, sessionSize)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [xp, setXP] = useState(0);
  const [showXPFloat, setShowXPFloat] = useState(false);
  const [xpFloatAmount, setXPFloatAmount] = useState(0);
  const [direction, setDirection] = useState(1);
  const questionStartTime = useRef(Date.now());

  const theme = getThemeByMode(themeMode);
  const current = questions[currentIndex];
  const hasSelected = current?.selectedIndex !== null;
  const showConfidence = hasSelected && current?.confidence === null;
  const showFeedback = current?.phase === 'feedback';
  const feedbackType =
    current?.confidence && current?.isCorrect !== null
      ? getFeedbackType(current.confidence, current.isCorrect)
      : null;

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (current.phase !== 'answering') return;
      setQuestions((prev) => {
        const updated = [...prev];
        updated[currentIndex] = {
          ...updated[currentIndex],
          selectedIndex: optionIndex,
          phase: 'selected' as const,
        };
        return updated;
      });
    },
    [current?.phase, currentIndex]
  );

  const handleConfidence = useCallback(
    (confidence: Confidence) => {
      const isCorrect = current.selectedIndex === current.correctIndex;
      const ft = getFeedbackType(confidence, isCorrect);
      const earnedXP = getXPForFeedback(ft);
      const timeSpent = Date.now() - questionStartTime.current;

      setXPFloatAmount(earnedXP);
      setShowXPFloat(true);
      setTimeout(() => setShowXPFloat(false), 900);
      setXP((prev) => prev + earnedXP);

      if (isCorrect && confidence === 'know') {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#22C55E', '#4ADE80', '#86EFAC'],
          ticks: 80,
          gravity: 1.2,
          scalar: 0.8,
        });
      }

      setQuestions((prev) => {
        const updated = [...prev];
        updated[currentIndex] = {
          ...updated[currentIndex],
          confidence,
          isCorrect,
          timeSpentMs: timeSpent,
          phase: 'feedback' as const,
        };
        return updated;
      });
    },
    [current, currentIndex]
  );

  const handleContinue = useCallback(() => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[currentIndex] = {
        ...updated[currentIndex],
        phase: 'complete' as const,
      };
      return updated;
    });

    if (currentIndex < questions.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      questionStartTime.current = Date.now();
    } else {
      setEngineState('summary');
    }
  }, [currentIndex, questions.length]);

  const handlePlayAgain = () => {
    const newQuestions = initQuestions(items, sessionSize);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setXP(0);
    setEngineState('playing');
    questionStartTime.current = Date.now();
  };

  const handleExit = () => {
    window.history.back();
  };

  if (engineState === 'summary') {
    return (
      <SessionSummary
        questions={questions}
        totalXP={xp}
        onPlayAgain={handlePlayAgain}
        onExit={handleExit}
        theme={theme}
      />
    );
  }

  if (!current) return null;

  const selectedDistractorIndex =
    current.selectedIndex !== null && current.selectedIndex !== current.correctIndex
      ? current.selectedIndex
      : null;
  const misconception =
    selectedDistractorIndex !== null &&
    current.item.misconceptions?.length
      ? current.item.misconceptions[0]
      : undefined;

  return (
    <div className={`min-h-screen ${theme.pageBg} flex flex-col relative transition-colors duration-700`}>
      {/* AI-generated doodle background */}
      <DoodleBg src={theme.doodleBg} opacity={theme.doodleOpacity} tile={theme.doodleTile} />

      {/* Header */}
      <div className="px-6 pt-6 pb-4 relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleExit}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${theme.closeBtnText} ${theme.closeBtnHover} transition-colors`}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>
            <div className="flex-1">
              <ProgressBar
                current={currentIndex + (showFeedback || current.phase === 'complete' ? 1 : 0)}
                total={questions.length}
                xp={xp}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex flex-col px-6 pb-8 relative z-10">
        <div className="max-w-lg mx-auto w-full flex-1 flex flex-col">
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
              className="flex-1 flex flex-col"
            >
              {/* Question number badge */}
              <div className="mb-3">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                  Question {currentIndex + 1} of {questions.length}
                </span>
              </div>

              {/* Question stem */}
              <h2 className={`text-xl font-semibold ${theme.questionText} leading-relaxed mb-8`}>
                {current.item.question}
              </h2>

              {/* Answer options */}
              <div className="space-y-3 relative">
                <XPFloat amount={xpFloatAmount} visible={showXPFloat} theme={theme} />
                {current.options.map((option, i) => (
                  <AnswerOption
                    key={i}
                    text={option}
                    index={i}
                    isSelected={current.selectedIndex === i}
                    isCorrect={current.isCorrect ?? false}
                    feedbackType={feedbackType}
                    showFeedback={showFeedback}
                    isCorrectAnswer={i === current.correctIndex}
                    onSelect={handleSelect}
                    disabled={current.phase !== 'answering' && current.phase !== 'selected'}
                    theme={theme}
                  />
                ))}
              </div>

              {/* Confidence buttons */}
              <ConfidenceButtons
                visible={showConfidence}
                onSelect={handleConfidence}
                theme={theme}
              />

              {/* Feedback panel */}
              <FeedbackPanel
                visible={showFeedback}
                feedbackType={feedbackType}
                explanation={current.item.explanation}
                misconception={misconception}
                onContinue={handleContinue}
                theme={theme}
              />

              {/* Auto-continue for confident-correct */}
              {feedbackType === 'confident-correct' && showFeedback && (
                <AutoContinue onContinue={handleContinue} delay={1500} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function AutoContinue({
  onContinue,
  delay,
}: {
  onContinue: () => void;
  delay: number;
}) {
  const hasRun = useRef(false);
  if (!hasRun.current) {
    hasRun.current = true;
    setTimeout(onContinue, delay);
  }
  return null;
}

function initQuestions(
  items: QuizItem[],
  sessionSize: number
): QuizQuestion[] {
  const selected = shuffleArray(items).slice(0, sessionSize);
  return selected.map((item) => {
    const { options, correctIndex } = buildQuizOptions(item);
    return {
      item,
      options,
      correctIndex,
      selectedIndex: null,
      confidence: null,
      isCorrect: null,
      timeStartedMs: Date.now(),
      timeSpentMs: 0,
      phase: 'answering' as const,
    };
  });
}
