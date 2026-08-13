import type { Chapter } from '~/types/learning'

export const introductionChapter: Chapter = {
  slug: 'introduceer-jezelf',
  level: 'A1',
  title: 'Introduce yourself',
  capability: 'Give basic personal details like your name, where you live, and what you do.',
  description: 'Learn the most common way to start a Dutch conversation.',
  estimatedMinutes: 8,
  stages: [
    {
      id: 'discover', title: 'Discover', kind: 'discover',
      intro: 'Dutch introductions use simple "ben" (am) and "woon" (live).',
      exercises: [{ 
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
  stages: [
    {
      id: 'discover', title: 'Discover', kind: 'discover',
      intro: 'Dutch opinions become easier to use when you have a small set of reliable openings.',
      exercises: [{ 
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

export const chapters: Chapter[] = [introductionChapter, storyChapter, coffeeChapter, formalityChapter, bakeryChapter, doctorMission, talkingAboutDayChapter, opinionChapter, landlordMission, hotelMission, workDiscussionMission, newsChapter, debatingWorkChapter, salaryNegotiationMission, presentationChapter, newsSummaryChapter, doubtChapter, futureSpeculationChapter, socialNuanceChapter, workplaceChapter, mediationChapter, argumentationChapter, synthesisChapter, paraphrasingChapter]

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug)
}