import { describe, it, expect } from 'vitest';
import { evaluateGrammarDrills } from '~/utils/evaluateGrammarDrills';
import { makeExercise, makeInput } from './evaluationTestUtils';

describe('evaluateGrammarDrills', () => {
  it('returns undefined for kinds it does not handle', () => {
    const input = makeInput(makeExercise({ kind: 'typed', target: 'Ik woon in Amsterdam.' }), 'Ik woon in Amsterdam.');
    expect(evaluateGrammarDrills(input)).toBeUndefined();
  });

  describe('relative-clause-drill', () => {
    const ex = () => makeExercise({
      kind: 'relative-clause-drill',
      target: 'Het boek dat wij lezen is nieuw.',
      relativeClauseData: { mainClause: 'Het boek is nieuw.', subordinateInfo: 'We lezen het boek.', antecedent: 'boek', antecedentType: 'het-word' },
    });

    it('accepts the exact relative clause', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'Het boek dat wij lezen is nieuw.'))!;
      expect(fb.outcome).toBe('correct');
      expect(fb.skills).toEqual(expect.arrayContaining(['production', 'grammar']));
      expect(fb.changeModifier).toBe(20);
    });

    it('flags a wrong relative pronoun', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'het boek die wij lezen is nieuw'))!;
      expect(fb.outcome).toBe('acceptable');
      expect(fb.miniLesson?.title).toContain('Relative Pronouns');
    });

    it('flags non-final verbs in the relative clause', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'de man die hij is aardig'))!;
      expect(fb.outcome).toBe('retry');
      expect(fb.message).toContain('end of the clause');
    });

    it('accepts a near-miss relative clause', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'het boek dat we lezen is nieuw'))!;
      expect(fb.outcome).toBe('acceptable');
    });

    it('rejects a completely different answer', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'helemaal iets anders nu'))!;
      expect(fb.outcome).toBe('retry');
    });
  });

  describe('infinitive-drill', () => {
    const ex = () => makeExercise({
      kind: 'infinitive-drill',
      target: 'Het is belangrijk om te blijven.',
      infinitiveData: { mainClause: 'Het is belangrijk.', infinitiveAction: 'te blijven', constructionType: 'adjective-om-te' },
    });

    it('accepts the exact infinitive clause', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'Het is belangrijk om te blijven.'))!;
      expect(fb.outcome).toBe('correct');
      expect(fb.changeModifier).toBe(20);
    });

    it('flags a modal verb followed by "te"', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'ik moet te werken'))!;
      expect(fb.outcome).toBe('acceptable');
      expect(fb.miniLesson?.title).toContain('Modal Verbs');
    });

    it('accepts a near-miss infinitive clause', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'Het is belangrijk om blijven.'))!;
      expect(fb.outcome).toBe('acceptable');
    });

    it('rejects a completely different answer', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'volkomen fout antwoord'))!;
      expect(fb.outcome).toBe('retry');
    });
  });

  describe('double-infinitive-drill', () => {
    const ex = () => makeExercise({
      kind: 'double-infinitive-drill',
      target: 'Ik heb hem laten komen.',
      doubleInfinitiveData: { sentenceContext: 'c', auxiliary: 'hebben', governingVerb: 'laten', governingType: 'causative-laten', mainVerb: 'komen' },
    });

    it('accepts the exact double infinitive construction', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'Ik heb hem laten komen.'))!;
      expect(fb.outcome).toBe('correct');
      expect(fb.changeModifier).toBe(20);
    });

    it('flags a participle used where a double infinitive is required', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'ik heb hem gehoord praten'))!;
      expect(fb.outcome).toBe('acceptable');
      expect(fb.miniLesson?.title).toContain('Perception Verbs');
    });

    it('accepts a near-miss construction', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'ik heb hen laten komen'))!;
      expect(fb.outcome).toBe('acceptable');
    });

    it('rejects a completely different answer', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'iets compleet anders'))!;
      expect(fb.outcome).toBe('retry');
    });
  });

  describe('concession-drill', () => {
    const ex = () => makeExercise({
      kind: 'concession-drill',
      target: 'Hoewel het regent, gaan we wandelen.',
      concessionData: { triggerType: 'hoewel-ofschoon', premiseA: 'het regent', contrastB: 'we gaan wandelen' },
    });

    it('accepts the exact concessive sentence', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'Hoewel het regent, gaan we wandelen.'))!;
      expect(fb.outcome).toBe('correct');
      expect(fb.changeModifier).toBe(20);
    });

    it('flags non-final verbs in the concessive clause', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'hoewel ik heb honger'))!;
      expect(fb.outcome).toBe('acceptable');
      expect(fb.miniLesson?.title).toContain('Concessive');
    });

    it('accepts a near-miss concessive sentence', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'hoewel het regent gaan wij wandelen'))!;
      expect(fb.outcome).toBe('acceptable');
    });

    it('rejects a completely different answer', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'niets nuttigs'))!;
      expect(fb.outcome).toBe('retry');
    });
  });

  describe('participial-drill', () => {
    const ex = () => makeExercise({
      kind: 'participial-drill',
      target: 'De uit te voeren plannen.',
      participialData: { triggerType: 'gerundive-modal', baseClause: 'Het plan wordt uitgevoerd.' },
    });

    it('accepts the exact participial construction', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'De uit te voeren plannen.'))!;
      expect(fb.outcome).toBe('correct');
      expect(fb.changeModifier).toBe(20);
    });

    it('flags a separable verb without the "te" infix', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'de te oplossen problemen'))!;
      expect(fb.outcome).toBe('acceptable');
      expect(fb.miniLesson?.title).toContain('Gerundive');
    });

    it('accepts a near-miss participial construction', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'de uit te voeren plannen nu'))!;
      expect(fb.outcome).toBe('acceptable');
    });

    it('rejects a completely different answer', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'gewoon iets'))!;
      expect(fb.outcome).toBe('retry');
    });
  });

  describe('correlative-drill', () => {
    const ex = () => makeExercise({
      kind: 'correlative-drill',
      target: 'Ik drink zowel koffie als thee.',
      correlativeData: { pairType: 'zowel-als', premiseA: 'koffie', premiseB: 'thee' },
    });

    it('accepts the exact correlative sentence', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'Ik drink zowel koffie als thee.'))!;
      expect(fb.outcome).toBe('correct');
      expect(fb.changeModifier).toBe(20);
    });

    it('flags "zowel ... en" as an anglicism', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'zowel het team en de directie'))!;
      expect(fb.outcome).toBe('acceptable');
      expect(fb.miniLesson?.title).toContain('Zowel ... Als');
    });

    it('accepts a near-miss correlative sentence', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'ik drink zowel koffie als thee lekker'))!;
      expect(fb.outcome).toBe('acceptable');
    });

    it('rejects a completely different answer', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'iets heel anders'))!;
      expect(fb.outcome).toBe('retry');
    });
  });

  describe('conditional-drill', () => {
    const ex = () => makeExercise({
      kind: 'conditional-drill',
      target: 'We gaan akkoord mits de kosten binnen budget blijven.',
      conditionalData: { conditionType: 'mits', mainPremise: 'we gaan akkoord', conditionPremise: 'de kosten blijven binnen budget' },
    });

    it('accepts the exact conditional sentence', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'We gaan akkoord mits de kosten binnen budget blijven.'))!;
      expect(fb.outcome).toBe('correct');
      expect(fb.changeModifier).toBe(20);
    });

    it('flags "tenzij" when the exercise requires "mits"', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'We gaan akkoord tenzij de kosten binnen budget blijven.'))!;
      expect(fb.outcome).toBe('acceptable');
      expect(fb.miniLesson?.title).toContain('Mits vs Tenzij');
    });

    it('flags non-final verbs after "mits"', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'mits het budget blijft binnen de perken'))!;
      expect(fb.outcome).toBe('acceptable');
    });

    it('accepts a near-miss conditional sentence', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'we gaan akkoord mits de kosten binnen het budget blijven'))!;
      expect(fb.outcome).toBe('acceptable');
    });

    it('rejects a completely different answer', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'volledig anders'))!;
      expect(fb.outcome).toBe('retry');
    });
  });

  describe('causality-drill', () => {
    const ex = () => makeExercise({
      kind: 'causality-drill',
      target: 'Doordat het regende, bleven we binnen.',
      causalityData: { relationType: 'doordat-oorzaak', premiseOrCause: 'het regende', resultOrAction: 'bleven we binnen' },
    });

    it('accepts the exact causal sentence', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'Doordat het regende, bleven we binnen.'))!;
      expect(fb.outcome).toBe('correct');
      expect(fb.changeModifier).toBe(20);
    });

    it('flags non-final verbs after "doordat"', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'doordat de stroom viel plotseling uit'))!;
      expect(fb.outcome).toBe('acceptable');
      expect(fb.miniLesson?.title).toContain('Subclause Word Order');
    });

    it('accepts a near-miss causal sentence', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'doordat het regende bleven wij binnen'))!;
      expect(fb.outcome).toBe('acceptable');
    });

    it('rejects a completely different answer', () => {
      const fb = evaluateGrammarDrills(makeInput(ex(), 'gewoon een ander antwoord'))!;
      expect(fb.outcome).toBe('retry');
    });
  });
});
