import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { what_i_tried, what_went_wrong, how_i_fixed, what_id_do_differently, module_id, tags, submitter_name, is_anonymous } = body;

  if (!what_i_tried || !what_went_wrong || !how_i_fixed) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('failure_stories')
    .insert({
      what_i_tried,
      what_went_wrong,
      how_i_fixed,
      what_id_do_differently: what_id_do_differently || null,
      module_id: module_id || null,
      tags: tags || [],
      submitter_name: is_anonymous ? null : (submitter_name || null),
      is_anonymous: is_anonymous !== false,
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
    .from('failure_stories')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
