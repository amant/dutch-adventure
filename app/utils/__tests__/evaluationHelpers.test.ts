import { describe, it, expect } from 'vitest';
import {
  normalizeAnswer,
  isSpellingMistake,
  calculateSimilarity,
  editDistance,
  contentWords,
  sharesContentWords,
  checkInversionError,
  checkPerfectTenseError,
  checkSeparableVerbError,
  checkConditionalError,
  checkIndirectQuestionError,
  checkRelativePronounError,
  checkDoubleInfinitiveError,
  checkSubordinateClauseError,
  checkArticleError,
  checkAdjectiveEndingError,
  checkReflexiveError,
  checkFixedPrepositionError,
  checkCoherenceConnectors,
  calculatePragmaticScore,
} from '~/utils/evaluationHelpers';
import { makeExercise } from './evaluationTestUtils';

describe('normalizeAnswer', () => {
  it('lowercases, trims, strips punctuation, and collapses whitespace', () => {
    expect(normalizeAnswer('  Ik, WOON. in? Amsterdam!  ')).toBe('ik woon in amsterdam');
  });
});

describe('isSpellingMistake', () => {
  it('detects a single-character typo against an accepted answer', () => {
    expect(isSpellingMistake('ik woon in amsterdan', ['ik woon in amsterdam'])).toBe(true);
  });

  it('rejects answers that differ by more than two characters', () => {
    expect(isSpellingMistake('de kat slaapt', ['ik woon in amsterdam'])).toBe(false);
  });
});

describe('editDistance / calculateSimilarity', () => {
  it('computes the Levenshtein distance', () => {
    expect(editDistance('kitten', 'sitting')).toBe(3);
    expect(editDistance('zelfde', 'zelfde')).toBe(0);
  });

  it('returns 1.0 for identical strings', () => {
    expect(calculateSimilarity('ik woon in amsterdam', 'ik woon in amsterdam')).toBe(1);
  });

  it('returns a score between 0 and 1 for different strings', () => {
    const score = calculateSimilarity('ik woon in amsterdam', 'ik woon in een huis');
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThan(1);
  });
});

describe('contentWords / sharesContentWords', () => {
  it('drops stopwords and single-character words', () => {
    expect(contentWords('de man fietst vandaag')).toEqual(['man', 'fietst']);
  });

  it('detects shared content words', () => {
    expect(sharesContentWords('ik woon in amsterdam', 'amsterdam is groot')).toBe(true);
  });

  it('returns false when no content word is shared', () => {
    expect(sharesContentWords('ik ga naar huis', 'de kat slaapt')).toBe(false);
  });
});

describe('checkInversionError', () => {
  it('flags a subject that follows a fronted time adverb', () => {
    const result = checkInversionError('gisteren ik ging naar huis');
    expect(result.found).toBe(true);
    if (result.found) expect(result.miniLesson?.title).toContain('Inversion');
  });

  it('passes correct inversion', () => {
    expect(checkInversionError('gisteren ging ik naar huis').found).toBe(false);
  });
});

describe('checkPerfectTenseError', () => {
  it('flags "hebben" with a motion verb', () => {
    const result = checkPerfectTenseError('ik heb gegaan');
    expect(result.found).toBe(true);
    if (result.found) expect(result.miniLesson?.title).toContain('Zijn vs Hebben');
  });

  it('passes "zijn" with a motion verb', () => {
    expect(checkPerfectTenseError('ik ben gegaan').found).toBe(false);
  });
});

describe('checkSeparableVerbError', () => {
  it('flags an unsplit separable verb in a main clause', () => {
    const result = checkSeparableVerbError('ik schoonmaken de kamer', 'ik maak de kamer schoon');
    expect(result.found).toBe(true);
    if (result.found) expect(result.miniLesson?.title).toContain('Separable Verbs');
  });

  it('passes a correctly split separable verb', () => {
    expect(checkSeparableVerbError('ik maak de kamer schoon', 'ik maak de kamer schoon').found).toBe(false);
  });
});

describe('checkConditionalError', () => {
  it('flags hypothetical "als" without zou/had/was', () => {
    const result = checkConditionalError('als ik rijk ben');
    expect(result.found).toBe(true);
    if (result.found) expect(result.miniLesson?.title).toContain('Hypothetical');
  });

  it('prefers "had" over "zou hebben" in an als-clause', () => {
    const result = checkConditionalError('als ik zou hebben');
    expect(result.found).toBe(true);
  });

  it('passes a correct conditional', () => {
    expect(checkConditionalError('als ik rijk was zou ik reizen').found).toBe(false);
  });
});
describe('checkIndirectQuestionError', () => {
  it('flags "als" instead of "of" in an indirect question', () => {
    const result = checkIndirectQuestionError('hij vroeg als ik had gebeld');
    expect(result.found).toBe(true);
    if (result.found) expect(result.miniLesson?.title).toContain('Indirect Questions');
  });

  it('passes "of" in an indirect question', () => {
    expect(checkIndirectQuestionError('hij vroeg of ik had gebeld').found).toBe(false);
  });
});

describe('checkRelativePronounError', () => {
  it('flags "alles dat" instead of "alles wat"', () => {
    const result = checkRelativePronounError('alles dat goed is');
    expect(result.found).toBe(true);
    if (result.found) expect(result.miniLesson?.title).toContain('Relative Pronoun');
  });

  it('flags het-words followed by "die"', () => {
    expect(checkRelativePronounError('het boek die we zagen').found).toBe(true);
  });

  it('flags de-words followed by "dat"', () => {
    expect(checkRelativePronounError('de manager dat hier werkt').found).toBe(true);
  });

  it('passes a correct relative pronoun', () => {
    expect(checkRelativePronounError('alles wat goed is').found).toBe(false);
  });
});

describe('checkDoubleInfinitiveError', () => {
  it('flags a modal participle in a compound tense', () => {
    const result = checkDoubleInfinitiveError('hij heeft gemoeten werken');
    expect(result.found).toBe(true);
    if (result.found) expect(result.miniLesson?.title).toContain('Double Infinitive');
  });

  it('flags "gelaten" with an action verb', () => {
    expect(checkDoubleInfinitiveError('hij heeft de auto gelaten repareren').found).toBe(true);
  });

  it('passes a correct double infinitive', () => {
    expect(checkDoubleInfinitiveError('hij heeft moeten werken').found).toBe(false);
  });
});

describe('checkSubordinateClauseError', () => {
  it('flags verbs that are not final after a conjunction', () => {
    const result = checkSubordinateClauseError('omdat ik heb geen tijd', 'omdat');
    expect(result.found).toBe(true);
    if (result.found) expect(result.miniLesson?.title).toContain('Subordinate Clauses');
  });

  it('passes verb-final subclauses', () => {
    expect(checkSubordinateClauseError('omdat ik geen tijd heb', 'omdat').found).toBe(false);
  });
});

describe('checkArticleError', () => {
  it('flags "het" before a de-word', () => {
    const result = checkArticleError('het man loopt', '');
    expect(result.found).toBe(true);
    if (result.found) expect(result.miniLesson?.title).toContain('De vs Het');
  });

  it('flags "de" before a het-word', () => {
    expect(checkArticleError('de boek ligt hier', '').found).toBe(true);
  });

  it('passes correct articles', () => {
    expect(checkArticleError('de man loopt', '').found).toBe(false);
  });
});

describe('checkAdjectiveEndingError', () => {
  it('flags an adjective without -e before a de-word', () => {
    const result = checkAdjectiveEndingError('een mooi man', '');
    expect(result.found).toBe(true);
    if (result.found) expect(result.miniLesson?.title).toContain('Adjective Endings');
  });

  it('passes inflected adjectives', () => {
    expect(checkAdjectiveEndingError('een mooie man', '').found).toBe(false);
  });
});

describe('checkReflexiveError', () => {
  it('flags a missing reflexive pronoun', () => {
    const result = checkReflexiveError('ik voel goed');
    expect(result.found).toBe(true);
    if (result.found) expect(result.message).toContain('reflexive pronoun');
  });

  it('passes a reflexive pronoun', () => {
    expect(checkReflexiveError('ik voel me goed').found).toBe(false);
  });
});

describe('checkFixedPrepositionError', () => {
  it('flags a wrong fixed preposition', () => {
    const result = checkFixedPrepositionError('ik ben geïnteresseerd voor taal');
    expect(result.found).toBe(true);
    if (result.found) expect(result.message).toContain('always goes with');
  });

  it('passes the correct fixed preposition', () => {
    expect(checkFixedPrepositionError('ik ben geïnteresseerd in taal').found).toBe(false);
  });
});

describe('checkCoherenceConnectors', () => {
  it('collects connectors and scores them', () => {
    const result = checkCoherenceConnectors('bovendien is het belangrijk en daarnaast dus');
    expect(result.found).toEqual(expect.arrayContaining(['bovendien', 'daarnaast', 'dus']));
    expect(result.score).toBe(75);
  });

  it('returns an empty result without connectors', () => {
    expect(checkCoherenceConnectors('hallo wereld')).toEqual({ score: 0, found: [] });
  });
});

describe('calculatePragmaticScore', () => {
  it('rewards softeners', () => {
    const result = calculatePragmaticScore('ik wil graag even komen', makeExercise());
    expect(result.score).toBeGreaterThan(70);
    expect(result.feedback).toContain('softeners');
  });

  it('rewards native particles used as separate words', () => {
    const result = calculatePragmaticScore('dat is wel goed hoor', makeExercise());
    expect(result.score).toBeGreaterThan(70);
    expect(result.feedback).toContain('particles');
  });

  it('penalises stiff phrasing that is not softened', () => {
    const result = calculatePragmaticScore('ik wil koffie', makeExercise());
    expect(result.score).toBeLessThan(70);
    expect(result.feedback).toContain('stiff');
  });

  it('does not penalise softened "ik wil" phrasing', () => {
    const result = calculatePragmaticScore('ik wil graag een kop koffie', makeExercise());
    expect(result.score).toBeGreaterThanOrEqual(90);
  });

  it('clamps the score between 0 and 100', () => {
    expect(calculatePragmaticScore('ik wil ik wil ik wil', makeExercise()).score).toBe(50);
  });
});
