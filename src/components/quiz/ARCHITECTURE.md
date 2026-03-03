# Quiz Engine Architecture

Confidence-weighted MCQ system with gamified feedback. The core insight: **what students think they know matters as much as what they actually know.** Four feedback states emerge from the 2x2 matrix of correctness × confidence.

## The 2x2 Confidence Matrix

| | Correct | Wrong |
|---|---|---|
| **"I know it"** | Confident-correct (+15 XP, confetti, auto-advance) | Confident-wrong (+5 XP, misconception flagged, shake animation) |
| **"I think so"** | Unsure-correct (+10 XP, "worth reviewing") | Unsure-wrong (+3 XP, gentle teaching moment) |

Every answer earns XP. The system rewards honest self-assessment — admitting uncertainty when wrong earns less than being confidently wrong, but the pedagogical value is captured either way.

## Flow

```
Answer → Confidence → Feedback → Next
  ↓         ↓            ↓
Pick A-D   "think"     Shows explanation,
           or "know"   misconception callout,
                       XP earned
```

After all questions: Session Summary with per-question results, total XP, misconception count.

## Components

### QuizEngine.tsx (orchestrator)
- Manages state machine: `answering → selected → feedback → complete`
- Tracks `QuizQuestion[]` with phases, confidence, correctness
- Handles XP calculation, confetti triggers, auto-continue for confident-correct
- Accepts `themeMode` prop (`'dark' | 'light'`)
- Renders DoodleBg, ProgressBar, AnswerOptions, ConfidenceButtons, FeedbackPanel

### AnswerOption.tsx
- Animated answer cards (A/B/C/D) with per-answer color badges
- States: default → selected (ring highlight) → feedback (correct=green, wrong=red+shake, dimmed=others)
- Uses `theme.cardBg`, `theme.cardShadow` — fully opaque cards, no transparency
- Framer Motion: hover lift, tap scale, wrong-answer shake, correct-answer bounce

### ConfidenceButtons.tsx
- Two buttons: "I think so" (unsure) and "I know it" (confident)
- Appears after answer selection, before feedback
- Slide-up animation via Framer Motion

### FeedbackPanel.tsx
- Dark-mode-aware feedback cards with 4 distinct color schemes (emerald/teal/amber/red)
- Shows explanation text, misconception callout for confident-wrong
- "Got it" / "Next" button to advance

### ProgressBar.tsx
- Segmented progress (filled per completed question)
- XP counter with amber badge

### XPFloat.tsx
- Floating "+15 XP" animation that rises and fades after each answer

### SessionSummary.tsx
- End-of-session screen: score circle, XP earned, per-question results
- Misconception/lucky badges, Play Again / Done buttons
- Confetti burst on mount

### DoodleBg.tsx
- Renders an AI-generated PNG as a CSS background (cover or tile)
- `src`, `opacity`, `tile` props — used by both QuizEngine and SessionSummary

## Theme System (theme.ts)

Two visual modes, fully defined in `QuizTheme` interface:

**Dark mode** — Kahoot-inspired: deep purple `#1a0a3e`, bold colored answer badges (red/blue/emerald/amber), solid dark cards `bg-[#2a1a5e]`

**Light mode** — Duolingo-inspired: light gray `#f0f0f0`, solid white cards with thick shadows, solid colored answer badges (indigo/rose/teal/amber)

Key design principle: **cards are fully opaque** — no glass-morphism or transparency. Doodle backgrounds show through gaps between cards, not through them.

Theme properties: `pageBg`, `doodleBg` (PNG path), `doodleOpacity`, `cardBg`, `cardBorder`, `cardShadow`, `answerColors[]`, `selectedBg/Border/Ring`, progress/XP/confidence/feedback/summary colors.

## Data Model (types.ts)

```typescript
type Confidence = 'think' | 'know';
type QuestionPhase = 'answering' | 'selected' | 'feedback' | 'complete';
type FeedbackType = 'confident-correct' | 'unsure-correct' | 'unsure-wrong' | 'confident-wrong';

interface QuizQuestion {
  item: MathItem;
  options: string[];        // Shuffled A-D
  correctIndex: number;
  selectedIndex: number | null;
  confidence: Confidence | null;
  isCorrect: boolean | null;
  timeStartedMs: number;
  timeSpentMs: number;
  phase: QuestionPhase;
}
```

## XP Scoring

| Feedback Type | XP | Rationale |
|---|---|---|
| confident-correct | 15 | Full marks — you knew it and proved it |
| unsure-correct | 10 | Right answer, but flagged for review |
| confident-wrong | 5 | Misconception discovered — valuable learning |
| unsure-wrong | 3 | Honest uncertainty rewarded |

## Backgrounds

AI-generated via MuleRouter (wan2.6-t2i). Stored in `public/textures/`:
- `math-doodle-{light,dark}-{1-4}.png` — math symbol doodles (1024x1024)
- `vibecode-{light,dark}-{1-4}.png` — coding/AI/education doodles

Plus ~20 downloaded tileable textures as fallbacks.

Background picker at `/quiz/backgrounds` for visual comparison.

## File Map

```
src/components/quiz/
├── QuizEngine.tsx          # Main orchestrator
├── AnswerOption.tsx         # Answer cards with animations
├── ConfidenceButtons.tsx    # "think" / "know" buttons
├── FeedbackPanel.tsx        # Explanation + misconception panel
├── ProgressBar.tsx          # Progress + XP display
├── XPFloat.tsx              # Floating XP animation
├── SessionSummary.tsx       # End-of-session results
├── DoodleBg.tsx             # PNG background renderer
├── theme.ts                 # Dark/light theme definitions
├── types.ts                 # QuizQuestion, FeedbackType, XP scoring
├── sample-questions.ts      # Demo MCQ items + shuffle/build utils
└── ARCHITECTURE.md          # This file

src/app/quiz/
├── page.tsx                 # Quiz launcher (start screen)
├── play/page.tsx            # Quiz player (?theme=dark|light)
└── backgrounds/page.tsx     # Background texture picker

public/textures/             # AI-generated + downloaded background PNGs
```

## Unused / Legacy

These files exist but are no longer imported:
- `MathDoodleBg.tsx` — SVG math doodle pattern (replaced by DoodleBg + PNG)
- `PolkaDotBg.tsx` — SVG polka dot pattern (replaced by DoodleBg + PNG)
- `BackgroundPattern.tsx` — old PNG texture cycling component
