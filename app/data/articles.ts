import type { CEFR } from '../types/learning'

export interface Article {
  id: string
  title: string
  level: CEFR
  content: string
  source: string
  publishedAt: string
  wordHints: Record<string, { meaning: string, category: string }>
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
    }
  }
]
