import { describe, it, expect } from 'vitest';
import { evaluateResponse, normalizeAnswer } from '~/utils/evaluateResponse';
import { makeExercise } from './evaluationTestUtils';

describe('normalizeAnswer', () => {
  it('lowercases and trims the input', () => {
    expect(normalizeAnswer('  Ik WOON in Amsterdam  ')).toBe('ik woon in amsterdam');
  });

  it('strips common punctuation', () => {
    expect(normalizeAnswer('Dit, is. een? test!')).toBe('dit is een test');
  });

  it('collapses repeated whitespace', () => {
    expect(normalizeAnswer('ik  ga   nu\tnaar huis')).toBe('ik ga nu naar huis');
  });
});

describe('evaluateResponse pipeline', () => {
  it('normalizes the answer before evaluating', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.' }),
      '  IK WOON IN AMSTERDAM!!!  ',
    );
    expect(fb.outcome).toBe('correct');
  });

  it('returns correct for an exact target match with metadata', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.' }),
      'Ik woon in Amsterdam!',
    );
    expect(fb.outcome).toBe('correct');
    expect(fb.target).toBe('Ik woon in Amsterdam.');
    expect(fb.skills).toContain('production');
  });

  it('accepts answers listed in acceptedAnswers', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.', acceptedAnswers: ['Ik woon in een huis.'] }),
      'ik woon in een huis.',
    );
    expect(fb.outcome).toBe('correct');
  });

  it('returns retry for a wrong answer without post-processing', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.', correction: 'Ik woon in Amsterdam.' }),
      'De kat slaapt',
    );
    expect(fb.outcome).toBe('retry');
    expect(fb.message).toBe('Not quite. Check the word order or spelling and try again.');
    expect(fb.pragmaticScore).toBeUndefined();
    expect(fb.teacherCorrection).toBeUndefined();
    expect(fb.skills).not.toContain('coherence');
    expect(fb.skills).not.toContain('idiomatic');
  });

  it('returns acceptable for a near spelling mistake', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.' }),
      'Ik woon in Amsterdan',
    );
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('spelling');
    expect(fb.skills).toContain('spelling');
  });

  it('applies a negative modifier when time runs out', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.', automaticitySeconds: 4 }),
      'Ik woon in Amsterdam.',
      { timeLeft: 0 },
    );
    expect(fb.outcome).toBe('correct');
    expect(fb.changeModifier).toBe(-5);
  });

  it('applies a positive modifier for fast answers', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.', automaticitySeconds: 4 }),
      'Ik woon in Amsterdam.',
      { timeLeft: 3 },
    );
    expect(fb.outcome).toBe('correct');
    expect(fb.changeModifier).toBe(4);
  });

  it('flags shadowing as correct when closely matched', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.' }),
      'Ik woon in Amsterdam.',
      { isShadowing: true },
    );
    expect(fb.outcome).toBe('correct');
    expect(fb.isShadowing).toBe(true);
    expect(fb.skills).toEqual(expect.arrayContaining(['speaking', 'automaticity']));
  });

  it('flags shadowing as acceptable when partially matched', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.' }),
      'Ik woon Amsterdam',
      { isShadowing: true },
    );
    expect(fb.outcome).toBe('acceptable');
  });

  it('flags shadowing as retry when poorly matched', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik woon in Amsterdam.' }),
      'blauw',
      { isShadowing: true },
    );
    expect(fb.outcome).toBe('retry');
  });

  it('evaluates listening cloze answers', () => {
    const fb = evaluateResponse(
      makeExercise({
        kind: 'listening-cloze',
        clozeData: { textWithGaps: 'De [..] schijnt en het [..].', answers: ['zon', 'regent'] },
      }),
      '',
      { clozeAnswers: ['zon', 'regent'] },
    );
    expect(fb.outcome).toBe('correct');
  });

  it('evaluates listening cloze mistakes', () => {
    const fb = evaluateResponse(
      makeExercise({
        kind: 'listening-cloze',
        clozeData: { textWithGaps: 'De [..] schijnt en het [..].', answers: ['zon', 'regent'] },
      }),
      '',
      { clozeAnswers: ['zon', 'mist'] },
    );
    expect(fb.outcome).toBe('retry');
    expect(fb.message).toContain('You missed 1 word');
  });

  it('scores mediation when all points are covered', () => {
    const fb = evaluateResponse(
      makeExercise({
        kind: 'mediation',
        mediationPoints: [
          { id: 'p1', label: 'Noem het probleem', keywords: ['probleem'] },
          { id: 'p2', label: 'Noem de oplossing', keywords: ['oplossing'] },
        ],
      }),
      'Het probleem is groot maar de oplossing is simpel.',
    );
    expect(fb.outcome).toBe('correct');
    expect(fb.mediationPointsAchieved).toEqual(['p1', 'p2']);
  });

  it('rejects informal language when a formal register is required', () => {
    const fb = evaluateResponse(
      makeExercise({ requiredRegister: 'formal' }),
      'ik wil je helpen',
    );
    expect(fb.outcome).toBe('retry');
    expect(fb.message).toContain('formal register');
  });

  it('rejects mixing formal and informal registers', () => {
    const fb = evaluateResponse(makeExercise(), 'u en je zijn hier');
    expect(fb.outcome).toBe('retry');
    expect(fb.message).toContain('Mixing formal');
  });

  it('accepts personalise answers above minimum length', () => {
    const fb = evaluateResponse(
      makeExercise({ kind: 'personalise', vocabulary: [], grammar: [] }),
      'ik ben moe vandaag',
    );
    expect(fb.outcome).toBe('correct');
  });
});

describe('evaluateResponse post-processing', () => {
  describe('pragmatic analysis', () => {
    it('adds a pragmatic score and feedback for softeners', () => {
      const fb = evaluateResponse(makeExercise(), 'ik wil graag even komen');
      expect(fb.outcome).toBe('correct');
      expect(fb.pragmaticScore).toBe(90);
      expect(fb.pragmaticFeedback).toContain('softeners');
    });

    it('adds the pragmatic skill when the score is above 70', () => {
      const fb = evaluateResponse(makeExercise(), 'ik wil graag even komen');
      expect(fb.pragmaticScore!).toBeGreaterThan(70);
      expect(fb.skills).toContain('pragmatic');
    });

    it('lowers the pragmatic score for stiff phrasing', () => {
      const fb = evaluateResponse(makeExercise(), 'ik wil koffie');
      expect(fb.outcome).toBe('correct');
      expect(fb.pragmaticScore).toBe(50);
      expect(fb.pragmaticFeedback).toContain('stiff');
      expect(fb.skills).not.toContain('pragmatic');
    });

    it('preserves a pragmatic score already computed by the drill handler', () => {
      // nuance-drill sets its own pragmaticScore, evaluateResponse must not overwrite it
      const fb = evaluateResponse(makeExercise({ kind: 'nuance-drill' }), 'ik kom wel even langs');
      expect(fb.outcome).toBe('correct');
      expect(fb.pragmaticScore).toBe(85);
    });
  });

  describe('coherence analysis', () => {
    it('adds the coherence skill, modifier, and feedback for connectors', () => {
      const fb = evaluateResponse(makeExercise(), 'daarnaast is het ook belangrijk');
      expect(fb.skills).toContain('coherence');
      expect(fb.changeModifier).toBe(4); // 2 connectors * 2
      expect(fb.pragmaticFeedback).toContain('connectors');
    });

    it('appends connector feedback to an existing pragmatic feedback', () => {
      const fb = evaluateResponse(makeExercise(), 'ik wil graag even daarnaast komen');
      expect(fb.pragmaticFeedback).toContain('softeners');
      expect(fb.pragmaticFeedback).toContain('connectors');
      expect(fb.skills).toContain('coherence');
    });
  });

  describe('idiom detection', () => {
    it('detects idioms, adds the skill and modifier, and rewrites the message', () => {
      const fb = evaluateResponse(
        makeExercise({ target: 'Ik zal met de deur in huis vallen.', idioms: ['met de deur in huis vallen'] }),
        'Ik zal met de deur in huis vallen.',
      );
      expect(fb.outcome).toBe('correct');
      expect(fb.skills).toContain('idiomatic');
      expect(fb.changeModifier).toBe(15);
      expect(fb.message).toContain('You used the idiom');
    });

    it('does not add the idiomatic skill when the idiom is absent', () => {
      const fb = evaluateResponse(
        makeExercise({ target: 'Ik zal met de deur in huis vallen.', idioms: ['met de deur in huis vallen'] }),
        'Ik zal het niet doen.',
      );
      expect(fb.skills).not.toContain('idiomatic');
    });
  });

  describe('teacher correction', () => {
    it('adds a teacher correction with the default explanation', () => {
      const fb = evaluateResponse(
        makeExercise({ target: 'Ik woon in Amsterdam.', correction: 'Ik woon in Amsterdam.' }),
        'Ik woon in Amsterdam.',
      );
      expect(fb.teacherCorrection?.natural).toBe('Ik woon in Amsterdam.');
      expect(fb.teacherCorrection?.explanation).toBe('Here is how to say it more naturally.');
    });

    it('uses the exercise explanation for the teacher correction', () => {
      const fb = evaluateResponse(
        makeExercise({ target: 'Ik woon in Amsterdam.', correction: 'Ik woon in Amsterdam.', explanation: 'Standaard woordvolgorde.' }),
        'Ik woon in Amsterdam.',
      );
      expect(fb.teacherCorrection?.explanation).toBe('Standaard woordvolgorde.');
    });

    it('omits the teacher correction when the answer is retry', () => {
      const fb = evaluateResponse(
        makeExercise({ target: 'Ik woon in Amsterdam.', correction: 'Ik woon in Amsterdam.' }),
        'De kat slaapt',
      );
      expect(fb.teacherCorrection).toBeUndefined();
    });
  });
});
