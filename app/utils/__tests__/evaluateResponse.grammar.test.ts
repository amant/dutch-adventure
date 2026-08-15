import { describe, it, expect } from 'vitest';
import type { Exercise } from '~/types/learning';
import { evaluateResponse } from '~/utils/evaluateResponse';

function makeExercise(overrides: Partial<Exercise> = {}): Exercise {
  return {
    id: 'grammar-test',
    kind: 'typed',
    prompt: 'Write the sentence.',
    skills: ['production'],
    ...overrides,
  };
}

// Each answer below triggers one specific grammar-check helper in the generic
// typed flow. Targets are deliberately unrelated so earlier checks never match.
describe('evaluateResponse generic grammar checks', () => {
  it('flags missing inversion after a time adverb', () => {
    const fb = evaluateResponse(makeExercise(), 'gisteren ik ging naar huis');
    expect(fb.outcome).toBe('retry');
    expect(fb.miniLesson?.title).toBe('Inversion (Word Order)');
    expect(fb.skills).toContain('automaticity');
  });

  it('flags hypothetical als without zou/had/was', () => {
    const fb = evaluateResponse(makeExercise(), 'als ik rijk ben');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.miniLesson?.title).toContain('Hypothetical');
  });

  it('flags indirect questions using als instead of of', () => {
    const fb = evaluateResponse(makeExercise(), 'hij vroeg als ik had gebeld');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.miniLesson?.title).toContain('Indirect Questions');
  });

  it('flags alles dat instead of alles wat', () => {
    const fb = evaluateResponse(makeExercise(), 'alles dat goed is');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.miniLesson?.title).toBe('Relative Pronoun "Wat"');
  });

  it('flags het-words paired with die', () => {
    const fb = evaluateResponse(makeExercise(), 'het rapport die we zagen');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('het-word');
  });

  it('flags de-words paired with dat', () => {
    const fb = evaluateResponse(makeExercise(), 'de manager dat hier werkt');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('de-word');
  });

  it('flags modal verbs incorrectly followed by te', () => {
    const fb = evaluateResponse(makeExercise(), 'ik moet te werken');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.miniLesson?.title).toContain('Modal Verbs');
  });

  it('flags hoeven used without te', () => {
    const fb = evaluateResponse(makeExercise(), 'je hoeft niet wachten');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.miniLesson?.title).toContain('Hoeven');
  });

  it('flags perception verbs with a participle instead of a double infinitive', () => {
    const fb = evaluateResponse(makeExercise(), 'ik heb hem gehoord praten');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('horen');
  });

  it('flags instruction verbs with a participle instead of a double infinitive', () => {
    const fb = evaluateResponse(makeExercise(), 'hij heeft me geleerd zwemmen');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('leren');
  });

  it('flags motion verbs with zijn + participle + infinitive', () => {
    const fb = evaluateResponse(makeExercise(), 'zij is gebleven slapen');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('blijven');
  });

  it('flags ondanks followed by a subject pronoun', () => {
    const fb = evaluateResponse(makeExercise(), 'ondanks hij moe was ging hij door');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.miniLesson?.title).toContain('Ondanks');
  });

  it('flags concessive al without verb-first inversion', () => {
    const fb = evaluateResponse(makeExercise(), 'al het regent we gaan wandelen');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.miniLesson?.title).toContain('Al');
  });

  it('flags hoe-comparison missing ook', () => {
    const fb = evaluateResponse(makeExercise(), 'hoe moeilijk het is we geven niet op');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.miniLesson?.title).toContain('Correlative Concession');
  });

  it('flags weliswaar without a balancing maar', () => {
    const fb = evaluateResponse(makeExercise(), 'het voorstel is weliswaar duur');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('Weliswaar');
  });

  it('flags te before separable gerundive verbs', () => {
    const fb = evaluateResponse(makeExercise(), 'de te oplossen problemen');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toMatch(/separable verbs/i);
  });

  it('flags uninflected attributive present participles', () => {
    const fb = evaluateResponse(makeExercise(), 'de stijgend kosten');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('-e');
  });

  it('flags present participles without leading al', () => {
    const fb = evaluateResponse(makeExercise(), 'wandelend door het park dacht hij na');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('Al');
  });

  it('flags gelet with the wrong preposition', () => {
    const fb = evaluateResponse(makeExercise(), 'gelet aan de recente ontwikkelingen');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('Gelet op');
  });

  it('flags teneinde without te', () => {
    const fb = evaluateResponse(makeExercise(), 'teneinde de kwaliteit waarborgen we');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('teneinde');
  });

  it('flags dermate without dat', () => {
    const fb = evaluateResponse(makeExercise(), 'de vraag steeg dermate snel');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('dat');
  });

  it('flags opdat clauses with non-final verbs', () => {
    const fb = evaluateResponse(makeExercise(), 'opdat we kunnen incidenten voorkomen');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.miniLesson?.title).toContain('Opdat');
  });

  it('flags doordat clauses with non-final verbs', () => {
    const fb = evaluateResponse(makeExercise(), 'doordat de stroom viel plotseling uit');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('doordat');
  });

  it('flags niet alleen without maar ook', () => {
    const fb = evaluateResponse(makeExercise(), 'niet alleen de kosten stijgen maar de kwaliteit daalt');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.miniLesson?.title).toContain('Niet Alleen');
  });

  it('flags double negation with noch', () => {
    const fb = evaluateResponse(makeExercise(), 'noch de manager niet was aanwezig');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('Noch');
  });

  it('flags zowel without als', () => {
    const fb = evaluateResponse(makeExercise(), 'zowel het team en de directie');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('als');
  });

  it('flags op voorwaarde missing dat', () => {
    const fb = evaluateResponse(makeExercise(), 'op voorwaarde we de targets halen');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.miniLesson?.title).toContain('Op Voorwaarde');
  });

  it('flags subclause word order after mits', () => {
    const fb = evaluateResponse(makeExercise(), 'mits het budget blijft binnen de perken');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.miniLesson?.title).toContain('Verb-Final');
  });

  it('flags missing reflexive pronoun', () => {
    const fb = evaluateResponse(makeExercise(), 'ik voel goed');
    expect(fb.outcome).toBe('retry');
    expect(fb.miniLesson?.title).toContain('Reflexive Verbs');
  });

  it('flags twijfelen with the wrong fixed preposition', () => {
    const fb = evaluateResponse(makeExercise(), 'ik twijfel over zijn eerlijkheid');
    expect(fb.outcome).toBe('acceptable');
    expect(fb.message).toContain('twijfelen');
  });

  it('flags rekening houden with the wrong preposition', () => {
    const fb = evaluateResponse(makeExercise(), 'wij moeten rekening houden voor vertragingen');
    expect(fb.outcome).toBe('acceptable');
  });

  it('flags wachten with the wrong fixed preposition', () => {
    const fb = evaluateResponse(makeExercise(), 'ik wil wachten voor de bus');
    expect(fb.outcome).toBe('retry');
    expect(fb.miniLesson?.title).toContain('Fixed Prepositions');
  });

  it('flags perfect tense with hebben instead of zijn', () => {
    const fb = evaluateResponse(makeExercise(), 'ik heb gegaan');
    expect(fb.outcome).toBe('retry');
    expect(fb.miniLesson?.title).toContain('Zijn vs Hebben');
  });

  it('flags unsplit separable verbs in main clauses', () => {
    const fb = evaluateResponse(
      makeExercise({ target: 'Ik maak de kamer schoon.' }),
      'Ik wil de kamer schoonmaken.',
    );
    expect(fb.outcome).toBe('retry');
    expect(fb.miniLesson?.title).toContain('Separable Verbs');
  });

  it('flags omdat clauses with non-final verbs', () => {
    const fb = evaluateResponse(makeExercise(), 'omdat hij heeft honger');
    expect(fb.outcome).toBe('retry');
    expect(fb.miniLesson?.title).toContain('Subordinate Clauses');
  });

  it('flags hoewel clauses with non-final verbs', () => {
    const fb = evaluateResponse(makeExercise(), 'hoewel ik heb honger');
    expect(fb.outcome).toBe('retry');
    expect(fb.miniLesson?.title).toContain('Subordinate Clauses');
  });

  it('flags het with a de-word', () => {
    const fb = evaluateResponse(makeExercise(), 'het man loopt');
    expect(fb.outcome).toBe('retry');
    expect(fb.miniLesson?.title).toContain('De vs Het');
  });

  it('flags de with a het-word', () => {
    const fb = evaluateResponse(makeExercise(), 'de kind speelt');
    expect(fb.outcome).toBe('retry');
    expect(fb.miniLesson?.title).toContain('De vs Het');
  });

  it('flags uninflected adjectives before de-words', () => {
    const fb = evaluateResponse(makeExercise(), 'een mooi man');
    expect(fb.outcome).toBe('retry');
    expect(fb.miniLesson?.title).toContain('Adjective Endings');
  });

  it('returns a generic retry for unrelated wrong answers', () => {
    const fb = evaluateResponse(makeExercise({ target: 'Ik woon in Amsterdam.' }), 'de kat slaapt');
    expect(fb.outcome).toBe('retry');
    expect(fb.correction).toBeUndefined();
  });
});
