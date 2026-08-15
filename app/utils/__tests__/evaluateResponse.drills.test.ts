import { describe, it, expect } from 'vitest';
import type { Exercise } from '~/types/learning';
import { evaluateResponse } from '~/utils/evaluateResponse';

function makeExercise(overrides: Partial<Exercise> = {}): Exercise {
  return {
    id: 'drill-test',
    kind: 'typed',
    prompt: 'Write the sentence.',
    skills: ['production'],
    ...overrides,
  };
}

describe('evaluateResponse drill kinds', () => {
  it('morphing-drill: marks each step correct and the final step specially', () => {
    const ex = makeExercise({
      kind: 'morphing-drill',
      morphingData: {
        baseSentence: 'Ik loop naar de winkel.',
        steps: [
          { instruction: 'Maak er verleden tijd van.', target: 'Ik liep naar de winkel.' },
          { instruction: 'Maak de zin vragend.', target: 'Liep ik naar de winkel?' },
        ],
      },
    });

    const stepOne = evaluateResponse(ex, 'Ik liep naar de winkel.', { morphingStepIndex: 0 });
    expect(stepOne.outcome).toBe('correct');
    expect(stepOne.message).toContain('Step correct');

    const final = evaluateResponse(ex, 'Liep ik naar de winkel?', { morphingStepIndex: 1 });
    expect(final.outcome).toBe('correct');
    expect(final.message).toContain('Final morph complete');

    const wrong = evaluateResponse(ex, 'Ik loop naar de winkel.', { morphingStepIndex: 0 });
    expect(wrong.outcome).toBe('retry');
  });

  it('mediation: partial and missing point outcomes', () => {
    const ex = makeExercise({
      kind: 'mediation',
      mediationPoints: [
        { id: 'p1', label: 'Noem het probleem', keywords: ['probleem'] },
        { id: 'p2', label: 'Noem de oplossing', keywords: ['oplossing'] },
      ],
    });

    const partial = evaluateResponse(ex, 'het probleem is groot');
    expect(partial.outcome).toBe('acceptable');
    expect(partial.mediationPointsAchieved).toEqual(['p1']);

    const none = evaluateResponse(ex, 'niets over het onderwerp');
    expect(none.outcome).toBe('retry');
  });

  it('correction-challenge: all fixes correct or some remaining', () => {
    const ex = makeExercise({
      kind: 'correction-challenge',
      correctionData: {
        originalText: 'Ik ben moe.',
        mistakes: [
          { segment: 'een fout', correction: 'de correcte', explanation: 'fout1' },
          { segment: 'nog een fout', correction: 'nog een correcte', explanation: 'fout2' },
        ],
      },
    });

    const allFixed = evaluateResponse(ex, 'de correcte is hier gebruikt en nog een correcte');
    expect(allFixed.outcome).toBe('correct');

    const partial = evaluateResponse(ex, 'de correcte is hier gebruikt');
    expect(partial.outcome).toBe('retry');
    expect(partial.message).toContain('fixed 1 out of 2');
  });

  it('circumlocution: forbidden word, missing keyword, too short, and success', () => {
    const ex = makeExercise({
      kind: 'circumlocution',
      circumlocutionData: { concept: 'fiets', requiredKeywords: ['twee', 'wielen'] },
      forbiddenWords: ['fiets'],
      minimumLength: 25,
    });

    expect(evaluateResponse(ex, 'de fiets staat buiten').outcome).toBe('retry');
    expect(evaluateResponse(ex, 'een ding met twee').outcome).toBe('retry');

    const short = evaluateResponse(ex, 'twee wielen maar kort');
    expect(short.outcome).toBe('retry');

    const good = evaluateResponse(ex, 'een voertuig met twee wielen waar je op trapt en snel mee reist');
    expect(good.outcome).toBe('correct');
  });

  it('nuance-drill: requires a modal particle', () => {
    const ex = makeExercise({ kind: 'nuance-drill' });

    expect(evaluateResponse(ex, 'ik kom').outcome).toBe('retry');

    const withParticle = evaluateResponse(ex, 'ik kom wel even langs');
    expect(withParticle.outcome).toBe('correct');
    expect(withParticle.pragmaticScore).toBe(85);
  });

  it('collocation-drill: exact, forbidden, and generic outcomes', () => {
    const ex = makeExercise({
      kind: 'collocation-drill',
      target: 'een besluit nemen',
      forbiddenWords: ['besluit maken'],
    });

    expect(evaluateResponse(ex, 'een besluit nemen').outcome).toBe('correct');
    expect(evaluateResponse(ex, 'ik wil een besluit maken').outcome).toBe('retry');
    expect(evaluateResponse(ex, 'volledig ander antwoord').outcome).toBe('retry');
  });

  it('understatement-drill: direct praise, understatement, and neutral', () => {
    const ex = makeExercise({ kind: 'understatement-drill' });

    expect(evaluateResponse(ex, 'dat is geweldig').outcome).toBe('retry');
    const under = evaluateResponse(ex, 'dat valt wel mee');
    expect(under.outcome).toBe('correct');
    expect(under.pragmaticScore).toBe(90);

    const neutral = evaluateResponse(ex, 'ik zie het wel');
    expect(neutral.outcome).not.toBe('correct');
  });

  it('cohesion-drill: exact paragraph or retry', () => {
    const ex = makeExercise({ kind: 'cohesion-drill', target: 'Eerst regent het, daarna schijnt de zon.' });

    expect(evaluateResponse(ex, 'Eerst regent het, daarna schijnt de zon.').outcome).toBe('correct');

    const wrong = evaluateResponse(ex, 'daarna regent het eerst');
    expect(wrong.outcome).toBe('retry');
  });
});

it('summary-challenge: all points captured or retry with missing labels', () => {
  const ex = makeExercise({
    kind: 'summary-challenge',
    summaryPoints: [
      { id: 's1', label: 'het probleem', keywords: ['probleem'] },
      { id: 's2', label: 'de oorzaak', keywords: ['oorzaak'] },
    ],
  });

  expect(evaluateResponse(ex, 'het probleem heeft een duidelijke oorzaak').outcome).toBe('correct');

  const missing = evaluateResponse(ex, 'alleen het probleem');
  expect(missing.outcome).toBe('retry');
  expect(missing.message).toContain('de oorzaak');
});

it('er-drill: correct option or retry', () => {
  const ex = makeExercise({
    kind: 'er-drill',
    erDrillData: {
      sentence: 'Ik woon in Amsterdam.',
      options: [
        { text: 'Ik woon er al tien jaar.', isCorrect: true },
        { text: 'Ik woon in er.', isCorrect: false },
      ],
    },
  });

  expect(evaluateResponse(ex, 'Ik woon er al tien jaar.').outcome).toBe('correct');
  expect(evaluateResponse(ex, 'Ik woon in er.').outcome).toBe('retry');
});

it('pronominal-drill: correct combination or retry', () => {
  const ex = makeExercise({
    kind: 'pronominal-drill',
    pronominalData: { sentence: 'Ik denk aan het boek.', preposition: 'aan', object: 'het' },
    target: 'Ik denk eraan.',
  });

  const good = evaluateResponse(ex, 'Ik denk eraan.');
  expect(good.outcome).toBe('correct');
  expect(good.skills).toContain('production');

  expect(evaluateResponse(ex, 'Ik denk aan het.').outcome).toBe('retry');
});

it('passive-drill: exact, er-passive, missing agent', () => {
  const processEx = makeExercise({
    kind: 'passive-drill',
    passiveData: { activeSentence: 'De kok bereidt het eten.', focus: 'process', agent: 'de kok' },
    target: 'Het eten wordt door de kok bereid.',
  });

  expect(evaluateResponse(processEx, 'Het eten wordt door de kok bereid.').outcome).toBe('correct');

  const noAgent = evaluateResponse(processEx, 'Het eten wordt bereid.');
  expect(noAgent.outcome).toBe('acceptable');

  const erEx = makeExercise({
    kind: 'passive-drill',
    passiveData: { activeSentence: 'Men danst hier.', focus: 'er-passive' },
    target: 'Er wordt hier gedanst.',
  });

  expect(evaluateResponse(erEx, 'Wordt hier gedanst.').outcome).toBe('retry');
});

it('nominalisation-drill: exact, contains noun, or retry', () => {
  const ex = makeExercise({
    kind: 'nominalisation-drill',
    nominalisationData: { verbalSentence: 'Het bedrijf groeit.', targetNoun: 'groei' },
    target: 'De groei van het bedrijf is indrukwekkend.',
  });

  expect(evaluateResponse(ex, 'De groei van het bedrijf is indrukwekkend.').outcome).toBe('correct');

  const hasNoun = evaluateResponse(ex, 'de groei is er');
  expect(hasNoun.outcome).toBe('acceptable');

  expect(evaluateResponse(ex, 'het bedrijf groeit snel').outcome).toBe('retry');
});

it('reframing-drill: softeners used, partial, or too direct', () => {
  const ex = makeExercise({
    kind: 'reframing-drill',
    reframingData: {
      bluntSentence: 'Dat is fout.',
      softeningElements: ['misschien', 'zou', 'eventueel'],
      targetContext: 'Professional meeting',
    },
  });

  const full = evaluateResponse(ex, 'misschien zou dit eventueel anders kunnen');
  expect(full.outcome).toBe('correct');
  expect(full.skills).toContain('pragmatic');

  const partial = evaluateResponse(ex, 'misschien is dit anders');
  expect(partial.outcome).toBe('acceptable');

  expect(evaluateResponse(ex, 'dat is fout').outcome).toBe('retry');
});

it('reported-speech-drill: correct, subclause error, and retry', () => {
  const ex = makeExercise({
    kind: 'reported-speech-drill',
    reportedSpeechData: { directQuote: 'Ik kom morgen.', speaker: 'De collega', quoteType: 'statement' },
    target: 'De collega zei dat hij morgen komt.',
  });

  expect(evaluateResponse(ex, 'De collega zei dat hij morgen komt.').outcome).toBe('correct');

  const subErr = evaluateResponse(ex, 'De collega zei dat hij heeft honger');
  expect(subErr.outcome).toBe('retry');
  expect(subErr.miniLesson?.title).toContain('Subordinate Clauses');

  expect(evaluateResponse(ex, 'volledig iets anders').outcome).toBe('retry');
});

it('relative-clause-drill: correct, pronoun error, and retry', () => {
  const ex = makeExercise({
    kind: 'relative-clause-drill',
    relativeClauseData: { mainClause: 'Het boek is nieuw.', subordinateInfo: 'We lezen het boek.', antecedent: 'boek', antecedentType: 'het-word' },
    target: 'Het boek dat wij lezen is nieuw.',
  });

  expect(evaluateResponse(ex, 'Het boek dat wij lezen is nieuw.').outcome).toBe('correct');

  const err = evaluateResponse(ex, 'het boek die wij lezen is nieuw');
  expect(err.outcome).toBe('acceptable');

  expect(evaluateResponse(ex, 'helemaal iets anders nu').outcome).toBe('retry');
});

it('infinitive-drill: correct and retry paths', () => {
  const ex = makeExercise({
    kind: 'infinitive-drill',
    infinitiveData: { mainClause: 'Het is belangrijk.', infinitiveAction: 'te blijven' },
    target: 'Het is belangrijk om te blijven.',
  });

  expect(evaluateResponse(ex, 'Het is belangrijk om te blijven.').outcome).toBe('correct');

  const near = evaluateResponse(ex, 'Het is belangrijk om blijven.');
  expect(['acceptable', 'correct']).toContain(near.outcome);

  expect(evaluateResponse(ex, 'volkomen fout antwoord').outcome).toBe('retry');
});

it('double-infinitive-drill: correct and retry paths', () => {
  const ex = makeExercise({
    kind: 'double-infinitive-drill',
    doubleInfinitiveData: { sentenceContext: 'c', auxiliary: 'hebben', governingVerb: 'laten', mainVerb: 'komen' },
    target: 'Ik heb hem laten komen.',
  });

  expect(evaluateResponse(ex, 'Ik heb hem laten komen.').outcome).toBe('correct');

  const err = evaluateResponse(ex, 'ik heb hem gehoord praten');
  expect(err.outcome).toBe('acceptable');

  expect(evaluateResponse(ex, 'iets compleet anders').outcome).toBe('retry');
});

it('concession-drill: correct, error, and retry paths', () => {
  const ex = makeExercise({
    kind: 'concession-drill',
    concessionData: { triggerType: 'hoewel-ofschoon', premiseA: 'het regent', contrastB: 'we gaan wandelen' },
    target: 'Hoewel het regent, gaan we wandelen.',
  });

  expect(evaluateResponse(ex, 'Hoewel het regent, gaan we wandelen.').outcome).toBe('correct');

  const err = evaluateResponse(ex, 'hoewel ik heb honger');
  expect(err.outcome).toBe('acceptable');

  expect(evaluateResponse(ex, 'niets nuttigs').outcome).toBe('retry');
});

it('participial-drill: correct, error, and retry paths', () => {
  const ex = makeExercise({
    kind: 'participial-drill',
    participialData: { verbalSentence: 'Het plan wordt uitgevoerd.', targetParticiple: 'uit te voeren' },
    target: 'De uit te voeren plannen.',
  });

  expect(evaluateResponse(ex, 'De uit te voeren plannen.').outcome).toBe('correct');

  const err = evaluateResponse(ex, 'de te oplossen problemen');
  expect(err.outcome).toBe('acceptable');

  expect(evaluateResponse(ex, 'gewoon iets').outcome).toBe('retry');
});

it('correlative-drill: correct, error, and retry paths', () => {
  const ex = makeExercise({
    kind: 'correlative-drill',
    correlativeData: { pairType: 'zowel-als', premiseA: 'koffie', premiseB: 'thee' },
    target: 'Ik drink zowel koffie als thee.',
  });

  expect(evaluateResponse(ex, 'Ik drink zowel koffie als thee.').outcome).toBe('correct');

  const err = evaluateResponse(ex, 'zowel het team en de directie');
  expect(err.outcome).toBe('acceptable');

  expect(evaluateResponse(ex, 'iets heel anders').outcome).toBe('retry');
});

it('conditional-drill: correct, mits/tenzij errors, and retry', () => {
  const ex = makeExercise({
    kind: 'conditional-drill',
    conditionalData: { conditionType: 'mits', mainPremise: 'we gaan akkoord', conditionPremise: 'de kosten blijven binnen budget' },
    target: 'We gaan akkoord mits de kosten binnen budget blijven.',
  });

  expect(evaluateResponse(ex, 'We gaan akkoord mits de kosten binnen budget blijven.').outcome).toBe('correct');
  expect(evaluateResponse(ex, 'We gaan akkoord tenzij de kosten binnen budget blijven.').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'mits het budget blijft binnen de perken').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'als u nog vragen mocht hebben').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'voor zover als ik het dossier ken').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'volledig anders').outcome).toBe('retry');
});

it('causality-drill: correct, connector errors, and retry', () => {
  const ex = makeExercise({
    kind: 'causality-drill',
    causalityData: { relationType: 'doordat-oorzaak', premiseOrCause: 'het regende', resultOrAction: 'bleven we binnen' },
    target: 'Doordat het regende, bleven we binnen.',
  });

  expect(evaluateResponse(ex, 'Doordat het regende, bleven we binnen.').outcome).toBe('correct');
  expect(evaluateResponse(ex, 'doordat de stroom viel plotseling uit').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'teneinde de kwaliteit waarborgen we').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'de vraag steeg dermate snel').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'opdat we kunnen incidenten voorkomen').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'gewoon een ander antwoord').outcome).toBe('retry');
});

it('prefix-verb-drill: correct, split errors, and retry', () => {
  const ex = makeExercise({
    kind: 'prefix-verb-drill',
    prefixVerbData: {
      verb: 'voorkomen',
      stressPattern: 'inseparable-stressed-stem',
      stressedForm: 'voorkomen',
      meaningDefinition: 'prevent',
      targetStructure: 'present-main',
    },
    target: 'De arts voorkomt complicaties.',
  });

  expect(evaluateResponse(ex, 'De arts voorkomt complicaties.').outcome).toBe('correct');
  expect(evaluateResponse(ex, 'De arts komt complicaties voor.').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'iets geheel anders').outcome).toBe('retry');
});

it('midfield-drill: correct, TMP error, and retry', () => {
  const ex = makeExercise({
    kind: 'midfield-drill',
    midfieldData: { focusRule: 'tmp-order' },
    target: 'Wij reizen morgen met de trein naar Brussel.',
  });

  expect(evaluateResponse(ex, 'Wij reizen morgen met de trein naar Brussel.').outcome).toBe('correct');
  expect(evaluateResponse(ex, 'Wij reizen naar Brussel met de trein.').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'willekeurig antwoord').outcome).toBe('retry');
});

it('fixed-preposition-drill: correct, regime error, and retry', () => {
  const ex = makeExercise({
    kind: 'fixed-preposition-drill',
    fixedPrepositionData: { governingHead: 'twijfelen', fixedPreposition: 'aan' },
    target: 'Ik twijfel aan zijn eerlijkheid.',
  });

  expect(evaluateResponse(ex, 'Ik twijfel aan zijn eerlijkheid.').outcome).toBe('correct');
  expect(evaluateResponse(ex, 'Ik twijfel over zijn eerlijkheid.').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'gewoon iets anders').outcome).toBe('retry');
});

it('pronominal-splitting-drill: correct, unsplit error, and retry', () => {
  const ex = makeExercise({
    kind: 'pronominal-splitting-drill',
    pronominalSplittingData: { rWord: 'er', preposition: 'over', combined: 'erover', sentence: 'Ik praat erover.' },
    target: 'Ik praat er over.',
  });

  expect(evaluateResponse(ex, 'Ik praat er over.').outcome).toBe('correct');
  expect(evaluateResponse(ex, 'Ik praat erover met hem.').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'iets anders').outcome).toBe('retry');
});

it('aspect-drill: correct, progressive error, and retry', () => {
  const ex = makeExercise({
    kind: 'aspect-drill',
    aspectData: { aspectCategory: 'progressive-aan-het', postureOrAspectVerb: 'zijn', infinitiveAction: 'upgraden', contextPrompt: 'c' },
    target: 'Zij zijn nu het netwerk aan het upgraden.',
  });

  expect(evaluateResponse(ex, 'Zij zijn nu het netwerk aan het upgraden.').outcome).toBe('correct');
  expect(evaluateResponse(ex, 'Zij upgraden nu het netwerk.').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'willekeurig').outcome).toBe('retry');
});

it('modal-particle-drill: correct, missing particle error, and retry', () => {
  const ex = makeExercise({
    kind: 'modal-particle-drill',
    modalParticleData: { particleCluster: 'toch maar', pragmaticFunction: 'concession-toch-maar', stiffOriginalSentence: 'Ik ga.' },
    target: 'Ik ga toch maar.',
  });

  expect(evaluateResponse(ex, 'Ik ga toch maar.').outcome).toBe('correct');
  expect(evaluateResponse(ex, 'Ik ga.').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'iets totaal anders').outcome).toBe('retry');
});

it('topicalisation-drill: correct, fronting error, and retry', () => {
  const ex = makeExercise({
    kind: 'topicalisation-drill',
    topicalisationData: { focusType: 'object-fronting-v2', frontedElement: 'dat boek', baseSentence: 'Ik lees dat boek.' },
    target: 'Dat boek lees ik.',
  });

  expect(evaluateResponse(ex, 'Dat boek lees ik.').outcome).toBe('correct');
  expect(evaluateResponse(ex, 'Ik lees dat boek.').outcome).toBe('acceptable');
  expect(evaluateResponse(ex, 'volslagen anders').outcome).toBe('retry');
});

it('recombination-drill: missing words, too short, and success', () => {
  const ex = makeExercise({ kind: 'recombination-drill', requiredWords: ['hoewel', 'daardoor'] });

  expect(evaluateResponse(ex, 'alleen hoewel').outcome).toBe('retry');
  expect(evaluateResponse(ex, 'hoewel kort').outcome).toBe('retry');

  const good = evaluateResponse(ex, 'hoewel het regende daardoor bleven we thuis vandaag');
  expect(good.outcome).toBe('correct');
});

it('flexibility: forbidden word, missing required word, and success', () => {
  const ex = makeExercise({
    kind: 'flexibility',
    forbiddenWords: ['fiets'],
    requiredWords: ['vervoer'],
  });

  expect(evaluateResponse(ex, 'de fiets is snel').outcome).toBe('retry');
  expect(evaluateResponse(ex, 'vervoer').outcome).toBe('retry');

  const good = evaluateResponse(ex, 'mijn vervoer is een snelle optie voor de stad');
  expect(good.outcome).toBe('correct');
});

it('challenge: too short, repeats prompt, and success', () => {
  const ex = makeExercise({
    kind: 'challenge',
    minimumLength: 8,
    prompt: 'Leg uit waarom',
  });

  expect(evaluateResponse(ex, 'kort').outcome).toBe('retry');
  expect(evaluateResponse(ex, 'leg uit waarom en nog veel meer woorden hier').outcome).toBe('retry');

  const good = evaluateResponse(ex, 'omdat het belangrijk is om duidelijk te zijn');
  expect(good.outcome).toBe('correct');
});

it('pragmatic-drill: best option, okay option, and unknown', () => {
  const ex = makeExercise({
    kind: 'pragmatic-drill',
    pragmaticOptions: [
      { text: 'Zou u dat kunnen herhalen?', context: 'c', isBest: true, explanation: 'e' },
      { text: 'Wat?', context: 'c', isBest: false, explanation: 'e' },
    ],
  });

  expect(evaluateResponse(ex, 'Zou u dat kunnen herhalen?').outcome).toBe('correct');
  expect(evaluateResponse(ex, 'Wat?').outcome).toBe('acceptable');
});

it('personalise: uses the language to talk about yourself', () => {
  const ex = makeExercise({
    kind: 'personalise',
    vocabulary: ['wonen'],
    grammar: [],
    minimumLength: 5,
  });

  expect(evaluateResponse(ex, 'ik woon in een klein dorp').outcome).toBe('correct');
});

it('conversation: flags achieved mission goals', () => {
  const ex = makeExercise({
    kind: 'conversation',
    missionGoals: [
      { id: 'g1', label: 'Gebruik overtuigen', keywords: ['overtuigen'] },
      { id: 'g2', label: 'Noem een oplossing', keywords: ['oplossing'], setRegister: 'informal' },
    ],
  });

  const fb = evaluateResponse(ex, 'ik wil je overtuigen met een oplossing');
  expect(fb.achievedGoalIds).toEqual(['g1', 'g2']);
  expect(fb.requiredRegister).toBe('informal');
});

it('empty typed answers and info/reading kinds shortcut evaluation', () => {
  const empty = evaluateResponse(makeExercise({ kind: 'typed' }), '');
  expect(empty.outcome).toBe('retry');
  expect(empty.message).toBe('Type an answer to try it.');

  const info = evaluateResponse(makeExercise({ kind: 'info' }), 'whatever');
  expect(info.outcome).toBe('correct');

  const reading = evaluateResponse(makeExercise({ kind: 'reading' }), 'whatever');
  expect(reading.outcome).toBe('correct');
});

it('isSpeaking context boosts speaking skills', () => {
  const fb = evaluateResponse(
    makeExercise({ target: 'Ik woon in Amsterdam.' }),
    'Ik woon in Amsterdam.',
    { isSpeaking: true },
  );
  expect(fb.skills).toEqual(expect.arrayContaining(['speaking', 'automaticity']));
});

it('boosts pragmatic score and feedback for softeners and fillers', () => {
  const fb = evaluateResponse(makeExercise(), 'ik wil graag even komen');
  expect(fb.outcome).toBe('correct');
  expect(fb.pragmaticScore).toBeGreaterThan(85);
  expect(fb.pragmaticFeedback).toContain('softeners');
});

it('lowers the pragmatic score for stiff phrasing', () => {
  const fb = evaluateResponse(makeExercise(), 'ik wil koffie');
  expect(fb.outcome).toBe('correct');
  expect(fb.pragmaticScore).toBeLessThan(70);
  expect(fb.pragmaticFeedback).toContain('stiff');
});

it('adds coherence skill when logical connectors are used', () => {
  const fb = evaluateResponse(makeExercise(), 'daarnaast is het ook belangrijk');
  expect(fb.skills).toContain('coherence');
  expect(fb.changeModifier).toBeGreaterThanOrEqual(2);
  expect(fb.pragmaticFeedback).toContain('connectors');
});

it('detects idioms from the exercise and adjusts the message', () => {
  const fb = evaluateResponse(
    makeExercise({ target: 'Ik zal met de deur in huis vallen.', idioms: ['met de deur in huis vallen'] }),
    'Ik zal met de deur in huis vallen.',
  );
  expect(fb.outcome).toBe('correct');
  expect(fb.skills).toContain('idiomatic');
  expect(fb.message).toContain('idiom');
});

it('adds a teacher correction when the exercise provides one', () => {
  const fb = evaluateResponse(
    makeExercise({ target: 'Ik woon in Amsterdam.', correction: 'Ik woon in Amsterdam.' }),
    'Ik woon in Amsterdam.',
  );
  expect(fb.teacherCorrection?.natural).toBe('Ik woon in Amsterdam.');
});
