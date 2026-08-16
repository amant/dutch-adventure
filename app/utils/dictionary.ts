import { articles } from '~/data/articles';
import { chapters } from '~/data/chapters';

export interface Hint {
  meaning: string;
  category?: string;
}

export const globalDictionary: Record<string, Hint> = {};

// Collect hints from articles
articles.forEach((article) => {
  if (article.wordHints) {
    Object.entries(article.wordHints).forEach(([word, hint]) => {
      globalDictionary[word.toLowerCase()] = hint;
    });
  }
});

// Collect hints from chapters
chapters.forEach((chapter) => {
  chapter.stages.forEach((stage) => {
    stage.exercises.forEach((exercise) => {
      if (exercise.wordHints) {
        Object.entries(exercise.wordHints).forEach(([word, hint]) => {
          globalDictionary[word.toLowerCase()] = hint;
        });
      }
    });
  });
});

// Add some common words that might be missing
const commonWords: Record<string, Hint> = {
  ik: { meaning: 'I', category: 'pronoun' },
  je: { meaning: 'you', category: 'pronoun' },
  het: { meaning: 'the/it', category: 'article/pronoun' },
  de: { meaning: 'the', category: 'article' },
  een: { meaning: 'a/an', category: 'article' },
  is: { meaning: 'is', category: 'verb' },
  zijn: { meaning: 'are/to be/his', category: 'verb/pronoun' },
  en: { meaning: 'and', category: 'conjunction' },
  van: { meaning: 'of/from', category: 'preposition' },
  met: { meaning: 'with', category: 'preposition' },
  voor: { meaning: 'for/before', category: 'preposition' },
  op: { meaning: 'on/at', category: 'preposition' },
  te: { meaning: 'to', category: 'particle' },
  dat: { meaning: 'that', category: 'conjunction/pronoun' },
  omdat: { meaning: 'because', category: 'conjunction' },
  maar: { meaning: 'but', category: 'conjunction' },
  ook: { meaning: 'also', category: 'adverb' },
  niet: { meaning: 'not', category: 'adverb' },
  ze: { meaning: 'she/they', category: 'pronoun' },
  we: { meaning: 'we', category: 'pronoun' },
  hij: { meaning: 'he', category: 'pronoun' },
  hebben: { meaning: 'to have', category: 'verb' },
  had: { meaning: 'had', category: 'verb' },
  zou: { meaning: 'would', category: 'verb' },
  zal: { meaning: 'will', category: 'verb' },
  in: { meaning: 'in', category: 'preposition' },
  naar: { meaning: 'to/towards', category: 'preposition' },
  hier: { meaning: 'here', category: 'adverb' },
  daar: { meaning: 'there', category: 'adverb' },
  ben: { meaning: 'am', category: 'verb' },
  bent: { meaning: 'are', category: 'verb' },
  woon: { meaning: 'live', category: 'verb' },
  wonen: { meaning: 'to live', category: 'verb' },
  ja: { meaning: 'yes', category: 'interjection' },
  nee: { meaning: 'no', category: 'interjection' },
};

Object.entries(commonWords).forEach(([word, hint]) => {
  if (!globalDictionary[word]) {
    globalDictionary[word] = hint;
  }
});

export function lookupWord(word: string): Hint | undefined {
  const clean = word.toLowerCase().replace(/[.,!?;:()]/g, '').trim();
  return globalDictionary[clean];
}
