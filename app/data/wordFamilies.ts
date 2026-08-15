export interface WordFamily {
  id: string;
  root: string;
  members: { word: string; role: 'verb' | 'noun' | 'adj' | 'adv' | 'diminutive' | 'plural' }[];
  synonyms?: string[];
}

export const wordFamilies: WordFamily[] = [
  {
    id: 'voorstel',
    root: 'voorstel',
    members: [
      { word: 'voorstel', role: 'noun' },
      { word: 'voorstellen', role: 'verb' },
      { word: 'voorstelletje', role: 'diminutive' },
    ],
    synonyms: ['plan', 'idee'],
  },
  {
    id: 'werknemer',
    root: 'werk',
    members: [
      { word: 'werk', role: 'noun' },
      { word: 'werken', role: 'verb' },
      { word: 'werknemer', role: 'noun' },
      { word: 'werkgever', role: 'noun' },
      { word: 'werkplek', role: 'noun' },
    ],
  },
  {
    id: 'besluit',
    root: 'besluit',
    members: [
      { word: 'besluit', role: 'noun' },
      { word: 'beslissen', role: 'verb' },
      { word: 'besluitvorming', role: 'noun' },
    ],
    synonyms: ['keuze', 'beslissing'],
  },
  {
    id: 'gevolg',
    root: 'gevolg',
    members: [
      { word: 'gevolg', role: 'noun' },
      { word: 'volgen', role: 'verb' },
      { word: 'vervolg', role: 'noun' },
    ],
    synonyms: ['resultaat', 'consequentie'],
  },
  {
    id: 'verantwoordelijk',
    root: 'antwoord',
    members: [
      { word: 'verantwoordelijk', role: 'adj' },
      { word: 'verantwoordelijkheid', role: 'noun' },
      { word: 'verantwoorden', role: 'verb' },
    ],
  },
];

export function getFamilyForWord(word: string): WordFamily | undefined {
  const w = word.toLowerCase();
  return wordFamilies.find(f => f.members.some(m => m.word.toLowerCase() === w));
}
