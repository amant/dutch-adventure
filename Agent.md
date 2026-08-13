# Agent Guidelines: Dutch Adventure

This document defines the core philosophy, architectural principles, and pedagogical engine of the Dutch Adventure webapp. Any AI agent working on this project must adhere to these guidelines to ensure consistency and effectiveness in the "B2 from day one" mission.

## 1. Core Philosophy

> **"Don't teach the learner more language. Turn what they know into language they can actually use."**

- **B2 Destination Architecture**: Every feature, even at A1, should be designed with the B2 destination in mind. We are building a path to fluency, not just a collection of vocabulary lists.
- **Can-Do Approach**: Structure the app around capabilities (what the learner can *do*) rather than grammar units.

## 2. The Learning Engine (The Loop)

Every chapter should follow this loop to move concepts from recognition to automaticity:

1.  **Discover**: Very short explanation (2–5 mins).
2.  **Understand**: Examples in context (dialogues, stories).
3.  **Retrieve**: Intelligent drilling (production, transformation, recombination, substitution).
4.  **Review Redlines**: Persistent feedback loop for past mistakes.
5.  **Personalise**: "Why are you staying home today?"
6.  **Conversation**: AI simulator pushing for improvisation.
7.  **Delayed Retrieval**: Re-testing concepts days later with no hints. Uses personalized history (Stage 6) to reactivate past production.
8.  **Automate**: Timed drills and high-pressure missions.

### Memory & Automaticity

- **Memory Lab**: A dedicated hub for tracking "Memory Decay" and performing **Stage 6 Retrieval**. The system stores the exact prompts and sentences produced by the learner (`usageHistory`) and brings them back 2-7 days later to test if retrieval is becoming automatic.
- **Fluency Metrics**: Every production exercise tracks **Retrieval Speed** (Response Time). These metrics are visualized on the Progress page to show the transition from "Thinking/Translating" to "Automatic/Fluent". Includes **Dynamic Fluency Challenges** for Stage 7 Automation.
- **Pragmatic Evolution**: Every interaction's **Naturalness Score** is tracked in the Language Graph, allowing the learner to see their progress from "Literal/Stiff" to "Native-like" flow via trend charts on the Progress page.

### Voice & Speaking

Production stages (Retrieve, Personalise, Conversation, Challenge) support **Speech-to-Text (Voice Input)**. Spoken responses are evaluated with specific heuristics and provide increased rewards for the `speaking` and `automaticity` dimensions of the Language Graph.

## 3. The Language Graph

We track the learner's progress not by "lessons completed," but through a multidimensional state for every word and grammar pattern:

- **Recognition**: Can they identify it?
- **Meaning**: Do they know what it means?
- **Listening**: Can they hear it in natural speech?
- **Spelling**: Can they write it correctly?
- **Production**: Can they recall it when prompted?
- **Speaking**: Can they use it in a conversation?
- **Automaticity**: Can they use it without thinking (fast retrieval)?
- **Pragmatic**: Can they use the correct level of formality and social nuance (e.g., softeners, particles)?
- **Coherence**: Can they connect ideas logically using transition words (e.g., *bovendien*, *daarentegen*, *derhalve*)?
- **Idiomatic**: Can they use natural Dutch idioms (e.g., *met de deur in huis vallen*) correctly in context?
- **Usage History**: The system tracks the exact snippets of successful usage for every concept, building a "personal corpus" of what the learner *can actually use*. Accessible via **Personal Sentence Corpus** search in the Vocabulary Library.

**Rule**: If a word is "learned" but cannot be produced spontaneously, the system marks it as a **bottleneck** and injects it into future activities.

## 4. AI Behavior & Teacher Persona

The AI in this app is not just a chatbot; it's a coach.

- **Teacher Corrections**: When a learner makes a mistake, provide a "Natural" rewrite and a "Teacher's Tip" (short, pedagogical explanation). Includes visual "Teacher's Redline" to highlight changes.
- **Correction Hub**: Persistent storage of "Redlines" allows learners to revisit and re-try exercises they struggled with, closing the feedback loop.
- **Scenario Sandbox**: A personalization tool that allows learners to design custom missions for their real-world needs. The system automatically incorporates "Frontier" concepts into these missions to ensure effective activation.
- **Pragmatic Analysis**: Every correct response is evaluated for its "Naturalness" (Pragmatic Score). Suggestions are provided to soften direct requests (using "even", "zou", "graag") or add native-like particles ("hoor", "nou").
- **The "Difficult" AI**: At higher levels (B1/B2), the AI should simulate real-world difficulty:
    - **Patience Meter**: AI responsiveness and tone change based on learner accuracy and social/pragmatic appropriateness (e.g., formality).
    - Interrupting or asking follow-up questions.
    - Expressing disagreement or confusion.
    - Using colloquial expressions.
- **Grammar Assistant**: Grammar should appear **when needed** (e.g., attached to a mistake). Detects word-order inversion, perfect tense auxiliaries, separable verbs, subordinate clauses, article (de/het) errors, and adjective endings.
- **Monitoring & Self-Correction**: At higher levels (B2), learners are trained to act as their own "Teacher".
    - **Correction Challenge**: Exercises where learners must identify and fix errors in provided Dutch texts, building linguistic awareness.
    - **Self-Correction Goals**: Production exercises that reward immediate repair of one's own spoken or written slips.
- **Strategic Competence & Circumlocution**: B2 learners must be able to keep speaking even when they lack a specific word.
    - **Circumlocution Challenge**: Tasks where learners must explain an abstract concept without using forbidden (direct) terms.
    - **Precision Training**: Drills that force learners to replace "lazy" or "overused" words (e.g., *leuk*, *goed*) with more precise Dutch vocabulary.
- **Naturalness & Pragmatic Competence**: Moving beyond "correctness" to "naturalness".
    - **Nuance Injector**: Exercises that challenge learners to take stiff sentences and inject modal particles (*hoor*, *even*, *maar*) to sound native-like.
    - **Collocation Precision**: Training the brain to use standard native word pairings (e.g., *besluit nemen*) to avoid literal translations (Anglicisms).

## 5. Information Architecture

- **Capabilities**: Group chapters by CEFR level (A1 Survival, A2 Everyday Independence, B1 Independent Communication, B2 Complex Communication).
- **Missions**: High-level challenges that combine multiple skills (e.g., "Complain about a hotel").
- **Capstone Missions**: High-stakes, multi-stage simulations that act as the final "Can-do" test for each CEFR level (e.g., "Survival in Amsterdam" for A1 or "Professional Integration" for B2). Provides a "Teacher's Report Card" at the end, summarizing fluency, naturalness, and goal achievement.
- **Mediation**: Challenges that require summarizing or explaining formal/complex information in natural Dutch (e.g., explaining a formal letter to a neighbor).
- **Ladders**: 
    - **Listening Ladder**: From slow/clear to fast/colloquial with background noise. Supports multiple-speaker dialogues, **comprehension checks**, and **Shadowing** (repeating native audio to build automaticity).
    - **Reading Ladder**: From artificial dialogues to authentic Dutch news. Includes post-reading production challenges.
- **Pragmatic Drills**: Explicit practice for social nuances, choosing the best phrasing for a specific context (formal vs. informal).

## 6. Technical Implementation for Agents

- **Types**: See `app/types/learning.ts` for the core domain model.
- **Articles**: Authentic content lives in `app/data/articles.ts`.
- **Idioms**: The idiom library is defined in `app/data/idioms.ts`.
- **Memory**: `useLearnerMemory.ts` handles the persistence of the Language Graph.
- **Chapters**: Add new curriculum content in `app/data/chapters.ts`.
- **Corrections**: `app/pages/corrections.vue` provides a hub for reviewing and re-trying persistent "Redlines".
- **Sandbox**: `app/pages/sandbox.vue` allows for custom mission generation using `exerciseGenerator.ts`.
- **Evaluation**: Logic for pedagogical feedback lives in `app/utils/evaluateResponse.ts`.
- **Components**:
    - `MissionSimulator.vue`: AI personality-driven chat with Speech-to-Text (Voice) support.
    - `CapstoneMission.vue`: A high-fidelity wrapper for Capstone missions that adds progress tracking, a celebratory completion state, and a detailed performance report.
    - `VoiceInput.vue`: Global component for capturing Dutch speech via Web Speech API.
    - `ListeningLadder.vue` / `ReadingLadder.vue`: Progressive difficulty renderers. `ListeningLadder` supports interactive, clickable words for individual repetition.
    - `ConnectorDrill.vue`: Choose the correct logical connector to complete a passage.
    - `FormalityDrill.vue`: Challenges learners to express the same thought across different social registers (Casual, Neutral, Formal).
    - `RecombinationDrill.vue`: Challenges learners to use multiple specific concepts in a single sentence.
    - `FlexibilityDrill.vue`: Challenges learners to rewrite sentences using different frames.
    - `TeacherRedline.vue`: Visualizes the diff between user input and natural native corrections.
    - `FluencyChallenge.vue`: High-pressure, timed retrieval challenge for Stage 7 Automation.
    - `NativeMirroring.vue`: Specialized drill for transforming stiff Dutch into natural, native-like phrasing.
    - `CorrectionChallenge.vue`: Interactive interface for identifying and fixing errors in a provided passage.
    - `CircumlocutionChallenge.vue`: Component for explaining concepts without using forbidden words.
    - `NuanceDrill.vue`: Interactive tool for injecting naturalness into stiff Dutch sentences.
    - `CollocationDrill.vue`: Precision-based tool for practicing native word pairings.
    - `PragmaticIndicator.vue`: Visualizes the naturalness score of a response.
    - `PragmaticDrill.vue`: Context-based choice for social nuances.

## 7. Development Guidelines

1.  **Always set random seeds** (if applicable) for reproducible exercises.
2.  **Minimize multiple choice**: Favour production (typing/speaking) to build retrieval strength.
3.  **Context is King**: Never teach a word in isolation; always provide a sentence or a scenario.
4.  **Feedback first**: Ensure every interaction provides meaningful, actionable feedback.
