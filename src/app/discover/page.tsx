'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import DoodleBg from '@/components/quiz/DoodleBg';
import DesireEngine from '@/components/DesireEngine';

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-[#f0f0f0] relative overflow-hidden">
      <DoodleBg src="/textures/vibecode-light-1.png" opacity={0.18} />

      <div className="mx-auto max-w-2xl px-6 py-12 relative z-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-stone-400 hover:text-stone-600 transition-colors no-underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </Link>
        </motion.div>

        <DesireEngine />
      </div>
    </div>
  );
}
