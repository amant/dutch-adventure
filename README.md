# ⚓ Netherlands Taal Avonturen (Dutch Adventure)

> **"Don't teach the learner more language. Turn what they know into language they can actually use."**

An anime-inspired, **A1 → B2** Dutch learning web app built on a "Grand Line" voyage theme. Instead of vocabulary lists and grammar units, the app is structured around **capabilities** (can-do goals) and runs every concept through a science-backed learning loop — from recognition all the way to automatic, native-like production.

**Note:** Code and Chapters all generated with Germini and Deepseek. Nothing serious, just playing, exploring, pushing agentic way of programming.

---

## ✨ Features

### 🧭 The Learning Loop
Every chapter moves a concept from recognition to automaticity through 8 stages:

1. **Discover** – a 2–5 minute explanation (usually pattern induction, not lectures)
2. **Understand** – examples in authentic context (dialogues, stories, articles)
3. **Retrieve** – intelligent production drilling (typed & spoken, not multiple choice)
4. **Review Redlines** – a persistent feedback loop for past mistakes
5. **Personalise** – make the language yours ("Waarom blijf je vandaag thuis?")
6. **Conversation** – AI simulator pushing for improvisation
7. **Delayed Retrieval** – re-test concepts days later with no hints
8. **Automate** – timed drills and high-pressure missions

### 🗺️ The Language Graph
Progress isn't measured by "lessons completed" but by a **multidimensional state per concept**:

| Dimension | What it measures |
|---|---|
| Recognition / Meaning | Can you identify it and know what it means? |
| Listening / Reading | Can you handle it in natural input? |
| Spelling / Writing | Can you reproduce it correctly? |
| Production / Speaking | Can you recall and use it under pressure? |
| Automaticity | Fast, effort-free retrieval? |
| Pragmatic / Coherence / Idiomatic | Native-level nuance, flow, and idiom use? |

Every interaction updates this graph, visualized on the **Progress** and **Graph** pages.

### 🧠 Learner Memory & Redlines
A personal, localStorage-persisted memory model (`useLearnerMemory`) that tracks:
- **Redlines** – every mistake with a natural correction + explanation, ready for review in **Corrections** (🎯) and via the **TeacherRedline** component.
- **Usage history / Personal Sentence Corpus** – the exact sentences *you* produced successfully, searchable in the Vocabulary Library.
- **Fluency metrics** – response times per exercise that show the transition from "thinking/translating" to "automatic/fluent".

### 🕰️ Memory Lab
The **Memory** page tracks **memory decay** (concepts not seen in 1+ days) and runs **Stage 6 Delayed Retrieval** by resurrecting your past prompts 2–7 days later — no hints allowed.

### ⚔️ Smart Review & Scenario Sandbox
- **Smart Review** generates personalized sessions from your weak/frontier concepts: speed drills, activation drills, fluency challenges, and full scenario missions.
- **Scenario Sandbox** lets you describe any real-world situation ("Ordering a cake at the bakery") and generates a custom mission woven from your learning log.

### 📖 Authentic Reading
Level-adapted Dutch articles (A1 → B2) with inline word hints. Every word encounter is recorded into your Language Graph, and the feed shows your vocabulary **coverage %** per article.

### 🎤 Voice & Speaking
Production stages support **Speech-to-Text voice input** — spoken responses are evaluated with speaking-specific heuristics and award extra progress on the `speaking` and `automaticity` dimensions.

### 📚 Content Library
- **75 chapters** spanning A1 → B2, each built on the full learning loop, including capstone missions (*A1 Survival Mission*, *B2 Professional Integration*).
- A deep bench of **specialized B2 drills**: prefix verbs, midfield/TMP syntax, fixed prepositions, pronominal adverb splitting, IPP/double infinitive, participial constructions, modal particles, topicalisation, correlatives, conditionals, causality, aspectual constructions, and more.

---

## 📦 Prerequisites

- **Node.js** `^24.13.1`
- **pnpm** `^11.5.0`

> The repo is set up for pnpm (see `pnpm-lock.yaml` and `package.json` `engines`). If you don't have pnpm yet: `corepack enable`.

## 🚀 Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Start the dev server → http://localhost:3000
pnpm dev
```

### Build & preview production

```bash
pnpm build      # production build (nuxt build)
pnpm generate   # static site generation (nuxt generate)
pnpm preview    # locally preview the production build
```

## 🗂️ Project Structure

```
dutch-adventure/
├── app/
│   ├── assets/scss/        # Theme tokens (_variables.scss, _mixins.scss, main.scss)
│   ├── components/         # 57 UI components (drills, challenges, ladders…)
│   │   └── __tests__/      # Co-located component tests
│   ├── composables/        # useChapterSession, useLearnerMemory
│   ├── data/               # chapters.ts (75), articles.ts, idioms.ts, wordFamilies.ts
│   ├── pages/              # dashboard, graph, memory, reading, sandbox, smart-review…
│   │   ├── chapter/[slug].vue
│   │   └── reading/[id].vue
│   ├── types/learning.ts   # Core domain types (Chapter, Exercise, LearnerMemory…)
│   └── utils/              # Evaluation engines, exercise generator, dictionary…
├── .githooks/              # Git hooks (pre-push runs the test suite)
├── nuxt.config.ts
├── vitest.config.ts
└── package.json
```

### Key modules

- **Evaluation engine** (`app/utils/`) – the brains behind every answer: `evaluateResponse`, `evaluateExercise`, `evaluateCoreDrills`, `evaluateGrammarDrills`, `evaluateSyntaxDrills`, `evaluateGuidedExercise`, `evaluateFallback`, plus `exerciseGenerator` (smart-review/mission builders) and a `dictionary` of Dutch words.
- **Chapter sessions** (`app/composables/useChapterSession.ts`) – drives one chapter through the learning loop, records every attempt, and persists progress to localStorage.
- **Learner memory** (`app/composables/useLearnerMemory.ts`) – the persistent Language Graph: skill dimensions, concept states, redlines, usage history, and response times.

---

*"Grand Line · Dutch Expedition" — set sail from A1 and reach the B2 Grand Line.* 🌊

