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
    - **Dynamic Register Switching**: Missions can trigger a change in the required formality level mid-conversation (e.g., "Zeg maar je hoor!"). The system tracks this `requiredRegister` override and evaluates subsequent responses against it.
- **Stage 3 — Transformation (Sentence Morphing)**: Focuses on grammatical flexibility and automaticity.
    - **Morphing Drill**: A multi-step exercise where a base sentence is evolved into a complex, layered Dutch sentence (e.g., adding reasons, changing subjects, switching tenses). This trains the learner to maintain structural integrity (word order, conjugations) under changing conditions.
- **Stage 5 — Conversation (Advanced Modes)**:
    - **Debate Mode**: A multi-phase conversation (Opening, Rebuttal, Defense, Summary) that trains high-level persuasion and the use of logical connectors (daarentegen, immers, derhalve).
- **Listening Ladder (Active Transcription)**:
    - **Selective Transcription (Cloze)**: Exercises where learners must transcribe specific difficult words or connectors from natural speech, bridging the gap between passive listening and active orthographic/grammatical accuracy.
- **Reading as Real Dutch**:
    - **Custom Reader**: A tool that analyzes any pasted Dutch text against the learner's Language Graph, providing real-time stats (Mastered/Frontier/New) and interactive hints.
    - **Vocabulary Capture**: Every interaction with authentic text is recorded as an encounter, updating the learner's exposure history and identified "frontier" words.
- **Daily Loop & Automaticity**:
    - **Personalized Daily Path**: A dynamic 4-step routine (Activation, Maintenance, Fluency, Authentic) that prioritizes high-impact tasks based on current bottlenecks.
- **Grammar Assistant**: Grammar should appear **when needed** (e.g., attached to a mistake). Detects word-order inversion, perfect tense auxiliaries, separable verbs, subordinate clauses, article (de/het) errors, adjective endings, reflexive verbs, and fixed prepositions.
- **Monitoring & Self-Correction**: At higher levels (B2), learners are trained to act as their own "Teacher".
    - **Correction Challenge**: Exercises where learners must identify and fix errors in provided Dutch texts, building linguistic awareness.
    - **Self-Correction Goals**: Production exercises that reward immediate repair of one's own spoken or written slips.
- **Strategic Competence & Circumlocution**: B2 learners must be able to keep speaking even when they lack a specific word.
    - **Circumlocution Challenge**: Tasks where learners must explain an abstract concept without using forbidden (direct) terms.
    - **Precision Training**: Drills that force learners to replace "lazy" or "overused" words (e.g., *leuk*, *goed*) with more precise Dutch vocabulary.
- **Naturalness & Pragmatic Competence**: Moving beyond "correctness" to "naturalness".
    - **Nuance Injector**: Exercises that challenge learners to take stiff sentences and inject modal particles (*hoor*, *even*, *maar*) to sound native-like.
    - **Pragmatic Inference**: Training learners to "read between the lines" and understand indirect requests or subtle disagreements.
    - **Collocation Precision**: Training the brain to use standard native word pairings (e.g., *besluit nemen*) to avoid literal translations (Anglicisms).
    - **Dutch Understatement**: B2 learners are trained in the cultural nuance of "nuchterheid" (soberness), replacing extreme praise with appropriate understatements like "niet verkeerd" or "het valt wel mee".
    - **Logical Flow & Cohesion**: Advanced learners practice reordering scrambled thoughts to master organizational patterns and the use of logical connectors for clear argumentation.
    - **Summarisation Mastery**: Learners are challenged to synthesize complex Dutch articles into concise summaries, explicitly identifying and expressing required key points.
    - **Structural Precision (Er & Position)**: B2 mastery of the word "er" and its four functions (Locative, Partitive, Prepositional, Subjective), combined with native-like use of position verbs (*staan, liggen, zitten, hangen*).
    - **Diplomatic Reframing & Strategic Competence**: B2 learners are trained to reframe blunt or direct statements into professional, empathetic Dutch using "softeners" (*zou, misschien, eigenlijk*) and indirect structures to maintain social relationships.
    - **Pronominal Adverb Mastery**: Practice merging prepositions with reference words (*er, hier, daar, waar*) to create essential Dutch connectors like *ermee, waarop,* and *daarnaar*, a critical bridge to B2-level cohesion.
    - **Formal Style & Nominalisation**: Training for B2+ learners to transform informal verbal sentences into professional, noun-based constructions (e.g., "De prijzen stijgen" -> "De stijging van de prijzen"), a key feature of academic and professional Dutch.
    - **Passive Voice Mastery**: Specialized training for B2 learners to master the passive voice (*lijdende vorm*), focusing on the distinction between process (*worden*) and result (*zijn*), and the unique Dutch impersonal "Er-passive" construction.
    - **Hypotheticals & Unreal Conditions**: Practice expressing wishes, regrets, and hypothetical present and past scenarios using *had, was, zou* and *zou zijn/hebben*, a key B2 strategic and linguistic capability.

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
- **Reader**: `app/pages/reader.vue` and `app/components/TextAnalyzer.vue` provide authentic text analysis.
- **Dictionary**: `app/utils/dictionary.ts` provides a global lookup for interactive hints.
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
    - `PrecisionDrill.vue`: Component for replacing "lazy" words with more precise synonyms in a sentence.
    - `UnderstatementDrill.vue`: Pragmatic tool for transforming direct praise into culturally appropriate Dutch understatements.
    - `CohesionDrill.vue`: Tool for reordering scrambled sentences to practice logical flow and cohesion.
    - `SummaryChallenge.vue`: Interactive component for synthesizing articles into concise summaries with key point verification.
    - `ErPositionDrill.vue`: Specialized component for identifying 'er' functions and correctly using position verbs.
    - `PronominalDrill.vue`: Interactive tool for merging prepositions and reference words to master pronominal adverbs.
    - `NominalisationDrill.vue`: Specialized component for transforming verbal sentences into formal noun-based constructions.
    - `PassiveDrill.vue`: Interactive tool for active-to-passive transformations, focusing on process, result, and impersonal constructions.
    - `ReframingDrill.vue`: Strategic tool for transforming blunt statements into diplomatic, professional Dutch.
    - `InferenceChallenge.vue`: Component for identifying implied meaning and subtle understatements.
    - `PragmaticIndicator.vue`: Visualizes the naturalness score of a response.
    - `PragmaticDrill.vue`: Context-based choice for social nuances.

## 7. Development Guidelines

1.  **Always set random seeds** (if applicable) for reproducible exercises.
2.  **Minimize multiple choice**: Favour production (typing/speaking) to build retrieval strength.
3.  **Context is King**: Never teach a word in isolation; always provide a sentence or a scenario.
4.  **Feedback first**: Ensure every interaction provides meaningful, actionable feedback.
