-- Community content pipeline tables

-- Quiz item submissions from learners
create table quiz_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  -- Content
  question text not null,
  correct_answer text not null,
  distractor_1 text not null,
  distractor_2 text not null,
  distractor_3 text not null,
  explanation text not null,

  -- Metadata
  tags text[] default '{}',
  difficulty text check (difficulty in ('beginning', 'developing', 'proficient', 'advanced')),

  -- Submitter (anonymous by default)
  submitter_name text,

  -- Moderation
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewer_notes text,
  reviewed_at timestamptz,

  -- Voting
  upvotes int default 0,
  flags int default 0
);

-- Project showcases
create table project_showcases (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  -- Content
  title text not null,
  description text not null,
  url text not null,
  screenshot_url text,

  -- Context
  skill_level text, -- which skill map node they were on
  module_id text,   -- which module prompted the build
  tags text[] default '{}',

  -- Submitter
  submitter_name text,

  -- Moderation
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewer_notes text,
  reviewed_at timestamptz,

  -- Engagement
  inspired_count int default 0
);

-- Failure stories
create table failure_stories (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  -- Content
  what_i_tried text not null,
  what_went_wrong text not null,
  how_i_fixed text not null,
  what_id_do_differently text,

  -- Context
  module_id text,
  tags text[] default '{}',

  -- Submitter (anonymous by default)
  submitter_name text,
  is_anonymous boolean default true,

  -- Moderation
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewer_notes text,
  reviewed_at timestamptz
);

-- Row level security
alter table quiz_submissions enable row level security;
alter table project_showcases enable row level security;
alter table failure_stories enable row level security;

-- Anyone can insert (submissions)
create policy "Anyone can submit quiz items" on quiz_submissions for insert with check (true);
create policy "Anyone can submit projects" on project_showcases for insert with check (true);
create policy "Anyone can submit stories" on failure_stories for insert with check (true);

-- Anyone can read approved content
create policy "Anyone can read approved quiz items" on quiz_submissions for select using (status = 'approved');
create policy "Anyone can read approved projects" on project_showcases for select using (status = 'approved');
create policy "Anyone can read approved stories" on failure_stories for select using (status = 'approved');

-- Admins can read/update all (using service role key server-side)
