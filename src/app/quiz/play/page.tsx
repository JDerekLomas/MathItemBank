'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import QuizEngine from '@/components/quiz/QuizEngine';
import { sampleQuestions } from '@/components/quiz/sample-questions';
import { ThemeMode } from '@/components/quiz/theme';

function QuizPlayInner() {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get('theme');
  const themeMode: ThemeMode = themeParam === 'light' ? 'light' : 'dark';

  return <QuizEngine items={sampleQuestions} sessionSize={7} themeMode={themeMode} />;
}

export default function QuizPlayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a0a3e]" />}>
      <QuizPlayInner />
    </Suspense>
  );
}
