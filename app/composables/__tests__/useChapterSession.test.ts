import { describe, it, expect, beforeEach } from 'vitest';
import type { Chapter } from '~/types/learning';
import { useChapterSession } from '~/composables/useChapterSession';
import { useLearnerMemory } from '~/composables/useLearnerMemory';

const makeChapter = (): Chapter => ({
  slug: 'test-chapter',
  level: 'A1',
  title: 'Test Chapter',
  capability: 'Test capability',
  description: 'A chapter used in tests.',
  estimatedMinutes: 5,
  stages: [
    {
      id: 'stage-1',
      title: 'Stage 1',
      kind: 'retrieve',
      exercises: [
        { id: 'ex-1', kind: 'typed', prompt: 'Zeg: ik woon in Amsterdam', target: 'Ik woon in Amsterdam.', skills: ['production'] },
        { id: 'ex-2', kind: 'typed', prompt: 'Zeg: ik fiets naar huis', target: 'Ik fiets naar huis.', skills: ['production'] },
      ],
    },
    {
      id: 'stage-2',
      title: 'Stage 2',
      kind: 'personalise',
      exercises: [
        { id: 'ex-3', kind: 'personalise', prompt: 'Vertel iets over jezelf', skills: ['production'], vocabulary: [], grammar: [] },
      ],
    },
  ],
});

describe('useChapterSession', () => {
  beforeEach(() => {
    const memory = useLearnerMemory();
    memory.reset();
    memory.hydrated.value = false;
    localStorage.removeItem('dutch-adventure-session-test-chapter');
    const session = useChapterSession(makeChapter());
    session.reset();
    session.hydrated.value = false;
  });

  it('starts at the first exercise', () => {
    const { state, stage, exercise } = useChapterSession(makeChapter());
    expect(state.value.stageIndex).toBe(0);
    expect(state.value.exerciseIndex).toBe(0);
    expect(stage.value?.id).toBe('stage-1');
    expect(exercise.value?.id).toBe('ex-1');
  });

  it('advance moves to the next exercise within a stage', () => {
    const { state, exercise, advance } = useChapterSession(makeChapter());
    advance();
    expect(state.value.exerciseIndex).toBe(1);
    expect(exercise.value?.id).toBe('ex-2');
  });

  it('advance moves to the next stage at the end of a stage', () => {
    const { state, exercise, advance } = useChapterSession(makeChapter());
    advance();
    advance();
    expect(state.value.stageIndex).toBe(1);
    expect(state.value.exerciseIndex).toBe(0);
    expect(exercise.value?.id).toBe('ex-3');
  });

  it('advance marks the session completed after the final exercise', () => {
    const { state, advance } = useChapterSession(makeChapter());
    advance();
    advance();
    advance();
    expect(state.value.completed).toBe(true);
  });

  it('submit evaluates the answer and records an attempt', () => {
    const { state, lastAttempt, response, submit } = useChapterSession(makeChapter());
    const feedback = submit('Ik woon in Amsterdam!');

    expect(feedback?.outcome).toBe('correct');
    expect(state.value.attempts).toHaveLength(1);
    expect(lastAttempt.value?.exerciseId).toBe('ex-1');
    expect(lastAttempt.value?.answer).toBe('Ik woon in Amsterdam!');
    expect(response.value).toBe('');
  });

  it('submit records the result into learner memory', () => {
    const { submit } = useChapterSession(makeChapter());
    const { memory } = useLearnerMemory();
    submit('Ik woon in Amsterdam!');

    expect(memory.value.overall.production).toBeGreaterThan(0);
    // The fixture exercise carries no vocabulary/grammar/idioms tags
    expect(memory.value.vocabulary).toEqual({});
    expect(memory.value.grammar).toEqual({});
  });

  it('submit returns undefined when no exercise is current', () => {
    const emptyChapter: Chapter = { ...makeChapter(), stages: [] };
    const { submit } = useChapterSession(emptyChapter);
    expect(submit('iets')).toBeUndefined();
  });

  it('reset restores the initial session', () => {
    const session = useChapterSession(makeChapter());
    session.submit('Ik woon in Amsterdam!');
    session.advance();
    session.reset();

    expect(session.state.value.stageIndex).toBe(0);
    expect(session.state.value.exerciseIndex).toBe(0);
    expect(session.state.value.attempts).toHaveLength(0);
    expect(session.response.value).toBe('');
  });

  it('hydrate restores a persisted session', () => {
    const chapter = makeChapter();
    const session = useChapterSession(chapter);
    session.submit('Ik woon in Amsterdam!');
    session.advance();
    expect(session.state.value.exerciseIndex).toBe(1);

    // Simulate a fresh page load: drop hydrated flag and corrupt in-memory state
    session.hydrated.value = false;
    session.state.value = { ...session.state.value, exerciseIndex: 0, attempts: [] };

    session.hydrate();
    expect(session.state.value.exerciseIndex).toBe(1);
    expect(session.state.value.attempts).toHaveLength(1);
  });
});
