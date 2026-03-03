import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { question, correct_answer, distractor_1, distractor_2, distractor_3, explanation, tags, difficulty, submitter_name } = body;

  if (!question || !correct_answer || !distractor_1 || !distractor_2 || !distractor_3 || !explanation) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('quiz_submissions')
    .insert({
      question,
      correct_answer,
      distractor_1,
      distractor_2,
      distractor_3,
      explanation,
      tags: tags || [],
      difficulty: difficulty || 'developing',
      submitter_name: submitter_name || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data.id });
}

export async function GET() {
  const { data, error } = await supabase
    .from('quiz_submissions')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
