import type { ConceptState } from '~/types/learning';

/** Minimal ConceptState with sane defaults for seeding learner memory in page tests. */
export const mkState = (overrides: Partial<ConceptState> = {}): ConceptState => ({
  recognition: 0,
  meaning: 0,
  production: 0,
  automaticity: 0,
  listening: 0,
  speaking: 0,
  spelling: 0,
  pragmatic: 0,
  coherence: 0,
  idiomatic: 0,
  encounters: 1,
  successes: 1,
  ...overrides,
});

export { resetLearnerMemory } from '../../components/__tests__/helpers';
