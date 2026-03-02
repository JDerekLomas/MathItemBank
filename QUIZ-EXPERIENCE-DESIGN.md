# MCQ Quiz Experience Design

## Research Foundation

### Why MCQs Work (The Science)

MCQs have a bad reputation because most implementations are bad. The format itself is one of the most research-validated learning tools in cognitive science.

**Key findings:**
- **Retrieval practice** produces d=0.50-0.70 effect sizes over re-reading (Rowland 2014 meta-analysis, Adesope et al. 2017)
- **Plausible distractors trigger elaborative retrieval** — learners must retrieve *why* each option is wrong, not just recognize the right answer. MCQs with good distractors outperform short-answer on transfer tests (Little & Bjork 2012)
- **Pretesting effect** — MCQs *before* instruction improve learning by 10-15%, even when answered incorrectly (Kornell, Hays & Bjork 2009)
- **Confidence-based assessment** surfaces the two most dangerous states: correct-but-guessing (fragile memory) and wrong-but-confident (active misconception) (Gardner-Medwin CBM framework)
- **Feedback eliminates lure intrusion** — without feedback, students can consolidate wrong answers. With explanatory feedback, this risk disappears (Butler & Roediger 2008)
- **FSRS v6** outperforms SM-2 for spaced repetition scheduling (open-spaced-repetition project, now Anki's default)

### Design References

**Tier 1 — Best-in-class UX:**
- **Duolingo** — one question/screen, green/red feedback, shake animation, bottom panel explanations, Rive mascot states
- **AMBOSS** — difficulty hammers, inline library links, distractor-specific explanations
- **Brilliant.org** — lesson IS the quiz, interactive corrections, knowledge graph progress

**Tier 2 — Patterns to borrow:**
- **UWorld** — exhaustive per-distractor explanations with diagrams
- **GoodHabitz** — quiz-as-activity (not standalone test), personalized reports
- **Typeform** — one-question-at-a-time, keyboard-first, conversational transitions
- **Brainscape** — 1-5 confidence scale feeding spaced repetition
- **Kahoot** — color+shape answer coding, social energy, post-question distributions

**Open-source foundations:**
- `ts-fsrs` — FSRS v6 spaced repetition (MIT, npm)
- `canvas-confetti` — celebration effects (ISC, 12k stars)
- `framer/motion` — React animation standard
- `sanidhyy/duolingo-clone` — hearts/XP/streaks reference (MIT)
- `mpalmer79/cyber-shield` — gamification system reference (Next.js)

---

## Core Design Principle

> The best MCQ system doesn't feel like taking a test. It feels like playing a game where you're getting smarter.

---

## The Confidence Mechanic

This is the centerpiece. Every question produces one of four emotional states:

### 1. Confident + Correct — "I knew it."
- **Feeling:** Satisfying, affirming
- **Response:** Quick green flash, chime, "+10 XP" float. Don't linger. Space this item further out.

### 2. Unsure + Correct — "Wait, really?"
- **Feeling:** Pleasant surprise, fragile knowledge
- **Response:** Softer green, sparkle effect. Explanation opens automatically. Re-test sooner.

### 3. Unsure + Wrong — "Yeah, I didn't know that."
- **Feeling:** Expected. Low shame (they flagged uncertainty first).
- **Response:** Warm, not punitive. Gentle transition to explanation. "Here's what's going on."

### 4. Confident + Wrong — "Oh shit."
- **Feeling:** Most powerful learning moment. Active misconception exposed.
- **Response:** Dramatic pause. Crack/shatter on selected answer. Correct answer expands. Distractor-specific explanation: "You may have been thinking of X. Here's how Y actually works..." Misconception-corrected badge. Item returns soon.

---

## Session Structure

Sessions are 5-7 minutes with a deliberate emotional arc:

```
  Engagement
     ^
     |        * Challenge Peak
     |       / \
     |      /   \     * Redemption
     |     /     \   / \
     |    /       \ /   \___* Reward
     |   / Warm-up \
     |  /
     | /
     +-------------------------> Time
     Q1  Q2  Q3  Q4  Q5  Q6  Q7
```

- **Q1-Q2:** Warm-up. Items you'll likely get right. Build momentum, activate prior knowledge.
- **Q3-Q5:** Challenge zone. ~60% success rate target. Real learning happens here.
- **Q6-Q7:** Resolution. One redemption item (something you missed before). End on a high.

---

## Interaction Flow

### Answering a Question

1. Question appears with 4 answer options (cards, not a list)
2. Tap an option to select it (option highlights, others dim slightly)
3. Two buttons appear: **"I think..."** (muted) and **"I know."** (bold)
4. Submit triggers feedback state

### Feedback States

**Correct (confident):**
- Selected card flashes green, bounces
- Checkmark appears, chime plays
- "+10 XP" floats up
- 0.8s pause, next question slides in
- ~1.5s total

**Correct (unsure):**
- Card turns soft green
- Sparkle/shimmer effect
- Explanation panel rises from bottom
- "Got it" to continue
- Learner-controlled timing

**Wrong (unsure):**
- Selected card fades to muted red
- Correct card highlights green with gentle pulse
- Explanation panel rises warmly
- No harsh buzzer — soft transition sound
- Learner-controlled timing

**Wrong (confident):**
- Half-second pause (beat of silence)
- Selected card: red with subtle crack effect
- Correct card EXPANDS, becomes dominant
- Larger explanation panel with distractor-specific text
- "Misconception corrected" tag appears
- Learner-controlled (encouraged to linger)

### Question Transitions

- Exit: current card slides left + fades
- Enter: new card comes from right
- Spring physics: stiffness 300, damping 30
- AnimatePresence with mode="wait"

---

## Visual Design

### Color System

| State | Color | Hex |
|---|---|---|
| Primary / brand | Deep indigo | #4F46E5 |
| Correct | Vibrant green | #22C55E |
| Wrong | Warm coral | #EF4444 |
| Unsure correct | Soft teal | #14B8A6 |
| Confident wrong | Deep red | #DC2626 |
| Background | Near-white warm | #FAFAF9 |
| Card surface | White | #FFFFFF |
| Text primary | Near-black | #1C1917 |

### Typography
- Question stem: 20px/28px, medium weight
- Answer options: 16px/24px, regular weight
- Feedback explanations: 14px/20px
- XP/stats: 12px/16px, semibold

### Card Design
- Answer options as cards, not radio buttons
- Rounded corners (12px)
- Subtle shadow on hover (elevation)
- Generous padding (16px)
- Clear tap target (min 48px height)

### Animation Timing
- Hover: 150ms ease-out
- Selection: 200ms spring
- Correct feedback: 300ms
- Wrong shake: 400ms (3 oscillations)
- Question transition: 350ms spring
- XP float: 800ms ease-out
- Confetti burst: 1200ms

---

## Growth System

### Not Streaks. Growth Maps.

Instead of anxiety-inducing streaks, show a **knowledge node graph**:
- Empty/grey: haven't encountered yet
- Partially filled: in progress
- Gold/bright: mastered (confident+correct, spaced successfully)
- Pulsing: due for review (about to decay)

### Redemption Arcs

When you get confident+wrong, the system creates a redemption quest. That concept returns in a future session. When you nail it, special animation: cracked node repairs, "misconception cleared."

### Calibration Score

How well your confidence matches your accuracy. A meta-game: can you know what you know?
- Under-confident <---> Well-calibrated <---> Over-confident

---

## What This System Does NOT Do

- **No lives/hearts.** Hearts punish exploration.
- **No timed pressure on learning questions.** Timers are for optional game modes only.
- **No leaderboards in default mode.** Social comparison creates performance orientation.
- **No "study first, quiz later."** The quiz IS the learning. Pretesting research says this works better.

---

## Technical Architecture

### Stack
- Next.js 14 (existing MathItemBank)
- TypeScript strict
- Tailwind CSS + clsx
- Framer Motion (animations)
- canvas-confetti (celebrations)
- ts-fsrs (spaced repetition)
- Local state + localStorage (MVP, no auth)

### New Routes
- `/quiz` — quiz session launcher
- `/quiz/play` — active quiz session
- `/quiz/summary` — post-session summary

### New Components
```
src/components/quiz/
  QuizEngine.tsx        — session orchestrator (question selection, state machine)
  QuestionCard.tsx      — renders a single question with answer options
  AnswerOption.tsx      — individual answer card with hover/select/correct/wrong states
  ConfidenceButtons.tsx — "I think..." / "I know." after selection
  FeedbackPanel.tsx     — bottom panel with explanation, distractor-specific text
  ProgressBar.tsx       — session progress (not a simple linear bar)
  XPFloat.tsx           — floating "+10 XP" animation
  SessionSummary.tsx    — post-session growth story
  QuizLauncher.tsx      — topic/difficulty selection to start a session
```

### Data Flow
```
Item Bank (existing)
  → FSRS scheduler picks next items
    → QuizEngine sequences them (warm-up → challenge → resolution)
      → QuestionCard renders
        → User answers + confidence
          → FeedbackPanel shows explanation
            → FSRS updates item schedule
              → SessionSummary tells the story
```

### State Shape (per session)
```typescript
interface QuizSession {
  id: string;
  startedAt: Date;
  questions: QuizQuestion[];
  currentIndex: number;
  xp: number;
  phase: 'warmup' | 'challenge' | 'resolution';
}

interface QuizQuestion {
  item: MathItem;
  selectedAnswer: string | null;
  confidence: 'think' | 'know' | null;
  isCorrect: boolean | null;
  timeSpentMs: number;
  phase: 'answering' | 'feedback' | 'complete';
}

interface LearnerProfile {
  // Persisted to localStorage
  itemHistory: Record<string, ItemHistory>;
  totalXP: number;
  sessionsCompleted: number;
  calibrationScore: number; // -1 to 1
  misconceptionsCleared: string[];
}

interface ItemHistory {
  fsrsCard: Card; // from ts-fsrs
  lastConfidence: 'think' | 'know';
  lastCorrect: boolean;
  timesSeen: number;
  timesCorrect: number;
  timesConfidentWrong: number; // tracks misconceptions
}
```

---

## MVP Scope (v0.1)

Build the core quiz loop first. No growth map, no FSRS scheduling, no adaptive difficulty.

1. `/quiz` launcher — pick a topic, start a 7-question session
2. QuestionCard with 4 answer options (animated cards)
3. Confidence selection ("I think" / "I know")
4. Four feedback states with distinct animations
5. Explanation panel with distractor-specific text
6. XP counter with floating number animation
7. Confetti on session completion
8. SessionSummary with per-question review
9. Mobile-responsive (Typeform-style one-question layout)

### v0.2 — Spaced Repetition
- ts-fsrs integration
- localStorage persistence
- Session sequencing (warm-up → challenge → resolution)
- Redemption arcs

### v0.3 — Growth Visualization
- Knowledge node map
- Calibration score
- Misconception tracking
- Session history

---

## Key Research Papers

| Paper | Finding |
|---|---|
| Roediger & Karpicke (2006), *Psych Science* | Testing > re-study by ~21% at 1 week |
| Karpicke & Roediger (2008), *Science* | Repeated retrieval, not study, drives retention |
| Butler & Roediger (2008), *Memory & Cognition* | Feedback eliminates lure intrusion |
| Little, Bjork et al. (2012) | MCQs + good distractors > short-answer on transfer |
| Little & Bjork (2014) | "Optimizing MCQs as tools for learning" |
| Kornell, Hays & Bjork (2009), *JEP* | Pretesting improves learning even when wrong |
| Rowland (2014) meta-analysis | g=0.50 for retrieval practice |
| Adesope et al. (2017) meta-analysis | g=0.61 for practice testing |
| Gardner-Medwin (CBM) | Confidence marking improves metacognition |
