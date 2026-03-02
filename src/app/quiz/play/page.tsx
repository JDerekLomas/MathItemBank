'use client';

import QuizEngine from '@/components/quiz/QuizEngine';
import { sampleQuestions } from '@/components/quiz/sample-questions';

export default function QuizPlayPage() {
  return <QuizEngine items={sampleQuestions} sessionSize={7} />;
}
