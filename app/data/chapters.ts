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
      id: 'personalise', title: 'Personalise', kind: 'personalise',
      intro: 'Now introduce yourself for real.',
      exercises: [{ 
        id: 'intro-3', kind: 'typed', prompt: 'Wie ben je en waar woon je?', 
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
      id: 'personalise', title: 'Personalise', kind: 'personalise',
      intro: 'Use the pattern to say something true for you.',
      exercises: [{ 
        id: 'personalise-1', kind: 'typed', prompt: 'Wat vind je van thuiswerken? Geef ook een reden.', 
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

export const chapters: Chapter[] = [introductionChapter, storyChapter, bakeryChapter, doctorMission, talkingAboutDayChapter, opinionChapter, landlordMission, hotelMission, workDiscussionMission, newsChapter, debatingWorkChapter]

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug)
}