'use client';

import { useConversation } from '@elevenlabs/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useCallback, useRef } from 'react';
import DoodleBg from '@/components/quiz/DoodleBg';

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || '';

export default function VoiceAgentPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState('');
  const [statusLog, setStatusLog] = useState<string[]>([]);
  const startedRef = useRef(false);

  const conversation = useConversation({
    onConnect: () => {
      setStatusLog(prev => [...prev, 'Connected']);
    },
    onDisconnect: () => {
      setStatusLog(prev => [...prev, 'Disconnected']);
      setHasStarted(false);
      startedRef.current = false;
    },
    onError: (err: string | Error) => {
      const msg = typeof err === 'string' ? err : err.message || 'Connection error';
      setError(msg);
      setStatusLog(prev => [...prev, `Error: ${msg}`]);
    },
  });

  const handleStart = useCallback(async () => {
    if (!AGENT_ID) {
      setError('Voice agent not configured yet. Set NEXT_PUBLIC_ELEVENLABS_AGENT_ID.');
      return;
    }
    if (startedRef.current) return;

    try {
      setError('');
      setStatusLog(prev => [...prev, 'Requesting mic...']);
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setStatusLog(prev => [...prev, 'Mic granted, connecting...']);
      startedRef.current = true;
      await conversation.startSession({ agentId: AGENT_ID, connectionType: 'webrtc' });
      setHasStarted(true);
      setStatusLog(prev => [...prev, 'Session started']);
    } catch (err) {
      startedRef.current = false;
      if (err instanceof Error && err.name === 'NotAllowedError') {
        setError('Microphone access is required for voice conversations.');
      } else {
        setError(err instanceof Error ? err.message : 'Failed to start');
      }
      setStatusLog(prev => [...prev, `Start failed: ${err instanceof Error ? err.message : err}`]);
    }
  }, [conversation]);

  const handleEnd = useCallback(async () => {
    try {
      await conversation.endSession();
      setHasStarted(false);
      startedRef.current = false;
    } catch {
      // Ignore end errors
    }
  }, [conversation]);

  const isConnected = conversation.status === 'connected';
  const isConnecting = conversation.status === 'connecting';

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

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 overflow-hidden"
        >
          <div className="px-8 py-10 text-center">
            {/* Animated orb */}
            <div className="flex justify-center mb-6">
              <motion.div
                animate={
                  isConnected
                    ? {
                        scale: conversation.isSpeaking ? [1, 1.15, 1] : [1, 1.05, 1],
                        opacity: conversation.isSpeaking ? [1, 0.8, 1] : 1,
                      }
                    : {}
                }
                transition={
                  isConnected
                    ? {
                        duration: conversation.isSpeaking ? 0.6 : 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    : {}
                }
                className={`
                  h-20 w-20 rounded-full flex items-center justify-center
                  ${isConnected
                    ? conversation.isSpeaking
                      ? 'bg-gradient-to-br from-violet-500 to-indigo-600 shadow-xl shadow-violet-500/40'
                      : 'bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30'
                    : 'bg-gradient-to-br from-stone-300 to-stone-400'
                  }
                  transition-colors duration-500
                `}
              >
                {isConnecting ? (
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 rounded-full bg-white animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                ) : (
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    {isConnected ? (
                      <>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                      </>
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    )}
                  </svg>
                )}
              </motion.div>
            </div>

            <h2 className="text-2xl font-extrabold text-stone-900 mb-2">
              {isConnected ? (conversation.isSpeaking ? 'Listening...' : 'Your turn') : 'Voice Discovery'}
            </h2>

            <p className="text-base font-semibold text-stone-500 mb-6 max-w-sm mx-auto">
              {isConnected
                ? conversation.isSpeaking
                  ? 'The AI is thinking about your answer.'
                  : 'Speak naturally — the AI is listening.'
                : 'Talk through what you want to build. Same sharp questions, but with your voice.'
              }
            </p>

            {error && (
              <div className="mb-6 rounded-xl bg-red-50 border-2 border-red-200 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {!hasStarted ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStart}
                disabled={isConnecting}
                className="px-8 py-3 text-base font-extrabold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-600 hover:to-violet-600 transition-all shadow-lg shadow-indigo-500/25 border-2 border-white/20 cursor-pointer disabled:opacity-50"
              >
                {isConnecting ? 'Connecting...' : 'Start Conversation'}
              </motion.button>
            ) : (
              <div className="flex justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleEnd}
                  className="px-6 py-3 text-sm font-extrabold rounded-xl border-2 border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50 transition-all cursor-pointer"
                >
                  End Conversation
                </motion.button>
              </div>
            )}

            {/* Status indicator */}
            {isConnected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 flex items-center justify-center gap-2"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-xs font-semibold text-stone-400">Connected</span>
              </motion.div>
            )}
          </div>

          {/* Debug log */}
          {statusLog.length > 0 && (
            <div className="px-8 pb-4">
              <details className="text-left">
                <summary className="text-xs font-semibold text-stone-300 cursor-pointer">Debug log</summary>
                <div className="mt-2 text-xs font-mono text-stone-400 space-y-0.5">
                  {statusLog.map((log, i) => (
                    <div key={i}>{log}</div>
                  ))}
                  <div>status: {conversation.status}</div>
                  <div>isSpeaking: {String(conversation.isSpeaking)}</div>
                </div>
              </details>
            </div>
          )}

          {/* Text alternative link */}
          <div className="border-t-2 border-stone-100 px-8 py-4 text-center">
            <Link
              href="/discover"
              className="text-sm font-semibold text-stone-400 hover:text-stone-600 transition-colors no-underline"
            >
              Prefer typing? Use the text version
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
