import type { Chapter } from '~/types/learning'

export const introductionChapter: Chapter = {
  slug: 'introduceer-jezelf',
  level: 'A1',
  title: 'Introduce yourself',
  capability: 'Give basic personal details like your name, where you live, and what you do.',
  description: 'Learn the most common way to start a Dutch conversation.',
  estimatedMinutes: 8,
  relatedArticleSlug: 'a1-weer',
  stages: [
    {
      id: 'discover', title: 'Discover', kind: 'discover',
      intro: 'Dutch introductions use simple "ben" (am) and "woon" (live).',
      exercises: [
        {
          id: 'intro-induction', kind: 'induction', prompt: 'Notice the patterns',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'Name', answer: 'Ik ben Jan.' },
              { prompt: 'Location', answer: 'Ik woon in Amsterdam.' },
              { prompt: 'Profession', answer: 'Ik ben programmeur.' }
            ],
            ruleChallenge: 'Which word connects the person to their name or job?',
            options: [
              { text: 'ben', isCorrect: true },
              { text: 'woon', isCorrect: false },
              { text: 'in', isCorrect: false }
            ]
          }
        },
        { 
          id: 'intro-1', kind: 'info', prompt: 'Basic self-intro', 
        context: 'Ik ben Jan. Ik woon in Amsterdam. Ik ben programmeur.', 
        skills: ['recognition', 'meaning'],
        vocabulary: ['wonen', 'zijn']
      }],
    },
    {
      id: 'retrieve', title: 'Retrieve', kind: 'retrieve',
      intro: 'Try to say where you live.',
      exercises: [{ 
        id: 'intro-2', kind: 'typed', prompt: 'Say: I live in Utrecht.', 
        target: 'Ik woon in Utrecht.', 
        explanation: 'Use "Ik woon in..." for your city.', 
        skills: ['production', 'meaning'],
        vocabulary: ['wonen'],
        placeholder: 'Ik woon...' 
      }],
    },
    {
      id: 'automate', title: 'Speed Drill', kind: 'retrieve',
      intro: 'Quick! Recall these phrases.',
      exercises: [
        { 
          id: 'intro-speed-1', kind: 'speed-drill', prompt: 'I am ...', 
          target: 'Ik ben', 
          automaticitySeconds: 3,
          skills: ['automaticity', 'production']
        },
        { 
          id: 'intro-speed-2', kind: 'speed-drill', prompt: 'I live in ...', 
          target: 'Ik woon in', 
          automaticitySeconds: 4,
          skills: ['automaticity', 'production']
        }
      ],
    },
    {
      id: 'personalise', title: 'Personalise', kind: 'personalise',
      intro: 'Now introduce yourself for real.',
      exercises: [{ 
        id: 'intro-3', kind: 'personalise', prompt: 'Wie ben je en waar woon je?', 
        target: 'Ik ben ..., ik woon in ...', 
        explanation: 'State your name with "Ik ben" and city with "Ik woon in".', 
        skills: ['production', 'automaticity'],
        vocabulary: ['zijn', 'wonen'],
        grammar: ['word-order'],
        placeholder: 'Ik ben...' 
      }],
    }
  ]
}

export const opinionChapter: Chapter = {
  slug: 'opinions-en-redenen',
  level: 'B1',
  title: 'Give opinions and reasons',
  capability: 'Express a clear opinion and support it with a reason.',
  description: 'Build a useful Dutch opinion pattern, then make it yours through retrieval and transformation.',
  estimatedMinutes: 12,
  relatedArticleSlug: 'b1-thuiswerken',
  stages: [
    {
      id: 'discover', title: 'Discover', kind: 'discover',
      intro: 'Dutch opinions become easier to use when you have a small set of reliable openings.',
      exercises: [
        {
          id: 'opinion-induction', kind: 'induction', prompt: 'Pattern: Ik denk dat...',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'Idea', answer: 'Ik denk dat het handig is.' },
              { prompt: 'Person', answer: 'Ik denk dat Jan ziek is.' },
              { prompt: 'Weather', answer: 'Ik denk dat het regent.' }
            ],
            ruleChallenge: 'What happens to the verb (is, regent) in an "Ik denk dat" clause?',
            options: [
              { text: 'It stays in the second position', isCorrect: false },
              { text: 'It moves to the end of the clause', isCorrect: true },
              { text: 'It moves to the start of the clause', isCorrect: false }
            ]
          }
        },
        { 
          id: 'discover-1', kind: 'info', prompt: 'Useful opinion openings', 
        context: 'Ik denk dat thuiswerken handig is.\nVolgens mij is contact met collega\'s belangrijk.', 
        skills: ['recognition', 'meaning'],
        vocabulary: ['denken', 'vinden']
      }],
    },
    {
      id: 'understand', title: 'Understand', kind: 'understand',
      intro: 'Notice how omdat introduces the reason in the second part of the sentence.',
      exercises: [{ 
        id: 'understand-1', kind: 'info', prompt: 'Read this in context', 
        context: 'A: Wat vind je van thuiswerken?\nB: Ik denk dat het handig is, omdat ik meer tijd heb.', 
        skills: ['recognition', 'meaning'],
        grammar: ['omdat-clause']
      }],
    },
    {
      id: 'retrieve', title: 'Retrieve', kind: 'retrieve',
      intro: 'Produce the sentence without a word bank.',
      exercises: [{ 
        id: 'retrieve-1', kind: 'typed', prompt: 'Translate: I think that working from home is useful because I have more time.', 
        target: 'Ik denk dat thuiswerken handig is, omdat ik meer tijd heb.', 
        acceptedAnswers: ['Ik denk dat thuiswerken handig is omdat ik meer tijd heb'], 
        explanation: 'Use Ik denk dat for the opinion and omdat for the reason.', 
        skills: ['production', 'meaning'], 
        vocabulary: ['thuiswerken', 'handig'],
        grammar: ['omdat-clause'],
        placeholder: 'Type your Dutch answer...' 
      }],
    },
    {
      id: 'transform', title: 'Transform', kind: 'transform',
      intro: 'Keep the structure and change the reason.',
      exercises: [{ 
        id: 'transform-1', kind: 'transformation', prompt: 'Change the reason to: because it is quiet.', 
        context: 'Ik denk dat thuiswerken handig is, omdat ik meer tijd heb.',
        target: 'Ik denk dat thuiswerken handig is, omdat het rustig is.', 
        acceptedAnswers: ['Ik denk dat thuiswerken handig is omdat het rustig is'], 
        explanation: 'Keep the opinion frame and replace only the reason.', 
        skills: ['production', 'automaticity'], 
        vocabulary: ['rustig'],
        grammar: ['omdat-clause'],
        placeholder: 'Rewrite the sentence...',
        automaticitySeconds: 15
      }],
    },
    {
      id: 'automate', title: 'Speed Opinions', kind: 'retrieve',
      intro: 'Rapid fire opinions.',
      exercises: [
        { 
          id: 'opinion-speed-1', kind: 'speed-drill', prompt: 'I think that...', 
          target: 'Ik denk dat', 
          automaticitySeconds: 3,
          skills: ['automaticity', 'production'],
          grammar: ['omdat-clause']
        },
        { 
          id: 'opinion-speed-2', kind: 'speed-drill', prompt: 'In my opinion...', 
          target: 'Volgens mij', 
          automaticitySeconds: 4,
          skills: ['automaticity', 'production'],
          grammar: ['word-order']
        }
      ],
    },
    {
      id: 'personalise', title: 'Personalise', kind: 'personalise',
      intro: 'Use the pattern to say something true for you.',
      exercises: [{ 
        id: 'personalise-1', kind: 'personalise', prompt: 'Wat vind je van thuiswerken? Geef ook een reden.', 
        target: 'Ik denk dat thuiswerken ... is, omdat ...', 
        explanation: 'A reasonable answer needs an opinion opening and a reason with omdat.', 
        skills: ['production', 'automaticity'], 
        grammar: ['omdat-clause'],
        placeholder: 'Write your own answer in Dutch...' 
      }],
    },
    {
      id: 'review', title: 'Delayed review', kind: 'review',
      intro: 'One final no-hint retrieval item to revisit later.',
      exercises: [{ 
        id: 'review-1', kind: 'typed', prompt: 'Waarom blijf je meestal thuis als het regent?', 
        target: 'Ik blijf meestal thuis omdat het regent.', 
        acceptedAnswers: ['Ik blijf thuis omdat het regent'], 
        explanation: 'Answer with a complete sentence using omdat.', 
        skills: ['production', 'automaticity'], 
        grammar: ['omdat-clause'],
        placeholder: 'Answer in Dutch...' 
      }],
    },
  ],
}

export const doctorMission: Chapter = {
  slug: 'bel-de-dokter',
  level: 'A2',
  title: 'Calling the doctor',
  capability: 'Explain simple medical problems and request an appointment over the phone.',
  description: 'A critical survival mission for living independently in the Netherlands.',
  estimatedMinutes: 12,
  stages: [
    {
      id: 'discover', title: 'The Problem', kind: 'discover',
      intro: 'When calling a doctor, you need "Ik heb last van..." (I have trouble with) or "Ik voel me..." (I feel).',
      exercises: [{ 
        id: 'doc-1', kind: 'info', prompt: 'Common symptoms', 
        context: 'Ik heb last van mijn rug. Ik voel me niet lekker. Ik heb hoofdpijn.', 
        skills: ['recognition', 'meaning'],
        vocabulary: ['last hebben van', 'voelen', 'hoofdpijn']
      }],
    },
    {
      id: 'understand', title: 'Requesting help', kind: 'understand',
      intro: 'To ask for an appointment, use "Ik wil graag een afspraak maken."',
      exercises: [{ 
        id: 'doc-2', kind: 'info', prompt: 'The request', 
        context: 'A: Goedemorgen, dokter Smit.\nB: Goedemorgen, ik wil graag een afspraak maken, omdat ik pijn in mijn buik heb.', 
        skills: ['recognition', 'meaning'],
        vocabulary: ['afspraak', 'maken'],
        grammar: ['omdat-clause']
      }],
    },
    {
      id: 'retrieve', title: 'Explain it', kind: 'retrieve',
      intro: 'Try to explain you have a headache.',
      exercises: [{ 
        id: 'doc-3', kind: 'typed', prompt: 'Say: I have a headache.', 
        target: 'Ik heb hoofdpijn.', 
        explanation: 'Dutch uses "Ik heb [symptom]" for many common pains.', 
        skills: ['production', 'meaning', 'spelling'],
        vocabulary: ['hoofdpijn']
      }],
    },
    {
      id: 'transform', title: 'Make the request', kind: 'transform',
      intro: 'Combine the request with a reason.',
      exercises: [{ 
        id: 'doc-4', kind: 'typed', prompt: 'Translate: I would like to make an appointment because I have a stomach ache.', 
        target: 'Ik wil graag een afspraak maken omdat ik buikpijn heb.', 
        acceptedAnswers: ['Ik wil graag een afspraak maken, omdat ik buikpijn heb.'],
        explanation: 'Put the verb "heb" at the end of the omdat-clause.', 
        skills: ['production', 'automaticity', 'spelling'],
        vocabulary: ['afspraak', 'buikpijn'],
        grammar: ['omdat-clause', 'word-order']
      }],
    },
    {
      id: 'personalise', title: 'The Mission', kind: 'personalise',
      intro: 'The receptionist asks: "Wat is er aan de hand?" (What is the matter?).',
      exercises: [{ 
        id: 'doc-5', kind: 'typed', prompt: 'Explain your problem and ask for an appointment.', 
        target: 'Ik heb last van ..., ik wil graag een afspraak maken.', 
        missionGoals: [
          { id: 'explain', label: 'Explain the problem', keywords: ['last', 'pijn', 'heb'] },
          { id: 'request', label: 'Ask for appointment', keywords: ['afspraak', 'maken', 'wil'] }
        ],
        explanation: 'State your problem and clearly ask for the appointment.', 
        skills: ['production', 'speaking', 'automaticity'],
        vocabulary: ['last hebben van', 'afspraak'],
        grammar: ['word-order'],
        placeholder: 'Ik heb last van...' 
      }],
    }
  ]
}

export const workDiscussionMission: Chapter = {
  slug: 'werkoverleg',
  level: 'B2',
  title: 'Work discussion',
  capability: 'Argue a position, disagree politely, and respond to counter-arguments in a professional setting.',
  description: 'Test your B2 fluency in a simulated professional discussion about remote work.',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'discover', title: 'The Argument', kind: 'discover',
      intro: 'At B2, you need to use complex structures like "Hoewel..." (Although) and "Daarentegen..." (On the other hand).',
      exercises: [{ 
        id: 'work-1', kind: 'info', prompt: 'Professional disagreements', 
        context: 'Ik begrijp je punt, maar ik ben het er niet mee eens.\nHoewel kantoorwerk voordelen heeft, is thuiswerken productiever.', 
        skills: ['recognition', 'meaning'],
        vocabulary: ['begrijpen', 'eens zijn', 'hoewel']
      }],
    },
    {
      id: 'listening', title: 'Listen to the Boss', kind: 'understand',
      intro: 'Your manager is explaining the new office policy.',
      exercises: [{ 
        id: 'work-2', kind: 'listening', prompt: 'What is the manager saying?', 
        listeningQuestion: 'How many days per week should employees come to the office?',
        listeningOptions: [
          { text: 'Two days', isCorrect: false },
          { text: 'Three days', isCorrect: true },
          { text: 'Four days', isCorrect: false },
          { text: 'Five days', isCorrect: false }
        ],
        transcript: 'We willen dat iedereen weer drie dagen per week naar kantoor komt, voor de teamgeest.', 
        translation: 'We want everyone to come back to the office three days a week, for the team spirit.',
        skills: ['listening', 'meaning'],
        vocabulary: ['teamgeest']
      }],
    },
    {
      id: 'retrieve', title: 'Polite disagreement', kind: 'retrieve',
      intro: 'Try to say you understand but disagree.',
      exercises: [{ 
        id: 'work-3', kind: 'typed', prompt: 'Translate: I understand your point, but I don\'t agree with it.', 
        target: 'Ik begrijp je punt, maar ik ben het er niet mee eens.', 
        explanation: 'Use "ben het er niet mee eens" for "don\'t agree with it".', 
        skills: ['production', 'automaticity'],
        vocabulary: ['eens zijn']
      }],
    },
    {
      id: 'mission', title: 'The Argument', kind: 'personalise',
      intro: 'Your manager says: "Maar waarom zou thuiswerken productiever zijn?"',
      exercises: [{ 
        id: 'work-4', kind: 'conversation', prompt: 'Waarom is thuiswerken volgens jou productiever?', 
        simulatorResponse: 'Interessant. Maar mis je dan niet het contact met je collega\'s?',
        explanation: 'Explain your position clearly using "omdat" or "want".', 
        skills: ['speaking', 'production', 'automaticity'],
        grammar: ['word-order']
      }],
    }
  ]
}

export const storyChapter: Chapter = {
  slug: 'een-dagje-uit',
  level: 'A1',
  title: 'A day out',
  capability: 'Understand simple stories about daily activities and locations.',
  description: 'Read a short story about a trip to Amsterdam.',
  estimatedMinutes: 8,
  stages: [
    {
      id: 'story', title: 'The Story', kind: 'understand',
      intro: 'Read about Thomas\'s trip. Click for translations.',
      exercises: [{ 
        id: 'story-1', kind: 'reading', prompt: 'Thomas in Amsterdam', 
        readingContent: 'Thomas gaat naar Amsterdam. Hij koopt een kaartje voor de trein. In de stad drinkt hij koffie en eet hij een broodje.',
        wordHints: {
          'gaat': { meaning: 'goes', category: 'verb' },
          'koopt': { meaning: 'buys', category: 'verb' },
          'kaartje': { meaning: 'ticket', category: 'noun' },
          'trein': { meaning: 'train', category: 'noun' },
          'drinkt': { meaning: 'drinks', category: 'verb' },
          'eet': { meaning: 'eats', category: 'verb' },
          'broodje': { meaning: 'sandwich', category: 'noun' }
        },
        skills: ['recognition', 'meaning'],
        vocabulary: ['trein', 'kaartje', 'broodje']
      }],
    }
  ]
}

export const newsChapter: Chapter = {
  slug: 'nieuws-lezen',
  level: 'B2',
  title: 'Reading the news',
  capability: 'Understand authentic Dutch news articles and identify key terminology.',
  description: 'Practice reading real-world Dutch news snippets with interactive vocabulary support.',
  estimatedMinutes: 10,
  stages: [
    {
      id: 'reading', title: 'Authentic Article', kind: 'understand',
      intro: 'Read this snippet about a new government proposal. Click on highlighted words if you need help.',
      exercises: [{ 
        id: 'news-1', kind: 'reading', prompt: 'Read the article snippet', 
        readingContent: 'De regering heeft gisteren een nieuw voorstel ingediend om de woningmarkt te hervormen. Volgens de minister is dit een noodzakelijke stap om de krapte op de markt aan te pakken.',
        wordHints: {
          'regering': { meaning: 'government', category: 'noun' },
          'voorstel': { meaning: 'proposal', category: 'noun' },
          'ingediend': { meaning: 'submitted', category: 'verb' },
          'hervormen': { meaning: 'to reform', category: 'verb' },
          'noodzakelijke': { meaning: 'necessary', category: 'adjective' },
          'krapte': { meaning: 'shortage', category: 'noun' },
          'aan te pakken': { meaning: 'to tackle / to address', category: 'verb phrase' }
        },
        skills: ['recognition', 'meaning'],
        vocabulary: ['regering', 'voorstel', 'ingediend', 'hervormen']
      }],
    },
    {
      id: 'retrieve', title: 'Recall', kind: 'retrieve',
      intro: 'Quick! What was the keyword for "proposal"? You have 5 seconds.',
      exercises: [{ 
        id: 'news-2', kind: 'typed', prompt: 'Dutch word for "proposal":', 
        target: 'voorstel', 
        skills: ['production', 'automaticity'],
        vocabulary: ['voorstel'],
        automaticitySeconds: 5
      }],
    }
  ]
}

export const hotelMission: Chapter = {
  slug: 'klagen-over-hotel',
  level: 'B1',
  title: 'Mission: Complain about a hotel',
  capability: 'Explain a problem in detail, express dissatisfaction, and negotiate a solution.',
  description: 'Your hotel room is not what you expected. Talk to the receptionist and solve the problem.',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'discover', title: 'The Problem', kind: 'discover',
      intro: 'Useful phrases for complaining: "Ik ben niet tevreden over..." (I am not satisfied with) and "Het probleem is dat..." (The problem is that).',
      exercises: [{ 
        id: 'hotel-1', kind: 'info', prompt: 'Complaining vocabulary', 
        context: 'Ik ben niet tevreden over de kamer. De kamer is vies. De verwarming werkt niet.', 
        skills: ['recognition', 'meaning'],
        vocabulary: ['tevreden', 'vies', 'verwarming']
      }],
    },
    {
      id: 'retrieve', title: 'Explain the issue', kind: 'retrieve',
      intro: 'Tell the receptionist that you are not satisfied with the room.',
      exercises: [{ 
        id: 'hotel-2', kind: 'typed', prompt: 'Translate: I am not satisfied with my room because it is dirty.', 
        target: 'Ik ben niet tevreden over mijn kamer omdat het vies is.', 
        explanation: 'Use "niet tevreden over" for "not satisfied with".', 
        skills: ['production', 'meaning'],
        vocabulary: ['tevreden', 'vies'],
        grammar: ['omdat-clause']
      }],
    },
    {
      id: 'request', title: 'Asking for a solution', kind: 'transform',
      intro: 'Ask for another room or a discount.',
      exercises: [{ 
        id: 'hotel-3', kind: 'typed', prompt: 'Translate: I would like a different room.', 
        target: 'Ik wil graag een andere kamer.', 
        explanation: 'Use "een andere" for "a different".', 
        skills: ['production', 'automaticity'],
        vocabulary: ['andere']
      }],
    },
    {
      id: 'mission', title: 'The Negotiation', kind: 'personalise',
      intro: 'The receptionist says: "Het spijt me, maar we zitten helemaal vol. Wat wilt u dat ik doe?"',
      exercises: [{ 
        id: 'hotel-4', kind: 'conversation', prompt: 'Wat is de oplossing volgens jou?', 
        simulatorResponse: 'Ik kan u een gratis ontbijt aanbieden voor het ongemak. Is dat voldoende?',
        missionGoals: [
          { id: 'complain', label: 'Describe dissatisfaction', keywords: ['tevreden', 'vies', 'niet'] },
          { id: 'solution', label: 'Propose a solution', keywords: ['korting', 'andere', 'ontbijt', 'schoonmaken'] }
        ],
        explanation: 'Propose a solution like a discount or cleaning the room immediately.', 
        skills: ['speaking', 'production', 'automaticity'],
        grammar: ['word-order'],
        vocabulary: ['oplossing', 'korting']
      }],
    }
  ]
}

export const talkingAboutDayChapter: Chapter = {
  slug: 'praten-over-je-dag',
  level: 'A2',
  title: 'Talking about your day',
  capability: 'Describe daily routines and past events using separable verbs and the perfect tense.',
  description: 'Learn how to describe your day accurately using "zijn" and "hebben" correctly.',
  estimatedMinutes: 12,
  stages: [
    {
      id: 'discover', title: 'Daily Actions', kind: 'discover',
      intro: 'In Dutch, many daily verbs like "opstaan" (to get up) and "schoonmaken" (to clean) are separable.',
      exercises: [{ 
        id: 'day-1', kind: 'info', prompt: 'Separable verbs in action', 
        context: 'Ik sta om 7 uur op. Ik maak de keuken schoon.', 
        skills: ['recognition', 'meaning'],
        vocabulary: ['opstaan', 'schoonmaken']
      }],
    },
    {
      id: 'drill-separable', title: 'Splitting verbs', kind: 'transform',
      intro: 'Try to use the correct word order for these separable verbs.',
      exercises: [{ 
        id: 'day-2', kind: 'typed', prompt: 'Translate: I am cleaning the kitchen.', 
        target: 'Ik maak de keuken schoon.', 
        explanation: 'The verb "schoonmaken" splits: "maak" ... "schoon".', 
        skills: ['production', 'automaticity'],
        vocabulary: ['schoonmaken'],
        grammar: ['separable-verbs']
      }],
    },
    {
      id: 'drill-perfect', title: 'The Perfect Tense', kind: 'retrieve',
      intro: 'Remember: most verbs use "hebben", but movement verbs like "gaan" use "zijn".',
      exercises: [{ 
        id: 'day-3', kind: 'typed', prompt: 'Translate: I went to the supermarket.', 
        target: 'Ik ben naar de supermarkt gegaan.', 
        explanation: 'Movement verbs use "zijn" (ben/is) in the perfect tense.', 
        skills: ['production', 'meaning'],
        vocabulary: ['supermarkt', 'gegaan'],
        grammar: ['perfect-tense']
      }],
    },
    {
      id: 'mission', title: 'Your morning', kind: 'personalise',
      intro: 'Tell me about what you did this morning.',
      exercises: [{ 
        id: 'day-4', kind: 'conversation', prompt: 'Wat heb je vanochtend gedaan?', 
        simulatorResponse: 'Interessant! Ben je ook nog ergens anders naartoe gegaan?',
        explanation: 'Use the perfect tense to describe your morning.', 
        skills: ['speaking', 'production', 'automaticity'],
        grammar: ['perfect-tense', 'separable-verbs']
      }],
    }
  ]
}

export const debatingWorkChapter: Chapter = {
  slug: 'debat-thuiswerken',
  level: 'B2',
  title: 'Debating work policies',
  capability: 'Present a structured argument, handle pushback, and rephrase points for clarity.',
  description: 'This is a high-level B2 challenge. You will build an argument and then be forced to defend it using different grammatical structures.',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'Connectors', kind: 'discover',
      intro: 'At B2, you should be able to switch between "omdat" (subordinating) and "want" (coordinating) to keep your speech varied.',
      exercises: [{ 
        id: 'debate-1', kind: 'info', prompt: 'Varied reasoning', 
        context: 'Ik werk graag thuis omdat het rustig is. (Word order: Verb at end)\nIk werk graag thuis, want het is rustig. (Word order: Normal)', 
        skills: ['recognition', 'meaning'],
        grammar: ['omdat-clause', 'want-clause']
      }],
    },
    {
      id: 'flexibility', title: 'The Flexibility Test', kind: 'transform',
      intro: 'A good speaker can express the same idea in multiple ways.',
      exercises: [{ 
        id: 'debate-2', kind: 'flexibility', prompt: 'Rewrite using "want" instead of "omdat".', 
        context: 'Ik vind kantoorwerk minder fijn omdat er te veel afleiding is.',
        requiredWords: ['want'],
        forbiddenWords: ['omdat'],
        target: 'Ik vind kantoorwerk minder fijn, want er is te veel afleiding.',
        skills: ['production', 'automaticity'],
        grammar: ['want-clause']
      }],
    },
    {
      id: 'mission', title: 'The Argument', kind: 'personalise',
      intro: 'Your colleague says: "Ik denk dat we meer samenwerken als we op kantoor zijn."',
      exercises: [{ 
        id: 'debate-3', kind: 'conversation', prompt: 'Reageer op je collega. Waarom ben je het er niet mee eens?', 
        simulatorResponse: 'Daar heb je een punt, maar hoe zit het met de spontane gesprekken bij het koffiezetapparaat?',
        explanation: 'Acknowledge their point and present your counter-argument.', 
        skills: ['speaking', 'production', 'automaticity'],
        grammar: ['word-order'],
        vocabulary: ['tegenargument']
      }],
    },
    {
      id: 'final-challenge', title: 'Final Mission', kind: 'review',
      intro: 'Now, write a short summary of your position for the management.',
      exercises: [{ 
        id: 'debate-4', kind: 'challenge', prompt: 'Write a proposal (min 20 words) explaining why flexible work should stay.', 
        context: 'The management wants to know your final thoughts.',
        minimumLength: 20,
        skills: ['production', 'writing', 'automaticity'],
        grammar: ['omdat-clause', 'want-clause', 'hoewel'],
        placeholder: 'Geachte directie, volgens mij...'
      }],
    }
  ]
}

export const bakeryChapter: Chapter = {
  slug: 'bakkerij',
  level: 'A2',
  title: 'At the Bakery',
  capability: 'Order specific items, ask about ingredients, and handle a slightly impatient shopkeeper.',
  description: 'Survival Dutch in a real-world setting. You will have to be quick and clear.',
  estimatedMinutes: 10,
  stages: [
    {
      id: 'discover', title: 'Bakery Vocabulary', kind: 'discover',
      intro: 'Ordering food requires knowing exactly what you want.',
      exercises: [{ 
        id: 'bakery-1', kind: 'info', prompt: 'Essential items', 
        context: 'een volkorenbrood (whole wheat)\ntwee krentenbollen (currant buns)\neen half wit (half a white loaf)', 
        skills: ['recognition', 'meaning'],
        vocabulary: ['volkorenbrood', 'krentenbollen']
      }],
    },
    {
      id: 'drill', title: 'Ordering', kind: 'retrieve',
      intro: 'Practice the standard "Mag ik..." structure.',
      exercises: [{ 
        id: 'bakery-2', kind: 'typed', prompt: 'May I have two currant buns?', 
        target: 'Mag ik twee krentenbollen?',
        skills: ['production', 'automaticity'],
        vocabulary: ['krentenbollen'],
        automaticitySeconds: 8
      }],
    },
    {
      id: 'mission', title: 'The Busy Bakery', kind: 'personalise',
      intro: 'The baker is busy and wants to move to the next customer.',
      exercises: [{ 
        id: 'bakery-3', kind: 'conversation', prompt: 'Goedemiddag, wat wilt u hebben? We hebben haast vandaag!', 
        aiPersonality: { isDifficult: true, style: 'impatient', pushbackProbability: 0.8 },
        skills: ['speaking', 'production', 'automaticity'],
        vocabulary: ['haast'],
        grammar: ['word-order']
      }],
    }
  ]
}

export const landlordMission: Chapter = {
  slug: 'huisbaas-verwarming',
  level: 'B1',
  title: 'The Cold Apartment',
  capability: 'Explain a technical problem, request a repair, and negotiate a timeline with your landlord.',
  description: 'Your heating is broken. You need to call your landlord and make sure it gets fixed before the weekend.',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'understand', title: 'Technical Problems', kind: 'understand',
      intro: 'How to describe things that aren\'t working.',
      exercises: [{ 
        id: 'landlord-1', kind: 'reading', prompt: 'Read this email from a tenant.',
        readingContent: 'Beste meneer de Vries, de verwarming in mijn woonkamer doet het niet meer. Het is erg koud in huis.',
        wordHints: {
          'verwarming': { meaning: 'heating', category: 'noun' },
          'doet het niet': { meaning: 'doesn\'t work', category: 'phrase' }
        },
        skills: ['recognition', 'meaning'],
        vocabulary: ['verwarming']
      }],
    },
    {
      id: 'mission', title: 'The Phone Call', kind: 'personalise',
      intro: 'Call your landlord. Be polite but firm.',
      exercises: [{ 
        id: 'landlord-2', kind: 'conversation', prompt: 'Hallo? Met De Vries. Waarom belt u mij op dit tijdstip?', 
        simulatorResponse: 'Tjonge, dat is vervelend. Maar ik kan pas volgende week iemand sturen.',
        missionGoals: [
          { id: 'problem', label: 'Explain the heating failure', keywords: ['verwarming', 'koud', 'werkt', 'doet'] },
          { id: 'urgency', label: 'Stress the urgency', keywords: ['vandaag', 'snel', 'weekend', 'nu'] }
        ],
        aiPersonality: { isDifficult: true, style: 'colloquial', pushbackProbability: 0.6 },
        skills: ['speaking', 'production'],
        vocabulary: ['verwarming', 'repareren'],
        grammar: ['omdat-clause']
      }],
    },
    {
      id: 'final', title: 'Confirmation', kind: 'review',
      intro: 'Write a short text confirming the appointment.',
      exercises: [{ 
        id: 'landlord-3', kind: 'challenge', prompt: 'Write a message to the landlord confirming he will send a plumber tomorrow.', 
        minimumLength: 15,
        correction: 'Bedankt voor het gesprek. Ik wacht morgen op de loodgieter voor de verwarming.',
        skills: ['production', 'writing'],
        vocabulary: ['loodgieter', 'afspraak']
      }],
    }
  ]
}

export const coffeeChapter: Chapter = {
  slug: 'koffie-bestellen',
  level: 'A1',
  title: 'Ordering Coffee',
  capability: 'Order a drink, ask for the price, and pay in a café.',
  description: 'Survival Dutch for your daily caffeine fix.',
  estimatedMinutes: 5,
  stages: [
    {
      id: 'discover', title: 'Café Vocabulary', kind: 'discover',
      intro: 'Basic drinks and polite requests.',
      exercises: [{ 
        id: 'coffee-1', kind: 'info', prompt: 'Common drinks', 
        context: 'een koffie (coffee)\neen thee (tea)\neen cappuccino\nmet melk en suiker (with milk and sugar)', 
        skills: ['recognition', 'meaning'],
        vocabulary: ['koffie', 'thee', 'melk', 'suiker']
      }],
    },
    {
      id: 'retrieve', title: 'Polite Requests', kind: 'retrieve',
      intro: 'Use "Graag" for politeness.',
      exercises: [{ 
        id: 'coffee-2', kind: 'typed', prompt: 'A coffee with milk, please.', 
        target: 'Een koffie met melk, graag.',
        skills: ['production', 'meaning'],
        vocabulary: ['koffie', 'melk'],
        placeholder: 'Een koffie...'
      }],
    },
    {
      id: 'personalise', title: 'Your Order', kind: 'personalise',
      intro: 'What do you usually drink?',
      exercises: [{ 
        id: 'coffee-3', kind: 'personalise', prompt: 'Wat wilt u drinken?', 
        vocabulary: ['koffie', 'thee', 'melk', 'suiker'],
        placeholder: 'Ik wil graag...'
      }],
    }
  ]
}

export const salaryNegotiationMission: Chapter = {
  slug: 'salarisverhandeling',
  level: 'B2',
  title: 'Salary Negotiation',
  capability: 'Argue for a pay rise, handle objections, and speculate about future value.',
  description: 'A high-pressure professional scenario where you must persuade your manager.',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'understand', title: 'Arguments & Persuasion', kind: 'understand',
      intro: 'Notice the use of conditional language (zou, kunnen).',
      exercises: [{ 
        id: 'salary-1', kind: 'reading', prompt: 'Professional arguments',
        readingContent: 'Ik denk dat een verhoging passend zou zijn, gezien mijn prestaties van het afgelopen jaar.',
        wordHints: {
          'verhoging': { meaning: 'increase/raise', category: 'noun' },
          'passend': { meaning: 'appropriate', category: 'adj' },
          'prestaties': { meaning: 'achievements', category: 'noun' }
        },
        skills: ['recognition', 'meaning'],
        vocabulary: ['verhoging', 'prestaties']
      }],
    },
    {
      id: 'flex', title: 'Flexibility', kind: 'flexibility',
      intro: 'Rephrase your request to be more speculative.',
      exercises: [{ 
        id: 'salary-2', kind: 'flexibility', prompt: 'Rewrite: "I want more money" using "zou" and "kunnen".',
        target: 'Zou het mogelijk kunnen zijn om over mijn salaris te praten?',
        requiredWords: ['zou', 'kunnen'],
        forbiddenWords: ['wil', 'geld'],
        skills: ['production', 'automaticity'],
        grammar: ['conditional']
      }],
    },
    {
      id: 'mission', title: 'The Negotiation', kind: 'personalise',
      intro: 'Your manager is happy with your work but the budget is tight.',
      exercises: [{ 
        id: 'salary-3', kind: 'conversation', prompt: 'Dag! Je wilde me spreken over je contract? Je weet dat we dit jaar voorzichtig moeten zijn met de kosten.', 
        simulatorResponse: 'Dat begrijp ik, maar waarom vind je dat je nu al een verhoging verdient?',
        aiPersonality: { isDifficult: true, style: 'helpful', pushbackProbability: 0.9 },
        skills: ['speaking', 'production', 'automaticity'],
        vocabulary: ['salaris', 'verhoging', 'verantwoordelijkheid'],
        grammar: ['hoewel', 'omdat-clause']
      }],
    }
  ]
}

export const formalityChapter: Chapter = {
  slug: 'formeel-vs-informeel',
  level: 'B2',
  title: 'Adapting to Context',
  capability: 'Switch between formal and informal Dutch appropriately based on the audience.',
  description: 'Learn when to use "U" and when to use "Je", and how to maintain consistency.',
  estimatedMinutes: 12,
  stages: [
    {
      id: 'discover', title: 'Context Rules', kind: 'discover',
      intro: 'Formal (U) is for strangers, elders, and professional hierarchy. Informal (Je) is for friends, family, and peers.',
      exercises: [{ 
        id: 'formal-1', kind: 'info', prompt: 'Formal vs Informal', 
        context: 'Formal: Hoe gaat het met u?\nInformal: Hoe gaat het met je?', 
        skills: ['recognition', 'meaning'],
        grammar: ['formal-v-informal']
      }],
    },
    {
      id: 'transform', title: 'Formalize it', kind: 'transform',
      intro: 'Change the informal sentence into a formal one.',
      exercises: [{ 
        id: 'formal-2', kind: 'transformation', prompt: 'Jij kunt hier zitten.', 
        target: 'U kunt hier zitten.',
        explanation: 'Change "Jij" to "U". Note that "kunt" remains the same for "U".',
        skills: ['production', 'automaticity'],
        grammar: ['formal-v-informal']
      }],
    },
    {
      id: 'automate', title: 'Speed Switching', kind: 'retrieve',
      intro: 'Quickly produce the correct form.',
      exercises: [
        { 
          id: 'formal-3', kind: 'speed-drill', prompt: 'Your book (formal)', 
          target: 'Uw boek', 
          automaticitySeconds: 3,
          skills: ['automaticity', 'production'],
          grammar: ['formal-v-informal']
        },
        { 
          id: 'formal-4', kind: 'speed-drill', prompt: 'How are you? (informal)', 
          target: 'Hoe gaat het met je?', 
          automaticitySeconds: 4,
          skills: ['automaticity', 'production'],
          grammar: ['formal-v-informal']
        }
      ],
    },
    {
      id: 'mission', title: 'The Interview', kind: 'personalise',
      intro: 'You are at a job interview. Answer the recruiter politely.',
      exercises: [{ 
        id: 'formal-5', kind: 'conversation', prompt: 'Goedenacht. Bedankt voor uw komst. Kunt u iets over uzelf vertellen?', 
        simulatorResponse: 'Interessant. En waarom wilt u bij ons bedrijf werken?',
        aiPersonality: { isDifficult: true, style: 'polite', pushbackProbability: 0.8 },
        skills: ['speaking', 'production', 'automaticity'],
        grammar: ['formal-v-informal']
      }],
    }
  ]
}

export const presentationChapter: Chapter = {
  slug: 'presenteren',
  level: 'B2',
  title: 'Professional Presentation',
  capability: 'Summarise complex information and explain abstract ideas to an audience.',
  description: 'Master the art of presenting your ideas clearly and persuasively.',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'understand', title: 'Structuring Ideas', kind: 'understand',
      intro: 'Common phrases for presentations.',
      exercises: [{ 
        id: 'pres-1', kind: 'reading', prompt: 'Opening a presentation',
        readingContent: 'Vandaag ga ik het hebben over de toekomst van duurzame energie. Eerst zal ik de huidige situatie schetsen...',
        wordHints: {
          'duurzame': { meaning: 'sustainable', category: 'adj' },
          'schetsen': { meaning: 'to sketch/outline', category: 'verb' }
        },
        skills: ['recognition', 'meaning'],
        vocabulary: ['duurzaam', 'schetsen']
      }],
    },
    {
      id: 'automate', title: 'Rapid Summarizing', kind: 'retrieve',
      intro: 'Translate these linking words fast.',
      exercises: [
        { 
          id: 'pres-2', kind: 'speed-drill', prompt: 'In conclusion', 
          target: 'Tot slot', 
          automaticitySeconds: 3,
          skills: ['automaticity', 'production'],
          vocabulary: ['tot slot']
        },
        { 
          id: 'pres-3', kind: 'speed-drill', prompt: 'On the other hand', 
          target: 'Aan de andere kant', 
          automaticitySeconds: 4,
          skills: ['automaticity', 'production'],
          vocabulary: ['aan de andere kant']
        }
      ],
    },
    {
      id: 'mission', title: 'Final Challenge', kind: 'personalise',
      intro: 'Give a 2-minute summary of your last project.',
      exercises: [{ 
        id: 'pres-4', kind: 'challenge', prompt: 'Presenteer je laatste project in het kort.', 
        context: 'Explain the goal, the process, and the result. Use at least 50 words.',
        minimumLength: 50,
        skills: ['production', 'automaticity'],
        vocabulary: ['project', 'doel', 'resultaat']
      }],
    }
  ]
}

export const newsSummaryChapter: Chapter = {
  slug: 'nieuws-samenvatten',
  level: 'B2',
  title: 'Summarizing the News',
  capability: 'Summarise information from a complex news source and express a position.',
  description: 'Practice taking an article and explaining it to someone else while using advanced connectors.',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'listen', title: 'Multiple Speaker Discussion', kind: 'understand',
      intro: 'Listen to two people discussing the latest news. Pay attention to how they disagree politely.',
      exercises: [{
        id: 'news-sum-1', kind: 'listening', prompt: 'Listen to the debate.',
        listeningQuestion: 'What are critics claiming about the proposal?',
        listeningOptions: [
          { text: 'It is not ambitious enough', isCorrect: false },
          { text: 'The costs are too high', isCorrect: true },
          { text: 'It is too focused on climate', isCorrect: false },
          { text: 'It will take too long', isCorrect: false }
        ],
        transcript: 'A: Heb je het voorstel van de regering over duurzame energie gelezen?\nB: Ja, hoewel het ambitieus klinkt, beweren critici dat de kosten te hoog zijn.\nA: Dat klopt, maar voorstanders wijzen op de noodzaak van klimaatactie.\nB: Aan de andere kant moeten we ook denken aan de burgers met een laag inkomen.',
        skills: ['listening', 'recognition'],
        vocabulary: ['voorstel', 'duurzaam', 'hoewel', 'beweren', 'kosten', 'echter'],
        grammar: ['subordinate clauses']
      }],
    },
    {
      id: 'mission', title: 'The Summary Mission', kind: 'personalise',
      intro: 'Now it is your turn. Summarize the main points of the debate you just heard.',
      exercises: [{
        id: 'news-sum-2', kind: 'challenge', prompt: 'Vat het nieuwsgesprek kort samen.',
        context: 'Describe the two different viewpoints mentioned. Use at least 40 words.',
        minimumLength: 40,
        vocabulary: ['voorstanders', 'critici', 'enerzijds', 'anderzijds'],
        grammar: ['subordinate clauses'],
        skills: ['production', 'writing']
      }]
    }
  ]
}

export const doubtChapter: Chapter = {
  slug: 'twijfel-uiten',
  level: 'B1',
  title: 'Doubt & Certainty',
  capability: 'Express degrees of certainty and doubt when discussing plans or ideas.',
  description: 'Learn to use modal adverbs and phrases to show how sure you are.',
  estimatedMinutes: 10,
  stages: [
    {
      id: 'discover', title: 'Modal Adverbs', kind: 'discover',
      intro: 'Dutch uses words like "waarschijnlijk" and "misschien" to express doubt.',
      exercises: [{
        id: 'doubt-1', kind: 'info', prompt: 'Certainty Levels',
        context: 'Zeker (100%): Ik weet het zeker.\nWaarschijnlijk (80%): Het zal waarschijnlijk regenen.\nMisschien (50%): Misschien gaan we naar buiten.',
        skills: ['recognition', 'meaning'],
        vocabulary: ['zeker', 'waarschijnlijk', 'misschien']
      }],
    },
    {
      id: 'automate', title: 'Fast Retrieval', kind: 'retrieve',
      intro: 'Quickly produce the correct adverb.',
      exercises: [
        { 
          id: 'doubt-2', kind: 'speed-drill', prompt: 'Probably', 
          target: 'Waarschijnlijk', 
          automaticitySeconds: 3,
          skills: ['automaticity', 'production'],
          vocabulary: ['waarschijnlijk']
        },
        { 
          id: 'doubt-3', kind: 'speed-drill', prompt: 'Maybe', 
          target: 'Misschien', 
          automaticitySeconds: 2,
          skills: ['automaticity', 'production'],
          vocabulary: ['misschien']
        }
      ],
    },
    {
      id: 'mission', title: 'The Speculation', kind: 'personalise',
      intro: 'Speculate about the weather and your plans for next weekend.',
      exercises: [{
        id: 'doubt-4', kind: 'personalise', prompt: 'Wat ga je volgend weekend doen?',
        context: 'Express doubt about your plans. Use "waarschijnlijk" or "misschien".',
        vocabulary: ['waarschijnlijk', 'misschien'],
        skills: ['speaking', 'production'],
        target: 'Volgend weekend ga ik waarschijnlijk naar Amsterdam, maar misschien blijf ik thuis.'
      }]
    }
  ]
}

export const futureSpeculationChapter: Chapter = {
  slug: 'toekomst-speculeren',
  level: 'B2',
  title: 'Future & Speculation',
  capability: 'Speculate about future events and understand implied meanings in complex discussions.',
  description: 'Master the use of "zullen" and "zou" to talk about what might happen.',
  estimatedMinutes: 12,
  stages: [
    {
      id: 'discover', title: 'Zullen vs Zou', kind: 'discover',
      intro: 'Use "zullen" for future probability and "zou" for hypothetical scenarios.',
      exercises: [{
        id: 'spec-1', kind: 'info', prompt: 'Speculating with Modal Verbs',
        context: 'Zullen (Future): Het zal morgen wel regenen. (It will probably rain tomorrow.)\nZou (Hypothetical): Wat zou je doen als je rijk was? (What would you do if you were rich?)',
        skills: ['recognition', 'meaning'],
        vocabulary: ['zullen', 'zou', 'waarschijnlijk', 'hypothetisch']
      }],
    },
    {
      id: 'retrieve', title: 'Retrieve the Modals', kind: 'retrieve',
      intro: 'Quickly translate these speculative sentences.',
      exercises: [
        { 
          id: 'spec-2', kind: 'typed', prompt: 'It will probably be warm.', 
          target: 'Het zal waarschijnlijk warm zijn', 
          skills: ['production', 'grammar'],
          grammar: ['future tense'],
          vocabulary: ['waarschijnlijk', 'warm']
        },
        { 
          id: 'spec-3', kind: 'typed', prompt: 'I would like to stay home.', 
          target: 'Ik zou graag thuis willen blijven', 
          skills: ['production', 'grammar'],
          grammar: ['conditional'],
          vocabulary: ['thuis', 'blijven']
        }
      ],
    },
    {
      id: 'transform', title: 'The Pragmatic Shift', kind: 'transform',
      intro: 'Change these direct statements into polite, speculative ones.',
      exercises: [
        { 
          id: 'spec-4', kind: 'transformation', prompt: 'Ik heb een vraag.', 
          context: 'Make it more polite using "zou".',
          target: 'Ik zou een vraag willen hebben', 
          acceptedAnswers: ['Ik zou een vraag willen stellen', 'Zou ik een vraag mogen stellen'],
          skills: ['production', 'grammar'],
          grammar: ['conditional']
        }
      ],
    },
    {
      id: 'mission', title: 'The Future Discussion', kind: 'personalise',
      intro: 'A colleague asks about the future of the company.',
      exercises: [{
        id: 'spec-5', kind: 'conversation', prompt: 'Hoe zie jij de toekomst van ons bedrijf?',
        missionGoals: [
          { id: 'future', label: 'Predict a change', keywords: ['zal', 'zullen', 'veranderen', 'groeien'] },
          { id: 'hypothetical', label: 'Use a hypothetical', keywords: ['zou', 'stel', 'denk'] }
        ],
        context: 'Speculate about two things that might happen in the next 5 years. Use "zal" or "zullen".',
        vocabulary: ['toekomst', 'bedrijf', 'veranderen', 'groeien'],
        grammar: ['future tense'],
        skills: ['speaking', 'production'],
        aiPersonality: { isDifficult: true, style: 'colloquial', pushbackProbability: 0.8 },
        simulatorResponse: 'Interessant. Maar denk je echt dat we zo snel zullen groeien?'
      }]
    }
  ]
}

export const socialNuanceChapter: Chapter = {
  slug: 'sociale-nuances',
  level: 'B2',
  title: 'Social Nuance',
  capability: 'Adapt speech to context and use pragmatic markers to sound more natural.',
  description: 'Learn the unwritten rules of Dutch communication using particles like "even", "hoor", and "nou".',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'discover', title: 'Pragmatic Markers', kind: 'discover',
      intro: 'Dutch speakers use small words to change the "feeling" of a sentence.',
      exercises: [{
        id: 'sn-1', kind: 'info', prompt: 'Softening with "Even" and "Hoor"',
        context: 'Even: Softens a request. "Wacht even" (Wait a second) vs "Wacht" (Wait!).\nHoor: Adds reassurance or emphasis. "Het is goed hoor" (It is fine, really).',
        skills: ['recognition', 'meaning'],
        vocabulary: ['even', 'hoor', 'eigenlijk', 'toch']
      }],
    },
    {
      id: 'understand', title: 'Contextual Choice', kind: 'understand',
      intro: 'Choose the most natural way to respond in these social situations.',
      exercises: [
        {
          id: 'sn-2b', kind: 'pragmatic-drill', 
          prompt: 'You are at a formal work meeting and you need to ask a question.',
          context: 'A colleague is speaking, but you need clarification.',
          skills: ['pragmatic'],
          pragmaticOptions: [
            { 
              text: 'Ik heb een vraag.', 
              context: 'Direct', 
              isBest: false, 
              explanation: 'Technically correct but a bit abrupt for a formal meeting.' 
            },
            { 
              text: 'Mag ik even iets vragen?', 
              context: 'Natural/Polite', 
              isBest: true, 
              explanation: 'The use of "mag" and "even" makes this a polite, professional interruption.' 
            },
            { 
              text: 'Hé, luister naar mij!', 
              context: 'Inappropriate', 
              isBest: false, 
              explanation: 'Way too aggressive for a Dutch work environment!' 
            }
          ]
        }
      ]
    },
    {
      id: 'retrieve', title: 'The Natural Response', kind: 'retrieve',
      intro: 'Try to make these sentences sound more Dutch.',
      exercises: [
        { 
          id: 'sn-2', kind: 'typed', prompt: 'Wait a second.', 
          target: 'Wacht even', 
          skills: ['production', 'grammar'],
          vocabulary: ['wacht', 'even']
        },
        { 
          id: 'sn-3', kind: 'typed', prompt: 'I am coming, really.', 
          target: 'Ik kom eraan hoor', 
          skills: ['production', 'grammar'],
          vocabulary: ['komen', 'hoor']
        }
      ],
    },
    {
      id: 'flexibility', title: 'Direct vs Natural', kind: 'transform',
      intro: 'Rewrite these direct sentences to be more polite or natural.',
      exercises: [
        { 
          id: 'sn-4', kind: 'transformation', prompt: 'Ik wil koffie.', 
          context: 'Make it more polite using "graag" or "zou".',
          target: 'Ik zou graag koffie willen', 
          acceptedAnswers: ['Mag ik een koffie?', 'Koffie graag'],
          skills: ['production', 'grammar']
        }
      ],
    },
    {
      id: 'mission', title: 'The Social Interaction', kind: 'personalise',
      intro: 'You are at a birthday party. A Dutch person offers you a drink you don\'t like.',
      exercises: [{
        id: 'sn-5', kind: 'conversation', prompt: 'Wil je nog een biertje?',
        context: 'Politely decline, but use a pragmatic marker like "hoor" or "wel" to sound friendly.',
        vocabulary: ['bedankt', 'hoor', 'genoeg', 'eigenlijk'],
        grammar: ['negation'],
        skills: ['speaking', 'production'],
        aiPersonality: { isDifficult: false, style: 'helpful', pushbackProbability: 0.2 },
        simulatorResponse: 'Geen probleem! Wil je dan misschien wat fris?'
      }]
    }
  ]
}

export const workplaceChapter: Chapter = {
  id: 'b2-workplace',
  slug: 'dutch-workplace',
  title: 'The Dutch Workplace',
  level: 'B2',
  capability: 'Navigate professional discussions and adapt speech to the workplace context.',
  description: 'Learn to handle project delays and professional feedback in a Dutch environment.',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'shadow', title: 'Professional Shadowing', kind: 'understand',
      intro: 'Listen to a colleague explaining a project delay. Practice your flow and automaticity.',
      exercises: [
        {
          id: 'work-shadow-1',
          kind: 'listening',
          prompt: 'Listen carefully to the rhythm and intonation.',
          transcript: 'Helaas hebben we een kleine vertraging opgelopen bij het ontwikkelen van de nieuwe software.',
          translation: 'Unfortunately, we have encountered a small delay in developing the new software.',
          skills: ['listening', 'automaticity'],
          vocabulary: ['helaas', 'vertraging', 'opgelopen', 'ontwikkelen'],
          wordHints: {
            'helaas': { meaning: 'unfortunately', category: 'adverb' },
            'vertraging': { meaning: 'delay', category: 'noun' },
            'opgelopen': { meaning: 'encountered / incurred', category: 'verb' },
            'ontwikkelen': { meaning: 'to develop', category: 'verb' }
          }
        }
      ]
    },
    {
      id: 'flex', title: 'Structural Flexibility', kind: 'drill',
      intro: 'Rephrase the explanation to focus on different aspects while maintaining professional tone.',
      exercises: [
        {
          id: 'work-flex-1',
          kind: 'flexibility',
          prompt: 'Say the same thing, but start with "Vanwege een probleem..." (Because of a problem...)',
          target: 'Vanwege een probleem hebben we een kleine vertraging opgelopen bij de software.',
          requiredWords: ['vanwege', 'opgelopen'],
          forbiddenWords: ['helaas'],
          skills: ['grammar', 'flexibility'],
          grammar: ['inversion']
        }
      ]
    },
    {
      id: 'mission', title: 'The Status Update', kind: 'personalise',
      intro: 'A manager asks for an update on the delay. Be professional and propose a solution.',
      exercises: [{
        id: 'work-mission-1',
        kind: 'conversation',
        prompt: 'Explain the situation to Jan.',
        intro: 'Your manager, Jan, is waiting for an update.',
        simulatorResponse: 'Ik begrijp het, maar wanneer verwacht je dat het project nu klaar is?',
        skills: ['speaking', 'interaction'],
        missionGoals: [
          { id: 'apology', label: 'Explain the situation professionally', keywords: ['helaas', 'vertraging', 'probleem'] },
          { id: 'solution', label: 'Propose a timeline', keywords: ['volgende week', 'klaar', 'afgerond'] }
        ]
      }]
    }
  ]
}

export const mediationChapter: Chapter = {
  id: 'b2-mediation',
  slug: 'mediating-information',
  title: 'Mediating Information',
  level: 'B2',
  capability: 'Summarise and explain information for others in Dutch.',
  description: 'Learn to translate formal contexts into natural Dutch explanations.',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'letter', title: 'The Formal Letter', kind: 'understand',
      intro: 'Read this formal notification about roadworks in your neighborhood.',
      exercises: [
        {
          id: 'med-1',
          kind: 'reading',
          prompt: 'Notice the key details in this formal announcement.',
          readingContent: 'Geachte bewoner, op maandag 21 augustus starten wij met grootschalige onderhoudswerkzaamheden aan de Kerkstraat. De straat zal voor alle verkeer afgesloten zijn tot en met vrijdag 25 augustus. Wij verzoeken u vriendelijk uw auto elders te parkeren gedurende deze periode.',
          wordHints: {
            'onderhoudswerkzaamheden': { meaning: 'maintenance works', category: 'noun' },
            'afgesloten': { meaning: 'closed off', category: 'adjective' },
            'elders': { meaning: 'elsewhere', category: 'adverb' },
            'gedurende': { meaning: 'during', category: 'preposition' }
          },
          skills: ['reading', 'recognition']
        }
      ]
    },
    {
      id: 'challenge', title: 'Mediation Challenge', kind: 'transform',
      intro: 'Your neighbor, who doesn\'t read Dutch well, asks what the letter says. Explain it simply.',
      exercises: [
        {
          id: 'med-2',
          kind: 'mediation',
          prompt: 'Explain the roadworks to your neighbor in natural Dutch.',
          mediationSource: {
            title: 'Official Notification: Roadworks',
            language: 'nl',
            content: 'Kerkstraat closed from Aug 21 to Aug 25 for major maintenance. No traffic allowed. Park elsewhere.'
          },
          mediationPoints: [
            { id: 'start', label: 'When it starts (Aug 21)', keywords: ['21', 'maandag', 'augustus'] },
            { id: 'end', label: 'When it ends (Aug 25)', keywords: ['25', 'vrijdag'] },
            { id: 'what', label: 'What is happening (Roadworks/Closed)', keywords: ['werkzaamheden', 'dicht', 'afgesloten', 'onderhoud'] },
            { id: 'parking', label: 'Parking instructions', keywords: ['parkeren', 'auto', 'elders'] }
          ],
          skills: ['production', 'flexibility'],
          vocabulary: ['werkzaamheden', 'afgesloten', 'parkeren']
        }
      ]
    },
    {
      id: 'personal', title: 'Personal Application', kind: 'personalise',
      intro: 'Think of a time you had to explain something complex. Try to explain a simple rule from your job or hobby in Dutch.',
      exercises: [
        {
          id: 'med-3',
          kind: 'personalise',
          prompt: 'Explain a "rule" or "process" from your daily life in simple Dutch.',
          skills: ['speaking', 'interaction'],
          grammar: ['subordinate-clauses']
        }
      ]
    }
  ]
}

export const argumentationChapter: Chapter = {
  id: 'b2-argumentation',
  slug: 'logical-flow',
  title: 'Logical Flow & Persuasion',
  level: 'B2',
  capability: 'Construct a coherent argument and persuade others in Dutch.',
  description: 'Learn to use logical connectors to build complex and convincing arguments.',
  estimatedMinutes: 18,
  stages: [
    {
      id: 'discovery', title: 'Connecting Ideas', kind: 'discover',
      intro: 'To argue effectively at B2, you need more than "en" and "maar". Look at these advanced connectors.',
      exercises: [
        {
          id: 'arg-1',
          kind: 'info',
          prompt: 'Advanced Logical Connectors',
          context: 'Bovendien (Furthermore), Daarentegen (On the other hand), Derhalve (Therefore), Immers (After all).',
          skills: ['recognition', 'meaning']
        }
      ]
    },
    {
      id: 'drill', title: 'Connector Drill', kind: 'transform',
      intro: 'Choose the best connector to complete the logical flow of these sentences.',
      exercises: [
        {
          id: 'arg-2',
          kind: 'connector-drill',
          prompt: 'Thuiswerken bespaart veel reistijd. ___ is het soms lastig om de grens tussen werk en privé te bewaken.',
          context: 'Working from home saves travel time. [On the other hand] it is sometimes hard to guard the boundary between work and private life.',
          target: 'Daarentegen',
          connectorOptions: [
            { text: 'Daarentegen', isCorrect: true },
            { text: 'Bovendien', isCorrect: false },
            { text: 'Kortom', isCorrect: false },
            { text: 'Immers', isCorrect: false }
          ],
          skills: ['production', 'coherence'],
          explanation: '"Daarentegen" introduces a contrasting point, which fits perfectly here.'
        },
        {
          id: 'arg-3',
          kind: 'connector-drill',
          prompt: 'Het nieuwe project heeft veel potentie. ___ hebben we meer budget nodig om het succesvol af te ronden.',
          context: 'The new project has a lot of potential. [Therefore] we need more budget to finish it successfully.',
          target: 'Derhalve',
          connectorOptions: [
            { text: 'Derhalve', isCorrect: true },
            { text: 'Hoewel', isCorrect: false },
            { text: 'Daarnaast', isCorrect: false },
            { text: 'Toch', isCorrect: false }
          ],
          skills: ['production', 'coherence'],
          explanation: '"Derhalve" is a formal way to say "therefore" or "consequently".'
        }
      ]
    },
    {
      id: 'persuasion', title: 'The Persuasion Challenge', kind: 'personalise',
      intro: 'Try to persuade someone that a four-day work week is a good idea. Use at least two advanced connectors.',
      exercises: [
        {
          id: 'arg-4',
          kind: 'challenge',
          prompt: 'Argue for a four-day work week. Use connectors like "bovendien", "daarentegen", or "derhalve".',
          minimumLength: 20,
          skills: ['production', 'coherence', 'pragmatic'],
          grammar: ['subordinate-clauses'],
          vocabulary: ['productiviteit', 'balans', 'besparen']
        }
      ]
    }
  ]
}

export const synthesisChapter: Chapter = {
  id: 'b2-synthesis',
  slug: 'synthesizing-dutch',
  title: 'Synthesizing Dutch',
  level: 'B2',
  capability: 'Combine multiple complex structures to express nuanced thoughts.',
  description: 'Practice the art of Dutch "recombination"—using everything you know at once.',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'warmup', title: 'The Power of And', kind: 'understand',
      intro: 'At B2, you don\'t just use one pattern; you layer them. Let\'s look at how to combine a subordinate clause with a past tense movement verb.',
      exercises: [
        {
          id: 'syn-1',
          kind: 'info',
          prompt: 'Recombination Example',
          context: 'Hoewel (Although) + ben gegaan (went). "Hoewel het regende, ben ik toch gegaan." (Although it rained, I went anyway.)',
          skills: ['recognition', 'meaning']
        }
      ]
    },
    {
      id: 'recombine', title: 'Recombination Drills', kind: 'transform',
      intro: 'Use the target concepts to build the requested sentences.',
      exercises: [
        {
          id: 'syn-2',
          kind: 'recombination-drill',
          prompt: 'Explain that you went to the office although you were sick.',
          context: 'Use: "Hoewel" and "Ben gegaan".',
          requiredWords: ['Hoewel', 'ben gegaan'],
          skills: ['production', 'automaticity', 'coherence'],
          correction: 'Hoewel ik ziek was, ben ik toch naar kantoor gegaan.',
          explanation: 'Remember that "hoewel" triggers the verb-at-the-end order, and "ben gegaan" is the correct past tense for motion.'
        },
        {
          id: 'syn-3',
          kind: 'recombination-drill',
          prompt: 'Say that you summarized the report because it was too long.',
          context: 'Use: "Omdat" and "Samengevat".',
          requiredWords: ['Omdat', 'samengevat'],
          skills: ['production', 'automaticity', 'coherence'],
          correction: 'Ik heb het rapport samengevat omdat het te lang was.',
          explanation: 'Combine the past tense "heb samengevat" with the "omdat" subordinate clause.'
        }
      ]
    },
    {
      id: 'final', title: 'The Synthesis Challenge', kind: 'challenge',
      intro: 'Now, try to combine three things: a reason (omdat), a contrast (daarentegen), and a professional verb (overleggen).',
      exercises: [
        {
          id: 'syn-4',
          kind: 'challenge',
          prompt: 'Argue why you need to meet with your colleagues. Use "omdat", "daarentegen", and "overleggen".',
          minimumLength: 25,
          skills: ['production', 'automaticity', 'pragmatic', 'coherence'],
          grammar: ['subordinate-clauses'],
          vocabulary: ['overleggen']
        }
      ]
    }
  ]
}

export const paraphrasingChapter: Chapter = {
  id: 'b2-paraphrasing',
  slug: 'advanced-paraphrasing',
  title: 'Advanced Paraphrasing',
  level: 'B2',
  capability: 'Express the same thought using different grammatical structures and vocabulary.',
  description: 'Master the flexibility required for B2 by learning how to pivot your language when one structure fails or when you want to change emphasis.',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'pivot', title: 'The Pivot', kind: 'understand',
      intro: 'In Dutch, there are often multiple ways to express the same idea. For example, "omdat" (subordinate) vs "want" (main clause).',
      exercises: [
        {
          id: 'para-1',
          kind: 'info',
          prompt: 'Omdat vs Want',
          context: '1. Ik blijf thuis omdat het regent. (Verb at end)\n2. Ik blijf thuis, want het regent. (Verb in position 2)',
          skills: ['recognition', 'meaning']
        }
      ]
    },
    {
      id: 'flex', title: 'Flexibility Drills', kind: 'transform',
      intro: 'Rewrite the sentences using the requested structure.',
      exercises: [
        {
          id: 'para-2',
          kind: 'flexibility',
          prompt: 'Rewrite using "Want": Ik ga niet werken omdat ik ziek ben.',
          forbiddenWords: ['omdat'],
          requiredWords: ['want'],
          target: 'Ik ga niet werken, want ik ben ziek.',
          skills: ['production', 'automaticity'],
          explanation: 'Remember that "want" is a coordinating conjunction, so it doesn\'t change the word order of the following clause.'
        },
        {
          id: 'para-3',
          kind: 'flexibility',
          prompt: 'Rewrite using "Ondanks" (Despite): Hoewel het regende, ging hij wandelen.',
          forbiddenWords: ['hoewel'],
          requiredWords: ['ondanks'],
          target: 'Ondanks de regen ging hij wandelen.',
          skills: ['production', 'automaticity', 'pragmatic'],
          explanation: '"Ondanks" is a preposition and usually takes a noun phrase.'
        }
      ]
    },
    {
      id: 'synonym', title: 'Synonym Substitution', kind: 'transform',
      intro: 'Replace the highlighted words with more advanced B2-level synonyms.',
      exercises: [
        {
          id: 'para-4',
          kind: 'typed',
          prompt: 'Replace "denk dat" with "ben van mening dat": Ik denk dat we meer moeten investeren.',
          target: 'Ik ben van mening dat we meer moeten investeren.',
          skills: ['production', 'pragmatic'],
          explanation: '"Van mening zijn dat" is a more formal and professional way to express an opinion.'
        }
      ]
    },
    {
      id: 'final-para', title: 'Final Challenge: The Rewriter', kind: 'challenge',
      intro: 'Explain the same concept in two different ways. First, use a simple structure. Then, use a more complex, professional structure.',
      exercises: [
        {
          id: 'para-5',
          kind: 'challenge',
          prompt: 'Topic: Remote work is productive. Write two sentences expressing this differently.',
          minimumLength: 40,
          skills: ['production', 'automaticity', 'coherence', 'pragmatic'],
          grammar: ['subordinate-clauses', 'word-order']
        }
      ]
    }
  ]
}

export const registerChapter: Chapter = {
  slug: 'linguistic-register',
  level: 'B2',
  title: 'Linguistic Register',
  capability: 'Adapt speech to social context and formality level.',
  description: 'Learn to switch between casual and formal Dutch depending on who you are talking to.',
  estimatedMinutes: 12,
  stages: [
    {
      id: 'register-intro',
      title: 'Discovering Registers',
      kind: 'discover',
      intro: 'In Dutch, the choice between "je" and "u" is just the beginning. The entire tone of your sentence changes.',
      exercises: [
        {
          id: 'register-info-1',
          kind: 'info',
          prompt: 'Casual vs Formal',
          context: 'Casual: "Hoi, kun je me even helpen?"\nFormal: "Goedendag, zou u mij wellicht kunnen assisteren?"',
          skills: ['recognition', 'meaning']
        }
      ]
    },
    {
      id: 'register-idioms',
      title: 'Using Idioms Naturally',
      kind: 'transform',
      intro: 'Idioms like "Met de deur in huis vallen" can be used in different registers, but they often sound better in specific contexts.',
      exercises: [
        {
          id: 'register-idiom-1',
          kind: 'typed',
          prompt: 'Use "Met de deur in huis vallen" to say you\'ll get straight to the point.',
          target: 'Ik zal meteen met de deur in huis vallen.',
          skills: ['production', 'idiomatic'],
          idioms: ['Met de deur in huis vallen']
        }
      ]
    },
    {
      id: 'register-switcher',
      title: 'The Formality Switcher',
      kind: 'transform',
      intro: 'Express the same core thought for three different audiences.',
      exercises: [
        {
          id: 'register-switch-1',
          kind: 'formality-drill',
          prompt: 'I want to know if I can leave early today.',
          skills: ['pragmatic', 'production'],
          formalityLevels: [
            { level: 'casual', prompt: 'Asking a close colleague/friend.', target: 'Kan ik vandaag wat eerder weg?' },
            { level: 'neutral', prompt: 'Asking your team lead in a meeting.', target: 'Zou ik vandaag eventueel wat eerder weg kunnen?' },
            { level: 'formal', prompt: 'Asking the department director.', target: 'Zou het schikken als ik vandaag iets eerder vertrek?' }
          ]
        }
      ]
    },
    {
      id: 'register-final',
      title: 'Adapt to Context',
      kind: 'personalise',
      intro: 'Scenario: You are at a networking event. You meet a potential business partner.',
      exercises: [
        {
          id: 'register-mission-1',
          kind: 'conversation',
          requiredRegister: 'formal',
          prompt: 'Introduce yourself and ask about their business politely.',
          skills: ['speaking', 'pragmatic'],
          aiPersonality: { style: 'polite', isDifficult: true },
          missionGoals: [
            { id: 'goal-u', label: 'Use formal "u"', keywords: ['u', 'uw'] },
            { id: 'goal-polite', label: 'Use "zou" or "graag"', keywords: ['zou', 'graag'] }
          ]
        }
      ]
    },
    {
      id: 'register-switch',
      title: 'The Tutoyeer Switch',
      kind: 'personalise',
      intro: 'In this mission, you start formally, but look for the moment to switch to "je".',
      exercises: [
        {
          id: 'register-mission-2',
          kind: 'conversation',
          requiredRegister: 'formal',
          prompt: 'You are talking to an older neighbor you don\'t know well. Start formally: "Goedemorgen, hoe gaat het met u?"',
          skills: ['speaking', 'pragmatic'],
          aiPersonality: { style: 'helpful', isDifficult: false },
          simulatorResponse: 'Goedemorgen! Met mij gaat het prima hoor. Maar zeg maar "je" en "jij" tegen me, we zijn immers buren!',
          missionGoals: [
            { id: 'start-u', label: 'Start with formal "u"', keywords: ['u', 'uw'] },
            { id: 'switch-je', label: 'Switch to informal after requested', keywords: ['je', 'jij', 'jou', 'jouw'], setRegister: 'informal' }
          ]
        }
      ]
    }
  ]
}

export const selfCorrectionChapter: Chapter = {
  slug: 'zelfcorrectie',
  level: 'B2',
  title: 'The art of self-correction',
  capability: 'Identify and repair complex errors in your own and others\' Dutch speech and writing.',
  description: 'Master the ability to monitor your language use, spotting subtle word order and grammatical slips before they become habits.',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'discover', title: 'Monitoring Mistakes', kind: 'discover',
      intro: 'B2 learners don\'t just speak; they monitor. If you hear yourself say "Gisteren ik ging...", you should immediately correct it to "Gisteren ging ik...".',
      exercises: [{ 
        id: 'correct-1', kind: 'info', prompt: 'Common slip-ups', 
        context: '1. Gisteren ik ging (Wrong) -> Gisteren ging ik (Right)\n2. Omdat ik ben ziek (Wrong) -> Omdat ik ziek ben (Right)\n3. Ik heb gebleven (Wrong) -> Ik ben gebleven (Right)', 
        skills: ['recognition', 'grammar']
      }],
    },
    {
      id: 'teacher-mode', title: 'Teacher Mode', kind: 'understand',
      intro: 'A student wrote a short email. Can you spot and fix the 3 errors?',
      exercises: [{ 
        id: 'correct-2', kind: 'correction-challenge', prompt: 'Fix the student\'s email.', 
        skills: ['recognition', 'grammar', 'writing'],
        correctionData: {
          originalText: 'Beste collega, ik wil graag weten of je komt naar de vergadering. Gisteren ik heb je niet gezien. Ik heb naar huis gegaan om 5 uur.',
          mistakes: [
            { segment: 'je komt naar de vergadering', correction: 'je naar de vergadering komt', explanation: 'Word order in a subordinate clause (of-clause).' },
            { segment: 'Gisteren ik heb', correction: 'Gisteren heb ik', explanation: 'Inversion after an adverb of time (Gisteren).' },
            { segment: 'Ik heb naar huis gegaan', correction: 'Ik ben naar huis gegaan', explanation: 'Movement verbs like "gaan" use "zijn".' }
          ]
        }
      }],
    },
    {
      id: 'transformation', title: 'Repair Drill', kind: 'transform',
      intro: 'Correct these sentences as quickly as possible.',
      exercises: [
        { 
          id: 'correct-3', kind: 'transformation', prompt: 'Repair: Ik denk dat hij is moe.', 
          target: 'Ik denk dat hij moe is.', 
          skills: ['production', 'automaticity'],
          grammar: ['word-order'],
          automaticitySeconds: 5
        },
        { 
          id: 'correct-4', kind: 'transformation', prompt: 'Repair: Morgen we gaan naar zee.', 
          target: 'Morgen gaan we naar zee.', 
          skills: ['production', 'automaticity'],
          grammar: ['word-order'],
          automaticitySeconds: 5
        }
      ],
    },
    {
      id: 'personalise', title: 'The Mirror', kind: 'personalise',
      intro: 'Write 3 sentences about your week, but deliberately include one mistake, then correct it yourself.',
      exercises: [{ 
        id: 'correct-5', kind: 'challenge', prompt: 'Describe your week and perform a self-correction.', 
        skills: ['writing', 'pragmatic'],
        targetVocabulary: ['gisteren', 'omdat', 'gegaan'],
        explanation: 'Show that you can identify a word order or auxiliary verb error and fix it.'
      }],
    }
  ]
}

export const circumlocutionChapter: Chapter = {
  slug: 'omschrijving-en-flexibiliteit',
  level: 'B2',
  title: 'Circumlocution & Precision',
  capability: 'Circumvent vocabulary gaps by using definitions and more general terms to explain complex ideas.',
  description: 'Learn how to keep a conversation flowing even when you lack a specific word. Master the art of describing abstract concepts using the Dutch you already know.',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'discover', title: 'The B2 Bridge', kind: 'discover',
      intro: 'A key B2 skill is "strategic competence". When you don\'t know the word for "Sustainability", don\'t stop speaking. Explain it!',
      exercises: [{ 
        id: 'circ-1', kind: 'info', prompt: 'Strategic Circumlocution', 
        context: 'Instead of saying "Duurzaamheid" (Sustainability), you could say:\n"Het rekening houden met de toekomst en de natuur, zodat bronnen niet opraken."', 
        skills: ['recognition', 'pragmatic']
      }],
    },
    {
      id: 'practice', title: 'Explaining the Abstract', kind: 'retrieve',
      intro: 'Try to describe these concepts without using the forbidden words.',
      exercises: [
        { 
          id: 'circ-2', kind: 'circumlocution', prompt: 'Describe "Privacy"', 
          skills: ['production', 'writing', 'pragmatic'],
          forbiddenWords: ['privacy', 'prive', 'geheim', 'alleen'],
          minimumLength: 30,
          circumlocutionData: {
            concept: 'Privacy',
            requiredKeywords: ['recht', 'anderen', 'zien']
          }
        },
        { 
          id: 'circ-3', kind: 'circumlocution', prompt: 'Describe "Duurzaamheid"', 
          skills: ['production', 'speaking', 'pragmatic'],
          forbiddenWords: ['duurzaam', 'milieu', 'natuur', 'groen'],
          minimumLength: 40,
          circumlocutionData: {
            concept: 'Sustainability',
            requiredKeywords: ['toekomst', 'lang', 'gebruiken']
          }
        }
      ],
    },
    {
      id: 'transformation', title: 'Paraphrasing Challenge', kind: 'transform',
      intro: 'Rewrite these specific sentences to be more descriptive and avoid one "lazy" word.',
      exercises: [
        { 
          id: 'circ-4', kind: 'flexibility', prompt: 'Rewrite without using "leuk": "Ik vind dit project erg leuk."', 
          target: 'Ik vind dit project erg interessant en leerzaam.', 
          skills: ['production', 'flexibility'],
          forbiddenWords: ['leuk'],
          requiredWords: ['interessant']
        }
      ],
    },
    {
      id: 'personalise', title: 'Your Own Gap', kind: 'personalise',
      intro: 'Think of a word you often struggle with in Dutch. Describe it now without using the word itself.',
      exercises: [{ 
        id: 'circ-5', kind: 'challenge', prompt: 'Describe a difficult concept from your professional or personal life.', 
        skills: ['writing', 'production'],
        explanation: 'Focus on explaining the purpose, function, or feeling associated with the concept.'
      }],
    }
  ]
}

export const nuanceChapter: Chapter = {
  slug: 'de-ziel-van-het-nederlands',
  level: 'B2',
  title: 'Natural Flow & Particles',
  capability: 'Use modal particles to soften requests, express attitude, and sound more like a native speaker.',
  description: 'Technically correct Dutch can sometimes sound stiff or rude. Learn how "hoor", "even", and "maar" act as the social grease of the language.',
  estimatedMinutes: 12,
  stages: [
    {
      id: 'discover', title: 'The Social Grease', kind: 'discover',
      intro: 'In Dutch, "Ik wil koffie" is a bit too direct. Native speakers use particles to make it sound friendly.',
      exercises: [{ 
        id: 'nuance-1', kind: 'info', prompt: 'Modal Particles', 
        context: 'Wait a moment:\n- Wacht.\n- Wacht even hoor.', 
        skills: ['recognition', 'pragmatic']
      }],
    },
    {
      id: 'practice', title: 'Injection Challenge', kind: 'retrieve',
      intro: 'Take these stiff sentences and inject the right particles to make them natural.',
      exercises: [
        { 
          id: 'nuance-2', kind: 'nuance-drill', prompt: 'Make it natural: "Ik ga naar huis."', 
          context: 'Ik ga naar huis.',
          skills: ['production', 'pragmatic'],
        },
        { 
          id: 'nuance-3', kind: 'nuance-drill', prompt: 'Make it softer: "Geef mij de krant."', 
          context: 'Geef mij de krant.',
          skills: ['production', 'pragmatic'],
        }
      ],
    },
    {
      id: 'personalise', title: 'Daily Softening', kind: 'personalise',
      intro: 'Think of a typical request you make at work or at home. Try to say it now with at least two particles.',
      exercises: [{ 
        id: 'nuance-4', kind: 'challenge', prompt: 'Ask someone to help you with a task using natural Dutch.', 
        skills: ['writing', 'production', 'pragmatic']
      }],
    }
  ]
}

export const collocationChapter: Chapter = {
  slug: 'professionele-precisie',
  level: 'B2',
  title: 'Professional Precision',
  capability: 'Use precise collocations and word pairings to sound accurate and professional in Dutch.',
  description: 'Avoid literal translations from English. Master the word pairings that native speakers use for meetings, projects, and decisions.',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'discover', title: 'Native Pairings', kind: 'discover',
      intro: 'Certain verbs and nouns always go together. We don\'t "make" a choice, we "take" one.',
      exercises: [{ 
        id: 'coll-1', kind: 'info', prompt: 'Essential Collocations', 
        context: 'Nemen vs. Maken:\n- Een besluit nemen (To make a decision)\n- Een afspraak maken (To make an appointment)', 
        skills: ['recognition']
      }],
    },
    {
      id: 'practice', title: 'The Right Verb', kind: 'retrieve',
      intro: 'Choose the correct verb to complete the collocation.',
      exercises: [
        { 
          id: 'coll-2', kind: 'collocation-drill', prompt: 'We moeten een belangrijk {target}.', 
          context: 'besluit',
          target: 'nemen',
          options: ['maken', 'nemen', 'doen', 'hebben'],
          forbiddenWords: ['maken'],
          skills: ['production'],
        },
        { 
          id: 'coll-3', kind: 'collocation-drill', prompt: 'Kan ik even {target}?', 
          context: 'een vraag stellen',
          target: 'stellen',
          options: ['maken', 'doen', 'stellen', 'vragen'],
          forbiddenWords: ['maken'],
          skills: ['production'],
        }
      ],
    },
    {
      id: 'transformation', title: 'Correcting Anglicisms', kind: 'transform',
      intro: 'Rewrite these sentences using more natural Dutch collocations.',
      exercises: [
        { 
          id: 'coll-4', kind: 'flexibility', prompt: 'Change "maken" to the correct verb: "Ik ga mijn best maken."', 
          target: 'Ik ga mijn best doen.', 
          skills: ['production', 'flexibility'],
          forbiddenWords: ['maken'],
          requiredWords: ['doen']
        }
      ],
    }
  ]
}

export const a1Capstone: Chapter = {
  slug: 'a1-survival-mission',
  level: 'A1',
  title: 'Survival in Amsterdam',
  capability: 'Navigate a typical day in a Dutch-speaking city by combining survival skills.',
  description: 'Apply everything you have learned in A1. Introduce yourself to a neighbor, ask for directions, and buy items at a shop.',
  estimatedMinutes: 20,
  isCapstone: true,
  stages: [
    {
      id: 'mission', title: 'The Survival Challenge', kind: 'personalise',
      intro: 'You just arrived in Amsterdam. Your goal is to settle in by interacting with the locals.',
      exercises: [
        {
          id: 'a1-cap-1', kind: 'conversation', 
          prompt: 'Your neighbor greets you: "Hoi! Ben je hier nieuw?"',
          skills: ['speaking', 'production', 'pragmatic'],
          missionGoals: [
            { id: 'intro', label: 'Introduce yourself', keywords: ['ik ben', 'naam', 'uit'] },
            { id: 'directions', label: 'Ask for the supermarket', keywords: ['supermarkt', 'waar', 'is'] },
            { id: 'bakery', label: 'Order two croissants', keywords: ['twee', 'croissants', 'alstublieft', 'graag'] }
          ],
          aiPersonality: { style: 'helpful' }
        }
      ]
    }
  ]
}

export const b2Capstone: Chapter = {
  slug: 'b2-professional-integration',
  level: 'B2',
  title: 'Professional Integration',
  capability: 'Engage in complex professional interactions, including presentation, negotiation, and persuasion.',
  description: 'The ultimate test of your B2 Dutch. Navigate a job interview, negotiate your terms, and defend your professional opinions.',
  estimatedMinutes: 30,
  isCapstone: true,
  stages: [
    {
      id: 'mission', title: 'The Career Challenge', kind: 'personalise',
      intro: 'You are at a job interview for a Dutch company. You need to prove not just your skills, but your ability to function in a Dutch professional environment.',
      exercises: [
        {
          id: 'b2-cap-1', kind: 'conversation', 
          prompt: 'The interviewer starts: "Welkom. Waarom denkt u dat u de juiste persoon bent voor deze functie?"',
          skills: ['speaking', 'production', 'pragmatic', 'coherence'],
          missionGoals: [
            { id: 'background', label: 'Present your background', keywords: ['ervaring', 'verantwoordelijk', 'gewerkt'] },
            { id: 'salary', label: 'Negotiate salary/benefits', keywords: ['salaris', 'arbeidsvoorwaarden', 'onderhandelen'] },
            { id: 'remote', label: 'Argue for remote work flexibility', keywords: ['thuiswerken', 'productiviteit', 'balans', 'hoewel'] },
            { id: 'difficult', label: 'Handle a pushback on your experience', keywords: ['toch', 'daarentegen', 'namelijk', 'mening'] }
          ],
          aiPersonality: { isDifficult: true, style: 'colloquial', pushbackProbability: 0.8 }
        }
      ]
    }
  ]
}

export const mirroringChapter: Chapter = {
  slug: 'native-mirroring-challenge',
  level: 'B2',
  title: 'Native Mirroring',
  capability: 'Transform grammatically correct but stiff Dutch into natural, native-like phrasing.',
  description: 'Learn to use Dutch like a native speaker by mastering modal particles, natural word order, and idiomatic flow.',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'mirror-1', title: 'Mirroring Particles', kind: 'retrieve',
      intro: 'Dutch uses small particles like "even", "hoor", and "maar" to soften speech. Let\'s practice adding them.',
      exercises: [
        {
          id: 'mir-1', kind: 'mirroring', 
          prompt: 'You are at a cafe. Ask the waiter to wait a moment.',
          context: 'Kunt u even wachten?', // Stiff version (wait, even is actually natural, let's make it stiffer)
          // Wait, actually I should show the stiff one:
          // "Kunt u wachten?" -> "Kunt u even wachten?"
        }
      ]
    }
  ]
}

// Correcting the example
mirroringChapter.stages[0].exercises[0].context = 'Kunt u wachten?'
mirroringChapter.stages[0].exercises[0].target = 'Kunt u even wachten?'
mirroringChapter.stages[0].exercises[0].explanation = 'Adding "even" makes the request much more natural and less demanding.'

const mir2: Exercise = {
  id: 'mir-2', kind: 'mirroring',
  prompt: 'A friend asks if you are coming. Confirm you are.',
  context: 'Ja, ik kom.',
  target: 'Ja, ik kom eraan hoor!',
  explanation: 'Using "eraan" and "hoor" adds a layer of natural reassurance and flow.'
}

mirroringChapter.stages[0].exercises.push(mir2)

export const precisionChapter: Chapter = {
  slug: 'precision-and-nuance',
  level: 'B2',
  title: 'B2 Precision & Nuance',
  capability: 'Express complex ideas with precision and use reflexive verbs naturally.',
  description: 'Move beyond "good" and "bad". Learn to use precise Dutch vocabulary and master the tricky reflexive verbs.',
  estimatedMinutes: 12,
  stages: [
    {
      id: 'reflexive-discovery', title: 'Discovery: Reflexive Verbs', kind: 'discover',
      intro: 'Some Dutch verbs need a "reflexive pronoun" (me, je, zich).',
      exercises: [
        {
          id: 'refl-1', kind: 'info', prompt: 'Common Reflexive Verbs',
          context: 'Reflexive pronouns follow the verb:\n- ik herinner me (I remember)\n- jij vergist je (you are mistaken)\n- hij voelt zich (he feels)',
          skills: ['recognition'],
          vocabulary: ['herinneren', 'vergissen', 'voelen']
        }
      ]
    },
    {
      id: 'precision-drills', title: 'Vocabulary Precision', kind: 'transform',
      intro: 'In B2, we replace common "lazy" words with more professional synonyms.',
      exercises: [
        {
          id: 'prec-1', kind: 'precision-drill', 
          prompt: 'Dat is een goed plan.',
          context: 'goed -> uitstekend',
          target: 'Dat is een uitstekend plan.',
          skills: ['production', 'flexibility'],
          vocabulary: ['uitstekend']
        },
        {
          id: 'prec-2', kind: 'precision-drill', 
          prompt: 'Ik heb een groot probleem.',
          context: 'groot -> aanzienlijk',
          target: 'Ik heb een aanzienlijk probleem.',
          skills: ['production', 'flexibility'],
          vocabulary: ['aanzienlijk']
        }
      ]
    },
    {
      id: 'fixed-prepositions', title: 'Fixed Prepositions', kind: 'retrieve',
      intro: 'Many verbs only work with one specific preposition.',
      exercises: [
        {
          id: 'prep-1', kind: 'typed', prompt: 'Say: I am waiting for the results.',
          target: 'Ik wacht op de resultaten.',
          explanation: 'Wachten always goes with "op".',
          skills: ['production', 'meaning'],
          vocabulary: ['wachten op']
        },
        {
          id: 'prep-2', kind: 'typed', prompt: 'Say: I am interested in this job.',
          target: 'Ik ben geïnteresseerd in deze baan.',
          explanation: 'Geïnteresseerd always goes with "in".',
          skills: ['production', 'meaning'],
          vocabulary: ['geïnteresseerd in']
        }
      ]
    },
    {
      id: 'final-mission', title: 'Final Mission: The Performance Review', kind: 'personalise',
      intro: 'Apply your precision and reflexive verbs in a professional performance review.',
      exercises: [
        {
          id: 'prec-mission', kind: 'conversation',
          prompt: 'Your manager says: "Hoe voel je je over je prestaties van het afgelopen jaar?"',
          skills: ['speaking', 'production', 'pragmatic'],
          missionGoals: [
            { id: 'feel', label: 'Explain how you feel (reflexive)', keywords: ['voel me', 'herinner me'] },
            { id: 'precise', label: 'Use precise adjectives', keywords: ['uitstekend', 'aanzienlijk', 'indrukwekkend'] },
            { id: 'prep', label: 'Use a fixed preposition', keywords: ['trots op', 'rekenen op', 'wachten op'] }
          ],
          aiPersonality: { style: 'professional', isDifficult: false }
        }
      ]
    }
  ]
}

export const inferenceChapter: Chapter = {
  slug: 'reading-between-the-lines',
  level: 'B2',
  title: 'Reading Between the Lines',
  capability: 'Understand implied meaning and pragmatics in Dutch communication.',
  description: 'Dutch directness is famous, but subtle understatements and pragmatic particles change everything. Learn to hear what isn\'t being said.',
  estimatedMinutes: 10,
  stages: [
    {
      id: 'inference-discovery', title: 'Discovery: Implied Meaning', kind: 'discover',
      intro: 'In Dutch, some statements are actually requests or polite disagreements.',
      exercises: [
        {
          id: 'inf-1', kind: 'inference-challenge', 
          prompt: 'Het is hier een beetje fris, vind je niet?',
          context: 'The speaker wants to talk about the weather:false|The speaker wants you to close the window:true|The speaker is asking for your opinion on the temperature:false',
          explanation: 'This is a classic Dutch "indirect request". By pointing out it\'s chilly, they are subtly asking to close the window or turn up the heat.',
          skills: ['recognition', 'pragmatic']
        },
        {
          id: 'inf-2', kind: 'inference-challenge', 
          prompt: 'Zou je dat nou wel doen?',
          context: 'The speaker is curious about your plans:false|The speaker thinks your plan is a bad idea:true|The speaker wants to join you:false',
          explanation: 'The word "nou" combined with "zou je dat wel doen" is a common way to express doubt or subtle disapproval without being overly aggressive.',
          skills: ['recognition', 'pragmatic']
        }
      ]
    },
    {
      id: 'pragmatic-particles', title: 'Pragmatic Particles', kind: 'understand',
      intro: 'Particles like "hoor", "even", and "maar" change the tone of a sentence.',
      exercises: [
        {
          id: 'part-1', kind: 'inference-challenge', 
          prompt: 'Kom maar binnen hoor!',
          context: 'The speaker is impatient:false|The speaker is being very welcoming and reassuring:true|The speaker is telling you to hurry up:false',
          explanation: '"Maar" softens the command, and "hoor" adds a layer of reassurance. It means "You are absolutely welcome to come in, don\'t hesitate."',
          skills: ['recognition', 'pragmatic']
        }
      ]
    },
    {
      id: 'nuance-production', title: 'Injecting Nuance', kind: 'transform',
      intro: 'Now try to make stiff sentences sound more natural and subtle.',
      exercises: [
        {
          id: 'nuance-1', kind: 'nuance-drill', 
          prompt: 'Wacht.',
          context: 'even',
          target: 'Wacht even.',
          explanation: '"Wacht" sounds like a harsh command. "Wacht even" is much more natural and polite.',
          skills: ['production', 'pragmatic']
        }
      ]
    },
    {
      id: 'final-mission', title: 'Final Mission: The Subtle Colleague', kind: 'personalise',
      intro: 'Handle a conversation with a colleague who uses understatements.',
      exercises: [
        {
          id: 'subtle-mission', kind: 'conversation',
          prompt: 'Your colleague says: "Goh, dat is een... interessant voorstel. Zouden we daar niet nog even naar moeten kijken?"',
          skills: ['speaking', 'production', 'pragmatic'],
          missionGoals: [
            { id: 'understand', label: 'Recognize the doubt', keywords: ['begrijp', 'twijfel', 'niet zeker'] },
            { id: 'soften', label: 'Use a softener in your reply', keywords: ['even', 'misschien', 'eigenlijk'] },
            { id: 'ask', label: 'Ask for clarification', keywords: ['wat bedoel je', 'waarom'] }
          ],
          aiPersonality: { style: 'professional', isDifficult: true }
        }
      ]
    }
  ]
}

export const morphingChapter: Chapter = {
  slug: 'sentence-morphing-agility',
  level: 'B2',
  title: 'Sentence Morphing & Agility',
  capability: 'Building complex arguments step-by-step.',
  description: 'Master the art of evolving simple thoughts into complex, layered Dutch sentences while maintaining grammatical precision.',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'morphing-1',
      title: 'The Morphing Chain',
      kind: 'transform',
      intro: 'Watch how a simple idea grows. Focus on maintaining word order and verb forms as the sentence evolves.',
      exercises: [
        {
          id: 'morph-drill-1',
          kind: 'morphing-drill',
          prompt: 'Morph the sentence step-by-step.',
          skills: ['production', 'automaticity'],
          morphingData: {
            baseSentence: 'Ik blijf thuis.',
            steps: [
              { 
                instruction: 'Add the reason: "because it is raining" (omdat het regent)', 
                target: 'Ik blijf thuis omdat het regent.',
                hint: 'Remember: "omdat" sends the verb to the end!'
              },
              {
                instruction: 'Change the reason to: "because I am tired" (omdat ik moe ben)',
                target: 'Ik blijf thuis omdat ik moe ben.'
              },
              {
                instruction: 'Change the subject to "Jan" (and adapt the verbs!)',
                target: 'Jan blijft thuis omdat hij moe is.'
              },
              {
                instruction: 'Change the time to "yesterday" (gisteren) and use the past tense.',
                target: 'Gisteren bleef Jan thuis omdat hij moe was.',
                hint: 'Careful with inversion: Gisteren bleef Jan...'
              }
            ]
          }
        }
      ]
    },
    {
      id: 'morphing-2',
      title: 'Complex Recombination',
      kind: 'transform',
      intro: 'Now try a more professional sequence involving subordinate clauses and modals.',
      exercises: [
        {
          id: 'morph-drill-2',
          kind: 'morphing-drill',
          prompt: 'Build a professional argument.',
          skills: ['production', 'automaticity', 'coherence'],
          morphingData: {
            baseSentence: 'Het plan is goed.',
            steps: [
              {
                instruction: 'Add a condition: "if we have more time" (als we meer tijd hebben)',
                target: 'Het plan is goed als we meer tijd hebben.'
              },
              {
                instruction: 'Change it to: "although we have little time" (hoewel we weinig tijd hebben)',
                target: 'Het plan is goed hoewel we weinig tijd hebben.',
                hint: 'Hoewel is a subordinate conjunction - verb at the end!'
              },
              {
                instruction: 'Add a professional softener: "I think that..." (Ik denk dat...)',
                target: 'Ik denk dat het plan goed is hoewel we weinig tijd hebben.',
                hint: 'Now both clauses have "verb-at-end" order!'
              },
              {
                instruction: 'Switch to a more formal "In my opinion" (Naar mijn mening...)',
                target: 'Naar mijn mening is het plan goed hoewel we weinig tijd hebben.',
                hint: 'Inversion after "Naar mijn mening"!'
              }
            ]
          }
        }
      ]
    }
  ]
}

export const persuasionChapter: Chapter = {
  slug: 'the-art-of-persuasion',
  level: 'B2',
  title: 'The Art of Persuasion',
  capability: 'Arguing a position and persuading others.',
  description: 'Learn to structure complex arguments, use logical connectors, and defend your position in a professional Dutch context.',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'persuasion-1',
      title: 'Selective Listening',
      kind: 'understand',
      intro: 'Listen to a professional debate and catch the exact logical connectors used to bridge ideas.',
      exercises: [
        {
          id: 'persuasion-cloze-1',
          kind: 'listening-cloze',
          prompt: 'Listen and fill in the connectors.',
          skills: ['listening', 'coherence'],
          clozeData: {
            textWithGaps: 'Het plan is ambitieus, [..] zijn er risico\'s. We moeten [..] voorzichtig zijn.',
            answers: ['daarentegen', 'derhalve']
          },
          transcript: 'Het plan is ambitieus, daarentegen zijn er risico\'s. We moeten derhalve voorzichtig zijn.',
          translation: 'The plan is ambitious, on the other hand there are risks. We must therefore be careful.'
        }
      ]
    },
    {
      id: 'persuasion-2',
      title: 'The Great Debate',
      kind: 'personalise',
      intro: 'It\'s time to argue your case. Use the logical connectors you\'ve learned to build a coherent and persuasive argument.',
      exercises: [
        {
          id: 'debate-1',
          kind: 'debate',
          prompt: 'Should companies implement a four-day work week?',
          skills: ['speaking', 'coherence', 'persuasion' as any],
          debateData: {
            phases: [
              { id: 'opening', label: 'Opening Statement', prompt: 'Wat is uw standpunt over de vierdaagse werkweek? Waarom is dit een goed of slecht idee?' },
              { id: 'counter', label: 'Rebuttal', prompt: 'Maar hoe zit het met de bereikbaarheid van het bedrijf voor klanten op de vijfde dag?' },
              { id: 'defense', label: 'Defense', prompt: 'Sommige critici zeggen dat de werkdruk op de andere vier dagen te hoog wordt. Wat denkt u?' },
              { id: 'summary', label: 'Conclusion', prompt: 'Kunt u uw belangrijkste argumenten nog eens kort samenvatten?' }
            ],
            requiredConnectors: ['bovendien', 'daarentegen', 'immers', 'derhalve', 'enerzijds', 'anderzijds']
          },
          aiPersonality: {
            style: 'helpful',
            isDifficult: true,
            pushbackProbability: 0.8
          },
          missionGoals: [
            { id: 'goal-1', label: 'State position clearly', keywords: ['ik vind', 'naar mijn mening', 'volgens mij'] },
            { id: 'goal-2', label: 'Use at least 3 connectors', keywords: ['bovendien', 'daarentegen', 'immers', 'derhalve'] },
            { id: 'goal-3', label: 'Summarize arguments', keywords: ['kortom', 'samenvattend', 'concluderend'] }
          ]
        }
      ]
    }
  ]
}

export const understatementChapter: Chapter = {
  slug: 'the-art-of-understatement',
  level: 'B2',
  title: 'The Art of Understatement',
  capability: 'Express praise and opinions using culturally appropriate understatements.',
  description: 'Dutch speakers often avoid extreme direct praise. Learn to use "niet verkeerd" and "het valt wel mee" like a native.',
  estimatedMinutes: 10,
  stages: [
    {
      id: 'discover', title: 'Discover', kind: 'discover',
      intro: 'Dutch "nuchterheid" (soberness) means direct praise can sometimes feel a bit "too much".',
      exercises: [
        {
          id: 'under-1', kind: 'info', prompt: 'Subtle Praise',
          context: 'Instead of saying "Het is geweldig!", a Dutch person might say "Het is niet verkeerd." or "Het is best wel goed."',
          skills: ['recognition', 'pragmatic']
        }
      ]
    },
    {
      id: 'retrieve', title: 'Retrieve', kind: 'retrieve',
      intro: 'Practice shifting from direct to understated.',
      exercises: [
        {
          id: 'under-2', kind: 'understatement-drill', 
          prompt: 'Your colleague made a great presentation.',
          context: 'It was an amazing presentation!',
          target: 'Het was niet verkeerd.',
          explanation: 'Use "niet verkeerd" to show you are impressed without being overly dramatic.',
          skills: ['production', 'pragmatic']
        },
        {
          id: 'under-3', kind: 'understatement-drill',
          prompt: 'You just ate at a high-end restaurant.',
          context: 'The food was fantastic!',
          target: 'Het eten was niet slecht.',
          explanation: '"Niet slecht" is high praise in Dutch context.',
          skills: ['production', 'pragmatic']
        }
      ]
    },
    {
      id: 'personalise', title: 'Personalise', kind: 'personalise',
      intro: 'Apply it to your own life.',
      exercises: [
        {
          id: 'under-4', kind: 'personalise',
          prompt: 'Wat vind je van het weer vandaag? (Give an understated opinion)',
          target: 'Het valt wel mee.',
          explanation: 'Use "Het valt wel mee" if it is okay, or "Niet verkeerd" if it is actually good.',
          skills: ['production', 'pragmatic'],
          placeholder: 'Het valt...'
        }
      ]
    },
    {
      id: 'conversation', title: 'Conversation', kind: 'conversation',
      intro: 'Chat with a skeptical Dutch friend.',
      exercises: [
        {
          id: 'under-5', kind: 'conversation',
          prompt: 'Je vriend vraagt: "Vond je die film echt zo goed?" (Try to keep it understated)',
          simulatorResponse: 'Nou, ik vond het niet verkeerd. De sfeer was best wel goed.',
          skills: ['speaking', 'pragmatic'],
          aiPersonality: { style: 'colloquial', isDifficult: true },
          missionGoals: [
            { id: 'under-goal', label: 'Use an understatement', keywords: ['niet verkeerd', 'niet slecht', 'valt wel mee'] }
          ]
        }
      ]
    }
  ]
}

export const logicalFlowChapter: Chapter = {
  slug: 'the-art-of-logical-flow',
  level: 'B2',
  title: 'The Art of Logical Flow',
  capability: 'Structure complex arguments and ensure cohesive flow in Dutch.',
  description: 'Master the organizational patterns and connectors that make Dutch arguments clear and persuasive.',
  estimatedMinutes: 12,
  stages: [
    {
      id: 'discover', title: 'Discover', kind: 'discover',
      intro: 'A good B2-level argument follows a clear structure: Introduction -> Supporting Evidence -> Conclusion.',
      exercises: [
        {
          id: 'flow-1', kind: 'info', prompt: 'Organizational Patterns',
          context: 'In Dutch, starting with a general statement and then providing specific examples with connectors like "bovendien" or "daarnaast" is very effective.',
          skills: ['recognition', 'coherence']
        }
      ]
    },
    {
      id: 'transform', title: 'Transform', kind: 'transform',
      intro: 'Practice reordering scrambled ideas into a logical sequence.',
      exercises: [
        {
          id: 'flow-2', kind: 'cohesion-drill',
          prompt: 'Reorder this argument about working from home.',
          scrambledSentences: [
            'Bovendien bespaart het werknemers veel tijd omdat ze niet hoeven te reizen.',
            'Kortom, thuiswerken heeft zowel persoonlijke als ecologische voordelen.',
            'Daarnaast is het beter voor het milieu door de afname van het verkeer.',
            'In de eerste plaats zorgt thuiswerken voor een betere balans tussen werk en privé.'
          ],
          target: 'In de eerste plaats zorgt thuiswerken voor een betere balans tussen werk en privé. Bovendien bespaart het werknemers veel tijd omdat ze niet hoeven te reizen. Daarnaast is het beter voor het milieu door de afname van het verkeer. Kortom, thuiswerken heeft zowel persoonlijke als ecologische voordelen.',
          explanation: 'Start with the main point (In de eerste plaats), add supporting points (Bovendien, Daarnaast), and finish with a summary (Kortom).',
          skills: ['coherence', 'meaning']
        }
      ]
    },
    {
      id: 'retrieve', title: 'Retrieve', kind: 'retrieve',
      intro: 'Apply logical connectors to bridge these thoughts.',
      exercises: [
        {
          id: 'flow-3', kind: 'connector-drill',
          prompt: 'De overheid wil meer windmolens bouwen. ___ is er veel weerstand van lokale bewoners.',
          context: 'Expressing contrast.',
          connectorOptions: [
            { text: 'Daarentegen', isCorrect: true },
            { text: 'Bovendien', isCorrect: false },
            { text: 'Kortom', isCorrect: false }
          ],
          target: 'Daarentegen',
          explanation: '"Daarentegen" (On the other hand) is perfect for introducing a contrasting viewpoint.',
          skills: ['coherence', 'production']
        }
      ]
    },
    {
      id: 'conversation', title: 'Conversation', kind: 'conversation',
      intro: 'Discuss a complex topic and maintain logical flow.',
      exercises: [
        {
          id: 'flow-4', kind: 'conversation',
          prompt: 'Vind je dat we meer moeten investeren in kernenergie? Gebruik connectors om je argument op te bouwen.',
          simulatorResponse: 'Dat is een interessant punt. Maar hoe zit het met het afvalprobleem?',
          skills: ['speaking', 'coherence', 'pragmatic'],
          missionGoals: [
            { id: 'flow-goal-1', label: 'Use at least two logical connectors', keywords: ['daarnaast', 'bovendien', 'echter', 'kortom', 'daarom'] }
          ]
        }
      ]
    }
  ]
}

export const erChapter: Chapter = {
  slug: 'het-woordje-er',
  level: 'B2',
  title: "The Little Word 'Er'",
  capability: "Use 'er' correctly in all four of its functions and master Dutch position verbs.",
  description: "One of the biggest hurdles for Dutch learners. Move beyond 'zijn' and master the structural heart of the language.",
  estimatedMinutes: 15,
  stages: [
    {
      id: 'discover', title: 'Discover', kind: 'discover',
      intro: "Dutch often avoids using 'zijn' (to be) for objects. Instead, we use position verbs + 'er'.",
      exercises: [
        {
          id: 'er-induction', kind: 'induction', prompt: 'Notice the position verbs',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'A glass on the table', answer: 'Er staat een glas op tafel.' },
              { prompt: 'A book on the floor', answer: 'Er ligt een boek op de grond.' },
              { prompt: 'A coat on the rack', answer: 'Er hangt een jas aan de kapstok.' },
              { prompt: 'A cat on the chair', answer: 'Er zit een kat op de stoel.' }
            ],
            ruleChallenge: 'Which verb would you use for a laptop on a desk?',
            options: [
              { text: 'staat', isCorrect: true },
              { text: 'ligt', isCorrect: false },
              { text: 'hangt', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'understand', title: 'The 4 Roles of Er', kind: 'understand',
      intro: "'Er' isn't just one word; it has four distinct jobs in a sentence.",
      exercises: [
        {
          id: 'er-role-1', kind: 'er-drill', prompt: 'Identify the role of er',
          context: 'Ik woon in Amsterdam. Ik woon er al tien jaar.',
          skills: ['recognition', 'grammar'],
          erDrillData: {
            sentence: 'Ik woon er al tien jaar.',
            options: [
              { text: 'Locative (there)', isCorrect: true, function: 'locative' },
              { text: 'Partitive (of them)', isCorrect: false, function: 'partitive' },
              { text: 'Prepositional', isCorrect: false, function: 'prepositional' },
              { text: 'Subjective', isCorrect: false, function: 'subjective' }
            ],
            explanation: "Here 'er' replaces 'in Amsterdam' (a place)."
          }
        },
        {
          id: 'er-role-2', kind: 'er-drill', prompt: 'Identify the role of er',
          context: 'Hoeveel broers heb je? Ik heb er twee.',
          skills: ['recognition', 'grammar'],
          erDrillData: {
            sentence: 'Ik heb er twee.',
            options: [
              { text: 'Locative', isCorrect: false, function: 'locative' },
              { text: 'Partitive (of them)', isCorrect: true, function: 'partitive' },
              { text: 'Prepositional', isCorrect: false, function: 'prepositional' },
              { text: 'Subjective', isCorrect: false, function: 'subjective' }
            ],
            explanation: "When you have a number without a noun, you need 'er' to mean 'of them'."
          }
        }
      ]
    },
    {
      id: 'retrieve', title: 'Position Retrieval', kind: 'retrieve',
      intro: "Now try to use the correct position verb with 'er'.",
      exercises: [
        {
          id: 'er-pos-1', kind: 'typed', prompt: 'There is a bottle on the table.',
          context: 'Use: fles / tafel',
          target: 'Er staat een fles op tafel.',
          skills: ['production', 'grammar'],
          vocabulary: ['fles', 'tafel', 'staan']
        },
        {
          id: 'er-pos-2', kind: 'typed', prompt: 'There are three people in the room.',
          context: 'Use: mensen / kamer',
          target: 'Er zitten drie mensen in de kamer.',
          skills: ['production', 'grammar'],
          vocabulary: ['mensen', 'zitten']
        }
      ]
    },
    {
      id: 'transform', title: 'Transforming with Er', kind: 'transform',
      intro: "Combine 'er' with prepositions (er + op = erop).",
      exercises: [
        {
          id: 'er-prep-1', kind: 'transformation', prompt: 'Ik reken op je hulp. -> Ik reken ...',
          target: 'Ik reken erop.',
          skills: ['grammar', 'production'],
          explanation: "In Dutch, we don't say 'op het', we say 'erop'."
        }
      ]
    },
    {
      id: 'personalise', title: 'Real World Er', kind: 'personalise',
      intro: "Talk about your own environment using 'er' and position verbs.",
      exercises: [
        {
          id: 'er-pers-1', kind: 'personalise', prompt: 'Wat staat er op dit moment op je bureau?',
          skills: ['production', 'speaking', 'grammar'],
          vocabulary: ['staan', 'liggen', 'bureau'],
          grammar: ['er']
        }
      ]
    }
  ]
}

export const diplomacyChapter: Chapter = {
  slug: 'diplomatie-en-professionaliteit',
  level: 'B2',
  title: "Diplomacy & Professionalism",
  capability: "Navigate delicate professional situations using 'soft' Dutch to maintain relationships.",
  description: "Learn how to deliver bad news, disagree with a manager, or point out errors without being blunt.",
  estimatedMinutes: 18,
  stages: [
    {
      id: 'discover', title: 'The Power of Softeners', kind: 'discover',
      intro: "In Dutch, we use specific words to distance ourselves from a direct statement. This is called 'verzachten'.",
      exercises: [
        {
          id: 'soft-induction', kind: 'induction', prompt: 'Notice the difference',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'Blunt', answer: 'Dat kan niet.' },
              { prompt: 'Diplomatic', answer: 'Dat zou misschien niet helemaal mogelijk zijn.' }
            ],
            ruleChallenge: 'Which word makes the sentence hypothetical and therefore softer?',
            options: [
              { text: 'zou', isCorrect: true },
              { text: 'niet', isCorrect: false },
              { text: 'dat', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'understand', title: 'Identifying Softeners', kind: 'understand',
      intro: "Look for words like 'eigenlijk', 'misschien', 'eventueel', and 'zou'.",
      exercises: [
        {
          id: 'soft-id-1', kind: 'inference-challenge', prompt: 'What is the speaker actually saying?',
          context: 'Het is misschien een goed idee om hier nog even naar te kijken.',
          skills: ['recognition', 'pragmatic'],
          inferenceData: {
            scenario: 'A colleague looks at your work and says: "Het is misschien een goed idee om hier nog even naar te kijken."',
            options: [
              { text: 'They think it is perfect as it is.', isCorrect: false, explanation: 'Incorrect. "Nog even naar kijken" implies changes are needed.' },
              { text: 'They are suggesting you should change something.', isCorrect: true, explanation: 'Correct. This is a very common Dutch way to say "fix this".' },
              { text: 'They are asking for your permission to look at it.', isCorrect: false, explanation: 'No, they have already looked and are giving feedback.' }
            ]
          }
        }
      ]
    },
    {
      id: 'reframe', title: 'The Reframe Challenge', kind: 'transform',
      intro: "Now try to transform blunt statements into professional ones.",
      exercises: [
        {
          id: 'reframe-1', kind: 'reframing-drill', prompt: 'Tell your manager the deadline is impossible.',
          skills: ['production', 'pragmatic', 'grammar'],
          reframingData: {
            bluntSentence: 'De deadline is onmogelijk.',
            softeningElements: ['misschien', 'zou', 'lastig', 'eventueel'],
            targetContext: 'Meeting with Department Head'
          },
          correction: 'Het zou misschien lastig kunnen worden om de deadline te halen.',
          explanation: "Using 'zou kunnen worden' and 'lastig' instead of 'onmogelijk' sounds much more professional."
        },
        {
          id: 'reframe-2', kind: 'reframing-drill', prompt: 'Tell a colleague they made a mistake.',
          skills: ['production', 'pragmatic', 'grammar'],
          reframingData: {
            bluntSentence: 'Je hebt een fout gemaakt.',
            softeningElements: ['lijkt erop', 'klein', 'misschien', 'ingeslopen'],
            targetContext: 'Peer Review'
          },
          correction: 'Het lijkt erop dat er misschien een klein foutje is ingeslopen.',
          explanation: "Phrasing it as 'er is een foutje ingeslopen' (a mistake has crept in) removes the direct blame from the person."
        }
      ]
    },
    {
      id: 'personalise', title: 'Your Diplomacy', kind: 'personalise',
      intro: "Think of a time you had to be diplomatic at work. How would you say it in Dutch?",
      exercises: [
        {
          id: 'dip-pers-1', kind: 'personalise', prompt: 'Hoe zou je op een vriendelijke manier zeggen dat je het niet eens bent met een voorstel?',
          skills: ['production', 'speaking', 'pragmatic'],
          vocabulary: ['voorstel', 'eens', 'mening'],
          grammar: ['zou']
        }
      ]
    }
  ]
}

export const connectionChapter: Chapter = {
  slug: 'ideeen-verbinden',
  level: 'B1',
  title: "Connecting Objects & Ideas",
  capability: "Use pronominal adverbs to speak fluidly and avoid repeating nouns.",
  description: "Master the merge of prepositions and references like 'ermee', 'daarvoor', and 'waarnaar'.",
  estimatedMinutes: 15,
  stages: [
    {
      id: 'discover', title: 'The Pronominal Merge', kind: 'discover',
      intro: "In Dutch, we don't like saying 'preposition + it/that'. We merge them into one word.",
      exercises: [
        {
          id: 'pro-ind-1', kind: 'induction', prompt: 'Notice the pattern',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'Blunt', answer: 'Ik praat met het.' },
              { prompt: 'Natural', answer: 'Ik praat ermee.' }
            ],
            ruleChallenge: 'What happens to "met" when it merges with "er"?',
            options: [
              { text: 'It stays the same', isCorrect: false },
              { text: 'It changes to "mee"', isCorrect: true },
              { text: 'It disappears', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'drill', title: 'Build the Connection', kind: 'transform',
      intro: "Try merging these common combinations.",
      exercises: [
        {
          id: 'pro-d-1', kind: 'pronominal-drill', prompt: 'Combine "op" and "het".',
          skills: ['production', 'grammar'],
          pronominalData: {
            sentence: 'Ik wacht op het.',
            preposition: 'op',
            object: 'het'
          },
          target: 'erop',
          explanation: 'Op + het becomes erop.'
        },
        {
          id: 'pro-d-2', kind: 'pronominal-drill', prompt: 'Combine "met" and "dat".',
          skills: ['production', 'grammar'],
          pronominalData: {
            sentence: 'Ik ben klaar met dat.',
            preposition: 'met',
            object: 'dat'
          },
          target: 'daarmee',
          explanation: 'Met + dat becomes daarmee (met shifts to mee).'
        }
      ]
    },
    {
      id: 'retrieve', title: 'Relative Connections', kind: 'retrieve',
      intro: "Use 'waar' to connect two sentences.",
      exercises: [
        {
          id: 'pro-r-1', kind: 'typed', prompt: 'The book I am waiting for... (Het boek ... ik op wacht)',
          skills: ['production', 'grammar'],
          target: 'waarop',
          explanation: 'Use "waarop" to relate to the book.'
        }
      ]
    },
    {
      id: 'personalise', title: 'Your Connections', kind: 'personalise',
      intro: "Think of something you are working on or waiting for. Use a pronominal adverb.",
      exercises: [
        {
          id: 'pro-p-1', kind: 'personalise', prompt: 'Waar ben je op dit moment mee bezig? (Gebruik "ermee" of "daarmee")',
          skills: ['production', 'speaking', 'grammar'],
          vocabulary: ['bezig', 'project', 'werk'],
          grammar: ['pronominal-adverbs']
        }
      ]
    }
  ]
}

export const formalStyleChapter: Chapter = {
  slug: 'formeel-nederlands-en-nominalisatie',
  level: 'B2',
  title: "Formal Style & Nominalisation",
  capability: "Transform informal verbal expressions into professional noun-based constructions.",
  description: "Learn to sound more academic and professional by using nominalisations and the passive voice.",
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'Verbal vs Nominal', kind: 'discover',
      intro: "In formal Dutch, we often prefer nouns over verbs to sound more objective.",
      exercises: [
        {
          id: 'nom-ind-1', kind: 'induction', prompt: 'Notice the shift',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'Verbal (B1)', answer: 'Omdat de prijzen stijgen...' },
              { prompt: 'Nominal (B2)', answer: 'Door de stijging van de prijzen...' }
            ],
            ruleChallenge: 'Which word is the nominalisation of "stijgen"?',
            options: [
              { text: 'stijgend', isCorrect: false },
              { text: 'de stijging', isCorrect: true },
              { text: 'gestegen', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'drill', title: 'Transform to Formal', kind: 'transform',
      intro: "Rewrite these sentences using a nominal construction.",
      exercises: [
        {
          id: 'nom-d-1', kind: 'nominalisation-drill', prompt: 'Nominalise "de prijzen stijgen"',
          skills: ['production', 'grammar'],
          nominalisationData: {
            verbalSentence: 'De prijzen stijgen snel.',
            targetNoun: 'stijging'
          },
          target: 'De snelle stijging van de prijzen',
          explanation: 'Use "De [adjective] stijging van [noun]" to formalise the thought.'
        },
        {
          id: 'nom-d-2', kind: 'nominalisation-drill', prompt: 'Nominalise "het bedrijf breidt uit"',
          skills: ['production', 'grammar'],
          nominalisationData: {
            verbalSentence: 'Het bedrijf breidt internationaal uit.',
            targetNoun: 'uitbreiding'
          },
          target: 'De internationale uitbreiding van het bedrijf',
          explanation: 'Uitbreiden becomes "de uitbreiding".'
        }
      ]
    },
    {
      id: 'personalise', title: 'Professional Report', kind: 'personalise',
      intro: "Write a short formal observation about a trend in your work or study.",
      exercises: [
        {
          id: 'nom-p-1', kind: 'personalise', prompt: 'Beschrijf een recente verandering op je werk in formele taal (gebruik nominalisatie).',
          skills: ['production', 'writing', 'pragmatic'],
          vocabulary: ['ontwikkeling', 'verandering', 'toename', 'afname'],
          grammar: ['nominalisation']
        }
      ]
    }
  ]
}

export const passiveVoiceChapter: Chapter = {
  slug: 'de-lijdende-vorm',
  level: 'B2',
  title: "The Passive Voice & Objectivity",
  capability: "Use the passive voice to describe processes and sound more objective.",
  description: "Learn when and how to use 'worden' and 'zijn' in passive constructions, including the impersonal 'Er-passive'.",
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'Process vs Result', kind: 'discover',
      intro: "Dutch uses 'worden' for a process in progress, and 'zijn' for the result.",
      exercises: [
        {
          id: 'pass-ind-1', kind: 'induction', prompt: 'Notice the difference',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'Active', answer: 'De man schildert de deur.' },
              { prompt: 'Passive (Process)', answer: 'De deur wordt geschilderd.' },
              { prompt: 'Passive (Result)', answer: 'De deur is geschilderd.' }
            ],
            ruleChallenge: 'Which auxiliary is used for a process happening now?',
            options: [
              { text: 'zijn', isCorrect: false },
              { text: 'hebben', isCorrect: false },
              { text: 'worden', isCorrect: true }
            ]
          }
        }
      ]
    },
    {
      id: 'drill', title: 'Passive Transformations', kind: 'transform',
      intro: "Transform these active sentences into passive ones.",
      exercises: [
        {
          id: 'pass-d-1', kind: 'passive-drill', prompt: 'Focus on the process',
          skills: ['production', 'grammar'],
          passiveData: {
            activeSentence: 'De directie neemt morgen een besluit.',
            focus: 'process',
            agent: 'de directie'
          },
          target: 'Er wordt morgen een besluit genomen door de directie',
          explanation: 'Use "wordt ... genomen" for the process.'
        },
        {
          id: 'pass-d-2', kind: 'passive-drill', prompt: 'Use the impersonal "Er" passive',
          skills: ['production', 'grammar'],
          passiveData: {
            activeSentence: 'Mensen praten veel over het nieuwe project.',
            focus: 'er-passive'
          },
          target: 'Er wordt veel over het nieuwe project gepraat',
          explanation: 'When the subject is general ("mensen"), start with "Er wordt".'
        }
      ]
    },
    {
      id: 'personalise', title: 'Reporting a Change', kind: 'personalise',
      intro: "Describe a process at your work or school using the passive voice.",
      exercises: [
        {
          id: 'pass-p-1', kind: 'personalise', prompt: 'Beschrijf iets dat momenteel op je werk wordt veranderd of verbeterd.',
          skills: ['production', 'writing', 'pragmatic'],
          vocabulary: ['verbeteren', 'organiseren', 'beslissen', 'uitvoeren'],
          grammar: ['passive-voice']
        }
      ]
    }
  ]
}

export const hypotheticalChapter: Chapter = {
  slug: 'hypothetische-scenario-s',
  level: 'B2',
  title: "Hypotheticals & Unreal Conditions",
  capability: "Speculate about unreal or unlikely situations in the present and past.",
  description: "Master the use of 'had', 'was', and 'zou' to express regrets, wishes, and hypothetical scenarios.",
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'Unreal Present', kind: 'discover',
      intro: "To talk about a hypothetical present, use 'had' (had), 'was' (were), or 'zou' (would).",
      exercises: [
        {
          id: 'hypo-ind-1', kind: 'induction', prompt: 'Notice the pattern',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'Fact', answer: 'Ik heb geen geld. Ik koop geen auto.' },
              { prompt: 'Hypothetical', answer: 'Als ik geld had, zou ik een auto kopen.' }
            ],
            ruleChallenge: 'Which word is preferred in the "if" (als) clause for a hypothetical?',
            options: [
              { text: 'zou hebben', isCorrect: false },
              { text: 'had', isCorrect: true },
              { text: 'heb', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'morph', title: 'Sentence Evolution', kind: 'transform',
      intro: "Evolve these sentences from simple facts into complex hypotheticals.",
      exercises: [
        {
          id: 'hypo-m-1', kind: 'morphing-drill', prompt: 'Evolve the regret',
          skills: ['production', 'grammar'],
          morphingData: {
            baseSentence: 'Ik werk veel. Ik ben moe.',
            steps: [
              { 
                instruction: 'Turn it into a hypothetical present (If I worked less, I wouldn\'t be tired).', 
                target: 'Als ik minder werkte, zou ik niet moe zijn' 
              },
              { 
                instruction: 'Now turn it into a past regret (If I had worked less, I wouldn\'t have been tired).', 
                target: 'Als ik minder had gewerkt, zou ik niet moe zijn geweest' 
              }
            ]
          }
        }
      ]
    },
    {
      id: 'personalise', title: 'Your Own Regrets', kind: 'personalise',
      intro: "Describe a real-world situation you'd like to change using 'als... had...'.",
      exercises: [
        {
          id: 'hypo-p-1', kind: 'personalise', prompt: 'Wat zou je anders hebben gedaan als je vorig jaar meer tijd had gehad?',
          skills: ['production', 'speaking', 'pragmatic'],
          vocabulary: ['tijd', 'anders', 'gedaan', 'gekozen'],
          grammar: ['conditional-past']
        }
      ]
    }
  ]
}

export const reportedSpeechChapter: Chapter = {
  slug: 'indirecte-rede',
  level: 'B2',
  title: "Reported Speech & Indirect Discourse",
  capability: "Accurately report what colleagues, clients, or news sources stated or asked.",
  description: "Master indirect speech (indirecte rede) in Dutch: embedding statements with 'dat', yes/no questions with 'of', and moving verbs to the end of the clause.",
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'Direct vs Indirect', kind: 'discover',
      intro: "When reporting someone else's words in Dutch, the sentence transforms into a subclause.",
      exercises: [
        {
          id: 'rep-ind-1', kind: 'induction', prompt: 'Notice the word order',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'Direct', answer: 'De manager zegt: "Ik heb nu geen tijd."' },
              { prompt: 'Indirect', answer: 'De manager zegt dat hij nu geen tijd heeft.' }
            ],
            ruleChallenge: 'What happens to the verb "heeft" when transformed into reported speech with "dat"?',
            options: [
              { text: 'It moves to the end of the subclause', isCorrect: true },
              { text: 'It stays in second position', isCorrect: false },
              { text: 'It turns into an infinitive', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'understand', title: 'Interpreting Reports', kind: 'understand',
      intro: "Look at how indirect questions and statements communicate nuance in professional settings.",
      exercises: [
        {
          id: 'rep-inf-1', kind: 'inference-challenge', prompt: 'What is the client requesting?',
          context: 'De klant vroeg of we de deadline eventueel met twee dagen konden verschuiven.',
          skills: ['recognition', 'pragmatic'],
          inferenceData: {
            scenario: 'In an email, a team lead writes: "De klant vroeg of we de deadline eventueel met twee dagen konden verschuiven."',
            options: [
              { text: 'The client is exploring the possibility of a two-day extension.', isCorrect: true, explanation: 'Correct. "Vroeg of... eventueel konden" is a polite indirect question.' },
              { text: 'The client definitely canceled the deadline.', isCorrect: false, explanation: 'Incorrect. They are only asking if it can be postponed.' },
              { text: 'The client demanded an immediate delivery.', isCorrect: false, explanation: 'Incorrect. "Vroeg of" reports a question, not a demand.' }
            ]
          }
        }
      ]
    },
    {
      id: 'transform', title: 'Reporting Statements & Questions', kind: 'transform',
      intro: "Transform these direct statements and questions into professional reported speech.",
      exercises: [
        {
          id: 'rep-d-1', kind: 'reported-speech-drill', prompt: 'Report the statement to your team',
          skills: ['production', 'grammar'],
          reportedSpeechData: {
            directQuote: 'Het project loopt volgens schema.',
            speaker: 'De directeur',
            reportingClause: 'De directeur liet weten dat...',
            quoteType: 'statement',
            hint: 'Verbs move to the end after "dat".'
          },
          target: 'De directeur liet weten dat het project volgens schema loopt',
          acceptedAnswers: [
            'De directeur liet weten dat het project volgens schema liep',
            'dat het project volgens schema loopt',
            'dat het project volgens schema liep'
          ],
          explanation: 'In indirect speech with "dat", the conjugated verb "loopt" moves to the end of the clause.'
        },
        {
          id: 'rep-d-2', kind: 'reported-speech-drill', prompt: 'Report the question asked during the meeting',
          skills: ['production', 'grammar'],
          reportedSpeechData: {
            directQuote: 'Is er al een besluit genomen?',
            speaker: 'De klant',
            reportingClause: 'De klant vroeg...',
            quoteType: 'question',
            hint: 'Use "of" for yes/no questions, not "als".'
          },
          target: 'De klant vroeg of er al een besluit genomen is',
          acceptedAnswers: [
            'De klant vroeg of er al een besluit is genomen',
            'De klant vroeg of er al een besluit genomen was',
            'De klant vroeg of er al een besluit was genomen',
            'of er al een besluit genomen is',
            'of er al een besluit is genomen'
          ],
          explanation: 'For yes/no questions, use "of" and place all verbs ("genomen is" / "is genomen") at the end.'
        },
        {
          id: 'rep-d-3', kind: 'reported-speech-drill', prompt: 'Report what the client wants to know',
          skills: ['production', 'grammar'],
          reportedSpeechData: {
            directQuote: 'Wanneer kunnen we de offerte verwachten?',
            speaker: 'De opdrachtgever',
            reportingClause: 'De opdrachtgever vraagt...',
            quoteType: 'question',
            hint: 'Keep the question word "wanneer" as the conjunction.'
          },
          target: 'De opdrachtgever vraagt wanneer ze de offerte kunnen verwachten',
          acceptedAnswers: [
            'De opdrachtgever vraagt wanneer we de offerte kunnen verwachten',
            'De opdrachtgever vraagt wanneer zij de offerte kunnen verwachten',
            'wanneer ze de offerte kunnen verwachten',
            'wanneer we de offerte kunnen verwachten'
          ],
          explanation: 'When reporting a question with a question word ("wanneer"), the question word introduces the subclause and verbs go to the end.'
        }
      ]
    },
    {
      id: 'personalise', title: 'Your Meeting Summary', kind: 'personalise',
      intro: "Report something a colleague or manager said in a recent meeting or chat.",
      exercises: [
        {
          id: 'rep-p-1', kind: 'personalise', prompt: 'Wat heeft een collega of vriend onlangs tegen je gezegd? Rapporteer het met "Hij/Zij zei dat..." of "Hij/Zij vroeg of...".',
          skills: ['production', 'speaking', 'pragmatic'],
          vocabulary: ['beweren', 'aangeven', 'vragen', 'vertellen'],
          grammar: ['indirecte-rede']
        }
      ]
    }
  ]
}

export const relativeClauseChapter: Chapter = {
  slug: 'betrekkelijke-bijzinnen',
  level: 'B2',
  title: "Relative Clauses & Antecedents",
  capability: "Form elegant complex sentences by accurately embedding relative clauses using die, dat, wie, waar+prep, and wat.",
  description: "Master Dutch relative clauses (betrekkelijke bijzinnen): distinguish die vs dat, person prepositions (met wie) vs pronominal relatives (waarmee), general antecedents (alles wat), and maintain subordinate word order.",
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'Antecedents & Relative Pronouns', kind: 'discover',
      intro: "A relative clause provides extra information about an antecedent (noun, person, or entire phrase).",
      exercises: [
        {
          id: 'rel-ind-1', kind: 'induction', prompt: 'Notice the relative pronoun choice',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'De-woord', answer: 'De collega die gisteren presenteerde...' },
              { prompt: 'Het-woord', answer: 'Het rapport dat we hebben goedgekeurd...' },
              { prompt: 'Persoon + Voorzetsel', answer: 'De klant met wie we overlegden...' },
              { prompt: 'Zaak + Voorzetsel', answer: 'Het plan waarmee we instemden...' },
              { prompt: 'Hele zin / Alles', answer: 'Hij haalde de deadline, wat iedereen verbaasde.' }
            ],
            ruleChallenge: 'Which relative pronoun is used after indefinite words like "alles" or "iets"?',
            options: [
              { text: 'wat', isCorrect: true },
              { text: 'dat', isCorrect: false },
              { text: 'die', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'understand', title: 'Contextual Inferences', kind: 'understand',
      intro: "Examine how relative clauses convey precise qualifications in professional contexts.",
      exercises: [
        {
          id: 'rel-inf-1', kind: 'inference-challenge', prompt: 'What does this clause specify?',
          context: 'De leverancier met wie we vorig jaar een contract hebben gesloten, levert de software.',
          skills: ['recognition', 'pragmatic'],
          inferenceData: {
            scenario: 'In an operations meeting, a manager states: "De leverancier met wie we vorig jaar een contract hebben gesloten, levert de software."',
            options: [
              { text: 'They are referring to the specific vendor who signed a contract with them last year.', isCorrect: true, explanation: 'Correct. "Met wie..." specifies and restricts the exact supplier being talked about.' },
              { text: 'They are looking for a brand-new supplier to sign a contract with.', isCorrect: false, explanation: 'Incorrect. The contract was already signed last year.' },
              { text: 'The supplier refused to deliver the software.', isCorrect: false, explanation: 'Incorrect. The supplier is currently delivering the software.' }
            ]
          }
        }
      ]
    },
    {
      id: 'transform', title: 'Combining Sentences', kind: 'transform',
      intro: "Combine the two statements into one fluent sentence with a relative clause.",
      exercises: [
        {
          id: 'rel-d-1', kind: 'relative-clause-drill', prompt: 'Combine these statements about the report',
          skills: ['production', 'grammar'],
          relativeClauseData: {
            mainClause: 'Het rapport bevat belangrijke aanbevelingen.',
            subordinateInfo: 'We hebben het rapport gisteren ontvangen.',
            antecedent: 'Het rapport (het-woord)',
            antecedentType: 'het-word',
            relativePronoun: 'dat',
            hint: 'Use "dat" and move all verbs to the end of the relative clause.'
          },
          target: 'Het rapport dat we gisteren hebben ontvangen, bevat belangrijke aanbevelingen',
          acceptedAnswers: [
            'Het rapport dat we gisteren hebben ontvangen bevat belangrijke aanbevelingen',
            'Het rapport dat we gisteren ontvingen, bevat belangrijke aanbevelingen',
            'Het rapport dat we gisteren ontvingen bevat belangrijke aanbevelingen',
            'Het rapport dat we gisteren hebben gekregen, bevat belangrijke aanbevelingen',
            'Het rapport dat we gisteren kregen, bevat belangrijke aanbevelingen'
          ],
          explanation: 'Since "rapport" is a het-word, use "dat", and move the verbs ("hebben ontvangen") to the end of the embedded clause.'
        },
        {
          id: 'rel-d-2', kind: 'relative-clause-drill', prompt: 'Combine these statements about your colleague',
          skills: ['production', 'grammar'],
          relativeClauseData: {
            mainClause: 'De projectleider is vandaag afwezig.',
            subordinateInfo: 'Ik werk nauw samen met deze projectleider.',
            antecedent: 'De projectleider (persoon + met)',
            antecedentType: 'person-prep',
            preposition: 'met',
            relativePronoun: 'met wie',
            hint: 'For people with a preposition, use "voorzetsel + wie" (met wie).'
          },
          target: 'De projectleider met wie ik nauw samenwerk, is vandaag afwezig',
          acceptedAnswers: [
            'De projectleider met wie ik nauw samenwerk is vandaag afwezig',
            'De projectleider waar ik nauw mee samenwerk, is vandaag afwezig',
            'De projectleider waar ik nauw mee samenwerk is vandaag afwezig'
          ],
          explanation: 'When referring to a person with a preposition, formal Dutch uses "[voorzetsel] wie" (e.g. "met wie").'
        },
        {
          id: 'rel-d-3', kind: 'relative-clause-drill', prompt: 'Combine these statements about project factors',
          skills: ['production', 'grammar'],
          relativeClauseData: {
            mainClause: 'Er zijn verschillende factoren.',
            subordinateInfo: 'We moeten absoluut rekening houden met deze factoren.',
            antecedent: 'Factoren (zaak + met)',
            antecedentType: 'thing-prep',
            preposition: 'met',
            relativePronoun: 'waarmee',
            hint: 'For inanimate objects with a preposition, combine into "waar + voorzetsel" (waarmee).'
          },
          target: 'Er zijn verschillende factoren waarmee we absoluut rekening moeten houden',
          acceptedAnswers: [
            'Er zijn verschillende factoren waar we absoluut rekening mee moeten houden',
            'Er zijn verschillende factoren waarmee we rekening moeten houden',
            'Er zijn verscheidene factoren waarmee we absoluut rekening moeten houden'
          ],
          explanation: 'For inanimate things + prepositions, use a pronominal relative adverb like "waarmee" or split "waar ... mee".'
        },
        {
          id: 'rel-d-4', kind: 'relative-clause-drill', prompt: 'Combine these statements about the surprising event',
          skills: ['production', 'grammar'],
          relativeClauseData: {
            mainClause: 'De directeur heeft onverwacht ontslag genomen.',
            subordinateInfo: 'Deze hele gebeurtenis verbaast iedereen erg.',
            antecedent: 'De gehele voorafgaande mededeling (whole clause)',
            antecedentType: 'general-wat',
            relativePronoun: 'wat',
            hint: 'When referring to an entire preceding clause or fact, use "wat".'
          },
          target: 'De directeur heeft onverwacht ontslag genomen, wat iedereen erg verbaast',
          acceptedAnswers: [
            'De directeur heeft onverwacht ontslag genomen wat iedereen erg verbaast',
            'De directeur heeft onverwacht ontslag genomen, wat iedereen verbaast',
            'De directeur heeft onverwacht ontslag genomen, hetgeen iedereen erg verbaast'
          ],
          explanation: 'When the antecedent is an entire sentence or action, use "wat" (or formal "hetgeen").'
        }
      ]
    },
    {
      id: 'personalise', title: 'Your Personal Connections', kind: 'personalise',
      intro: "Describe a project, colleague, or system using a relative clause.",
      exercises: [
        {
          id: 'rel-p-1', kind: 'personalise', prompt: 'Beschrijf een project, collega of applicatie waar je trots op bent met een betrekkelijke bijzin (gebruik "die", "dat", "met wie" of "waarmee").',
          skills: ['production', 'speaking', 'pragmatic'],
          vocabulary: ['project', 'collega', 'applicatie', 'ervaring', 'samenwerken'],
          grammar: ['betrekkelijke-bijzinnen']
        }
      ]
    }
  ]
}

export const infinitiveChapter: Chapter = {
  slug: 'om-te-infinitief',
  level: 'B2',
  title: "Infinitive Clauses & 'Te' Mastery",
  capability: "Construct complex infinitive clauses with om... te, master separable verbs with te (op te lossen), and use semi-auxiliaries (hoeven te, blijken te).",
  description: "Master Dutch infinitive constructions: purpose clauses (om... te), adjective triggers (het is essentieel om... te), separable verb infixation (in te voeren, voor te bereiden), and semi-auxiliaries (hoeven niet te, blijken te).",
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'The Mechanics of "Te" & "Om te"', kind: 'discover',
      intro: "Infinitive clauses allow you to link actions concisely without repeating the subject.",
      exercises: [
        {
          id: 'inf-ind-1', kind: 'induction', prompt: 'Notice how "te" attaches to verbs',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'Purpose (om... te)', answer: 'We bellen om een afspraak te maken.' },
              { prompt: 'Separable verb (prefix + te + stem)', answer: 'Het is belangrijk om het probleem op te lossen.' },
              { prompt: 'Semi-auxiliary (hoeven niet te)', answer: 'U hoeft zich geen zorgen te maken.' },
              { prompt: 'Semi-auxiliary (blijken te)', answer: 'De kosten blijken hoger te zijn.' },
              { prompt: 'Modal verb (geen te)', answer: 'We moeten morgen overleggen.' }
            ],
            ruleChallenge: 'Where is "te" placed when using a separable verb like "voorbereiden" in an infinitive clause?',
            options: [
              { text: 'Between the prefix and stem (voor te bereiden)', isCorrect: true },
              { text: 'Before the whole verb (om te voorbereiden)', isCorrect: false },
              { text: 'After the verb (voorbereiden te)', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'understand', title: 'Contextual Inferences & Obligation', kind: 'understand',
      intro: "Examine how semi-auxiliary verbs with 'te' express subtle distinctions in policy and requirements.",
      exercises: [
        {
          id: 'inf-inf-1', kind: 'inference-challenge', prompt: 'What does this policy statement imply?',
          context: 'Medewerkers hoeven de formulieren niet vóór vrijdag in te leveren, maar worden vriendelijk verzocht dit zo snel mogelijk te doen.',
          skills: ['recognition', 'pragmatic'],
          inferenceData: {
            scenario: 'In an internal company memo, HR writes: "Medewerkers hoeven de formulieren niet vóór vrijdag in te leveren, maar worden vriendelijk verzocht dit zo snel mogelijk te doen."',
            options: [
              { text: 'There is no strict obligation to submit the forms before Friday, although doing so promptly is encouraged.', isCorrect: true, explanation: 'Correct. "Hoeven niet... te inleveren" signifies the absence of necessity/obligation.' },
              { text: 'Employees are strictly prohibited from submitting the forms on Friday.', isCorrect: false, explanation: 'Incorrect. "Niet hoeven" indicates absence of obligation, not prohibition.' },
              { text: 'The deadline is mandatory and fixed for Friday morning.', isCorrect: false, explanation: 'Incorrect. "Niet hoeven" explicitly removes the strict requirement.' }
            ]
          }
        }
      ]
    },
    {
      id: 'transform', title: 'Infinitive Constructions', kind: 'transform',
      intro: "Form precise infinitive clauses using (om...) te and proper separable verb splitting.",
      exercises: [
        {
          id: 'inf-d-1', kind: 'infinitive-drill', prompt: 'Express purpose with a separable verb',
          skills: ['production', 'grammar'],
          infinitiveData: {
            mainClause: 'Het team heeft direct een extra vergadering gepland.',
            infinitiveAction: 'de ontstane problemen oplossen',
            constructionType: 'separable-te',
            separablePrefix: 'op',
            baseVerb: 'lossen',
            hint: 'Use "om ... op te lossen". Notice how "te" splits the separable verb.'
          },
          target: 'Het team heeft direct een extra vergadering gepland om de ontstane problemen op te lossen',
          acceptedAnswers: [
            'Het team heeft direct een extra vergadering gepland om de ontstane problemen op te lossen',
            'Het team heeft een extra vergadering gepland om de ontstane problemen op te lossen',
            'Het team heeft direct een extra vergadering georganiseerd om de ontstane problemen op te lossen'
          ],
          explanation: 'In Dutch infinitive clauses, separable verbs insert "te" between the prefix and the stem: "op te lossen".'
        },
        {
          id: 'inf-d-2', kind: 'infinitive-drill', prompt: 'Adjective complement clause',
          skills: ['production', 'grammar'],
          infinitiveData: {
            mainClause: 'Het is van cruciaal belang voor onze organisatie.',
            infinitiveAction: 'deze nieuwe veiligheidsmaatregelen zorgvuldig invoeren',
            constructionType: 'adjective-om-te',
            separablePrefix: 'in',
            baseVerb: 'voeren',
            hint: 'Evaluation adjectives take "om ... in te voeren".'
          },
          target: 'Het is van cruciaal belang voor onze organisatie om deze nieuwe veiligheidsmaatregelen zorgvuldig in te voeren',
          acceptedAnswers: [
            'Het is van cruciaal belang voor onze organisatie om deze nieuwe veiligheidsmaatregelen zorgvuldig in te voeren',
            'Het is van cruciaal belang om deze nieuwe veiligheidsmaatregelen zorgvuldig in te voeren',
            'Het is voor onze organisatie van cruciaal belang om deze nieuwe veiligheidsmaatregelen zorgvuldig in te voeren'
          ],
          explanation: 'After evaluation phrases like "het is van belang", use "om ... in te voeren".'
        },
        {
          id: 'inf-d-3', kind: 'infinitive-drill', prompt: 'Express lack of obligation with "hoeven"',
          skills: ['production', 'grammar'],
          infinitiveData: {
            mainClause: 'Voor de informele bijeenkomst van morgen.',
            infinitiveAction: 'u hoeft geen formele presentatie voorbereiden',
            constructionType: 'semi-auxiliary-te',
            separablePrefix: 'voor',
            baseVerb: 'bereiden',
            hint: 'Semi-auxiliary "hoeven niet/geen" takes "te" (here: "voor te bereiden") without "om".'
          },
          target: 'U hoeft voor de informele bijeenkomst van morgen geen formele presentatie voor te bereiden',
          acceptedAnswers: [
            'U hoeft voor de informele bijeenkomst van morgen geen formele presentatie voor te bereiden',
            'Voor de informele bijeenkomst van morgen hoeft u geen formele presentatie voor te bereiden',
            'Je hoeft voor de informele bijeenkomst van morgen geen formele presentatie voor te bereiden',
            'Voor de informele bijeenkomst van morgen hoef je geen formele presentatie voor te bereiden'
          ],
          explanation: '"Hoeven" takes "te" before the infinitive ("voor te bereiden") without the conjunction "om".'
        },
        {
          id: 'inf-d-4', kind: 'infinitive-drill', prompt: 'Express decision with fixed verb "besluiten"',
          skills: ['production', 'grammar'],
          infinitiveData: {
            mainClause: 'De directie heeft na lang beraad besloten.',
            infinitiveAction: 'het verouderde systeem volledig vervangen',
            constructionType: 'fixed-verb-te',
            verb: 'vervangen',
            hint: 'Use "om ... volledig te vervangen".'
          },
          target: 'De directie heeft na lang beraad besloten om het verouderde systeem volledig te vervangen',
          acceptedAnswers: [
            'De directie heeft na lang beraad besloten om het verouderde systeem volledig te vervangen',
            'De directie heeft na lang beraad besloten het verouderde systeem volledig te vervangen',
            'De directie heeft besloten om het verouderde systeem volledig te vervangen'
          ],
          explanation: 'Verbs of decision like "besluiten" take an infinitive clause with (om...) te.'
        }
      ]
    },
    {
      id: 'personalise', title: 'Your Professional Objectives', kind: 'personalise',
      intro: "Describe an objective or policy at your workplace using an infinitive construction.",
      exercises: [
        {
          id: 'inf-p-1', kind: 'personalise', prompt: 'Beschrijf een doel of verandering op je werk met een "om... te"-constructie en een scheidbaar werkwoord (bijv. "oplossen", "voorbereiden", "uitvoeren", "aanpakken").',
          skills: ['production', 'speaking', 'pragmatic'],
          vocabulary: ['doel', 'belangrijk', 'oplossen', 'voorbereiden', 'uitvoeren', 'aanpakken'],
          grammar: ['om-te-infinitief', 'scheidbare-werkwoorden']
        }
      ]
    }
  ]
}

export const doubleInfinitiveChapter: Chapter = {
  slug: 'dubbele-infinitief-ipp',
  level: 'B2',
  title: 'Verb Clusters & Double Infinitive (IPP)',
  capability: "Master compound tenses with modals, causative 'laten', perception verbs, and 'leren/helpen' using the double infinitive rule (IPP) and correct verb cluster word order.",
  description: "Learn the Infinitivus Pro Participio (IPP) rule: in Dutch compound tenses (voltooide tijd), when a modal (moeten/kunnen), causative (laten), perception (zien/horen), or instruction verb (leren/helpen) governs another verb, the past participle is replaced by the infinitive form.",
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'The Double Infinitive Rule (IPP)', kind: 'discover',
      intro: "In Dutch, a participle turns into an infinitive whenever it is accompanied by another infinitive in compound tenses.",
      exercises: [
        {
          id: 'ipp-ind-1', kind: 'induction', prompt: 'Compare single verb vs governed verb structures',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'Single modal (Past Participle)', answer: 'Ik heb het niet gewild.' },
              { prompt: 'Modal + Action (Double Infinitive)', answer: 'Ik heb het niet willen doen.' },
              { prompt: 'Causative "laten" + Action', answer: 'Zij heeft haar auto laten repareren.' },
              { prompt: 'Perception "horen" + Action', answer: 'We hebben de buren horen schreeuwen.' },
              { prompt: 'Instruction "leren" + Action', answer: 'Hij heeft me leren programmeren.' }
            ],
            ruleChallenge: 'Why does "gewild" change to "willen" in "Ik heb het niet willen doen"?',
            options: [
              { text: 'Because "willen" governs the action verb "doen", triggering the double infinitive (IPP) rule.', isCorrect: true },
              { text: 'Because "willen" can never have a past participle in Dutch.', isCorrect: false },
              { text: 'Because the sentence contains a negation ("niet").', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'understand', title: 'Contextual Inferences & Nuance', kind: 'understand',
      intro: "Observe how causative 'laten' and modal clusters express delegation and operational constraints in Dutch professional life.",
      exercises: [
        {
          id: 'ipp-inf-1', kind: 'inference-challenge', prompt: 'What did the management actually do?',
          context: 'De directie heeft de externe consultants een grondig auditrapport laten opstellen.',
          skills: ['recognition', 'pragmatic'],
          inferenceData: {
            scenario: 'In an annual review, the board announces: "De directie heeft de externe consultants een grondig auditrapport laten opstellen."',
            options: [
              { text: 'Management commissioned and had external consultants produce the audit report.', isCorrect: true, explanation: 'Correct. Causative "laten opstellen" indicates delegating or directing someone else to perform the action.' },
              { text: 'Management wrote the entire audit report by themselves.', isCorrect: false, explanation: 'Incorrect. "Laten opstellen" means having someone else prepare it.' },
              { text: 'Management refused to allow consultants to look at the audit.', isCorrect: false, explanation: 'Incorrect. "Laten" here signifies commissioning/authorizing.' }
            ]
          }
        },
        {
          id: 'ipp-inf-2', kind: 'inference-challenge', prompt: 'What constraint occurred in this project?',
          context: 'Omdat we de servermigratie hebben moeten uitstellen, is de livegang met twee weken vertraagd.',
          skills: ['recognition', 'grammar'],
          inferenceData: {
            scenario: 'A project manager writes to stakeholders: "Omdat we de servermigratie hebben moeten uitstellen, is de livegang met twee weken vertraagd."',
            options: [
              { text: 'The team was forced by necessity or constraints to postpone the server migration.', isCorrect: true, explanation: 'Correct. "Hebben moeten uitstellen" expresses a past necessity/obligation that led to the delay.' },
              { text: 'The team voluntarily decided not to migrate the servers at all.', isCorrect: false, explanation: 'Incorrect. "Moeten" indicates necessity or external constraint, not abandonment.' },
              { text: 'The server migration was completed ahead of schedule.', isCorrect: false, explanation: 'Incorrect. It was delayed by two weeks.' }
            ]
          }
        }
      ]
    },
    {
      id: 'transform', title: 'Double Infinitive Production Drills', kind: 'transform',
      intro: "Construct accurate compound tense sentences using the double infinitive across modals, causatives, perception, and subclauses.",
      exercises: [
        {
          id: 'ipp-d-1', kind: 'double-infinitive-drill', prompt: 'Modal in compound tense (Main clause)',
          skills: ['production', 'grammar'],
          doubleInfinitiveData: {
            sentenceContext: 'Gisteren op het vliegveld: we waren erg vroeg, maar de vlucht was vertraagd.',
            auxiliary: 'hebben',
            governingVerb: 'moeten',
            governingType: 'modal',
            mainVerb: 'wachten',
            hint: 'Auxiliary in position 2, double infinitive at the end: "We hebben ... moeten wachten".'
          },
          target: 'We hebben gisteren drie uur op onze vlucht moeten wachten',
          acceptedAnswers: [
            'We hebben gisteren drie uur op onze vlucht moeten wachten',
            'We hebben gisteren drie uur moeten wachten op onze vlucht',
            'Gisteren hebben we drie uur op onze vlucht moeten wachten',
            'Gisteren hebben we drie uur moeten wachten op onze vlucht'
          ],
          explanation: 'In Dutch compound tenses with modals, use the double infinitive "moeten wachten" (not "gemoeten wachten").'
        },
        {
          id: 'ipp-d-2', kind: 'double-infinitive-drill', prompt: 'Causative "laten" (Main clause)',
          skills: ['production', 'grammar'],
          doubleInfinitiveData: {
            sentenceContext: 'De kantoorruimte was sterk verouderd en het management heeft actie ondernomen.',
            auxiliary: 'hebben',
            governingVerb: 'laten',
            governingType: 'causative-laten',
            mainVerb: 'renoveren',
            hint: 'Use "heeft laten renoveren" for having something renovated.'
          },
          target: 'Het bedrijf heeft de complete kantoorruimte grondig laten renoveren',
          acceptedAnswers: [
            'Het bedrijf heeft de complete kantoorruimte grondig laten renoveren',
            'Het bedrijf heeft het kantoor laten renoveren',
            'De directie heeft de kantoorruimte laten renoveren',
            'Het bedrijf heeft de kantoorruimte grondig laten renoveren'
          ],
          explanation: 'Causative "laten" takes the double infinitive "laten renoveren" (never "gelaten renoveren").'
        },
        {
          id: 'ipp-d-3', kind: 'double-infinitive-drill', prompt: 'Instruction "leren" (Main clause)',
          skills: ['production', 'grammar'],
          doubleInfinitiveData: {
            sentenceContext: 'Toen ik bij het softwarebedrijf begon, kende ik TypeScript nog niet goed.',
            auxiliary: 'hebben',
            governingVerb: 'leren',
            governingType: 'instruction-leren-helpen',
            mainVerb: 'programmeren',
            hint: 'Use "heeft me leren programmeren" without the "ge-" prefix on leren.'
          },
          target: 'Mijn senior collega heeft me in korte tijd professioneel leren programmeren',
          acceptedAnswers: [
            'Mijn senior collega heeft me in korte tijd professioneel leren programmeren',
            'Mijn collega heeft me leren programmeren',
            'Mijn senior collega heeft me leren programmeren'
          ],
          explanation: 'When "leren" or "helpen" governs an action verb, it turns into an infinitive: "leren programmeren".'
        },
        {
          id: 'ipp-d-4', kind: 'double-infinitive-drill', prompt: 'Perception verb in subclause (Subordinate clause)',
          skills: ['production', 'grammar'],
          doubleInfinitiveData: {
            sentenceContext: 'We stonden op het perron in de kou en plotseling klonk er een geluid.',
            auxiliary: 'hebben',
            governingVerb: 'horen',
            governingType: 'perception',
            mainVerb: 'aankomen',
            isSubordinate: true,
            subordinateConjunction: 'omdat',
            hint: 'Subclause word order: place the entire cluster "hebben horen aankomen" at the very end.'
          },
          target: 'We waren opgelucht omdat we de laatste trein in de verte hebben horen aankomen',
          acceptedAnswers: [
            'We waren opgelucht omdat we de laatste trein in de verte hebben horen aankomen',
            'We waren opgelucht omdat we de trein hebben horen aankomen',
            'We waren erg opgelucht omdat we de laatste trein hebben horen aankomen'
          ],
          explanation: 'In subclauses with perception verbs, the verb cluster "hebben horen aankomen" sits at the end of the clause.'
        },
        {
          id: 'ipp-d-5', kind: 'double-infinitive-drill', prompt: 'Conditional Perfect with Modal (Hypothetical past)',
          skills: ['production', 'grammar'],
          doubleInfinitiveData: {
            sentenceContext: 'Als de documentatie op tijd was aangeleverd, was er geen probleem geweest.',
            auxiliary: 'hebben',
            governingVerb: 'kunnen',
            governingType: 'modal',
            mainVerb: 'afronden',
            hint: 'Use past subjunctive/pluperfect: "hadden kunnen afronden".'
          },
          target: 'We hadden het project gemakkelijk op tijd kunnen afronden',
          acceptedAnswers: [
            'We hadden het project gemakkelijk op tijd kunnen afronden',
            'We hadden het project op tijd kunnen afronden',
            'We hadden het werk gemakkelijk op tijd kunnen afronden'
          ],
          explanation: 'For hypothetical past possibilities, combine "hadden" with the double infinitive "kunnen afronden".'
        }
      ]
    },
    {
      id: 'personalise', title: 'Your Real-World Verb Clusters', kind: 'personalise',
      intro: "Share a personal or professional experience where you had to do something, had something done, or learned a new capability.",
      exercises: [
        {
          id: 'ipp-p-1', kind: 'personalise', prompt: 'Vertel over een situatie op je werk of in je privéleven waarin je iets hebt moeten regelen, laten repareren of leren gebruiken (gebruik een dubbele infinitief zoals "hebben moeten...", "laten...", of "leren...").',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['regelen', 'repareren', 'leren', 'moeten', 'laten', 'ervaring', 'oplossen'],
          grammar: ['dubbele-infinitief', 'werkwoordclusters']
        }
      ]
    }
  ]
}

export const concessionChapter: Chapter = {
  slug: 'toegevende-verbanden-contrast',
  level: 'B2',
  title: 'Concessive Clauses & Contrast Mastery',
  capability: "Formulate complex contrasts and concessions using 'hoewel', 'ondanks (dat)', verb-first 'al', correlative 'hoe... ook', and 'weliswaar... maar' with native word order.",
  description: "Master the full spectrum of Dutch concessive discourse: subordinating conjunctions ('hoewel', 'ofschoon', 'ondanks dat'), prepositional noun phrases ('ondanks'), verb-first inversion with 'al', correlative frames ('hoe... ook'), and coordinate contrast ('weliswaar... maar').",
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'The Spectrum of Dutch Concession', kind: 'discover',
      intro: "Compare how Dutch expresses concessions through conjunctions, prepositions, verb-first inversion, and correlative pairs.",
      exercises: [
        {
          id: 'conc-ind-1', kind: 'induction', prompt: 'Compare the different concessive structures in Dutch',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'Subordinating conjunction (Subclause SOV)', answer: 'Hoewel het hard regende, gingen we wandelen.' },
              { prompt: 'Preposition + Noun phrase (No verb in clause)', answer: 'Ondanks de harde regen gingen we wandelen.' },
              { prompt: 'Conjunction "ondanks dat" (Subclause SOV)', answer: 'Ondanks dat het hard regende, gingen we wandelen.' },
              { prompt: 'Concessive "al" (Verb-First Inversion)', answer: 'Al regende het hard, we gingen toch wandelen.' },
              { prompt: 'Correlative "hoe... ook" (Verb-final)', answer: 'Hoe hard het ook regende, we gingen toch wandelen.' },
              { prompt: 'Coordinate contrast "weliswaar... maar"', answer: 'Het regende weliswaar hard, maar we gingen toch wandelen.' }
            ],
            ruleChallenge: 'What is the grammatical difference between "ondanks" and "ondanks dat"?',
            options: [
              { text: '"Ondanks" is a preposition that takes a noun phrase, while "ondanks dat" is a conjunction that introduces a full clause with a conjugated verb.', isCorrect: true },
              { text: '"Ondanks" is only used for positive situations, whereas "ondanks dat" is for negative situations.', isCorrect: false },
              { text: '"Ondanks" can only appear at the end of a sentence.', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'understand', title: 'Nuance & Inferences in Concessive Speech', kind: 'understand',
      intro: "Observe how Dutch professionals and organizations use subtle concessive phrasing to balance risks, costs, and strategic decisions.",
      exercises: [
        {
          id: 'conc-inf-1', kind: 'inference-challenge', prompt: 'What is the company\'s strategic stance?',
          context: 'Hoewel de initiële investeringskosten substantieel hoger uitvallen, verwachten we op termijn een aanzienlijke efficiëntiewinst.',
          skills: ['recognition', 'pragmatic'],
          inferenceData: {
            scenario: 'The Chief Technology Officer presents the new infrastructure budget to the board.',
            options: [
              { text: 'The company acknowledges the high upfront expense but considers it justified by long-term efficiency gains.', isCorrect: true, explanation: 'Correct. "Hoewel... uitvallen, verwachten we..." balances the acknowledged cost with positive long-term return.' },
              { text: 'The company is cancelling the investment because the costs are unacceptably high.', isCorrect: false, explanation: 'Incorrect. The concession ("hoewel") acknowledges the cost while reaffirming the commitment.' },
              { text: 'The company expects immediate cost savings in the first quarter.', isCorrect: false, explanation: 'Incorrect. Upfront costs are higher, and returns are expected "op termijn" (over time).' }
            ]
          }
        },
        {
          id: 'conc-inf-2', kind: 'inference-challenge', prompt: 'What does the board intend to do despite objections?',
          context: 'Al hebben verscheidene aandeelhouders hun ernstige twijfels geuit, het bestuur zet de strategische overname onverminderd door.',
          skills: ['recognition', 'grammar'],
          inferenceData: {
            scenario: 'A financial newspaper reports on a contested corporate acquisition.',
            options: [
              { text: 'The board will proceed with the acquisition regardless of shareholder doubts.', isCorrect: true, explanation: 'Correct. "Al hebben... geuit, het bestuur zet... door" uses verb-first concessive inversion to indicate determined continuation despite objections.' },
              { text: 'The board has decided to halt the takeover until all shareholders agree.', isCorrect: false, explanation: 'Incorrect. "Zet onverminderd door" means continuing undeterred.' },
              { text: 'Shareholders have fully endorsed the board\'s acquisition strategy.', isCorrect: false, explanation: 'Incorrect. The shareholders expressed serious doubts ("ernstige twijfels geuit").' }
            ]
          }
        }
      ]
    },
    {
      id: 'transform', title: 'Concessive Clause Production Drills', kind: 'transform',
      intro: "Construct fluent concessive sentences using 'hoewel', 'ondanks (dat)', verb-first 'al', 'hoe... ook', and 'weliswaar... maar'.",
      exercises: [
        {
          id: 'conc-d-1', kind: 'concession-drill', prompt: 'Concessive subclause with "hoewel" (Formal discourse)',
          skills: ['production', 'grammar'],
          concessionData: {
            triggerType: 'hoewel-ofschoon',
            premiseA: 'De grondstoffenprijzen zijn het afgelopen kwartaal sterk gestegen.',
            contrastB: 'Het bedrijf heeft zijn winstmarges uitstekend weten te handhaven.',
            connectorCue: 'hoewel',
            structureFormula: 'Hoewel + [onderwerp + rest + werkwoord(en)], [persoonsvorm + onderwerp + rest]',
            hint: 'Subclause word order after "hoewel", then inverted order in the main clause.'
          },
          target: 'Hoewel de grondstoffenprijzen sterk zijn gestegen, heeft het bedrijf zijn winstmarges weten te handhaven',
          acceptedAnswers: [
            'Hoewel de grondstoffenprijzen sterk zijn gestegen, heeft het bedrijf zijn winstmarges weten te handhaven',
            'Hoewel de grondstoffenprijzen sterk zijn gestegen, heeft het bedrijf zijn winstmarges behouden',
            'Hoewel de prijzen sterk zijn gestegen, heeft het bedrijf zijn marges weten te behouden',
            'Hoewel de grondstoffenprijzen het afgelopen kwartaal sterk zijn gestegen, heeft het bedrijf zijn winstmarges weten te handhaven'
          ],
          explanation: '"Hoewel" introduces a subordinate clause (verb-final: "gestegen zijn" or "zijn gestegen"), followed by an inverted main clause ("heeft het bedrijf...").'
        },
        {
          id: 'conc-d-2', kind: 'concession-drill', prompt: 'Prepositional concession with "ondanks" (Noun phrase)',
          skills: ['production', 'grammar'],
          concessionData: {
            triggerType: 'ondanks-noun-vs-clause',
            premiseA: 'Er was sprake van ernstige verkeershinder op de A1.',
            contrastB: 'De directrice arriveerde keurig op tijd voor de opening van het congres.',
            connectorCue: 'ondanks',
            structureFormula: 'Ondanks + [zelfstandig naamwoord / nominale groep], [persoonsvorm + onderwerp + rest]',
            hint: 'Use "ondanks" directly with the noun phrase "de ernstige verkeershinder" (no "dat", no verb in the opening phrase).'
          },
          target: 'Ondanks de ernstige verkeershinder arriveerde de directrice keurig op tijd voor de opening van het congres',
          acceptedAnswers: [
            'Ondanks de ernstige verkeershinder arriveerde de directrice keurig op tijd voor de opening van het congres',
            'Ondanks de ernstige verkeershinder was de directrice keurig op tijd voor de opening',
            'Ondanks de verkeershinder arriveerde de directrice op tijd voor het congres',
            'Ondanks de ernstige verkeershinder kwam de directrice keurig op tijd aan voor de opening'
          ],
          explanation: '"Ondanks" is a preposition requiring a noun phrase ("de ernstige verkeershinder") followed by the main clause verb ("arriveerde").'
        },
        {
          id: 'conc-d-3', kind: 'concession-drill', prompt: 'Concessive "al" with Verb-First Inversion',
          skills: ['production', 'grammar'],
          concessionData: {
            triggerType: 'al-inversion',
            premiseA: 'Het implementatietraject brengt aanzienlijke technische risico\'s met zich mee.',
            contrastB: 'We zetten het innovatieve project met volle overtuiging voort.',
            connectorCue: 'al',
            structureFormula: 'Al + [persoonsvorm V1] + [onderwerp]..., [persoonsvorm V2 + onderwerp / we zetten...]',
            hint: 'Start with "Al brengt het implementatietraject...", followed by the main clause.'
          },
          target: 'Al brengt het traject aanzienlijke risico\'s met zich mee, we zetten het project met volle overtuiging voort',
          acceptedAnswers: [
            'Al brengt het traject aanzienlijke risico\'s met zich mee, we zetten het project met volle overtuiging voort',
            'Al brengt het implementatietraject aanzienlijke risico\'s met zich mee, we zetten het project met volle overtuiging voort',
            'Al brengt het traject risico\'s met zich mee, we zetten het project vol overtuiging voort',
            'Al brengt het implementatietraject aanzienlijke risico\'s met zich mee, toch zetten we het project voort'
          ],
          explanation: 'When starting with concessive "al", place the conjugated verb immediately after "al" (verb-first inversion: "Al brengt...").'
        },
        {
          id: 'conc-d-4', kind: 'concession-drill', prompt: 'Correlative concession with "hoe... ook"',
          skills: ['production', 'grammar'],
          concessionData: {
            triggerType: 'hoe-ook-correlative',
            premiseA: 'De onderhandelingen tussen de partijen verliepen uiterst moeizaam.',
            contrastB: 'De delegaties wisten uiteindelijk een bevredigend compromis te bereiken.',
            connectorCue: 'hoe... ook',
            structureFormula: 'Hoe + [adjectief/bijwoord] + [onderwerp] + [rest] + ook + [werkwoord], [hoofdzin]',
            hint: 'Use "Hoe moeizaam de onderhandelingen ook verliepen, ..." with "ook" before the verb.'
          },
          target: 'Hoe moeizaam de onderhandelingen ook verliepen, de partijen wisten uiteindelijk een compromis te bereiken',
          acceptedAnswers: [
            'Hoe moeizaam de onderhandelingen ook verliepen, de partijen wisten uiteindelijk een compromis te bereiken',
            'Hoe moeizaam de onderhandelingen ook verliepen, de delegaties wisten uiteindelijk een compromis te bereiken',
            'Hoe moeizaam het ook verliep, de partijen wisten uiteindelijk een compromis te bereiken'
          ],
          explanation: 'The correlative frame "Hoe [adjectief] ... ook" requires placing "ook" before the subclause verb, followed by the main clause.'
        },
        {
          id: 'conc-d-5', kind: 'concession-drill', prompt: 'Coordinate contrast with "weliswaar... maar"',
          skills: ['production', 'grammar'],
          concessionData: {
            triggerType: 'weliswaar-maar',
            premiseA: 'Het nieuwe softwarepakket is bijzonder krachtig en betrouwbaar.',
            contrastB: 'De gebruikersinterface vergt nog enige gewenning bij het personeel.',
            connectorCue: 'weliswaar... maar',
            structureFormula: '[Hoofdzin met weliswaar in het midden], maar [contrasterende hoofdzin]',
            hint: 'Place "weliswaar" after the finite verb in the first clause and connect with ", maar".'
          },
          target: 'Het nieuwe softwarepakket is weliswaar bijzonder krachtig, maar de interface vergt nog enige gewenning',
          acceptedAnswers: [
            'Het nieuwe softwarepakket is weliswaar bijzonder krachtig, maar de interface vergt nog enige gewenning',
            'De software is weliswaar bijzonder krachtig, maar de interface vergt nog enige gewenning',
            'Het pakket is weliswaar bijzonder krachtig, maar het systeem vergt nog enige gewenning'
          ],
          explanation: '"Weliswaar" qualifies the first clause ("is weliswaar bijzonder krachtig") while "maar" introduces the contrasting reality.'
        }
      ]
    },
    {
      id: 'personalise', title: 'Your Real-World Concessions', kind: 'personalise',
      intro: "Share an authentic professional or personal achievement that succeeded despite difficulties or opposing factors.",
      exercises: [
        {
          id: 'conc-p-1', kind: 'personalise', prompt: 'Vertel over een situatie op je werk, in je studie of in je dagelijks leven waarin je ondanks een obstakel toch succesvol bent geweest (gebruik bijv. "hoewel", "ondanks (dat)", "al...", of "hoe... ook").',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['hoewel', 'ondanks', 'uitdaging', 'bereiken', 'resultaat', 'doorzetten', 'oplossing'],
          grammar: ['toegevende-verbanden', 'concessieve-voegwoorden']
        }
      ]
    }
  ]
}

export const participialChapter: Chapter = {
  slug: 'deelwoordconstructies-gerundivum',
  level: 'B2',
  title: 'Participial Constructions & Gerundive Mastery',
  capability: "Formulate concise, professional Dutch sentences using modal gerundives ('het te-deelwoord'), attributive participles, simultaneous 'al + deelwoord', and concise participial clauses.",
  description: "Master the 5 core participial structures in B2 Dutch: modal participles of necessity ('de te nemen maatregelen', 'de op te lossen problemen'), attributive present and past participles ('de stijgende kosten', 'het gewijzigde beleid'), progressive simultaneous action ('al doende', 'al wandelend'), and concise formal clauses ('gelet op', 'gezien').",
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'The Architecture of Dutch Participles', kind: 'discover',
      intro: "Explore how Dutch uses participles to create concise, elegant, and high-level academic or professional formulations.",
      exercises: [
        {
          id: 'part-ind-1', kind: 'induction', prompt: 'Compare the different participial and gerundive constructions in Dutch',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'Relative clause with modal verb "moeten"', answer: 'De maatregelen die we moeten nemen.' },
              { prompt: 'Modal Participle / Gerundive (Te + Infinitief)', answer: 'De te nemen maatregelen.' },
              { prompt: 'Separable Verb Gerundive (Infixation of "te")', answer: 'De op te lossen problemen.' },
              { prompt: 'Attributive Present Participle (Continuous / Active)', answer: 'De snel stijgende kosten.' },
              { prompt: 'Attributive Past Participle (Completed / Passive)', answer: 'Het goedgekeurde beleidsplan.' },
              { prompt: 'Simultaneous Action with "Al" (While doing)', answer: 'Al doende leert men.' },
              { prompt: 'Concise Participial Clause (Formal formula)', answer: 'Gelet op de recente ontwikkelingen, passen we de planning aan.' }
            ],
            ruleChallenge: 'How is the modal participle (gerundive) constructed in Dutch and what does it express?',
            options: [
              { text: 'It expresses a passive necessity or action to be completed ("that must/will be done") using: de/het + te + infinitive (+ e) + noun (e.g. "de te nemen maatregelen").', isCorrect: true },
              { text: 'It expresses an action that has already finished in the past.', isCorrect: false },
              { text: 'It can only be used with intransitive motion verbs.', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'understand', title: 'Professional Synthesis & Participial Inferences', kind: 'understand',
      intro: "Analyze how policy advisors and technical experts use concise participial phrases in formal Dutch communications.",
      exercises: [
        {
          id: 'part-inf-1', kind: 'inference-challenge', prompt: 'What is the advisory committee recommending?',
          context: 'Gelet op de aanhoudende krapte op de arbeidsmarkt en de te verwachten loonstijgingen, adviseert de commissie om de voorgestelde investeringen te faseren.',
          skills: ['recognition', 'pragmatic'],
          inferenceData: {
            scenario: 'A senior economic advisor summarizes a national labor market evaluation.',
            options: [
              { text: 'Phase the planned investments over time due to tight labor supply and anticipated wage growth.', isCorrect: true, explanation: 'Correct. "Gelet op [labor shortage] en de te verwachten loonstijgingen [expected wage increases], adviseert de commissie om de voorgestelde investeringen te faseren [phase/spread out]."' },
              { text: 'Immediately halt all investment projects permanently.', isCorrect: false, explanation: 'Incorrect. "Faseren" means staging or phasing over time, not cancelling.' },
              { text: 'Hire more workers immediately regardless of wage levels.', isCorrect: false, explanation: 'Incorrect. The labor shortage is acknowledged as a constraint.' }
            ]
          }
        },
        {
          id: 'part-inf-2', kind: 'inference-challenge', prompt: 'How did the development team arrive at the breakthrough?',
          context: 'Al doende ontdekten de ingenieurs dat het nieuw ontwikkelde algoritme aanzienlijk sneller presteerde dan het oorspronkelijk geteste model.',
          skills: ['recognition', 'grammar'],
          inferenceData: {
            scenario: 'A Dutch technology review explains an AI team\'s optimization breakthrough.',
            options: [
              { text: 'Through active experimentation and practical hands-on implementation ("al doende").', isCorrect: true, explanation: 'Correct. "Al doende" is an idiomatic Dutch participial phrase meaning "in the course of doing / through hands-on practice".' },
              { text: 'By reviewing competitors\' public documentation.', isCorrect: false, explanation: 'Incorrect. The text specifies "Al doende" (through their own execution).' },
              { text: 'Through a purely theoretical proof without any coding.', isCorrect: false, explanation: 'Incorrect. "Al doende" explicitly implies practical work.' }
            ]
          }
        }
      ]
    },
    {
      id: 'transform', title: 'Participial & Gerundive Production Drills', kind: 'transform',
      intro: "Transform full descriptive clauses into concise, native-like Dutch participial and gerundive constructions.",
      exercises: [
        {
          id: 'part-d-1', kind: 'participial-drill', prompt: 'Modal Participle (Gerundive): Passive necessity',
          skills: ['production', 'grammar'],
          participialData: {
            triggerType: 'gerundive-modal',
            baseClause: 'De maatregelen die het kabinet de komende maanden moet nemen.',
            participleCue: 'te nemen',
            structureFormula: 'de/het + te + infinitief (+ e) + zelfstandig naamwoord',
            hint: 'Transform "die we moeten nemen" into "de te nemen maatregelen".'
          },
          target: 'de te nemen maatregelen',
          acceptedAnswers: [
            'de te nemen maatregelen',
            'de door het kabinet te nemen maatregelen',
            'de komende maanden te nemen maatregelen'
          ],
          explanation: 'The gerundive "de te nemen maatregelen" conveys passive necessity ("the measures to be taken / that must be taken").'
        },
        {
          id: 'part-d-2', kind: 'participial-drill', prompt: 'Separable Verb Gerundive: Infixation of "te"',
          skills: ['production', 'grammar'],
          participialData: {
            triggerType: 'gerundive-modal',
            baseClause: 'De complexe vraagstukken die het team gezamenlijk moet oplossen.',
            participleCue: 'op te lossen',
            structureFormula: 'de/het + [prefix] + te + [stam + en] (+ e) + zelfstandig naamwoord',
            hint: 'Insert "te" inside the separable verb "oplossen": "de op te lossen vraagstukken".'
          },
          target: 'de op te lossen vraagstukken',
          acceptedAnswers: [
            'de op te lossen vraagstukken',
            'de gezamenlijk op te lossen vraagstukken',
            'de door het team op te lossen vraagstukken',
            'de op te lossen complexe vraagstukken'
          ],
          explanation: 'With separable verbs, "te" is inserted between the prefix and the stem ("op te lossen"), forming "de op te lossen vraagstukken".'
        },
        {
          id: 'part-d-3', kind: 'participial-drill', prompt: 'Attributive Present Participle (Continuous / Active)',
          skills: ['production', 'grammar'],
          participialData: {
            triggerType: 'present-participle-attr',
            baseClause: 'De spanningen op de energiemarkt die nog steeds toenemen.',
            participleCue: 'toenemende',
            structureFormula: 'de/het + [infinitief + d + e] + zelfstandig naamwoord',
            hint: 'Transform "die toenemen" into the inflected present participle "de toenemende spanningen".'
          },
          target: 'de toenemende spanningen',
          acceptedAnswers: [
            'de toenemende spanningen',
            'de toenemende spanningen op de energiemarkt',
            'de nog steeds toenemende spanningen'
          ],
          explanation: 'The present participle is formed with infinitive + d + e ("toenemende"), functioning as an inflected attributive adjective.'
        },
        {
          id: 'part-d-4', kind: 'participial-drill', prompt: 'Simultaneous action with "Al + Tegenwoordig Deelwoord"',
          skills: ['production', 'grammar'],
          participialData: {
            triggerType: 'al-participle-simultaneous',
            baseClause: 'Terwijl zij door de grachten van Utrecht wandelde, bedacht de onderzoekster een innovatieve hypothese.',
            participleCue: 'Al wandelend',
            structureFormula: 'Al + [tegenwoordig deelwoord] + [rest], [persoonsvorm + onderwerp + rest]',
            hint: 'Start with "Al wandelend door de grachten van Utrecht bedacht de onderzoekster..."'
          },
          target: 'Al wandelend door de grachten van Utrecht bedacht de onderzoekster een innovatieve hypothese',
          acceptedAnswers: [
            'Al wandelend door de grachten van Utrecht bedacht de onderzoekster een innovatieve hypothese',
            'Al wandelend door de grachten van Utrecht bedacht zij een innovatieve hypothese',
            'Al wandelend door de grachten bedacht de onderzoekster een innovatieve hypothese'
          ],
          explanation: '"Al wandelend..." creates an elegant simultaneous participial construction expressing action and manner.'
        },
        {
          id: 'part-d-5', kind: 'participial-drill', prompt: 'Concise Participial Clause with "Gelet op"',
          skills: ['production', 'grammar'],
          participialData: {
            triggerType: 'concise-clause',
            baseClause: 'Omdat we letten op de recente macro-economische ontwikkelingen, passen we de prognoses aan.',
            participleCue: 'Gelet op',
            structureFormula: 'Gelet op + [zelfstandig naamwoord / nominale groep], [persoonsvorm + onderwerp + rest]',
            hint: 'Use the concise participial phrase "Gelet op de recente macro-economische ontwikkelingen passen we..."'
          },
          target: 'Gelet op de recente macro-economische ontwikkelingen passen we de prognoses aan',
          acceptedAnswers: [
            'Gelet op de recente macro-economische ontwikkelingen passen we de prognoses aan',
            'Gelet op de recente ontwikkelingen passen we de prognoses aan',
            'Gelet op de macro-economische ontwikkelingen passen we de prognoses aan'
          ],
          explanation: '"Gelet op [noun phrase]" is a formal B2 concise participial formula that replaces clunky subordinate clauses.'
        }
      ]
    },
    {
      id: 'personalise', title: 'Your Professional Participial Synthesis', kind: 'personalise',
      intro: "Formulate an authentic professional or academic observation using gerundives and participial constructions.",
      exercises: [
        {
          id: 'part-p-1', kind: 'personalise', prompt: 'Beschrijf een actuele uitdaging, project of beleidskwestie in jouw werk of studie met behulp van een modaal deelwoord (bijv. "de te nemen stappen", "het op te lossen probleem") of een beknopte deelwoordconstructie (bijv. "Gelet op...", "Gezien...", "Al doende...").',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['maatregelen', 'ontwikkelingen', 'vraagstukken', 'gelet op', 'gezien', 'toenemend', 'uitvoeren'],
          grammar: ['deelwoordconstructies', 'het-te-deelwoord']
        }
      ]
    }
  ]
}

export const correlativeChapter: Chapter = {
  slug: 'correlatieve-voegwoorden-balans',
  level: 'B2',
  title: 'Correlative Connectors & Balanced Structures',
  capability: "Formulate sophisticated, balanced Dutch sentences using correlative conjunction pairs and parallel syntax (zowel... als, niet alleen... maar ook, noch... noch, hetzij... hetzij, enerzijds... anderzijds, hoe... des te).",
  description: "Master the 6 core correlative balance patterns in B2 Dutch: cumulative addition ('zowel... als'), emphatic additive focus ('niet alleen... maar ook'), negative coordination ('noch... noch'), formal disjunctive choice ('hetzij... hetzij'), balanced contrast with inversion ('enerzijds... anderzijds'), and proportional comparative clauses ('hoe... des te').",
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'The Architecture of Correlative Balance', kind: 'discover',
      intro: "Explore how Dutch pairs correlative conjunctions to structure nuanced arguments, emphasize parallel ideas, and balance contrasting perspectives.",
      exercises: [
        {
          id: 'corr-ind-1', kind: 'induction', prompt: 'Compare the different correlative conjunction pairs in Dutch',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'Cumulative parallel coordination (Both ... and ...)', answer: 'Zowel het team als de directie steunt het voorstel.' },
              { prompt: 'Emphatic additive focus (Not only ... but also ...)', answer: 'Niet alleen dalen de kosten, maar ook de kwaliteit verbetert aanzienlijk.' },
              { prompt: 'Negative coordination (Neither ... nor ...)', answer: 'Noch de manager, noch de adviseurs hadden dit scenario voorzien.' },
              { prompt: 'Formal binary choice (Either ... or ...)', answer: 'We lossen dit op, hetzij via bemiddeling, hetzij via een juridische procedure.' },
              { prompt: 'Contrastive balance with inversion (On the one hand ... on the other hand ...)', answer: 'Enerzijds begrijp ik uw bezwaar, anderzijds moeten we ons aan de deadlines houden.' },
              { prompt: 'Proportional comparison (The more ... the better ...)', answer: 'Hoe eerder we beginnen, des te sneller boeken we resultaat.' }
            ],
            ruleChallenge: 'What is a key syntactic rule when using correlative conjunctions like "niet alleen ... maar ook" and "enerzijds ... anderzijds" in Dutch?',
            options: [
              { text: 'They require parallel syntactic structures, and when adverbs like "enerzijds/anderzijds" or "niet alleen" front a clause, they trigger subject-verb inversion in that clause.', isCorrect: true },
              { text: 'All correlative conjunctions push the verb to the absolute end of the sentence like "omdat".', isCorrect: false },
              { text: '"Noch ... noch" must always be accompanied by "niet" or "geen".', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'understand', title: 'Correlative Precision in Strategic Discourse', kind: 'understand',
      intro: "Examine how native Dutch professionals use correlatives to maintain objective balance, present trade-offs, and elevate communicative register.",
      exercises: [
        {
          id: 'corr-inf-1', kind: 'inference-challenge', prompt: 'Analyze the tone and communicative intent of the correlative statement',
          skills: ['reading', 'pragmatic'],
          inferenceData: {
            text: 'Tijdens de aandeelhoudersvergadering verklaarde de CFO: "Enerzijds biedt de overname van de buitenlandse concurrent ons directe toegang tot nieuwe groeimarkten, maar anderzijds brengt de integratie aanzienlijke operationele en culturele risico\'s met zich mee. We moeten derhalve niet alleen scherp sturen op kostenbesparing, maar ook de medewerkerstevredenheid nauwlettend monitoren."',
            question: 'How does the speaker frame the strategic situation through correlative markers?',
            options: [
              { text: 'The speaker constructs a balanced, mature risk-reward analysis using "enerzijds... anderzijds" for nuance and "niet alleen... maar ook" to mandate dual focus on both finances and people.', isCorrect: true, feedback: 'Uitstekend! Correlatives allow leaders to weigh trade-offs and enforce multidimensional priorities simultaneously.' },
              { text: 'The speaker rejects the acquisition outright because the risks outweigh any possible market gain.', isCorrect: false, feedback: '"Enerzijds... anderzijds" acknowledges the valid positive opportunities while noting risks.' },
              { text: 'The speaker is strictly concerned with cost-cutting and ignores internal staff relations.', isCorrect: false, feedback: 'The phrase "niet alleen... maar ook" explicitly elevates employee satisfaction to an equal priority.' }
            ]
          }
        }
      ]
    },
    {
      id: 'transform', title: 'Correlative Fusion & Production Drills', kind: 'transform',
      intro: "Combine separate statements into tightly structured, balanced Dutch correlative sentences.",
      exercises: [
        {
          id: 'corr-d-1', kind: 'correlative-drill', prompt: 'Parallel Coordination: Zowel ... als ...',
          skills: ['production', 'grammar'],
          correlativeData: {
            pairType: 'zowel-als',
            premiseA: 'Het verhogen van de operationele productiviteit is een prioriteit voor de organisatie.',
            premiseB: 'Het waarborgen van het welzijn van de medewerkers is eveneens een prioriteit.',
            pairCue: 'zowel ... als ...',
            structureFormula: 'Zowel [element A] als [element B] + [persoonsvorm + rest]',
            hint: 'Combine into: "Zowel de productiviteit verhogen als het welzijn waarborgen..." or "Zowel de productiviteit als het welzijn..."'
          },
          target: 'Zowel de productiviteit als het welzijn van de medewerkers staat hoog op de agenda',
          acceptedAnswers: [
            'Zowel de productiviteit als het welzijn van de medewerkers staat hoog op de agenda',
            'Zowel de productiviteit als het welzijn van de medewerkers is een prioriteit',
            'Zowel de operationele productiviteit als het welzijn van de medewerkers is een prioriteit voor de organisatie',
            'Zowel het verhogen van de productiviteit als het waarborgen van het welzijn is een prioriteit'
          ],
          explanation: '"Zowel ... als ..." coordinates two parallel elements cleanly without repeating redundant phrasing.'
        },
        {
          id: 'corr-d-2', kind: 'correlative-drill', prompt: 'Emphatic Additive Focus: Niet alleen ... maar ook ...',
          skills: ['production', 'grammar'],
          correlativeData: {
            pairType: 'niet-alleen-maar-ook',
            premiseA: 'De operationele kosten stijgen de laatste kwartalen alarmerend snel.',
            premiseB: 'De totale omzet blijft daarnaast ook ver achter bij de prognose.',
            pairCue: 'niet alleen ... maar ook ...',
            structureFormula: 'Niet alleen + [persoonsvorm + onderwerp], maar ook + [onderwerp + persoonsvorm / rest]',
            hint: 'Start with fronted inversion: "Niet alleen stijgen de operationele kosten snel, maar ook de omzet blijft achter."'
          },
          target: 'Niet alleen stijgen de operationele kosten snel, maar ook de omzet blijft achter',
          acceptedAnswers: [
            'Niet alleen stijgen de operationele kosten snel, maar ook de omzet blijft achter',
            'Niet alleen stijgen de operationele kosten, maar ook de omzet blijft achter bij de prognose',
            'Niet alleen stijgen de kosten, maar ook de omzet blijft achter',
            'Niet alleen stijgen de operationele kosten, maar ook de omzet daalt'
          ],
          explanation: 'Fronting "Niet alleen" causes subject-verb inversion ("stijgen de kosten"), paired with "maar ook" in the second clause.'
        },
        {
          id: 'corr-d-3', kind: 'correlative-drill', prompt: 'Negative Coordination: Noch ... noch ... (No double negation)',
          skills: ['production', 'grammar'],
          correlativeData: {
            pairType: 'noch-noch',
            premiseA: 'De afdelingsmanager was niet op de hoogte van de plotselinge beleidswijziging.',
            premiseB: 'De overige directieleden waren evenmin op de hoogte van de wijziging.',
            pairCue: 'noch ... noch ...',
            structureFormula: 'Noch [element A], noch [element B] + [persoonsvorm + rest] (geen niet/geen!)',
            hint: 'Start with "Noch de afdelingsmanager, noch de directieleden waren op de hoogte van de beleidswijziging."'
          },
          target: 'Noch de afdelingsmanager, noch de directieleden waren op de hoogte van de beleidswijziging',
          acceptedAnswers: [
            'Noch de afdelingsmanager, noch de directieleden waren op de hoogte van de beleidswijziging',
            'Noch de manager, noch de directieleden waren op de hoogte van de beleidswijziging',
            'Noch de afdelingsmanager, noch de directieleden was op de hoogte van de beleidswijziging',
            'Noch de manager, noch de directie was op de hoogte van de wijziging'
          ],
          explanation: '"Noch ... noch ..." coordinates two negative premises without adding extraneous negative words ("niet", "geen").'
        },
        {
          id: 'corr-d-4', kind: 'correlative-drill', prompt: 'Formal Binary Alternatives: Hetzij ... hetzij ...',
          skills: ['production', 'grammar'],
          correlativeData: {
            pairType: 'hetzij-hetzij',
            premiseA: 'We kunnen het contract aanpassen via een formeel schriftelijk addendum.',
            premiseB: 'Als alternatief kunnen we een geheel nieuw raamcontract opstellen.',
            pairCue: 'hetzij ... hetzij ...',
            structureFormula: '[Hoofdzin], hetzij [optie A], hetzij [optie B]',
            hint: 'Combine into: "We passen het contract aan, hetzij via een addendum, hetzij via een nieuw raamcontract."'
          },
          target: 'We passen het contract aan, hetzij via een addendum, hetzij via een nieuw raamcontract',
          acceptedAnswers: [
            'We passen het contract aan, hetzij via een addendum, hetzij via een nieuw raamcontract',
            'We passen het contract aan, hetzij via een schriftelijk addendum, hetzij via een nieuw contract',
            'We kunnen het contract aanpassen, hetzij via een addendum, hetzij via een nieuw raamcontract',
            'Het contract wordt aangepast, hetzij via een addendum, hetzij via een nieuw raamcontract'
          ],
          explanation: '"Hetzij ... hetzij ..." is a formal B2 disjunctive correlative formula that presents clear, balanced alternatives.'
        },
        {
          id: 'corr-d-5', kind: 'correlative-drill', prompt: 'Balanced Contrast with Inversion: Enerzijds ... anderzijds ...',
          skills: ['production', 'grammar'],
          correlativeData: {
            pairType: 'enerzijds-anderzijds',
            premiseA: 'Artificiële intelligentie biedt ongekende kansen voor efficiëntie en procesoptimalisatie.',
            premiseB: 'AI brengt tegelijkertijd aanzienlijke privacy- en beveiligingsrisico\'s met zich mee.',
            pairCue: 'enerzijds ... anderzijds ...',
            structureFormula: 'Enerzijds [inversie], anderzijds [inversie]',
            hint: 'Use inversion in both clauses: "Enerzijds biedt AI grote kansen, anderzijds brengt het serieuze risico\'s met zich mee."'
          },
          target: 'Enerzijds biedt AI grote kansen, anderzijds brengt het serieuze risico\'s met zich mee',
          acceptedAnswers: [
            'Enerzijds biedt AI grote kansen, anderzijds brengt het serieuze risico\'s met zich mee',
            'Enerzijds biedt kunstmatige intelligentie grote kansen, anderzijds brengt het serieuze risicos met zich mee',
            'Enerzijds biedt AI kansen voor efficiëntie, anderzijds brengt het aanzienlijke risico\'s met zich mee',
            'Enerzijds biedt AI ongekende kansen, anderzijds brengt het grote risico\'s met zich mee'
          ],
          explanation: '"Enerzijds" and "anderzijds" front the respective clauses, triggering subject-verb inversion ("biedt AI", "brengt het").'
        },
        {
          id: 'corr-d-6', kind: 'correlative-drill', prompt: 'Proportional Comparison: Hoe ... des te / hoe ...',
          skills: ['production', 'grammar'],
          correlativeData: {
            pairType: 'hoe-des-te',
            premiseA: 'We bereiden het projectvoorstel grondig voor (in toenemende mate).',
            premiseB: 'De kans op definitieve goedkeuring door het bestuur wordt groter.',
            pairCue: 'hoe ... des te ...',
            structureFormula: 'Hoe + [comparatief] + [bijzin SOV], des te + [comparatief] + [persoonsvorm + onderwerp + rest]',
            hint: 'Formulate: "Hoe grondiger we het voorstel voorbereiden, des te groter de kans op goedkeuring is."'
          },
          target: 'Hoe grondiger we het voorstel voorbereiden, des te groter de kans op goedkeuring is',
          acceptedAnswers: [
            'Hoe grondiger we het voorstel voorbereiden, des te groter de kans op goedkeuring is',
            'Hoe grondiger we het voorstel voorbereiden, des te groter is de kans op goedkeuring',
            'Hoe grondiger we het projectvoorstel voorbereiden, des te groter de kans op goedkeuring is',
            'Hoe beter we het voorstel voorbereiden, des te groter de kans op goedkeuring is'
          ],
          explanation: '"Hoe [comparative] [subclause], des te [comparative] [main clause]" models proportional correlation with precision.'
        }
      ]
    },
    {
      id: 'personalise', title: 'Your Balanced Discourse Synthesis', kind: 'personalise',
      intro: "Formulate a balanced professional opinion or strategic evaluation from your own work or academic experience using correlatives.",
      exercises: [
        {
          id: 'corr-p-1', kind: 'personalise', prompt: 'Formuleer een afgewogen standpunt over een actueel dilemma of verandering in jouw vakgebied met behulp van een correlatief paar (bijv. "enerzijds... anderzijds...", "niet alleen... maar ook...", "zowel... als...", of "hoe... des te...").',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['enerzijds', 'anderzijds', 'zowel', 'als', 'niet alleen', 'maar ook', 'des te', 'ontwikkelingen', 'kansen', 'risico\'s'],
          grammar: ['correlatieve-voegwoorden', 'balansstructuren', 'inversie']
        }
      ]
    }
  ]
}

export const conditionalChapter: Chapter = {
  slug: 'voorwaardelijke-beperkende-verbanden',
  level: 'B2',
  title: 'Conditionals & Restrictive Clauses',
  capability: "Formulate precise conditions, exceptions, contractual stipulations, and restrictive qualifications using B2 connectors (mits, tenzij, op voorwaarde dat, gesteld dat, voor zover, mocht...).",
  description: "Master the 6 core conditional and restrictive structures in professional and academic Dutch: strict prerequisite ('mits'), exception clauses ('tenzij'), formal contractual conditions ('op voorwaarde dat'), hypothetical premises ('gesteld dat'), restrictive scope ('voor zover'), and inverted conditional clauses ('mocht...').",
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'The Architecture of Conditions & Restrictions', kind: 'discover',
      intro: "Discover how advanced Dutch specifies prerequisites, exceptions, hypothetical premises, and restrictive limits with syntactic precision.",
      exercises: [
        {
          id: 'cond-ind-1', kind: 'induction', prompt: 'Compare the different conditional and restrictive markers in Dutch',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'Strict prerequisite (Only if / Provided that)', answer: 'We gaan akkoord met het voorstel, mits de kosten binnen het budget blijven.' },
              { prompt: 'Exception / Exemption (Unless / Except if)', answer: 'De vergadering gaat door, tenzij de voorzitter plotseling verhinderd is.' },
              { prompt: 'Formal contractual condition (On condition that)', answer: 'De subsidie wordt verleend, op voorwaarde dat het project vóór december wordt afgerond.' },
              { prompt: 'Hypothetical premise (Suppose that / Assuming that)', answer: 'Gesteld dat de inflatie verder oploopt, dan moeten we onze tarieven herzien.' },
              { prompt: 'Restrictive limitation (As far as / To the extent that)', answer: 'Voor zover ik kan nagaan, voldoet de aanvraag aan alle formele eisen.' },
              { prompt: 'Conditional inversion without "als" (Should / If it happens that)', answer: 'Mocht u nog aanvullende vragen hebben, neem dan gerust contact op.' }
            ],
            ruleChallenge: 'What is the primary syntactic rule for conditional conjunctions like "mits", "tenzij", "op voorwaarde dat", and "voor zover"?',
            options: [
              { text: 'They introduce subordinate clauses and require verb-final (SOV) word order.', isCorrect: true },
              { text: 'They always cause verb-second word order like "dus" and "daarom".', isCorrect: false },
              { text: '"Mits" and "tenzij" mean the same thing and are freely interchangeable.', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'understand', title: 'Conditions & Boundaries in Strategic Negotiation', kind: 'understand',
      intro: "Examine how professionals set hard boundaries, contract prerequisites, and contingencies in negotiations.",
      exercises: [
        {
          id: 'cond-inf-1', kind: 'inference-challenge', prompt: 'Analyze the legal commitments and contingencies in the statement',
          skills: ['reading', 'pragmatic'],
          inferenceData: {
            text: 'Tijdens de contractonderhandelingen stelde de bedrijfsjurist: "Wij stemmen in met de voorgestelde leveringstermijnen, mits de softwareleverancier de uptime van 99,9% schriftelijk garandeert. Tenzij er vóór vrijdag een bindend SLA-document wordt ondertekend, behouden wij ons het recht voor om de overeenkomst eenzijdig te ontbinden. Mocht er overmacht optreden, dan treden partijen binnen 48 uur in overleg."',
            question: 'How does the lawyer structure the commitments using conditional markers?',
            options: [
              { text: 'The lawyer sets a strict prerequisite with "mits" (uptime guarantee), establishes a binding dealbreaker with "tenzij" (signed SLA), and provides a contingency process with "mocht" for force majeure.', isCorrect: true, feedback: 'Uitstekend! "Mits" creates a prerequisite, "tenzij" marks an exception/cancellation clause, and "mocht" handles contingency.' },
              { text: 'The lawyer terminates the contract immediately and refuses to negotiate further.', isCorrect: false, feedback: 'The lawyer sets clear conditions under which the contract remains valid.' },
              { text: 'The lawyer assumes that uptime guarantees are unnecessary if force majeure occurs.', isCorrect: false, feedback: 'Both conditions are strictly separated and formally defined.' }
            ]
          }
        }
      ]
    },
    {
      id: 'transform', title: 'Conditional & Restrictive Precision Drills', kind: 'transform',
      intro: "Combine premises into precise Dutch conditional and restrictive sentences.",
      exercises: [
        {
          id: 'cond-d-1', kind: 'conditional-drill', prompt: 'Strict Prerequisite: Mits (Provided that / Only if)',
          skills: ['production', 'grammar'],
          conditionalData: {
            conditionType: 'mits',
            mainPremise: 'Het management keurt het investeringsvoorstel voor de nieuwe apparatuur goed.',
            conditionPremise: 'De terugverdientijd blijft strikt binnen drie jaar (noodzakelijke voorwaarde).',
            connectorCue: 'mits',
            structureFormula: '[Hoofdzin], mits + [onderwerp + rest + persoonsvorm]',
            hint: 'Combine into: "Het management keurt het voorstel goed, mits de terugverdientijd binnen drie jaar blijft."'
          },
          target: 'Het management keurt het voorstel goed, mits de terugverdientijd binnen drie jaar blijft',
          acceptedAnswers: [
            'Het management keurt het voorstel goed, mits de terugverdientijd binnen drie jaar blijft',
            'Het management keurt het investeringsvoorstel goed, mits de terugverdientijd binnen drie jaar blijft',
            'Het management keurt het voorstel goed mits de terugverdientijd binnen drie jaar blijft',
            'Het investeringsvoorstel wordt goedgekeurd, mits de terugverdientijd binnen drie jaar blijft'
          ],
          explanation: '"Mits" introduces a necessary condition ("alleen als") and moves the finite verb "blijft" to the end of the subclause.'
        },
        {
          id: 'cond-d-2', kind: 'conditional-drill', prompt: 'Exception Clause: Tenzij (Unless / Except if)',
          skills: ['production', 'grammar'],
          conditionalData: {
            conditionType: 'tenzij',
            mainPremise: 'Het nieuwe hybride werkbeleid treedt per 1 september officieel in werking.',
            conditionPremise: 'De ondernemingsraad tekent vóór die datum formeel bezwaar aan (uitzonderingsgeval).',
            connectorCue: 'tenzij',
            structureFormula: '[Hoofdzin], tenzij + [onderwerp + rest + persoonsvorm] (geen dubbele ontkenning!)',
            hint: 'Formulate: "Het nieuwe beleid treedt in werking, tenzij de ondernemingsraad bezwaar aantekent."'
          },
          target: 'Het nieuwe beleid treedt in werking, tenzij de ondernemingsraad formeel bezwaar aantekent',
          acceptedAnswers: [
            'Het nieuwe beleid treedt in werking, tenzij de ondernemingsraad formeel bezwaar aantekent',
            'Het nieuwe hybride werkbeleid treedt in werking, tenzij de ondernemingsraad formeel bezwaar aantekent',
            'Het nieuwe werkbeleid treedt in werking, tenzij de ondernemingsraad bezwaar aantekent',
            'Het beleid treedt in werking, tenzij de ondernemingsraad bezwaar aantekent'
          ],
          explanation: '"Tenzij" means "behalve als" (unless). The subclause takes SOV verb-final order ("bezwaar aantekent") without extra negation words.'
        },
        {
          id: 'cond-d-3', kind: 'conditional-drill', prompt: 'Contractual Stipulation: Op voorwaarde dat (On condition that)',
          skills: ['production', 'grammar'],
          conditionalData: {
            conditionType: 'op-voorwaarde-dat',
            mainPremise: 'De provincie verstrekt de toegezegde innovatiesubsidie aan het consortium.',
            conditionPremise: 'Het consortium behaalt de afgesproken duurzaamheidsdoelen vóór het einde van het jaar.',
            connectorCue: 'op voorwaarde dat',
            structureFormula: '[Hoofdzin], op voorwaarde dat + [onderwerp + rest + persoonsvorm]',
            hint: 'Combine into: "De provincie verstrekt de subsidie, op voorwaarde dat het consortium de doelen behaalt."'
          },
          target: 'De provincie verstrekt de subsidie, op voorwaarde dat het consortium de doelen behaalt',
          acceptedAnswers: [
            'De provincie verstrekt de subsidie, op voorwaarde dat het consortium de doelen behaalt',
            'De provincie verstrekt de innovatiesubsidie, op voorwaarde dat het consortium de duurzaamheidsdoelen behaalt',
            'De provincie verstrekt de subsidie op voorwaarde dat het consortium de doelen behaalt',
            'De subsidie wordt verstrekt, op voorwaarde dat het consortium de duurzaamheidsdoelen behaalt'
          ],
          explanation: '"Op voorwaarde dat" introduces a formal contractual condition with subclause word order ("de doelen behaalt").'
        },
        {
          id: 'cond-d-4', kind: 'conditional-drill', prompt: 'Hypothetical Premise: Gesteld dat / Aangenomen dat (Suppose that)',
          skills: ['production', 'grammar'],
          conditionalData: {
            conditionType: 'gesteld-dat',
            mainPremise: 'We moeten onze operationele begroting en personeelsplanning grondig herzien.',
            conditionPremise: 'De energiekosten stijgen de komende wintermaanden nog verder (hypothetische aanname).',
            connectorCue: 'gesteld dat',
            structureFormula: 'Gesteld dat + [onderwerp + rest + persoonsvorm], dan [persoonsvorm + onderwerp + rest]',
            hint: 'Start with: "Gesteld dat de energiekosten verder stijgen, dan moeten we onze begroting herzien."'
          },
          target: 'Gesteld dat de energiekosten verder stijgen, dan moeten we onze begroting herzien',
          acceptedAnswers: [
            'Gesteld dat de energiekosten verder stijgen, dan moeten we onze begroting herzien',
            'Gesteld dat de energiekosten verder stijgen, moeten we onze begroting herzien',
            'Gesteld dat de energiekosten stijgen, dan moeten we de begroting herzien',
            'Aangenomen dat de energiekosten verder stijgen, dan moeten we onze begroting herzien'
          ],
          explanation: '"Gesteld dat" fronts the hypothetical premise with subclause word order ("verder stijgen"), followed by an inverted main clause ("dan moeten we").'
        },
        {
          id: 'cond-d-5', kind: 'conditional-drill', prompt: 'Restrictive Qualification: Voor zover (As far as / Insofar as)',
          skills: ['production', 'grammar'],
          conditionalData: {
            conditionType: 'voor-zover',
            mainPremise: 'Voldoet het ingediende projectvoorstel aan alle formele criteria van de subsidiegever.',
            conditionPremise: 'Ik kan dit op basis van de huidige gegevens en documentatie beoordelen (beperkende reikwijdte).',
            connectorCue: 'voor zover',
            structureFormula: 'Voor zover + [onderwerp + rest + persoonsvorm], [persoonsvorm + onderwerp + rest]',
            hint: 'Formulate: "Voor zover ik kan beoordelen, voldoet het voorstel aan alle criteria."'
          },
          target: 'Voor zover ik kan beoordelen, voldoet het voorstel aan alle criteria',
          acceptedAnswers: [
            'Voor zover ik kan beoordelen, voldoet het voorstel aan alle criteria',
            'Voor zover ik kan beoordelen, voldoet het projectvoorstel aan alle criteria',
            'Voor zover ik het kan beoordelen, voldoet het projectvoorstel aan alle formele criteria',
            'Voor zover wij kunnen beoordelen, voldoet het voorstel aan alle criteria'
          ],
          explanation: '"Voor zover" establishes a restrictive boundary ("as far as"). The subclause places verbs at the end ("kan beoordelen"), triggering inversion in the main clause ("voldoet het voorstel").'
        },
        {
          id: 'cond-d-6', kind: 'conditional-drill', prompt: 'Conditional Inversion: Mocht(en)... (Should you / If it happens that)',
          skills: ['production', 'grammar'],
          conditionalData: {
            conditionType: 'mocht-inversion',
            mainPremise: 'Neem dan direct contact op met onze technische ondersteuningsdienst.',
            conditionPremise: 'U constateert na de software-update onverwachte technische complicaties.',
            connectorCue: 'mocht(en) + inversie',
            structureFormula: 'Mocht(en) + [onderwerp + rest + infinitief], [persoonsvorm + onderwerp + rest]',
            hint: 'Start with: "Mocht u complicaties constateren, neem dan direct contact op met de klantenservice."'
          },
          target: 'Mocht u complicaties constateren, neem dan direct contact op met de ondersteuningsdienst',
          acceptedAnswers: [
            'Mocht u complicaties constateren, neem dan direct contact op met de ondersteuningsdienst',
            'Mocht u complicaties constateren, neem dan direct contact op met de technische ondersteuningsdienst',
            'Mocht u technische complicaties constateren, neem dan contact op met de ondersteuningsdienst',
            'Mocht u problemen ondervinden, neem dan direct contact op met de ondersteuningsdienst'
          ],
          explanation: '"Mocht(en)" replaces "als" in high-register formal Dutch, fronting the auxiliary verb and triggering main clause inversion with "dan".'
        }
      ]
    },
    {
      id: 'personalise', title: 'Your Professional Terms & Boundary Setting', kind: 'personalise',
      intro: "Formulate a professional prerequisite, exception, or restrictive boundary from your own work or academic domain using conditional connectors.",
      exercises: [
        {
          id: 'cond-p-1', kind: 'personalise', prompt: 'Beschrijf een belangrijke voorwaarde, uitzondering of restrictie in jouw werk of studie met behulp van "mits", "tenzij", "op voorwaarde dat", "voor zover", of "mocht".',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['mits', 'tenzij', 'op voorwaarde dat', 'gesteld dat', 'voor zover', 'mocht', 'akkoord', 'overeenkomst', 'voorwaarde', 'beperking'],
          grammar: ['voorwaardelijke-verbanden', 'beperkende-verbanden', 'bijzin-woordvolgorde', 'inversie']
        }
      ]
    }
  ]
}

export const causalityChapter: Chapter = {
  slug: 'oorzaak-gevolg-doel',
  level: 'B2',
  title: 'Causal, Consecutive & Final Relations',
  capability: "Express nuanced causes (doordat, aangezien), negative/positive attributions (te wijten aan, te danken aan), consecutive results (waardoor, dermate... dat), and formal purpose (opdat, teneinde te).",
  description: "Master the 8 core causal, consecutive, and final structures in professional and academic Dutch: involuntary cause ('doordat'), formal reasoned justification ('aangezien'), negative causal attribution ('te wijten aan'), positive merit ('te danken aan' / 'dankzij'), relative consequence ('waardoor'), intensified degree & result ('dermate... dat'), formal purpose subclause ('opdat'), and formal purpose infinitive ('teneinde... te').",
  estimatedMinutes: 22,
  stages: [
    {
      id: 'discover', title: 'The Matrix of Cause, Consequence & Purpose', kind: 'discover',
      intro: "Discover how advanced Dutch distinguishes involuntary physical causes, conscious motivations, positive versus negative attributions, objective consequences, and formal expressions of purpose.",
      exercises: [
        {
          id: 'caus-ind-1', kind: 'induction', prompt: 'Compare the causal, consecutive, and final connectors in Dutch',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'Involuntary physical cause (Doordat)', answer: 'Doordat de stroom plotseling uitviel, stopten alle productielijnen.' },
              { prompt: 'Formal reasoned premise (Aangezien)', answer: 'Aangezien de inschrijvingstermijn is verstreken, kunnen we geen aanvragen meer accepteren.' },
              { prompt: 'Negative causal blame (Te wijten aan)', answer: 'De vertraging van het project is grotendeels te wijten aan leveringsproblemen.' },
              { prompt: 'Positive merit / credit (Te danken aan / Dankzij)', answer: 'Het behalen van de omzetdoelen is te danken aan de enorme inzet van het salesteam.' },
              { prompt: 'Relative consecutive consequence (Waardoor)', answer: 'De leverancier ging failliet, waardoor de fabricage wekenlang stillag.' },
              { prompt: 'Intensified degree & consequence (Dermate... dat)', answer: 'De grondstofprijzen stegen dermate snel dat de marges onder zware druk kwamen.' },
              { prompt: 'Formal subclause purpose (Opdat)', answer: 'De veiligheidsprotocollen zijn aangescherpt, opdat incidenten in de toekomst voorkomen kunnen worden.' },
              { prompt: 'Formal infinitive purpose (Teneinde... te)', answer: 'We hebben de procedures herzien, teneinde de operationele efficiëntie te waarborgen.' }
            ],
            ruleChallenge: 'What is the critical distinction between "doordat" and "omdat / aangezien" in standard Dutch?',
            options: [
              { text: '"Doordat" expresses an involuntary cause or external physical factor, whereas "omdat" and "aangezien" express conscious human reasons or motivations.', isCorrect: true },
              { text: '"Doordat" and "omdat" mean exactly the same thing and can be swapped without any stylistic difference.', isCorrect: false },
              { text: '"Doordat" always requires verb-second word order like "dus".', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'understand', title: 'Executive Analysis of Crisis & Strategy', kind: 'understand',
      intro: "Examine how a CEO and director of operations communicate causes, attributions, consequences, and strategic purposes in an annual board briefing.",
      exercises: [
        {
          id: 'caus-inf-1', kind: 'inference-challenge', prompt: 'Analyze causal attributions and strategic goals in the management report',
          skills: ['reading', 'pragmatic'],
          inferenceData: {
            text: 'In het jaarverslag rapporteerde de Raad van Bestuur: "Doordat een zware storm de hoofdcentrale beschadigde, ondervond ons datacentrum een tijdelijke stroomonderbreking. Hoewel de initiële downtime te wijten was aan een falende noodaggregaat, is het snelle herstel binnen drie uur te danken aan de doortastende inzet van ons technische team. Aangezien digitale continuïteit cruciaal is voor onze cliënten, hebben we een nieuw redundantiesysteem geïnstalleerd, waardoor toekomstige storingen direct opgevangen worden. Wij hebben deze maatregelen met spoed doorgevoerd, opdat onze operationele betrouwbaarheid ten alle tijden gegarandeerd blijft."',
            question: 'How does management delineate causes, merits, and strategic intent using these connectors?',
            options: [
              { text: 'Management clearly attributes the physical trigger to "doordat", blames the generator failure with "te wijten aan", credits the engineers with "te danken aan", explains the consequence with "waardoor", and states the overarching goal with "opdat".', isCorrect: true, feedback: 'Uitstekend! Every connector is used with exact semantic and pragmatic precision.' },
              { text: 'Management claims that the technical team caused the power outage.', isCorrect: false, feedback: 'The power outage was triggered by the storm ("doordat") and failure of the generator ("te wijten aan").' },
              { text: 'Management views the new redundancy system as an unnecessary cost.', isCorrect: false, feedback: 'Management installed it specifically to prevent future downtime ("opdat").' }
            ]
          }
        }
      ]
    },
    {
      id: 'transform', title: 'Causal, Consecutive & Final Drills', kind: 'transform',
      intro: "Combine premises into precise Dutch sentences using advanced causal, consecutive, and final connectors.",
      exercises: [
        {
          id: 'caus-d-1', kind: 'causality-drill', prompt: 'Involuntary Cause: Doordat (External Cause / Physical Fact)',
          skills: ['production', 'grammar'],
          causalityData: {
            relationType: 'doordat-oorzaak',
            premiseOrCause: 'De zware najaarsstorm zorgde voor omgewaaide bomen op het spoor (externe oorzaak).',
            resultOrAction: 'Het treinverkeer tussen Utrecht en Amsterdam lag urenlang volledig stil.',
            connectorCue: 'doordat',
            structureFormula: 'Doordat + [onderwerp + rest + persoonsvorm], [persoonsvorm + onderwerp + rest]',
            hint: 'Start with: "Doordat de storm voor omgewaaide bomen zorgde, lag het treinverkeer stil."'
          },
          target: 'Doordat de storm voor omgewaaide bomen zorgde, lag het treinverkeer urenlang stil',
          acceptedAnswers: [
            'Doordat de storm voor omgewaaide bomen zorgde, lag het treinverkeer urenlang stil',
            'Doordat de zware storm voor omgewaaide bomen zorgde, lag het treinverkeer stil',
            'Doordat de storm voor omgewaaide bomen op het spoor zorgde, lag het treinverkeer urenlang stil',
            'Het treinverkeer lag urenlang stil, doordat de storm voor omgewaaide bomen zorgde'
          ],
          explanation: '"Doordat" is strictly used for involuntary causes and physical events without human intention, placing verbs at the end of the subclause ("zorgde").'
        },
        {
          id: 'caus-d-2', kind: 'causality-drill', prompt: 'Formal Reasoned Justification: Aangezien (Since / As / Given that)',
          skills: ['production', 'grammar'],
          causalityData: {
            relationType: 'aangezien-reden',
            premiseOrCause: 'De wettelijke aanvraagtermijn voor de vergunning is gisteren officieel verstreken (vaststaand motief).',
            resultOrAction: 'De gemeente kan uw dossier helaas niet meer inhoudelijk in behandeling nemen.',
            connectorCue: 'aangezien',
            structureFormula: 'Aangezien + [onderwerp + rest + persoonsvorm], [persoonsvorm + onderwerp + rest]',
            hint: 'Formulate: "Aangezien de termijn is verstreken, kan de gemeente het dossier niet meer behandelen."'
          },
          target: 'Aangezien de wettelijke termijn is verstreken, kan de gemeente de aanvraag niet meer in behandeling nemen',
          acceptedAnswers: [
            'Aangezien de wettelijke termijn is verstreken, kan de gemeente de aanvraag niet meer in behandeling nemen',
            'Aangezien de termijn is verstreken, kan de gemeente de aanvraag niet meer in behandeling nemen',
            'Aangezien de aanvraagtermijn is verstreken, kan de gemeente het dossier niet meer in behandeling nemen',
            'Aangezien de termijn is verstreken, kunnen we de aanvraag niet meer behandelen'
          ],
          explanation: '"Aangezien" introduces an established reasoned premise in formal Dutch, placing the auxiliary/participle cluster at the subclause end ("is verstreken").'
        },
        {
          id: 'caus-d-3', kind: 'causality-drill', prompt: 'Negative Causal Attribution: Te wijten aan (Due to / Blamed on)',
          skills: ['production', 'grammar'],
          causalityData: {
            relationType: 'te-wijten-aan',
            premiseOrCause: 'Een onvoorziene fout in de softwarecode leidde tot aanzienlijke vertraging.',
            resultOrAction: 'De vertraging van de oplevering is grotendeels veroorzaakt door deze fout.',
            connectorCue: 'te wijten aan',
            structureFormula: '[Onderwerp / Gevolg] is [grotendeels] te wijten aan + [zelfstandig naamwoord / oorzaak]',
            hint: 'Formulate: "De vertraging van het project is te wijten aan een fout in de software."'
          },
          target: 'De vertraging van het project is te wijten aan een softwarefout',
          acceptedAnswers: [
            'De vertraging van het project is te wijten aan een softwarefout',
            'De vertraging van de oplevering is te wijten aan een fout in de software',
            'De vertraging is grotendeels te wijten aan een softwarefout',
            'De vertraging van het project is grotendeels te wijten aan een softwarefout'
          ],
          explanation: '"Te wijten aan" is exclusively used to assign blame for negative outcomes or failures (never use "dankzij" for errors or accidents).'
        },
        {
          id: 'caus-d-4', kind: 'causality-drill', prompt: 'Positive Merit & Credit: Te danken aan / Dankzij (Thanks to / Credited to)',
          skills: ['production', 'grammar'],
          causalityData: {
            relationType: 'te-danken-aan',
            premiseOrCause: 'De niet-aflatende inzet en toewijding van het voltallige projectteam.',
            resultOrAction: 'Het succesvol afronden van de complexe migratie binnen de gestelde deadline.',
            connectorCue: 'te danken aan',
            structureFormula: '[Positief resultaat] is te danken aan + [positieve factor / verdienste]',
            hint: 'Formulate: "Het succes van de migratie is te danken aan de inzet van het team."'
          },
          target: 'Het succes van de migratie is te danken aan de inzet van het team',
          acceptedAnswers: [
            'Het succes van de migratie is te danken aan de inzet van het team',
            'Het succes van het project is te danken aan de inzet van het team',
            'Het succesvolle resultaat is te danken aan de toewijding van het team',
            'De succesvolle migratie is te danken aan de enorme inzet van het team'
          ],
          explanation: '"Te danken aan" (and "dankzij") expresses positive attribution and gratitude for favorable accomplishments.'
        },
        {
          id: 'caus-d-5', kind: 'causality-drill', prompt: 'Relative Consequence: Waardoor (As a result of which / Causing)',
          skills: ['production', 'grammar'],
          causalityData: {
            relationType: 'waardoor-gevolg',
            premiseOrCause: 'Onze belangrijkste chipleverancier in Azië werd getroffen door een faillissement.',
            resultOrAction: 'De productie van onze nieuwste hardwareproducten kwam wekenlang volledig stil te liggen.',
            connectorCue: 'waardoor',
            structureFormula: '[Hoofdzin], waardoor + [onderwerp + rest + persoonsvorm]',
            hint: 'Combine into: "De leverancier ging failliet, waardoor de productie wekenlang stil kwam te liggen."'
          },
          target: 'De leverancier ging failliet, waardoor de productie wekenlang stil kwam te liggen',
          acceptedAnswers: [
            'De leverancier ging failliet, waardoor de productie wekenlang stil kwam te liggen',
            'De leverancier ging failliet, waardoor de productie wekenlang stil lag',
            'De leverancier ging failliet, waardoor de productie van de hardware stil kwam te liggen',
            'De hoofdleverancier ging failliet, waardoor de productie wekenlang stillag'
          ],
          explanation: '"Waardoor" is a relative consecutive subjunction expressing the direct consequence of the main clause, moving all verbs to the end.'
        },
        {
          id: 'caus-d-6', kind: 'causality-drill', prompt: 'Degree & Consequence: Dermate... dat (To such an extent that)',
          skills: ['production', 'grammar'],
          causalityData: {
            relationType: 'dermate-dat',
            premiseOrCause: 'De operationele kosten van de productielijn stegen extreem snel in het derde kwartaal.',
            resultOrAction: 'De directie moest direct ingrijpen met een acute wervingsstop.',
            connectorCue: 'dermate... dat',
            structureFormula: '[Onderwerp] [werkwoord] dermate [adverbium] dat + [onderwerp + rest + persoonsvorm]',
            hint: 'Formulate: "De kosten stegen dermate snel dat de directie moest ingrijpen."'
          },
          target: 'De kosten stegen dermate snel dat de directie direct moest ingrijpen',
          acceptedAnswers: [
            'De kosten stegen dermate snel dat de directie direct moest ingrijpen',
            'De operationele kosten stegen dermate snel dat de directie moest ingrijpen',
            'De kosten stegen dermate snel dat de directie ingreep',
            'De kosten stegen dermate sterk dat de directie direct moest ingrijpen'
          ],
          explanation: '"Dermate [adjectief/adverbium] dat..." expresses a consequential outcome driven by extreme degree, with verb-final word order in the dat-clause.'
        },
        {
          id: 'caus-d-7', kind: 'causality-drill', prompt: 'Formal Purpose Clause: Opdat (So that / In order that)',
          skills: ['production', 'grammar'],
          causalityData: {
            relationType: 'opdat-doel',
            premiseOrCause: 'De Raad van Bestuur heeft strenge nalevings- en controlemaatregelen ingesteld.',
            resultOrAction: 'Toekomstige compliancerisico’s en financiële sancties kunnen effectief voorkomen worden.',
            connectorCue: 'opdat',
            structureFormula: '[Hoofdzin], opdat + [onderwerp + rest + werkwoordcluster]',
            hint: 'Combine into: "De directie heeft maatregelen ingesteld, opdat risico\'s voorkomen kunnen worden."'
          },
          target: 'De directie heeft maatregelen ingesteld, opdat risico\'s in de toekomst voorkomen kunnen worden',
          acceptedAnswers: [
            'De directie heeft maatregelen ingesteld, opdat risico\'s in de toekomst voorkomen kunnen worden',
            'De directie heeft maatregelen ingesteld, opdat risico\'s voorkomen kunnen worden',
            'Het bestuur heeft maatregelen ingesteld, opdat toekomstige risico\'s voorkomen kunnen worden',
            'Er zijn maatregelen ingesteld, opdat risico\'s voorkomen kunnen worden'
          ],
          explanation: '"Opdat" introduces a formal subordinate clause of purpose ("met het doel dat"), requiring subordinate verb-final placement ("voorkomen kunnen worden").'
        },
        {
          id: 'caus-d-8', kind: 'causality-drill', prompt: 'Formal Infinitive Purpose: Teneinde... te (In order to)',
          skills: ['production', 'grammar'],
          causalityData: {
            relationType: 'teneinde-te',
            premiseOrCause: 'De afdeling kwaliteitszorg herziet alle interne werkprocessen en richtlijnen.',
            resultOrAction: 'De internationale ISO-veiligheidscertificering duurzaam waarborgen.',
            connectorCue: 'teneinde... te',
            structureFormula: '[Hoofdzin], teneinde + [lijdend voorwerp / bepalingen] te + [infinitief]',
            hint: 'Formulate: "De afdeling herziet de processen, teneinde de certificering te waarborgen."'
          },
          target: 'De afdeling herziet de processen, teneinde de certificering duurzaam te waarborgen',
          acceptedAnswers: [
            'De afdeling herziet de processen, teneinde de certificering duurzaam te waarborgen',
            'De afdeling herziet de processen, teneinde de certificering te waarborgen',
            'De afdeling herziet de werkprocessen, teneinde de veiligheidscertificering te waarborgen',
            'We herzien de processen, teneinde de certificering te waarborgen'
          ],
          explanation: '"Teneinde... te" is the high-register formal equivalent of "om... te", followed by an infinitive construction.'
        }
      ]
    },
    {
      id: 'personalise', title: 'Your Professional Logic & Strategic Goals', kind: 'personalise',
      intro: "Formulate a causal explanation, consequence, or purpose statement from your own professional or academic experience using these B2 connectors.",
      exercises: [
        {
          id: 'caus-p-1', kind: 'personalise', prompt: 'Beschrijf een belangrijke oorzaak, gevolgtrekking of doelstelling in jouw werk of studie met behulp van "doordat", "aangezien", "te wijten aan", "te danken aan", "waardoor", "opdat", of "teneinde te".',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['doordat', 'aangezien', 'te wijten aan', 'te danken aan', 'waardoor', 'dermate dat', 'opdat', 'teneinde te', 'oorzaak', 'gevolg', 'doelstelling'],
          grammar: ['oorzakelijke-verbanden', 'gevolgtrekking', 'doelgerichte-constructies', 'bijzin-woordvolgorde']
        }
      ]
    }
  ]
}

export const prefixVerbChapter: Chapter = {
  slug: 'scheidbare-onscheidbare-werkwoorden',
  level: 'B2',
  title: 'Separable vs Inseparable Prefix Verbs',
  capability: "Master stress-dependent prefix verbs (voorkomen, ondergaan, overleggen, doorlopen, achterhalen) with accurate splitting, participle formation, and 'te' placement.",
  description: "Master the subtle yet crucial distinction between separable and inseparable compound verbs in B2 Dutch: stressed prefixes ('vóórkomen', 'óndergaan', 'óverleggen', 'dóórlopen') that split in main clauses and take 'ge-'/'te' infixation, versus unstressed prefixes ('voorkómen', 'ondergáán', 'overléggen', 'doorlópen', 'achterhálen', 'doorbréken') that never split and take no 'ge-'.",
  estimatedMinutes: 22,
  stages: [
    {
      id: 'discover', title: 'The Law of Stress & Split: Prefix Verbs', kind: 'discover',
      intro: "Discover how a single shift in stress transforms the meaning, conjugation, participle formation, and syntax of Dutch compound verbs.",
      exercises: [
        {
          id: 'prefix-ind-1', kind: 'induction', prompt: 'Compare separable and inseparable prefix verbs in Dutch',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'voorkómen (inseparable = prevent)', answer: 'De specialist voorkomt een ernstige medische complicatie.' },
              { prompt: 'vóórkomen (separable = occur / happen)', answer: 'Dit soort technische storingen komt gelukkig zelden voor.' },
              { prompt: 'overléggen (inseparable = deliberate / consult)', answer: 'De minister heeft vanochtend met de commissie overlegd.' },
              { prompt: 'óverleggen (separable = submit documents)', answer: 'De sollicitant is verplicht om zijn getuigschrift over te leggen.' },
              { prompt: 'ondergáán (inseparable = undergo / endure)', answer: 'Het bedrijf heeft een ingrijpende reorganisatie ondergaan.' },
              { prompt: 'óndergaan (separable = sun setting / sink)', answer: 'De zon gaat vanavond om acht uur schitterend onder.' },
              { prompt: 'achterhálen (inseparable = trace / find out)', answer: 'De politie doet onderzoek om de ware toedracht te achterhalen.' },
              { prompt: 'doorbréken (inseparable = break deadlock)', answer: 'De bemiddelaar doorbreekt de langdurige impasse tussen partijen.' }
            ],
            ruleChallenge: 'How do stress patterns determine the grammatical behavior of Dutch prefix verbs?',
            options: [
              { text: 'When the prefix is stressed, the verb is separable (splits in main clauses, inserts "ge-" in participles and "te" in infinitives). When the stem is stressed, the verb is inseparable (never splits, no "ge-", "te" precedes the whole verb).', isCorrect: true },
              { text: 'All prefix verbs in Dutch are separable in the present tense and inseparable in the past tense.', isCorrect: false },
              { text: 'Separable verbs only exist with the prefix "over-", while "voor-" is always inseparable.', isCorrect: false }
            ]
          }
        }
      ]
    },
    {
      id: 'understand', title: 'Executive Debrief: Legal, Medical & Corporate Precision', kind: 'understand',
      intro: "Analyze how a corporate legal counsel and operations director communicate risks, document submissions, negotiations, and prevention in an official compliance review.",
      exercises: [
        {
          id: 'prefix-inf-1', kind: 'inference-challenge', prompt: 'Analyze prefix verbs and semantic distinctions in the legal counsel report',
          skills: ['reading', 'pragmatic'],
          inferenceData: {
            text: 'Tijdens de aandeelhoudersvergadering lichtte de hoofdjurist toe: "Ons complianceteam voorkomt proactief juridische risico\'s door alle contracten vooraf te screenen. Mocht er desalniettemin een geschil vóórkomen, dan overleggen we direct met externe experts. Om boetes te vermijden, zijn alle leveranciers verplicht om hun certificaten tijdig over te leggen. Het afgelopen jaar heeft onze onderneming een omvangrijke audit ondergaan, waarbij we het complete veiligheidsprotocol hebben doorlopen. Dankzij dit strenge beleid heeft het management de negatieve trend definitief doorbroken."',
            question: 'How does the legal counsel utilize separable and inseparable verbs to convey precise administrative actions?',
            options: [
              { text: 'The counsel uses "voorkomt" (inseparable) for preventing risks, "vóórkomen" (separable) for issues arising, "overleggen" (inseparable) for consulting experts, "over te leggen" (separable) for submitting certificates, "ondergaan" (inseparable) for undergoing an audit, "doorlopen" (inseparable) for completing protocols, and "doorbroken" (inseparable) for breaking the trend.', isCorrect: true, feedback: 'Uitstekend! Every verb is conjugated according to its specific stress pattern and semantic meaning.' },
              { text: 'The counsel claims that the company refused to submit any documents to the auditors.', isCorrect: false, feedback: 'Suppliers were required to submit certificates ("over te leggen").' },
              { text: 'The counsel states that the company failed its safety audit.', isCorrect: false, feedback: 'The company completed the entire protocol ("heeft doorlopen") and broke the negative trend ("heeft doorbroken").' }
            ]
          }
        }
      ]
    },
    {
      id: 'transform', title: 'Separable vs Inseparable Drills', kind: 'transform',
      intro: "Conjugate Dutch prefix verbs in present main clauses, perfect tenses, and infinitive constructions according to their stress patterns and meanings.",
      exercises: [
        {
          id: 'prefix-d-1', kind: 'prefix-verb-drill', prompt: 'Inseparable Verb: Voorkómen (To Prevent / Beletten)',
          skills: ['production', 'grammar'],
          prefixVerbData: {
            verb: 'voorkomen',
            stressPattern: 'inseparable-stressed-stem',
            stressedForm: 'voor·kó·men (onscheidbaar)',
            meaningDefinition: 'voorkómen = beletten, verhinderen (to prevent / avert)',
            targetStructure: 'present-main',
            contextPrompt: 'De medisch specialist grijpt direct in om een ernstige fout tijdens de ingreep te vermijden. Schrijf een hoofdzin in de tegenwoordige tijd met "voorkomen".',
            structureFormula: '[Onderwerp] + [vorm van voorkomen] + [lijdend voorwerp]',
            hint: 'Formulate: "De specialist voorkomt een ernstige medische fout."'
          },
          target: 'De specialist voorkomt een ernstige medische fout',
          acceptedAnswers: [
            'De specialist voorkomt een ernstige medische fout',
            'De arts voorkomt een ernstige medische fout',
            'De specialist voorkomt een ernstige fout',
            'De arts voorkomt een medische fout'
          ],
          explanation: '"Voorkómen" (prevent) has stress on "-komen" and is inseparable. It never splits in a main clause: "De arts voorkomt de fout" (not "komt... voor").'
        },
        {
          id: 'prefix-d-2', kind: 'prefix-verb-drill', prompt: 'Separable Verb: Vóórkomen (To Occur / Gebeuren / Plaatsvinden)',
          skills: ['production', 'grammar'],
          prefixVerbData: {
            verb: 'voorkomen',
            stressPattern: 'separable-stressed-prefix',
            stressedForm: 'vóór·ko·men (scheidbaar)',
            meaningDefinition: 'vóórkomen = gebeuren, zich voordoen, lijken (to occur / happen)',
            targetStructure: 'present-main',
            contextPrompt: 'Dit type technische storing gebeurt gelukkig uiterst zelden in het beveiligde datacenter. Vervoeg "vóórkomen" in een hoofdzin in de tegenwoordige tijd.',
            structureFormula: '[Onderwerp] + [komt] + [bepalingen] + [voor]',
            hint: 'Formulate: "Dit type storing komt gelukkig zelden voor."'
          },
          target: 'Dit type technische storing komt gelukkig zelden voor',
          acceptedAnswers: [
            'Dit type technische storing komt gelukkig zelden voor',
            'Dit soort technische storingen komt gelukkig zelden voor',
            'Deze technische storing komt zelden voor',
            'Dit type storing komt gelukkig zelden voor in het datacenter'
          ],
          explanation: '"Vóórkomen" (occur) has stress on "vóór-" and is separable. It splits in main clauses: finite verb in position 2, "voor" at the clause end.'
        },
        {
          id: 'prefix-d-3', kind: 'prefix-verb-drill', prompt: 'Inseparable Verb: Overléggen (To Consult / Beraadslagen) in Perfect Tense',
          skills: ['production', 'grammar'],
          prefixVerbData: {
            verb: 'overleggen',
            stressPattern: 'inseparable-stressed-stem',
            stressedForm: 'over·lég·gen (onscheidbaar)',
            meaningDefinition: 'overléggen = beraadslagen, overleg plegen (to consult / discuss)',
            targetStructure: 'perfect-tense',
            contextPrompt: 'De minister heeft vanochtend langdurig beraadslaagd en overleg gevoerd met de voltallige vakbondsdelegatie. Vervoeg "overleggen" in de voltooide tijd.',
            structureFormula: '[Onderwerp] + heeft + [met bepaling] + overlegd',
            hint: 'Formulate: "De minister heeft vanochtend met de vakbonden overlegd."'
          },
          target: 'De minister heeft vanochtend met de vakbonden overlegd',
          acceptedAnswers: [
            'De minister heeft vanochtend met de vakbonden overlegd',
            'De minister heeft met de vakbonden overlegd',
            'De minister heeft vanmorgen met de vakbond overlegd',
            'De minister heeft vanochtend uitgebreid met de vakbonden overlegd'
          ],
          explanation: '"Overléggen" (consult) is inseparable. Its past participle is formed without "ge-": "heeft overlegd" (unlike separable "overgelegd" for submitting papers).'
        },
        {
          id: 'prefix-d-4', kind: 'prefix-verb-drill', prompt: 'Separable Verb: Óverleggen (To Submit Documents) with (Om...) Te',
          skills: ['production', 'grammar'],
          prefixVerbData: {
            verb: 'overleggen',
            stressPattern: 'separable-stressed-prefix',
            stressedForm: 'óver·leg·gen (scheidbaar)',
            meaningDefinition: 'óverleggen = bewijsstukken tonen, overhandigen (to submit proof / documents)',
            targetStructure: 'infinitive-te',
            contextPrompt: 'De sollicitant heeft de wettelijke plicht om een geldig getuigschrift te overhandigen aan de werkgever. Gebruik "om... over te leggen".',
            structureFormula: '[Onderwerp] is verplicht om + [document] over te leggen',
            hint: 'Formulate: "De sollicitant is verplicht om een geldig getuigschrift over te leggen."'
          },
          target: 'De sollicitant is verplicht om een geldig getuigschrift over te leggen',
          acceptedAnswers: [
            'De sollicitant is verplicht om een geldig getuigschrift over te leggen',
            'De sollicitant is verplicht om een geldig legitimatiebewijs over te leggen',
            'De kandidaat is verplicht om een geldig diploma over te leggen',
            'U bent verplicht om een geldig document over te leggen'
          ],
          explanation: '"Óverleggen" (to produce/submit documents) is separable. In an infinitive clause with "te", "te" is inserted between the prefix and stem: "over te leggen".'
        },
        {
          id: 'prefix-d-5', kind: 'prefix-verb-drill', prompt: 'Inseparable Verb: Ondergáán (To Undergo / Doorstaan) in Perfect Tense',
          skills: ['production', 'grammar'],
          prefixVerbData: {
            verb: 'ondergaan',
            stressPattern: 'inseparable-stressed-stem',
            stressedForm: 'on·der·gáán (onscheidbaar)',
            meaningDefinition: 'ondergáán = meemaken, doorstaan (to undergo / endure)',
            targetStructure: 'perfect-tense',
            contextPrompt: 'Het bedrijf heeft het afgelopen jaar een grootschalige en ingrijpende reorganisatie doorstaan. Vervoeg "ondergaan" in de voltooide tijd.',
            structureFormula: '[Onderwerp] + heeft + [lijdend voorwerp] + ondergaan',
            hint: 'Formulate: "Het bedrijf heeft een ingrijpende reorganisatie ondergaan."'
          },
          target: 'Het bedrijf heeft een ingrijpende reorganisatie ondergaan',
          acceptedAnswers: [
            'Het bedrijf heeft een ingrijpende reorganisatie ondergaan',
            'Het concern heeft een grote herstructurering ondergaan',
            'Het bedrijf heeft een grote reorganisatie ondergaan',
            'De organisatie heeft een herstructurering ondergaan'
          ],
          explanation: '"Ondergáán" (undergo) is inseparable, taking auxiliary "hebben" and no "ge-" in the participle ("heeft ondergaan"). Separable "óndergaan" (setting sun) uses "zijn" and "ondergegaan".'
        },
        {
          id: 'prefix-d-6', kind: 'prefix-verb-drill', prompt: 'Inseparable Verb: Achterhálen (To Trace / Discover) with (Om...) Te',
          skills: ['production', 'grammar'],
          prefixVerbData: {
            verb: 'achterhalen',
            stressPattern: 'inseparable-stressed-stem',
            stressedForm: 'ach·ter·há·len (onscheidbaar)',
            meaningDefinition: 'achterhálen = opsporen, de waarheid ontdekken (to trace / find out)',
            targetStructure: 'infinitive-te',
            contextPrompt: 'Het onderzoeksteam doet grondig sporenonderzoek om de precieze toedracht van het incident te ontdekken. Gebruik "om... te achterhalen".',
            structureFormula: '[Onderwerp] doet onderzoek om + [object] te achterhalen',
            hint: 'Formulate: "Het team doet onderzoek om de precieze toedracht te achterhalen."'
          },
          target: 'Het team doet onderzoek om de precieze toedracht te achterhalen',
          acceptedAnswers: [
            'Het team doet onderzoek om de precieze toedracht te achterhalen',
            'Het team doet onderzoek om de precieze oorzaak te achterhalen',
            'De recherche probeert de waarheid te achterhalen',
            'Het is belangrijk om de precieze oorzaak te achterhalen'
          ],
          explanation: '"Achterhálen" (trace/discover) is strictly inseparable. In infinitive clauses, "te" precedes the entire verb: "om de toedracht te achterhalen" (never "achter te halen").'
        },
        {
          id: 'prefix-d-7', kind: 'prefix-verb-drill', prompt: 'Inseparable Verb: Doorbréken (To Break Deadlock / Impasse)',
          skills: ['production', 'grammar'],
          prefixVerbData: {
            verb: 'doorbreken',
            stressPattern: 'inseparable-stressed-stem',
            stressedForm: 'door·bré·ken (onscheidbaar)',
            meaningDefinition: 'doorbréken = een impasse of taboe beëindigen (to break through a deadlock)',
            targetStructure: 'present-main',
            contextPrompt: 'De onafhankelijke bemiddelaar maakt een einde aan de slepende impasse tussen directie en werknemers. Vervoeg "doorbreken" in de hoofdzin.',
            structureFormula: '[Onderwerp] + [doorbreekt] + [lijdend voorwerp]',
            hint: 'Formulate: "De bemiddelaar doorbreekt de langdurige impasse."'
          },
          target: 'De bemiddelaar doorbreekt de langdurige impasse',
          acceptedAnswers: [
            'De bemiddelaar doorbreekt de langdurige impasse',
            'De bemiddelaar doorbreekt de impasse tussen beide partijen',
            'De bemiddelaar doorbreekt de impasse',
            'De voorzitter doorbreekt de impasse'
          ],
          explanation: 'Figurative "doorbréken" (deadlock/impasse) is inseparable and does not split: "De bemiddelaar doorbreekt de impasse" (unlike physical "dóórbreken", e.g. "De dijk breekt door").'
        },
        {
          id: 'prefix-d-8', kind: 'prefix-verb-drill', prompt: 'Inseparable Verb: Doorlópen (To Complete a Process / Curriculum) with (Om...) Te',
          skills: ['production', 'grammar'],
          prefixVerbData: {
            verb: 'doorlopen',
            stressPattern: 'inseparable-stressed-stem',
            stressedForm: 'door·ló·pen (onscheidbaar)',
            meaningDefinition: 'doorlópen = een opleiding of proces van begin tot eind voltooien (to complete)',
            targetStructure: 'infinitive-te',
            contextPrompt: 'Nieuwe medewerkers zijn contractueel verplicht om het complete inwerktraject van begin tot eind af te ronden. Gebruik "om... te doorlopen".',
            structureFormula: '[Onderwerp] is verplicht om + [traject] te doorlopen',
            hint: 'Formulate: "Nieuwe medewerkers zijn verplicht om het complete inwerktraject te doorlopen."'
          },
          target: 'Nieuwe medewerkers zijn verplicht om het complete inwerktraject te doorlopen',
          acceptedAnswers: [
            'Nieuwe medewerkers zijn verplicht om het complete inwerktraject te doorlopen',
            'Nieuwe medewerkers zijn verplicht om het inwerktraject te doorlopen',
            'Medewerkers zijn verplicht om de training te doorlopen',
            'Het is verplicht om het complete leertraject te doorlopen'
          ],
          explanation: '"Doorlópen" (complete education/process) is inseparable: "om het traject te doorlopen". Separable "dóórlopen" (continue walking) would be "door te lopen".'
        }
      ]
    },
    {
      id: 'personalise', title: 'Your Professional Agility & Precision', kind: 'personalise',
      intro: "Describe a situation in your work, study, or daily life where you had to prevent a problem (voorkómen), consult colleagues (overléggen), submit documents (óverleggen), undergo a transition (ondergáán), or complete a process (doorlópen).",
      exercises: [
        {
          id: 'prefix-p-1', kind: 'personalise', prompt: 'Beschrijf een situatie uit jouw werk of studie waarin je een fout moest voorkómen, documenten moest óverleggen, een proces moest doorlópen, of met iemand moest overléggen. Let goed op de scheidbaarheid en vervoeging van het werkwoord.',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['voorkomen', 'overleggen', 'ondergaan', 'doorlopen', 'achterhalen', 'doorbreken', 'onderhandelen', 'reorganisatie', 'getuigschrift', 'impasse'],
          grammar: ['scheidbare-werkwoorden', 'onscheidbare-werkwoorden', 'klemtoon-betekenis', 'deelwoordvorming', 'te-infinitief']
        }
      ]
    }
  ]
}

export const midfieldChapter: Chapter = {
  slug: 'middenveld-syntaxis-tmp',
  level: 'B2',
  title: 'Midfield Word Order & Syntactic Architecture (TMP)',
  capability: 'Master the Dutch midfield hierarchy: sequencing Time -> Manner -> Place, placing Definite Objects before TMP, positioning Indefinite Objects near the verb cluster, and correctly scoping negation with niet and geen.',
  description: 'Learn to structure complex Dutch sentences effortlessly by mastering the structural rules of the midfield (het middenveld), avoiding Anglicisms in constituent order.',
  estimatedMinutes: 18,
  stages: [
    {
      id: 'discover',
      title: 'The Architecture of the Dutch Midfield',
      kind: 'discover',
      intro: 'In Dutch main clauses, the space between the finite verb (V2) and the final verb cluster is called "het middenveld". Within this midfield, constituents follow a strict, elegant hierarchical blueprint.',
      exercises: [
        {
          id: 'midfield-ind-1',
          kind: 'induction',
          prompt: 'Observe the order of adverbial adjuncts and object placement in these authentic Dutch sentences:',
          skills: ['grammar', 'reading'],
          inductionData: {
            examples: [
              {
                prompt: 'TMP Adverbial Sequence (Time -> Manner -> Place):',
                answer: 'Ik reis [morgen (Tijd)] [met de trein (Manier)] [naar Amsterdam (Plaats)].'
              },
              {
                prompt: 'Definite Direct Object (Precedes Time and Manner):',
                answer: 'Ik heb [het rapport (Bepalend Object)] [gisteren (Tijd)] [aandachtig (Manier)] gelezen.'
              },
              {
                prompt: 'Indefinite Direct Object (Follows Time and Manner):',
                answer: 'Ik heb [gisteren (Tijd)] [met veel plezier (Manier)] [een nieuw boek (Onbepaald Object)] gelezen.'
              },
              {
                prompt: 'Negation Scope with Niet (After Definite Object, before Prepositional Phrase):',
                answer: 'Ik stuur [het document (Definite Object)] [vandaag (Tijd)] [niet (Negatie)] [naar de klant (Plaats/Prep)].'
              }
            ],
            ruleChallenge: 'What is the standard order for adverbial adjuncts and definite objects in the Dutch midfield?',
            options: [
              { text: 'Time (Tijd) -> Manner (Manier) -> Place (Plaats), with definite direct objects preceding Time and Manner.', isCorrect: true },
              { text: 'Place (Plaats) -> Manner (Manier) -> Time (Tijd), exactly like English.', isCorrect: false },
              { text: 'Manner -> Place -> Time, with all objects always placed at the very end.', isCorrect: false }
            ]
          },
          explanation: 'Dutch strictly prioritizes Time before Manner before Place (TMP). Definite objects (het/de/mijn) take priority before TMP, whereas indefinite objects (een/geen) appear after TMP.'
        }
      ]
    },
    {
      id: 'understand',
      title: 'Syntactic Blueprint & Constituent Analysis',
      kind: 'understand',
      intro: 'Analyze how Dutch native speakers construct rich, multifaceted sentences in academic and professional contexts.',
      exercises: [
        {
          id: 'midfield-und-1',
          kind: 'reading',
          prompt: 'Read this executive briefing excerpt and analyze the syntactic slots in the highlighted sentence.',
          readingContent: `Tijdens de bestuursvergadering van vanochtend heeft de directievoorzitter de financiële jaarcijfers (1: Bepalend Object) om tien uur (2: Tijd) met behulp van een interactieve presentatie (3: Manier) in de grote conferentiezaal (4: Plaats) aan alle aandeelhouders (5: Meewerkend Vw) toegelicht. 

Opmerkelijk was dat de financieel directeur over de voorgestelde begrotingswijziging gisteren (Tijd) met opzet (Manier) geen overhaaste uitspraken (Onbepaald Object) heeft gedaan. Hierdoor verliep het overleg zonder noemenswaardige frictie.`,
          wordHints: {
            'bestuursvergadering': { meaning: 'board meeting', category: 'noun' },
            'jaarcijfers': { meaning: 'annual financial figures', category: 'noun' },
            'met behulp van': { meaning: 'by means of / using', category: 'connector' },
            'begrotingswijziging': { meaning: 'budget amendment', category: 'noun' },
            'overhaaste': { meaning: 'hasty / premature', category: 'adjective' }
          },
          listeningQuestion: 'Why is "de financiële jaarcijfers" placed before "om tien uur" in the first sentence?',
          listeningOptions: [
            { text: 'Because definite direct objects (with de/het) precede adverbial time adjuncts in the Dutch midfield.', isCorrect: true },
            { text: 'Because time adjuncts are always placed at the end of the sentence.', isCorrect: false },
            { text: 'Because "de financiële jaarcijfers" is the grammatical subject.', isCorrect: false }
          ],
          explanation: 'In Dutch midfield syntax, a definite direct object ("de jaarcijfers") precedes temporal, modal/manner, and locative adjuncts.',
          skills: ['reading', 'grammar']
        }
      ]
    },
    {
      id: 'retrieve',
      title: 'Active Midfield Assembly & TMP Precision Drills',
      kind: 'retrieve',
      intro: 'Assemble the provided constituents into natural, syntactically flawless Dutch sentences following TMP and object ordering rules.',
      exercises: [
        {
          id: 'midfield-d-1',
          kind: 'midfield-drill',
          prompt: 'TMP Adverbial Sequence (Time -> Manner -> Place)',
          skills: ['production', 'grammar'],
          midfieldData: {
            focusRule: 'tmp-order',
            slots: {
              time: 'morgen',
              manner: 'met de hogesnelheidstrein',
              place: 'naar Brussel'
            },
            contextPrompt: 'Je plant een dienstreis naar het Europese hoofdkantoor. Integreer de tijd (morgen), het vervoermiddel (met de hogesnelheidstrein) en de bestemming (naar Brussel).',
            providedElements: ['Wij reizen', 'naar Brussel (Plaats)', 'morgen (Tijd)', 'met de hogesnelheidstrein (Manier)'],
            structureFormula: '[Onderwerp] + reizen + [Tijd] + [Manier] + [Plaats]',
            hint: 'Volgorde: Tijd (morgen) -> Manier (met de hogesnelheidstrein) -> Plaats (naar Brussel).'
          },
          target: 'Wij reizen morgen met de hogesnelheidstrein naar Brussel',
          acceptedAnswers: [
            'Wij reizen morgen met de hogesnelheidstrein naar Brussel',
            'We reizen morgen met de hogesnelheidstrein naar Brussel',
            'Morgen reizen wij met de hogesnelheidstrein naar Brussel',
            'Morgen reizen we met de hogesnelheidstrein naar Brussel'
          ],
          explanation: 'In the Dutch midfield, adverbial adjuncts follow strict TMP order: Tijd (morgen) -> Manier (met de hogesnelheidstrein) -> Plaats (naar Brussel).'
        },
        {
          id: 'midfield-d-2',
          kind: 'midfield-drill',
          prompt: 'Definite Direct Object Precedence (Before Time & Manner)',
          skills: ['production', 'grammar'],
          midfieldData: {
            focusRule: 'definite-vs-indefinite-object',
            slots: {
              directObject: { text: 'het vertrouwelijke contract', isDefinite: true },
              time: 'gisteren',
              manner: 'aandachtig'
            },
            contextPrompt: 'Je hebt een belangrijk juridisch document bestudeerd. Plaats het bepalend lijdend voorwerp vóór de tijd- en maniersbepaling.',
            providedElements: ['Ik heb', 'aandachtig (Manier)', 'het vertrouwelijke contract (Bepalend Object)', 'gisteren (Tijd)', 'gelezen'],
            structureFormula: '[Onderwerp] + heb + [Bepalend Object] + [Tijd] + [Manier] + gelezen',
            hint: 'Plaats "het vertrouwelijke contract" vóór "gisteren" en "aandachtig".'
          },
          target: 'Ik heb het vertrouwelijke contract gisteren aandachtig gelezen',
          acceptedAnswers: [
            'Ik heb het vertrouwelijke contract gisteren aandachtig gelezen',
            'Ik heb het contract gisteren aandachtig gelezen',
            'Ik heb het vertrouwelijke contract gisteren zorgvuldig gelezen',
            'Gisteren heb ik het vertrouwelijke contract aandachtig gelezen'
          ],
          explanation: 'Definite direct objects (preceded by het/de/dit/mijn) precede temporal and manner adjuncts in the midfield.'
        },
        {
          id: 'midfield-d-3',
          kind: 'midfield-drill',
          prompt: 'Indefinite Direct Object Placement (After Time & Manner)',
          skills: ['production', 'grammar'],
          midfieldData: {
            focusRule: 'definite-vs-indefinite-object',
            slots: {
              time: 'vorige week',
              manner: 'met veel toewijding',
              directObject: { text: 'een subsidieaanvraag', isDefinite: false }
            },
            contextPrompt: 'Een collega heeft een aanvraag ingediend voor een innovatieproject. Plaats het onbepaald lijdend voorwerp (een subsidieaanvraag) ná de tijd en manier.',
            providedElements: ['Zij heeft', 'een subsidieaanvraag (Onbepaald Object)', 'vorige week (Tijd)', 'met veel toewijding (Manier)', 'ingediend'],
            structureFormula: '[Onderwerp] + heeft + [Tijd] + [Manier] + [Onbepaald Object] + ingediend',
            hint: 'Onbepaald object (met "een") komt ná Tijd (vorige week) en Manier (met veel toewijding).'
          },
          target: 'Zij heeft vorige week met veel toewijding een subsidieaanvraag ingediend',
          acceptedAnswers: [
            'Zij heeft vorige week met veel toewijding een subsidieaanvraag ingediend',
            'Ze heeft vorige week met veel toewijding een subsidieaanvraag ingediend',
            'Vorige week heeft zij met veel toewijding een subsidieaanvraag ingediend',
            'Vorige week heeft ze met veel toewijding een subsidieaanvraag ingediend'
          ],
          explanation: 'Indefinite direct objects (preceded by "een" or numerals) appear towards the end of the midfield, following Time and Manner.'
        },
        {
          id: 'midfield-d-4',
          kind: 'midfield-drill',
          prompt: 'Indirect Object vs Direct Object Ordering (Without Preposition)',
          skills: ['production', 'grammar'],
          midfieldData: {
            focusRule: 'indirect-direct-object',
            slots: {
              indirectObject: { text: 'de commissie' },
              directObject: { text: 'het eindrapport', isDefinite: true }
            },
            contextPrompt: 'De projectleider overhandigt de documenten aan de beoordelingscommissie. Gebruik geen voorzetsel ("aan"), maar plaats het meewerkend voorwerp direct vóór het lijdend voorwerp.',
            providedElements: ['De projectleider overhandigt', 'het eindrapport (Lijdend Voorwerp)', 'de commissie (Meewerkend Voorwerp)'],
            structureFormula: '[Onderwerp] + [Persoonsvorm] + [Meewerkend Voorwerp] + [Lijdend Voorwerp]',
            hint: 'Zonder voorzetsel komt de persoon (de commissie) vóór de zaak (het eindrapport).'
          },
          target: 'De projectleider overhandigt de commissie het eindrapport',
          acceptedAnswers: [
            'De projectleider overhandigt de commissie het eindrapport',
            'De projectleider overhandigt de commissie het rapport',
            'De projectmanager overhandigt de commissie het eindrapport'
          ],
          explanation: 'In Dutch without a preposition, the Indirect Object (de commissie) precedes the Direct Object (het eindrapport).'
        },
        {
          id: 'midfield-d-5',
          kind: 'midfield-drill',
          prompt: 'Prepositional Indirect Object (With "Aan")',
          skills: ['production', 'grammar'],
          midfieldData: {
            focusRule: 'indirect-direct-object',
            slots: {
              directObject: { text: 'de kwartaalcijfers', isDefinite: true },
              time: 'vandaag',
              indirectObject: { text: 'de aandeelhouders', preposition: 'aan' }
            },
            contextPrompt: 'Het bestuur presenteert de cijfers. Wanneer het meewerkend voorwerp wordt voorafgegaan door "aan", volgt het na het lijdend voorwerp.',
            providedElements: ['De directie presenteert', 'aan de aandeelhouders (Voorzetselvoorwerp)', 'vandaag (Tijd)', 'de kwartaalcijfers (Lijdend Voorwerp)'],
            structureFormula: '[Onderwerp] + presenteert + [Lijdend Voorwerp] + [Tijd] + [aan + Meewerkend Voorwerp]',
            hint: 'Formuleer: "De directie presenteert de kwartaalcijfers vandaag aan de aandeelhouders."'
          },
          target: 'De directie presenteert de kwartaalcijfers vandaag aan de aandeelhouders',
          acceptedAnswers: [
            'De directie presenteert de kwartaalcijfers vandaag aan de aandeelhouders',
            'Het bestuur presenteert de kwartaalcijfers vandaag aan de aandeelhouders',
            'Vandaag presenteert de directie de kwartaalcijfers aan de aandeelhouders'
          ],
          explanation: 'When using preposition "aan", the prepositional phrase ("aan de aandeelhouders") is placed after the direct object at the end of the midfield.'
        },
        {
          id: 'midfield-d-6',
          kind: 'midfield-drill',
          prompt: 'Negation Scope with "Niet" (Placement in Midfield)',
          skills: ['production', 'grammar'],
          midfieldData: {
            focusRule: 'negation-placement',
            slots: {
              directObject: { text: 'de officiële documenten', isDefinite: true },
              time: 'vandaag',
              negation: 'niet',
              place: 'naar de klant'
            },
            contextPrompt: 'De accountmanager besluit om de documenten nog niet te versturen. Plaats "niet" ná het bepalend object en de tijd, maar vóór de richtingsbepaling (naar de klant).',
            providedElements: ['De accountmanager stuurt', 'naar de klant (Richting)', 'vandaag (Tijd)', 'niet (Negatie)', 'de officiële documenten (Bepalend Object)'],
            structureFormula: '[Onderwerp] + stuurt + [Bepalend Object] + [Tijd] + [niet] + [Richting/Plaats]',
            hint: 'Plaats "niet" ná "de officiële documenten vandaag", maar vóór "naar de klant".'
          },
          target: 'De accountmanager stuurt de officiële documenten vandaag niet naar de klant',
          acceptedAnswers: [
            'De accountmanager stuurt de officiële documenten vandaag niet naar de klant',
            'De accountmanager stuurt de documenten vandaag niet naar de klant',
            'Vandaag stuurt de accountmanager de officiële documenten niet naar de klant'
          ],
          explanation: '"Niet" follows definite objects and time adjuncts, but precedes prepositional phrases, direction phrases, and predicates.'
        },
        {
          id: 'midfield-d-7',
          kind: 'midfield-drill',
          prompt: 'Indefinite Negation with "Geen" (Never "Niet Een")',
          skills: ['production', 'grammar'],
          midfieldData: {
            focusRule: 'negation-placement',
            slots: {
              time: 'tijdens de controleaudit',
              directObject: { text: 'geen onregelmatigheden', isDefinite: false },
              negation: 'geen'
            },
            contextPrompt: 'De accountant heeft een grondige inspectie uitgevoerd en niets verdachts gevonden. Gebruik "geen onregelmatigheden" (niet "niet een").',
            providedElements: ['De accountant heeft', 'tijdens de controleaudit (Tijd)', 'aangetroffen', 'geen onregelmatigheden (Negatie + Object)'],
            structureFormula: '[Onderwerp] + heeft + [Tijd] + [geen + Onbepaald Object] + aangetroffen',
            hint: 'Gebruik "geen onregelmatigheden" ná de tijdsbepaling.'
          },
          target: 'De accountant heeft tijdens de controleaudit geen onregelmatigheden aangetroffen',
          acceptedAnswers: [
            'De accountant heeft tijdens de controleaudit geen onregelmatigheden aangetroffen',
            'De accountant heeft tijdens de audit geen onregelmatigheden aangetroffen',
            'Tijdens de controleaudit heeft de accountant geen onregelmatigheden aangetroffen'
          ],
          explanation: 'Dutch strictly negates indefinite direct objects with "geen" (never "niet een"), placed towards the end of the midfield.'
        },
        {
          id: 'midfield-d-8',
          kind: 'midfield-drill',
          prompt: 'Midfield Hierarchy in a Subordinate Clause (SOV Order)',
          skills: ['production', 'grammar'],
          midfieldData: {
            focusRule: 'tmp-order',
            slots: {
              time: 'morgen om negen uur',
              manner: 'met het voltallige team',
              place: 'in de grote zaal'
            },
            contextPrompt: 'Je stuurt een formele bevestigingsmail met een onderschikkende bijzin ("dat wij..."). Behoud de TMP-volgorde binnen de bijzin vóór de persoonsvorm aan het einde.',
            providedElements: ['Ik bevestig dat wij', 'in de grote zaal (Plaats)', 'morgen om negen uur (Tijd)', 'met het voltallige team (Manier)', 'vergaderen (PV)'],
            structureFormula: 'Ik bevestig dat [Onderwerp] + [Tijd] + [Manier] + [Plaats] + [vergaderen]',
            hint: 'In de bijzin volgt het middenveld dezelfde TMP-volgorde vóór het eindwerkwoord.'
          },
          target: 'Ik bevestig dat wij morgen om negen uur met het voltallige team in de grote zaal vergaderen',
          acceptedAnswers: [
            'Ik bevestig dat wij morgen om negen uur met het voltallige team in de grote zaal vergaderen',
            'Ik bevestig dat we morgen om negen uur met het voltallige team in de grote zaal vergaderen',
            'Ik bevestig dat wij morgen om 9:00 uur met het hele team in de grote zaal vergaderen',
            'Ik bevestig dat we morgen om negen uur met het team in de grote zaal vergaderen'
          ],
          explanation: 'Even in subordinate clauses with verb-final word order, the internal midfield respects the Tijd -> Manier -> Plaats hierarchy.'
        }
      ]
    },
    {
      id: 'personalise',
      title: 'Your Professional Day & Syntactic Flow',
      kind: 'personalise',
      intro: 'Describe a meeting, project, or travel plan from your work or study, integrating at least three midfield elements (e.g. Definite Object, Time, Manner, Place, or Negation with niet/geen) in flawless sequence.',
      exercises: [
        {
          id: 'midfield-p-1',
          kind: 'personalise',
          prompt: 'Beschrijf een activiteit uit jouw werk of dagelijks leven. Combineer een bepalend voorwerp (of negatie), een tijd, een manier/middel en een plaats in één vloeiende zin met de correcte volgorde.',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['rapport', 'vergadering', 'overleg', 'trein', 'kantoor', 'voorstel', 'aandachtig', 'zorgvuldig', 'bevestigen', 'toelichten'],
          grammar: ['middenveld-syntaxis', 'tmp-volgorde', 'objectplaatsing', 'negatie-scope']
        }
      ]
    }
  ]
}

export const chapters: Chapter[] = [introductionChapter, storyChapter, coffeeChapter, formalityChapter, bakeryChapter, doctorMission, talkingAboutDayChapter, a1Capstone, opinionChapter, landlordMission, hotelMission, workDiscussionMission, newsChapter, debatingWorkChapter, salaryNegotiationMission, presentationChapter, newsSummaryChapter, doubtChapter, futureSpeculationChapter, socialNuanceChapter, workplaceChapter, mediationChapter, argumentationChapter, synthesisChapter, morphingChapter, persuasionChapter, paraphrasingChapter, registerChapter, selfCorrectionChapter, circumlocutionChapter, nuanceChapter, collocationChapter, mirroringChapter, precisionChapter, inferenceChapter, understatementChapter, logicalFlowChapter, b2Capstone, erChapter, diplomacyChapter, connectionChapter, formalStyleChapter, passiveVoiceChapter, hypotheticalChapter, reportedSpeechChapter, relativeClauseChapter, infinitiveChapter, doubleInfinitiveChapter, concessionChapter, participialChapter, correlativeChapter, conditionalChapter, causalityChapter, prefixVerbChapter, midfieldChapter]

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug)
}
