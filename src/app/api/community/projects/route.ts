import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { title, description, url, screenshot_url, skill_level, module_id, tags, submitter_name } = body;

  if (!title || !description || !url) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('project_showcases')
    .insert({
      title,
      description,
      url,
      screenshot_url: screenshot_url || null,
      skill_level: skill_level || null,
      module_id: module_id || null,
      tags: tags || [],
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
    .from('project_showcases')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
