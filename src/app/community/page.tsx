'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DoodleBg from '@/components/quiz/DoodleBg';

type Tab = 'gallery' | 'submit-quiz' | 'submit-project' | 'submit-story';

const TAGS = [
  'prompt-engineering', 'reading-code', 'tooling', 'debugging',
  'react', 'nextjs', 'testing', 'security', 'architecture', 'shipping-deploy',
];

function SubmitQuizForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    question: '', correct_answer: '', distractor_1: '', distractor_2: '', distractor_3: '',
    explanation: '', difficulty: 'developing', tags: [] as string[], submitter_name: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const toggleTag = (tag: string) => {
    setForm(f => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter(t => t !== tag) : [...f.tags, tag],
    }));
  };

  const submit = async () => {
    setSubmitting(true);
    setError('');
    const res = await fetch('/api/community/quiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      onSuccess();
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">Question</label>
        <textarea
          className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-indigo-400 focus:outline-none"
          rows={3}
          placeholder="What's a good question that would test a real vibe coding skill?"
          value={form.question}
          onChange={e => setForm(f => ({ ...f, question: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">Correct Answer</label>
        <textarea
          className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-emerald-400 focus:outline-none"
          rows={2}
          placeholder="The right answer"
          value={form.correct_answer}
          onChange={e => setForm(f => ({ ...f, correct_answer: e.target.value }))}
        />
      </div>
      {[1, 2, 3].map(i => (
        <div key={i}>
          <label className="block text-sm font-bold text-stone-700 mb-1">Wrong Answer {i}</label>
          <textarea
            className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-rose-300 focus:outline-none"
            rows={2}
            placeholder={`A plausible but wrong answer (common misconception)`}
            value={form[`distractor_${i}` as keyof typeof form] as string}
            onChange={e => setForm(f => ({ ...f, [`distractor_${i}`]: e.target.value }))}
          />
        </div>
      ))}
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">Explanation</label>
        <textarea
          className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-indigo-400 focus:outline-none"
          rows={3}
          placeholder="Why is the correct answer right? Why are the wrong ones wrong?"
          value={form.explanation}
          onChange={e => setForm(f => ({ ...f, explanation: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">Difficulty</label>
        <div className="flex gap-2">
          {['beginning', 'developing', 'proficient', 'advanced'].map(d => (
            <button
              key={d}
              onClick={() => setForm(f => ({ ...f, difficulty: d }))}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all cursor-pointer ${
                form.difficulty === d
                  ? 'bg-indigo-500 text-white border-indigo-500'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">Tags</label>
        <div className="flex flex-wrap gap-2">
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition-all cursor-pointer ${
                form.tags.includes(tag)
                  ? 'bg-violet-500 text-white border-violet-500'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">Your name (optional)</label>
        <input
          className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-indigo-400 focus:outline-none"
          placeholder="Leave blank to submit anonymously"
          value={form.submitter_name}
          onChange={e => setForm(f => ({ ...f, submitter_name: e.target.value }))}
        />
      </div>
      {error && <p className="text-sm font-bold text-rose-500">{error}</p>}
      <button
        onClick={submit}
        disabled={submitting || !form.question || !form.correct_answer || !form.distractor_1 || !form.distractor_2 || !form.distractor_3 || !form.explanation}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-extrabold text-base shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:from-indigo-600 hover:to-violet-600 transition-all"
      >
        {submitting ? 'Submitting...' : 'Submit Question'}
      </button>
    </div>
  );
}

function SubmitProjectForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    title: '', description: '', url: '', submitter_name: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    setSubmitting(true);
    setError('');
    const res = await fetch('/api/community/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      onSuccess();
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">Project Title</label>
        <input
          className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-indigo-400 focus:outline-none"
          placeholder="What did you build?"
          value={form.title}
          onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">Description</label>
        <textarea
          className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-indigo-400 focus:outline-none"
          rows={3}
          placeholder="What does it do? What did you learn building it?"
          value={form.description}
          onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">URL</label>
        <input
          className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-indigo-400 focus:outline-none"
          placeholder="https://your-project.vercel.app"
          value={form.url}
          onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">Your name (optional)</label>
        <input
          className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-indigo-400 focus:outline-none"
          placeholder="Leave blank to submit anonymously"
          value={form.submitter_name}
          onChange={e => setForm(f => ({ ...f, submitter_name: e.target.value }))}
        />
      </div>
      {error && <p className="text-sm font-bold text-rose-500">{error}</p>}
      <button
        onClick={submit}
        disabled={submitting || !form.title || !form.description || !form.url}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-base shadow-lg shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:from-emerald-600 hover:to-teal-600 transition-all"
      >
        {submitting ? 'Submitting...' : 'Share Project'}
      </button>
    </div>
  );
}

function SubmitStoryForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    what_i_tried: '', what_went_wrong: '', how_i_fixed: '', what_id_do_differently: '',
    submitter_name: '', is_anonymous: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    setSubmitting(true);
    setError('');
    const res = await fetch('/api/community/stories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      onSuccess();
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
    }
    setSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">What I tried to build</label>
        <textarea
          className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-indigo-400 focus:outline-none"
          rows={2}
          placeholder="What were you trying to make?"
          value={form.what_i_tried}
          onChange={e => setForm(f => ({ ...f, what_i_tried: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">What went wrong</label>
        <textarea
          className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-rose-300 focus:outline-none"
          rows={3}
          placeholder="What broke? What error did you hit? Where did you get stuck?"
          value={form.what_went_wrong}
          onChange={e => setForm(f => ({ ...f, what_went_wrong: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">How I fixed it (or didn't)</label>
        <textarea
          className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-emerald-400 focus:outline-none"
          rows={3}
          placeholder="What eventually worked? Or what did you learn from not solving it?"
          value={form.how_i_fixed}
          onChange={e => setForm(f => ({ ...f, how_i_fixed: e.target.value }))}
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-stone-700 mb-1">What I'd do differently (optional)</label>
        <textarea
          className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-indigo-400 focus:outline-none"
          rows={2}
          placeholder="Hindsight advice for yourself"
          value={form.what_id_do_differently}
          onChange={e => setForm(f => ({ ...f, what_id_do_differently: e.target.value }))}
        />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.is_anonymous}
          onChange={e => setForm(f => ({ ...f, is_anonymous: e.target.checked }))}
          className="rounded"
        />
        <span className="text-sm font-bold text-stone-600">Submit anonymously</span>
      </label>
      {!form.is_anonymous && (
        <div>
          <label className="block text-sm font-bold text-stone-700 mb-1">Your name</label>
          <input
            className="w-full rounded-xl border-2 border-stone-200 p-3 text-sm focus:border-indigo-400 focus:outline-none"
            value={form.submitter_name}
            onChange={e => setForm(f => ({ ...f, submitter_name: e.target.value }))}
          />
        </div>
      )}
      {error && <p className="text-sm font-bold text-rose-500">{error}</p>}
      <button
        onClick={submit}
        disabled={submitting || !form.what_i_tried || !form.what_went_wrong || !form.how_i_fixed}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-base shadow-lg shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:from-amber-600 hover:to-orange-600 transition-all"
      >
        {submitting ? 'Submitting...' : 'Share Story'}
      </button>
    </div>
  );
}

const TAB_CONFIG: { id: Tab; label: string; icon: JSX.Element; color: string }[] = [
  {
    id: 'gallery',
    label: 'Gallery',
    color: 'bg-violet-500',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'submit-quiz',
    label: 'Submit Question',
    color: 'bg-indigo-500',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    id: 'submit-project',
    label: 'Share Project',
    color: 'bg-emerald-500',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    id: 'submit-story',
    label: 'Share Failure',
    color: 'bg-amber-500',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
];

export default function CommunityPage() {
  const [tab, setTab] = useState<Tab>('gallery');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setTab('gallery');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      <DoodleBg src="/textures/vibecode-light-1.png" opacity={0.18} />

      <div className="mx-auto max-w-2xl px-6 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 px-8 py-6"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-stone-900">
            Community
          </h1>
          <p className="mt-2 text-lg font-medium text-stone-500">
            Share what you've built, learned, and broken.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {TAB_CONFIG.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 whitespace-nowrap transition-all cursor-pointer ${
                tab === t.id
                  ? `${t.color} text-white border-transparent shadow-lg`
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300'
              }`}
            >
              <span className={tab === t.id ? 'text-white' : 'text-stone-400'}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Success toast */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 text-center"
            >
              <p className="text-base font-extrabold text-emerald-700">Submitted! It'll appear after review.</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 p-6"
        >
          {tab === 'gallery' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-stone-100 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400">
                  <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                </svg>
              </div>
              <h3 className="text-lg font-extrabold text-stone-900 mb-2">Coming soon</h3>
              <p className="text-sm font-medium text-stone-500 max-w-sm mx-auto">
                Community submissions will appear here once reviewed. Be the first to contribute — submit a question, project, or failure story.
              </p>
            </div>
          )}
          {tab === 'submit-quiz' && <SubmitQuizForm onSuccess={handleSuccess} />}
          {tab === 'submit-project' && <SubmitProjectForm onSuccess={handleSuccess} />}
          {tab === 'submit-story' && <SubmitStoryForm onSuccess={handleSuccess} />}
        </motion.div>
      </div>
    </div>
  );
}
