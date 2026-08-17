import { describe, it, expect } from 'vitest';
import {
  generateExercisesForConcept,
  createSmartReviewChapter,
  createActivationChapter,
  createSpeedChapter,
  createFluencyChapter,
  createScenarioMission,
} from '~/utils/exerciseGenerator';

describe('generateExercisesForConcept', () => {
  it('uses the context dictionary for known concepts', () => {
    const ex = generateExercisesForConcept('wonen', 'vocabulary', 'typed');
    expect(ex.id).toBe('smart-vocabulary-wonen-typed');
    expect(ex.prompt).toBe('I live in Amsterdam.');
    expect(ex.target).toBe('Ik woon in Amsterdam.');
    expect(ex.explanation).toBe('Use "wonen" for living in a place.');
  });

  it('falls back to a generic prompt for unknown concepts', () => {
    const ex = generateExercisesForConcept('onbekend-concept', 'grammar', 'typed');
    expect(ex.prompt).toBe('Use the concept: onbekend-concept');
    expect(ex.target).toBe('[Correct usage of onbekend-concept]');
  });

  it('tags vocabulary vs grammar keys correctly', () => {
    const vocabEx = generateExercisesForConcept('wonen', 'vocabulary', 'typed');
    expect(vocabEx.vocabulary).toEqual(['wonen']);
    expect(vocabEx.grammar).toEqual([]);

    const grammarEx = generateExercisesForConcept('omdat-clause', 'grammar', 'typed');
    expect(grammarEx.grammar).toEqual(['omdat-clause']);
    expect(grammarEx.vocabulary).toEqual([]);
  });

  it('assigns production + spelling skills for typed drills', () => {
    const ex = generateExercisesForConcept('wonen', 'vocabulary', 'typed');
    expect(ex.skills).toEqual(expect.arrayContaining(['production', 'spelling']));
  });

  it('assigns speaking + production skills for conversations', () => {
    const ex = generateExercisesForConcept('wonen', 'vocabulary', 'conversation');
    expect(ex.skills).toEqual(expect.arrayContaining(['speaking', 'production']));
  });

  it('sets a strict timer for speed drills', () => {
    const ex = generateExercisesForConcept('wonen', 'vocabulary', 'speed-drill');
    expect(ex.automaticitySeconds).toBe(4);
    expect(ex.skills).toEqual(expect.arrayContaining(['automaticity', 'production']));
  });

  it('generates reframing data for reframing drills', () => {
    const ex = generateExercisesForConcept('wonen', 'vocabulary', 'reframing-drill');
    expect(ex.reframingData).toBeDefined();
    expect(ex.reframingData!.softeningElements).toContain('misschien');
  });

  it('generates pronominal data with the right preposition', () => {
    const ex = generateExercisesForConcept('ermee', 'grammar', 'pronominal-drill');
    expect(ex.pronominalData?.preposition).toBe('met');
  });

  it('generates aspect data for aspect drills', () => {
    const ex = generateExercisesForConcept('aan het lezen', 'grammar', 'aspect-drill');
    expect(ex.aspectData?.aspectCategory).toBe('progressive-aan-het');
  });

  it('generates modal particle data for modal particle drills', () => {
    const ex = generateExercisesForConcept('wel degelijk', 'grammar', 'modal-particle-drill');
    expect(ex.modalParticleData?.pragmaticFunction).toBe('rebuttal-wel-degelijk');
  });

  const drillKinds = [
    'nominalisation-drill',
    'passive-drill',
    'reported-speech-drill',
    'relative-clause-drill',
    'infinitive-drill',
    'double-infinitive-drill',
    'concession-drill',
    'participial-drill',
    'correlative-drill',
    'conditional-drill',
    'causality-drill',
    'prefix-verb-drill',
    'midfield-drill',
    'fixed-preposition-drill',
    'pronominal-splitting-drill',
    'aspect-drill',
    'modal-particle-drill',
    'topicalisation-drill',
  ] as const;

  it.each(drillKinds)('generates an exercise for the %s kind', (kind) => {
    const ex = generateExercisesForConcept('wonen', 'vocabulary', kind as any);

    expect(ex.kind).toBe(kind);
    expect(ex.id).toBe(`smart-vocabulary-wonen-${kind}`);
    expect(ex.skills).toContain('production');
  });

  it('tags the drill-kind skills appropriately', () => {
    expect(generateExercisesForConcept('wonen', 'vocabulary', 'nominalisation-drill').skills).toContain('grammar');
    expect(generateExercisesForConcept('wonen', 'vocabulary', 'modal-particle-drill').skills).toEqual(
      expect.arrayContaining(['pragmatic', 'grammar']),
    );
  });

  it('handles the governing-verb variants for double infinitive drills', () => {
    const laten = generateExercisesForConcept('laten fietsen', 'grammar', 'double-infinitive-drill');
    expect(laten.doubleInfinitiveData?.governingVerb).toBe('laten');
    expect(laten.doubleInfinitiveData?.governingType).toBe('causative-laten');

    const leren = generateExercisesForConcept('leren fietsen', 'grammar', 'double-infinitive-drill');
    expect(leren.doubleInfinitiveData?.governingVerb).toBe('leren');
    expect(leren.doubleInfinitiveData?.governingType).toBe('instruction-leren-helpen');

    const horen = generateExercisesForConcept('horen zingen', 'grammar', 'double-infinitive-drill');
    expect(horen.doubleInfinitiveData?.governingVerb).toBe('horen');
    expect(horen.doubleInfinitiveData?.governingType).toBe('perception');
  });
});

describe('createSmartReviewChapter', () => {
  it('builds a smart review chapter with expected stages', () => {
    const chapter = createSmartReviewChapter(['wonen'], ['omdat-clause']);
    expect(chapter.slug).toBe('smart-review');
    expect(chapter.level).toBe('A1');
    const kinds = chapter.stages.map(s => s.kind);
    expect(kinds).toContain('discover');
    expect(kinds).toContain('retrieve');
    expect(kinds).toContain('review');
    expect(kinds).toContain('personalise');
  });

  it('returns an empty chapter for no concepts', () => {
    const chapter = createSmartReviewChapter([], []);
    expect(chapter.stages).toHaveLength(0);
  });
});

describe('createActivationChapter', () => {
  it('creates three stages from concepts', () => {
    const chapter = createActivationChapter([{ key: 'wonen', kind: 'vocabulary' }]);
    expect(chapter.slug).toBe('activation-session');
    expect(chapter.stages.map(s => s.kind)).toEqual(['transform', 'retrieve', 'personalise']);
  });

  it('returns empty stages when no concepts provided', () => {
    expect(createActivationChapter([]).stages).toHaveLength(0);
  });
});

describe('createSpeedChapter', () => {
  it('generates tight speed-drill exercises', () => {
    const chapter = createSpeedChapter(['wonen'], ['omdat-clause']);
    expect(chapter.slug).toBe('speed-review');
    expect(chapter.stages[0]!.exercises).toHaveLength(2);
    for (const ex of chapter.stages[0]!.exercises) {
      expect(ex.kind).toBe('speed-drill');
      expect(ex.automaticitySeconds).toBe(3);
    }
  });
});

describe('createFluencyChapter', () => {
  it('maps usage history to fluency exercises', () => {
    const chapter = createFluencyChapter([
      { key: 'wonen', prompt: 'Where do you live?', snippet: 'Ik woon in Amsterdam.', type: 'vocabulary' },
    ]);
    expect(chapter.slug).toBe('fluency-challenge');
    expect(chapter.stages).toHaveLength(1);
    const ex = chapter.stages[0]!.exercises[0]!;
    expect(ex.id).toBe('fluency-wonen-0');
    expect(ex.kind).toBe('fluency-challenge');
    expect(ex.automaticitySeconds).toBe(10);
  });
});

describe('createScenarioMission', () => {
  it('builds a mission chapter around a scenario', () => {
    const chapter = createScenarioMission('Een sollicitatiegesprek', [
      { key: 'overtuigen', kind: 'grammar' },
      { key: 'wonen', kind: 'vocabulary' },
    ]);
    expect(chapter.slug).toBe('sandbox-mission');
    expect(chapter.title).toBe('Mission: Een sollicitatiegesprek');
    expect(chapter.stages).toHaveLength(2);
    expect(chapter.stages[1]!.exercises[0]!.kind).toBe('conversation');
    expect(chapter.stages[1]!.exercises[0]!.missionGoals).toHaveLength(2);
  });

  it('skips the preparation stage when there are no concepts', () => {
    const chapter = createScenarioMission('Een feestje', []);
    expect(chapter.stages).toHaveLength(1);
    expect(chapter.stages[0]!.id).toBe('sandbox-mission');
    expect(chapter.stages[0]!.exercises[0]!.kind).toBe('conversation');
  });
});
