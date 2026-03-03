"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function BotAvatar() {
  return (
    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shrink-0">
      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    </div>
  );
}

export default function DesireEngine() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [started, setStarted] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  }, []);

  useEffect(scrollToBottom, [messages, streamingText, scrollToBottom]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  async function sendMessage(userMessage: string) {
    const trimmed = userMessage.trim();
    if (!trimmed || streaming) return;

    setError("");
    const newMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(newMessages);
    setInput("");
    setStreaming(true);
    setStreamingText("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let accumulated = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.error) throw new Error(parsed.error);
            if (parsed.text) {
              accumulated += parsed.text;
              setStreamingText(accumulated);
            }
          } catch {
            // Skip malformed chunks
          }
        }
      }

      if (accumulated) {
        setMessages((prev) => [...prev, { role: "assistant", content: accumulated }]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setStreaming(false);
      setStreamingText("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  async function handleStart() {
    setStarted(true);
    setStreaming(true);
    setStreamingText("");
    setError("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "[The user just clicked 'Start' to begin the discovery conversation. Send your opening message — something surprising and thought-provoking. Don't introduce yourself or explain the process. Just ask your first question.]" }],
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let accumulated = "";
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              accumulated += parsed.text;
              setStreamingText(accumulated);
            }
          } catch {
            // Skip
          }
        }
      }

      if (accumulated) {
        setMessages([
          { role: "user", content: "[The user just clicked 'Start' to begin the discovery conversation. Send your opening message — something surprising and thought-provoking. Don't introduce yourself or explain the process. Just ask your first question.]" },
          { role: "assistant", content: accumulated },
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start conversation");
    } finally {
      setStreaming(false);
      setStreamingText("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function handleCopy(text: string) {
    const lines = text.split("\n");
    const promptLines: string[] = [];
    let inPrompt = false;
    for (const line of lines) {
      if (line.startsWith("> ")) {
        inPrompt = true;
        promptLines.push(line.slice(2));
      } else if (inPrompt && line.trim() === "") {
        break;
      } else if (inPrompt) {
        promptLines.push(line);
      }
    }
    const toCopy = promptLines.length > 0 ? promptLines.join("\n").trim() : text;
    navigator.clipboard.writeText(toCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleStartOver() {
    setMessages([]);
    setInput("");
    setStreaming(false);
    setStreamingText("");
    setStarted(false);
    setError("");
    setCopied(false);
  }

  const visibleMessages = messages.filter(
    (m) => !(m.role === "user" && m.content.startsWith("[The user just clicked"))
  );

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
  const isComplete = lastAssistant?.content.includes("Starter prompt") || lastAssistant?.content.includes("starter prompt");

  // Landing state
  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 overflow-hidden"
      >
        <div className="px-8 py-10 text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 mb-5">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900 mb-2">
            Discover What to Build
          </h2>
          <p className="text-base font-semibold text-stone-500 mb-6 max-w-sm mx-auto">
            A short conversation to figure out what actually excites you. No menus, no quizzes — just honest questions and a starter prompt at the end.
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleStart}
            className="px-8 py-3 text-base font-extrabold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-600 hover:to-violet-600 transition-all shadow-lg shadow-indigo-500/25 border-2 border-white/20 cursor-pointer"
          >
            Let&apos;s go
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl border-2 border-stone-200 shadow-lg shadow-stone-200/60 overflow-hidden"
    >
      {/* Chat header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b-2 border-stone-100">
        <div className="flex items-center gap-3">
          <BotAvatar />
          <div>
            <p className="text-sm font-extrabold text-stone-900">Discover Your Project</p>
            <p className="text-xs font-semibold text-stone-400">AI-powered discovery interview</p>
          </div>
        </div>
        {messages.length > 2 && (
          <button
            onClick={handleStartOver}
            className="text-xs font-semibold text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
          >
            Start over
          </button>
        )}
      </div>

      {/* Chat messages */}
      <div className="px-5 py-5 space-y-4 max-h-[520px] overflow-y-auto">
        <AnimatePresence>
          {visibleMessages.map((msg, i) => {
            if (msg.role === "assistant") {
              const isFinal = isComplete && i === visibleMessages.length - 1;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-3 items-start"
                >
                  <BotAvatar />
                  <div className="max-w-[85%]">
                    <div className="rounded-2xl rounded-tl-lg bg-stone-100 px-4 py-3">
                      <div className="text-sm font-medium text-stone-700 leading-relaxed whitespace-pre-wrap">
                        {msg.content}
                      </div>
                    </div>
                    {isFinal && (
                      <div className="flex items-center gap-2 mt-2.5 pl-1">
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleCopy(msg.content)}
                          className="px-4 py-2 text-xs font-extrabold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-600 hover:to-violet-600 transition-colors cursor-pointer"
                        >
                          {copied ? "Copied!" : "Copy starter prompt"}
                        </motion.button>
                        <button
                          onClick={handleStartOver}
                          className="px-4 py-2 text-xs font-semibold rounded-xl border-2 border-stone-200 text-stone-500 hover:border-stone-300 transition-colors cursor-pointer"
                        >
                          Try again
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-end"
              >
                <div className="max-w-[80%] rounded-2xl rounded-tr-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3">
                  <p className="text-sm font-medium text-white whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Streaming text */}
        {streaming && streamingText && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 items-start"
          >
            <BotAvatar />
            <div className="max-w-[85%] rounded-2xl rounded-tl-lg bg-stone-100 px-4 py-3">
              <p className="text-sm font-medium text-stone-700 leading-relaxed whitespace-pre-wrap">
                {streamingText}
                <span className="inline-block w-1.5 h-4 bg-indigo-400 ml-0.5 animate-pulse rounded-sm" />
              </p>
            </div>
          </motion.div>
        )}

        {/* Typing indicator */}
        {streaming && !streamingText && (
          <div className="flex gap-3 items-start">
            <BotAvatar />
            <div className="rounded-2xl rounded-tl-lg bg-stone-100 px-4 py-3.5">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex gap-3 items-start">
            <BotAvatar />
            <div className="rounded-2xl rounded-tl-lg bg-red-50 border-2 border-red-200 px-4 py-3">
              <p className="text-sm font-medium text-red-600">{error}</p>
              <button
                onClick={handleStartOver}
                className="mt-1.5 text-xs font-semibold text-red-500 underline hover:no-underline cursor-pointer"
              >
                Start over
              </button>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input area */}
      {!isComplete && (
        <div className="border-t-2 border-stone-100 px-5 py-4">
          <div className="flex gap-2.5 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={streaming ? "Thinking..." : "Type your answer..."}
              disabled={streaming}
              rows={1}
              className="flex-1 rounded-xl border-2 border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-colors resize-none disabled:opacity-50"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => sendMessage(input)}
              disabled={streaming || !input.trim()}
              className="px-5 py-3 text-sm font-extrabold rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-600 hover:to-violet-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
            >
              Send
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
