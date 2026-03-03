'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo } from 'react';
import QuizEngine from '@/components/quiz/QuizEngine';
import {
  vibecodingQuestions,
  mathQuestions,
} from '@/components/quiz/sample-questions';
import { ThemeMode } from '@/components/quiz/theme';
import { QuizItem } from '@/components/quiz/types';

function QuizPlayInner() {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get('theme');
  const topicParam = searchParams.get('topic') || 'all';
  const tagsParam = searchParams.get('tags');
  const themeMode: ThemeMode = themeParam === 'light' ? 'light' : 'dark';

  const items: QuizItem[] = useMemo(() => {
    if (topicParam === 'math') return mathQuestions;

    if (tagsParam) {
      const tags = tagsParam.split(',');
      const filtered = vibecodingQuestions.filter((q) =>
        tags.some((tag) => q.tags.includes(tag))
      );
      return filtered.length > 0 ? filtered : vibecodingQuestions;
    }

    return vibecodingQuestions;
  }, [topicParam, tagsParam]);

  return <QuizEngine items={items} sessionSize={7} themeMode={themeMode} />;
}

export default function QuizPlayPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a0a3e]" />}>
      <QuizPlayInner />
    </Suspense>
  );
}
