# AI Growth — Pedagogy & Experience Design

## What This Is

AI Growth is a confidence-based quiz system that works across any knowledge domain. The current focus is vibe coding (building software with AI), but the engine is domain-agnostic. The core insight: **what learners think they know matters as much as what they actually know.**

The quiz is not a test. It is the learning activity itself.

---

## Research Foundation

### Why This Format Works

Multiple-choice questions have a bad reputation because most implementations are bad. The format itself is one of the most research-validated learning tools in cognitive science.

**Retrieval practice.** Testing produces stronger learning than re-studying. Roediger & Karpicke (2006) showed testing beats re-study by ~21% at one week. Rowland (2014) meta-analysis found d=0.50 across studies. Adesope et al. (2017) meta-analysis found g=0.61 for practice testing. The mechanism: retrieving information from memory strengthens the memory trace in ways that passive review does not.

**Pretesting effect.** Answering questions *before* instruction improves learning by 10-15%, even when answered incorrectly (Kornell, Hays & Bjork 2009). This means the quiz-first approach is not just viable — it is superior to study-first approaches.

**Distractor-driven elaboration.** Good distractors force learners to retrieve *why* each option is wrong, not just recognize the right answer. Little & Bjork (2012) showed that MCQs with plausible distractors outperform short-answer questions on transfer tests. The wrong options are not noise — they are pedagogical tools that trigger deeper processing.

**Feedback eliminates error consolidation.** Without corrective feedback, learners can consolidate wrong answers into long-term memory (Butler & Roediger 2008). With explanatory feedback, this risk disappears. Every question in AI Growth exits through a feedback panel.

**Confidence-based marking.** Gardner-Medwin's CBM framework shows that adding a confidence dimension to assessment surfaces two critical learning states that traditional quizzes miss entirely: correct-but-guessing and wrong-but-confident.

---

## The Confidence Mechanic

This is the centerpiece. After selecting an answer, learners rate their confidence: "I think so" or "I know it." This produces a 2x2 matrix of four distinct learning states:

### The 2x2 Matrix

| | Correct | Wrong |
|---|---|---|
| **"I know it"** | Confident-correct | Confident-wrong |
| **"I think so"** | Unsure-correct | Unsure-wrong |

Each state has different pedagogical meaning, different feedback treatment, and different implications for future scheduling.

### State 1: Confident + Correct — "I knew it."

- **What it means:** Genuine knowledge. This person can retrieve the answer and accurately assess their own knowledge state.
- **Feedback:** Quick green flash, confetti burst, "+15 XP" float. Auto-advance after 1.5 seconds. Don't linger — momentum matters here.
- **Scheduling implication:** Space this item further out. The learner has demonstrated both knowledge and self-awareness.

### State 2: Unsure + Correct — "Wait, really?"

- **What it means:** Fragile knowledge. The answer was retrieved, but the learner doesn't trust it. This looks fine on a traditional quiz but the memory is weak and likely to decay.
- **Feedback:** Softer green, sparkle effect. "+10 XP." Explanation panel opens automatically — the learner needs reinforcement of *why* this is correct.
- **Scheduling implication:** Re-test sooner than a confident-correct. The knowledge exists but needs consolidation.

### State 3: Unsure + Wrong — "Yeah, I didn't know that."

- **What it means:** Expected ignorance. The learner doesn't know and knows they don't know. Low shame because they flagged uncertainty first.
- **Feedback:** Warm, not punitive. "+3 XP" for honest self-assessment. Gentle transition to explanation. Tone: "Here's what's going on."
- **Scheduling implication:** Standard spacing. This is a normal learning gap, not a misconception.

### State 4: Confident + Wrong — "Oh shit."

- **What it means:** Active misconception. This is the most dangerous and most valuable learning state. The learner has incorrect knowledge that they believe is correct. Without intervention, this misconception will persist and interfere with future learning.
- **Feedback:** Half-second pause (a beat of silence — the most important design detail). Selected answer shows red. Correct answer expands and becomes dominant. Distractor-specific explanation: the system explains not just what's right but *why the chosen answer seemed right and isn't.* Misconception badge appears. "+5 XP" — because discovering a misconception is genuinely valuable.
- **Scheduling implication:** This item is flagged for a redemption arc. It returns in a future session. When the learner gets it right with confidence, special animation: "misconception cleared."

---

## Anti-Punishment Design

### XP for Every Outcome

| Feedback Type | XP | Rationale |
|---|---|---|
| Confident-correct | 15 | Full knowledge demonstrated |
| Unsure-correct | 10 | Correct but fragile — needs review |
| Confident-wrong | 5 | Misconception discovered — valuable learning |
| Unsure-wrong | 3 | Honest uncertainty acknowledged |

The system never takes XP away. Every interaction earns something. This is grounded in mastery orientation vs. performance orientation: when learners fear punishment, they avoid challenge and play it safe. When all outcomes earn progress, they engage honestly.

### What This System Does NOT Do

- **No lives or hearts.** Hearts punish exploration. A learner who takes risks and gets things wrong is learning more than one who plays it safe.
- **No timed pressure.** Timers create anxiety and encourage pattern-matching over genuine retrieval. Time tracking happens silently for analytics, never shown to the learner.
- **No leaderboards.** Social comparison creates performance orientation — learners optimize for looking good rather than learning. Optional in future game modes, never in the core experience.
- **No "study first, quiz later."** The quiz IS the learning. Pretesting research says this works better than the traditional sequence.

---

## Session Design

### Structure: 7 Questions, 5-7 Minutes

Sessions are short by design. Each session follows a deliberate emotional arc:

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

- **Q1-Q2 (Warm-up):** Items the learner is likely to get right. Builds momentum, activates prior knowledge, establishes the answer-confidence-feedback rhythm.
- **Q3-Q5 (Challenge):** ~60% success rate target. Real learning happens here — this is where confident-wrong states emerge and misconceptions get surfaced.
- **Q6-Q7 (Resolution):** One redemption item (something missed in a previous session). End on a high note.

Note: The current implementation (v0.1) uses random question selection. The session arc with adaptive pacing is designed for v0.2.

### Interaction Flow

1. Question appears with 4 answer options as cards (not a list, not radio buttons)
2. Tap an option to select it (option highlights, others dim slightly)
3. Two confidence buttons appear: "I think so" (muted) and "I know it" (bold)
4. Confidence selection triggers feedback state (one of the four states above)
5. Explanation panel shows — learner controls timing (except confident-correct, which auto-advances)
6. Next question slides in from the right

After all 7 questions: Session Summary with per-question results, total XP, misconception count, and confetti.

---

## Spaced Repetition (Planned — v0.2)

The system will use **FSRS v6** (via `ts-fsrs`, the open-source TypeScript implementation now used as Anki's default scheduler). FSRS outperforms the older SM-2 algorithm used in most flashcard apps.

The confidence signal feeds directly into scheduling:

```typescript
interface ItemHistory {
  fsrsCard: Card;              // FSRS scheduling state
  lastConfidence: 'think' | 'know';
  lastCorrect: boolean;
  timesSeen: number;
  timesCorrect: number;
  timesConfidentWrong: number; // tracks active misconceptions
}
```

Scheduling rules:
- **Confident-correct:** Longest interval. Knowledge is solid.
- **Unsure-correct:** Shorter interval than confident-correct. Knowledge exists but needs consolidation.
- **Unsure-wrong:** Standard new-item interval.
- **Confident-wrong:** Shortest interval. Flagged for redemption arc — returns within 1-2 sessions.

---

## Growth Visualization (Planned — v0.3)

### Knowledge Nodes, Not Streaks

Streaks create anxiety and punish missed days. Instead, show a knowledge node graph:

- **Empty/grey:** Haven't encountered yet
- **Partially filled:** In progress (seen but not yet retained)
- **Gold/bright:** Mastered (confident-correct, successfully spaced)
- **Pulsing:** Due for review (about to decay)

### Redemption Arcs

When a confident-wrong state occurs, the system creates a redemption quest. That item returns in a future session. When the learner answers correctly with confidence, special animation: cracked node repairs, "misconception cleared." This transforms the most negative learning moment into a satisfying narrative arc.

### Calibration Score

A meta-game tracking how well a learner's stated confidence matches their actual accuracy:

```
Under-confident <-------> Well-calibrated <-------> Over-confident
```

This is a metacognitive skill that transfers across all learning — knowing what you know and what you don't. The calibration score is visible to the learner as a secondary progress metric alongside XP and mastered items.

---

## Domain-Agnostic Item Model

The quiz engine accepts any content domain through the `QuizItem` interface:

```typescript
interface QuizItem {
  id: string;
  domain: string;           // e.g., 'vibecoding', 'math', 'science'
  tags: string[];            // topic tags for filtering
  difficulty: 'foundational' | 'intermediate' | 'advanced';
  title: string;
  question: string;
  correctAnswer: string;
  distractors: string[];     // wrong options (pedagogically designed)
  explanation: string;       // shown after every answer
  hints?: string[];          // optional progressive hints
  misconceptions?: string[]; // distractor-specific explanations
}
```

The `distractors` field is not just "wrong answers" — each distractor should represent a specific misconception or common error. When paired with `misconceptions[]`, the system can explain not just what's right but why the chosen wrong answer seemed plausible.

### Current Content: Vibe Coding (30 items)

Five topic areas, 6 items each:
- **Prompt Engineering** — writing prompts that get good code from AI
- **Reading AI Code** — spotting bugs, understanding generated output
- **Dev Tooling** — Git, npm, terminals, deployment
- **Web Fundamentals** — React, Next.js, Tailwind, APIs
- **Debugging with AI** — fixing errors, reading logs, iterating

Plus 7 math items from the original MathItemBank prototype.

---

## Key Research Papers

| Paper | Finding | Relevance |
|---|---|---|
| Roediger & Karpicke (2006), *Psych Science* | Testing > re-study by ~21% at 1 week | Core justification for quiz-as-learning |
| Karpicke & Roediger (2008), *Science* | Repeated retrieval, not study, drives retention | Quiz-first approach |
| Butler & Roediger (2008), *Memory & Cognition* | Feedback eliminates lure intrusion | Always show explanations |
| Little, Bjork et al. (2012) | MCQs + good distractors > short-answer on transfer | Distractor design matters |
| Little & Bjork (2014) | "Optimizing MCQs as tools for learning" | Design principles for items |
| Kornell, Hays & Bjork (2009), *JEP* | Pretesting improves learning even when wrong | No study-first requirement |
| Rowland (2014) meta-analysis | d=0.50 for retrieval practice | Effect size evidence |
| Adesope et al. (2017) meta-analysis | g=0.61 for practice testing | Effect size evidence |
| Gardner-Medwin (CBM framework) | Confidence marking improves metacognition | The 2x2 matrix |
| FSRS v6 (open-spaced-repetition) | Outperforms SM-2 for scheduling | Spaced repetition engine |

---

## Design References

**Tier 1 — Best-in-class UX:**
- **Duolingo** — one question/screen, green/red feedback, XP system, session structure
- **AMBOSS** — difficulty indicators, distractor-specific explanations
- **Brilliant.org** — lesson IS the quiz, interactive corrections, knowledge graph

**Tier 2 — Patterns borrowed:**
- **Brainscape** — confidence scale feeding spaced repetition
- **Kahoot** — color-coded answer options, energy, post-question feedback
- **Typeform** — one-question-at-a-time, keyboard-first flow

---

## Implementation Status

| Feature | Status |
|---|---|
| 4-state confidence feedback loop | Shipped |
| XP scoring with CBM weights | Shipped |
| Misconception callout in feedback | Shipped |
| Per-question time tracking | Shipped |
| Session summary with per-question review | Shipped |
| Confetti on confident-correct and session end | Shipped |
| Auto-advance on confident-correct | Shipped |
| Dark theme (Kahoot-style) and light theme (Duolingo-style) | Shipped |
| AI-generated doodle backgrounds | Shipped |
| Topic-based quiz filtering | Shipped |
| 30 vibe coding items across 5 topics | Shipped |
| `ts-fsrs` spaced repetition scheduling | Dependency installed, not wired in (v0.2) |
| Session arc pacing (warmup/challenge/resolution) | Type exists, random selection used (v0.2) |
| Redemption arcs for misconceptions | Designed (v0.2) |
| localStorage persistence | Not implemented (v0.2) |
| Calibration score | Designed (v0.3) |
| Knowledge node visualization | Designed (v0.3) |
| Session history | Designed (v0.3) |
