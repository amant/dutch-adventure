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
      kind: 'summary-challenge',
      skills: ['writing', 'production', 'coherence'],
      prompt: 'Vat het artikel over thuiswerken kort samen.',
      context: 'Zorg ervoor dat je de belangrijkste voordelen en nadelen noemt.',
      summaryPoints: [
        { id: 'p1', label: 'Minder reistijd', keywords: ['minder reistijd', 'reistijd', 'geen reistijd'] },
        { id: 'p2', label: 'Betere balans', keywords: ['balans', 'werk en privé', 'privé'] },
        { id: 'p3', label: 'Contact met collega\'s', keywords: ['contact', 'collega', 'collega\'s', 'missen'] }
      ],
      vocabulary: ['voordelen', 'werknemers', 'echter', 'lastig'],
      grammar: ['omdat'],
      minimumLength: 20,
      target: 'Thuiswerken heeft voordelen voor werknemers, zoals minder reistijd en een betere balans, maar men mist soms het contact met collega\'s.'
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
      kind: 'summary-challenge',
      skills: ['writing', 'grammar', 'coherence'],
      prompt: 'Vat het voorstel voor duurzame energie samen en noem de verschillende standpunten.',
      context: 'Identificeer het doel van de regering, het argument van critici en de mening van voorstanders.',
      summaryPoints: [
        { id: 's1', label: 'Transitie versnellen', keywords: ['transitie', 'versnellen', 'voorstel', 'duurzame energie'] },
        { id: 's2', label: 'Hoge kosten', keywords: ['kosten', 'burgers', 'te hoog', 'duur'] },
        { id: 's3', label: 'Noodzaak klimaatactie', keywords: ['noodzaak', 'klimaatactie', 'klimaat', 'actie'] }
      ],
      vocabulary: ['beweren', 'kosten', 'voorstel', 'versnellen'],
      grammar: ['subordinate clauses'],
      minimumLength: 30,
      target: 'De regering wil de transitie naar duurzame energie versnellen. Hoewel critici wijzen op de hoge kosten voor burgers, benadrukken voorstanders de noodzaak van klimaatactie.'
    }
  }
]
