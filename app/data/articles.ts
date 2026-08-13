import type { CEFR, Exercise } from '../types/learning'

export interface Article {
  id: string
  title: string
  level: CEFR
  content: string
  source: string
  publishedAt: string
  wordHints: Record<string, { meaning: string, category: string }>
  challenge?: Exercise
}

export const articles: Article[] = [
  {
    id: 'a1-weer',
    title: 'Het weer in Nederland',
    level: 'A1',
    source: 'Eenvoudig Nederlands',
    publishedAt: '2026-08-10',
    content: 'Het is vandaag mooi weer in Nederland. De zon schijnt en het is warm. Veel mensen gaan naar het park. Maar morgen gaat het regenen. Dat is typisch Nederlands!',
    wordHints: {
      'schijnt': { meaning: 'shines', category: 'verb' },
      'morgen': { meaning: 'tomorrow', category: 'adv' },
      'typisch': { meaning: 'typical', category: 'adj' }
    },
    challenge: {
      id: 'a1-weer-challenge',
      kind: 'personalise',
      skills: ['speaking', 'production'],
      prompt: 'Hoe is het weer vandaag bij jou?',
      context: 'Gebruik de woorden: zon, warm of regenen.',
      vocabulary: ['zon', 'warm', 'regenen'],
      grammar: [],
      placeholder: 'Vandaag is het...',
      target: 'Vandaag schijnt de zon en het is warm.'
    }
  },
  {
    id: 'a2-trein',
    title: 'Reizen met de trein',
    level: 'A2',
    source: 'NS Nieuws',
    publishedAt: '2026-08-11',
    content: 'Reizen met de trein is in Nederland erg makkelijk. Er zijn veel treinen tussen de grote steden. Soms is er een vertraging, maar meestal zijn de treinen op tijd. Je hebt een OV-chipkaart nodig om te reizen.',
    wordHints: {
      'makkelijk': { meaning: 'easy', category: 'adj' },
      'vertraging': { meaning: 'delay', category: 'noun' },
      'nodig': { meaning: 'needed', category: 'adj' }
    },
    challenge: {
      id: 'a2-trein-challenge',
      kind: 'conversation',
      skills: ['speaking', 'automaticity'],
      prompt: 'De conducteur vraagt: "Heeft u een vertraging gehad vandaag?"',
      context: 'Answer the conductor. Mention if the train was on time or if there was a delay.',
      vocabulary: ['vertraging', 'op tijd'],
      grammar: [],
      target: 'Nee, de trein was gelukkig op tijd.'
    }
  },
  {
    id: 'b1-thuiswerken',
    title: 'De toekomst van thuiswerken',
    level: 'B1',
    source: 'Nu.nl (Adapted)',
    publishedAt: '2026-08-12',
    content: 'Steeds meer bedrijven laten hun werknemers thuiswerken. Dit heeft veel voordelen, zoals minder reistijd en een betere balans tussen werk en privé. Echter, sommige mensen missen het contact met hun collega\'s en vinden het lastig om thuis geconcentreerd te blijven.',
    wordHints: {
      'werknemers': { meaning: 'employees', category: 'noun' },
      'voordelen': { meaning: 'advantages', category: 'noun' },
      'echter': { meaning: 'however', category: 'adv' },
      'lastig': { meaning: 'difficult/tricky', category: 'adj' }
    },
    challenge: {
      id: 'b1-thuiswerken-challenge',
      kind: 'challenge',
      skills: ['writing', 'production'],
      prompt: 'Wat vind jij van thuiswerken?',
      context: 'Summarize one advantage and one disadvantage mentioned in the article.',
      vocabulary: ['voordelen', 'werknemers', 'echter', 'lastig'],
      grammar: ['omdat'],
      minimumLength: 15,
      target: 'Thuiswerken heeft voordelen voor werknemers, echter is het soms lastig om geconcentreerd te blijven.'
    }
  },
  {
    id: 'b2-duurzaamheid',
    title: 'Nieuw voorstel voor duurzame energie',
    level: 'B2',
    source: 'NOS',
    publishedAt: '2026-08-13',
    content: 'De regering heeft gisteren een ambitieus voorstel ingediend om de transitie naar duurzame energie te versnellen. Het plan bevat maatregelen om het gebruik van fossiele brandstoffen drastisch te verminderen. Critici beweren echter dat de kosten voor burgers te hoog zullen uitvallen, terwijl voorstanders wijzen op de noodzaak van klimaatactie.',
    wordHints: {
      'voorstel': { meaning: 'proposal', category: 'noun' },
      'ingediend': { meaning: 'submitted', category: 'verb (past part)' },
      'versnellen': { meaning: 'to accelerate', category: 'verb' },
      'drastisch': { meaning: 'drastically', category: 'adv' },
      'beweren': { meaning: 'to claim', category: 'verb' },
      'voorstanders': { meaning: 'proponents', category: 'noun' }
    },
    challenge: {
      id: 'b2-duurzaamheid-challenge',
      kind: 'flexibility',
      skills: ['writing', 'grammar'],
      prompt: 'Herschrijf deze zin: "Critici beweren echter dat de kosten te hoog zijn."',
      context: 'Gebruik het woord "hoewel" om dezelfde betekenis uit te drukken.',
      requiredWords: ['hoewel'],
      forbiddenWords: ['echter'],
      vocabulary: ['beweren', 'kosten'],
      grammar: ['subordinate clauses'],
      target: 'Hoewel voorstanders blij zijn, beweren critici dat de kosten te hoog zijn.'
    }
  }
]
