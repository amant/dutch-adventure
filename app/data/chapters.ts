import type { Chapter } from '~/types/learning'

export const opinionChapter: Chapter = {
  slug: 'opinions-en-redenen',
  level: 'B1',
  title: 'Give opinions and reasons',
  capability: 'Express a clear opinion and support it with a reason.',
  description: 'Build a useful Dutch opinion pattern, then make it yours through retrieval and transformation.',
  estimatedMinutes: 12,
  stages: [
    {
      id: 'discover', title: 'Discover', kind: 'discover',
      intro: 'Dutch opinions become easier to use when you have a small set of reliable openings.',
      exercises: [{ id: 'discover-1', kind: 'info', prompt: 'Useful opinion openings', context: 'Ik denk dat thuiswerken handig is.\nVolgens mij is contact met collega\'s belangrijk.', skills: ['recognition', 'meaning'] }],
    },
    {
      id: 'understand', title: 'Understand', kind: 'understand',
      intro: 'Notice how omdat introduces the reason in the second part of the sentence.',
      exercises: [{ id: 'understand-1', kind: 'info', prompt: 'Read this in context', context: 'A: Wat vind je van thuiswerken?\nB: Ik denk dat het handig is, omdat ik meer tijd heb.', skills: ['recognition', 'meaning'] }],
    },
    {
      id: 'retrieve', title: 'Retrieve', kind: 'retrieve',
      intro: 'Produce the sentence without a word bank.',
      exercises: [{ id: 'retrieve-1', kind: 'typed', prompt: 'Translate: I think that working from home is useful because I have more time.', target: 'Ik denk dat thuiswerken handig is, omdat ik meer tijd heb.', acceptedAnswers: ['Ik denk dat thuiswerken handig is omdat ik meer tijd heb'], explanation: 'Use Ik denk dat for the opinion and omdat for the reason.', skills: ['production', 'meaning'], placeholder: 'Type your Dutch answer...' }],
    },
    {
      id: 'transform', title: 'Transform', kind: 'transform',
      intro: 'Keep the structure and change the reason.',
      exercises: [{ id: 'transform-1', kind: 'typed', prompt: 'Change the reason to: because it is quiet.', target: 'Ik denk dat thuiswerken handig is, omdat het rustig is.', acceptedAnswers: ['Ik denk dat thuiswerken handig is omdat het rustig is'], explanation: 'Keep the opinion frame and replace only the reason.', skills: ['production', 'automaticity'], placeholder: 'Rewrite the sentence...' }],
    },
    {
      id: 'personalise', title: 'Personalise', kind: 'personalise',
      intro: 'Use the pattern to say something true for you.',
      exercises: [{ id: 'personalise-1', kind: 'typed', prompt: 'Wat vind je van thuiswerken? Geef ook een reden.', target: 'Ik denk dat thuiswerken ... is, omdat ...', explanation: 'A reasonable answer needs an opinion opening and a reason with omdat.', skills: ['production', 'automaticity'], placeholder: 'Write your own answer in Dutch...' }],
    },
    {
      id: 'review', title: 'Delayed review', kind: 'review',
      intro: 'One final no-hint retrieval item to revisit later.',
      exercises: [{ id: 'review-1', kind: 'typed', prompt: 'Waarom blijf je meestal thuis als het regent?', target: 'Ik blijf meestal thuis omdat het regent.', acceptedAnswers: ['Ik blijf thuis omdat het regent'], explanation: 'Answer with a complete sentence using omdat.', skills: ['production', 'automaticity'], placeholder: 'Answer in Dutch...' }],
    },
  ],
}

export const chapters: Chapter[] = [opinionChapter]

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug)
}