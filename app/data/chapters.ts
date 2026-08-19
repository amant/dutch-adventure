import type { Chapter } from '~/types/learning';

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
              { prompt: 'Profession', answer: 'Ik ben programmeur.' },
            ],
            ruleChallenge: 'Which word connects the person to their name or job?',
            options: [
              { text: 'ben', isCorrect: true },
              { text: 'woon', isCorrect: false },
              { text: 'in', isCorrect: false },
            ],
          },
        },
        {
          id: 'intro-1', kind: 'info', prompt: 'Basic self-intro',
          context: 'Ik ben Jan. Ik woon in Amsterdam. Ik ben programmeur.',
          skills: ['recognition', 'meaning'],
          vocabulary: ['wonen', 'zijn'],
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
        placeholder: 'Ik woon...',
      }],
    },
    {
      id: 'automate', title: 'Speed Drill', kind: 'retrieve',
      intro: 'Quick! Recall these phrases.',
      exercises: [
        {
          id: 'intro-speed-1', kind: 'speed-drill', prompt: 'I am ...',
          target: 'Ik ben',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'intro-speed-2', kind: 'speed-drill', prompt: 'I live in ...',
          target: 'Ik woon in',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
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
        placeholder: 'Ik ben...',
      }],
    },
  ],
};

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
              { prompt: 'Weather', answer: 'Ik denk dat het regent.' },
            ],
            ruleChallenge: 'What happens to the verb (is, regent) in an "Ik denk dat" clause?',
            options: [
              { text: 'It stays in the second position', isCorrect: false },
              { text: 'It moves to the end of the clause', isCorrect: true },
              { text: 'It moves to the start of the clause', isCorrect: false },
            ],
          },
        },
        {
          id: 'discover-1', kind: 'info', prompt: 'Useful opinion openings',
          context: 'Ik denk dat thuiswerken handig is.\nVolgens mij is contact met collega\'s belangrijk.',
          skills: ['recognition', 'meaning'],
          vocabulary: ['denken', 'vinden'],
        }],
    },
    {
      id: 'understand', title: 'Understand', kind: 'understand',
      intro: 'Notice how omdat introduces the reason in the second part of the sentence.',
      exercises: [{
        id: 'understand-1', kind: 'info', prompt: 'Read this in context',
        context: 'A: Wat vind je van thuiswerken?\nB: Ik denk dat het handig is, omdat ik meer tijd heb.',
        skills: ['recognition', 'meaning'],
        grammar: ['omdat-clause'],
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
        placeholder: 'Type your Dutch answer...',
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
        automaticitySeconds: 20,
      }],
    },
    {
      id: 'automate', title: 'Speed Opinions', kind: 'retrieve',
      intro: 'Rapid fire opinions.',
      exercises: [
        {
          id: 'opinion-speed-1', kind: 'speed-drill', prompt: 'I think that...',
          target: 'Ik denk dat',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
          grammar: ['omdat-clause'],
        },
        {
          id: 'opinion-speed-2', kind: 'speed-drill', prompt: 'In my opinion...',
          target: 'Volgens mij',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
          grammar: ['word-order'],
        },
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
        placeholder: 'Write your own answer in Dutch...',
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
        placeholder: 'Answer in Dutch...',
      }],
    },
  ],
};

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
        vocabulary: ['last hebben van', 'voelen', 'hoofdpijn'],
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
        grammar: ['omdat-clause'],
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
        vocabulary: ['hoofdpijn'],
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
        grammar: ['omdat-clause', 'word-order'],
      }],
    },
    {
      id: 'personalise', title: 'The Mission', kind: 'personalise',
      intro: 'The receptionist asks: "Wat is er aan de hand?" (What is the matter?).',
      exercises: [{
        id: 'doc-5', kind: 'typed', prompt: 'Explain your problem and ask for an appointment.',
        target: 'Ik heb last van mijn rug, ik wil graag een afspraak maken.',
        missionGoals: [
          { id: 'explain', label: 'Explain the problem', keywords: ['last', 'pijn', 'heb'] },
          { id: 'request', label: 'Ask for appointment', keywords: ['afspraak', 'maken', 'wil'] },
        ],
        explanation: 'State your problem and clearly ask for the appointment.',
        skills: ['production', 'speaking', 'automaticity'],
        vocabulary: ['last hebben van', 'afspraak'],
        grammar: ['word-order'],
        placeholder: 'Ik heb last van...',
      }],
    },
  ],
};

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
        vocabulary: ['begrijpen', 'eens zijn', 'hoewel'],
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
          { text: 'Five days', isCorrect: false },
        ],
        transcript: 'We willen dat iedereen weer drie dagen per week naar kantoor komt, voor de teamgeest.',
        translation: 'We want everyone to come back to the office three days a week, for the team spirit.',
        skills: ['listening', 'meaning'],
        vocabulary: ['teamgeest'],
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
        vocabulary: ['eens zijn'],
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
        grammar: ['word-order'],
      }],
    },
  ],
};

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
          gaat: { meaning: 'goes', category: 'verb' },
          koopt: { meaning: 'buys', category: 'verb' },
          kaartje: { meaning: 'ticket', category: 'noun' },
          trein: { meaning: 'train', category: 'noun' },
          drinkt: { meaning: 'drinks', category: 'verb' },
          eet: { meaning: 'eats', category: 'verb' },
          broodje: { meaning: 'sandwich', category: 'noun' },
        },
        skills: ['recognition', 'meaning'],
        vocabulary: ['trein', 'kaartje', 'broodje'],
      }],
    },
  ],
};

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
          'aan te pakken': { meaning: 'to tackle / to address', category: 'verb phrase' },
        },
        skills: ['recognition', 'meaning'],
        vocabulary: ['regering', 'voorstel', 'ingediend', 'hervormen'],
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
        automaticitySeconds: 10,
      }],
    },
  ],
};

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
        vocabulary: ['tevreden', 'vies', 'verwarming'],
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
        grammar: ['omdat-clause'],
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
        vocabulary: ['andere'],
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
          { id: 'solution', label: 'Propose a solution', keywords: ['korting', 'andere', 'ontbijt', 'schoonmaken'] },
        ],
        explanation: 'Propose a solution like a discount or cleaning the room immediately.',
        skills: ['speaking', 'production', 'automaticity'],
        grammar: ['word-order'],
        vocabulary: ['oplossing', 'korting'],
      }],
    },
  ],
};

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
        vocabulary: ['opstaan', 'schoonmaken'],
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
        grammar: ['separable-verbs'],
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
        grammar: ['perfect-tense'],
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
        grammar: ['perfect-tense', 'separable-verbs'],
      }],
    },
  ],
};

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
        grammar: ['omdat-clause', 'want-clause'],
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
        grammar: ['want-clause'],
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
        vocabulary: ['tegenargument'],
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
        placeholder: 'Geachte directie, volgens mij...',
      }],
    },
  ],
};

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
        vocabulary: ['volkorenbrood', 'krentenbollen'],
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
        automaticitySeconds: 20,
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
        grammar: ['word-order'],
      }],
    },
  ],
};

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
          'doet het niet': { meaning: 'doesn\'t work', category: 'phrase' },
        },
        skills: ['recognition', 'meaning'],
        vocabulary: ['verwarming'],
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
          { id: 'urgency', label: 'Stress the urgency', keywords: ['vandaag', 'snel', 'weekend', 'nu'] },
        ],
        aiPersonality: { isDifficult: true, style: 'colloquial', pushbackProbability: 0.6 },
        skills: ['speaking', 'production'],
        vocabulary: ['verwarming', 'repareren'],
        grammar: ['omdat-clause'],
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
        vocabulary: ['loodgieter', 'afspraak'],
      }],
    },
  ],
};

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
        vocabulary: ['koffie', 'thee', 'melk', 'suiker'],
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
        placeholder: 'Een koffie...',
      }],
    },
    {
      id: 'personalise', title: 'Your Order', kind: 'personalise',
      intro: 'What do you usually drink?',
      exercises: [{
        id: 'coffee-3', kind: 'personalise', prompt: 'Wat wilt u drinken?',
        skills: ['production', 'speaking'],
        vocabulary: ['koffie', 'thee', 'melk', 'suiker'],
        placeholder: 'Ik wil graag...',
      }],
    },
  ],
};

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
          verhoging: { meaning: 'increase/raise', category: 'noun' },
          passend: { meaning: 'appropriate', category: 'adj' },
          prestaties: { meaning: 'achievements', category: 'noun' },
        },
        skills: ['recognition', 'meaning'],
        vocabulary: ['verhoging', 'prestaties'],
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
        grammar: ['conditional'],
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
        grammar: ['hoewel', 'omdat-clause'],
      }],
    },
  ],
};

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
        grammar: ['formal-v-informal'],
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
        grammar: ['formal-v-informal'],
      }],
    },
    {
      id: 'automate', title: 'Speed Switching', kind: 'retrieve',
      intro: 'Quickly produce the correct form.',
      exercises: [
        {
          id: 'formal-3', kind: 'speed-drill', prompt: 'Your book (formal)',
          target: 'Uw boek',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
          grammar: ['formal-v-informal'],
        },
        {
          id: 'formal-4', kind: 'speed-drill', prompt: 'How are you? (informal)',
          target: 'Hoe gaat het met je?',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
          grammar: ['formal-v-informal'],
        },
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
        grammar: ['formal-v-informal'],
      }],
    },
  ],
};

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
          duurzame: { meaning: 'sustainable', category: 'adj' },
          schetsen: { meaning: 'to sketch/outline', category: 'verb' },
        },
        skills: ['recognition', 'meaning'],
        vocabulary: ['duurzaam', 'schetsen'],
      }],
    },
    {
      id: 'automate', title: 'Rapid Summarizing', kind: 'retrieve',
      intro: 'Translate these linking words fast.',
      exercises: [
        {
          id: 'pres-2', kind: 'speed-drill', prompt: 'In conclusion',
          target: 'Tot slot',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
          vocabulary: ['tot slot'],
        },
        {
          id: 'pres-3', kind: 'speed-drill', prompt: 'On the other hand',
          target: 'Aan de andere kant',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
          vocabulary: ['aan de andere kant'],
        },
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
        vocabulary: ['project', 'doel', 'resultaat'],
      }],
    },
  ],
};

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
          { text: 'It will take too long', isCorrect: false },
        ],
        transcript: 'A: Heb je het voorstel van de regering over duurzame energie gelezen?\nB: Ja, hoewel het ambitieus klinkt, beweren critici dat de kosten te hoog zijn.\nA: Dat klopt, maar voorstanders wijzen op de noodzaak van klimaatactie.\nB: Aan de andere kant moeten we ook denken aan de burgers met een laag inkomen.',
        skills: ['listening', 'recognition'],
        vocabulary: ['voorstel', 'duurzaam', 'hoewel', 'beweren', 'kosten', 'echter'],
        grammar: ['subordinate clauses'],
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
        skills: ['production', 'writing'],
      }],
    },
  ],
};

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
        vocabulary: ['zeker', 'waarschijnlijk', 'misschien'],
      }],
    },
    {
      id: 'automate', title: 'Fast Retrieval', kind: 'retrieve',
      intro: 'Quickly produce the correct adverb.',
      exercises: [
        {
          id: 'doubt-2', kind: 'speed-drill', prompt: 'Probably',
          target: 'Waarschijnlijk',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
          vocabulary: ['waarschijnlijk'],
        },
        {
          id: 'doubt-3', kind: 'speed-drill', prompt: 'Maybe',
          target: 'Misschien',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
          vocabulary: ['misschien'],
        },
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
        target: 'Volgend weekend ga ik waarschijnlijk naar Amsterdam, maar misschien blijf ik thuis.',
      }],
    },
  ],
};

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
        vocabulary: ['zullen', 'zou', 'waarschijnlijk', 'hypothetisch'],
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
          vocabulary: ['waarschijnlijk', 'warm'],
        },
        {
          id: 'spec-3', kind: 'typed', prompt: 'I would like to stay home.',
          target: 'Ik zou graag thuis willen blijven',
          skills: ['production', 'grammar'],
          grammar: ['conditional'],
          vocabulary: ['thuis', 'blijven'],
        },
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
          grammar: ['conditional'],
        },
      ],
    },
    {
      id: 'mission', title: 'The Future Discussion', kind: 'personalise',
      intro: 'A colleague asks about the future of the company.',
      exercises: [{
        id: 'spec-5', kind: 'conversation', prompt: 'Hoe zie jij de toekomst van ons bedrijf?',
        missionGoals: [
          { id: 'future', label: 'Predict a change', keywords: ['zal', 'zullen', 'veranderen', 'groeien'] },
          { id: 'hypothetical', label: 'Use a hypothetical', keywords: ['zou', 'stel', 'denk'] },
        ],
        context: 'Speculate about two things that might happen in the next 5 years. Use "zal" or "zullen".',
        vocabulary: ['toekomst', 'bedrijf', 'veranderen', 'groeien'],
        grammar: ['future tense'],
        skills: ['speaking', 'production'],
        aiPersonality: { isDifficult: true, style: 'colloquial', pushbackProbability: 0.8 },
        simulatorResponse: 'Interessant. Maar denk je echt dat we zo snel zullen groeien?',
      }],
    },
  ],
};

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
        vocabulary: ['even', 'hoor', 'eigenlijk', 'toch'],
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
              explanation: 'Technically correct but a bit abrupt for a formal meeting.',
            },
            {
              text: 'Mag ik even iets vragen?',
              context: 'Natural/Polite',
              isBest: true,
              explanation: 'The use of "mag" and "even" makes this a polite, professional interruption.',
            },
            {
              text: 'Hé, luister naar mij!',
              context: 'Inappropriate',
              isBest: false,
              explanation: 'Way too aggressive for a Dutch work environment!',
            },
          ],
        },
      ],
    },
    {
      id: 'retrieve', title: 'The Natural Response', kind: 'retrieve',
      intro: 'Try to make these sentences sound more Dutch.',
      exercises: [
        {
          id: 'sn-2', kind: 'typed', prompt: 'Wait a second.',
          target: 'Wacht even',
          skills: ['production', 'grammar'],
          vocabulary: ['wacht', 'even'],
        },
        {
          id: 'sn-3', kind: 'typed', prompt: 'I am coming, really.',
          target: 'Ik kom eraan hoor',
          skills: ['production', 'grammar'],
          vocabulary: ['komen', 'hoor'],
        },
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
          skills: ['production', 'grammar'],
        },
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
        simulatorResponse: 'Geen probleem! Wil je dan misschien wat fris?',
      }],
    },
  ],
};

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
            helaas: { meaning: 'unfortunately', category: 'adverb' },
            vertraging: { meaning: 'delay', category: 'noun' },
            opgelopen: { meaning: 'encountered / incurred', category: 'verb' },
            ontwikkelen: { meaning: 'to develop', category: 'verb' },
          },
        },
      ],
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
          grammar: ['inversion'],
        },
      ],
    },
    {
      id: 'mission', title: 'The Status Update', kind: 'personalise',
      intro: 'A manager asks for an update on the delay. Be professional and propose a solution.',
      exercises: [{
        id: 'work-mission-1',
        kind: 'conversation',
        prompt: 'Explain the situation to Jan.',
        context: 'Your manager, Jan, is waiting for an update.',
        simulatorResponse: 'Ik begrijp het, maar wanneer verwacht je dat het project nu klaar is?',
        skills: ['speaking', 'interaction'],
        missionGoals: [
          { id: 'apology', label: 'Explain the situation professionally', keywords: ['helaas', 'vertraging', 'probleem'] },
          { id: 'solution', label: 'Propose a timeline', keywords: ['volgende week', 'klaar', 'afgerond'] },
        ],
      }],
    },
  ],
};

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
            onderhoudswerkzaamheden: { meaning: 'maintenance works', category: 'noun' },
            afgesloten: { meaning: 'closed off', category: 'adjective' },
            elders: { meaning: 'elsewhere', category: 'adverb' },
            gedurende: { meaning: 'during', category: 'preposition' },
          },
          skills: ['reading', 'recognition'],
        },
      ],
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
            content: 'Kerkstraat closed from Aug 21 to Aug 25 for major maintenance. No traffic allowed. Park elsewhere.',
          },
          mediationPoints: [
            { id: 'start', label: 'When it starts (Aug 21)', keywords: ['21', 'maandag', 'augustus'] },
            { id: 'end', label: 'When it ends (Aug 25)', keywords: ['25', 'vrijdag'] },
            { id: 'what', label: 'What is happening (Roadworks/Closed)', keywords: ['werkzaamheden', 'dicht', 'afgesloten', 'onderhoud'] },
            { id: 'parking', label: 'Parking instructions', keywords: ['parkeren', 'auto', 'elders'] },
          ],
          skills: ['production', 'flexibility'],
          vocabulary: ['werkzaamheden', 'afgesloten', 'parkeren'],
        },
      ],
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
          grammar: ['subordinate-clauses'],
        },
      ],
    },
  ],
};

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
          skills: ['recognition', 'meaning'],
        },
      ],
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
            { text: 'Immers', isCorrect: false },
          ],
          skills: ['production', 'coherence'],
          explanation: '"Daarentegen" introduces a contrasting point, which fits perfectly here.',
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
            { text: 'Toch', isCorrect: false },
          ],
          skills: ['production', 'coherence'],
          explanation: '"Derhalve" is a formal way to say "therefore" or "consequently".',
        },
      ],
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
          vocabulary: ['productiviteit', 'balans', 'besparen'],
        },
      ],
    },
  ],
};

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
          skills: ['recognition', 'meaning'],
        },
      ],
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
          explanation: 'Remember that "hoewel" triggers the verb-at-the-end order, and "ben gegaan" is the correct past tense for motion.',
        },
        {
          id: 'syn-3',
          kind: 'recombination-drill',
          prompt: 'Say that you summarized the report because it was too long.',
          context: 'Use: "Omdat" and "Samengevat".',
          requiredWords: ['Omdat', 'samengevat'],
          skills: ['production', 'automaticity', 'coherence'],
          correction: 'Ik heb het rapport samengevat omdat het te lang was.',
          explanation: 'Combine the past tense "heb samengevat" with the "omdat" subordinate clause.',
        },
      ],
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
          vocabulary: ['overleggen'],
        },
      ],
    },
  ],
};

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
          skills: ['recognition', 'meaning'],
        },
      ],
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
          explanation: 'Remember that "want" is a coordinating conjunction, so it doesn\'t change the word order of the following clause.',
        },
        {
          id: 'para-3',
          kind: 'flexibility',
          prompt: 'Rewrite using "Ondanks" (Despite): Hoewel het regende, ging hij wandelen.',
          forbiddenWords: ['hoewel'],
          requiredWords: ['ondanks'],
          target: 'Ondanks de regen ging hij wandelen.',
          skills: ['production', 'automaticity', 'pragmatic'],
          explanation: '"Ondanks" is a preposition and usually takes a noun phrase.',
        },
      ],
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
          explanation: '"Van mening zijn dat" is a more formal and professional way to express an opinion.',
        },
      ],
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
          grammar: ['subordinate-clauses', 'word-order'],
        },
      ],
    },
  ],
};

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
          skills: ['recognition', 'meaning'],
        },
      ],
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
          idioms: ['Met de deur in huis vallen'],
        },
      ],
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
            { level: 'formal', prompt: 'Asking the department director.', target: 'Zou het schikken als ik vandaag iets eerder vertrek?' },
          ],
        },
      ],
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
            { id: 'goal-polite', label: 'Use "zou" or "graag"', keywords: ['zou', 'graag'] },
          ],
        },
      ],
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
            { id: 'switch-je', label: 'Switch to informal after requested', keywords: ['je', 'jij', 'jou', 'jouw'], setRegister: 'informal' },
          ],
        },
      ],
    },
  ],
};

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
        skills: ['recognition', 'grammar'],
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
            { segment: 'Ik heb naar huis gegaan', correction: 'Ik ben naar huis gegaan', explanation: 'Movement verbs like "gaan" use "zijn".' },
          ],
        },
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
          automaticitySeconds: 20,
        },
        {
          id: 'correct-4', kind: 'transformation', prompt: 'Repair: Morgen we gaan naar zee.',
          target: 'Morgen gaan we naar zee.',
          skills: ['production', 'automaticity'],
          grammar: ['word-order'],
          automaticitySeconds: 20,
        },
      ],
    },
    {
      id: 'personalise', title: 'The Mirror', kind: 'personalise',
      intro: 'Write 3 sentences about your week, but deliberately include one mistake, then correct it yourself.',
      exercises: [{
        id: 'correct-5', kind: 'challenge', prompt: 'Describe your week and perform a self-correction.',
        skills: ['writing', 'pragmatic'],
        vocabulary: ['gisteren', 'omdat', 'gegaan'],
        explanation: 'Show that you can identify a word order or auxiliary verb error and fix it.',
      }],
    },
  ],
};

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
        skills: ['recognition', 'pragmatic'],
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
            requiredKeywords: ['recht', 'anderen', 'zien'],
          },
        },
        {
          id: 'circ-3', kind: 'circumlocution', prompt: 'Describe "Duurzaamheid"',
          skills: ['production', 'speaking', 'pragmatic'],
          forbiddenWords: ['duurzaam', 'milieu', 'natuur', 'groen'],
          minimumLength: 40,
          circumlocutionData: {
            concept: 'Sustainability',
            requiredKeywords: ['toekomst', 'lang', 'gebruiken'],
          },
        },
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
          requiredWords: ['interessant'],
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Own Gap', kind: 'personalise',
      intro: 'Think of a word you often struggle with in Dutch. Describe it now without using the word itself.',
      exercises: [{
        id: 'circ-5', kind: 'challenge', prompt: 'Describe a difficult concept from your professional or personal life.',
        skills: ['writing', 'production'],
        explanation: 'Focus on explaining the purpose, function, or feeling associated with the concept.',
      }],
    },
  ],
};

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
        skills: ['recognition', 'pragmatic'],
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
        },
      ],
    },
    {
      id: 'personalise', title: 'Daily Softening', kind: 'personalise',
      intro: 'Think of a typical request you make at work or at home. Try to say it now with at least two particles.',
      exercises: [{
        id: 'nuance-4', kind: 'challenge', prompt: 'Ask someone to help you with a task using natural Dutch.',
        skills: ['writing', 'production', 'pragmatic'],
      }],
    },
  ],
};

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
        skills: ['recognition'],
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
        },
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
          requiredWords: ['doen'],
        },
      ],
    },
  ],
};

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
            { id: 'bakery', label: 'Order two croissants', keywords: ['twee', 'croissants', 'alstublieft', 'graag'] },
          ],
          aiPersonality: { style: 'helpful' },
        },
      ],
    },
  ],
};

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
            { id: 'difficult', label: 'Handle a pushback on your experience', keywords: ['toch', 'daarentegen', 'namelijk', 'mening'] },
          ],
          aiPersonality: { isDifficult: true, style: 'colloquial', pushbackProbability: 0.8 },
        },
      ],
    },
  ],
};

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
          context: 'Kunt u wachten?',
          target: 'Kunt u even wachten?',
          explanation: 'Adding "even" makes the request much more natural and less demanding.',
          skills: ['production', 'pragmatic'],
        },
        {
          id: 'mir-2', kind: 'mirroring',
          prompt: 'A friend asks if you are coming. Confirm you are.',
          context: 'Ja, ik kom.',
          target: 'Ja, ik kom eraan hoor!',
          explanation: 'Using "eraan" and "hoor" adds a layer of natural reassurance and flow.',
          skills: ['production', 'pragmatic'],
        },
      ],
    },
  ],
};

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
          vocabulary: ['herinneren', 'vergissen', 'voelen'],
        },
      ],
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
          vocabulary: ['uitstekend'],
        },
        {
          id: 'prec-2', kind: 'precision-drill',
          prompt: 'Ik heb een groot probleem.',
          context: 'groot -> aanzienlijk',
          target: 'Ik heb een aanzienlijk probleem.',
          skills: ['production', 'flexibility'],
          vocabulary: ['aanzienlijk'],
        },
      ],
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
          vocabulary: ['wachten op'],
        },
        {
          id: 'prep-2', kind: 'typed', prompt: 'Say: I am interested in this job.',
          target: 'Ik ben geïnteresseerd in deze baan.',
          explanation: 'Geïnteresseerd always goes with "in".',
          skills: ['production', 'meaning'],
          vocabulary: ['geïnteresseerd in'],
        },
      ],
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
            { id: 'prep', label: 'Use a fixed preposition', keywords: ['trots op', 'rekenen op', 'wachten op'] },
          ],
          aiPersonality: { style: 'professional', isDifficult: false },
        },
      ],
    },
  ],
};

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
          skills: ['recognition', 'pragmatic'],
        },
        {
          id: 'inf-2', kind: 'inference-challenge',
          prompt: 'Zou je dat nou wel doen?',
          context: 'The speaker is curious about your plans:false|The speaker thinks your plan is a bad idea:true|The speaker wants to join you:false',
          explanation: 'The word "nou" combined with "zou je dat wel doen" is a common way to express doubt or subtle disapproval without being overly aggressive.',
          skills: ['recognition', 'pragmatic'],
        },
      ],
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
          skills: ['recognition', 'pragmatic'],
        },
      ],
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
          skills: ['production', 'pragmatic'],
        },
      ],
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
            { id: 'ask', label: 'Ask for clarification', keywords: ['wat bedoel je', 'waarom'] },
          ],
          aiPersonality: { style: 'professional', isDifficult: true },
        },
      ],
    },
  ],
};

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
                hint: 'Remember: "omdat" sends the verb to the end!',
              },
              {
                instruction: 'Change the reason to: "because I am tired" (omdat ik moe ben)',
                target: 'Ik blijf thuis omdat ik moe ben.',
              },
              {
                instruction: 'Change the subject to "Jan" (and adapt the verbs!)',
                target: 'Jan blijft thuis omdat hij moe is.',
              },
              {
                instruction: 'Change the time to "yesterday" (gisteren) and use the past tense.',
                target: 'Gisteren bleef Jan thuis omdat hij moe was.',
                hint: 'Careful with inversion: Gisteren bleef Jan...',
              },
            ],
          },
        },
      ],
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
                target: 'Het plan is goed als we meer tijd hebben.',
              },
              {
                instruction: 'Change it to: "although we have little time" (hoewel we weinig tijd hebben)',
                target: 'Het plan is goed hoewel we weinig tijd hebben.',
                hint: 'Hoewel is a subordinate conjunction - verb at the end!',
              },
              {
                instruction: 'Add a professional softener: "I think that..." (Ik denk dat...)',
                target: 'Ik denk dat het plan goed is hoewel we weinig tijd hebben.',
                hint: 'Now both clauses have "verb-at-end" order!',
              },
              {
                instruction: 'Switch to a more formal "In my opinion" (Naar mijn mening...)',
                target: 'Naar mijn mening is het plan goed hoewel we weinig tijd hebben.',
                hint: 'Inversion after "Naar mijn mening"!',
              },
            ],
          },
        },
      ],
    },
  ],
};

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
            answers: ['daarentegen', 'derhalve'],
          },
          transcript: 'Het plan is ambitieus, daarentegen zijn er risico\'s. We moeten derhalve voorzichtig zijn.',
          translation: 'The plan is ambitious, on the other hand there are risks. We must therefore be careful.',
        },
      ],
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
              { id: 'summary', label: 'Conclusion', prompt: 'Kunt u uw belangrijkste argumenten nog eens kort samenvatten?' },
            ],
            requiredConnectors: ['bovendien', 'daarentegen', 'immers', 'derhalve', 'enerzijds', 'anderzijds'],
          },
          aiPersonality: {
            style: 'helpful',
            isDifficult: true,
            pushbackProbability: 0.8,
          },
          missionGoals: [
            { id: 'goal-1', label: 'State position clearly', keywords: ['ik vind', 'naar mijn mening', 'volgens mij'] },
            { id: 'goal-2', label: 'Use at least 3 connectors', keywords: ['bovendien', 'daarentegen', 'immers', 'derhalve'] },
            { id: 'goal-3', label: 'Summarize arguments', keywords: ['kortom', 'samenvattend', 'concluderend'] },
          ],
        },
      ],
    },
  ],
};

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
          skills: ['recognition', 'pragmatic'],
        },
      ],
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
          skills: ['production', 'pragmatic'],
        },
        {
          id: 'under-3', kind: 'understatement-drill',
          prompt: 'You just ate at a high-end restaurant.',
          context: 'The food was fantastic!',
          target: 'Het eten was niet slecht.',
          explanation: '"Niet slecht" is high praise in Dutch context.',
          skills: ['production', 'pragmatic'],
        },
      ],
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
          placeholder: 'Het valt...',
        },
      ],
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
            { id: 'under-goal', label: 'Use an understatement', keywords: ['niet verkeerd', 'niet slecht', 'valt wel mee'] },
          ],
        },
      ],
    },
  ],
};

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
          skills: ['recognition', 'coherence'],
        },
      ],
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
            'In de eerste plaats zorgt thuiswerken voor een betere balans tussen werk en privé.',
          ],
          target: 'In de eerste plaats zorgt thuiswerken voor een betere balans tussen werk en privé. Bovendien bespaart het werknemers veel tijd omdat ze niet hoeven te reizen. Daarnaast is het beter voor het milieu door de afname van het verkeer. Kortom, thuiswerken heeft zowel persoonlijke als ecologische voordelen.',
          explanation: 'Start with the main point (In de eerste plaats), add supporting points (Bovendien, Daarnaast), and finish with a summary (Kortom).',
          skills: ['coherence', 'meaning'],
        },
      ],
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
            { text: 'Kortom', isCorrect: false },
          ],
          target: 'Daarentegen',
          explanation: '"Daarentegen" (On the other hand) is perfect for introducing a contrasting viewpoint.',
          skills: ['coherence', 'production'],
        },
      ],
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
            { id: 'flow-goal-1', label: 'Use at least two logical connectors', keywords: ['daarnaast', 'bovendien', 'echter', 'kortom', 'daarom'] },
          ],
        },
      ],
    },
  ],
};

export const erChapter: Chapter = {
  slug: 'het-woordje-er',
  level: 'B2',
  title: 'The Little Word \'Er\'',
  capability: 'Use \'er\' correctly in all four of its functions and master Dutch position verbs.',
  description: 'One of the biggest hurdles for Dutch learners. Move beyond \'zijn\' and master the structural heart of the language.',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'discover', title: 'Discover', kind: 'discover',
      intro: 'Dutch often avoids using \'zijn\' (to be) for objects. Instead, we use position verbs + \'er\'.',
      exercises: [
        {
          id: 'er-induction', kind: 'induction', prompt: 'Notice the position verbs',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'A glass on the table', answer: 'Er staat een glas op tafel.' },
              { prompt: 'A book on the floor', answer: 'Er ligt een boek op de grond.' },
              { prompt: 'A coat on the rack', answer: 'Er hangt een jas aan de kapstok.' },
              { prompt: 'A cat on the chair', answer: 'Er zit een kat op de stoel.' },
            ],
            ruleChallenge: 'Which verb would you use for a laptop on a desk?',
            options: [
              { text: 'staat', isCorrect: true },
              { text: 'ligt', isCorrect: false },
              { text: 'hangt', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'understand', title: 'The 4 Roles of Er', kind: 'understand',
      intro: '\'Er\' isn\'t just one word; it has four distinct jobs in a sentence.',
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
              { text: 'Subjective', isCorrect: false, function: 'subjective' },
            ],
            explanation: 'Here \'er\' replaces \'in Amsterdam\' (a place).',
          },
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
              { text: 'Subjective', isCorrect: false, function: 'subjective' },
            ],
            explanation: 'When you have a number without a noun, you need \'er\' to mean \'of them\'.',
          },
        },
      ],
    },
    {
      id: 'retrieve', title: 'Position Retrieval', kind: 'retrieve',
      intro: 'Now try to use the correct position verb with \'er\'.',
      exercises: [
        {
          id: 'er-pos-1', kind: 'typed', prompt: 'There is a bottle on the table.',
          context: 'Use: fles / tafel',
          target: 'Er staat een fles op tafel.',
          skills: ['production', 'grammar'],
          vocabulary: ['fles', 'tafel', 'staan'],
        },
        {
          id: 'er-pos-2', kind: 'typed', prompt: 'There are three people in the room.',
          context: 'Use: mensen / kamer',
          target: 'Er zitten drie mensen in de kamer.',
          skills: ['production', 'grammar'],
          vocabulary: ['mensen', 'zitten'],
        },
      ],
    },
    {
      id: 'transform', title: 'Transforming with Er', kind: 'transform',
      intro: 'Combine \'er\' with prepositions (er + op = erop).',
      exercises: [
        {
          id: 'er-prep-1', kind: 'transformation', prompt: 'Ik reken op je hulp. -> Ik reken ...',
          target: 'Ik reken erop.',
          skills: ['grammar', 'production'],
          explanation: 'In Dutch, we don\'t say \'op het\', we say \'erop\'.',
        },
      ],
    },
    {
      id: 'personalise', title: 'Real World Er', kind: 'personalise',
      intro: 'Talk about your own environment using \'er\' and position verbs.',
      exercises: [
        {
          id: 'er-pers-1', kind: 'personalise', prompt: 'Wat staat er op dit moment op je bureau?',
          skills: ['production', 'speaking', 'grammar'],
          vocabulary: ['staan', 'liggen', 'bureau'],
          grammar: ['er'],
        },
      ],
    },
  ],
};

export const diplomacyChapter: Chapter = {
  slug: 'diplomatie-en-professionaliteit',
  level: 'B2',
  title: 'Diplomacy & Professionalism',
  capability: 'Navigate delicate professional situations using \'soft\' Dutch to maintain relationships.',
  description: 'Learn how to deliver bad news, disagree with a manager, or point out errors without being blunt.',
  estimatedMinutes: 18,
  stages: [
    {
      id: 'discover', title: 'The Power of Softeners', kind: 'discover',
      intro: 'In Dutch, we use specific words to distance ourselves from a direct statement. This is called \'verzachten\'.',
      exercises: [
        {
          id: 'soft-induction', kind: 'induction', prompt: 'Notice the difference',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'Blunt', answer: 'Dat kan niet.' },
              { prompt: 'Diplomatic', answer: 'Dat zou misschien niet helemaal mogelijk zijn.' },
            ],
            ruleChallenge: 'Which word makes the sentence hypothetical and therefore softer?',
            options: [
              { text: 'zou', isCorrect: true },
              { text: 'niet', isCorrect: false },
              { text: 'dat', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'understand', title: 'Identifying Softeners', kind: 'understand',
      intro: 'Look for words like \'eigenlijk\', \'misschien\', \'eventueel\', and \'zou\'.',
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
              { text: 'They are asking for your permission to look at it.', isCorrect: false, explanation: 'No, they have already looked and are giving feedback.' },
            ],
          },
        },
      ],
    },
    {
      id: 'reframe', title: 'The Reframe Challenge', kind: 'transform',
      intro: 'Now try to transform blunt statements into professional ones.',
      exercises: [
        {
          id: 'reframe-1', kind: 'reframing-drill', prompt: 'Tell your manager the deadline is impossible.',
          skills: ['production', 'pragmatic', 'grammar'],
          reframingData: {
            bluntSentence: 'De deadline is onmogelijk.',
            softeningElements: ['misschien', 'zou', 'lastig', 'eventueel'],
            targetContext: 'Meeting with Department Head',
          },
          correction: 'Het zou misschien lastig kunnen worden om de deadline te halen.',
          explanation: 'Using \'zou kunnen worden\' and \'lastig\' instead of \'onmogelijk\' sounds much more professional.',
        },
        {
          id: 'reframe-2', kind: 'reframing-drill', prompt: 'Tell a colleague they made a mistake.',
          skills: ['production', 'pragmatic', 'grammar'],
          reframingData: {
            bluntSentence: 'Je hebt een fout gemaakt.',
            softeningElements: ['lijkt erop', 'klein', 'misschien', 'ingeslopen'],
            targetContext: 'Peer Review',
          },
          correction: 'Het lijkt erop dat er misschien een klein foutje is ingeslopen.',
          explanation: 'Phrasing it as \'er is een foutje ingeslopen\' (a mistake has crept in) removes the direct blame from the person.',
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Diplomacy', kind: 'personalise',
      intro: 'Think of a time you had to be diplomatic at work. How would you say it in Dutch?',
      exercises: [
        {
          id: 'dip-pers-1', kind: 'personalise', prompt: 'Hoe zou je op een vriendelijke manier zeggen dat je het niet eens bent met een voorstel?',
          skills: ['production', 'speaking', 'pragmatic'],
          vocabulary: ['voorstel', 'eens', 'mening'],
          grammar: ['zou'],
        },
      ],
    },
  ],
};

export const connectionChapter: Chapter = {
  slug: 'ideeen-verbinden',
  level: 'B1',
  title: 'Connecting Objects & Ideas',
  capability: 'Use pronominal adverbs to speak fluidly and avoid repeating nouns.',
  description: 'Master the merge of prepositions and references like \'ermee\', \'daarvoor\', and \'waarnaar\'.',
  estimatedMinutes: 15,
  stages: [
    {
      id: 'discover', title: 'The Pronominal Merge', kind: 'discover',
      intro: 'In Dutch, we don\'t like saying \'preposition + it/that\'. We merge them into one word.',
      exercises: [
        {
          id: 'pro-ind-1', kind: 'induction', prompt: 'Notice the pattern',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'Blunt', answer: 'Ik praat met het.' },
              { prompt: 'Natural', answer: 'Ik praat ermee.' },
            ],
            ruleChallenge: 'What happens to "met" when it merges with "er"?',
            options: [
              { text: 'It stays the same', isCorrect: false },
              { text: 'It changes to "mee"', isCorrect: true },
              { text: 'It disappears', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'drill', title: 'Build the Connection', kind: 'transform',
      intro: 'Try merging these common combinations.',
      exercises: [
        {
          id: 'pro-d-1', kind: 'pronominal-drill', prompt: 'Combine "op" and "het".',
          skills: ['production', 'grammar'],
          pronominalData: {
            sentence: 'Ik wacht op het.',
            preposition: 'op',
            object: 'het',
          },
          target: 'erop',
          explanation: 'Op + het becomes erop.',
        },
        {
          id: 'pro-d-2', kind: 'pronominal-drill', prompt: 'Combine "met" and "dat".',
          skills: ['production', 'grammar'],
          pronominalData: {
            sentence: 'Ik ben klaar met dat.',
            preposition: 'met',
            object: 'dat',
          },
          target: 'daarmee',
          explanation: 'Met + dat becomes daarmee (met shifts to mee).',
        },
      ],
    },
    {
      id: 'retrieve', title: 'Relative Connections', kind: 'retrieve',
      intro: 'Use \'waar\' to connect two sentences.',
      exercises: [
        {
          id: 'pro-r-1', kind: 'typed', prompt: 'The book I am waiting for... (Het boek ... ik op wacht)',
          skills: ['production', 'grammar'],
          target: 'waarop',
          explanation: 'Use "waarop" to relate to the book.',
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Connections', kind: 'personalise',
      intro: 'Think of something you are working on or waiting for. Use a pronominal adverb.',
      exercises: [
        {
          id: 'pro-p-1', kind: 'personalise', prompt: 'Waar ben je op dit moment mee bezig? (Gebruik "ermee" of "daarmee")',
          skills: ['production', 'speaking', 'grammar'],
          vocabulary: ['bezig', 'project', 'werk'],
          grammar: ['pronominal-adverbs'],
        },
      ],
    },
  ],
};

export const formalStyleChapter: Chapter = {
  slug: 'formeel-nederlands-en-nominalisatie',
  level: 'B2',
  title: 'Formal Style & Nominalisation',
  capability: 'Transform informal verbal expressions into professional noun-based constructions.',
  description: 'Learn to sound more academic and professional by using nominalisations and the passive voice.',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'Verbal vs Nominal', kind: 'discover',
      intro: 'In formal Dutch, we often prefer nouns over verbs to sound more objective.',
      exercises: [
        {
          id: 'nom-ind-1', kind: 'induction', prompt: 'Notice the shift',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'Verbal (B1)', answer: 'Omdat de prijzen stijgen...' },
              { prompt: 'Nominal (B2)', answer: 'Door de stijging van de prijzen...' },
            ],
            ruleChallenge: 'Which word is the nominalisation of "stijgen"?',
            options: [
              { text: 'stijgend', isCorrect: false },
              { text: 'de stijging', isCorrect: true },
              { text: 'gestegen', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'drill', title: 'Transform to Formal', kind: 'transform',
      intro: 'Rewrite these sentences using a nominal construction.',
      exercises: [
        {
          id: 'nom-d-1', kind: 'nominalisation-drill', prompt: 'Nominalise "de prijzen stijgen"',
          skills: ['production', 'grammar'],
          nominalisationData: {
            verbalSentence: 'De prijzen stijgen snel.',
            targetNoun: 'stijging',
          },
          target: 'De snelle stijging van de prijzen',
          explanation: 'Use "De [adjective] stijging van [noun]" to formalise the thought.',
        },
        {
          id: 'nom-d-2', kind: 'nominalisation-drill', prompt: 'Nominalise "het bedrijf breidt uit"',
          skills: ['production', 'grammar'],
          nominalisationData: {
            verbalSentence: 'Het bedrijf breidt internationaal uit.',
            targetNoun: 'uitbreiding',
          },
          target: 'De internationale uitbreiding van het bedrijf',
          explanation: 'Uitbreiden becomes "de uitbreiding".',
        },
      ],
    },
    {
      id: 'personalise', title: 'Professional Report', kind: 'personalise',
      intro: 'Write a short formal observation about a trend in your work or study.',
      exercises: [
        {
          id: 'nom-p-1', kind: 'personalise', prompt: 'Beschrijf een recente verandering op je werk in formele taal (gebruik nominalisatie).',
          skills: ['production', 'writing', 'pragmatic'],
          vocabulary: ['ontwikkeling', 'verandering', 'toename', 'afname'],
          grammar: ['nominalisation'],
        },
      ],
    },
  ],
};

export const passiveVoiceChapter: Chapter = {
  slug: 'de-lijdende-vorm',
  level: 'B2',
  title: 'The Passive Voice & Objectivity',
  capability: 'Use the passive voice to describe processes and sound more objective.',
  description: 'Learn when and how to use \'worden\' and \'zijn\' in passive constructions, including the impersonal \'Er-passive\'.',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'Process vs Result', kind: 'discover',
      intro: 'Dutch uses \'worden\' for a process in progress, and \'zijn\' for the result.',
      exercises: [
        {
          id: 'pass-ind-1', kind: 'induction', prompt: 'Notice the difference',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'Active', answer: 'De man schildert de deur.' },
              { prompt: 'Passive (Process)', answer: 'De deur wordt geschilderd.' },
              { prompt: 'Passive (Result)', answer: 'De deur is geschilderd.' },
            ],
            ruleChallenge: 'Which auxiliary is used for a process happening now?',
            options: [
              { text: 'zijn', isCorrect: false },
              { text: 'hebben', isCorrect: false },
              { text: 'worden', isCorrect: true },
            ],
          },
        },
      ],
    },
    {
      id: 'drill', title: 'Passive Transformations', kind: 'transform',
      intro: 'Transform these active sentences into passive ones.',
      exercises: [
        {
          id: 'pass-d-1', kind: 'passive-drill', prompt: 'Focus on the process',
          skills: ['production', 'grammar'],
          passiveData: {
            activeSentence: 'De directie neemt morgen een besluit.',
            focus: 'process',
            agent: 'de directie',
          },
          target: 'Er wordt morgen een besluit genomen door de directie',
          explanation: 'Use "wordt ... genomen" for the process.',
        },
        {
          id: 'pass-d-2', kind: 'passive-drill', prompt: 'Use the impersonal "Er" passive',
          skills: ['production', 'grammar'],
          passiveData: {
            activeSentence: 'Mensen praten veel over het nieuwe project.',
            focus: 'er-passive',
          },
          target: 'Er wordt veel over het nieuwe project gepraat',
          explanation: 'When the subject is general ("mensen"), start with "Er wordt".',
        },
      ],
    },
    {
      id: 'personalise', title: 'Reporting a Change', kind: 'personalise',
      intro: 'Describe a process at your work or school using the passive voice.',
      exercises: [
        {
          id: 'pass-p-1', kind: 'personalise', prompt: 'Beschrijf iets dat momenteel op je werk wordt veranderd of verbeterd.',
          skills: ['production', 'writing', 'pragmatic'],
          vocabulary: ['verbeteren', 'organiseren', 'beslissen', 'uitvoeren'],
          grammar: ['passive-voice'],
        },
      ],
    },
  ],
};

export const hypotheticalChapter: Chapter = {
  slug: 'hypothetische-scenario-s',
  level: 'B2',
  title: 'Hypotheticals & Unreal Conditions',
  capability: 'Speculate about unreal or unlikely situations in the present and past.',
  description: 'Master the use of \'had\', \'was\', and \'zou\' to express regrets, wishes, and hypothetical scenarios.',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'Unreal Present', kind: 'discover',
      intro: 'To talk about a hypothetical present, use \'had\' (had), \'was\' (were), or \'zou\' (would).',
      exercises: [
        {
          id: 'hypo-ind-1', kind: 'induction', prompt: 'Notice the pattern',
          skills: ['recognition'],
          inductionData: {
            examples: [
              { prompt: 'Fact', answer: 'Ik heb geen geld. Ik koop geen auto.' },
              { prompt: 'Hypothetical', answer: 'Als ik geld had, zou ik een auto kopen.' },
            ],
            ruleChallenge: 'Which word is preferred in the "if" (als) clause for a hypothetical?',
            options: [
              { text: 'zou hebben', isCorrect: false },
              { text: 'had', isCorrect: true },
              { text: 'heb', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'morph', title: 'Sentence Evolution', kind: 'transform',
      intro: 'Evolve these sentences from simple facts into complex hypotheticals.',
      exercises: [
        {
          id: 'hypo-m-1', kind: 'morphing-drill', prompt: 'Evolve the regret',
          skills: ['production', 'grammar'],
          morphingData: {
            baseSentence: 'Ik werk veel. Ik ben moe.',
            steps: [
              {
                instruction: 'Turn it into a hypothetical present (If I worked less, I wouldn\'t be tired).',
                target: 'Als ik minder werkte, zou ik niet moe zijn',
              },
              {
                instruction: 'Now turn it into a past regret (If I had worked less, I wouldn\'t have been tired).',
                target: 'Als ik minder had gewerkt, zou ik niet moe zijn geweest',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Own Regrets', kind: 'personalise',
      intro: 'Describe a real-world situation you\'d like to change using \'als... had...\'.',
      exercises: [
        {
          id: 'hypo-p-1', kind: 'personalise', prompt: 'Wat zou je anders hebben gedaan als je vorig jaar meer tijd had gehad?',
          skills: ['production', 'speaking', 'pragmatic'],
          vocabulary: ['tijd', 'anders', 'gedaan', 'gekozen'],
          grammar: ['conditional-past'],
        },
      ],
    },
  ],
};

export const reportedSpeechChapter: Chapter = {
  slug: 'indirecte-rede',
  level: 'B2',
  title: 'Reported Speech & Indirect Discourse',
  capability: 'Accurately report what colleagues, clients, or news sources stated or asked.',
  description: 'Master indirect speech (indirecte rede) in Dutch: embedding statements with \'dat\', yes/no questions with \'of\', and moving verbs to the end of the clause.',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'Direct vs Indirect', kind: 'discover',
      intro: 'When reporting someone else\'s words in Dutch, the sentence transforms into a subclause.',
      exercises: [
        {
          id: 'rep-ind-1', kind: 'induction', prompt: 'Notice the word order',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'Direct', answer: 'De manager zegt: "Ik heb nu geen tijd."' },
              { prompt: 'Indirect', answer: 'De manager zegt dat hij nu geen tijd heeft.' },
            ],
            ruleChallenge: 'What happens to the verb "heeft" when transformed into reported speech with "dat"?',
            options: [
              { text: 'It moves to the end of the subclause', isCorrect: true },
              { text: 'It stays in second position', isCorrect: false },
              { text: 'It turns into an infinitive', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'understand', title: 'Interpreting Reports', kind: 'understand',
      intro: 'Look at how indirect questions and statements communicate nuance in professional settings.',
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
              { text: 'The client demanded an immediate delivery.', isCorrect: false, explanation: 'Incorrect. "Vroeg of" reports a question, not a demand.' },
            ],
          },
        },
      ],
    },
    {
      id: 'transform', title: 'Reporting Statements & Questions', kind: 'transform',
      intro: 'Transform these direct statements and questions into professional reported speech.',
      exercises: [
        {
          id: 'rep-d-1', kind: 'reported-speech-drill', prompt: 'Report the statement to your team',
          skills: ['production', 'grammar'],
          reportedSpeechData: {
            directQuote: 'Het project loopt volgens schema.',
            speaker: 'De directeur',
            reportingClause: 'De directeur liet weten dat...',
            quoteType: 'statement',
            hint: 'Verbs move to the end after "dat".',
          },
          target: 'De directeur liet weten dat het project volgens schema loopt',
          acceptedAnswers: [
            'De directeur liet weten dat het project volgens schema liep',
            'dat het project volgens schema loopt',
            'dat het project volgens schema liep',
          ],
          explanation: 'In indirect speech with "dat", the conjugated verb "loopt" moves to the end of the clause.',
        },
        {
          id: 'rep-d-2', kind: 'reported-speech-drill', prompt: 'Report the question asked during the meeting',
          skills: ['production', 'grammar'],
          reportedSpeechData: {
            directQuote: 'Is er al een besluit genomen?',
            speaker: 'De klant',
            reportingClause: 'De klant vroeg...',
            quoteType: 'question',
            hint: 'Use "of" for yes/no questions, not "als".',
          },
          target: 'De klant vroeg of er al een besluit genomen is',
          acceptedAnswers: [
            'De klant vroeg of er al een besluit is genomen',
            'De klant vroeg of er al een besluit genomen was',
            'De klant vroeg of er al een besluit was genomen',
            'of er al een besluit genomen is',
            'of er al een besluit is genomen',
          ],
          explanation: 'For yes/no questions, use "of" and place all verbs ("genomen is" / "is genomen") at the end.',
        },
        {
          id: 'rep-d-3', kind: 'reported-speech-drill', prompt: 'Report what the client wants to know',
          skills: ['production', 'grammar'],
          reportedSpeechData: {
            directQuote: 'Wanneer kunnen we de offerte verwachten?',
            speaker: 'De opdrachtgever',
            reportingClause: 'De opdrachtgever vraagt...',
            quoteType: 'question',
            hint: 'Keep the question word "wanneer" as the conjunction.',
          },
          target: 'De opdrachtgever vraagt wanneer ze de offerte kunnen verwachten',
          acceptedAnswers: [
            'De opdrachtgever vraagt wanneer we de offerte kunnen verwachten',
            'De opdrachtgever vraagt wanneer zij de offerte kunnen verwachten',
            'wanneer ze de offerte kunnen verwachten',
            'wanneer we de offerte kunnen verwachten',
          ],
          explanation: 'When reporting a question with a question word ("wanneer"), the question word introduces the subclause and verbs go to the end.',
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Meeting Summary', kind: 'personalise',
      intro: 'Report something a colleague or manager said in a recent meeting or chat.',
      exercises: [
        {
          id: 'rep-p-1', kind: 'personalise', prompt: 'Wat heeft een collega of vriend onlangs tegen je gezegd? Rapporteer het met "Hij/Zij zei dat..." of "Hij/Zij vroeg of...".',
          skills: ['production', 'speaking', 'pragmatic'],
          vocabulary: ['beweren', 'aangeven', 'vragen', 'vertellen'],
          grammar: ['indirecte-rede'],
        },
      ],
    },
  ],
};

export const relativeClauseChapter: Chapter = {
  slug: 'betrekkelijke-bijzinnen',
  level: 'B2',
  title: 'Relative Clauses & Antecedents',
  capability: 'Form elegant complex sentences by accurately embedding relative clauses using die, dat, wie, waar+prep, and wat.',
  description: 'Master Dutch relative clauses (betrekkelijke bijzinnen): distinguish die vs dat, person prepositions (met wie) vs pronominal relatives (waarmee), general antecedents (alles wat), and maintain subordinate word order.',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'Antecedents & Relative Pronouns', kind: 'discover',
      intro: 'A relative clause provides extra information about an antecedent (noun, person, or entire phrase).',
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
              { prompt: 'Hele zin / Alles', answer: 'Hij haalde de deadline, wat iedereen verbaasde.' },
            ],
            ruleChallenge: 'Which relative pronoun is used after indefinite words like "alles" or "iets"?',
            options: [
              { text: 'wat', isCorrect: true },
              { text: 'dat', isCorrect: false },
              { text: 'die', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'understand', title: 'Contextual Inferences', kind: 'understand',
      intro: 'Examine how relative clauses convey precise qualifications in professional contexts.',
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
              { text: 'The supplier refused to deliver the software.', isCorrect: false, explanation: 'Incorrect. The supplier is currently delivering the software.' },
            ],
          },
        },
      ],
    },
    {
      id: 'transform', title: 'Combining Sentences', kind: 'transform',
      intro: 'Combine the two statements into one fluent sentence with a relative clause.',
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
            hint: 'Use "dat" and move all verbs to the end of the relative clause.',
          },
          target: 'Het rapport dat we gisteren hebben ontvangen, bevat belangrijke aanbevelingen',
          acceptedAnswers: [
            'Het rapport dat we gisteren hebben ontvangen bevat belangrijke aanbevelingen',
            'Het rapport dat we gisteren ontvingen, bevat belangrijke aanbevelingen',
            'Het rapport dat we gisteren ontvingen bevat belangrijke aanbevelingen',
            'Het rapport dat we gisteren hebben gekregen, bevat belangrijke aanbevelingen',
            'Het rapport dat we gisteren kregen, bevat belangrijke aanbevelingen',
          ],
          explanation: 'Since "rapport" is a het-word, use "dat", and move the verbs ("hebben ontvangen") to the end of the embedded clause.',
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
            hint: 'For people with a preposition, use "voorzetsel + wie" (met wie).',
          },
          target: 'De projectleider met wie ik nauw samenwerk, is vandaag afwezig',
          acceptedAnswers: [
            'De projectleider met wie ik nauw samenwerk is vandaag afwezig',
            'De projectleider waar ik nauw mee samenwerk, is vandaag afwezig',
            'De projectleider waar ik nauw mee samenwerk is vandaag afwezig',
          ],
          explanation: 'When referring to a person with a preposition, formal Dutch uses "[voorzetsel] wie" (e.g. "met wie").',
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
            hint: 'For inanimate objects with a preposition, combine into "waar + voorzetsel" (waarmee).',
          },
          target: 'Er zijn verschillende factoren waarmee we absoluut rekening moeten houden',
          acceptedAnswers: [
            'Er zijn verschillende factoren waar we absoluut rekening mee moeten houden',
            'Er zijn verschillende factoren waarmee we rekening moeten houden',
            'Er zijn verscheidene factoren waarmee we absoluut rekening moeten houden',
          ],
          explanation: 'For inanimate things + prepositions, use a pronominal relative adverb like "waarmee" or split "waar ... mee".',
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
            hint: 'When referring to an entire preceding clause or fact, use "wat".',
          },
          target: 'De directeur heeft onverwacht ontslag genomen, wat iedereen erg verbaast',
          acceptedAnswers: [
            'De directeur heeft onverwacht ontslag genomen wat iedereen erg verbaast',
            'De directeur heeft onverwacht ontslag genomen, wat iedereen verbaast',
            'De directeur heeft onverwacht ontslag genomen, hetgeen iedereen erg verbaast',
          ],
          explanation: 'When the antecedent is an entire sentence or action, use "wat" (or formal "hetgeen").',
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Personal Connections', kind: 'personalise',
      intro: 'Describe a project, colleague, or system using a relative clause.',
      exercises: [
        {
          id: 'rel-p-1', kind: 'personalise', prompt: 'Beschrijf een project, collega of applicatie waar je trots op bent met een betrekkelijke bijzin (gebruik "die", "dat", "met wie" of "waarmee").',
          skills: ['production', 'speaking', 'pragmatic'],
          vocabulary: ['project', 'collega', 'applicatie', 'ervaring', 'samenwerken'],
          grammar: ['betrekkelijke-bijzinnen'],
        },
      ],
    },
  ],
};

export const infinitiveChapter: Chapter = {
  slug: 'om-te-infinitief',
  level: 'B2',
  title: 'Infinitive Clauses & \'Te\' Mastery',
  capability: 'Construct complex infinitive clauses with om... te, master separable verbs with te (op te lossen), and use semi-auxiliaries (hoeven te, blijken te).',
  description: 'Master Dutch infinitive constructions: purpose clauses (om... te), adjective triggers (het is essentieel om... te), separable verb infixation (in te voeren, voor te bereiden), and semi-auxiliaries (hoeven niet te, blijken te).',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'The Mechanics of "Te" & "Om te"', kind: 'discover',
      intro: 'Infinitive clauses allow you to link actions concisely without repeating the subject.',
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
              { prompt: 'Modal verb (geen te)', answer: 'We moeten morgen overleggen.' },
            ],
            ruleChallenge: 'Where is "te" placed when using a separable verb like "voorbereiden" in an infinitive clause?',
            options: [
              { text: 'Between the prefix and stem (voor te bereiden)', isCorrect: true },
              { text: 'Before the whole verb (om te voorbereiden)', isCorrect: false },
              { text: 'After the verb (voorbereiden te)', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'understand', title: 'Contextual Inferences & Obligation', kind: 'understand',
      intro: 'Examine how semi-auxiliary verbs with \'te\' express subtle distinctions in policy and requirements.',
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
              { text: 'The deadline is mandatory and fixed for Friday morning.', isCorrect: false, explanation: 'Incorrect. "Niet hoeven" explicitly removes the strict requirement.' },
            ],
          },
        },
      ],
    },
    {
      id: 'transform', title: 'Infinitive Constructions', kind: 'transform',
      intro: 'Form precise infinitive clauses using (om...) te and proper separable verb splitting.',
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
            hint: 'Use "om ... op te lossen". Notice how "te" splits the separable verb.',
          },
          target: 'Het team heeft direct een extra vergadering gepland om de ontstane problemen op te lossen',
          acceptedAnswers: [
            'Het team heeft direct een extra vergadering gepland om de ontstane problemen op te lossen',
            'Het team heeft een extra vergadering gepland om de ontstane problemen op te lossen',
            'Het team heeft direct een extra vergadering georganiseerd om de ontstane problemen op te lossen',
          ],
          explanation: 'In Dutch infinitive clauses, separable verbs insert "te" between the prefix and the stem: "op te lossen".',
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
            hint: 'Evaluation adjectives take "om ... in te voeren".',
          },
          target: 'Het is van cruciaal belang voor onze organisatie om deze nieuwe veiligheidsmaatregelen zorgvuldig in te voeren',
          acceptedAnswers: [
            'Het is van cruciaal belang voor onze organisatie om deze nieuwe veiligheidsmaatregelen zorgvuldig in te voeren',
            'Het is van cruciaal belang om deze nieuwe veiligheidsmaatregelen zorgvuldig in te voeren',
            'Het is voor onze organisatie van cruciaal belang om deze nieuwe veiligheidsmaatregelen zorgvuldig in te voeren',
          ],
          explanation: 'After evaluation phrases like "het is van belang", use "om ... in te voeren".',
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
            hint: 'Semi-auxiliary "hoeven niet/geen" takes "te" (here: "voor te bereiden") without "om".',
          },
          target: 'U hoeft voor de informele bijeenkomst van morgen geen formele presentatie voor te bereiden',
          acceptedAnswers: [
            'U hoeft voor de informele bijeenkomst van morgen geen formele presentatie voor te bereiden',
            'Voor de informele bijeenkomst van morgen hoeft u geen formele presentatie voor te bereiden',
            'Je hoeft voor de informele bijeenkomst van morgen geen formele presentatie voor te bereiden',
            'Voor de informele bijeenkomst van morgen hoef je geen formele presentatie voor te bereiden',
          ],
          explanation: '"Hoeven" takes "te" before the infinitive ("voor te bereiden") without the conjunction "om".',
        },
        {
          id: 'inf-d-4', kind: 'infinitive-drill', prompt: 'Express decision with fixed verb "besluiten"',
          skills: ['production', 'grammar'],
          infinitiveData: {
            mainClause: 'De directie heeft na lang beraad besloten.',
            infinitiveAction: 'het verouderde systeem volledig vervangen',
            constructionType: 'fixed-verb-te',
            verb: 'vervangen',
            hint: 'Use "om ... volledig te vervangen".',
          },
          target: 'De directie heeft na lang beraad besloten om het verouderde systeem volledig te vervangen',
          acceptedAnswers: [
            'De directie heeft na lang beraad besloten om het verouderde systeem volledig te vervangen',
            'De directie heeft na lang beraad besloten het verouderde systeem volledig te vervangen',
            'De directie heeft besloten om het verouderde systeem volledig te vervangen',
          ],
          explanation: 'Verbs of decision like "besluiten" take an infinitive clause with (om...) te.',
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Professional Objectives', kind: 'personalise',
      intro: 'Describe an objective or policy at your workplace using an infinitive construction.',
      exercises: [
        {
          id: 'inf-p-1', kind: 'personalise', prompt: 'Beschrijf een doel of verandering op je werk met een "om... te"-constructie en een scheidbaar werkwoord (bijv. "oplossen", "voorbereiden", "uitvoeren", "aanpakken").',
          skills: ['production', 'speaking', 'pragmatic'],
          vocabulary: ['doel', 'belangrijk', 'oplossen', 'voorbereiden', 'uitvoeren', 'aanpakken'],
          grammar: ['om-te-infinitief', 'scheidbare-werkwoorden'],
        },
      ],
    },
  ],
};

export const doubleInfinitiveChapter: Chapter = {
  slug: 'dubbele-infinitief-ipp',
  level: 'B2',
  title: 'Verb Clusters & Double Infinitive (IPP)',
  capability: 'Master compound tenses with modals, causative \'laten\', perception verbs, and \'leren/helpen\' using the double infinitive rule (IPP) and correct verb cluster word order.',
  description: 'Learn the Infinitivus Pro Participio (IPP) rule: in Dutch compound tenses (voltooide tijd), when a modal (moeten/kunnen), causative (laten), perception (zien/horen), or instruction verb (leren/helpen) governs another verb, the past participle is replaced by the infinitive form.',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'The Double Infinitive Rule (IPP)', kind: 'discover',
      intro: 'In Dutch, a participle turns into an infinitive whenever it is accompanied by another infinitive in compound tenses.',
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
              { prompt: 'Instruction "leren" + Action', answer: 'Hij heeft me leren programmeren.' },
            ],
            ruleChallenge: 'Why does "gewild" change to "willen" in "Ik heb het niet willen doen"?',
            options: [
              { text: 'Because "willen" governs the action verb "doen", triggering the double infinitive (IPP) rule.', isCorrect: true },
              { text: 'Because "willen" can never have a past participle in Dutch.', isCorrect: false },
              { text: 'Because the sentence contains a negation ("niet").', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'understand', title: 'Contextual Inferences & Nuance', kind: 'understand',
      intro: 'Observe how causative \'laten\' and modal clusters express delegation and operational constraints in Dutch professional life.',
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
              { text: 'Management refused to allow consultants to look at the audit.', isCorrect: false, explanation: 'Incorrect. "Laten" here signifies commissioning/authorizing.' },
            ],
          },
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
              { text: 'The server migration was completed ahead of schedule.', isCorrect: false, explanation: 'Incorrect. It was delayed by two weeks.' },
            ],
          },
        },
      ],
    },
    {
      id: 'transform', title: 'Double Infinitive Production Drills', kind: 'transform',
      intro: 'Construct accurate compound tense sentences using the double infinitive across modals, causatives, perception, and subclauses.',
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
            hint: 'Auxiliary in position 2, double infinitive at the end: "We hebben ... moeten wachten".',
          },
          target: 'We hebben gisteren drie uur op onze vlucht moeten wachten',
          acceptedAnswers: [
            'We hebben gisteren drie uur op onze vlucht moeten wachten',
            'We hebben gisteren drie uur moeten wachten op onze vlucht',
            'Gisteren hebben we drie uur op onze vlucht moeten wachten',
            'Gisteren hebben we drie uur moeten wachten op onze vlucht',
          ],
          explanation: 'In Dutch compound tenses with modals, use the double infinitive "moeten wachten" (not "gemoeten wachten").',
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
            hint: 'Use "heeft laten renoveren" for having something renovated.',
          },
          target: 'Het bedrijf heeft de complete kantoorruimte grondig laten renoveren',
          acceptedAnswers: [
            'Het bedrijf heeft de complete kantoorruimte grondig laten renoveren',
            'Het bedrijf heeft het kantoor laten renoveren',
            'De directie heeft de kantoorruimte laten renoveren',
            'Het bedrijf heeft de kantoorruimte grondig laten renoveren',
          ],
          explanation: 'Causative "laten" takes the double infinitive "laten renoveren" (never "gelaten renoveren").',
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
            hint: 'Use "heeft me leren programmeren" without the "ge-" prefix on leren.',
          },
          target: 'Mijn senior collega heeft me in korte tijd professioneel leren programmeren',
          acceptedAnswers: [
            'Mijn senior collega heeft me in korte tijd professioneel leren programmeren',
            'Mijn collega heeft me leren programmeren',
            'Mijn senior collega heeft me leren programmeren',
          ],
          explanation: 'When "leren" or "helpen" governs an action verb, it turns into an infinitive: "leren programmeren".',
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
            hint: 'Subclause word order: place the entire cluster "hebben horen aankomen" at the very end.',
          },
          target: 'We waren opgelucht omdat we de laatste trein in de verte hebben horen aankomen',
          acceptedAnswers: [
            'We waren opgelucht omdat we de laatste trein in de verte hebben horen aankomen',
            'We waren opgelucht omdat we de trein hebben horen aankomen',
            'We waren erg opgelucht omdat we de laatste trein hebben horen aankomen',
          ],
          explanation: 'In subclauses with perception verbs, the verb cluster "hebben horen aankomen" sits at the end of the clause.',
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
            hint: 'Use past subjunctive/pluperfect: "hadden kunnen afronden".',
          },
          target: 'We hadden het project gemakkelijk op tijd kunnen afronden',
          acceptedAnswers: [
            'We hadden het project gemakkelijk op tijd kunnen afronden',
            'We hadden het project op tijd kunnen afronden',
            'We hadden het werk gemakkelijk op tijd kunnen afronden',
          ],
          explanation: 'For hypothetical past possibilities, combine "hadden" with the double infinitive "kunnen afronden".',
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Real-World Verb Clusters', kind: 'personalise',
      intro: 'Share a personal or professional experience where you had to do something, had something done, or learned a new capability.',
      exercises: [
        {
          id: 'ipp-p-1', kind: 'personalise', prompt: 'Vertel over een situatie op je werk of in je privéleven waarin je iets hebt moeten regelen, laten repareren of leren gebruiken (gebruik een dubbele infinitief zoals "hebben moeten...", "laten...", of "leren...").',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['regelen', 'repareren', 'leren', 'moeten', 'laten', 'ervaring', 'oplossen'],
          grammar: ['dubbele-infinitief', 'werkwoordclusters'],
        },
      ],
    },
  ],
};

export const concessionChapter: Chapter = {
  slug: 'toegevende-verbanden-contrast',
  level: 'B2',
  title: 'Concessive Clauses & Contrast Mastery',
  capability: 'Formulate complex contrasts and concessions using \'hoewel\', \'ondanks (dat)\', verb-first \'al\', correlative \'hoe... ook\', and \'weliswaar... maar\' with native word order.',
  description: 'Master the full spectrum of Dutch concessive discourse: subordinating conjunctions (\'hoewel\', \'ofschoon\', \'ondanks dat\'), prepositional noun phrases (\'ondanks\'), verb-first inversion with \'al\', correlative frames (\'hoe... ook\'), and coordinate contrast (\'weliswaar... maar\').',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'The Spectrum of Dutch Concession', kind: 'discover',
      intro: 'Compare how Dutch expresses concessions through conjunctions, prepositions, verb-first inversion, and correlative pairs.',
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
              { prompt: 'Coordinate contrast "weliswaar... maar"', answer: 'Het regende weliswaar hard, maar we gingen toch wandelen.' },
            ],
            ruleChallenge: 'What is the grammatical difference between "ondanks" and "ondanks dat"?',
            options: [
              { text: '"Ondanks" is a preposition that takes a noun phrase, while "ondanks dat" is a conjunction that introduces a full clause with a conjugated verb.', isCorrect: true },
              { text: '"Ondanks" is only used for positive situations, whereas "ondanks dat" is for negative situations.', isCorrect: false },
              { text: '"Ondanks" can only appear at the end of a sentence.', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'understand', title: 'Nuance & Inferences in Concessive Speech', kind: 'understand',
      intro: 'Observe how Dutch professionals and organizations use subtle concessive phrasing to balance risks, costs, and strategic decisions.',
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
              { text: 'The company expects immediate cost savings in the first quarter.', isCorrect: false, explanation: 'Incorrect. Upfront costs are higher, and returns are expected "op termijn" (over time).' },
            ],
          },
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
              { text: 'Shareholders have fully endorsed the board\'s acquisition strategy.', isCorrect: false, explanation: 'Incorrect. The shareholders expressed serious doubts ("ernstige twijfels geuit").' },
            ],
          },
        },
      ],
    },
    {
      id: 'transform', title: 'Concessive Clause Production Drills', kind: 'transform',
      intro: 'Construct fluent concessive sentences using \'hoewel\', \'ondanks (dat)\', verb-first \'al\', \'hoe... ook\', and \'weliswaar... maar\'.',
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
            hint: 'Subclause word order after "hoewel", then inverted order in the main clause.',
          },
          target: 'Hoewel de grondstoffenprijzen sterk zijn gestegen, heeft het bedrijf zijn winstmarges weten te handhaven',
          acceptedAnswers: [
            'Hoewel de grondstoffenprijzen sterk zijn gestegen, heeft het bedrijf zijn winstmarges weten te handhaven',
            'Hoewel de grondstoffenprijzen sterk zijn gestegen, heeft het bedrijf zijn winstmarges behouden',
            'Hoewel de prijzen sterk zijn gestegen, heeft het bedrijf zijn marges weten te behouden',
            'Hoewel de grondstoffenprijzen het afgelopen kwartaal sterk zijn gestegen, heeft het bedrijf zijn winstmarges weten te handhaven',
          ],
          explanation: '"Hoewel" introduces a subordinate clause (verb-final: "gestegen zijn" or "zijn gestegen"), followed by an inverted main clause ("heeft het bedrijf...").',
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
            hint: 'Use "ondanks" directly with the noun phrase "de ernstige verkeershinder" (no "dat", no verb in the opening phrase).',
          },
          target: 'Ondanks de ernstige verkeershinder arriveerde de directrice keurig op tijd voor de opening van het congres',
          acceptedAnswers: [
            'Ondanks de ernstige verkeershinder arriveerde de directrice keurig op tijd voor de opening van het congres',
            'Ondanks de ernstige verkeershinder was de directrice keurig op tijd voor de opening',
            'Ondanks de verkeershinder arriveerde de directrice op tijd voor het congres',
            'Ondanks de ernstige verkeershinder kwam de directrice keurig op tijd aan voor de opening',
          ],
          explanation: '"Ondanks" is a preposition requiring a noun phrase ("de ernstige verkeershinder") followed by the main clause verb ("arriveerde").',
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
            hint: 'Start with "Al brengt het implementatietraject...", followed by the main clause.',
          },
          target: 'Al brengt het traject aanzienlijke risico\'s met zich mee, we zetten het project met volle overtuiging voort',
          acceptedAnswers: [
            'Al brengt het traject aanzienlijke risico\'s met zich mee, we zetten het project met volle overtuiging voort',
            'Al brengt het implementatietraject aanzienlijke risico\'s met zich mee, we zetten het project met volle overtuiging voort',
            'Al brengt het traject risico\'s met zich mee, we zetten het project vol overtuiging voort',
            'Al brengt het implementatietraject aanzienlijke risico\'s met zich mee, toch zetten we het project voort',
          ],
          explanation: 'When starting with concessive "al", place the conjugated verb immediately after "al" (verb-first inversion: "Al brengt...").',
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
            hint: 'Use "Hoe moeizaam de onderhandelingen ook verliepen, ..." with "ook" before the verb.',
          },
          target: 'Hoe moeizaam de onderhandelingen ook verliepen, de partijen wisten uiteindelijk een compromis te bereiken',
          acceptedAnswers: [
            'Hoe moeizaam de onderhandelingen ook verliepen, de partijen wisten uiteindelijk een compromis te bereiken',
            'Hoe moeizaam de onderhandelingen ook verliepen, de delegaties wisten uiteindelijk een compromis te bereiken',
            'Hoe moeizaam het ook verliep, de partijen wisten uiteindelijk een compromis te bereiken',
          ],
          explanation: 'The correlative frame "Hoe [adjectief] ... ook" requires placing "ook" before the subclause verb, followed by the main clause.',
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
            hint: 'Place "weliswaar" after the finite verb in the first clause and connect with ", maar".',
          },
          target: 'Het nieuwe softwarepakket is weliswaar bijzonder krachtig, maar de interface vergt nog enige gewenning',
          acceptedAnswers: [
            'Het nieuwe softwarepakket is weliswaar bijzonder krachtig, maar de interface vergt nog enige gewenning',
            'De software is weliswaar bijzonder krachtig, maar de interface vergt nog enige gewenning',
            'Het pakket is weliswaar bijzonder krachtig, maar het systeem vergt nog enige gewenning',
          ],
          explanation: '"Weliswaar" qualifies the first clause ("is weliswaar bijzonder krachtig") while "maar" introduces the contrasting reality.',
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Real-World Concessions', kind: 'personalise',
      intro: 'Share an authentic professional or personal achievement that succeeded despite difficulties or opposing factors.',
      exercises: [
        {
          id: 'conc-p-1', kind: 'personalise', prompt: 'Vertel over een situatie op je werk, in je studie of in je dagelijks leven waarin je ondanks een obstakel toch succesvol bent geweest (gebruik bijv. "hoewel", "ondanks (dat)", "al...", of "hoe... ook").',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['hoewel', 'ondanks', 'uitdaging', 'bereiken', 'resultaat', 'doorzetten', 'oplossing'],
          grammar: ['toegevende-verbanden', 'concessieve-voegwoorden'],
        },
      ],
    },
  ],
};

export const participialChapter: Chapter = {
  slug: 'deelwoordconstructies-gerundivum',
  level: 'B2',
  title: 'Participial Constructions & Gerundive Mastery',
  capability: 'Formulate concise, professional Dutch sentences using modal gerundives (\'het te-deelwoord\'), attributive participles, simultaneous \'al + deelwoord\', and concise participial clauses.',
  description: 'Master the 5 core participial structures in B2 Dutch: modal participles of necessity (\'de te nemen maatregelen\', \'de op te lossen problemen\'), attributive present and past participles (\'de stijgende kosten\', \'het gewijzigde beleid\'), progressive simultaneous action (\'al doende\', \'al wandelend\'), and concise formal clauses (\'gelet op\', \'gezien\').',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'The Architecture of Dutch Participles', kind: 'discover',
      intro: 'Explore how Dutch uses participles to create concise, elegant, and high-level academic or professional formulations.',
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
              { prompt: 'Concise Participial Clause (Formal formula)', answer: 'Gelet op de recente ontwikkelingen, passen we de planning aan.' },
            ],
            ruleChallenge: 'How is the modal participle (gerundive) constructed in Dutch and what does it express?',
            options: [
              { text: 'It expresses a passive necessity or action to be completed ("that must/will be done") using: de/het + te + infinitive (+ e) + noun (e.g. "de te nemen maatregelen").', isCorrect: true },
              { text: 'It expresses an action that has already finished in the past.', isCorrect: false },
              { text: 'It can only be used with intransitive motion verbs.', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'understand', title: 'Professional Synthesis & Participial Inferences', kind: 'understand',
      intro: 'Analyze how policy advisors and technical experts use concise participial phrases in formal Dutch communications.',
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
              { text: 'Hire more workers immediately regardless of wage levels.', isCorrect: false, explanation: 'Incorrect. The labor shortage is acknowledged as a constraint.' },
            ],
          },
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
              { text: 'Through a purely theoretical proof without any coding.', isCorrect: false, explanation: 'Incorrect. "Al doende" explicitly implies practical work.' },
            ],
          },
        },
      ],
    },
    {
      id: 'transform', title: 'Participial & Gerundive Production Drills', kind: 'transform',
      intro: 'Transform full descriptive clauses into concise, native-like Dutch participial and gerundive constructions.',
      exercises: [
        {
          id: 'part-d-1', kind: 'participial-drill', prompt: 'Modal Participle (Gerundive): Passive necessity',
          skills: ['production', 'grammar'],
          participialData: {
            triggerType: 'gerundive-modal',
            baseClause: 'De maatregelen die het kabinet de komende maanden moet nemen.',
            participleCue: 'te nemen',
            structureFormula: 'de/het + te + infinitief (+ e) + zelfstandig naamwoord',
            hint: 'Transform "die we moeten nemen" into "de te nemen maatregelen".',
          },
          target: 'de te nemen maatregelen',
          acceptedAnswers: [
            'de te nemen maatregelen',
            'de door het kabinet te nemen maatregelen',
            'de komende maanden te nemen maatregelen',
          ],
          explanation: 'The gerundive "de te nemen maatregelen" conveys passive necessity ("the measures to be taken / that must be taken").',
        },
        {
          id: 'part-d-2', kind: 'participial-drill', prompt: 'Separable Verb Gerundive: Infixation of "te"',
          skills: ['production', 'grammar'],
          participialData: {
            triggerType: 'gerundive-modal',
            baseClause: 'De complexe vraagstukken die het team gezamenlijk moet oplossen.',
            participleCue: 'op te lossen',
            structureFormula: 'de/het + [prefix] + te + [stam + en] (+ e) + zelfstandig naamwoord',
            hint: 'Insert "te" inside the separable verb "oplossen": "de op te lossen vraagstukken".',
          },
          target: 'de op te lossen vraagstukken',
          acceptedAnswers: [
            'de op te lossen vraagstukken',
            'de gezamenlijk op te lossen vraagstukken',
            'de door het team op te lossen vraagstukken',
            'de op te lossen complexe vraagstukken',
          ],
          explanation: 'With separable verbs, "te" is inserted between the prefix and the stem ("op te lossen"), forming "de op te lossen vraagstukken".',
        },
        {
          id: 'part-d-3', kind: 'participial-drill', prompt: 'Attributive Present Participle (Continuous / Active)',
          skills: ['production', 'grammar'],
          participialData: {
            triggerType: 'present-participle-attr',
            baseClause: 'De spanningen op de energiemarkt die nog steeds toenemen.',
            participleCue: 'toenemende',
            structureFormula: 'de/het + [infinitief + d + e] + zelfstandig naamwoord',
            hint: 'Transform "die toenemen" into the inflected present participle "de toenemende spanningen".',
          },
          target: 'de toenemende spanningen',
          acceptedAnswers: [
            'de toenemende spanningen',
            'de toenemende spanningen op de energiemarkt',
            'de nog steeds toenemende spanningen',
          ],
          explanation: 'The present participle is formed with infinitive + d + e ("toenemende"), functioning as an inflected attributive adjective.',
        },
        {
          id: 'part-d-4', kind: 'participial-drill', prompt: 'Simultaneous action with "Al + Tegenwoordig Deelwoord"',
          skills: ['production', 'grammar'],
          participialData: {
            triggerType: 'al-participle-simultaneous',
            baseClause: 'Terwijl zij door de grachten van Utrecht wandelde, bedacht de onderzoekster een innovatieve hypothese.',
            participleCue: 'Al wandelend',
            structureFormula: 'Al + [tegenwoordig deelwoord] + [rest], [persoonsvorm + onderwerp + rest]',
            hint: 'Start with "Al wandelend door de grachten van Utrecht bedacht de onderzoekster..."',
          },
          target: 'Al wandelend door de grachten van Utrecht bedacht de onderzoekster een innovatieve hypothese',
          acceptedAnswers: [
            'Al wandelend door de grachten van Utrecht bedacht de onderzoekster een innovatieve hypothese',
            'Al wandelend door de grachten van Utrecht bedacht zij een innovatieve hypothese',
            'Al wandelend door de grachten bedacht de onderzoekster een innovatieve hypothese',
          ],
          explanation: '"Al wandelend..." creates an elegant simultaneous participial construction expressing action and manner.',
        },
        {
          id: 'part-d-5', kind: 'participial-drill', prompt: 'Concise Participial Clause with "Gelet op"',
          skills: ['production', 'grammar'],
          participialData: {
            triggerType: 'concise-clause',
            baseClause: 'Omdat we letten op de recente macro-economische ontwikkelingen, passen we de prognoses aan.',
            participleCue: 'Gelet op',
            structureFormula: 'Gelet op + [zelfstandig naamwoord / nominale groep], [persoonsvorm + onderwerp + rest]',
            hint: 'Use the concise participial phrase "Gelet op de recente macro-economische ontwikkelingen passen we..."',
          },
          target: 'Gelet op de recente macro-economische ontwikkelingen passen we de prognoses aan',
          acceptedAnswers: [
            'Gelet op de recente macro-economische ontwikkelingen passen we de prognoses aan',
            'Gelet op de recente ontwikkelingen passen we de prognoses aan',
            'Gelet op de macro-economische ontwikkelingen passen we de prognoses aan',
          ],
          explanation: '"Gelet op [noun phrase]" is a formal B2 concise participial formula that replaces clunky subordinate clauses.',
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Professional Participial Synthesis', kind: 'personalise',
      intro: 'Formulate an authentic professional or academic observation using gerundives and participial constructions.',
      exercises: [
        {
          id: 'part-p-1', kind: 'personalise', prompt: 'Beschrijf een actuele uitdaging, project of beleidskwestie in jouw werk of studie met behulp van een modaal deelwoord (bijv. "de te nemen stappen", "het op te lossen probleem") of een beknopte deelwoordconstructie (bijv. "Gelet op...", "Gezien...", "Al doende...").',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['maatregelen', 'ontwikkelingen', 'vraagstukken', 'gelet op', 'gezien', 'toenemend', 'uitvoeren'],
          grammar: ['deelwoordconstructies', 'het-te-deelwoord'],
        },
      ],
    },
  ],
};

export const correlativeChapter: Chapter = {
  slug: 'correlatieve-voegwoorden-balans',
  level: 'B2',
  title: 'Correlative Connectors & Balanced Structures',
  capability: 'Formulate sophisticated, balanced Dutch sentences using correlative conjunction pairs and parallel syntax (zowel... als, niet alleen... maar ook, noch... noch, hetzij... hetzij, enerzijds... anderzijds, hoe... des te).',
  description: 'Master the 6 core correlative balance patterns in B2 Dutch: cumulative addition (\'zowel... als\'), emphatic additive focus (\'niet alleen... maar ook\'), negative coordination (\'noch... noch\'), formal disjunctive choice (\'hetzij... hetzij\'), balanced contrast with inversion (\'enerzijds... anderzijds\'), and proportional comparative clauses (\'hoe... des te\').',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'The Architecture of Correlative Balance', kind: 'discover',
      intro: 'Explore how Dutch pairs correlative conjunctions to structure nuanced arguments, emphasize parallel ideas, and balance contrasting perspectives.',
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
              { prompt: 'Proportional comparison (The more ... the better ...)', answer: 'Hoe eerder we beginnen, des te sneller boeken we resultaat.' },
            ],
            ruleChallenge: 'What is a key syntactic rule when using correlative conjunctions like "niet alleen ... maar ook" and "enerzijds ... anderzijds" in Dutch?',
            options: [
              { text: 'They require parallel syntactic structures, and when adverbs like "enerzijds/anderzijds" or "niet alleen" front a clause, they trigger subject-verb inversion in that clause.', isCorrect: true },
              { text: 'All correlative conjunctions push the verb to the absolute end of the sentence like "omdat".', isCorrect: false },
              { text: '"Noch ... noch" must always be accompanied by "niet" or "geen".', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'understand', title: 'Correlative Precision in Strategic Discourse', kind: 'understand',
      intro: 'Examine how native Dutch professionals use correlatives to maintain objective balance, present trade-offs, and elevate communicative register.',
      exercises: [
        {
          id: 'corr-inf-1', kind: 'inference-challenge', prompt: 'Analyze the tone and communicative intent of the correlative statement',
          skills: ['reading', 'pragmatic'],
          inferenceData: {
            scenario: 'Tijdens de aandeelhoudersvergadering verklaarde de CFO: "Enerzijds biedt de overname van de buitenlandse concurrent ons directe toegang tot nieuwe groeimarkten, maar anderzijds brengt de integratie aanzienlijke operationele en culturele risico\'s met zich mee. We moeten derhalve niet alleen scherp sturen op kostenbesparing, maar ook de medewerkerstevredenheid nauwlettend monitoren."',
            premise: 'How does the speaker frame the strategic situation through correlative markers?',
            options: [
              { text: 'The speaker constructs a balanced, mature risk-reward analysis using "enerzijds... anderzijds" for nuance and "niet alleen... maar ook" to mandate dual focus on both finances and people.', isCorrect: true, explanation: 'Uitstekend! Correlatives allow leaders to weigh trade-offs and enforce multidimensional priorities simultaneously.' },
              { text: 'The speaker rejects the acquisition outright because the risks outweigh any possible market gain.', isCorrect: false, explanation: '"Enerzijds... anderzijds" acknowledges the valid positive opportunities while noting risks.' },
              { text: 'The speaker is strictly concerned with cost-cutting and ignores internal staff relations.', isCorrect: false, explanation: 'The phrase "niet alleen... maar ook" explicitly elevates employee satisfaction to an equal priority.' },
            ],
          },
        },
      ],
    },
    {
      id: 'transform', title: 'Correlative Fusion & Production Drills', kind: 'transform',
      intro: 'Combine separate statements into tightly structured, balanced Dutch correlative sentences.',
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
            hint: 'Combine into: "Zowel de productiviteit verhogen als het welzijn waarborgen..." or "Zowel de productiviteit als het welzijn..."',
          },
          target: 'Zowel de productiviteit als het welzijn van de medewerkers staat hoog op de agenda',
          acceptedAnswers: [
            'Zowel de productiviteit als het welzijn van de medewerkers staat hoog op de agenda',
            'Zowel de productiviteit als het welzijn van de medewerkers is een prioriteit',
            'Zowel de operationele productiviteit als het welzijn van de medewerkers is een prioriteit voor de organisatie',
            'Zowel het verhogen van de productiviteit als het waarborgen van het welzijn is een prioriteit',
          ],
          explanation: '"Zowel ... als ..." coordinates two parallel elements cleanly without repeating redundant phrasing.',
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
            hint: 'Start with fronted inversion: "Niet alleen stijgen de operationele kosten snel, maar ook de omzet blijft achter."',
          },
          target: 'Niet alleen stijgen de operationele kosten snel, maar ook de omzet blijft achter',
          acceptedAnswers: [
            'Niet alleen stijgen de operationele kosten snel, maar ook de omzet blijft achter',
            'Niet alleen stijgen de operationele kosten, maar ook de omzet blijft achter bij de prognose',
            'Niet alleen stijgen de kosten, maar ook de omzet blijft achter',
            'Niet alleen stijgen de operationele kosten, maar ook de omzet daalt',
          ],
          explanation: 'Fronting "Niet alleen" causes subject-verb inversion ("stijgen de kosten"), paired with "maar ook" in the second clause.',
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
            hint: 'Start with "Noch de afdelingsmanager, noch de directieleden waren op de hoogte van de beleidswijziging."',
          },
          target: 'Noch de afdelingsmanager, noch de directieleden waren op de hoogte van de beleidswijziging',
          acceptedAnswers: [
            'Noch de afdelingsmanager, noch de directieleden waren op de hoogte van de beleidswijziging',
            'Noch de manager, noch de directieleden waren op de hoogte van de beleidswijziging',
            'Noch de afdelingsmanager, noch de directieleden was op de hoogte van de beleidswijziging',
            'Noch de manager, noch de directie was op de hoogte van de wijziging',
          ],
          explanation: '"Noch ... noch ..." coordinates two negative premises without adding extraneous negative words ("niet", "geen").',
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
            hint: 'Combine into: "We passen het contract aan, hetzij via een addendum, hetzij via een nieuw raamcontract."',
          },
          target: 'We passen het contract aan, hetzij via een addendum, hetzij via een nieuw raamcontract',
          acceptedAnswers: [
            'We passen het contract aan, hetzij via een addendum, hetzij via een nieuw raamcontract',
            'We passen het contract aan, hetzij via een schriftelijk addendum, hetzij via een nieuw contract',
            'We kunnen het contract aanpassen, hetzij via een addendum, hetzij via een nieuw raamcontract',
            'Het contract wordt aangepast, hetzij via een addendum, hetzij via een nieuw raamcontract',
          ],
          explanation: '"Hetzij ... hetzij ..." is a formal B2 disjunctive correlative formula that presents clear, balanced alternatives.',
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
            hint: 'Use inversion in both clauses: "Enerzijds biedt AI grote kansen, anderzijds brengt het serieuze risico\'s met zich mee."',
          },
          target: 'Enerzijds biedt AI grote kansen, anderzijds brengt het serieuze risico\'s met zich mee',
          acceptedAnswers: [
            'Enerzijds biedt AI grote kansen, anderzijds brengt het serieuze risico\'s met zich mee',
            'Enerzijds biedt kunstmatige intelligentie grote kansen, anderzijds brengt het serieuze risicos met zich mee',
            'Enerzijds biedt AI kansen voor efficiëntie, anderzijds brengt het aanzienlijke risico\'s met zich mee',
            'Enerzijds biedt AI ongekende kansen, anderzijds brengt het grote risico\'s met zich mee',
          ],
          explanation: '"Enerzijds" and "anderzijds" front the respective clauses, triggering subject-verb inversion ("biedt AI", "brengt het").',
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
            hint: 'Formulate: "Hoe grondiger we het voorstel voorbereiden, des te groter de kans op goedkeuring is."',
          },
          target: 'Hoe grondiger we het voorstel voorbereiden, des te groter de kans op goedkeuring is',
          acceptedAnswers: [
            'Hoe grondiger we het voorstel voorbereiden, des te groter de kans op goedkeuring is',
            'Hoe grondiger we het voorstel voorbereiden, des te groter is de kans op goedkeuring',
            'Hoe grondiger we het projectvoorstel voorbereiden, des te groter de kans op goedkeuring is',
            'Hoe beter we het voorstel voorbereiden, des te groter de kans op goedkeuring is',
          ],
          explanation: '"Hoe [comparative] [subclause], des te [comparative] [main clause]" models proportional correlation with precision.',
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Balanced Discourse Synthesis', kind: 'personalise',
      intro: 'Formulate a balanced professional opinion or strategic evaluation from your own work or academic experience using correlatives.',
      exercises: [
        {
          id: 'corr-p-1', kind: 'personalise', prompt: 'Formuleer een afgewogen standpunt over een actueel dilemma of verandering in jouw vakgebied met behulp van een correlatief paar (bijv. "enerzijds... anderzijds...", "niet alleen... maar ook...", "zowel... als...", of "hoe... des te...").',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['enerzijds', 'anderzijds', 'zowel', 'als', 'niet alleen', 'maar ook', 'des te', 'ontwikkelingen', 'kansen', 'risico\'s'],
          grammar: ['correlatieve-voegwoorden', 'balansstructuren', 'inversie'],
        },
      ],
    },
  ],
};

export const conditionalChapter: Chapter = {
  slug: 'voorwaardelijke-beperkende-verbanden',
  level: 'B2',
  title: 'Conditionals & Restrictive Clauses',
  capability: 'Formulate precise conditions, exceptions, contractual stipulations, and restrictive qualifications using B2 connectors (mits, tenzij, op voorwaarde dat, gesteld dat, voor zover, mocht...).',
  description: 'Master the 6 core conditional and restrictive structures in professional and academic Dutch: strict prerequisite (\'mits\'), exception clauses (\'tenzij\'), formal contractual conditions (\'op voorwaarde dat\'), hypothetical premises (\'gesteld dat\'), restrictive scope (\'voor zover\'), and inverted conditional clauses (\'mocht...\').',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover', title: 'The Architecture of Conditions & Restrictions', kind: 'discover',
      intro: 'Discover how advanced Dutch specifies prerequisites, exceptions, hypothetical premises, and restrictive limits with syntactic precision.',
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
              { prompt: 'Conditional inversion without "als" (Should / If it happens that)', answer: 'Mocht u nog aanvullende vragen hebben, neem dan gerust contact op.' },
            ],
            ruleChallenge: 'What is the primary syntactic rule for conditional conjunctions like "mits", "tenzij", "op voorwaarde dat", and "voor zover"?',
            options: [
              { text: 'They introduce subordinate clauses and require verb-final (SOV) word order.', isCorrect: true },
              { text: 'They always cause verb-second word order like "dus" and "daarom".', isCorrect: false },
              { text: '"Mits" and "tenzij" mean the same thing and are freely interchangeable.', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'understand', title: 'Conditions & Boundaries in Strategic Negotiation', kind: 'understand',
      intro: 'Examine how professionals set hard boundaries, contract prerequisites, and contingencies in negotiations.',
      exercises: [
        {
          id: 'cond-inf-1', kind: 'inference-challenge', prompt: 'Analyze the legal commitments and contingencies in the statement',
          skills: ['reading', 'pragmatic'],
          inferenceData: {
            scenario: 'Tijdens de contractonderhandelingen stelde de bedrijfsjurist: "Wij stemmen in met de voorgestelde leveringstermijnen, mits de softwareleverancier de uptime van 99,9% schriftelijk garandeert. Tenzij er vóór vrijdag een bindend SLA-document wordt ondertekend, behouden wij ons het recht voor om de overeenkomst eenzijdig te ontbinden. Mocht er overmacht optreden, dan treden partijen binnen 48 uur in overleg."',
            premise: 'How does the lawyer structure the commitments using conditional markers?',
            options: [
              { text: 'The lawyer sets a strict prerequisite with "mits" (uptime guarantee), establishes a binding dealbreaker with "tenzij" (signed SLA), and provides a contingency process with "mocht" for force majeure.', isCorrect: true, explanation: 'Uitstekend! "Mits" creates a prerequisite, "tenzij" marks an exception/cancellation clause, and "mocht" handles contingency.' },
              { text: 'The lawyer terminates the contract immediately and refuses to negotiate further.', isCorrect: false, explanation: 'The lawyer sets clear conditions under which the contract remains valid.' },
              { text: 'The lawyer assumes that uptime guarantees are unnecessary if force majeure occurs.', isCorrect: false, explanation: 'Both conditions are strictly separated and formally defined.' },
            ],
          },
        },
      ],
    },
    {
      id: 'transform', title: 'Conditional & Restrictive Precision Drills', kind: 'transform',
      intro: 'Combine premises into precise Dutch conditional and restrictive sentences.',
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
            hint: 'Combine into: "Het management keurt het voorstel goed, mits de terugverdientijd binnen drie jaar blijft."',
          },
          target: 'Het management keurt het voorstel goed, mits de terugverdientijd binnen drie jaar blijft',
          acceptedAnswers: [
            'Het management keurt het voorstel goed, mits de terugverdientijd binnen drie jaar blijft',
            'Het management keurt het investeringsvoorstel goed, mits de terugverdientijd binnen drie jaar blijft',
            'Het management keurt het voorstel goed mits de terugverdientijd binnen drie jaar blijft',
            'Het investeringsvoorstel wordt goedgekeurd, mits de terugverdientijd binnen drie jaar blijft',
          ],
          explanation: '"Mits" introduces a necessary condition ("alleen als") and moves the finite verb "blijft" to the end of the subclause.',
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
            hint: 'Formulate: "Het nieuwe beleid treedt in werking, tenzij de ondernemingsraad bezwaar aantekent."',
          },
          target: 'Het nieuwe beleid treedt in werking, tenzij de ondernemingsraad formeel bezwaar aantekent',
          acceptedAnswers: [
            'Het nieuwe beleid treedt in werking, tenzij de ondernemingsraad formeel bezwaar aantekent',
            'Het nieuwe hybride werkbeleid treedt in werking, tenzij de ondernemingsraad formeel bezwaar aantekent',
            'Het nieuwe werkbeleid treedt in werking, tenzij de ondernemingsraad bezwaar aantekent',
            'Het beleid treedt in werking, tenzij de ondernemingsraad bezwaar aantekent',
          ],
          explanation: '"Tenzij" means "behalve als" (unless). The subclause takes SOV verb-final order ("bezwaar aantekent") without extra negation words.',
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
            hint: 'Combine into: "De provincie verstrekt de subsidie, op voorwaarde dat het consortium de doelen behaalt."',
          },
          target: 'De provincie verstrekt de subsidie, op voorwaarde dat het consortium de doelen behaalt',
          acceptedAnswers: [
            'De provincie verstrekt de subsidie, op voorwaarde dat het consortium de doelen behaalt',
            'De provincie verstrekt de innovatiesubsidie, op voorwaarde dat het consortium de duurzaamheidsdoelen behaalt',
            'De provincie verstrekt de subsidie op voorwaarde dat het consortium de doelen behaalt',
            'De subsidie wordt verstrekt, op voorwaarde dat het consortium de duurzaamheidsdoelen behaalt',
          ],
          explanation: '"Op voorwaarde dat" introduces a formal contractual condition with subclause word order ("de doelen behaalt").',
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
            hint: 'Start with: "Gesteld dat de energiekosten verder stijgen, dan moeten we onze begroting herzien."',
          },
          target: 'Gesteld dat de energiekosten verder stijgen, dan moeten we onze begroting herzien',
          acceptedAnswers: [
            'Gesteld dat de energiekosten verder stijgen, dan moeten we onze begroting herzien',
            'Gesteld dat de energiekosten verder stijgen, moeten we onze begroting herzien',
            'Gesteld dat de energiekosten stijgen, dan moeten we de begroting herzien',
            'Aangenomen dat de energiekosten verder stijgen, dan moeten we onze begroting herzien',
          ],
          explanation: '"Gesteld dat" fronts the hypothetical premise with subclause word order ("verder stijgen"), followed by an inverted main clause ("dan moeten we").',
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
            hint: 'Formulate: "Voor zover ik kan beoordelen, voldoet het voorstel aan alle criteria."',
          },
          target: 'Voor zover ik kan beoordelen, voldoet het voorstel aan alle criteria',
          acceptedAnswers: [
            'Voor zover ik kan beoordelen, voldoet het voorstel aan alle criteria',
            'Voor zover ik kan beoordelen, voldoet het projectvoorstel aan alle criteria',
            'Voor zover ik het kan beoordelen, voldoet het projectvoorstel aan alle formele criteria',
            'Voor zover wij kunnen beoordelen, voldoet het voorstel aan alle criteria',
          ],
          explanation: '"Voor zover" establishes a restrictive boundary ("as far as"). The subclause places verbs at the end ("kan beoordelen"), triggering inversion in the main clause ("voldoet het voorstel").',
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
            hint: 'Start with: "Mocht u complicaties constateren, neem dan direct contact op met de klantenservice."',
          },
          target: 'Mocht u complicaties constateren, neem dan direct contact op met de ondersteuningsdienst',
          acceptedAnswers: [
            'Mocht u complicaties constateren, neem dan direct contact op met de ondersteuningsdienst',
            'Mocht u complicaties constateren, neem dan direct contact op met de technische ondersteuningsdienst',
            'Mocht u technische complicaties constateren, neem dan contact op met de ondersteuningsdienst',
            'Mocht u problemen ondervinden, neem dan direct contact op met de ondersteuningsdienst',
          ],
          explanation: '"Mocht(en)" replaces "als" in high-register formal Dutch, fronting the auxiliary verb and triggering main clause inversion with "dan".',
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Professional Terms & Boundary Setting', kind: 'personalise',
      intro: 'Formulate a professional prerequisite, exception, or restrictive boundary from your own work or academic domain using conditional connectors.',
      exercises: [
        {
          id: 'cond-p-1', kind: 'personalise', prompt: 'Beschrijf een belangrijke voorwaarde, uitzondering of restrictie in jouw werk of studie met behulp van "mits", "tenzij", "op voorwaarde dat", "voor zover", of "mocht".',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['mits', 'tenzij', 'op voorwaarde dat', 'gesteld dat', 'voor zover', 'mocht', 'akkoord', 'overeenkomst', 'voorwaarde', 'beperking'],
          grammar: ['voorwaardelijke-verbanden', 'beperkende-verbanden', 'bijzin-woordvolgorde', 'inversie'],
        },
      ],
    },
  ],
};

export const causalityChapter: Chapter = {
  slug: 'oorzaak-gevolg-doel',
  level: 'B2',
  title: 'Causal, Consecutive & Final Relations',
  capability: 'Express nuanced causes (doordat, aangezien), negative/positive attributions (te wijten aan, te danken aan), consecutive results (waardoor, dermate... dat), and formal purpose (opdat, teneinde te).',
  description: 'Master the 8 core causal, consecutive, and final structures in professional and academic Dutch: involuntary cause (\'doordat\'), formal reasoned justification (\'aangezien\'), negative causal attribution (\'te wijten aan\'), positive merit (\'te danken aan\' / \'dankzij\'), relative consequence (\'waardoor\'), intensified degree & result (\'dermate... dat\'), formal purpose subclause (\'opdat\'), and formal purpose infinitive (\'teneinde... te\').',
  estimatedMinutes: 22,
  stages: [
    {
      id: 'discover', title: 'The Matrix of Cause, Consequence & Purpose', kind: 'discover',
      intro: 'Discover how advanced Dutch distinguishes involuntary physical causes, conscious motivations, positive versus negative attributions, objective consequences, and formal expressions of purpose.',
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
              { prompt: 'Formal infinitive purpose (Teneinde... te)', answer: 'We hebben de procedures herzien, teneinde de operationele efficiëntie te waarborgen.' },
            ],
            ruleChallenge: 'What is the critical distinction between "doordat" and "omdat / aangezien" in standard Dutch?',
            options: [
              { text: '"Doordat" expresses an involuntary cause or external physical factor, whereas "omdat" and "aangezien" express conscious human reasons or motivations.', isCorrect: true },
              { text: '"Doordat" and "omdat" mean exactly the same thing and can be swapped without any stylistic difference.', isCorrect: false },
              { text: '"Doordat" always requires verb-second word order like "dus".', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'understand', title: 'Executive Analysis of Crisis & Strategy', kind: 'understand',
      intro: 'Examine how a CEO and director of operations communicate causes, attributions, consequences, and strategic purposes in an annual board briefing.',
      exercises: [
        {
          id: 'caus-inf-1', kind: 'inference-challenge', prompt: 'Analyze causal attributions and strategic goals in the management report',
          skills: ['reading', 'pragmatic'],
          inferenceData: {
            scenario: 'In het jaarverslag rapporteerde de Raad van Bestuur: "Doordat een zware storm de hoofdcentrale beschadigde, ondervond ons datacentrum een tijdelijke stroomonderbreking. Hoewel de initiële downtime te wijten was aan een falende noodaggregaat, is het snelle herstel binnen drie uur te danken aan de doortastende inzet van ons technische team. Aangezien digitale continuïteit cruciaal is voor onze cliënten, hebben we een nieuw redundantiesysteem geïnstalleerd, waardoor toekomstige storingen direct opgevangen worden. Wij hebben deze maatregelen met spoed doorgevoerd, opdat onze operationele betrouwbaarheid ten alle tijden gegarandeerd blijft."',
            premise: 'How does management delineate causes, merits, and strategic intent using these connectors?',
            options: [
              { text: 'Management clearly attributes the physical trigger to "doordat", blames the generator failure with "te wijten aan", credits the engineers with "te danken aan", explains the consequence with "waardoor", and states the overarching goal with "opdat".', isCorrect: true, explanation: 'Uitstekend! Every connector is used with exact semantic and pragmatic precision.' },
              { text: 'Management claims that the technical team caused the power outage.', isCorrect: false, explanation: 'The power outage was triggered by the storm ("doordat") and failure of the generator ("te wijten aan").' },
              { text: 'Management views the new redundancy system as an unnecessary cost.', isCorrect: false, explanation: 'Management installed it specifically to prevent future downtime ("opdat").' },
            ],
          },
        },
      ],
    },
    {
      id: 'transform', title: 'Causal, Consecutive & Final Drills', kind: 'transform',
      intro: 'Combine premises into precise Dutch sentences using advanced causal, consecutive, and final connectors.',
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
            hint: 'Start with: "Doordat de storm voor omgewaaide bomen zorgde, lag het treinverkeer stil."',
          },
          target: 'Doordat de storm voor omgewaaide bomen zorgde, lag het treinverkeer urenlang stil',
          acceptedAnswers: [
            'Doordat de storm voor omgewaaide bomen zorgde, lag het treinverkeer urenlang stil',
            'Doordat de zware storm voor omgewaaide bomen zorgde, lag het treinverkeer stil',
            'Doordat de storm voor omgewaaide bomen op het spoor zorgde, lag het treinverkeer urenlang stil',
            'Het treinverkeer lag urenlang stil, doordat de storm voor omgewaaide bomen zorgde',
          ],
          explanation: '"Doordat" is strictly used for involuntary causes and physical events without human intention, placing verbs at the end of the subclause ("zorgde").',
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
            hint: 'Formulate: "Aangezien de termijn is verstreken, kan de gemeente het dossier niet meer behandelen."',
          },
          target: 'Aangezien de wettelijke termijn is verstreken, kan de gemeente de aanvraag niet meer in behandeling nemen',
          acceptedAnswers: [
            'Aangezien de wettelijke termijn is verstreken, kan de gemeente de aanvraag niet meer in behandeling nemen',
            'Aangezien de termijn is verstreken, kan de gemeente de aanvraag niet meer in behandeling nemen',
            'Aangezien de aanvraagtermijn is verstreken, kan de gemeente het dossier niet meer in behandeling nemen',
            'Aangezien de termijn is verstreken, kunnen we de aanvraag niet meer behandelen',
          ],
          explanation: '"Aangezien" introduces an established reasoned premise in formal Dutch, placing the auxiliary/participle cluster at the subclause end ("is verstreken").',
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
            hint: 'Formulate: "De vertraging van het project is te wijten aan een fout in de software."',
          },
          target: 'De vertraging van het project is te wijten aan een softwarefout',
          acceptedAnswers: [
            'De vertraging van het project is te wijten aan een softwarefout',
            'De vertraging van de oplevering is te wijten aan een fout in de software',
            'De vertraging is grotendeels te wijten aan een softwarefout',
            'De vertraging van het project is grotendeels te wijten aan een softwarefout',
          ],
          explanation: '"Te wijten aan" is exclusively used to assign blame for negative outcomes or failures (never use "dankzij" for errors or accidents).',
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
            hint: 'Formulate: "Het succes van de migratie is te danken aan de inzet van het team."',
          },
          target: 'Het succes van de migratie is te danken aan de inzet van het team',
          acceptedAnswers: [
            'Het succes van de migratie is te danken aan de inzet van het team',
            'Het succes van het project is te danken aan de inzet van het team',
            'Het succesvolle resultaat is te danken aan de toewijding van het team',
            'De succesvolle migratie is te danken aan de enorme inzet van het team',
          ],
          explanation: '"Te danken aan" (and "dankzij") expresses positive attribution and gratitude for favorable accomplishments.',
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
            hint: 'Combine into: "De leverancier ging failliet, waardoor de productie wekenlang stil kwam te liggen."',
          },
          target: 'De leverancier ging failliet, waardoor de productie wekenlang stil kwam te liggen',
          acceptedAnswers: [
            'De leverancier ging failliet, waardoor de productie wekenlang stil kwam te liggen',
            'De leverancier ging failliet, waardoor de productie wekenlang stil lag',
            'De leverancier ging failliet, waardoor de productie van de hardware stil kwam te liggen',
            'De hoofdleverancier ging failliet, waardoor de productie wekenlang stillag',
          ],
          explanation: '"Waardoor" is a relative consecutive subjunction expressing the direct consequence of the main clause, moving all verbs to the end.',
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
            hint: 'Formulate: "De kosten stegen dermate snel dat de directie moest ingrijpen."',
          },
          target: 'De kosten stegen dermate snel dat de directie direct moest ingrijpen',
          acceptedAnswers: [
            'De kosten stegen dermate snel dat de directie direct moest ingrijpen',
            'De operationele kosten stegen dermate snel dat de directie moest ingrijpen',
            'De kosten stegen dermate snel dat de directie ingreep',
            'De kosten stegen dermate sterk dat de directie direct moest ingrijpen',
          ],
          explanation: '"Dermate [adjectief/adverbium] dat..." expresses a consequential outcome driven by extreme degree, with verb-final word order in the dat-clause.',
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
            hint: 'Combine into: "De directie heeft maatregelen ingesteld, opdat risico\'s voorkomen kunnen worden."',
          },
          target: 'De directie heeft maatregelen ingesteld, opdat risico\'s in de toekomst voorkomen kunnen worden',
          acceptedAnswers: [
            'De directie heeft maatregelen ingesteld, opdat risico\'s in de toekomst voorkomen kunnen worden',
            'De directie heeft maatregelen ingesteld, opdat risico\'s voorkomen kunnen worden',
            'Het bestuur heeft maatregelen ingesteld, opdat toekomstige risico\'s voorkomen kunnen worden',
            'Er zijn maatregelen ingesteld, opdat risico\'s voorkomen kunnen worden',
          ],
          explanation: '"Opdat" introduces a formal subordinate clause of purpose ("met het doel dat"), requiring subordinate verb-final placement ("voorkomen kunnen worden").',
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
            hint: 'Formulate: "De afdeling herziet de processen, teneinde de certificering te waarborgen."',
          },
          target: 'De afdeling herziet de processen, teneinde de certificering duurzaam te waarborgen',
          acceptedAnswers: [
            'De afdeling herziet de processen, teneinde de certificering duurzaam te waarborgen',
            'De afdeling herziet de processen, teneinde de certificering te waarborgen',
            'De afdeling herziet de werkprocessen, teneinde de veiligheidscertificering te waarborgen',
            'We herzien de processen, teneinde de certificering te waarborgen',
          ],
          explanation: '"Teneinde... te" is the high-register formal equivalent of "om... te", followed by an infinitive construction.',
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Professional Logic & Strategic Goals', kind: 'personalise',
      intro: 'Formulate a causal explanation, consequence, or purpose statement from your own professional or academic experience using these B2 connectors.',
      exercises: [
        {
          id: 'caus-p-1', kind: 'personalise', prompt: 'Beschrijf een belangrijke oorzaak, gevolgtrekking of doelstelling in jouw werk of studie met behulp van "doordat", "aangezien", "te wijten aan", "te danken aan", "waardoor", "opdat", of "teneinde te".',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['doordat', 'aangezien', 'te wijten aan', 'te danken aan', 'waardoor', 'dermate dat', 'opdat', 'teneinde te', 'oorzaak', 'gevolg', 'doelstelling'],
          grammar: ['oorzakelijke-verbanden', 'gevolgtrekking', 'doelgerichte-constructies', 'bijzin-woordvolgorde'],
        },
      ],
    },
  ],
};

export const prefixVerbChapter: Chapter = {
  slug: 'scheidbare-onscheidbare-werkwoorden',
  level: 'B2',
  title: 'Separable vs Inseparable Prefix Verbs',
  capability: 'Master stress-dependent prefix verbs (voorkomen, ondergaan, overleggen, doorlopen, achterhalen) with accurate splitting, participle formation, and \'te\' placement.',
  description: 'Master the subtle yet crucial distinction between separable and inseparable compound verbs in B2 Dutch: stressed prefixes (\'vóórkomen\', \'óndergaan\', \'óverleggen\', \'dóórlopen\') that split in main clauses and take \'ge-\'/\'te\' infixation, versus unstressed prefixes (\'voorkómen\', \'ondergáán\', \'overléggen\', \'doorlópen\', \'achterhálen\', \'doorbréken\') that never split and take no \'ge-\'.',
  estimatedMinutes: 22,
  stages: [
    {
      id: 'discover', title: 'The Law of Stress & Split: Prefix Verbs', kind: 'discover',
      intro: 'Discover how a single shift in stress transforms the meaning, conjugation, participle formation, and syntax of Dutch compound verbs.',
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
              { prompt: 'doorbréken (inseparable = break deadlock)', answer: 'De bemiddelaar doorbreekt de langdurige impasse tussen partijen.' },
            ],
            ruleChallenge: 'How do stress patterns determine the grammatical behavior of Dutch prefix verbs?',
            options: [
              { text: 'When the prefix is stressed, the verb is separable (splits in main clauses, inserts "ge-" in participles and "te" in infinitives). When the stem is stressed, the verb is inseparable (never splits, no "ge-", "te" precedes the whole verb).', isCorrect: true },
              { text: 'All prefix verbs in Dutch are separable in the present tense and inseparable in the past tense.', isCorrect: false },
              { text: 'Separable verbs only exist with the prefix "over-", while "voor-" is always inseparable.', isCorrect: false },
            ],
          },
        },
      ],
    },
    {
      id: 'understand', title: 'Executive Debrief: Legal, Medical & Corporate Precision', kind: 'understand',
      intro: 'Analyze how a corporate legal counsel and operations director communicate risks, document submissions, negotiations, and prevention in an official compliance review.',
      exercises: [
        {
          id: 'prefix-inf-1', kind: 'inference-challenge', prompt: 'Analyze prefix verbs and semantic distinctions in the legal counsel report',
          skills: ['reading', 'pragmatic'],
          inferenceData: {
            scenario: 'Tijdens de aandeelhoudersvergadering lichtte de hoofdjurist toe: "Ons complianceteam voorkomt proactief juridische risico\'s door alle contracten vooraf te screenen. Mocht er desalniettemin een geschil vóórkomen, dan overleggen we direct met externe experts. Om boetes te vermijden, zijn alle leveranciers verplicht om hun certificaten tijdig over te leggen. Het afgelopen jaar heeft onze onderneming een omvangrijke audit ondergaan, waarbij we het complete veiligheidsprotocol hebben doorlopen. Dankzij dit strenge beleid heeft het management de negatieve trend definitief doorbroken."',
            premise: 'How does the legal counsel utilize separable and inseparable verbs to convey precise administrative actions?',
            options: [
              { text: 'The counsel uses "voorkomt" (inseparable) for preventing risks, "vóórkomen" (separable) for issues arising, "overleggen" (inseparable) for consulting experts, "over te leggen" (separable) for submitting certificates, "ondergaan" (inseparable) for undergoing an audit, "doorlopen" (inseparable) for completing protocols, and "doorbroken" (inseparable) for breaking the trend.', isCorrect: true, explanation: 'Uitstekend! Every verb is conjugated according to its specific stress pattern and semantic meaning.' },
              { text: 'The counsel claims that the company refused to submit any documents to the auditors.', isCorrect: false, explanation: 'Suppliers were required to submit certificates ("over te leggen").' },
              { text: 'The counsel states that the company failed its safety audit.', isCorrect: false, explanation: 'The company completed the entire protocol ("heeft doorlopen") and broke the negative trend ("heeft doorbroken").' },
            ],
          },
        },
      ],
    },
    {
      id: 'transform', title: 'Separable vs Inseparable Drills', kind: 'transform',
      intro: 'Conjugate Dutch prefix verbs in present main clauses, perfect tenses, and infinitive constructions according to their stress patterns and meanings.',
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
            hint: 'Formulate: "De specialist voorkomt een ernstige medische fout."',
          },
          target: 'De specialist voorkomt een ernstige medische fout',
          acceptedAnswers: [
            'De specialist voorkomt een ernstige medische fout',
            'De arts voorkomt een ernstige medische fout',
            'De specialist voorkomt een ernstige fout',
            'De arts voorkomt een medische fout',
          ],
          explanation: '"Voorkómen" (prevent) has stress on "-komen" and is inseparable. It never splits in a main clause: "De arts voorkomt de fout" (not "komt... voor").',
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
            hint: 'Formulate: "Dit type storing komt gelukkig zelden voor."',
          },
          target: 'Dit type technische storing komt gelukkig zelden voor',
          acceptedAnswers: [
            'Dit type technische storing komt gelukkig zelden voor',
            'Dit soort technische storingen komt gelukkig zelden voor',
            'Deze technische storing komt zelden voor',
            'Dit type storing komt gelukkig zelden voor in het datacenter',
          ],
          explanation: '"Vóórkomen" (occur) has stress on "vóór-" and is separable. It splits in main clauses: finite verb in position 2, "voor" at the clause end.',
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
            hint: 'Formulate: "De minister heeft vanochtend met de vakbonden overlegd."',
          },
          target: 'De minister heeft vanochtend met de vakbonden overlegd',
          acceptedAnswers: [
            'De minister heeft vanochtend met de vakbonden overlegd',
            'De minister heeft met de vakbonden overlegd',
            'De minister heeft vanmorgen met de vakbond overlegd',
            'De minister heeft vanochtend uitgebreid met de vakbonden overlegd',
          ],
          explanation: '"Overléggen" (consult) is inseparable. Its past participle is formed without "ge-": "heeft overlegd" (unlike separable "overgelegd" for submitting papers).',
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
            hint: 'Formulate: "De sollicitant is verplicht om een geldig getuigschrift over te leggen."',
          },
          target: 'De sollicitant is verplicht om een geldig getuigschrift over te leggen',
          acceptedAnswers: [
            'De sollicitant is verplicht om een geldig getuigschrift over te leggen',
            'De sollicitant is verplicht om een geldig legitimatiebewijs over te leggen',
            'De kandidaat is verplicht om een geldig diploma over te leggen',
            'U bent verplicht om een geldig document over te leggen',
          ],
          explanation: '"Óverleggen" (to produce/submit documents) is separable. In an infinitive clause with "te", "te" is inserted between the prefix and stem: "over te leggen".',
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
            hint: 'Formulate: "Het bedrijf heeft een ingrijpende reorganisatie ondergaan."',
          },
          target: 'Het bedrijf heeft een ingrijpende reorganisatie ondergaan',
          acceptedAnswers: [
            'Het bedrijf heeft een ingrijpende reorganisatie ondergaan',
            'Het concern heeft een grote herstructurering ondergaan',
            'Het bedrijf heeft een grote reorganisatie ondergaan',
            'De organisatie heeft een herstructurering ondergaan',
          ],
          explanation: '"Ondergáán" (undergo) is inseparable, taking auxiliary "hebben" and no "ge-" in the participle ("heeft ondergaan"). Separable "óndergaan" (setting sun) uses "zijn" and "ondergegaan".',
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
            hint: 'Formulate: "Het team doet onderzoek om de precieze toedracht te achterhalen."',
          },
          target: 'Het team doet onderzoek om de precieze toedracht te achterhalen',
          acceptedAnswers: [
            'Het team doet onderzoek om de precieze toedracht te achterhalen',
            'Het team doet onderzoek om de precieze oorzaak te achterhalen',
            'De recherche probeert de waarheid te achterhalen',
            'Het is belangrijk om de precieze oorzaak te achterhalen',
          ],
          explanation: '"Achterhálen" (trace/discover) is strictly inseparable. In infinitive clauses, "te" precedes the entire verb: "om de toedracht te achterhalen" (never "achter te halen").',
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
            hint: 'Formulate: "De bemiddelaar doorbreekt de langdurige impasse."',
          },
          target: 'De bemiddelaar doorbreekt de langdurige impasse',
          acceptedAnswers: [
            'De bemiddelaar doorbreekt de langdurige impasse',
            'De bemiddelaar doorbreekt de impasse tussen beide partijen',
            'De bemiddelaar doorbreekt de impasse',
            'De voorzitter doorbreekt de impasse',
          ],
          explanation: 'Figurative "doorbréken" (deadlock/impasse) is inseparable and does not split: "De bemiddelaar doorbreekt de impasse" (unlike physical "dóórbreken", e.g. "De dijk breekt door").',
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
            hint: 'Formulate: "Nieuwe medewerkers zijn verplicht om het complete inwerktraject te doorlopen."',
          },
          target: 'Nieuwe medewerkers zijn verplicht om het complete inwerktraject te doorlopen',
          acceptedAnswers: [
            'Nieuwe medewerkers zijn verplicht om het complete inwerktraject te doorlopen',
            'Nieuwe medewerkers zijn verplicht om het inwerktraject te doorlopen',
            'Medewerkers zijn verplicht om de training te doorlopen',
            'Het is verplicht om het complete leertraject te doorlopen',
          ],
          explanation: '"Doorlópen" (complete education/process) is inseparable: "om het traject te doorlopen". Separable "dóórlopen" (continue walking) would be "door te lopen".',
        },
      ],
    },
    {
      id: 'personalise', title: 'Your Professional Agility & Precision', kind: 'personalise',
      intro: 'Describe a situation in your work, study, or daily life where you had to prevent a problem (voorkómen), consult colleagues (overléggen), submit documents (óverleggen), undergo a transition (ondergáán), or complete a process (doorlópen).',
      exercises: [
        {
          id: 'prefix-p-1', kind: 'personalise', prompt: 'Beschrijf een situatie uit jouw werk of studie waarin je een fout moest voorkómen, documenten moest óverleggen, een proces moest doorlópen, of met iemand moest overléggen. Let goed op de scheidbaarheid en vervoeging van het werkwoord.',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['voorkomen', 'overleggen', 'ondergaan', 'doorlopen', 'achterhalen', 'doorbreken', 'onderhandelen', 'reorganisatie', 'getuigschrift', 'impasse'],
          grammar: ['scheidbare-werkwoorden', 'onscheidbare-werkwoorden', 'klemtoon-betekenis', 'deelwoordvorming', 'te-infinitief'],
        },
      ],
    },
  ],
};

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
                answer: 'Ik reis [morgen (Tijd)] [met de trein (Manier)] [naar Amsterdam (Plaats)].',
              },
              {
                prompt: 'Definite Direct Object (Precedes Time and Manner):',
                answer: 'Ik heb [het rapport (Bepalend Object)] [gisteren (Tijd)] [aandachtig (Manier)] gelezen.',
              },
              {
                prompt: 'Indefinite Direct Object (Follows Time and Manner):',
                answer: 'Ik heb [gisteren (Tijd)] [met veel plezier (Manier)] [een nieuw boek (Onbepaald Object)] gelezen.',
              },
              {
                prompt: 'Negation Scope with Niet (After Definite Object, before Prepositional Phrase):',
                answer: 'Ik stuur [het document (Definite Object)] [vandaag (Tijd)] [niet (Negatie)] [naar de klant (Plaats/Prep)].',
              },
            ],
            ruleChallenge: 'What is the standard order for adverbial adjuncts and definite objects in the Dutch midfield?',
            options: [
              { text: 'Time (Tijd) -> Manner (Manier) -> Place (Plaats), with definite direct objects preceding Time and Manner.', isCorrect: true },
              { text: 'Place (Plaats) -> Manner (Manier) -> Time (Tijd), exactly like English.', isCorrect: false },
              { text: 'Manner -> Place -> Time, with all objects always placed at the very end.', isCorrect: false },
            ],
          },
          explanation: 'Dutch strictly prioritizes Time before Manner before Place (TMP). Definite objects (het/de/mijn) take priority before TMP, whereas indefinite objects (een/geen) appear after TMP.',
        },
      ],
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
            'overhaaste': { meaning: 'hasty / premature', category: 'adjective' },
          },
          listeningQuestion: 'Why is "de financiële jaarcijfers" placed before "om tien uur" in the first sentence?',
          listeningOptions: [
            { text: 'Because definite direct objects (with de/het) precede adverbial time adjuncts in the Dutch midfield.', isCorrect: true },
            { text: 'Because time adjuncts are always placed at the end of the sentence.', isCorrect: false },
            { text: 'Because "de financiële jaarcijfers" is the grammatical subject.', isCorrect: false },
          ],
          explanation: 'In Dutch midfield syntax, a definite direct object ("de jaarcijfers") precedes temporal, modal/manner, and locative adjuncts.',
          skills: ['reading', 'grammar'],
        },
      ],
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
              place: 'naar Brussel',
            },
            contextPrompt: 'Je plant een dienstreis naar het Europese hoofdkantoor. Integreer de tijd (morgen), het vervoermiddel (met de hogesnelheidstrein) en de bestemming (naar Brussel).',
            providedElements: ['Wij reizen', 'naar Brussel (Plaats)', 'morgen (Tijd)', 'met de hogesnelheidstrein (Manier)'],
            structureFormula: '[Onderwerp] + reizen + [Tijd] + [Manier] + [Plaats]',
            hint: 'Volgorde: Tijd (morgen) -> Manier (met de hogesnelheidstrein) -> Plaats (naar Brussel).',
          },
          target: 'Wij reizen morgen met de hogesnelheidstrein naar Brussel',
          acceptedAnswers: [
            'Wij reizen morgen met de hogesnelheidstrein naar Brussel',
            'We reizen morgen met de hogesnelheidstrein naar Brussel',
            'Morgen reizen wij met de hogesnelheidstrein naar Brussel',
            'Morgen reizen we met de hogesnelheidstrein naar Brussel',
          ],
          explanation: 'In the Dutch midfield, adverbial adjuncts follow strict TMP order: Tijd (morgen) -> Manier (met de hogesnelheidstrein) -> Plaats (naar Brussel).',
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
              manner: 'aandachtig',
            },
            contextPrompt: 'Je hebt een belangrijk juridisch document bestudeerd. Plaats het bepalend lijdend voorwerp vóór de tijd- en maniersbepaling.',
            providedElements: ['Ik heb', 'aandachtig (Manier)', 'het vertrouwelijke contract (Bepalend Object)', 'gisteren (Tijd)', 'gelezen'],
            structureFormula: '[Onderwerp] + heb + [Bepalend Object] + [Tijd] + [Manier] + gelezen',
            hint: 'Plaats "het vertrouwelijke contract" vóór "gisteren" en "aandachtig".',
          },
          target: 'Ik heb het vertrouwelijke contract gisteren aandachtig gelezen',
          acceptedAnswers: [
            'Ik heb het vertrouwelijke contract gisteren aandachtig gelezen',
            'Ik heb het contract gisteren aandachtig gelezen',
            'Ik heb het vertrouwelijke contract gisteren zorgvuldig gelezen',
            'Gisteren heb ik het vertrouwelijke contract aandachtig gelezen',
          ],
          explanation: 'Definite direct objects (preceded by het/de/dit/mijn) precede temporal and manner adjuncts in the midfield.',
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
              directObject: { text: 'een subsidieaanvraag', isDefinite: false },
            },
            contextPrompt: 'Een collega heeft een aanvraag ingediend voor een innovatieproject. Plaats het onbepaald lijdend voorwerp (een subsidieaanvraag) ná de tijd en manier.',
            providedElements: ['Zij heeft', 'een subsidieaanvraag (Onbepaald Object)', 'vorige week (Tijd)', 'met veel toewijding (Manier)', 'ingediend'],
            structureFormula: '[Onderwerp] + heeft + [Tijd] + [Manier] + [Onbepaald Object] + ingediend',
            hint: 'Onbepaald object (met "een") komt ná Tijd (vorige week) en Manier (met veel toewijding).',
          },
          target: 'Zij heeft vorige week met veel toewijding een subsidieaanvraag ingediend',
          acceptedAnswers: [
            'Zij heeft vorige week met veel toewijding een subsidieaanvraag ingediend',
            'Ze heeft vorige week met veel toewijding een subsidieaanvraag ingediend',
            'Vorige week heeft zij met veel toewijding een subsidieaanvraag ingediend',
            'Vorige week heeft ze met veel toewijding een subsidieaanvraag ingediend',
          ],
          explanation: 'Indefinite direct objects (preceded by "een" or numerals) appear towards the end of the midfield, following Time and Manner.',
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
              directObject: { text: 'het eindrapport', isDefinite: true },
            },
            contextPrompt: 'De projectleider overhandigt de documenten aan de beoordelingscommissie. Gebruik geen voorzetsel ("aan"), maar plaats het meewerkend voorwerp direct vóór het lijdend voorwerp.',
            providedElements: ['De projectleider overhandigt', 'het eindrapport (Lijdend Voorwerp)', 'de commissie (Meewerkend Voorwerp)'],
            structureFormula: '[Onderwerp] + [Persoonsvorm] + [Meewerkend Voorwerp] + [Lijdend Voorwerp]',
            hint: 'Zonder voorzetsel komt de persoon (de commissie) vóór de zaak (het eindrapport).',
          },
          target: 'De projectleider overhandigt de commissie het eindrapport',
          acceptedAnswers: [
            'De projectleider overhandigt de commissie het eindrapport',
            'De projectleider overhandigt de commissie het rapport',
            'De projectmanager overhandigt de commissie het eindrapport',
          ],
          explanation: 'In Dutch without a preposition, the Indirect Object (de commissie) precedes the Direct Object (het eindrapport).',
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
              indirectObject: { text: 'de aandeelhouders', preposition: 'aan' },
            },
            contextPrompt: 'Het bestuur presenteert de cijfers. Wanneer het meewerkend voorwerp wordt voorafgegaan door "aan", volgt het na het lijdend voorwerp.',
            providedElements: ['De directie presenteert', 'aan de aandeelhouders (Voorzetselvoorwerp)', 'vandaag (Tijd)', 'de kwartaalcijfers (Lijdend Voorwerp)'],
            structureFormula: '[Onderwerp] + presenteert + [Lijdend Voorwerp] + [Tijd] + [aan + Meewerkend Voorwerp]',
            hint: 'Formuleer: "De directie presenteert de kwartaalcijfers vandaag aan de aandeelhouders."',
          },
          target: 'De directie presenteert de kwartaalcijfers vandaag aan de aandeelhouders',
          acceptedAnswers: [
            'De directie presenteert de kwartaalcijfers vandaag aan de aandeelhouders',
            'Het bestuur presenteert de kwartaalcijfers vandaag aan de aandeelhouders',
            'Vandaag presenteert de directie de kwartaalcijfers aan de aandeelhouders',
          ],
          explanation: 'When using preposition "aan", the prepositional phrase ("aan de aandeelhouders") is placed after the direct object at the end of the midfield.',
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
              place: 'naar de klant',
            },
            contextPrompt: 'De accountmanager besluit om de documenten nog niet te versturen. Plaats "niet" ná het bepalend object en de tijd, maar vóór de richtingsbepaling (naar de klant).',
            providedElements: ['De accountmanager stuurt', 'naar de klant (Richting)', 'vandaag (Tijd)', 'niet (Negatie)', 'de officiële documenten (Bepalend Object)'],
            structureFormula: '[Onderwerp] + stuurt + [Bepalend Object] + [Tijd] + [niet] + [Richting/Plaats]',
            hint: 'Plaats "niet" ná "de officiële documenten vandaag", maar vóór "naar de klant".',
          },
          target: 'De accountmanager stuurt de officiële documenten vandaag niet naar de klant',
          acceptedAnswers: [
            'De accountmanager stuurt de officiële documenten vandaag niet naar de klant',
            'De accountmanager stuurt de documenten vandaag niet naar de klant',
            'Vandaag stuurt de accountmanager de officiële documenten niet naar de klant',
          ],
          explanation: '"Niet" follows definite objects and time adjuncts, but precedes prepositional phrases, direction phrases, and predicates.',
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
              negation: 'geen',
            },
            contextPrompt: 'De accountant heeft een grondige inspectie uitgevoerd en niets verdachts gevonden. Gebruik "geen onregelmatigheden" (niet "niet een").',
            providedElements: ['De accountant heeft', 'tijdens de controleaudit (Tijd)', 'aangetroffen', 'geen onregelmatigheden (Negatie + Object)'],
            structureFormula: '[Onderwerp] + heeft + [Tijd] + [geen + Onbepaald Object] + aangetroffen',
            hint: 'Gebruik "geen onregelmatigheden" ná de tijdsbepaling.',
          },
          target: 'De accountant heeft tijdens de controleaudit geen onregelmatigheden aangetroffen',
          acceptedAnswers: [
            'De accountant heeft tijdens de controleaudit geen onregelmatigheden aangetroffen',
            'De accountant heeft tijdens de audit geen onregelmatigheden aangetroffen',
            'Tijdens de controleaudit heeft de accountant geen onregelmatigheden aangetroffen',
          ],
          explanation: 'Dutch strictly negates indefinite direct objects with "geen" (never "niet een"), placed towards the end of the midfield.',
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
              place: 'in de grote zaal',
            },
            contextPrompt: 'Je stuurt een formele bevestigingsmail met een onderschikkende bijzin ("dat wij..."). Behoud de TMP-volgorde binnen de bijzin vóór de persoonsvorm aan het einde.',
            providedElements: ['Ik bevestig dat wij', 'in de grote zaal (Plaats)', 'morgen om negen uur (Tijd)', 'met het voltallige team (Manier)', 'vergaderen (PV)'],
            structureFormula: 'Ik bevestig dat [Onderwerp] + [Tijd] + [Manier] + [Plaats] + [vergaderen]',
            hint: 'In de bijzin volgt het middenveld dezelfde TMP-volgorde vóór het eindwerkwoord.',
          },
          target: 'Ik bevestig dat wij morgen om negen uur met het voltallige team in de grote zaal vergaderen',
          acceptedAnswers: [
            'Ik bevestig dat wij morgen om negen uur met het voltallige team in de grote zaal vergaderen',
            'Ik bevestig dat we morgen om negen uur met het voltallige team in de grote zaal vergaderen',
            'Ik bevestig dat wij morgen om 9:00 uur met het hele team in de grote zaal vergaderen',
            'Ik bevestig dat we morgen om negen uur met het team in de grote zaal vergaderen',
          ],
          explanation: 'Even in subordinate clauses with verb-final word order, the internal midfield respects the Tijd -> Manier -> Plaats hierarchy.',
        },
      ],
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
          grammar: ['middenveld-syntaxis', 'tmp-volgorde', 'objectplaatsing', 'negatie-scope'],
        },
      ],
    },
  ],
};

export const fixedPrepositionChapter: Chapter = {
  slug: 'vaste-voorzetsels-regimes',
  level: 'B2',
  title: 'Fixed Prepositions & Prepositional Regimes',
  capability: 'Master fixed Dutch prepositions governed by verbs, adjectives, and nouns with native precision, eliminating cross-linguistic preposition transfer errors.',
  description: 'Master the subtle prepositional regimes of Dutch verbs, adjectives, and nouns (*vaste voorzetsels*), including *twijfelen aan*, *rekening houden met*, *bestand zijn tegen*, *zich neerleggen bij*, *bijdragen aan*, *voldoen aan*, *inspelen op*, *gepaard gaan met*, *voorzien in*, *opgewassen tegen*, and *behoefte aan*.',
  estimatedMinutes: 20,
  stages: [
    {
      id: 'discover',
      title: 'The Logic of Dutch Prepositional Regimes',
      kind: 'discover',
      intro: 'Unlike English or German, Dutch verbs, adjectives, and nouns govern specific prepositions that cannot be translated literally. These fixed combinations are called "vaste voorzetsels".',
      exercises: [
        {
          id: 'fixed-prep-ind-1',
          kind: 'induction',
          prompt: 'Observe how Dutch uses specific fixed prepositions where other languages use different prepositions:',
          skills: ['grammar', 'reading'],
          inductionData: {
            examples: [
              {
                prompt: 'English: to doubt ABOUT something / German: zweifeln AN',
                answer: 'Ik twijfel [aan (niet over)] zijn oprechtheid.',
              },
              {
                prompt: 'English: to take into account / to allow FOR',
                answer: 'Wij moeten rekening houden [met (niet voor)] onvoorziene vertragingen.',
              },
              {
                prompt: 'English: to be resistant TO / withstand',
                answer: 'Dit materiaal is bestand [tegen (niet voor)] extreme temperaturen.',
              },
              {
                prompt: 'English: to resign oneself TO / accept a verdict',
                answer: 'De directie legt zich neer [bij (niet aan)] de rechterlijke uitspraak.',
              },
            ],
            ruleChallenge: 'Which prepositions are required for "twijfelen", "rekening houden", "bestand zijn", and "zich neerleggen"?',
            options: [
              { text: 'twijfelen aan, rekening houden met, bestand zijn tegen, zich neerleggen bij.', isCorrect: true },
              { text: 'twijfelen over, rekening houden voor, bestand zijn voor, zich neerleggen aan.', isCorrect: false },
              { text: 'twijfelen van, rekening houden om, bestand zijn op, zich neerleggen met.', isCorrect: false },
            ],
          },
          explanation: 'Dutch prepositional regimes are fixed lexical collocations. Using literal translations from English (e.g., "twijfelen over", "rekening houden voor") is a very common B2 error.',
        },
      ],
    },
    {
      id: 'understand',
      title: 'Prepositional Regimes in Professional Discourse',
      kind: 'understand',
      intro: 'Analyze an executive strategy briefing and identify how fixed prepositions govern relationships between actions, conditions, and outcomes.',
      exercises: [
        {
          id: 'fixed-prep-und-1',
          kind: 'reading',
          prompt: 'Read the corporate restructuring excerpt and analyze the fixed preposition collocations.',
          readingContent: `Tijdens de buitengewone aandeelhoudersvergadering benadrukte de CEO dat de voorgenomen reorganisatie onvermijdelijk gepaard gaat met (1) aanzienlijke structurele veranderingen. 

Hoewel de vakbonden aanvankelijk fel protesteerden, hebben zij besloten zich neer te leggen bij (2) het bindende arbitragevoorstel. Het nieuwe beleidsplan voldoet namelijk volledig aan (3) de gestelde milieunormen en draagt actief bij aan (4) de langetermijnstabiliteit van de onderneming. 

Bovendien moet het management flexibel inspelen op (5) de snelle technologische transities, aangezien de organisatie bestand moet zijn tegen (6) toekomstige marktschokken.`,
          wordHints: {
            'gepaard gaan met': { meaning: 'to be accompanied by / go hand in hand with', category: 'connector' },
            'zich neerleggen bij': { meaning: 'to resign oneself to / accept', category: 'verb' },
            'voldoen aan': { meaning: 'to satisfy / comply with', category: 'verb' },
            'bijdragen aan': { meaning: 'to contribute to', category: 'verb' },
            'inspelen op': { meaning: 'to respond / adapt / anticipate', category: 'verb' },
            'bestand zijn tegen': { meaning: 'to withstand / resist', category: 'adjective' },
          },
          listeningQuestion: 'Which fixed preposition combination is used to express compliance with environmental standards?',
          listeningOptions: [
            { text: 'voldoen aan ("voldoet volledig aan de gestelde milieunormen")', isCorrect: true },
            { text: 'voldoen in ("voldoet in de gestelde normen")', isCorrect: false },
            { text: 'voldoen voor ("voldoet voor de normen")', isCorrect: false },
          ],
          explanation: 'In Dutch, the verb "voldoen" (to comply with / satisfy criteria) strictly governs the preposition "aan" ("voldoen aan eisen/normen").',
          skills: ['reading', 'grammar'],
        },
      ],
    },
    {
      id: 'retrieve',
      title: 'Fixed Preposition Precision Drills',
      kind: 'retrieve',
      intro: 'Formulate accurate Dutch sentences using the required fixed prepositions, eliminating interference from other languages.',
      exercises: [
        {
          id: 'fixed-prep-d-1',
          kind: 'fixed-preposition-drill',
          prompt: 'Verb + Aan: "Twijfelen aan" (Doubt in facts or reliability)',
          skills: ['production', 'grammar'],
          fixedPrepositionData: {
            collocationType: 'verb-preposition',
            governingHead: 'twijfelen',
            fixedPreposition: 'aan',
            contextPrompt: 'De onderzoekscommissie heeft sterke twijfels over de waarachtigheid van de gerapporteerde gegevens. Druk dit uit met "twijfelen aan".',
            commonTransferErrors: ['twijfelen over (Anglicism)', 'twijfelen van'],
            meaningContext: 'To doubt the truth, reliability, or integrity of something/someone.',
            structureFormula: '[Onderwerp] + twijfelt + sterk + aan + [het lijdend object/de data]',
            hint: 'Gebruik "twijfelt aan de betrouwbaarheid van de gerapporteerde data".',
          },
          target: 'De onderzoekscommissie twijfelt sterk aan de betrouwbaarheid van de gerapporteerde data',
          acceptedAnswers: [
            'De onderzoekscommissie twijfelt sterk aan de betrouwbaarheid van de gerapporteerde data',
            'De commissie twijfelt aan de betrouwbaarheid van de data',
            'De onderzoekscommissie twijfelt aan de betrouwbaarheid van de gerapporteerde gegevens',
            'De commissie twijfelt sterk aan de betrouwbaarheid van de gegevens',
          ],
          explanation: 'When doubting facts, data, or integrity, Dutch strictly uses "twijfelen aan" (never "twijfelen over").',
        },
        {
          id: 'fixed-prep-d-2',
          kind: 'fixed-preposition-drill',
          prompt: 'Verb + Met: "Rekening houden met" (Account for variables / take into consideration)',
          skills: ['production', 'grammar'],
          fixedPrepositionData: {
            collocationType: 'verb-preposition',
            governingHead: 'rekening houden',
            fixedPreposition: 'met',
            contextPrompt: 'Tijdens de projectplanning moeten we expliciet rekening houden met eventuele vertragingen in de levering.',
            commonTransferErrors: ['rekening houden voor', 'rekening houden om', 'rekening houden over'],
            meaningContext: 'To take into account / allow for potential circumstances or factors.',
            structureFormula: '[Onderwerp] + moet + rekening houden + met + [de mogelijke vertragingen]',
            hint: 'Gebruik "rekening houden met mogelijke vertragingen".',
          },
          target: 'Wij moeten tijdens de planning nadrukkelijk rekening houden met mogelijke vertragingen',
          acceptedAnswers: [
            'Wij moeten tijdens de planning nadrukkelijk rekening houden met mogelijke vertragingen',
            'We moeten tijdens de planning rekening houden met mogelijke vertragingen',
            'Wij moeten rekening houden met mogelijke vertragingen tijdens de planning',
            'We moeten rekening houden met mogelijke vertragingen',
          ],
          explanation: '"Rekening houden" always governs the preposition "met" (to allow for / consider).',
        },
        {
          id: 'fixed-prep-d-3',
          kind: 'fixed-preposition-drill',
          prompt: 'Verb + Tegen: "Bestand zijn tegen" (Resist / withstand pressure or cyberattacks)',
          skills: ['production', 'grammar'],
          fixedPrepositionData: {
            collocationType: 'adjective-preposition',
            governingHead: 'bestand zijn',
            fixedPreposition: 'tegen',
            contextPrompt: 'De IT-afdeling garandeert dat de nieuwe softwarearchitectuur bestand is tegen grootschalige cyberaanvallen.',
            commonTransferErrors: ['bestand zijn voor', 'bestand zijn aan', 'bestand zijn op'],
            meaningContext: 'To be resistant to / resilient against external threats or adverse conditions.',
            structureFormula: '[Onderwerp] + is + uitstekend + bestand + tegen + [de aanvallen]',
            hint: 'Gebruik "is uitstekend bestand tegen zware cyberaanvallen".',
          },
          target: 'Het nieuwe softwaresysteem is uitstekend bestand tegen zware cyberaanvallen',
          acceptedAnswers: [
            'Het nieuwe softwaresysteem is uitstekend bestand tegen zware cyberaanvallen',
            'Het nieuwe systeem is goed bestand tegen zware cyberaanvallen',
            'De nieuwe software is uitstekend bestand tegen zware cyberaanvallen',
            'Het softwaresysteem is bestand tegen zware cyberaanvallen',
          ],
          explanation: '"Bestand zijn" requires the preposition "tegen" (resistant against).',
        },
        {
          id: 'fixed-prep-d-4',
          kind: 'fixed-preposition-drill',
          prompt: 'Reflexive Verb + Bij: "Zich neerleggen bij" (Accept an inevitable decision or outcome)',
          skills: ['production', 'grammar'],
          fixedPrepositionData: {
            collocationType: 'verb-preposition',
            governingHead: 'zich neerleggen',
            fixedPreposition: 'bij',
            contextPrompt: 'Het managementteam heeft besloten om de bindende uitspraak van de arbitragecommissie te accepteren.',
            commonTransferErrors: ['neerleggen aan', 'neerleggen op', 'neerleggen voor'],
            meaningContext: 'To reconcile oneself to / resign oneself to an unavoidable verdict or situation.',
            structureFormula: '[Onderwerp] + heeft besloten + zich neer te leggen + bij + [de uitspraak]',
            hint: 'Gebruik "zich neer te leggen bij de bindende uitspraak van de rechter".',
          },
          target: 'De directie heeft besloten zich neer te leggen bij de bindende uitspraak van de rechter',
          acceptedAnswers: [
            'De directie heeft besloten zich neer te leggen bij de bindende uitspraak van de rechter',
            'De directie heeft besloten om zich neer te leggen bij de bindende uitspraak van de rechter',
            'Het bestuur heeft besloten zich neer te leggen bij de bindende uitspraak van de rechter',
            'De directie legt zich neer bij de bindende uitspraak van de rechter',
          ],
          explanation: '"Zich neerleggen bij" always takes "bij" (to accept/bow to a decision).',
        },
        {
          id: 'fixed-prep-d-5',
          kind: 'fixed-preposition-drill',
          prompt: 'Verb + Aan: "Bijdragen aan" (Contribute to an objective or reduction)',
          skills: ['production', 'grammar'],
          fixedPrepositionData: {
            collocationType: 'verb-preposition',
            governingHead: 'bijdragen',
            fixedPreposition: 'aan',
            contextPrompt: 'De introductie van zonnepanelen helpt mee om de CO2-uitstoot van het bedrijf aanzienlijk te verlagen.',
            commonTransferErrors: ['bijdragen naar', 'bijdragen voor', 'bijdragen tot (formal/archaic)'],
            meaningContext: 'To contribute to a positive goal, outcome, or reduction.',
            structureFormula: '[Onderwerp] + draagt + aanzienlijk + bij + aan + [het doel]',
            hint: 'Gebruik "draagt aanzienlijk bij aan de verlaging van onze CO2-uitstoot".',
          },
          target: 'Deze duurzame innovatie draagt aanzienlijk bij aan de verlaging van onze CO2-uitstoot',
          acceptedAnswers: [
            'Deze duurzame innovatie draagt aanzienlijk bij aan de verlaging van onze CO2-uitstoot',
            'Deze innovatie draagt aanzienlijk bij aan de vermindering van onze CO2-uitstoot',
            'Dit project draagt aanzienlijk bij aan de verlaging van onze CO2-uitstoot',
            'Deze duurzame innovatie draagt bij aan de verlaging van de CO2-uitstoot',
          ],
          explanation: 'In contemporary Dutch, "bijdragen" is paired with "aan" ("bijdragen aan iets").',
        },
        {
          id: 'fixed-prep-d-6',
          kind: 'fixed-preposition-drill',
          prompt: 'Verb + Aan: "Voldoen aan" (Comply with / satisfy strict standards)',
          skills: ['production', 'grammar'],
          fixedPrepositionData: {
            collocationType: 'verb-preposition',
            governingHead: 'voldoen',
            fixedPreposition: 'aan',
            contextPrompt: 'Het nieuwe productontwerp beantwoordt aan alle Europese veiligheidseisen.',
            commonTransferErrors: ['voldoen in', 'voldoen voor', 'voldoen op'],
            meaningContext: 'To meet, satisfy, or comply with requirements, criteria, or expectations.',
            structureFormula: '[Onderwerp] + voldoet + volledig + aan + [de eisen]',
            hint: 'Gebruik "voldoet volledig aan alle strenge Europese veiligheidseisen".',
          },
          target: 'Het opgeleverde prototype voldoet volledig aan alle strenge Europese veiligheidseisen',
          acceptedAnswers: [
            'Het opgeleverde prototype voldoet volledig aan alle strenge Europese veiligheidseisen',
            'Het prototype voldoet volledig aan alle strenge Europese veiligheidseisen',
            'Het opgeleverde ontwerp voldoet volledig aan alle Europese veiligheidseisen',
            'Het prototype voldoet aan alle strenge Europese veiligheidseisen',
          ],
          explanation: '"Voldoen aan" is the standard Dutch regime for complying with requirements or standards.',
        },
        {
          id: 'fixed-prep-d-7',
          kind: 'fixed-preposition-drill',
          prompt: 'Verb + Met: "Gepaard gaan met" (Accompanied by / associated with risks)',
          skills: ['production', 'grammar'],
          fixedPrepositionData: {
            collocationType: 'verb-preposition',
            governingHead: 'gepaard gaan',
            fixedPreposition: 'met',
            contextPrompt: 'De geplande bedrijfstransitie brengt onvermijdelijk grote organisatorische uitdagingen met zich mee.',
            commonTransferErrors: ['gepaard gaan in', 'gepaard gaan aan', 'gepaard gaan door'],
            meaningContext: 'To be coupled with / accompanied by conditions or risks.',
            structureFormula: '[Onderwerp] + gaat + onvermijdelijk + gepaard + met + [de uitdagingen]',
            hint: 'Gebruik "gaat onvermijdelijk gepaard met aanzienlijke organisatorische uitdagingen".',
          },
          target: 'De geplande herstructurering gaat onvermijdelijk gepaard met aanzienlijke organisatorische uitdagingen',
          acceptedAnswers: [
            'De geplande herstructurering gaat onvermijdelijk gepaard met aanzienlijke organisatorische uitdagingen',
            'De herstructurering gaat onvermijdelijk gepaard met aanzienlijke organisatorische uitdagingen',
            'De geplande reorganisatie gaat onvermijdelijk gepaard met aanzienlijke organisatorische uitdagingen',
            'De geplande herstructurering gaat gepaard met aanzienlijke organisatorische uitdagingen',
          ],
          explanation: '"Gepaard gaan met" is an essential B2 expression for describing accompanying phenomena.',
        },
        {
          id: 'fixed-prep-d-8',
          kind: 'fixed-preposition-drill',
          prompt: 'Verb + Op: "Inspelen op" (Anticipate / proactively adapt to changes)',
          skills: ['production', 'grammar'],
          fixedPrepositionData: {
            collocationType: 'verb-preposition',
            governingHead: 'inspelen',
            fixedPreposition: 'op',
            contextPrompt: 'Ons team moet proactief reageren op de veranderende behoeften van de consument.',
            commonTransferErrors: ['inspelen in', 'inspelen aan', 'inspelen naar'],
            meaningContext: 'To anticipate, respond to, and capitalize on trends or customer demands.',
            structureFormula: '[Onderwerp] + moet + proactief + inspelen + op + [de behoeften]',
            hint: 'Gebruik "proactief inspelen op de veranderende behoeften van de consument".',
          },
          target: 'Ons marketingteam moet proactief inspelen op de veranderende behoeften van de consument',
          acceptedAnswers: [
            'Ons marketingteam moet proactief inspelen op de veranderende behoeften van de consument',
            'Het team moet proactief inspelen op de veranderende behoeften van de consument',
            'Ons team moet proactief inspelen op de veranderende behoeften van de consument',
            'Ons marketingteam moet inspelen op de veranderende behoeften van de consument',
          ],
          explanation: '"Inspelen op" takes the preposition "op" (to anticipate and respond to developments).',
        },
        {
          id: 'fixed-prep-d-9',
          kind: 'fixed-preposition-drill',
          prompt: 'Adjective + Tegen: "Opgewassen zijn tegen" (Equal to / capable of coping with demands)',
          skills: ['production', 'grammar'],
          fixedPrepositionData: {
            collocationType: 'adjective-preposition',
            governingHead: 'opgewassen zijn',
            fixedPreposition: 'tegen',
            contextPrompt: 'De jonge teamleider bleek uitstekend in staat om de zware werkdruk het hoofd te bieden.',
            commonTransferErrors: ['opgewassen voor', 'opgewassen aan', 'opgewassen op'],
            meaningContext: 'To be a match for / equal to high pressures, challenges, or adversaries.',
            structureFormula: '[Onderwerp] + bleek + uitstekend + opgewassen + tegen + [de werkdruk]',
            hint: 'Gebruik "bleek uitstekend opgewassen tegen de immense werkdruk".',
          },
          target: 'De jonge projectleider bleek uitstekend opgewassen tegen de immense werkdruk',
          acceptedAnswers: [
            'De jonge projectleider bleek uitstekend opgewassen tegen de immense werkdruk',
            'De jonge teamleider bleek uitstekend opgewassen tegen de immense werkdruk',
            'De projectleider bleek uitstekend opgewassen tegen de immense werkdruk',
            'De jonge projectleider was uitstekend opgewassen tegen de immense werkdruk',
          ],
          explanation: '"Opgewassen zijn" requires the preposition "tegen" (to be equal to / up to a challenge).',
        },
        {
          id: 'fixed-prep-d-10',
          kind: 'fixed-preposition-drill',
          prompt: 'Nouns + Prepositions: "Behoefte aan" & "Bezwaar tegen" (Need for & Objection to)',
          skills: ['production', 'grammar'],
          fixedPrepositionData: {
            collocationType: 'noun-preposition',
            governingHead: 'behoefte aan / bezwaar tegen',
            fixedPreposition: 'aan / tegen',
            contextPrompt: 'Er is een sterke noodzaak tot vernieuwing (behoefte aan) en niemand heeft een tegenwerping (bezwaar tegen) tegen het nieuwe plan.',
            commonTransferErrors: ['behoefte voor', 'bezwaar op', 'bezwaar voor'],
            meaningContext: 'Nouns governing fixed prepositions: "behoefte aan" (need for) and "bezwaar tegen" (objection against).',
            structureFormula: 'Er bestaat [behoefte aan ...] en niemand heeft [bezwaar tegen ...]',
            hint: 'Gebruik "behoefte aan vernieuwing" en "bezwaar tegen de voorgestelde koerswijziging".',
          },
          target: 'Er bestaat binnen de organisatie een dringende behoefte aan vernieuwing en niemand heeft bezwaar tegen de voorgestelde koerswijziging',
          acceptedAnswers: [
            'Er bestaat binnen de organisatie een dringende behoefte aan vernieuwing en niemand heeft bezwaar tegen de voorgestelde koerswijziging',
            'Er is binnen de organisatie een dringende behoefte aan vernieuwing en niemand heeft bezwaar tegen de voorgestelde koerswijziging',
            'Er is een dringende behoefte aan vernieuwing en niemand heeft bezwaar tegen de voorgestelde koerswijziging',
            'Er bestaat een dringende behoefte aan vernieuwing en niemand heeft bezwaar tegen het plan',
          ],
          explanation: 'Nouns follow fixed preposition regimes: "behoefte" takes "aan", while "bezwaar" takes "tegen".',
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Your Professional Regimes & Prepositional Mastery',
      kind: 'personalise',
      intro: 'Describe a project, regulation, or negotiation from your work, study, or daily life. Integrate at least two fixed preposition collocations (e.g. voldoen aan, inspelen op, rekening houden met, bijdragen aan, bestand tegen, behoefte aan).',
      exercises: [
        {
          id: 'fixed-prep-p-1',
          kind: 'personalise',
          prompt: 'Beschrijf een situatie of uitdaging uit jouw werk, studie of dagelijks leven. Gebruik minstens twee vaste voorzetselcombinaties (bijv. voldoen aan, inspelen op, rekening houden met, bijdragen aan, zich neerleggen bij, bestand tegen, behoefte aan).',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['voldoen', 'inspelen', 'rekening houden', 'bijdragen', 'neerleggen', 'bestand', 'behoefte', 'bezwaar', 'verantwoordelijk', 'twijfelen'],
          grammar: ['vaste-voorzetsels', 'voorzetselvoorwerp', 'werkwoordelijke-regimes'],
        },
      ],
    },
  ],
};

export const pronominalSplittingChapter: Chapter = {
  slug: 'pronominale-adverbia-splitsing',
  level: 'B2',
  title: 'Pronominal Adverb Splitting & Word Order',
  capability: 'Split pronominal adverbs (er... over, waar... naar, daar... aan, hier... mee, nergens... in) naturally across main clauses and subclauses, positioning the preposition directly before the verbal cluster.',
  description: 'Master the natural splitting of Dutch pronominal adverbs (*splitsing van voornaamwoordelijke bijwoorden*). Learn how Dutch speakers separate the R-word (*er / hier / daar / waar / nergens / overal / ergens*) from the stranded preposition, when splitting is mandatory or natural, and how to place the preposition directly before the final verbal group or predicate.',
  estimatedMinutes: 16,
  stages: [
    {
      id: 'discover',
      title: 'Pronominal Adverb Splitting Architecture',
      kind: 'discover',
      intro: 'When prepositions combine with inanimate reference words ("het", "dit", "dat", "wat"), Dutch converts them into R-words (*er, hier, daar, waar, nergens, overal, ergens*). In natural, standard spoken Dutch, these pronominal adverbs are systematically SPLIT across the midfield.',
      exercises: [
        {
          id: 'pronominal-split-info-1',
          kind: 'info',
          prompt: 'Split vs. Unsplit Pronominal Adverbs in Dutch',
          context: `1. Main Clause (Gespleten vorm = natuurlijk & spontaan):
• Ongesplitst (formeel/boekentaal): "Ik heb DAAROVER met mijn leidinggevende gesproken."
• Gespleten (natuurlijk Nederlands): "Ik heb DAAR gisteren met mijn leidinggevende OVER gesproken."

2. Questions (Vraagzinnen met Waar...?):
• Ongesplitst (formeel/stijf): "WAARNAAR kijk je?"
• Gespleten (spreektaal & standaard): "WAAR kijk je nu eigenlijk NAAR?"

3. Subclauses (Bijzin woordvolgorde):
• Ongesplitst: "...dat wij HIERMEE direct moeten beginnen."
• Gespleten: "...dat wij HIER morgen in alle rust MEE moeten beginnen."

4. Indefinite Pronominal Adverbs (Nergens / Overal / Ergens):
• "Zij hebben NERGENS meer vertrouwen IN." (Not: "nergensin")
• "We hebben OVERAL grondig NAAR gezocht." (Not: "overalnaar")`,
          skills: ['recognition', 'grammar'],
        },
        {
          id: 'pronominal-split-induct-1',
          kind: 'induction',
          prompt: 'Discover the Syntactic Landing Site of the Stranded Preposition',
          inductionData: {
            examples: [
              { prompt: 'Main clause: Ik heb [er] gisteren met veel plezier [aan] gewerkt.', answer: '"er" is early in midfield; "aan" stands immediately before the verb "gewerkt".' },
              { prompt: 'Question: [Waar] heb je dat interessante boek [over] gelezen?', answer: '"waar" starts the question; "over" stands right before participle "gelezen".' },
              { prompt: 'Subclause: ...omdat we [daar] tijdens de vergadering [op] moeten inspelen.', answer: '"daar" follows the subject; "op" stands immediately before verb cluster "moeten inspelen".' },
            ],
            ruleChallenge: 'Where does the stranded preposition ("over", "aan", "op", "naar", "mee") land when a pronominal adverb is split in Dutch?',
            options: [
              { text: 'Directly before the final verbal cluster (or nominal predicate) at the end of the midfield.', isCorrect: true },
              { text: 'Immediately after the finite verb in second position (V2).', isCorrect: false },
              { text: 'At the very start of the sentence before the subject.', isCorrect: false },
              { text: 'Glued directly after the first noun object in the sentence.', isCorrect: false },
            ],
          },
          skills: ['analysis', 'grammar'],
          explanation: 'When split, the R-word (*er/hier/daar/waar/nergens*) appears early in the clause, while the stranded preposition stays attached right before the verbal cluster (or nominal predicate) at the end of the midfield.',
        },
      ],
    },
    {
      id: 'understand',
      title: 'Contextual Scenario: Strategic Executive Discussion',
      kind: 'understand',
      intro: 'Observe how two senior project directors, Sanne and Daan, naturally weave split pronominal adverbs through complex corporate deliberations.',
      exercises: [
        {
          id: 'pronominal-split-dialogue-1',
          kind: 'reading',
          prompt: 'Notice the distribution of R-words and stranded prepositions in authentic debate',
          readingContent: `Sanne: "Daan, heb jij al nagedacht over de voorgestelde reorganisatie van de IT-infrastructuur? We moeten ER morgen tijdens het overleg met de directie echt OVER beslissen."

Daan: "Zeker. Ik heb ER gisteren uitgebreid met onze hoofdontwikkelaar OVER gesproken. Hij maakt zich grote zorgen over de datamigratie. DAAR kunnen we nu simpelweg niet meer OMHEEN."

Sanne: "WAAR maakt hij zich dan precies de meeste zorgen OVER? Gaat het om de beveiliging of om de compatibiliteit met de bestaande systemen?"

Daan: "Vooral om de compatibiliteit. Hij vreest dat we HIER over een halfjaar gigantisch MEE in de problemen komen als we nu overhaast handelen. We moeten ERGENS een veilige tussenoplossing VOOR zien te vinden."

Sanne: "Ik begrijp het volkomen. De aandeelhouders hebben momenteel NERGENS zoveel geduld VOOR als voor gegarandeerde stabiliteit. Laten we DAAR dan direct een gedetailleerd voorstel VOOR uitwerken."`,
          skills: ['reading', 'grammar', 'pragmatic'],
          wordHints: {
            'erover': { meaning: 'about it / discussing that topic', category: 'pronominal-adverb' },
            'daar omheen': { meaning: 'around that / avoid dealing with that reality', category: 'idiomatic' },
            'mee in de problemen komen': { meaning: 'run into serious trouble with that', category: 'collocation' },
            'ergens voor': { meaning: 'for something / a solution to something', category: 'indefinite-pronominal' },
          },
        },
      ],
    },
    {
      id: 'transform',
      title: 'Pronominal Splitting Production Drills',
      kind: 'transform',
      intro: 'Construct natural Dutch sentences by properly separating the R-word from the preposition and positioning each element in its correct syntactic slot.',
      exercises: [
        {
          id: 'pronominal-split-d-1',
          kind: 'pronominal-splitting-drill',
          prompt: 'Er + Over: Split "erover" in a main clause with time and conversation partner',
          skills: ['production', 'grammar'],
          pronominalSplittingData: {
            rWord: 'er',
            preposition: 'over',
            combinedForm: 'erover',
            clauseType: 'main-clause',
            contextPrompt: 'Ik heb gisteren een gesprek gevoerd met mijn leidinggevende over dit belangrijke onderwerp.',
            providedElements: ['Ik', 'heb', 'er', 'gisteren', 'met mijn leidinggevende', 'over', 'gesproken'],
            structureFormula: 'Ik + heb + er + [Tijd] + [Gesprekspartner] + over + gesproken',
            splittingStatus: 'natural-split-preferred',
            hint: 'Plaats "er" vroeg in de zin na de persoonsvorm, en zet "over" vlak vóór het voltooid deelwoord "gesproken".',
          },
          target: 'Ik heb er gisteren uitgebreid met mijn leidinggevende over gesproken',
          acceptedAnswers: [
            'Ik heb er gisteren uitgebreid met mijn leidinggevende over gesproken',
            'Ik heb er gisteren met mijn leidinggevende over gesproken',
            'Ik heb er gisteren met mijn leidinggevende uitgebreid over gesproken',
            'Gisteren heb ik er uitgebreid met mijn leidinggevende over gesproken',
          ],
          explanation: 'In spoken and natural Dutch, "er" and "over" are split: "Ik heb er [middenveld] over gesproken".',
        },
        {
          id: 'pronominal-split-d-2',
          kind: 'pronominal-splitting-drill',
          prompt: 'Waar + Naar: Split "waarnaar" in a spontaneous Dutch question',
          skills: ['production', 'grammar'],
          pronominalSplittingData: {
            rWord: 'waar',
            preposition: 'naar',
            combinedForm: 'waarnaar',
            clauseType: 'question-waar',
            contextPrompt: 'Je ziet een collega intensief zoeken in de bedrijfsdatabase en vraagt wat hij zoekt.',
            providedElements: ['Waar', 'ben', 'je', 'op dit moment', 'eigenlijk', 'naar', 'op zoek'],
            structureFormula: 'Waar + [persoonsvorm] + [onderwerp] + [modale bepaling] + naar + [predicaat / werkwoord]?',
            splittingStatus: 'natural-split-preferred',
            hint: 'Begin de vraag met "Waar" en zet "naar" vlak vóór het vaste predicaat "op zoek".',
          },
          target: 'Waar ben je op dit moment eigenlijk naar op zoek',
          acceptedAnswers: [
            'Waar ben je op dit moment eigenlijk naar op zoek',
            'Waar ben je op dit moment naar op zoek',
            'Waar zoek je op dit moment eigenlijk naar',
            'Waar ben je eigenlijk naar op zoek',
          ],
          explanation: '"Waar ... naar op zoek?" is far more idiomatic and natural than the formal "Waarnaar ben je op zoek?".',
        },
        {
          id: 'pronominal-split-d-3',
          kind: 'pronominal-splitting-drill',
          prompt: 'Daar + Aan: Fronted topic for emphasis with negation and modal verb',
          skills: ['production', 'grammar'],
          pronominalSplittingData: {
            rWord: 'daar',
            preposition: 'aan',
            combinedForm: 'daaraan',
            clauseType: 'fronted-topic',
            contextPrompt: 'Het management kan helaas geen enkele verandering meer aanbrengen in deze situatie.',
            providedElements: ['Daar', 'kan', 'het management', 'nu', 'helaas', 'niets meer', 'aan', 'veranderen'],
            structureFormula: 'Daar + kan + [Onderwerp] + [Tijd] + [Negatie/Modaal] + aan + veranderen',
            splittingStatus: 'mandatory-split',
            hint: 'Zet "Daar" vooraan voor nadruk, gevolgd door persoonsvorm en onderwerp, en plaats "aan" vlak vóór het infinitief "veranderen".',
          },
          target: 'Daar kan het management nu helaas niets meer aan veranderen',
          acceptedAnswers: [
            'Daar kan het management nu helaas niets meer aan veranderen',
            'Daar kan de directie nu helaas niets meer aan veranderen',
            'Daar kunnen we nu helaas niets meer aan veranderen',
            'Daar kan het management helaas niets meer aan veranderen',
          ],
          explanation: 'Topicalizing "Daar" at the start of the clause separates it from "aan", which lands right before the main verb.',
        },
        {
          id: 'pronominal-split-d-4',
          kind: 'pronominal-splitting-drill',
          prompt: 'Hier + Mee: Split "hiermee" in a subordinate clause (dat-constructie)',
          skills: ['production', 'grammar'],
          pronominalSplittingData: {
            rWord: 'hier',
            preposition: 'mee',
            combinedForm: 'hiermee',
            clauseType: 'subclause',
            contextPrompt: 'De projectleider stelt voor dat het team morgen direct begint met dit projectplan.',
            providedElements: ['dat', 'wij', 'hier', 'morgen', 'tijdens het overleg', 'direct', 'mee', 'aan de slag moeten gaan'],
            structureFormula: '... dat + [Onderwerp] + hier + [TMP-bepalingen] + mee + [werkwoordcluster]',
            splittingStatus: 'natural-split-preferred',
            hint: 'Plaats "hier" direct na het onderwerp "wij/we", en zet "mee" vlak vóór het werkwoordelijke gezegde "aan de slag moeten gaan".',
          },
          target: 'De projectleider stelt voor dat we hier morgen tijdens het overleg direct mee aan de slag gaan',
          acceptedAnswers: [
            'De projectleider stelt voor dat we hier morgen tijdens het overleg direct mee aan de slag gaan',
            'De projectleider stelt voor dat we hier morgen direct mee aan de slag gaan',
            'De projectleider stelt voor dat wij hier morgen tijdens het overleg direct mee aan de slag gaan',
            'De projectleider stelt voor dat we hier morgen tijdens de vergadering direct mee aan de slag gaan',
          ],
          explanation: 'In subordinate clauses, "hier" stays close to the subject while "mee" migrates to the pre-verbal cluster position.',
        },
        {
          id: 'pronominal-split-d-5',
          kind: 'pronominal-splitting-drill',
          prompt: 'Nergens + In: Indefinite pronominal adverb splitting with trust/confidence',
          skills: ['production', 'grammar'],
          pronominalSplittingData: {
            rWord: 'nergens',
            preposition: 'in',
            combinedForm: 'nergensin',
            clauseType: 'main-clause',
            contextPrompt: 'De verontruste aandeelhouders hebben na het schandaal geen enkel vertrouwen meer in het bestuur.',
            providedElements: ['De aandeelhouders', 'hebben', 'momenteel', 'nergens', 'meer', 'vertrouwen', 'in'],
            structureFormula: '[Onderwerp] + hebben + [Tijd] + nergens + meer + [Zelfstandig Naamwoord] + in',
            splittingStatus: 'mandatory-split',
            hint: 'Splits "nergens" en "in": "hebben nergens meer vertrouwen in".',
          },
          target: 'De bezorgde aandeelhouders hebben momenteel nergens meer vertrouwen in',
          acceptedAnswers: [
            'De bezorgde aandeelhouders hebben momenteel nergens meer vertrouwen in',
            'De aandeelhouders hebben momenteel nergens meer vertrouwen in',
            'De bezorgde aandeelhouders hebben nergens meer vertrouwen in',
            'De aandeelhouders hebben nu nergens meer vertrouwen in',
          ],
          explanation: '"Nergens" and "in" must be split: indefinite pronominal adverbs with "vertrouwen hebben in" separate naturally.',
        },
        {
          id: 'pronominal-split-d-6',
          kind: 'pronominal-splitting-drill',
          prompt: 'Ergens + Over: Indefinite pronominal adverb in a subclause with modal verbs',
          skills: ['production', 'grammar'],
          pronominalSplittingData: {
            rWord: 'ergens',
            preposition: 'over',
            combinedForm: 'ergensover',
            clauseType: 'subclause',
            contextPrompt: 'We zoeken een rustige vergaderruimte omdat we over een vertrouwelijk onderwerp moeten overleggen.',
            providedElements: ['omdat', 'we', 'ergens', 'in alle rust', 'over', 'moeten kunnen overleggen'],
            structureFormula: '... omdat + we + ergens + in alle rust + over + [moeten kunnen overleggen]',
            splittingStatus: 'natural-split-preferred',
            hint: 'Plaats "ergens" na "we", voeg de manierbepaling toe, en zet "over" direct vóór de werkwoordgroep.',
          },
          target: 'We zoeken een vergaderruimte omdat we ergens in alle rust over moeten kunnen overleggen',
          acceptedAnswers: [
            'We zoeken een vergaderruimte omdat we ergens in alle rust over moeten kunnen overleggen',
            'We zoeken een rustige ruimte omdat we ergens in alle rust over moeten kunnen overleggen',
            'We zoeken een vergaderruimte omdat we ergens rustig over moeten kunnen overleggen',
            'We zoeken een kantoor omdat we ergens in alle rust over moeten kunnen overleggen',
          ],
          explanation: '"Ergens ... over overleggen" splits smoothly inside a subordinate clause before the three-verb final cluster.',
        },
        {
          id: 'pronominal-split-d-7',
          kind: 'pronominal-splitting-drill',
          prompt: 'Overal + Naar: Universal pronominal adverb with past participle in perfect tense',
          skills: ['production', 'grammar'],
          pronominalSplittingData: {
            rWord: 'overal',
            preposition: 'naar',
            combinedForm: 'overalnaar',
            clauseType: 'main-clause',
            contextPrompt: 'Het rechercheteam heeft op alle mogelijke plekken gezocht naar de ontbrekende documenten.',
            providedElements: ['Het onderzoeksteam', 'heeft', 'gisteren', 'overal', 'grondig', 'naar', 'gezocht'],
            structureFormula: '[Onderwerp] + heeft + [Tijd] + overal + [Manier] + naar + gezocht',
            splittingStatus: 'mandatory-split',
            hint: 'Plaats "overal" in het middenveld, gevolgd door "grondig", en zet "naar" direct vóór "gezocht".',
          },
          target: 'Het onderzoeksteam heeft gisteren overal grondig naar gezocht',
          acceptedAnswers: [
            'Het onderzoeksteam heeft gisteren overal grondig naar gezocht',
            'Het rechercheteam heeft gisteren overal grondig naar gezocht',
            'Het team heeft gisteren overal grondig naar gezocht',
            'Het onderzoeksteam heeft overal grondig naar gezocht',
          ],
          explanation: '"Overal" and "naar" split across the midfield: "overal grondig naar gezocht".',
        },
        {
          id: 'pronominal-split-d-8',
          kind: 'pronominal-splitting-drill',
          prompt: 'Er + Tegen: Complex subclause with strong negation and prepositional object',
          skills: ['production', 'grammar'],
          pronominalSplittingData: {
            rWord: 'er',
            preposition: 'tegen',
            combinedForm: 'ertegen',
            clauseType: 'subclause',
            contextPrompt: 'De medewerkers protesteren fel omdat ze niet bestand zijn tegen de aanhoudende stress.',
            providedElements: ['aangezien', 'de betrokken medewerkers', 'er', 'absoluut niet', 'tegen', 'kunnen'],
            structureFormula: '... aangezien + [Onderwerp] + er + absoluut niet + tegen + kunnen',
            splittingStatus: 'natural-split-preferred',
            hint: 'Plaats "er" na het onderwerp, zet de ontkenning "absoluut niet" ertussen, en sluit af met "tegen kunnen".',
          },
          target: 'De medewerkers protesteren aangezien ze er absoluut niet tegen kunnen',
          acceptedAnswers: [
            'De medewerkers protesteren aangezien ze er absoluut niet tegen kunnen',
            'De medewerkers protesteren aangezien de betrokken medewerkers er absoluut niet tegen kunnen',
            'De werknemers protesteren aangezien ze er absoluut niet tegen kunnen',
            'De medewerkers maken bezwaar aangezien ze er absoluut niet tegen kunnen',
          ],
          explanation: 'In subclauses with negation: "...aangezien ze er (R-word) absoluut niet (Negation) tegen (Preposition) kunnen (Verb)".',
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Pronominal Fluency in Spontaneous Expression',
      kind: 'personalise',
      intro: 'Apply split pronominal adverbs in your own communicative scenarios. Formulate an authentic opinion, question, or workplace update.',
      exercises: [
        {
          id: 'pronominal-split-p-1',
          kind: 'personalise',
          prompt: 'Beschrijf een actueel project of dilemma uit jouw studie, werk of dagelijks leven. Gebruik minstens twee gespleten voornaamwoordelijke bijwoorden (bijv. "er ... over spreken", "waar ... naar zoeken", "daar ... aan twijfelen", "hier ... mee beginnen", "nergens ... in geloven").',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['erover', 'waarnaar', 'daaraan', 'hiermee', 'nergens in', 'overal naar', 'ergens voor'],
          grammar: ['voornaamwoordelijk-bijwoord', 'splitsing', 'middenveld-syntaxis'],
        },
      ],
    },
  ],
};

export const aspectualChapter: Chapter = {
  slug: 'aspectuele-werkwoorden-duurconstructies',
  level: 'B2',
  title: 'Aspectual Verbs, Posture Verbs & Progressive Aspect',
  capability: 'Express nuanced continuous duration, physical posture aspect (zitten/staan/liggen/lopen te), dynamic progressive (aan het + inf), imminent action (op het punt staan om te), customary habit (plegen te), and prospective developments (dreigen/beloven te).',
  description: 'Master the expressive aspectual system of Dutch: physical posture verbs (*zitten / staan / liggen / lopen / hangen te + infinitief*), dynamic progressive (*aan het + infinitief zijn*), imminent events (*op het punt staan om te*), formal customary aspect (*plegen te*), prospective danger/promise (*dreigen te / beloven te*), and the crucial Double Infinitive (IPP) rule in perfect tenses (*heeft zitten kijken*).',
  estimatedMinutes: 16,
  stages: [
    {
      id: 'discover',
      title: 'Aspectual Syntax & Durative Paradigms',
      kind: 'discover',
      intro: 'Unlike English which relies primarily on "-ing" forms, Dutch uses a rich, highly specific spectrum of aspectual constructions to indicate posture, duration, imminence, habit, and prospective outcome.',
      exercises: [
        {
          id: 'aspect-info-1',
          kind: 'info',
          prompt: 'The Spectrum of Dutch Aspectual Constructions',
          context: `1. Posture Durative Verbs (Houdingswerkwoorden + te + inf):
• "Zitten te + inf": De analist ZIT de rapporten TE bestuderen (at desk/table).
• "Staan te + inf": De reizigers STAAN op de bus TE wachten (upright).
• "Liggen te + inf": De patiënt LIGT in bed TE slapen (horizontal).
• "Lopen te + inf": Hij LOOPT zenuwachtig TE ijsberen (moving around / colloquial durative).

2. Dynamic Progressive (Aan het + inf zijn):
• "Zijn aan het + inf": Wij ZIJN momenteel het computersysteem AAN HET upgraden.

3. Imminent Action (Op het punt staan om te):
• "Op het punt staan om te + inf": De minister STAAT OP HET PUNT OM het akkoord TE ondertekenen.

4. Formal Customary / Habitual Aspect (Plegen te):
• "Plegen te + inf": Het bestuur PLEEGT jaarlijks in juli TE vergaderen.

5. Prospective Threat or Promise (Dreigen te / Beloven te):
• "Dreigen te + inf": De onderhandelingen DREIGEN volledig TE mislukken.
• "Beloven te + inf": Het project BELOOFT een groot succes TE worden.

6. The IPP Rule in Perfect Tenses (Double Infinitive):
• Posture verbs turn into INFINITIVES in the perfect tense: "Hij heeft uren ZITTEN KIJKEN" (NEVER: "heeft gezeten te kijken"!).`,
          skills: ['recognition', 'grammar'],
        },
        {
          id: 'aspect-induct-1',
          kind: 'induction',
          prompt: 'Discover the IPP Rule and Particle Use in Aspectual Constructions',
          inductionData: {
            examples: [
              { prompt: 'Present: Zij zit rustig een boek te lezen.', answer: 'Requires "te" before the main infinitive "lezen".' },
              { prompt: 'Progressive: Wij zijn de code aan het testen.', answer: '"aan het" is followed by an uninflected infinitive "testen".' },
              { prompt: 'Perfect tense: Hij heeft de hele ochtend naar het scherm zitten kijken.', answer: '"zitten" is used as an infinitive (IPP) and "te" is dropped.' },
            ],
            ruleChallenge: 'What happens to posture verbs (*zitten, staan, liggen, lopen*) when transformed into the perfect tense (voltooide tijd) with another verb?',
            options: [
              { text: 'They undergo the IPP rule (double infinitive): the posture participle becomes an infinitive and "te" is omitted (e.g. "heeft zitten kijken").', isCorrect: true },
              { text: 'They keep the past participle form and add "te" (e.g. "heeft gezeten te kijken").', isCorrect: false },
              { text: 'They must always be replaced by "aan het zijn geweest".', isCorrect: false },
              { text: 'They become passive participles with "worden".', isCorrect: false },
            ],
          },
          skills: ['analysis', 'grammar'],
          explanation: 'In the perfect tense, Dutch posture verbs trigger the Infinitivus Pro Participio (IPP) rule: "heeft zitten/staan/liggen/lopen + [infinitief]", omitting "te".',
        },
      ],
    },
    {
      id: 'understand',
      title: 'Contextual Scenario: Rotterdam Port Operations Center',
      kind: 'understand',
      intro: 'Analyze how an incident commander coordinates logistics during a storm, employing aspectual verbs to convey real-time status, impending risks, and procedures.',
      exercises: [
        {
          id: 'aspect-scenario-1',
          kind: 'reading',
          prompt: 'Identify the nuanced aspectual functions in situational coordination',
          readingContent: `Hoofdverkeersleider: "Team, we hebben een crisissituatie in havenbekken 4. Hoe staat het ervoor met de waterkering?"

Technicus: "Onze monteurs STAAN momenteel in de vrieskou TE sleutelen aan de hydraulische sluizen. Het waterpeil stijgt razendsnel en de kade DREIGT binnen een halfuur OVER TE LOPEN."

Hoofdverkeersleider: "En hoe zit het met de nooddiensten en pompen?"

Technicus: "Het brandweerkorps IS al ruim twee uur met man en macht water AAN HET wegpompen. De hoofdofficier STAAT OP HET PUNT OM evacuatieprotocol B in gang TE zetten."

Hoofdverkeersleider: "Goed. De havenautoriteit PLEEGT bij dit soort waterstanden direct de scheepvaart stil TE leggen. Onze data-analist heeft de hele nacht de getijdenmodellen ZITTEN BEREKENEN en zijn prognose BELOOFT weinig goeds TE voorspellen als we niet onmiddellijk handelen."`,
          skills: ['reading', 'grammar', 'pragmatic'],
          wordHints: {
            'staan te sleutelen': { meaning: 'standing outside actively repairing machinery', category: 'posture-durative' },
            'dreigt over te lopen': { meaning: 'is at imminent risk of overflowing / flooding', category: 'prospective-threat' },
            'aan het wegpompen': { meaning: 'continuously pumping away water', category: 'progressive' },
            'op het punt staan om te': { meaning: 'about to initiate at any second', category: 'imminent-aspect' },
            'pleegt stil te leggen': { meaning: 'customarily / by standard procedure halts', category: 'customary-aspect' },
            'zitten berekenen': { meaning: 'spent hours sitting calculating (IPP perfect tense)', category: 'ipp-aspect' },
          },
        },
      ],
    },
    {
      id: 'transform',
      title: 'Aspectual Production Drills',
      kind: 'transform',
      intro: 'Produce precise sentences using posture verbs, progressive structures, imminent actions, customary patterns, prospective verbs, and perfect IPP constructions.',
      exercises: [
        {
          id: 'aspect-d-1',
          kind: 'aspect-drill',
          prompt: 'Posture Durative (Zitten te): Desk-bound intense analysis',
          skills: ['production', 'grammar'],
          aspectData: {
            aspectCategory: 'posture-durative',
            postureOrAspectVerb: 'zitten te',
            infinitiveAction: 'bestuderen',
            contextPrompt: 'De financieel directeur zit geconcentreerd aan zijn bureau en analyseert de kwartaalcijfers grondig.',
            clauseType: 'main-clause',
            structureFormula: '[Onderwerp] + zit + [Middenveld] + te + bestuderen',
            hint: 'Gebruik "zit de kwartaalcijfers aandachtig te bestuderen".',
          },
          target: 'De financieel directeur zit de kwartaalcijfers aandachtig te bestuderen',
          acceptedAnswers: [
            'De financieel directeur zit de kwartaalcijfers aandachtig te bestuderen',
            'De directeur zit de kwartaalcijfers aandachtig te bestuderen',
            'De financieel directeur zit de kwartaalcijfers geconcentreerd te bestuderen',
            'De financieel directeur zit de cijfers aandachtig te bestuderen',
          ],
          explanation: '"Zitten te + infinitief" is the natural Dutch construction for prolonged activities carried out in a seated position.',
        },
        {
          id: 'aspect-d-2',
          kind: 'aspect-drill',
          prompt: 'Posture Durative (Staan te): Upright waiting in cold conditions',
          skills: ['production', 'grammar'],
          aspectData: {
            aspectCategory: 'posture-durative',
            postureOrAspectVerb: 'staan te',
            infinitiveAction: 'wachten',
            contextPrompt: 'De gefrustreerde reizigers bevinden zich al ruim een halfuur rechtop op het koude perron.',
            clauseType: 'main-clause',
            structureFormula: '[Onderwerp] + staan + [Tijd] + [Plaats] + te + wachten',
            hint: 'Gebruik "staan al ruim een halfuur in de kou op het perron te wachten".',
          },
          target: 'De reizigers staan al ruim een halfuur op het koude perron te wachten',
          acceptedAnswers: [
            'De reizigers staan al ruim een halfuur op het koude perron te wachten',
            'De reizigers staan al ruim een half uur op het koude perron te wachten',
            'De gefrustreerde reizigers staan al ruim een halfuur op het koude perron te wachten',
            'De reizigers staan al een halfuur op het koude perron te wachten',
          ],
          explanation: '"Staan te + infinitief" denotes an ongoing action performed while standing upright.',
        },
        {
          id: 'aspect-d-3',
          kind: 'aspect-drill',
          prompt: 'Dynamic Progressive (Aan het + inf zijn): Dynamic ongoing system task',
          skills: ['production', 'grammar'],
          aspectData: {
            aspectCategory: 'progressive-aan-het',
            postureOrAspectVerb: 'aan het ... zijn',
            infinitiveAction: 'upgraden',
            contextPrompt: 'Onze IT-specialisten voeren momenteel een complete vernieuwing uit van de serverbeveiliging.',
            clauseType: 'main-clause',
            structureFormula: '[Onderwerp] + zijn + [Tijd] + [Object] + aan het + upgraden',
            hint: 'Gebruik "zijn momenteel de serverbeveiliging grondig aan het upgraden".',
          },
          target: 'Onze IT-specialisten zijn momenteel de serverbeveiliging grondig aan het upgraden',
          acceptedAnswers: [
            'Onze IT-specialisten zijn momenteel de serverbeveiliging grondig aan het upgraden',
            'Onze IT-specialisten zijn momenteel de serverbeveiliging aan het upgraden',
            'Het IT-team is momenteel de serverbeveiliging grondig aan het upgraden',
            'Onze specialisten zijn momenteel de serverbeveiliging aan het upgraden',
          ],
          explanation: '"Aan het + infinitief zijn" expresses active dynamic progression without implying a specific body posture.',
        },
        {
          id: 'aspect-d-4',
          kind: 'aspect-drill',
          prompt: 'Imminent Action (Op het punt staan om te): Impending event at any second',
          skills: ['production', 'grammar'],
          aspectData: {
            aspectCategory: 'imminent-op-het-punt',
            postureOrAspectVerb: 'op het punt staan om te',
            infinitiveAction: 'openen',
            contextPrompt: 'De minister-president heeft de zaal betreden en zal over enkele seconden de persconferentie beginnen.',
            clauseType: 'main-clause',
            structureFormula: '[Onderwerp] + staat op het punt om + [Object] + te + openen',
            hint: 'Gebruik "staat op het punt om de persconferentie te openen".',
          },
          target: 'De minister-president staat op het punt om de persconferentie te openen',
          acceptedAnswers: [
            'De minister-president staat op het punt om de persconferentie te openen',
            'De premier staat op het punt om de persconferentie te openen',
            'De minister-president staat op het punt de persconferentie te openen',
            'De minister-president staat op het punt om de persconferentie te beginnen',
          ],
          explanation: '"Op het punt staan om te + inf" is the idiomatic Dutch way to describe an imminent occurrence.',
        },
        {
          id: 'aspect-d-5',
          kind: 'aspect-drill',
          prompt: 'Customary / Habitual Aspect (Plegen te): Formal recurring governance habit',
          skills: ['production', 'grammar'],
          aspectData: {
            aspectCategory: 'customary-plegen',
            postureOrAspectVerb: 'plegen te',
            infinitiveAction: 'vergaderen',
            contextPrompt: 'Het is de vaste traditie en gewoonte van de raad van commissarissen om tweemaal per jaar in besloten kring bijeen te komen.',
            clauseType: 'main-clause',
            structureFormula: '[Onderwerp] + pleegt + [Frequentie] + [Manier] + te + vergaderen',
            hint: 'Gebruik "pleegt tweemaal per jaar in besloten kring te vergaderen".',
          },
          target: 'De raad van commissarissen pleegt tweemaal per jaar in besloten kring te vergaderen',
          acceptedAnswers: [
            'De raad van commissarissen pleegt tweemaal per jaar in besloten kring te vergaderen',
            'De raad van bestuur pleegt tweemaal per jaar in besloten kring te vergaderen',
            'De commissarissen plegen tweemaal per jaar in besloten kring te vergaderen',
            'De raad van commissarissen pleegt twee keer per jaar in besloten kring te vergaderen',
          ],
          explanation: '"Plegen te + infinitief" expresses formal habitual aspect ("the habit / established practice of doing").',
        },
        {
          id: 'aspect-d-6',
          kind: 'aspect-drill',
          prompt: 'Prospective Threat (Dreigen te): Impending danger or failure',
          skills: ['production', 'grammar'],
          aspectData: {
            aspectCategory: 'prospective-dreigen-beloven',
            postureOrAspectVerb: 'dreigen te',
            infinitiveAction: 'mislukken',
            contextPrompt: 'Als gevolg van het wederzijdse wantrouwen dreigt de onderhandeling volledig in het water te vallen.',
            clauseType: 'main-clause',
            structureFormula: '[Onderwerp] + dreigen + [Oorzaak] + volledig + te + mislukken',
            hint: 'Gebruik "dreigen door het gebrek aan vertrouwen volledig te mislukken".',
          },
          target: 'De onderhandelingen dreigen door het gebrek aan vertrouwen volledig te mislukken',
          acceptedAnswers: [
            'De onderhandelingen dreigen door het gebrek aan vertrouwen volledig te mislukken',
            'De vastgelopen onderhandelingen dreigen door het gebrek aan vertrouwen volledig te mislukken',
            'De onderhandelingen dreigen door een gebrek aan vertrouwen volledig te mislukken',
            'De gesprekken dreigen door het gebrek aan vertrouwen volledig te mislukken',
          ],
          explanation: '"Dreigen te + infinitief" expresses an impending negative outcome or risk.',
        },
        {
          id: 'aspect-d-7',
          kind: 'aspect-drill',
          prompt: 'Prospective Promise (Beloven te): Promising positive future outlook',
          skills: ['production', 'grammar'],
          aspectData: {
            aspectCategory: 'prospective-dreigen-beloven',
            postureOrAspectVerb: 'beloven te',
            infinitiveAction: 'verlagen',
            contextPrompt: 'De revolutionaire zonneceltechnologie toont veelbelovende indicaties dat de energiekosten flink omlaag zullen gaan.',
            clauseType: 'main-clause',
            structureFormula: '[Onderwerp] + belooft + [Object] + aanzienlijk + te + verlagen',
            hint: 'Gebruik "belooft de energiekosten aanzienlijk te verlagen".',
          },
          target: 'De nieuwe technologie belooft de energiekosten aanzienlijk te verlagen',
          acceptedAnswers: [
            'De nieuwe technologie belooft de energiekosten aanzienlijk te verlagen',
            'De innovatieve technologie belooft de energiekosten aanzienlijk te verlagen',
            'De nieuwe duurzame technologie belooft de energiekosten aanzienlijk te verlagen',
            'De nieuwe technologie belooft de totale energiekosten aanzienlijk te verlagen',
          ],
          explanation: '"Beloven te + infinitief" conveys a promising and optimistic prospective outcome.',
        },
        {
          id: 'aspect-d-8',
          kind: 'aspect-drill',
          prompt: 'Posture Verb in Perfect Tense with IPP (Double Infinitive)',
          skills: ['production', 'grammar'],
          aspectData: {
            aspectCategory: 'perfect-posture-ipp',
            postureOrAspectVerb: 'heeft zitten kijken',
            infinitiveAction: 'kijken',
            contextPrompt: 'De rechercheur heeft de afgelopen nacht urenlang achter het computerscherm naar de camerabeelden gekeken.',
            clauseType: 'perfect-tense-ipp',
            structureFormula: '[Onderwerp] + heeft + [Tijd] + [Voorzetselvoorwerp] + zitten + kijken',
            hint: 'Pas de IPP-regel toe: gebruik "heeft zitten kijken" (geen "gezeten" en geen "te").',
          },
          target: 'De rechercheur heeft de hele nacht naar de camerabeelden zitten kijken',
          acceptedAnswers: [
            'De rechercheur heeft de hele nacht naar de camerabeelden zitten kijken',
            'De rechercheur heeft de hele nacht naar de videobeelden zitten kijken',
            'De rechercheur heeft urenlang naar de camerabeelden zitten kijken',
            'De rechercheur heeft de hele nacht aandachtig naar de camerabeelden zitten kijken',
          ],
          explanation: 'Crucial Dutch IPP rule: In perfect tenses, posture verbs drop "ge-" and "te", appearing as double infinitives: "heeft zitten kijken".',
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Aspectual Nuance in Your Everyday Communication',
      kind: 'personalise',
      intro: 'Narrate a situation from your day or professional routine with vivid aspectual nuance.',
      exercises: [
        {
          id: 'aspect-p-1',
          kind: 'personalise',
          prompt: 'Beschrijf wat jij of je team vandaag of deze week hebben gedaan of van plan zijn te doen. Gebruik minstens twee aspectuele constructies (bijv. "zitten/staan te + inf", "aan het + inf zijn", "op het punt staan om te", "heeft zitten/staan + inf", "dreigen te / beloven te").',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['zitten te', 'staan te', 'liggen te', 'aan het', 'op het punt staan', 'plegen te', 'dreigen te', 'beloven te'],
          grammar: ['aspectuele-werkwoorden', 'duurconstructies', 'ipp-regel', 'houdingswerkwoorden'],
        },
      ],
    },
  ],
};

export const modalParticlesChapter: Chapter = {
  slug: 'modale-partikels-schakering',
  level: 'B2',
  title: 'Modal Particle Combinations & Pragmatic Shading',
  capability: 'Layer and position Dutch modal particles (wel, toch, maar, eens, even, nou, immers, clusters like toch maar eens, nou eenmaal, wel degelijk, dan maar, eens even, maar beter) in the inner midfield to express stance, reassurance, conviction, and pragmatic naturalness.',
  description: 'Master the pragmatic soul of Dutch discourse: modal particles and shading (*schakeringspartikels*). Learn how native speakers convey subtle stance, soften directives, assert undeniable facts against doubt (*wel degelijk*), concede inevitable realities (*nou eenmaal*), adapt plans prudently (*toch maar / maar beter*), and suggest actions tactfully (*toch maar eens even*) within the inner midfield.',
  estimatedMinutes: 16,
  stages: [
    {
      id: 'discover',
      title: 'Modal Particle Systems & Syntactic Placement',
      kind: 'discover',
      intro: 'In Dutch, modal particles (*schakeringspartikels*) are essential for sounding authentic, cooperative, and nuanced. Without them, statements often sound overly blunt, dry, or aggressive.',
      exercises: [
        {
          id: 'modal-part-info-1',
          kind: 'info',
          prompt: 'The Core Modal Particle Matrix & Stacking Rules',
          context: `1. Rebuttal & Firm Assertion (Wel vs. Wel degelijk):
• "Hij heeft WEL gelijk." (Affirmation / contrary to belief)
• "Het team heeft WEL DEGELIJK aan alle eisen voldaan." (Forceful confirmation against skepticism)

2. Inescapable Reality & Resignation (Nou eenmaal / Nu eenmaal):
• "In het zakenleven lopen de zaken NOU EENMAAL niet altijd volgens plan." (That is simply how things are)

3. Prudent Reconsideration & Concession (Toch maar / Maar beter):
• "We kunnen de vergadering TOCH MAAR BETER uitstellen." (After reflection, this is the wiser course)

4. Softened Directives & Polite Inquiry (Eens / Even / Eens even):
• "Zou je daar vanmiddag EENS EVEN naar willen kijken?" (Turns a demand into a polite collaborative ask)

5. Tactful Urgency & Collective Action (Toch maar eens / Toch maar eens even):
• "We moeten HIER TOCH MAAR EENS EVEN over praten." (Stacked particles: tactful yet resolute prompt)

6. Reluctant Alternative (Dan maar):
• "Als de trein niet rijdt, gaan we DAN MAAR met de auto." (Accepting the next best option)

7. Shared Background Knowledge (Immers):
• "We moeten zorgvuldig zijn; het is IMMERS een complex dossier." (As you and I both know)

8. Midfield Position:
Modal particles belong in the INNER MIDFIELD: immediately after the finite verb / subject pronoun, and BEFORE adverbials of time, manner, place, and objects!`,
          skills: ['recognition', 'grammar', 'pragmatic'],
        },
        {
          id: 'modal-part-induct-1',
          kind: 'induction',
          prompt: 'Discover the Syntactic Slot and Pragmatic Function of Modal Particle Clusters',
          inductionData: {
            examples: [
              { prompt: 'Direct/Blunt: "We moeten over het budget praten."', answer: 'Sounds like an ultimatum or strict command.' },
              { prompt: 'Pragmatic Dutch: "We moeten hier [toch maar eens even] over praten."', answer: 'Stacked cluster softens the tone, making it cooperative yet urgent.' },
              { prompt: 'Midfield Placement: "De directie heeft [wel degelijk] rekening gehouden met de risico\'s."', answer: 'Particle cluster sits directly after finite auxiliary "heeft", before object "rekening".' },
            ],
            ruleChallenge: 'Where do modal particle clusters (e.g. "toch maar eens", "wel degelijk", "nou eenmaal") sit in a Dutch clause?',
            options: [
              { text: 'In the inner midfield, directly after the finite verb or subject pronoun, before adverbials and objects.', isCorrect: true },
              { text: 'Always at the very end of the clause after the final infinitive.', isCorrect: false },
              { text: 'At the very beginning of the sentence before the subject.', isCorrect: false },
              { text: 'Attached directly to the direct object noun phrase.', isCorrect: false },
            ],
          },
          skills: ['analysis', 'grammar', 'pragmatic'],
          explanation: 'Modal particles occupy the inner midfield right after the finite verb/subject pronoun, injecting tone, attitude, and nuance into the entire clause.',
        },
      ],
    },
    {
      id: 'understand',
      title: 'Contextual Scenario: Strategic Executive Alignment',
      kind: 'understand',
      intro: 'Observe how two senior directors, Merel and Bram, navigate a delicate timeline negotiation using modal particles to express firmness, tactical softness, and realism.',
      exercises: [
        {
          id: 'modal-part-scenario-1',
          kind: 'reading',
          prompt: 'Analyze the pragmatic shading in authentic professional negotiation',
          readingContent: `Merel: "Bram, de aandeelhouders maken zich zorgen over de vertraging van de productlancering. Ze beweren dat we de marktsituatie hebben onderschat."

Bram: "Dat is niet terecht. Onze analisten hebben de marktontwikkelingen WEL DEGELIJK nauwkeurig in kaart gebracht. Maar door de onverwachte chiptekorten kunnen we NOU EENMAAL niet sneller leveren."

Merel: "Ik begrijp het dilemma. Toch moeten we naar buiten toe helder communiceren. Zou jij vanmiddag EENS EVEN een beknopte toelichting voor de pers kunnen opstellen?"

Bram: "Zeker. Maar gezien de onrust op de beurs kunnen we de presentatie TOCH MAAR BETER met een week vervroegen. Laten we DAAR TOCH MAAR EENS EVEN goed over overleggen."

Merel: "Eens. Als de voorzitter vandaag niet kan aanschuiven, hakken wij met z'n tweeën DAN MAAR de knoop door. Het betreft IMMERS een kwestie van acuut reputatiemanagement."`,
          skills: ['reading', 'grammar', 'pragmatic'],
          wordHints: {
            'wel degelijk': { meaning: 'most definitely / absolutely in contrast to skepticism', category: 'modal-particle' },
            'nou eenmaal': { meaning: 'simply an unavoidable reality', category: 'modal-particle' },
            'eens even': { meaning: 'just take a quick polite look / examine', category: 'modal-particle' },
            'toch maar beter': { meaning: 'prudently better after reconsideration', category: 'modal-particle' },
            'toch maar eens even': { meaning: 'tactfully yet firmly address now', category: 'modal-particle' },
            'dan maar': { meaning: 'settle for that alternative in the meantime', category: 'modal-particle' },
            'immers': { meaning: 'after all / as we both know', category: 'modal-particle' },
          },
        },
      ],
    },
    {
      id: 'transform',
      title: 'Modal Particle Production Drills',
      kind: 'transform',
      intro: 'Produce natural Dutch sentences by weaving modal particle clusters into their proper syntactic slots in the midfield.',
      exercises: [
        {
          id: 'modal-p-d1',
          kind: 'modal-particle-drill',
          prompt: 'Rebuttal & Confident Confirmation (Wel degelijk): Defending compliance',
          skills: ['production', 'pragmatic', 'grammar'],
          modalParticleData: {
            particleCluster: 'wel degelijk',
            pragmaticFunction: 'rebuttal-wel-degelijk',
            stiffOriginalSentence: 'Het management heeft rekening gehouden met de bezwaren.',
            contextPrompt: 'Een auditor beweert dat de bezwaren van het personeel zijn genegeerd. Reageer met krachtige bevestiging dat hier wel degelijk terdege rekening mee is gehouden.',
            structureFormula: '[Onderwerp] + heeft + wel degelijk + [Voorzetselvoorwerp/Object] + [Deelwoord]',
            syntacticSlotHint: 'Plaats "wel degelijk" direct na het hulpwerkwoord "heeft".',
            hint: 'Gebruik "heeft wel degelijk rekening gehouden met de bezwaren van de medewerkers".',
          },
          target: 'Het management heeft wel degelijk rekening gehouden met de bezwaren van het personeel',
          acceptedAnswers: [
            'Het management heeft wel degelijk rekening gehouden met de bezwaren van het personeel',
            'Het management heeft wel degelijk rekening gehouden met de bezwaren van de medewerkers',
            'De directie heeft wel degelijk rekening gehouden met de bezwaren van het personeel',
            'Wij hebben wel degelijk rekening gehouden met de bezwaren van het personeel',
          ],
          explanation: '"Wel degelijk" confirms an undeniable fact against doubt or denial, situated directly in the inner midfield.',
        },
        {
          id: 'modal-p-d2',
          kind: 'modal-particle-drill',
          prompt: 'Inescapable Reality / Resignation (Nou eenmaal): Market volatility',
          skills: ['production', 'pragmatic', 'grammar'],
          modalParticleData: {
            particleCluster: 'nou eenmaal',
            pragmaticFunction: 'inevitability-nou-eenmaal',
            stiffOriginalSentence: 'In een dynamische markt veranderen de omstandigheden voortdurend.',
            contextPrompt: 'Verklaar waarom een strategie moet worden aangepast: in een concurrerende markt veranderen economische omstandigheden nu eenmaal onvermijdelijk.',
            structureFormula: '[Aanloop] + veranderen + [Onderwerp] + nou eenmaal + [Bijwoord]',
            syntacticSlotHint: 'Plaats "nou eenmaal" na het onderwerp in de geïnverteerde hoofdzin.',
            hint: 'Gebruik "veranderen de omstandigheden nou eenmaal voortdurend".',
          },
          target: 'In een dynamische markt veranderen de economische omstandigheden nou eenmaal voortdurend',
          acceptedAnswers: [
            'In een dynamische markt veranderen de economische omstandigheden nou eenmaal voortdurend',
            'In een concurrerende markt veranderen de omstandigheden nou eenmaal voortdurend',
            'In een dynamische economie veranderen de omstandigheden nou eenmaal voortdurend',
            'In een dynamische markt veranderen de omstandigheden nu eenmaal voortdurend',
          ],
          explanation: '"Nou eenmaal" (or "nu eenmaal") introduces the pragmatic recognition that a reality is unchangeable.',
        },
        {
          id: 'modal-p-d3',
          kind: 'modal-particle-drill',
          prompt: 'Concession & Prudent Change of Plan (Toch maar): Safety precaution',
          skills: ['production', 'pragmatic', 'grammar'],
          modalParticleData: {
            particleCluster: 'toch maar beter',
            pragmaticFunction: 'concession-toch-maar',
            stiffOriginalSentence: 'Gezien de hevige storm moeten we het buitenevenement annuleren.',
            contextPrompt: 'Na het zien van de weerswaarschuwing besluit het organisatiecomité na rijp beraad dat het toch maar beter is om het evenement te verplaatsen.',
            structureFormula: '[Aanloop] + kunnen + we + [Object] + toch maar beter + [Werkwoord]',
            syntacticSlotHint: 'Plaats "toch maar beter" in het middenveld vóór het hoofdwerkwoord.',
            hint: 'Gebruik "kunnen we het evenement toch maar beter verplaatsen".',
          },
          target: 'Gezien de hevige storm kunnen we het buitenevenement toch maar beter verplaatsen',
          acceptedAnswers: [
            'Gezien de hevige storm kunnen we het buitenevenement toch maar beter verplaatsen',
            'Gezien de hevige storm kunnen we het evenement toch maar beter verplaatsen',
            'Gezien de storm kunnen we het buitenevenement toch maar beter verplaatsen',
            'Gezien de slechte weersverwachting kunnen we het evenement toch maar beter verplaatsen',
          ],
          explanation: '"Toch maar (beter)" signals a thoughtful adjustment of initial intentions towards the wiser decision.',
        },
        {
          id: 'modal-p-d4',
          kind: 'modal-particle-drill',
          prompt: 'Tactful Recommendation & Action (Toch maar eens even): Budget review',
          skills: ['production', 'pragmatic', 'grammar'],
          modalParticleData: {
            particleCluster: 'toch maar eens even',
            pragmaticFunction: 'tactful-urgency-toch-maar-eens',
            stiffOriginalSentence: 'We moeten over de herverdeling van het budget praten.',
            contextPrompt: 'Stel op een collegiale maar doelgerichte wijze voor dat het team vandaag toch maar eens even de tijd moet nemen om het projectbudget te herzien.',
            structureFormula: 'We + moeten + hier + toch maar eens even + [Voorzetselvoorwerp] + over + praten',
            syntacticSlotHint: 'Plaats de cluster "toch maar eens even" na "moeten we" of "moeten we hier".',
            hint: 'Gebruik "moeten hier toch maar eens even over praten" of "moeten toch maar eens even over de begroting praten".',
          },
          target: 'We moeten toch maar eens even over de herverdeling van het budget praten',
          acceptedAnswers: [
            'We moeten toch maar eens even over de herverdeling van het budget praten',
            'We moeten hier toch maar eens even over de herverdeling van het budget praten',
            'We moeten toch maar eens even over het budget praten',
            'Wij moeten toch maar eens even over de herverdeling van de middelen praten',
          ],
          explanation: '"Toch maar eens even" layers concession (toch), prudence (maar), occasion (eens), and brevity (even) to make an urgent prompt sound collaborative.',
        },
        {
          id: 'modal-p-d5',
          kind: 'modal-particle-drill',
          prompt: 'Reluctant Acceptance of Alternative (Dan maar): Moving online',
          skills: ['production', 'pragmatic', 'grammar'],
          modalParticleData: {
            particleCluster: 'dan maar',
            pragmaticFunction: 'reluctant-alternative-dan-maar',
            stiffOriginalSentence: 'Als de conferentiezaal bezet is, houden we de bijeenkomst online.',
            contextPrompt: 'De gewenste vergaderzaal is niet beschikbaar. Schik je in de situatie en stel voor de bijeenkomst dan maar digitaal te organiseren.',
            structureFormula: '[Bijzin met als] + houden + we + de bijeenkomst + dan maar + online',
            syntacticSlotHint: 'Plaats "dan maar" in het middenveld na het lijdend voorwerp.',
            hint: 'Gebruik "houden we de bijeenkomst dan maar online".',
          },
          target: 'Als de conferentiezaal bezet is, houden we de bijeenkomst dan maar online',
          acceptedAnswers: [
            'Als de conferentiezaal bezet is, houden we de bijeenkomst dan maar online',
            'Als de zaal bezet is, houden we de vergadering dan maar online',
            'Als de conferentieruimte bezet is, houden we de bijeenkomst dan maar online',
            'Als de zaal niet beschikbaar is, houden we de bijeenkomst dan maar online',
          ],
          explanation: '"Dan maar" expresses practical resignation when accepting the second-choice solution.',
        },
        {
          id: 'modal-p-d6',
          kind: 'modal-particle-drill',
          prompt: 'Shared Obvious Premise / Knowledge (Immers): Confidential data',
          skills: ['production', 'pragmatic', 'grammar'],
          modalParticleData: {
            particleCluster: 'immers',
            pragmaticFunction: 'shared-premise-immers',
            stiffOriginalSentence: 'We moeten discreet handelen omdat het vertrouwelijke data betreft.',
            contextPrompt: 'Herinner een teamlid eraan dat voorzichtigheid geboden is; het betreft immers strikt vertrouwelijke patiëntgegevens.',
            structureFormula: 'We + moeten + discreet handelen; + het + betreft + immers + [Object]',
            syntacticSlotHint: 'Plaats "immers" direct na de persoonsvorm "betreft" in de tweede hoofdzin.',
            hint: 'Gebruik "het betreft immers zeer gevoelige bedrijfsinformatie" of "vertrouwelijke gegevens".',
          },
          target: 'We moeten discreet handelen; het betreft immers zeer gevoelige bedrijfsinformatie',
          acceptedAnswers: [
            'We moeten discreet handelen; het betreft immers zeer gevoelige bedrijfsinformatie',
            'We moeten uiterst discreet handelen; het betreft immers zeer gevoelige bedrijfsinformatie',
            'We moeten voorzichtig zijn; het betreft immers vertrouwelijke informatie',
            'We moeten discreet handelen, het betreft immers gevoelige bedrijfsinformatie',
          ],
          explanation: '"Immers" situates the explanation as an established, mutually known fact ("after all / as you know").',
        },
        {
          id: 'modal-p-d7',
          kind: 'modal-particle-drill',
          prompt: 'Softened Polite Request (Eens even): Document review',
          skills: ['production', 'pragmatic', 'grammar'],
          modalParticleData: {
            particleCluster: 'eens even',
            pragmaticFunction: 'softened-inquiry-eens-even',
            stiffOriginalSentence: 'Wil je naar mijn conceptverslag kijken?',
            contextPrompt: 'Vraag een drukke leidinggevende beleefd of hij of zij vanmiddag even snel een blik op jouw conceptrapport kan werpen.',
            structureFormula: 'Zou + je + vanmiddag + eens even + naar + [Object] + willen + kijken?',
            syntacticSlotHint: 'Plaats "eens even" na de tijdsbepaling "vanmiddag" en vóór het voorzetselvoorwerp.',
            hint: 'Gebruik "Zou je vanmiddag eens even naar mijn conceptverslag willen kijken?".',
          },
          target: 'Zou je vanmiddag eens even naar mijn conceptverslag willen kijken',
          acceptedAnswers: [
            'Zou je vanmiddag eens even naar mijn conceptverslag willen kijken',
            'Zou je vanmiddag eens even naar mijn conceptverslag willen kijken?',
            'Zou je vanmiddag eens even naar mijn rapport willen kijken',
            'Kun je vanmiddag eens even naar mijn conceptverslag kijken',
          ],
          explanation: '"Eens even" minimizes the perceived burden on the listener, creating a considerate and professional Dutch request.',
        },
        {
          id: 'modal-p-d8',
          kind: 'modal-particle-drill',
          prompt: 'Strong Advisory Prudence (Maar beter): Sensitive communication',
          skills: ['production', 'pragmatic', 'grammar'],
          modalParticleData: {
            particleCluster: 'maar beter',
            pragmaticFunction: 'advisory-caution-maar-beter',
            stiffOriginalSentence: 'Verstuur die boze e-mail niet.',
            contextPrompt: 'Adviseer een geëmotioneerde collega dat hij of zij die gevoelige reactie nu maar beter niet direct kan versturen.',
            structureFormula: 'Je + kunt + die gevoelige reactie + nu + maar beter + niet + direct + versturen',
            syntacticSlotHint: 'Plaats "maar beter" vóór de negatie "niet" in het middenveld.',
            hint: 'Gebruik "kun je nu maar beter niet direct versturen".',
          },
          target: 'Je kunt die gevoelige reactie nu maar beter niet direct versturen',
          acceptedAnswers: [
            'Je kunt die gevoelige reactie nu maar beter niet direct versturen',
            'Je kunt die e-mail nu maar beter niet direct versturen',
            'Je kunt die emotionele reactie nu maar beter niet direct versturen',
            'Je kunt die gevoelige e-mail nu maar beter niet meteen versturen',
          ],
          explanation: '"Maar beter" combines the softening effect of "maar" with the comparative wisdom of "beter" to deliver sound caution.',
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Pragmatic Nuance in Your Professional Communication',
      kind: 'personalise',
      intro: 'Describe a complex, delicate, or unexpected situation from your work, study, or daily life, weaving at least two modal particle clusters into your Dutch response.',
      exercises: [
        {
          id: 'modal-p-pers-1',
          kind: 'personalise',
          prompt: 'Beschrijf een recente uitdaging, meningsverschil of planwijziging uit jouw studie of werk. Gebruik minstens twee modale partikelcombinaties (bijv. "wel degelijk", "nou eenmaal", "toch maar beter", "toch maar eens even", "dan maar", "immers", "eens even").',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['wel degelijk', 'nou eenmaal', 'toch maar', 'eens even', 'dan maar', 'immers', 'maar beter'],
          grammar: ['modale-partikels', 'schakeringspartikels', 'middenveld-volgorde', 'pragmatische-competentie'],
        },
      ],
    },
  ],
};

export const topicalisationChapter: Chapter = {
  slug: 'topicalisatie-en-focus',
  level: 'B2',
  title: 'Focus Fronting, Topicalisation & Emphatic Inversion',
  capability: 'Structure Dutch sentences dynamically using focus fronting (direct/indirect objects), infinitive topicalisation with auxiliary doen, participle fronting, left-dislocation with resumptive pronouns, cleft focus constructions, and inverted conditional mocht.',
  description: 'Master Dutch information packaging and focus syntax (*topicalisatie en focusconstructies*). Move beyond basic SVO word order by fronting key constituents for dramatic or contrastive emphasis, employing dummy auxiliary *doen* with fronted infinitives, maintaining strict V2 inversion, utilizing resumptive pronouns (*die / dat*), and building cleft focus sentences (*het is... dat/die*).',
  estimatedMinutes: 16,
  stages: [
    {
      id: 'discover',
      title: 'Focus Architecture & Syntactic Inversion',
      kind: 'discover',
      intro: 'Dutch syntax allows remarkable flexibility to highlight specific information. By moving constituents to the first position (topicalisation) or using left-dislocation and clefts, speakers signal contrast, priority, and focus.',
      exercises: [
        {
          id: 'topical-info-1',
          kind: 'info',
          prompt: 'The Six Core Dutch Focus & Topicalisation Paradigms',
          context: `1. Object Fronting & Strict V2 Inversion:
• Neutraal: "We hebben DAT rapport gisteren unaniem goedgekeurd."
• Focus op object: "DÁT rapport hebben we gisteren unaniem goedgekeurd." (Verb in position 2, subject in 3)

2. Infinitive Fronting with Dummy Auxiliary "Doen":
• Neutraal: "Ik twijfel niet aan zijn integriteit."
• Emfatische focus op handeling: "TWIJFELEN DOE ik geen seconde aan zijn integriteit!"

3. Participle Fronting for Contrast:
• "GELEZEN heeft de commissie het voorstel wel, maar GOEDGEKEURD nog niet." (Highlighting incomplete stages)

4. Left-Dislocation with Resumptive Pronouns (Links-verplaatsing):
• "Die nieuwe veiligheidsrichtlijnen, DIE moeten we vanaf morgen strikt handhaven." (Noun phrase outside clause frame + resumptive pronoun "die/dat")

5. Cleft Focus Sentences (Het is... dat / die):
• Adverbial/Causal focus: "Het is JUIST door die innovatie DAT we marktleider zijn geworden."
• Personal subject focus: "Het was ONZE DIRECTEUR DIE het initiatief nam."

6. Inverted Conditional Focus with "Mocht" (Zonder "als"):
• "MOCHT de situatie veranderen, laat het ons dan direct weten." (Elevated stylistic condition)`,
          skills: ['recognition', 'grammar'],
        },
        {
          id: 'topical-induct-1',
          kind: 'induction',
          prompt: 'Discover the Dummy Auxiliary Rule in Infinitive Topicalisation',
          inductionData: {
            examples: [
              { prompt: 'Neutrale zin: "Ik weet het antwoord niet zeker."', answer: 'Standard verb position.' },
              { prompt: 'Infinitive fronted: "[Weten] [doe] ik het niet zeker, maar vermoeden wel."', answer: 'Fronting the bare infinitive "Weten" triggers the dummy auxiliary "doe" in V2 position.' },
              { prompt: 'Participle fronted: "[Gezien] [heb] ik hem vandaag niet."', answer: 'Participle fronting uses the normal auxiliary "heb" without "doen".' },
            ],
            ruleChallenge: 'What happens when a bare infinitive verb is fronted to the start of a main clause for contrastive focus in Dutch?',
            options: [
              { text: 'It triggers the conjugated dummy auxiliary verb "doen" in second position (e.g. "Weten doe ik het niet").', isCorrect: true },
              { text: 'The finite verb simply precedes the subject without any auxiliary.', isCorrect: false },
              { text: 'The sentence must switch to a passive voice construction with "worden".', isCorrect: false },
              { text: 'The infinitive must be preceded by "om te".', isCorrect: false },
            ],
          },
          skills: ['analysis', 'grammar'],
          explanation: 'Topicalizing a bare infinitive requires the supportive dummy auxiliary verb "doen" in second position: "[Infinitief] + doe/doet/doen + [onderwerp]...".',
        },
      ],
    },
    {
      id: 'understand',
      title: 'Contextual Scenario: Municipal Council Urban Hearing',
      kind: 'understand',
      intro: 'Analyze how Alderman Visser and Chief Architect Lindeman use emphatic topicalisation, left-dislocation, and cleft focus in a spirited public hearing on city expansion.',
      exercises: [
        {
          id: 'topical-scenario-1',
          kind: 'reading',
          prompt: 'Identify the sophisticated focus fronting and emphatic structures in debate',
          readingContent: `Wethouder Visser: "Geachte commissieleden, we staan voor een ingrijpende beslissing over de herinrichting van het stationsgebied. DÁT ambitieuze project hebben we gisteren uitvoerig met alle wijkraden besproken."

Architect Lindeman: "Zeker, wethouder. En TWIJFELEN DOE ik geen moment aan het maatschappelijk belang van deze transformatie. Maar die historische gevels aan de noordzijde, DIE mogen we simpelweg niet slopen."

Wethouder Visser: "GEZIEN hebben we die architectonische bezwaren zeker, maar ONOPLOSBAAR zijn ze allerminst. Het is JUIST door een slimme combinatie van restauratie en nieuwbouw DAT we beide doelen kunnen verenigen."

Architect Lindeman: "Dat klinkt veelbelovend. Maar het was ONZE ERFGOEDCOMMISSIE DIE terecht waarschuwde voor overhaaste besluitvorming. MOCHT het budget ontoereikend blijken, laten we dan nu alvast een faseringsplan vastleggen."`,
          skills: ['reading', 'grammar', 'pragmatic'],
          wordHints: {
            'dát project hebben we': { meaning: 'direct object fronted for topical prominence', category: 'topicalisation' },
            'twijfelen doe ik': { meaning: 'infinitive fronting with dummy auxiliary doen', category: 'topicalisation' },
            'die gevels, die mogen we': { meaning: 'left-dislocation with resumptive pronoun die', category: 'left-dislocation' },
            'het is juist door... dat': { meaning: 'cleft sentence focusing on the causal means', category: 'cleft-sentence' },
            'mocht het budget ontoereikend blijken': { meaning: 'inverted conditional clause without als', category: 'inversion' },
          },
        },
      ],
    },
    {
      id: 'transform',
      title: 'Focus & Topicalisation Production Drills',
      kind: 'transform',
      intro: 'Formulate emphatic sentences applying object fronting, infinitive topicalisation with doen, participle contrast, resumptive pronouns, cleft frames, and inverted conditionals.',
      exercises: [
        {
          id: 'topical-d1',
          kind: 'topicalisation-drill',
          prompt: 'Direct Object Fronting with V2 Inversion: Crucial policy report',
          skills: ['production', 'grammar'],
          topicalisationData: {
            focusType: 'object-fronting-v2',
            frontedElement: 'Dát cruciale beleidsrapport',
            baseSentence: 'We hebben dat cruciale beleidsrapport gisteren unaniem goedgekeurd.',
            contextPrompt: 'Benadruk het lijdend voorwerp door "Dát cruciale beleidsrapport" vooraan te plaatsen en pas strikte V2 inversie toe.',
            structureFormula: 'Dát cruciale beleidsrapport + hebben + we + [Tijd] + [Manier] + goedgekeurd',
            hint: 'Plaats het hulpwerkwoord "hebben" direct na het vooropgezette lijdend voorwerp.',
          },
          target: 'Dát cruciale beleidsrapport hebben we gisteren unaniem goedgekeurd',
          acceptedAnswers: [
            'Dát cruciale beleidsrapport hebben we gisteren unaniem goedgekeurd',
            'Dat cruciale beleidsrapport hebben we gisteren unaniem goedgekeurd',
            'Dat belangrijke beleidsrapport hebben we gisteren unaniem goedgekeurd',
            'Dát beleidsrapport hebben we gisteren unaniem goedgekeurd',
          ],
          explanation: 'Fronting the direct object for emphasis requires the finite verb in second position (V2), followed immediately by the subject.',
        },
        {
          id: 'topical-d2',
          kind: 'topicalisation-drill',
          prompt: 'Infinitive Fronting with Auxiliary Doen: Emphatic trust',
          skills: ['production', 'grammar'],
          topicalisationData: {
            focusType: 'infinitive-fronting-doen',
            frontedElement: 'Twijfelen',
            baseSentence: 'Ik twijfel geen moment aan de deskundigheid van ons team.',
            contextPrompt: 'Zet de handeling "Twijfelen" krachtig voorop met het hulpwerkwoord "doen" om te benadrukken dat twijfel uitgesloten is.',
            structureFormula: 'Twijfelen + doe + ik + [Bepaling] + aan + [Object]',
            hint: 'Gebruik "Twijfelen doe ik geen moment aan de deskundigheid van ons team".',
          },
          target: 'Twijfelen doe ik geen moment aan de deskundigheid van ons team',
          acceptedAnswers: [
            'Twijfelen doe ik geen moment aan de deskundigheid van ons team',
            'Twijfelen doe ik geen seconde aan de deskundigheid van ons team',
            'Twijfelen doe ik absoluut niet aan de deskundigheid van ons team',
            'Twijfelen doe ik niet aan de deskundigheid van ons team',
          ],
          explanation: 'Topicalizing a bare infinitive requires the dummy auxiliary verb "doen" in V2 position ("Twijfelen doe ik...").',
        },
        {
          id: 'topical-d3',
          kind: 'topicalisation-drill',
          prompt: 'Participle Fronting for Contrast: Read but not yet approved',
          skills: ['production', 'grammar'],
          topicalisationData: {
            focusType: 'participle-fronting',
            frontedElement: 'Gelezen',
            baseSentence: 'De directie heeft het document wel gelezen, maar nog niet goedgekeurd.',
            contextPrompt: 'Plaats het voltooid deelwoord "Gelezen" vooraan om een scherp contrast te schetsen tussen wat wel en wat nog niet is gebeurd.',
            structureFormula: 'Gelezen + heeft + [Onderwerp] + het document + wel, + maar + goedgekeurd + nog niet',
            hint: 'Gebruik "Gelezen heeft de directie het document wel, maar goedgekeurd nog niet".',
          },
          target: 'Gelezen heeft de directie het document wel, maar goedgekeurd nog niet',
          acceptedAnswers: [
            'Gelezen heeft de directie het document wel, maar goedgekeurd nog niet',
            'Gelezen heeft het bestuur het document wel, maar goedgekeurd nog niet',
            'Gelezen heeft de directie het rapport wel, maar goedgekeurd nog niet',
            'Gelezen heeft de commissie het document wel, maar goedgekeurd nog niet',
          ],
          explanation: 'Fronting the past participle creates dramatic contrast, triggering subject-verb inversion with the auxiliary "heeft".',
        },
        {
          id: 'topical-d4',
          kind: 'topicalisation-drill',
          prompt: 'Left-Dislocation with Resumptive Pronoun "Die": Safety protocols',
          skills: ['production', 'grammar'],
          topicalisationData: {
            focusType: 'left-dislocation-resumptive',
            frontedElement: 'Die nieuwe veiligheidsprotocollen',
            resumptiveElement: 'die',
            baseSentence: 'We moeten die nieuwe veiligheidsprotocollen vanaf morgen strikt handhaven.',
            contextPrompt: 'Isoleer "Die nieuwe veiligheidsprotocollen" buiten de hoofdzin (linkerdislocatie) en neem dit element in de zin op met het resumptieve pronomen "die".',
            structureFormula: 'Die nieuwe veiligheidsprotocollen, + die + moeten + we + [Tijd] + [Manier] + handhaven',
            hint: 'Gebruik "Die nieuwe veiligheidsprotocollen, die moeten we vanaf morgen strikt handhaven".',
          },
          target: 'Die nieuwe veiligheidsprotocollen, die moeten we vanaf morgen strikt handhaven',
          acceptedAnswers: [
            'Die nieuwe veiligheidsprotocollen, die moeten we vanaf morgen strikt handhaven',
            'Die nieuwe veiligheidsprotocollen, die moeten we vanaf morgen strikt naleven',
            'Die nieuwe veiligheidsprotocollen die moeten we vanaf morgen strikt handhaven',
            'Die nieuwe protocollen, die moeten we vanaf morgen strikt handhaven',
          ],
          explanation: 'Left-dislocation introduces a topic outside the core clause boundary and resumes it with "die" inside the clause.',
        },
        {
          id: 'topical-d5',
          kind: 'topicalisation-drill',
          prompt: 'Left-Dislocation with Resumptive Pronoun "Dat": Legal conflict',
          skills: ['production', 'grammar'],
          topicalisationData: {
            focusType: 'left-dislocation-resumptive',
            frontedElement: 'Dat complexe juridische conflict',
            resumptiveElement: 'dat',
            baseSentence: 'We lossen dat complexe juridische conflict buiten de rechtszaal op.',
            contextPrompt: 'Isoleer het onzijdige (het-)onderwerp "Dat complexe juridische conflict" via linkerdislocatie en hervat met "dat".',
            structureFormula: 'Dat complexe juridische conflict, + dat + lossen + we + buiten de rechtszaal + op',
            hint: 'Gebruik "Dat complexe juridische conflict, dat lossen we buiten de rechtszaal op".',
          },
          target: 'Dat complexe juridische conflict, dat lossen we buiten de rechtszaal op',
          acceptedAnswers: [
            'Dat complexe juridische conflict, dat lossen we buiten de rechtszaal op',
            'Dat ingewikkelde juridische conflict, dat lossen we buiten de rechtszaal op',
            'Dat complexe juridische conflict dat lossen we buiten de rechtszaal op',
            'Dat juridische conflict, dat lossen we buiten de rechtszaal op',
          ],
          explanation: 'For neuter noun phrases (het-woorden), the resumptive pronoun in left-dislocation is "dat".',
        },
        {
          id: 'topical-d6',
          kind: 'topicalisation-drill',
          prompt: 'Cleft Focus Construction (Het is juist... dat): Causal market leadership',
          skills: ['production', 'grammar'],
          topicalisationData: {
            focusType: 'cleft-het-is-dat',
            frontedElement: 'Het is juist door die technologische innovatie',
            baseSentence: 'Het bedrijf is juist door die technologische innovatie marktleider geworden.',
            contextPrompt: 'Construeer een cleft-focuszin met "Het is juist door... dat" om de technologische innovatie als dé doorslaggevende oorzaak te isoleren.',
            structureFormula: 'Het is juist door [Oorzaak] + dat + het bedrijf + marktleider + is + geworden',
            hint: 'Gebruik "Het is juist door die technologische innovatie dat het bedrijf marktleider is geworden".',
          },
          target: 'Het is juist door die technologische innovatie dat het bedrijf marktleider is geworden',
          acceptedAnswers: [
            'Het is juist door die technologische innovatie dat het bedrijf marktleider is geworden',
            'Het is juist door die technologische innovaties dat het bedrijf marktleider is geworden',
            'Het is door die technologische innovatie dat de onderneming marktleider is geworden',
            'Het is juist dankzij die technologische innovatie dat het bedrijf marktleider is geworden',
          ],
          explanation: 'Cleft sentences ("Het is [X] dat...") focus exclusively on the highlighted constituent, triggering subordinate word order in the relative clause.',
        },
        {
          id: 'topical-d7',
          kind: 'topicalisation-drill',
          prompt: 'Cleft Focus Construction (Het is... die): Key discoverer',
          skills: ['production', 'grammar'],
          topicalisationData: {
            focusType: 'cleft-het-is-die',
            frontedElement: 'Het was onze senior onderzoeker',
            baseSentence: 'Onze senior onderzoeker ontdekte de doorslaggevende fout in de berekening.',
            contextPrompt: 'Creëer een persoonsgerichte cleft-constructie met "Het was... die" om de specifieke onderzoeker te complimenteren.',
            structureFormula: 'Het was [Persoon] + die + [Object] + [Deelwoord/PV]',
            hint: 'Gebruik "Het was onze senior onderzoeker die de doorslaggevende fout in de berekening ontdekte".',
          },
          target: 'Het was onze senior onderzoeker die de doorslaggevende fout in de berekening ontdekte',
          acceptedAnswers: [
            'Het was onze senior onderzoeker die de doorslaggevende fout in de berekening ontdekte',
            'Het was onze hoofdonderzoeker die de doorslaggevende fout in de berekening ontdekte',
            'Het is onze senior onderzoeker die de doorslaggevende fout in de berekening ontdekte',
            'Het was de senior onderzoeker die de doorslaggevende fout in de berekening ontdekte',
          ],
          explanation: 'When clefting a human subject, Dutch uses the relative pronoun "die", followed by verb-final subordinate word order.',
        },
        {
          id: 'topical-d8',
          kind: 'topicalisation-drill',
          prompt: 'Inverted Conditional Focus (Mocht...): Precautionary notification',
          skills: ['production', 'grammar'],
          topicalisationData: {
            focusType: 'inverted-conditional-mocht',
            frontedElement: 'Mocht er onverhoopt vertraging optreden',
            baseSentence: 'Als er onverhoopt vertraging mocht optreden, stel de cliënten dan direct op de hoogte.',
            contextPrompt: 'Formuleer een formele voorzorgsinstructie door de voorwaardelijke bijzin te beginnen met het geïnverteerde hulpwerkwoord "Mocht...".',
            structureFormula: 'Mocht + er + onverhoopt + vertraging + optreden, + stel + [Object] + dan + onmiddellijk + op de hoogte',
            hint: 'Gebruik "Mocht er onverhoopt vertraging optreden, stel de cliënten dan onmiddellijk op de hoogte".',
          },
          target: 'Mocht er onverhoopt vertraging optreden, stel de cliënten dan onmiddellijk op de hoogte',
          acceptedAnswers: [
            'Mocht er onverhoopt vertraging optreden, stel de cliënten dan onmiddellijk op de hoogte',
            'Mocht er onverhoopt vertraging optreden, stel de klanten dan direct op de hoogte',
            'Mocht er vertraging optreden, stel de cliënten dan onmiddellijk op de hoogte',
            'Mochten er onverhoopt vertragingen optreden, stel de cliënten dan onmiddellijk op de hoogte',
          ],
          explanation: '"Mocht [onderwerp] ... [infinitief]" produces an inverted conditional clause without "als", common in formal and professional Dutch.',
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Emphatic Focus & Discourse Structuring in Your Real Life',
      kind: 'personalise',
      intro: 'Express a strong professional opinion, vision, or argument using focus fronting, left-dislocation with resumptive pronouns, or cleft focus constructions.',
      exercises: [
        {
          id: 'topical-pers-1',
          kind: 'personalise',
          prompt: 'Formuleer een krachtig standpunt over een actuele kwestie, innovatie of beleidsregel uit jouw vakgebied of leefomgeving. Gebruik minstens twee focusconstructies (bijv. vooropplaatsing van een lijdend voorwerp met V2 inversie, "Twijfelen/Weten doe ik...", linkerdislocatie met "die/dat", of een cleftzin met "Het is juist... dat/die").',
          skills: ['production', 'speaking', 'pragmatic', 'grammar'],
          vocabulary: ['twijfelen doe ik', 'dát', 'die', 'dat', 'het is juist dat', 'het was die', 'mocht'],
          grammar: ['topicalisatie', 'focusconstructies', 'v2-inversie', 'cleft-zinnen', 'linkerdislocatie', 'resumptief-pronomen'],
        },
      ],
    },
  ],
};

export const directionsChapter: Chapter = {
  slug: 'de-weg-vragen',
  level: 'A1',
  title: 'Asking Directions',
  capability: 'Ask for and follow simple directions in town (left, right, straight ahead, near the station, round the corner).',
  description: 'Learn how to ask for help on the street and navigate Dutch towns effortlessly.',
  estimatedMinutes: 10,
  stages: [
    {
      id: 'discover',
      title: 'Direction Words',
      kind: 'discover',
      intro: 'When asking the way, use "Waar is..." (Where is) or "Hoe kom ik bij..." (How do I get to), and recognize key directions like "rechtdoor" (straight on), "linksaf" (left), and "rechtsaf" (right).',
      exercises: [
        {
          id: 'dir-induction',
          kind: 'induction',
          prompt: 'Notice the directional patterns',
          skills: ['recognition', 'meaning'],
          inductionData: {
            examples: [
              { prompt: 'Straight ahead', answer: 'Ga hier rechtdoor.' },
              { prompt: 'Turn left', answer: 'Sla bij de kerk linksaf.' },
              { prompt: 'Turn right', answer: 'Sla bij het stoplicht rechtsaf.' },
            ],
            ruleChallenge: 'Which word means "straight ahead" in Dutch?',
            options: [
              { text: 'rechtdoor', isCorrect: true },
              { text: 'linksaf', isCorrect: false },
              { text: 'rechtsaf', isCorrect: false },
            ],
          },
        },
        {
          id: 'dir-1',
          kind: 'info',
          prompt: 'Core navigation phrases',
          context: 'Pardon, waar is het station? (Excuse me, where is the station?)\nGa rechtdoor tot de brug. (Go straight ahead until the bridge.)\nSla dan linksaf. (Then turn left.)\nHet museum is aan de rechterkant. (The museum is on the right-hand side.)\nHet is om de hoek. (It is around the corner.)',
          skills: ['recognition', 'meaning'],
          vocabulary: ['rechtdoor', 'linksaf', 'rechtsaf', 'om de hoek', 'aan de rechterkant', 'aan de linkerkant'],
        },
      ],
    },
    {
      id: 'understand',
      title: 'Finding the Library',
      kind: 'understand',
      intro: 'Read this street dialogue between a tourist and a local resident in Utrecht.',
      exercises: [
        {
          id: 'dir-2',
          kind: 'reading',
          prompt: 'Street interaction',
          readingContent: 'A: Pardon meneer, weet u waar de openbare bibliotheek is?\nB: Ja zeker! Loop deze straat helemaal rechtdoor. Sla bij het grote plein rechtsaf. De bibliotheek ligt dan direct tegenover het museum.\nA: Heel erg bedankt!\nB: Geen dank, succes!',
          wordHints: {
            openbare: { meaning: 'public', category: 'adj' },
            bibliotheek: { meaning: 'library', category: 'noun' },
            loop: { meaning: 'walk / go', category: 'verb' },
            plein: { meaning: 'square / plaza', category: 'noun' },
            tegenover: { meaning: 'opposite / across from', category: 'prep' },
          },
          skills: ['recognition', 'meaning'],
          vocabulary: ['bibliotheek', 'plein', 'tegenover'],
        },
      ],
    },
    {
      id: 'retrieve',
      title: 'Quick Navigation Recall',
      kind: 'retrieve',
      intro: 'Recall these essential direction phrases quickly.',
      exercises: [
        {
          id: 'dir-speed-1',
          kind: 'speed-drill',
          prompt: 'Turn left (imperative)',
          target: 'Sla linksaf',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'dir-speed-2',
          kind: 'speed-drill',
          prompt: 'Go straight ahead',
          target: 'Ga rechtdoor',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'dir-3',
          kind: 'typed',
          prompt: 'Translate: Excuse me, where is the central station?',
          target: 'Pardon, waar is het centraal station?',
          acceptedAnswers: [
            'Pardon, waar is het centraal station?',
            'Pardon, waar is het centraal station',
            'Excuseer, waar is het centraal station?',
            'Pardon waar is het centraal station',
            'Pardon, waar is het station?',
          ],
          explanation: 'Start with "Pardon" and use "waar is het centraal station?".',
          skills: ['production', 'meaning', 'spelling'],
          vocabulary: ['pardon', 'station'],
          placeholder: 'Pardon, waar...',
        },
      ],
    },
    {
      id: 'transform',
      title: 'Giving Steps',
      kind: 'transform',
      intro: 'Practice giving simple instructions using landmarks and prepositions.',
      exercises: [
        {
          id: 'dir-4',
          kind: 'typed',
          prompt: 'Translate: Turn right at the traffic light.',
          target: 'Sla bij het stoplicht rechtsaf.',
          acceptedAnswers: [
            'Sla bij het stoplicht rechtsaf.',
            'Sla bij het stoplicht rechtsaf',
            'Sla rechtsaf bij het stoplicht.',
            'Sla rechtsaf bij het stoplicht',
          ],
          explanation: 'Use "Sla bij het stoplicht rechtsaf" or "Sla rechtsaf bij het stoplicht".',
          skills: ['production', 'grammar'],
          vocabulary: ['stoplicht', 'rechtsaf'],
          grammar: ['imperative', 'separable-verbs'],
        },
        {
          id: 'dir-5',
          kind: 'typed',
          prompt: 'Translate: The supermarket is on the left-hand side, opposite the park.',
          target: 'De supermarkt is aan de linkerkant, tegenover het park.',
          acceptedAnswers: [
            'De supermarkt is aan de linkerkant, tegenover het park.',
            'De supermarkt is aan de linkerkant tegenover het park',
            'De supermarkt ligt aan de linkerkant tegenover het park',
            'De supermarkt ligt aan de linkerkant, tegenover het park.',
          ],
          explanation: 'Use "aan de linkerkant" (on the left) and "tegenover het park" (opposite the park).',
          skills: ['production', 'grammar'],
          vocabulary: ['linkerkant', 'tegenover', 'supermarkt'],
          grammar: ['prepositions'],
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Ask for Directions',
      kind: 'personalise',
      intro: 'Imagine you are lost in Amsterdam or Rotterdam. Ask a passerby how to reach a place you want to visit.',
      exercises: [
        {
          id: 'dir-6',
          kind: 'personalise',
          prompt: 'Vraag aan een voorbijganger de weg naar een museum, café of station in jouw favoriete stad.',
          target: 'Pardon, weet u waar het museum is? Hoe kom ik daar?',
          explanation: 'Politely ask for directions with "Pardon, weet u waar... is?" or "Hoe kom ik bij...?".',
          skills: ['speaking', 'production', 'automaticity'],
          vocabulary: ['pardon', 'waar is', 'hoe kom ik bij'],
          grammar: ['questions', 'word-order'],
          placeholder: 'Pardon, weet u waar...',
        },
      ],
    },
  ],
};

export const supermarketChapter: Chapter = {
  slug: 'boodschappen-doen',
  level: 'A1',
  title: 'At the Supermarket',
  capability: 'Find products in aisles, ask staff for help, specify quantities, and navigate the supermarket checkout.',
  description: 'Master daily grocery shopping, packaging units, and effortless checkout interactions in Dutch.',
  estimatedMinutes: 10,
  relatedArticleSlug: 'a1-supermarkt',
  stages: [
    {
      id: 'discover',
      title: 'Packaging & Quantities',
      kind: 'discover',
      intro: 'In Dutch supermarkets, products are measured in "pak" (carton/pack), "fles" (bottle), "zak" (bag), "doosje" (box), and "kilo" / "gram" (weight).',
      exercises: [
        {
          id: 'sup-induction',
          kind: 'induction',
          prompt: 'Notice how containers and quantities are paired with foods',
          skills: ['recognition', 'meaning'],
          inductionData: {
            examples: [
              { prompt: 'Milk container', answer: 'een pak melk' },
              { prompt: 'Olive oil container', answer: 'een fles olijfolie' },
              { prompt: 'Apples bag', answer: 'een zak appels' },
            ],
            ruleChallenge: 'Which unit is used for liquids in glass/plastic like oil or wine?',
            options: [
              { text: 'fles', isCorrect: true },
              { text: 'pak', isCorrect: false },
              { text: 'zak', isCorrect: false },
            ],
          },
        },
        {
          id: 'sup-1',
          kind: 'info',
          prompt: 'Supermarket vocabulary & aisle phrases',
          context: 'Pardon, waar liggen de eieren? (Where are the eggs?)\nIn gangpad 3 aan de rechterkant. (In aisle 3 on the right.)\neen pak melk, een fles water, een zak aardappelen, een stuk kaas, een doosje eieren',
          skills: ['recognition', 'meaning'],
          vocabulary: ['gangpad', 'pak', 'fles', 'zak', 'stuk', 'doosje', 'eieren', 'kaas'],
        },
      ],
    },
    {
      id: 'understand',
      title: 'At the Checkout Counter',
      kind: 'understand',
      intro: 'Understand the standard questions Dutch cashiers ask at the checkout (*de kassa*).',
      exercises: [
        {
          id: 'sup-2',
          kind: 'info',
          prompt: 'Cashier standard questions',
          context: 'Kassamedewerker: "Wilt u er een tasje bij?" (Would you like a bag?)\nKlant: "Nee bedankt, ik heb een eigen tas." (No thanks, I have my own bag.)\nKassamedewerker: "Pinnen of contant?" (Card or cash?)\nKlant: "Pinnen, alstublieft." (Card, please.)\nKassamedewerker: "Wilt u de bon mee?" (Would you like the receipt?)\nKlant: "Nee hoor, dank u wel. Fijne dag!"',
          skills: ['recognition', 'meaning'],
          vocabulary: ['tasje', 'pinnen', 'contant', 'bon', 'fijne dag'],
        },
      ],
    },
    {
      id: 'retrieve',
      title: 'Checkout Rapid Response',
      kind: 'retrieve',
      intro: 'Respond instantly to common supermarket questions.',
      exercises: [
        {
          id: 'sup-speed-1',
          kind: 'speed-drill',
          prompt: 'Card payment, please (Pinnen...)',
          target: 'Pinnen, alstublieft',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'sup-speed-2',
          kind: 'speed-drill',
          prompt: 'No receipt needed (Nee, dank u)',
          target: 'Nee, dank u',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'sup-3',
          kind: 'typed',
          prompt: 'Translate: Excuse me, where can I find the pasta?',
          target: 'Pardon, waar kan ik de pasta vinden?',
          acceptedAnswers: [
            'Pardon, waar kan ik de pasta vinden?',
            'Pardon, waar kan ik de pasta vinden',
            'Pardon, waar ligt de pasta?',
            'Pardon, waar ligt de pasta',
            'Pardon waar kan ik de pasta vinden?',
          ],
          explanation: 'Ask politely: "Pardon, waar kan ik de pasta vinden?" or "Pardon, waar ligt de pasta?".',
          skills: ['production', 'meaning'],
          vocabulary: ['pardon', 'vinden', 'pasta'],
          placeholder: 'Pardon, waar...',
        },
      ],
    },
    {
      id: 'transform',
      title: 'Specifying Orders & Weights',
      kind: 'transform',
      intro: 'Formulate precise orders at the deli or fresh produce counter.',
      exercises: [
        {
          id: 'sup-4',
          kind: 'typed',
          prompt: 'Translate: I would like a carton of milk and a loaf of bread, please.',
          target: 'Ik wil graag een pak melk en een brood, alstublieft.',
          acceptedAnswers: [
            'Ik wil graag een pak melk en een brood, alstublieft.',
            'Ik wil graag een pak melk en een brood alstublieft',
            'Ik wil graag een pak melk en een brood, graag.',
            'Ik wil graag een pak melk en een heel brood, alstublieft.',
          ],
          explanation: 'Use "Ik wil graag een pak melk en een brood, alstublieft".',
          skills: ['production', 'grammar'],
          vocabulary: ['pak melk', 'brood', 'graag', 'alstublieft'],
          grammar: ['polite-requests'],
        },
        {
          id: 'sup-5',
          kind: 'typed',
          prompt: 'Translate: May I have half a kilo of old cheese?',
          target: 'Mag ik een halve kilo oude kaas?',
          acceptedAnswers: [
            'Mag ik een halve kilo oude kaas?',
            'Mag ik een halve kilo oude kaas',
            'Mag ik een halve kilo oude kaas, alstublieft?',
            'Ik wil graag een halve kilo oude kaas, alsjeblieft.',
          ],
          explanation: 'Use "Mag ik een halve kilo oude kaas?" at the cheese counter.',
          skills: ['production', 'grammar'],
          vocabulary: ['halve kilo', 'oude kaas'],
          grammar: ['quantities', 'adjective-inflection'],
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Your Shopping List',
      kind: 'personalise',
      intro: 'Write down what you need to buy for dinner tonight and how you will ask for it.',
      exercises: [
        {
          id: 'sup-6',
          kind: 'personalise',
          prompt: 'Wat moet je vanavond kopen in de supermarkt? Noem minstens drie producten met hun verpakking of hoeveelheid (bijv. een pak, fles, zak of kilo).',
          target: 'Ik moet een zak aardappelen, een fles olijfolie en een stuk kaas kopen.',
          explanation: 'Use phrases like "Ik moet ... kopen" or "Ik heb ... nodig" with quantities.',
          skills: ['production', 'writing', 'automaticity'],
          vocabulary: ['kopen', 'nodig hebben', 'fles', 'pak', 'zak', 'kilo'],
          grammar: ['modal-verbs', 'word-order'],
          placeholder: 'Ik moet...',
        },
      ],
    },
  ],
};

export const timeAndScheduleChapter: Chapter = {
  slug: 'tijd-en-afspraken',
  level: 'A1',
  title: 'Telling Time & Appointments',
  capability: 'Tell the exact time using the Dutch half-hour clock system, read opening hours, and arrange simple meetings.',
  description: 'Conquer the unique Dutch clock system (half before the next hour!) and schedule appointments easily.',
  estimatedMinutes: 10,
  stages: [
    {
      id: 'discover',
      title: 'The Dutch Half-Hour System',
      kind: 'discover',
      intro: 'In Dutch, "half vier" does NOT mean 4:30 — it means 3:30 (halfway TO four). Notice how times around the half-hour are expressed relative to "half".',
      exercises: [
        {
          id: 'time-induction',
          kind: 'induction',
          prompt: 'Notice how Dutch tells time',
          skills: ['recognition', 'meaning'],
          inductionData: {
            examples: [
              { prompt: '03:30', answer: 'half vier' },
              { prompt: '03:20 (10 mins before 3:30)', answer: 'tien voor half vier' },
              { prompt: '03:40 (10 mins after 3:30)', answer: 'tien over half vier' },
            ],
            ruleChallenge: 'What does "half vijf" mean in Dutch?',
            options: [
              { text: '4:30', isCorrect: true },
              { text: '5:30', isCorrect: false },
              { text: '5:15', isCorrect: false },
            ],
          },
        },
        {
          id: 'time-1',
          kind: 'info',
          prompt: 'Full Dutch clock reference',
          context: '03:00 = drie uur\n03:15 = kwart over drie\n03:20 = tien voor half vier\n03:30 = half vier\n03:40 = tien over half vier\n03:45 = kwart voor vier\n04:00 = vier uur',
          skills: ['recognition', 'meaning'],
          vocabulary: ['uur', 'kwart over', 'kwart voor', 'half', 'voor', 'over'],
        },
      ],
    },
    {
      id: 'understand',
      title: 'Opening Hours & Appointments',
      kind: 'understand',
      intro: 'Read about opening hours and scheduling appointments using prepositions of time (*om, op, van... tot*).',
      exercises: [
        {
          id: 'time-2',
          kind: 'reading',
          prompt: 'Dentist opening hours announcement',
          readingContent: 'Tandartspraktijk De Brug is geopend van maandag tot en met vrijdag, van half negen \'s ochtends tot vijf uur \'s middags. Op zaterdag zijn we alleen open voor spoedgevallen van tien tot twaalf uur.',
          wordHints: {
            'tandartspraktijk': { meaning: 'dental clinic', category: 'noun' },
            'geopend': { meaning: 'open / opened', category: 'adj' },
            'tot en met': { meaning: 'up to and including', category: 'prep' },
            'spoedgevallen': { meaning: 'emergencies', category: 'noun' },
          },
          skills: ['recognition', 'meaning'],
          vocabulary: ['geopend', 'van... tot', 'spoedgeval'],
        },
      ],
    },
    {
      id: 'retrieve',
      title: 'Digital to Dutch Clock Speed Drill',
      kind: 'retrieve',
      intro: 'Convert these digital clock times into spoken Dutch.',
      exercises: [
        {
          id: 'time-speed-1',
          kind: 'speed-drill',
          prompt: '14:30 (half ...)',
          target: 'half drie',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'time-speed-2',
          kind: 'speed-drill',
          prompt: '09:15 (kwart ...)',
          target: 'kwart over negen',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'time-3',
          kind: 'typed',
          prompt: 'Translate: It is 17:45 (quarter to six).',
          target: 'Het is kwart voor zes.',
          acceptedAnswers: [
            'Het is kwart voor zes.',
            'Het is kwart voor zes',
            'Het is kwart voor 6.',
            'Kwart voor zes',
          ],
          explanation: '17:45 is 15 minutes before 6:00, so "kwart voor zes".',
          skills: ['production', 'meaning'],
          vocabulary: ['kwart voor', 'zes'],
        },
      ],
    },
    {
      id: 'transform',
      title: 'Scheduling Dates with Prepositions',
      kind: 'transform',
      intro: 'Combine days and times using "op [dag]" and "om [tijd]".',
      exercises: [
        {
          id: 'time-4',
          kind: 'typed',
          prompt: 'Translate: Shall we meet on Wednesday at half past two (14:30)?',
          target: 'Zullen we op woensdag om half drie afspreken?',
          acceptedAnswers: [
            'Zullen we op woensdag om half drie afspreken?',
            'Zullen we op woensdag om half drie afspreken',
            'Zullen we woensdag om half drie afspreken?',
            'Kunnen we op woensdag om half drie afspreken?',
          ],
          explanation: 'Use "op woensdag" for the day, "om half drie" for 14:30, and the separable verb "afspreken".',
          skills: ['production', 'grammar'],
          vocabulary: ['afspreken', 'woensdag', 'half drie'],
          grammar: ['prepositions-of-time', 'separable-verbs'],
        },
        {
          id: 'time-5',
          kind: 'typed',
          prompt: 'Translate: The shop is open from nine o\'clock until half past five.',
          target: 'De winkel is open van negen uur tot half zes.',
          acceptedAnswers: [
            'De winkel is open van negen uur tot half zes.',
            'De winkel is open van negen uur tot half zes',
            'De winkel is geopend van negen uur tot half zes.',
            'De winkel is open van 9 uur tot half 6.',
          ],
          explanation: 'Use "van [tijd] tot [tijd]" for time spans.',
          skills: ['production', 'grammar'],
          vocabulary: ['winkel', 'open', 'half zes'],
          grammar: ['prepositions-of-time'],
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Propose an Appointment',
      kind: 'personalise',
      intro: 'Send a message to a friend or colleague suggesting a day and time to have lunch or coffee.',
      exercises: [
        {
          id: 'time-6',
          kind: 'personalise',
          prompt: 'Stel een dag en een tijd voor om koffie te drinken met een vriend(in). Gebruik "op [dag]" en "om [tijd]" (bijv. om half vier).',
          target: 'Zullen we op vrijdag om half vier koffie drinken?',
          explanation: 'Suggest a plan with "Zullen we op [dag] om [tijd]...?" or "Schikt het jou op...?".',
          skills: ['speaking', 'production', 'automaticity'],
          vocabulary: ['zullen', 'afspreken', 'koffie drinken', 'op', 'om'],
          grammar: ['modal-verbs', 'prepositions-of-time'],
          placeholder: 'Zullen we op...',
        },
      ],
    },
  ],
};

export const transitChapter: Chapter = {
  slug: 'openbaar-vervoer-reizen',
  level: 'A2',
  title: 'Public Transit & Train Travel',
  capability: 'Navigate trains, buses, and trams: check in/out with OV-chipkaart, ask about track numbers and transfers, and handle delays.',
  description: 'Travel with confidence on the Dutch rail and transit network.',
  estimatedMinutes: 12,
  relatedArticleSlug: 'a2-trein',
  stages: [
    {
      id: 'discover',
      title: 'Transit Verbs & Vocabulary',
      kind: 'discover',
      intro: 'Dutch public transport relies on separable verbs like "inchecken" (to check in), "uitchecken" (to check out), "overstappen" (to transfer), and "vertrekken" (to depart).',
      exercises: [
        {
          id: 'tran-induction',
          kind: 'induction',
          prompt: 'Notice how transit verbs split in the present tense',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'Check in', answer: 'De reiziger checkt bij het poortje in.' },
              { prompt: 'Transfer', answer: 'Wij stappen in Utrecht over.' },
              { prompt: 'Get off / exit', answer: 'Zij stapt bij de volgende halte uit.' },
            ],
            ruleChallenge: 'Where does the prefix (in, over, uit) go in a main clause?',
            options: [
              { text: 'At the very end of the clause', isCorrect: true },
              { text: 'Directly after the verb', isCorrect: false },
              { text: 'At the start of the sentence', isCorrect: false },
            ],
          },
        },
        {
          id: 'tran-1',
          kind: 'info',
          prompt: 'Key public transit terms',
          context: 'het spoor (the track/platform)\nde vertraging (the delay)\nde overstap (the transfer)\nhet poortje (the fare gate)\nVergeet niet uit te checken! (Don\'t forget to check out!)\nDe trein vertrekt van spoor 4b. (The train departs from track 4b.)',
          skills: ['recognition', 'meaning'],
          vocabulary: ['spoor', 'vertraging', 'overstap', 'inchecken', 'uitchecken', 'vertrek'],
        },
      ],
    },
    {
      id: 'understand',
      title: 'Station Announcements & Ticket Inspection',
      kind: 'understand',
      intro: 'Listen to and understand station announcements and train conductor questions.',
      exercises: [
        {
          id: 'tran-2',
          kind: 'reading',
          prompt: 'Train station broadcast',
          readingContent: 'Omroeper op station: "Beste reizigers. De intercity naar Amsterdam Centraal van 14:15 heeft een vertraging van ongeveer tien minuten wegens werkzaamheden aan het spoor. Deze trein vertrekt vanaf spoor 7 in plaats van spoor 5. Reizigers voor Schiphol Airport kunnen overstappen in Utrecht."',
          wordHints: {
            'reizigers': { meaning: 'passengers / travelers', category: 'noun' },
            'werkzaamheden': { meaning: 'engineering work / maintenance', category: 'noun' },
            'in plaats van': { meaning: 'instead of', category: 'prep' },
          },
          skills: ['recognition', 'meaning'],
          vocabulary: ['reizigers', 'werkzaamheden', 'in plaats van'],
        },
      ],
    },
    {
      id: 'retrieve',
      title: 'Transit Questions & Verification',
      kind: 'retrieve',
      intro: 'Retrieve important travel questions quickly.',
      exercises: [
        {
          id: 'tran-speed-1',
          kind: 'speed-drill',
          prompt: 'Which track? (Van welk...)',
          target: 'Van welk spoor',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'tran-speed-2',
          kind: 'speed-drill',
          prompt: 'Do I have to transfer? (Moet ik...)',
          target: 'Moet ik overstappen?',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'tran-3',
          kind: 'typed',
          prompt: 'Translate: Excuse me, does this train go to Rotterdam Centraal?',
          target: 'Pardon, gaat deze trein naar Rotterdam Centraal?',
          acceptedAnswers: [
            'Pardon, gaat deze trein naar Rotterdam Centraal?',
            'Pardon, gaat deze trein naar Rotterdam Centraal',
            'Pardon gaat deze trein naar Rotterdam Centraal?',
            'Rijdt deze trein naar Rotterdam Centraal?',
          ],
          explanation: 'Use "Pardon, gaat deze trein naar...?" or "Rijdt deze trein naar...?".',
          skills: ['production', 'meaning'],
          vocabulary: ['trein', 'gaan naar'],
          placeholder: 'Pardon, gaat...',
        },
      ],
    },
    {
      id: 'transform',
      title: 'Handling Delays & Modal Verbs',
      kind: 'transform',
      intro: 'Formulate instructions and conditional travel plans using modal verbs (*moeten, kunnen, willen*).',
      exercises: [
        {
          id: 'tran-4',
          kind: 'typed',
          prompt: 'Translate: We must transfer in Utrecht because our train has a delay.',
          target: 'We moeten in Utrecht overstappen omdat onze trein vertraging heeft.',
          acceptedAnswers: [
            'We moeten in Utrecht overstappen omdat onze trein vertraging heeft.',
            'We moeten in Utrecht overstappen omdat onze trein vertraging heeft',
            'Wij moeten in Utrecht overstappen omdat onze trein vertraging heeft.',
            'We moeten overstappen in Utrecht omdat onze trein vertraging heeft.',
          ],
          explanation: 'With modal "moeten", the infinitive "overstappen" goes to the end of the main clause. In the "omdat" clause, the verb "heeft" goes to the very end.',
          skills: ['production', 'grammar'],
          vocabulary: ['overstappen', 'vertraging', 'omdat'],
          grammar: ['modal-verbs', 'omdat-clause', 'separable-verbs'],
        },
        {
          id: 'tran-5',
          kind: 'typed',
          prompt: 'Translate: You can easily check in with your bank card or OV-chipkaart.',
          target: 'Je kunt makkelijk inchecken met je bankpas of OV-chipkaart.',
          acceptedAnswers: [
            'Je kunt makkelijk inchecken met je bankpas of OV-chipkaart.',
            'Je kunt makkelijk inchecken met je bankpas of OV-chipkaart',
            'U kunt makkelijk inchecken met uw bankpas of OV-chipkaart.',
            'Je kan gemakkelijk inchecken met je bankpas of OV-chipkaart.',
          ],
          explanation: 'Use modal "kunt/kan" + infinitive "inchecken" at the clause end.',
          skills: ['production', 'grammar'],
          vocabulary: ['inchecken', 'bankpas', 'OV-chipkaart'],
          grammar: ['modal-verbs'],
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Explain Your Route',
      kind: 'personalise',
      intro: 'Describe how you travel by public transport to your work, university, or a Dutch city.',
      exercises: [
        {
          id: 'tran-6',
          kind: 'personalise',
          prompt: 'Hoe reis jij meestal met het openbaar vervoer? Noem de vervoersmiddelen (trein, tram, bus of metro) en of je moet overstappen.',
          target: 'Ik neem meestal de trein naar Amsterdam en ik moet een keer overstappen.',
          explanation: 'Use verbs like "nemen", "reizen met", and "overstappen".',
          skills: ['speaking', 'production', 'automaticity'],
          vocabulary: ['nemen', 'trein', 'tram', 'bus', 'overstappen', 'reizen'],
          grammar: ['separable-verbs', 'word-order'],
          placeholder: 'Ik reis meestal met...',
        },
      ],
    },
  ],
};

export const housingChapter: Chapter = {
  slug: 'woning-zoeken-en-huren',
  level: 'A2',
  title: 'House Hunting & Living Spaces',
  capability: 'Describe apartments, ask landlords about rent, utilities, and furnishings, and arrange a viewing.',
  description: 'Navigate the Dutch housing market, understand rental listings, and contact real estate agents.',
  estimatedMinutes: 12,
  relatedArticleSlug: 'a2-woning',
  stages: [
    {
      id: 'discover',
      title: 'Housing Features & Adjective Endings',
      kind: 'discover',
      intro: 'Learn how to describe rooms and understand rental features: "gemeubileerd" (furnished), "gestoffeerd" (carpets/curtains only), "kaal" (bare), and whether costs are "inclusief" (inclusive).',
      exercises: [
        {
          id: 'hou-induction',
          kind: 'induction',
          prompt: 'Notice adjective endings with de-words and het-words',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'de woning (de-word)', answer: 'een mooie woning' },
              { prompt: 'het appartement (het-word, indefinite)', answer: 'een mooi appartement' },
              { prompt: 'het appartement (definite)', answer: 'het mooie appartement' },
            ],
            ruleChallenge: 'Why does "een mooi appartement" NOT get an -e ending?',
            options: [
              { text: 'Because "appartement" is a het-word preceded by "een"', isCorrect: true },
              { text: 'Because it is at the end of the sentence', isCorrect: false },
              { text: 'Because "mooi" is an irregular adjective', isCorrect: false },
            ],
          },
        },
        {
          id: 'hou-1',
          kind: 'info',
          prompt: 'Essential rental terminology',
          context: 'de huurprijs (rental price)\nde borg / de waarborgsom (security deposit)\ninclusief gas, water en licht (GWL) (including utilities)\nde bezichtiging (the viewing / tour)\nde makelaar (the real estate agent)\nbeschikbaar per direct (available immediately)',
          skills: ['recognition', 'meaning'],
          vocabulary: ['huurprijs', 'waarborgsom', 'inclusief', 'bezichtiging', 'makelaar', 'gemeubileerd'],
        },
      ],
    },
    {
      id: 'understand',
      title: 'Reading a Rental Listing',
      kind: 'understand',
      intro: 'Analyze this rental advertisement for an apartment in Utrecht.',
      exercises: [
        {
          id: 'hou-2',
          kind: 'reading',
          prompt: 'Rental advertisement details',
          readingContent: 'Te huur: Ruim en licht 2-kamerappartement in het centrum van Utrecht. Woonoppervlakte: 65 m². De woning is volledig gemeubileerd en heeft een zonnig balkon. Huurprijs: € 1.350,- per maand exclusief gas, water en elektriciteit. Borg: twee maanden huur. Beschikbaar per 1 november. Huisdieren zijn niet toegestaan.',
          wordHints: {
            woonoppervlakte: { meaning: 'living area / floor space', category: 'noun' },
            volledig: { meaning: 'completely / fully', category: 'adv' },
            balkon: { meaning: 'balcony', category: 'noun' },
            toegestaan: { meaning: 'allowed / permitted', category: 'adj' },
          },
          skills: ['recognition', 'meaning'],
          vocabulary: ['woonoppervlakte', 'balkon', 'toegestaan'],
        },
      ],
    },
    {
      id: 'retrieve',
      title: 'Housing Inquiries',
      kind: 'retrieve',
      intro: 'Ask crucial questions when searching for a place.',
      exercises: [
        {
          id: 'hou-speed-1',
          kind: 'speed-drill',
          prompt: 'Is the apartment furnished? (Is het...)',
          target: 'Is het appartement gemeubileerd?',
          automaticitySeconds: 20,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'hou-speed-2',
          kind: 'speed-drill',
          prompt: 'When is it available? (Wanneer is...)',
          target: 'Wanneer is de woning beschikbaar?',
          automaticitySeconds: 20,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'hou-3',
          kind: 'typed',
          prompt: 'Translate: How much is the security deposit?',
          target: 'Hoeveel is de borg?',
          acceptedAnswers: [
            'Hoeveel is de borg?',
            'Hoeveel is de borg',
            'Hoeveel bedraagt de borg?',
            'Hoeveel is de waarborgsom?',
            'Wat is de borg?',
          ],
          explanation: 'Use "Hoeveel is de borg?" or "Hoeveel bedraagt de waarborgsom?".',
          skills: ['production', 'meaning'],
          vocabulary: ['borg', 'waarborgsom'],
          placeholder: 'Hoeveel is...',
        },
      ],
    },
    {
      id: 'transform',
      title: 'Comparing Living Spaces & Requesting Viewings',
      kind: 'transform',
      intro: 'Use comparative adjectives and polite request phrasing.',
      exercises: [
        {
          id: 'hou-4',
          kind: 'typed',
          prompt: 'Translate: This apartment is bigger and quieter than my previous studio.',
          target: 'Dit appartement is groter en rustiger dan mijn vorige studio.',
          acceptedAnswers: [
            'Dit appartement is groter en rustiger dan mijn vorige studio.',
            'Dit appartement is groter en rustiger dan mijn vorige studio',
            'Deze woning is groter en rustiger dan mijn vorige studio.',
          ],
          explanation: 'Comparatives in Dutch take "-er" + "dan" (groter dan, rustiger dan).',
          skills: ['production', 'grammar'],
          vocabulary: ['groter', 'rustiger', 'vorige'],
          grammar: ['comparatives', 'adjective-inflection'],
        },
        {
          id: 'hou-5',
          kind: 'typed',
          prompt: 'Translate: I would like to schedule an appointment for a viewing.',
          target: 'Ik wil graag een afspraak maken voor een bezichtiging.',
          acceptedAnswers: [
            'Ik wil graag een afspraak maken voor een bezichtiging.',
            'Ik wil graag een afspraak maken voor een bezichtiging',
            'Ik zou graag een afspraak willen maken voor een bezichtiging.',
            'Ik wil graag een bezichtiging inplannen.',
          ],
          explanation: 'Use "Ik wil graag een afspraak maken voor een bezichtiging".',
          skills: ['production', 'grammar'],
          vocabulary: ['afspraak', 'bezichtiging'],
          grammar: ['polite-requests'],
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Viewing Request Message',
      kind: 'personalise',
      intro: 'Write a short message to a real estate agent introducing yourself and requesting to view an apartment.',
      exercises: [
        {
          id: 'hou-6',
          kind: 'personalise',
          prompt: 'Schrijf een kort bericht naar de makelaar: stel jezelf voor (naam, beroep), vermeld voor wie de woning is, en vraag om een bezichtiging.',
          target: 'Beste makelaar, ik ben ... en ik werk als ... Ik heb veel interesse in de woning en wil graag een bezichtiging plannen.',
          explanation: 'Include your profession, who you are moving with, and a polite viewing request.',
          skills: ['writing', 'production', 'automaticity'],
          vocabulary: ['interesse', 'bezichtiging', 'woning', 'afspraak'],
          grammar: ['word-order', 'polite-requests'],
          placeholder: 'Geachte makelaar, ik ben...',
        },
      ],
    },
  ],
};

export const pastStorytellingChapter: Chapter = {
  slug: 'verleden-tijd-en-verhalen',
  level: 'A2',
  title: 'Telling Stories in the Past (OVT)',
  capability: 'Recount past events, childhood memories, and sequential narratives using regular and irregular simple past (imperfectum).',
  description: 'Learn the simple past (OVT) to tell stories and describe past experiences naturally.',
  estimatedMinutes: 14,
  stages: [
    {
      id: 'discover',
      title: 'The Simple Past (OVT) Rules',
      kind: 'discover',
      intro: 'While spoken Dutch uses the perfect tense for recent individual actions, storytelling and background descriptions use the simple past (OVT). Regular verbs use \'-te(n)\' (if stem ends in \'t kofschip/t-fokschaap) or \'-de(n)\'.',
      exercises: [
        {
          id: 'ovt-induction',
          kind: 'induction',
          prompt: 'Notice regular past endings (-te vs -de)',
          skills: ['recognition', 'grammar'],
          inductionData: {
            examples: [
              { prompt: 'werken (stem ends in k -> in \'t kofschip)', answer: 'Ik werkte / Wij werkten' },
              { prompt: 'wonen (stem ends in n -> not in \'t kofschip)', answer: 'Ik woonde / Wij woonden' },
              { prompt: 'fietsen (stem ends in s -> in \'t kofschip)', answer: 'Ik fietste / Wij fietsten' },
            ],
            ruleChallenge: 'What is the past tense of "luisteren" (stem: luister)?',
            options: [
              { text: 'luisterde (ends in r, not in \'t kofschip)', isCorrect: true },
              { text: 'luisterte', isCorrect: false },
              { text: 'geluisterd', isCorrect: false },
            ],
          },
        },
        {
          id: 'ovt-1',
          kind: 'info',
          prompt: 'High-frequency irregular past verbs',
          context: 'zijn: was / waren (was/were)\nhebben: had / hadden (had)\ngaan: ging / gingen (went)\nzien: zag / zagen (saw)\nkomen: kwam / kwamen (came)\ndenken: dacht / dachten (thought)\nvinden: vond / vonden (found/felt)\nweten: wist / wisten (knew)\nblijven: bleef / bleven (stayed)',
          skills: ['recognition', 'meaning'],
          vocabulary: ['was', 'had', 'ging', 'zag', 'kwam', 'dacht', 'vond', 'wist', 'bleef'],
        },
      ],
    },
    {
      id: 'understand',
      title: 'A Weekend Trip to the Coast',
      kind: 'understand',
      intro: 'Read this narrative describing a rainy but cozy weekend in Zeeland.',
      exercises: [
        {
          id: 'ovt-2',
          kind: 'reading',
          prompt: 'Narrative in simple past',
          readingContent: 'Vorig weekend gingen we naar het strand in Zeeland. Het weer was helaas niet fantastisch: het regende en er stond een harde wind. Toch wandelden we langs de zee. \'s Avonds aten we verse vis in een gezellig restaurant en dronken we warme chocolademelk bij de open haard. We voelden ons helemaal ontspannen.',
          wordHints: {
            'helas': { meaning: 'unfortunately', category: 'adv' },
            'strand': { meaning: 'beach', category: 'noun' },
            'wandelden': { meaning: 'walked / strolled', category: 'verb (past)' },
            'open haard': { meaning: 'fireplace', category: 'noun' },
            'ontspannen': { meaning: 'relaxed', category: 'adj' },
          },
          skills: ['recognition', 'meaning'],
          vocabulary: ['strand', 'wandelen', 'ontspannen'],
        },
      ],
    },
    {
      id: 'retrieve',
      title: 'Irregular Past Forms Drill',
      kind: 'retrieve',
      intro: 'Recall the past tense forms of these key verbs.',
      exercises: [
        {
          id: 'ovt-speed-1',
          kind: 'speed-drill',
          prompt: 'Past of "gaan" (we ...)',
          target: 'wij gingen',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'ovt-speed-2',
          kind: 'speed-drill',
          prompt: 'Past of "blijven" (ik ...)',
          target: 'ik bleef',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'ovt-3',
          kind: 'typed',
          prompt: 'Translate: Yesterday I saw my old colleague in the supermarket.',
          target: 'Gisteren zag ik mijn oude collega in de supermarkt.',
          acceptedAnswers: [
            'Gisteren zag ik mijn oude collega in de supermarkt.',
            'Gisteren zag ik mijn oude collega in de supermarkt',
            'Ik zag gisteren mijn oude collega in de supermarkt.',
          ],
          explanation: 'When starting with "Gisteren", use inversion: "zag ik" (past of zien).',
          skills: ['production', 'grammar'],
          vocabulary: ['gisteren', 'zien', 'collega'],
          grammar: ['past-tense-ovt', 'inversion'],
        },
      ],
    },
    {
      id: 'transform',
      title: 'Present to Past Narrative Transformation',
      kind: 'transform',
      intro: 'Transform these present tense sentences into the past tense (OVT).',
      exercises: [
        {
          id: 'ovt-4',
          kind: 'typed',
          prompt: 'Convert to past tense: "We wonen in een klein dorp en werken in de stad."',
          target: 'We woonden in een klein dorp en werkten in de stad.',
          acceptedAnswers: [
            'We woonden in een klein dorp en werkten in de stad.',
            'We woonden in een klein dorp en werkten in de stad',
            'Wij woonden in een klein dorp en werkten in de stad.',
          ],
          explanation: '"Wonen" becomes "woonden" (-den) and "werken" becomes "werkten" (-ten).',
          skills: ['production', 'grammar'],
          grammar: ['past-tense-ovt'],
        },
        {
          id: 'ovt-5',
          kind: 'typed',
          prompt: 'Convert to past tense: "Het regent hard, maar we fietsen toch naar huis."',
          target: 'Het regende hard, maar we fietsten toch naar huis.',
          acceptedAnswers: [
            'Het regende hard, maar we fietsten toch naar huis.',
            'Het regende hard, maar we fietsten toch naar huis',
            'Het regende hard maar we fietsten toch naar huis.',
          ],
          explanation: '"Regent" becomes "regende" and "fietsen" becomes "fietsten".',
          skills: ['production', 'grammar'],
          grammar: ['past-tense-ovt'],
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Your Story in the Past',
      kind: 'personalise',
      intro: 'Write a short story about what you did on your favorite holiday or weekend using the simple past (OVT).',
      exercises: [
        {
          id: 'ovt-6',
          kind: 'personalise',
          prompt: 'Vertel een korte herinnering over een reis, weekend of kindertijd. Gebruik minstens drie werkwoorden in de onvoltooid verleden tijd (bijv. was, ging, zag, woonde, fietste, vond).',
          target: 'Toen ik jong was, woonde ik in een ander land en ging ik elke dag naar het park.',
          explanation: 'Use simple past forms like "was", "ging", "woonde", "hadden", "maakten".',
          skills: ['writing', 'production', 'automaticity'],
          vocabulary: ['toen', 'vroeger', 'vakantie', 'reis'],
          grammar: ['past-tense-ovt', 'time-clauses'],
          placeholder: 'Toen ik...',
        },
      ],
    },
  ],
};
export const a2Capstone: Chapter = {
  slug: 'a2-verhuisdag-capstone',
  level: 'A2',
  title: 'Moving Day in Utrecht',
  capability: 'Handle a full day of independent living: describe your daily routine, tell a short story in the past tense, arrange a doctor appointment, describe your train journey, and settle practical housing details with your neighbour.',
  description: 'The A2 capstone. Combine everything you have learned at A2 — daily routines, past-tense storytelling, doctor appointments, public transit, and house-hunting — in one live conversation.',
  estimatedMinutes: 25,
  isCapstone: true,
  stages: [
    {
      id: 'mission',
      title: 'The Moving Day Challenge',
      kind: 'personalise',
      intro: 'You have just moved to Utrecht. Your new neighbour Fatima helps you carry the last boxes and wants to get to know you. Use everything you have learned in A2 to keep the conversation going and complete all five goals.',
      exercises: [
        {
          id: 'a2-cap-1',
          kind: 'conversation',
          prompt: 'Welkom in Utrecht! Ik ben Fatima, je nieuwe buurvrouw. Wat een drukke dag voor jou! Vertel eens: hoe was de reis vandaag met de trein? En waar woonde je hiervoor? Ik hoorde dat je morgen de huisarts wilt bellen voor een afspraak. Over de huur en de verwarming van je nieuwe appartement kun je mij ook alles vragen. Oh, en ik ben benieuwd: hoe ziet jouw normale dag er eigenlijk uit?',
          simulatorResponse: 'Goh, wat interessant! Vertel me daar eens wat meer over. Ik luister graag.',
          aiPersonality: { isDifficult: false, style: 'helpful', pushbackProbability: 0.2 },
          skills: ['speaking', 'production', 'automaticity', 'pragmatic', 'interaction'],
          missionGoals: [
            { id: 'travel', label: 'Describe your train journey today', keywords: ['trein', 'overgestapt', 'overstappen', 'vertraging', 'inchecken', 'station', 'gegaan'] },
            { id: 'story', label: 'Tell a short story about the move (past tense)', keywords: ['ging', 'waren', 'woonde', 'lukte', 'regende', 'verhuizing', 'dozen'] },
            { id: 'routine', label: 'Describe your normal daily routine', keywords: ['sta op', 'sta om', 'opstaan', 'ontbijt', 'lunch', 'werk', 'sport'] },
            { id: 'doctor', label: 'Mention calling the doctor for an appointment', keywords: ['huisarts', 'dokter', 'ziek', 'niet lekker', 'keelpijn', 'pijn'] },
            { id: 'housing', label: 'Ask about rent, heating, and the apartment', keywords: ['huur', 'verwarming', 'borg', 'waarborgsom', 'gwl', 'balkon'] },
          ],
        },
      ],
    },
  ],
};

export const businessEmailChapter: Chapter = {
  slug: 'zakelijke-e-mails-en-verzoeken',
  level: 'B1',
  title: 'Professional Emails & Formal Requests',
  capability: 'Draft polite, clear workplace emails: request information, attach documents, follow up respectfully, and use appropriate openings and closings.',
  description: 'Master professional written communication for Dutch workplaces and business contexts.',
  estimatedMinutes: 14,
  stages: [
    {
      id: 'discover',
      title: 'Email Openings & Formal Closings',
      kind: 'discover',
      intro: 'In Dutch workplace emails, selecting the right opening (*Geachte* for formal/external vs *Beste* for standard professional) and closing (*Met vriendelijke groet*) establishes professional rapport.',
      exercises: [
        {
          id: 'mail-induction',
          kind: 'induction',
          prompt: 'Notice formulaic conventions in business emails',
          skills: ['recognition', 'pragmatic'],
          inductionData: {
            examples: [
              { prompt: 'Formal external opening', answer: 'Geachte heer Jansen,' },
              { prompt: 'Colleague / known contact opening', answer: 'Beste Peter,' },
              { prompt: 'Standard professional closing', answer: 'Met vriendelijke groet,' },
            ],
            ruleChallenge: 'Which opening is the most formal and appropriate for official agencies or unknown clients?',
            options: [
              { text: 'Geachte heer / mevrouw,', isCorrect: true },
              { text: 'Hoi allemaal,', isCorrect: false },
              { text: 'Beste vrienden,', isCorrect: false },
            ],
          },
        },
        {
          id: 'mail-1',
          kind: 'info',
          prompt: 'Standard business email phrases',
          context: 'Naar aanleiding van ons gesprek... (Further to our conversation...)\nIn de bijlage treft u de offerte aan. (Please find the quote attached.)\nZou u mij kunnen laten weten of...? (Could you let me know whether...?)\nIk hoor graag van u. (I look forward to hearing from you.)\nBij voorbaat dank voor uw reactie. (Thank you in advance for your reply.)\nMet vriendelijke groet, (With kind regards,)',
          skills: ['recognition', 'meaning'],
          vocabulary: ['naar aanleiding van', 'bijlage', 'aantreffen', 'offerte', 'bij voorbaat dank', 'met vriendelijke groet'],
        },
      ],
    },
    {
      id: 'understand',
      title: 'Requesting Project Feedback',
      kind: 'understand',
      intro: 'Analyze this professional email requesting feedback on a quarterly report.',
      exercises: [
        {
          id: 'mail-2',
          kind: 'reading',
          prompt: 'Project coordination email',
          readingContent: 'Beste collega\'s,\n\nNaar aanleiding van onze vergadering van afgelopen dinsdag stuur ik jullie hierbij het bijgewerkte projectplan. In de bijlage treffen jullie het volledige overzicht aan.\n\nZouden jullie het document vóór aanstaande vrijdag kunnen doornemen en eventuele opmerkingen aan mij doorgeven? Mocht er nog iets onduidelijk zijn, laat het mij dan gerust weten.\n\nAlvast hartelijk dank voor jullie medewerking.\n\nMet vriendelijke groet,\nLisa van Dam',
          wordHints: {
            bijgewerkte: { meaning: 'updated', category: 'adj' },
            doornemen: { meaning: 'to review / go through', category: 'verb' },
            opmerkingen: { meaning: 'feedback / comments', category: 'noun' },
            medewerking: { meaning: 'cooperation / assistance', category: 'noun' },
          },
          skills: ['recognition', 'meaning'],
          vocabulary: ['bijgewerkt', 'doornemen', 'opmerkingen', 'medewerking'],
        },
      ],
    },
    {
      id: 'retrieve',
      title: 'Email Formulas Recall',
      kind: 'retrieve',
      intro: 'Recall these standard workplace formulas accurately.',
      exercises: [
        {
          id: 'mail-speed-1',
          kind: 'speed-drill',
          prompt: 'Kind regards (closing)',
          target: 'Met vriendelijke groet',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'mail-speed-2',
          kind: 'speed-drill',
          prompt: 'In the attachment you will find...',
          target: 'In de bijlage treft u',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'mail-3',
          kind: 'typed',
          prompt: 'Translate: Thank you in advance for your assistance.',
          target: 'Bij voorbaat dank voor uw medewerking.',
          acceptedAnswers: [
            'Bij voorbaat dank voor uw medewerking.',
            'Bij voorbaat dank voor uw medewerking',
            'Bij voorbaat dank voor uw hulp.',
            'Alvast dank voor uw medewerking.',
          ],
          explanation: 'Use the standard formula "Bij voorbaat dank voor uw medewerking".',
          skills: ['production', 'pragmatic'],
          vocabulary: ['bij voorbaat dank', 'medewerking'],
        },
      ],
    },
    {
      id: 'transform',
      title: 'Softening Blunt Inquiries',
      kind: 'transform',
      intro: 'Transform direct, blunt demands into courteous professional requests using "Zou u kunnen..." and indirect clauses.',
      exercises: [
        {
          id: 'mail-4',
          kind: 'typed',
          prompt: 'Rewrite politely: "Stuur mij het bestand vandaag nog." (Use: "Zou u mij... kunnen sturen?")',
          target: 'Zou u mij het bestand vandaag nog kunnen sturen?',
          acceptedAnswers: [
            'Zou u mij het bestand vandaag nog kunnen sturen?',
            'Zou u mij het bestand vandaag nog kunnen sturen',
            'Zou u mij het bestand vandaag kunnen toesturen?',
            'Zou u het bestand vandaag nog naar mij kunnen sturen?',
          ],
          explanation: 'Use the conditional modal "Zou u [object] kunnen sturen?" to soften the request.',
          skills: ['production', 'pragmatic', 'grammar'],
          vocabulary: ['bestand', 'toesturen'],
          grammar: ['conditional', 'modal-verbs'],
        },
        {
          id: 'mail-5',
          kind: 'typed',
          prompt: 'Translate: I would like to know if the meeting is still taking place tomorrow.',
          target: 'Ik zou graag willen weten of de vergadering morgen doorgaat.',
          acceptedAnswers: [
            'Ik zou graag willen weten of de vergadering morgen doorgaat.',
            'Ik zou graag willen weten of de vergadering morgen doorgaat',
            'Ik wil graag weten of de vergadering morgen doorgaat.',
            'Ik zou graag willen weten of het overleg morgen doorgaat.',
          ],
          explanation: 'Indirect question with "of": the verb "doorgaat" moves to the end of the subclause.',
          skills: ['production', 'grammar'],
          vocabulary: ['vergadering', 'doorgaan'],
          grammar: ['indirect-questions', 'subordinate-clauses', 'separable-verbs'],
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Compose a Professional Email',
      kind: 'personalise',
      intro: 'Draft a short email to your project manager or client requesting an update on a deliverable or proposing a deadline adjustment.',
      exercises: [
        {
          id: 'mail-6',
          kind: 'personalise',
          prompt: 'Schrijf een zakelijke e-mail aan je leidinggevende of een collega. Gebruik een formele opening, leg het verzoek uit met "zou kunnen" of "in de bijlage", en sluit netjes af.',
          target: 'Beste collega, naar aanleiding van ons project stuur ik u de update. In de bijlage treft u het overzicht aan. Met vriendelijke groet, ...',
          explanation: 'Structure with opening, context, polite request, and formal sign-off.',
          skills: ['writing', 'production', 'pragmatic'],
          vocabulary: ['naar aanleiding van', 'bijlage', 'met vriendelijke groet', 'zou kunnen'],
          grammar: ['polite-requests', 'word-order'],
          placeholder: 'Beste [naam], naar aanleiding van...',
        },
      ],
    },
  ],
};

export const debatingAgreementChapter: Chapter = {
  slug: 'instemmen-en-weerleggen',
  level: 'B1',
  title: 'Debating, Agreeing & Nuanced Disagreement',
  capability: 'Engage constructively in meetings and discussions: agree with conditions, reframe points, and voice diplomatic disagreement.',
  description: 'Move beyond basic yes/no to express nuanced agreement, partial consensus, and polite counter-arguments.',
  estimatedMinutes: 15,
  relatedArticleSlug: 'b1-thuiswerken',
  stages: [
    {
      id: 'discover',
      title: 'Nuanced Connectors & Agreement Signals',
      kind: 'discover',
      intro: 'At B1, discussion requires balancing multiple perspectives using contrast connectors (*enerzijds... anderzijds*, *daarentegen*, *tot op zekere hoogte*) and diplomatic agreement signals.',
      exercises: [
        {
          id: 'deb-induction',
          kind: 'induction',
          prompt: 'Notice how speakers concede a point before adding a caveat',
          skills: ['recognition', 'pragmatic'],
          inductionData: {
            examples: [
              { prompt: 'Complete agreement', answer: 'Daar ben ik het helemaal mee eens.' },
              { prompt: 'Partial concession', answer: 'Daar zit wat in, maar we moeten ook aan de kosten denken.' },
              { prompt: 'Balanced contrast', answer: 'Enerzijds bespaart het tijd, anderzijds kost het meer energie.' },
            ],
            ruleChallenge: 'Which phrase is best for acknowledging someone has a valid point without 100% agreeing?',
            options: [
              { text: 'Daar zit wat in, maar...', isCorrect: true },
              { text: 'Dat is helemaal verkeerd.', isCorrect: false },
              { text: 'Ik vind het best.', isCorrect: false },
            ],
          },
        },
        {
          id: 'deb-1',
          kind: 'info',
          prompt: 'Discussion and debate phrases',
          context: 'Daar ben ik het volkomen mee eens. (I completely agree with that.)\nTot op zekere hoogte klopt dat. (To a certain extent that is true.)\nIk zie dat toch anders. (I see that differently.)\nEnerzijds... anderzijds... (On the one hand... on the other hand...)\nDaar staat tegenover dat... (On the other hand / set against that is...)\nHoewel het voorstel goed klinkt, zijn er nadelen. (Although the proposal sounds good, there are downsides.)',
          skills: ['recognition', 'meaning'],
          vocabulary: ['volkomen', 'tot op zekere hoogte', 'enerzijds', 'anderzijds', 'daar staat tegenover', 'hoewel'],
        },
      ],
    },
    {
      id: 'understand',
      title: 'Workplace Strategy Meeting',
      kind: 'understand',
      intro: 'Follow this debate between two team leads discussing a new hybrid work policy.',
      exercises: [
        {
          id: 'deb-2',
          kind: 'reading',
          prompt: 'Meeting dialogue',
          readingContent: 'Mark: "Volgens mij moeten we van iedereen eisen dat ze minimaal vier dagen per week naar kantoor komen. Dat versterkt de teamcultuur."\n\nSandra: "Daar zit zeker wat in, Mark. Maar tot op zekere hoogte zijn onze ontwikkelaars juist productiever wanneer ze rustig thuis kunnen werken. Enerzijds begrijp ik jouw wens voor verbinding, maar anderzijds lopen we het risico dat getalenteerde medewerkers vertrekken als we te streng zijn."\n\nMark: "Daar heb je een punt. Laten we naar een flexibele tussenoplossing zoeken."',
          wordHints: {
            versterkt: { meaning: 'strengthens', category: 'verb' },
            ontwikkelaars: { meaning: 'developers', category: 'noun' },
            verbinding: { meaning: 'connection / bonding', category: 'noun' },
            tussenoplossing: { meaning: 'compromise / middle ground', category: 'noun' },
          },
          skills: ['recognition', 'meaning'],
          vocabulary: ['versterken', 'ontwikkelaars', 'verbinding', 'tussenoplossing'],
        },
      ],
    },
    {
      id: 'retrieve',
      title: 'Discussion Responses Recall',
      kind: 'retrieve',
      intro: 'Produce clear debate phrases under time constraints.',
      exercises: [
        {
          id: 'deb-speed-1',
          kind: 'speed-drill',
          prompt: 'I completely agree (Daar ben...)',
          target: 'Daar ben ik het helemaal mee eens',
          automaticitySeconds: 20,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'deb-speed-2',
          kind: 'speed-drill',
          prompt: 'To a certain extent (Tot op...)',
          target: 'Tot op zekere hoogte',
          automaticitySeconds: 20,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'deb-3',
          kind: 'typed',
          prompt: 'Translate: You have a point, but I view the situation differently.',
          target: 'Daar heb je een punt, maar ik bekijk de situatie anders.',
          acceptedAnswers: [
            'Daar heb je een punt, maar ik bekijk de situatie anders.',
            'Daar heb je een punt, maar ik bekijk de situatie anders',
            'Daar heb je een punt, maar ik zie de situatie anders.',
            'Je hebt een punt, maar ik zie dat toch anders.',
          ],
          explanation: 'Combine "Daar heb je een punt" with a contrasting clause.',
          skills: ['production', 'pragmatic'],
          vocabulary: ['punt hebben', 'situatie', 'bekijken'],
        },
      ],
    },
    {
      id: 'transform',
      title: 'Constructing Balanced Arguments',
      kind: 'transform',
      intro: 'Formulate balanced sentences using subordinating conjunctions and correlative connectors.',
      exercises: [
        {
          id: 'deb-4',
          kind: 'typed',
          prompt: 'Combine into one sentence with "Hoewel": "Het plan is duur. Het plan lost wel veel problemen op."',
          target: 'Hoewel het plan duur is, lost het wel veel problemen op.',
          acceptedAnswers: [
            'Hoewel het plan duur is, lost het wel veel problemen op.',
            'Hoewel het plan duur is, lost het wel veel problemen op',
            'Hoewel het plan duur is lost het wel veel problemen op.',
          ],
          explanation: '"Hoewel" causes verb-final in the subclause ("duur is"), followed by V2 inversion in the main clause ("lost het").',
          skills: ['production', 'grammar'],
          grammar: ['hoewel', 'subordinate-clauses', 'inversion'],
        },
        {
          id: 'deb-5',
          kind: 'typed',
          prompt: 'Translate: On the one hand the investment is high, on the other hand the revenue increases.',
          target: 'Enerzijds is de investering hoog, anderzijds stijgt de omzet.',
          acceptedAnswers: [
            'Enerzijds is de investering hoog, anderzijds stijgt de omzet.',
            'Enerzijds is de investering hoog, anderzijds stijgt de omzet',
            'Aan de ene kant is de investering hoog, aan de andere kant stijgt de omzet.',
          ],
          explanation: 'Both "enerzijds" and "anderzijds" trigger V2 inversion (adverb -> finite verb -> subject).',
          skills: ['production', 'grammar'],
          vocabulary: ['investering', 'omzet', 'stijgen', 'enerzijds', 'anderzijds'],
          grammar: ['inversion', 'correlative-structures'],
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Your Perspective in a Debate',
      kind: 'personalise',
      intro: 'Give a balanced opinion on a current workplace, educational, or societal topic.',
      exercises: [
        {
          id: 'deb-6',
          kind: 'personalise',
          prompt: 'Reageer op een stelling uit jouw vakgebied (bijv. over AI, flexwerken of automatisering). Gebruik "enerzijds... anderzijds" of "hoewel" om een genuanceerd standpunt in te nemen.',
          target: 'Hoewel technologie veel processen versnelt, blijft menselijk contact onmisbaar.',
          explanation: 'State both an advantage and a reservation using "hoewel" or "enerzijds... anderzijds".',
          skills: ['speaking', 'writing', 'production', 'coherence'],
          vocabulary: ['enerzijds', 'anderzijds', 'hoewel', 'mening', 'standpunt'],
          grammar: ['subordinate-clauses', 'inversion'],
          placeholder: 'Hoewel...',
        },
      ],
    },
  ],
};

export const civicServicesChapter: Chapter = {
  slug: 'gemeente-en-instanties',
  level: 'B1',
  title: 'Navigating Municipal Services & Bureaucracy',
  capability: 'Interact confidently with Dutch civil offices: book appointments, register addresses (BSN), ask about permits, and understand official instructions.',
  description: 'Navigate the Gemeente, BSN registration, official letters, and civic procedures with confidence.',
  estimatedMinutes: 15,
  relatedArticleSlug: 'b1-gemeente-inschrijven',
  stages: [
    {
      id: 'discover',
      title: 'Administrative Terminology & Civic Concepts',
      kind: 'discover',
      intro: 'When dealing with Dutch municipalities (*de gemeente*), institutions communicate using formal terms like "inschrijving" (registration), "uittreksel" (official extract), "burgerservicenummer (BSN)", and "leges" (administrative fees).',
      exercises: [
        {
          id: 'civ-induction',
          kind: 'induction',
          prompt: 'Notice administrative requirements and modal verbs of obligation',
          skills: ['recognition', 'meaning'],
          inductionData: {
            examples: [
              { prompt: 'Formal obligation with dienen', answer: 'U dient uw paspoort mee te nemen.' },
              { prompt: 'Passive administrative instruction', answer: 'De aanvraag wordt digitaal verwerkt.' },
              { prompt: 'Time condition', answer: 'Binnen vijf werkdagen ontvangt u bericht.' },
            ],
            ruleChallenge: 'What does "U dient [document] te overleggen" mean in formal Dutch?',
            options: [
              { text: 'You are required to provide / present [document]', isCorrect: true },
              { text: 'You can optionally discard [document]', isCorrect: false },
              { text: 'You should translate [document]', isCorrect: false },
            ],
          },
        },
        {
          id: 'civ-1',
          kind: 'info',
          prompt: 'Official civic terms',
          context: 'de Basisregistratie Personen (BRP) (municipal personal records)\nhet burgerservicenummer (BSN) (citizen service number / tax ID)\nhet uittreksel (official registry extract)\nde vergunning aanvragen (to apply for a permit)\nde leges betalen (to pay municipal administration fees)\nhet legitimatiebewijs (identity document / passport)',
          skills: ['recognition', 'meaning'],
          vocabulary: ['BRP', 'BSN', 'uittreksel', 'vergunning', 'leges', 'legitimatiebewijs', 'gemeente'],
        },
      ],
    },
    {
      id: 'understand',
      title: 'Municipal Appointment Instructions',
      kind: 'understand',
      intro: 'Read this official confirmation letter from the municipal service desk (*Publiekszaken*).',
      exercises: [
        {
          id: 'civ-2',
          kind: 'reading',
          prompt: 'Appointment confirmation letter',
          readingContent: 'Geachte inwoner,\n\nHierbij bevestigen wij uw afspraak op het Stadskantoor voor de eerste inschrijving in de Basisregistratie Personen (BRP). Uw afspraak vindt plaats op donderdag 22 oktober om 10:30 uur aan balie 4.\n\nWat moet u meenemen?\n- Een geldig paspoort of Europese identiteitskaart van alle gezinsleden;\n- Een door beide partijen ondertekende huurovereenkomst of koopakte;\n- Indien van toepassing: een gelegaliseerde geboorteakte.\n\nLet op: Indien uw documenten niet compleet zijn, kan uw inschrijving niet in behandeling worden genomen.',
          wordHints: {
            'inwoner': { meaning: 'resident / citizen', category: 'noun' },
            'huurovereenkomst': { meaning: 'lease agreement / rental contract', category: 'noun' },
            'koopakte': { meaning: 'deed of purchase', category: 'noun' },
            'gelegaliseerde': { meaning: 'legalized / authenticated', category: 'adj' },
            'in behandeling': { meaning: 'under consideration / processed', category: 'prep phrase' },
          },
          skills: ['recognition', 'meaning'],
          vocabulary: ['inwoner', 'huurovereenkomst', 'koopakte', 'gelegaliseerd'],
        },
      ],
    },
    {
      id: 'retrieve',
      title: 'Civic Service Desk Inquiries',
      kind: 'retrieve',
      intro: 'Inquire clearly about administrative processes at the municipal service counter.',
      exercises: [
        {
          id: 'civ-speed-1',
          kind: 'speed-drill',
          prompt: 'Apply for a permit (Een vergunning...)',
          target: 'Een vergunning aanvragen',
          automaticitySeconds: 20,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'civ-speed-2',
          kind: 'speed-drill',
          prompt: 'How long does the processing take? (Hoe lang...)',
          target: 'Hoe lang duurt de behandeling?',
          automaticitySeconds: 20,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'civ-3',
          kind: 'typed',
          prompt: 'Translate: I would like to register at my new address and apply for a BSN.',
          target: 'Ik wil me graag inschrijven op mijn nieuwe adres en een BSN aanvragen.',
          acceptedAnswers: [
            'Ik wil me graag inschrijven op mijn nieuwe adres en een BSN aanvragen.',
            'Ik wil me graag inschrijven op mijn nieuwe adres en een BSN aanvragen',
            'Ik wil mij graag inschrijven op mijn nieuwe adres en een BSN aanvragen.',
            'Ik zou me graag willen inschrijven op mijn nieuwe adres en een BSN aanvragen.',
          ],
          explanation: 'Use the reflexive verb "zich inschrijven" (ik wil me inschrijven) and "aanvragen".',
          skills: ['production', 'grammar'],
          vocabulary: ['inschrijven', 'adres', 'BSN', 'aanvragen'],
          grammar: ['reflexive-verbs', 'modal-verbs'],
        },
      ],
    },
    {
      id: 'transform',
      title: 'Formal Bureaucratic Instructions',
      kind: 'transform',
      intro: 'Practice understanding and transforming administrative requirements using formal structures like "dienen te" and the passive voice.',
      exercises: [
        {
          id: 'civ-4',
          kind: 'typed',
          prompt: 'Rewrite using formal "U dient... te overleggen": "U moet uw huurcontract laten zien."',
          target: 'U dient uw huurcontract te overleggen.',
          acceptedAnswers: [
            'U dient uw huurcontract te overleggen.',
            'U dient uw huurcontract te overleggen',
            'U dient het huurcontract te overleggen.',
          ],
          explanation: 'Formal administrative Dutch replaces "moeten laten zien" with "dienen te overleggen".',
          skills: ['production', 'pragmatic', 'grammar'],
          vocabulary: ['dienen', 'overleggen', 'huurcontract'],
          grammar: ['formal-register', 'semi-auxiliary-verbs'],
        },
        {
          id: 'civ-5',
          kind: 'typed',
          prompt: 'Translate: The official confirmation will be sent to your home address within two weeks.',
          target: 'De officiële bevestiging wordt binnen twee weken naar uw woonadres gestuurd.',
          acceptedAnswers: [
            'De officiële bevestiging wordt binnen twee weken naar uw woonadres gestuurd.',
            'De officiële bevestiging wordt binnen twee weken naar uw woonadres gestuurd',
            'De officiële bevestiging wordt binnen twee weken naar uw adres verstuurd.',
            'De bevestiging wordt binnen twee weken naar uw adres verzonden.',
          ],
          explanation: 'Passive voice with "wordt ... gestuurd" / "verzonden".',
          skills: ['production', 'grammar'],
          vocabulary: ['bevestiging', 'woonadres', 'binnen twee weken'],
          grammar: ['passive-voice', 'word-order'],
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Simulate a Municipal Service Appointment',
      kind: 'personalise',
      intro: 'Simulate an interaction at the Stadskantoor desk: state what service you need (registration, permit, certificate) and what documents you have brought with you.',
      exercises: [
        {
          id: 'civ-6',
          kind: 'personalise',
          prompt: 'Je staat aan de balie van de gemeente. Leg uit waarvoor je komt (bijv. verhuizing doorgeven, BSN regelen of uittreksel aanvragen) en welke documenten je bij je hebt.',
          target: 'Goedendag, ik kom voor mijn inschrijving in de gemeente. Ik heb mijn paspoort en het huurcontract bij me.',
          explanation: 'Politely explain your goal using "Ik kom voor...", "Ik wil graag...", and mention your documents.',
          skills: ['speaking', 'production', 'pragmatic'],
          vocabulary: ['inschrijving', 'gemeente', 'paspoort', 'huurcontract', 'afspraak'],
          grammar: ['polite-requests', 'word-order'],
          placeholder: 'Goedendag, ik kom voor...',
        },
      ],
    },
  ],
};

export const maritimeChapter: Chapter = {
  slug: 'piraten-en-maritieme-zeevaart',
  level: 'B2',
  title: 'Pirates, Privateers & The Maritime Age',
  capability: 'Discuss 17th-century maritime history, contrast privateering (kaapvaart) with piracy (zeeroof), analyze naval tactics, and master Dutch nautical idioms in modern discourse.',
  description: 'Explore the high seas of the Dutch Golden Age: naval battles, the Silver Fleet, letters of marque, life aboard sailing ships, and maritime idioms vibrant in Dutch today.',
  estimatedMinutes: 12,
  relatedArticleSlug: 'b2-zilvervloot-en-kaapvaart',
  stages: [
    {
      id: 'discover',
      title: 'Privateering, Piracy & Maritime Lexicon',
      kind: 'discover',
      intro: 'In the 17th century, there was a strict legal distinction between "zeeroof" (unlawful piracy) and "kaapvaart" (state-sanctioned privateering with an official "kaperbrief"). Discover the nautical vocabulary and vivid seafaring idioms that remain central to modern Dutch.',
      exercises: [
        {
          id: 'mar-induction',
          kind: 'induction',
          prompt: 'Distinguish privateering from piracy and analyze nautical terms',
          skills: ['recognition', 'meaning'],
          inductionData: {
            examples: [
              { prompt: 'State-sanctioned raid on enemy ships', answer: 'kaapvaart (met een kaperbrief van de Staten-Generaal)' },
              { prompt: 'Illegal plunder on the high seas', answer: 'zeeroof (ongeoorloofde piraterij voor eigen gewin)' },
              { prompt: 'Boarding an enemy vessel by force', answer: 'het enteren van een schip' },
            ],
            ruleChallenge: 'What was the legal document called that authorized a captain to attack enemy ships on behalf of the Dutch Republic?',
            options: [
              { text: 'Een kaperbrief', isCorrect: true },
              { text: 'Een scheepsjournaal', isCorrect: false },
              { text: 'Een vlootvoogdij', isCorrect: false },
            ],
          },
        },
        {
          id: 'mar-info-1',
          kind: 'info',
          prompt: 'Nautical & naval terminology',
          context: 'de kaperbrief (letter of marque / privateering commission)\nhet vlaggenschip (flagship)\nenteren (to board an enemy vessel)\nde buit / de schat (the booty / plunder / treasure)\nhet ruim / het laadruim (the cargo hold)\nde kombuis (the galley / ship\'s kitchen)\nhet kraaiennest (the crow\'s nest)\nmuiterij (mutiny)\nscheurbuik (scurvy)\novermeesteren (to overpower / capture)',
          skills: ['recognition', 'meaning'],
          vocabulary: ['kaperbrief', 'vlaggenschip', 'enteren', 'buit', 'laadruim', 'kombuis', 'kraaiennest', 'muiterij', 'scheurbuik', 'overmeesteren'],
        },
        {
          id: 'mar-info-2',
          kind: 'info',
          prompt: 'Living Dutch maritime idioms used in daily life',
          context: 'alle hens aan dek = everyone must help urgently ("all hands on deck")\nhet roer omgooien = to radically change course or strategy\nkapers op de kust = lurking competitors or rivals seeking to seize an opportunity\nschoon schip maken = to thoroughly resolve issues or start with a clean slate\noverstag gaan = to change one\'s mind / give in to persuasion\nbakzeil halen = to back down / admit defeat',
          skills: ['recognition', 'idiomatic', 'meaning'],
          idioms: ['alle hens aan dek', 'het roer omgooien', 'kapers op de kust', 'schoon schip maken', 'overstag gaan', 'bakzeil halen'],
        },
      ],
    },
    {
      id: 'understand',
      title: 'The Capture of the Silver Fleet (1628)',
      kind: 'understand',
      intro: 'Read this historical chronicle of Admiral Piet Hein capturing the Spanish Silver Fleet in the Bay of Matanzas for the West India Company (WIC).',
      exercises: [
        {
          id: 'mar-reading',
          kind: 'reading',
          prompt: 'Historical chronicle: De Verovering van de Zilvervloot',
          readingContent: 'In september 1628 behaalde luitenant-admiraal Piet Hein een legendarische overwinning in de baai van Matanzas bij Cuba. Uitgerust met een officiële kaperbrief van de Republiek der Zeven Verenigde Nederlanden, slaagde zijn vloot erin de Spaanse Zilvervloot zonder noemenswaardig bloedvergieten te omsingelen.\n\nDe Spaanse galjoenen, volgeladen met zilver, goud en kostbare specerijen, werden door de Nederlandse matrozen geënterd en overmeesterd. De fabelachtige buit ter waarde van ruim elf miljoen gulden financierde niet alleen het leger van stadhouder Frederik Hendrik in de Tachtigjarige Oorlog, maar bezorgde Piet Hein ook een onsterfelijke heldenstatus in de maritieme geschiedenis.',
          wordHints: {
            behaalde: { meaning: 'achieved / scored', category: 'verb (past)' },
            bloedvergieten: { meaning: 'bloodshed', category: 'noun' },
            omsingelen: { meaning: 'to encircle / surround', category: 'verb' },
            galjoenen: { meaning: 'galleons', category: 'noun' },
            volgeladen: { meaning: 'heavily loaded / laden', category: 'adj' },
            geënterd: { meaning: 'boarded', category: 'verb (past part)' },
            fabelachtige: { meaning: 'fabulous / legendary', category: 'adj' },
            buit: { meaning: 'booty / loot / spoils', category: 'noun' },
            bezorgde: { meaning: 'earned / provided / secured for', category: 'verb (past)' },
          },
          skills: ['recognition', 'meaning', 'coherence'],
          vocabulary: ['bloedvergieten', 'omsingelen', 'galjoen', 'buit', 'specerijen', 'financierde'],
        },
      ],
    },
    {
      id: 'retrieve',
      title: 'Rapid Nautical Recall & Idioms',
      kind: 'retrieve',
      intro: 'Instantly produce nautical terms and historical idioms.',
      exercises: [
        {
          id: 'mar-speed-1',
          kind: 'speed-drill',
          prompt: 'All hands on deck! (Alle hens...)',
          target: 'Alle hens aan dek!',
          automaticitySeconds: 10,
          skills: ['automaticity', 'idiomatic'],
        },
        {
          id: 'mar-speed-2',
          kind: 'speed-drill',
          prompt: 'Board the enemy ship (Het schip...)',
          target: 'Het schip enteren',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'mar-speed-3',
          kind: 'speed-drill',
          prompt: 'Competitors / rivals lurking (Kapers...)',
          target: 'Er zijn kapers op de kust',
          automaticitySeconds: 10,
          skills: ['automaticity', 'idiomatic'],
        },
        {
          id: 'mar-3',
          kind: 'typed',
          prompt: 'Translate: The admiral held an official letter of marque from the Dutch Republic.',
          target: 'De admiraal beschikte over een officiële kaperbrief van de Republiek.',
          acceptedAnswers: [
            'De admiraal beschikte over een officiële kaperbrief van de Republiek.',
            'De admiraal beschikte over een officiële kaperbrief van de Republiek',
            'De admiraal had een officiële kaperbrief van de Republiek.',
            'De admiraal had een officiële kaperbrief van de Republiek',
            'De admiraal bezat een officiële kaperbrief van de Republiek.',
          ],
          explanation: 'Use "kaperbrief" and "Republiek". "Beschikte over" or "had" both work well.',
          skills: ['production', 'meaning'],
          vocabulary: ['admiraal', 'kaperbrief', 'Republiek'],
          placeholder: 'De admiraal...',
        },
      ],
    },
    {
      id: 'transform',
      title: 'Historical Chronicles & Modern Idiom Application',
      kind: 'transform',
      intro: 'Practice transforming active naval combat reports into passive chronicles, applying past perfect temporal sequences, and reframing modern situations with nautical idioms.',
      exercises: [
        {
          id: 'mar-4',
          kind: 'typed',
          prompt: 'Rewrite in the passive voice (lijdende vorm): "De kapers overmeesterden het Spaanse galjoen in de baai."',
          target: 'Het Spaanse galjoen werd door de kapers overmeesterd in de baai.',
          acceptedAnswers: [
            'Het Spaanse galjoen werd door de kapers overmeesterd in de baai.',
            'Het Spaanse galjoen werd door de kapers overmeesterd in de baai',
            'Het Spaanse galjoen werd in de baai door de kapers overmeesterd.',
            'Het Spaanse galjoen werd in de baai overmeesterd door de kapers.',
            'Het Spaanse galjoen werd door de kapers in de baai overmeesterd.',
          ],
          explanation: 'Transform active "overmeesterden" into past passive "werd ... overmeesterd door de kapers".',
          skills: ['production', 'grammar'],
          vocabulary: ['galjoen', 'kapers', 'overmeesterd'],
          grammar: ['passive-voice'],
        },
        {
          id: 'mar-5',
          kind: 'typed',
          prompt: 'Combine using "nadat" + past perfect (VVT): (1) De kapitein gaf het bevel. (2) De bemanning enterde het vijandelijke schip.',
          target: 'Nadat de kapitein het bevel had gegeven, enterde de bemanning het vijandelijke schip.',
          acceptedAnswers: [
            'Nadat de kapitein het bevel had gegeven, enterde de bemanning het vijandelijke schip.',
            'Nadat de kapitein het bevel had gegeven, enterde de bemanning het vijandelijke schip',
            'Nadat de kapitein het bevel had gegeven enterde de bemanning het vijandelijke schip',
          ],
          explanation: 'In the subordinate clause with "nadat", use past perfect "had gegeven" with verb-final word order, followed by inversion in the main clause "enterde de bemanning".',
          skills: ['production', 'grammar'],
          vocabulary: ['bevel', 'bemanning', 'enteren'],
          grammar: ['subordinate-clauses', 'past-perfect', 'word-order'],
        },
        {
          id: 'mar-6',
          kind: 'typed',
          prompt: 'Express idiomatically: "We moeten onze strategie compleet veranderen omdat er concurrenten op de loer liggen." (Use "het roer omgooien" and "kapers op de kust")',
          target: 'We moeten het roer omgooien omdat er kapers op de kust zijn.',
          acceptedAnswers: [
            'We moeten het roer omgooien omdat er kapers op de kust zijn.',
            'We moeten het roer omgooien omdat er kapers op de kust zijn',
            'We moeten het roer omgooien, want er zijn kapers op de kust.',
            'We moeten het roer omgooien want er zijn kapers op de kust.',
          ],
          explanation: 'Use the maritime idioms "het roer omgooien" (change course) and "kapers op de kust" (lurking competitors).',
          skills: ['production', 'idiomatic', 'grammar'],
          idioms: ['het roer omgooien', 'kapers op de kust'],
          grammar: ['subordinate-clauses'],
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Ship\'s Logbook & The Privateering Debate',
      kind: 'personalise',
      intro: 'Put yourself in the shoes of a 17th-century navigator or historical analyst. Write a logbook entry (*scheepsjournaal*) or argue whether Dutch privateering (*kaapvaart*) was legitimate warfare or glorified piracy.',
      exercises: [
        {
          id: 'mar-7',
          kind: 'personalise',
          prompt: 'Schrijf een kort fragment uit een 17e-eeuws scheepsjournaal of beargumenteer het verschil tussen kaapvaart en zeeroof. Gebruik minstens drie historische of maritieme termen (bijv. vloot, kaperbrief, enteren, buit, storm, bemanning, muiterij).',
          target: 'Na weken op open zee signaleerde het kraaiennest een vijandelijk konvooi. Dankzij onze officiële kaperbrief enterde de bemanning het vlaggenschip en werd de rijke buit veiliggesteld.',
          explanation: 'Use authentic historical terms (kaperbrief, vlaggenschip, bemanning, enteren, buit) and vivid narrative structure.',
          skills: ['speaking', 'production', 'coherence', 'idiomatic'],
          vocabulary: ['kaperbrief', 'vlaggenschip', 'bemanning', 'enteren', 'buit', 'kraaiennest'],
          grammar: ['past-tense', 'passive-voice', 'word-order'],
          placeholder: 'In het scheepsjournaal staat genoteerd dat...',
        },
      ],
    },
  ],
};

export const footballCruyffChapter: Chapter = {
  slug: 'totaalvoetbal-en-johan-cruijff',
  level: 'B2',
  title: 'Total Football, Tiki-Taka & Johan Cruijff Philosophy',
  capability: 'Analyze football tactics, master the principles of Total Football (Totaalvoetbal) and the tiki-taka positional style invented by Johan Cruijff, and apply his legendary aphorisms (Cruijffiaans) such as "Elk nadeel heb z\'n voordeel" in tactical, professional, and everyday discourse.',
  description: 'Explore the tactical and cultural genius of Johan Cruijff: positional play (positiespel), triangle combinations (driehoeken), the invention of Tiki-Taka at FC Barcelona, and legendary aphorisms like "Elk nadeel heb z\'n voordeel" applied to modern Dutch life.',
  estimatedMinutes: 15,
  relatedArticleSlug: 'b2-totaalvoetbal-en-cruijff',
  stages: [
    {
      id: 'discover',
      title: 'Totaalvoetbal, Tiki-Taka & Cruijffian Lexicon',
      kind: 'discover',
      intro: 'Football in the Netherlands and Johan Cruijff\'s philosophy revolutionized world sport through geometry, spatial awareness, and passing circuits. Discover the tactical mechanics of Tiki-Taka and the linguistic phenomenon of "Cruijffiaans", headlined by the legendary quote "Elk nadeel heb z\'n voordeel".',
      exercises: [
        {
          id: 'cruyff-induction',
          kind: 'induction',
          prompt: 'Analyze tactical concepts, Tiki-Taka, and Cruijff\'s football philosophy',
          skills: ['recognition', 'meaning'],
          inductionData: {
            examples: [
              { prompt: 'Tiki-taka positional triangles and ball circulation', answer: 'constante driehoekscombinaties vormen om de vrije man te vinden' },
              { prompt: 'Fluid positional swapping across lines', answer: 'Totaalvoetbal: verdedigers en aanvallers wisselen naadloos van positie' },
              { prompt: 'Cruijffian resilience and pragmatic optimism', answer: '"Elk nadeel heb z\'n voordeel": tegenslag ombuigen naar nieuwe kansen' },
            ],
            ruleChallenge: 'What is the tactical essence of the Tiki-Taka style developed by Johan Cruijff and perfected at Barcelona?',
            options: [
              { text: 'Snel combinatiespel in driehoeken met dominant balbezit om ruimtes te creëren en de derde man vrij te spelen.', isCorrect: true },
              { text: 'Uitsluitend fysieke duels uitvechten en lange ballen richting de spits trappen.', isCorrect: false },
              { text: 'Met alle veldspelers rond het eigen zestienmetergebied blijven verdedigen.', isCorrect: false },
            ],
          },
        },
        {
          id: 'cruyff-info-1',
          kind: 'info',
          prompt: 'Tactical terminology: Totaalvoetbal, Tiki-Taka and match dynamics',
          context: 'het tiki-taka (tiki-taka short-passing style / rapid combination play)\nhet positiespel (positional play / Juego de Posición)\nde driehoekscombinatie (triangle passing circuit)\nde derde man vinden (finding the third man)\nhet balbezit domineren (to dominate ball possession)\nde balcirculatie (ball circulation)\nde omschakeling (the transition between attack and defense)\nruimte creëren / benutten (to create / exploit space)\nhet veld breed houden (to keep the pitch wide)\nde overtalpositie / het overtal (numerical superiority / overload)\nde vleugelaanvaller / de buitenspeler (the winger)\nde spelmaker / de regisseur (the playmaker)\nhet strafschopgebied / de zestien (the penalty box)\nbuitenspel staan / zetten (to be / put offside)\nde Cruijff-draai (the Cruyff turn)',
          skills: ['recognition', 'meaning'],
          vocabulary: ['tiki-taka', 'positiespel', 'driehoekscombinatie', 'derde man', 'balbezit', 'balcirculatie', 'omschakeling', 'overtal', 'vleugelaanvaller', 'strafschopgebied'],
        },
        {
          id: 'cruyff-info-2',
          kind: 'info',
          prompt: 'Famous Cruijff aphorisms ("Cruijffiaans") used in sports, business and daily life',
          context: '1. "Elk nadeel heb z\'n voordeel" = Every disadvantage has its advantage (iconic Amsterdam dialect grammar with "heb"; universally used to reframe setbacks into strategic opportunities).\n2. "Als wij de bal hebben, kunnen zij niet scoren" = The foundational premise of Tiki-Taka and possession football.\n3. "Je gaat het pas zien als je het doorhebt" = Deeper tactical or systemic insight requires understanding the underlying pattern.\n4. "Voetbal is simpel, maar simpel voetballen is het moeilijkste wat er is" = One-touch tiki-taka simplicity requires the highest level of technical mastery.\n5. "Als je niet ken winnen, moet je zorgen dat je niet verliest" = Pragmatic game management.\n6. "De bal moet het werk doen, niet de benen" = Let the ball circulate quickly rather than running unnecessarily.',
          skills: ['recognition', 'idiomatic', 'meaning'],
          idioms: ['elk nadeel heb z\'n voordeel', 'als wij de bal hebben kunnen zij niet scoren', 'je gaat het pas zien als je het doorhebt', 'simpel voetballen', 'de bal het werk laten doen'],
        },
      ],
    },
    {
      id: 'understand',
      title: 'The Revolution: From Totaalvoetbal to Tiki-Taka',
      kind: 'understand',
      intro: 'Read about how Johan Cruijff transformed football from Ajax and 1974 Oranje to inventing Tiki-Taka at FC Barcelona, and how his aphorisms entered everyday Dutch.',
      exercises: [
        {
          id: 'cruyff-reading',
          kind: 'reading',
          prompt: 'Historical and tactical essay: Johan Cruijff, Totaalvoetbal en de geboorte van Tiki-Taka',
          readingContent: 'Johan Cruijff (1947–2016) geldt wereldwijd als de architect van het moderne voetbal. Samen met coach Rinus Michels introduceerde hij begin jaren zeventig bij Ajax en het Nederlands elftal het revolutionaire "Totaalvoetbal", waarin spelers flexibel van positie wisselden en voortdurend ruimtes creëerden.\n\nToen Cruijff eind jaren tachtig trainer werd van FC Barcelona, transformeerde hij deze filosofie tot wat later bekend werd als "tiki-taka": een speelstijl gebaseerd op razendsnelle driehoekscombinaties, dominant balbezit en het principe van de derde man. In plaats van fysieke kracht stelde Cruijff technisch spelinzicht en balcirculatie centraal: "De bal moet het werk doen, niet de benen." Via de door hem hervormde jeugdacademie La Masia legde hij het fundament voor het legendarische succesteam van Pep Guardiola.\n\nNaast zijn tactische genialiteit verrijkte Cruijff de Nederlandse cultuur met zijn gevleugelde uitspraken ("Cruijffiaans"). Zijn beroemdste citaat, "Elk nadeel heb z\'n voordeel", is diep verankerd in het collectieve geheugen en wordt in het Nederlandse bedrijfsleven en de politiek dagelijks gebruikt om tegenslag om te buigen naar vooruitgang.',
          wordHints: {
            architect: { meaning: 'architect / mastermind', category: 'noun' },
            revolutionaire: { meaning: 'revolutionary', category: 'adj' },
            driehoekscombinaties: { meaning: 'triangle passing combinations', category: 'noun' },
            balcirculatie: { meaning: 'ball circulation / passing flow', category: 'noun' },
            spelinzicht: { meaning: 'tactical vision / game insight', category: 'noun' },
            centraal: { meaning: 'central / key', category: 'adv' },
            jeugdacademie: { meaning: 'youth academy', category: 'noun' },
            gevleugelde: { meaning: 'winged / famous (sayings)', category: 'adj' },
            collectieve: { meaning: 'collective', category: 'adj' },
            verankerd: { meaning: 'anchored / ingrained', category: 'verb (past part)' },
            ombuigen: { meaning: 'to turn around / transform', category: 'verb' },
          },
          skills: ['recognition', 'meaning', 'coherence'],
          vocabulary: ['architect', 'tiki-taka', 'driehoekscombinatie', 'balcirculatie', 'spelinzicht', 'gevleugelde uitspraak', 'verankerd', 'ombuigen'],
        },
      ],
    },
    {
      id: 'retrieve',
      title: 'Rapid Football & Cruijffian Recall',
      kind: 'retrieve',
      intro: 'Test your immediate recall of tactical terms, Tiki-Taka concepts, and famous Cruijff aphorisms.',
      exercises: [
        {
          id: 'cruyff-speed-1',
          kind: 'speed-drill',
          prompt: 'Every disadvantage has its advantage (Elk nadeel...)',
          target: 'Elk nadeel heb z\'n voordeel',
          automaticitySeconds: 10,
          skills: ['automaticity', 'idiomatic'],
        },
        {
          id: 'cruyff-speed-2',
          kind: 'speed-drill',
          prompt: 'If we have the ball, they cannot score (Als wij...)',
          target: 'Als wij de bal hebben, kunnen zij niet scoren',
          automaticitySeconds: 10,
          skills: ['automaticity', 'idiomatic'],
        },
        {
          id: 'cruyff-speed-3',
          kind: 'speed-drill',
          prompt: 'Rapid short-passing triangle combinations in tiki-taka (Snelle driehoekscombinaties...)',
          target: 'Snelle driehoekscombinaties en positiespel',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'cruyff-speed-4',
          kind: 'speed-drill',
          prompt: 'Finding the third man in open space (De derde man...)',
          target: 'De derde man vinden in de vrije ruimte',
          automaticitySeconds: 10,
          skills: ['automaticity', 'production'],
        },
        {
          id: 'cruyff-3',
          kind: 'typed',
          prompt: 'Translate: In tiki-taka, the playmaker creates space through rapid triangle combinations and ball circulation.',
          target: 'In het tiki-taka creëert de spelmaker ruimte via snelle driehoekscombinaties en balcirculatie.',
          acceptedAnswers: [
            'In het tiki-taka creëert de spelmaker ruimte via snelle driehoekscombinaties en balcirculatie.',
            'In het tiki-taka creëert de spelmaker ruimte via snelle driehoekscombinaties en balcirculatie',
            'In tiki-taka creëert de spelmaker ruimte door snelle driehoekscombinaties en balcirculatie.',
            'In het tiki-taka creëert de spelmaker ruimte door snelle driehoekscombinaties en balcirculatie.',
            'In tiki-taka maakt de spelmaker ruimte via snelle driehoekscombinaties en balcirculatie.',
          ],
          explanation: 'Use "tiki-taka", "driehoekscombinaties" (passing triangles), and "balcirculatie" (ball circulation) with correct V2 inversion after the prepositional phrase.',
          skills: ['production', 'grammar', 'meaning'],
          vocabulary: ['tiki-taka', 'spelmaker', 'driehoekscombinatie', 'balcirculatie'],
          placeholder: 'In het tiki-taka...',
        },
      ],
    },
    {
      id: 'transform',
      title: 'Tactical Analysis & Communicative Application',
      kind: 'transform',
      intro: 'Transform match observations into conditional tactical logic, passive match reports, causal breakdowns, and idiomatic Cruijffian reframing.',
      exercises: [
        {
          id: 'cruyff-4',
          kind: 'typed',
          prompt: 'Combine into a conditional sentence using "als": (1) Wij domineren het balbezit met tiki-taka. (2) De tegenstander kan niet scoren.',
          target: 'Als wij het balbezit domineren met tiki-taka, kan de tegenstander niet scoren.',
          acceptedAnswers: [
            'Als wij het balbezit domineren met tiki-taka, kan de tegenstander niet scoren.',
            'Als wij het balbezit domineren met tiki-taka, kan de tegenstander niet scoren',
            'Als we het balbezit domineren met tiki-taka, kan de tegenstander niet scoren.',
            'Als we het balbezit domineren met tiki-taka, kan de tegenstander niet scoren',
            'Als wij met tiki-taka het balbezit domineren, kan de tegenstander niet scoren.',
            'Als we met tiki-taka het balbezit domineren, kan de tegenstander niet scoren.',
          ],
          explanation: 'In the subordinate clause with "als", place the finite verb at the end ("domineren"), followed by verb-subject inversion in the main clause ("kan de tegenstander...").',
          skills: ['production', 'grammar'],
          vocabulary: ['tiki-taka', 'balbezit', 'scoren'],
          grammar: ['subordinate-clauses', 'word-order'],
        },
        {
          id: 'cruyff-5',
          kind: 'typed',
          prompt: 'Rewrite in the passive voice (lijdende vorm): "De verdediger onderschepte de gevaarlijke pass in het strafschopgebied."',
          target: 'De gevaarlijke pass werd door de verdediger onderschept in het strafschopgebied.',
          acceptedAnswers: [
            'De gevaarlijke pass werd door de verdediger onderschept in het strafschopgebied.',
            'De gevaarlijke pass werd door de verdediger onderschept in het strafschopgebied',
            'De gevaarlijke pass werd door de verdediger in het strafschopgebied onderschept.',
            'De gevaarlijke pass werd door de verdediger in het strafschopgebied onderschept',
            'De gevaarlijke pass werd in het strafschopgebied door de verdediger onderschept.',
            'De gevaarlijke pass werd in het strafschopgebied onderschept door de verdediger.',
          ],
          explanation: 'Transform the active past "onderschepte" into passive past "werd ... onderschept door de verdediger".',
          skills: ['production', 'grammar'],
          vocabulary: ['strafschopgebied', 'verdediger', 'onderscheppen'],
          grammar: ['passive-voice'],
        },
        {
          id: 'cruyff-6',
          kind: 'typed',
          prompt: 'Apply Cruijff\'s legendary quote to reframe a business setback: "Elke tegenslag biedt ook een onverwachte kans." (Cite Cruijff\'s exact quote: "Elk nadeel heb z\'n voordeel")',
          target: 'Elk nadeel heb z\'n voordeel, dus deze tegenslag biedt ook nieuwe kansen.',
          acceptedAnswers: [
            'Elk nadeel heb z\'n voordeel, dus deze tegenslag biedt ook nieuwe kansen.',
            'Elk nadeel heb z\'n voordeel, dus deze tegenslag biedt ook nieuwe kansen',
            'Elk nadeel heb z\'n voordeel, dus deze tegenslag biedt nieuwe kansen.',
            'Elk nadeel heb z\'n voordeel.',
            'Elk nadeel heb z\'n voordeel',
            'Elk nadeel heeft zijn voordeel, dus deze tegenslag biedt ook nieuwe kansen.',
            'Elk nadeel heeft zijn voordeel.',
          ],
          explanation: 'Cruijff\'s quote "Elk nadeel heb z\'n voordeel" (Every disadvantage has its advantage) is an iconic cultural idiom used across business, sports, and everyday Dutch.',
          skills: ['production', 'idiomatic'],
          idioms: ['elk nadeel heb z\'n voordeel'],
          grammar: ['connectors'],
        },
        {
          id: 'cruyff-7',
          kind: 'typed',
          prompt: 'Combine with causal connector "doordat": (1) Het team hanteerde snelle driehoekscombinaties en tiki-taka. (2) Ze speelden de derde man moeiteloos vrij.',
          target: 'Doordat het team snelle driehoekscombinaties en tiki-taka hanteerde, speelden ze de derde man moeiteloos vrij.',
          acceptedAnswers: [
            'Doordat het team snelle driehoekscombinaties en tiki-taka hanteerde, speelden ze de derde man moeiteloos vrij.',
            'Doordat het team snelle driehoekscombinaties en tiki-taka hanteerde, speelden ze de derde man moeiteloos vrij',
            'Doordat het team tiki-taka en snelle driehoekscombinaties hanteerde, speelden ze de derde man moeiteloos vrij.',
            'Doordat het team snelle driehoeken en tiki-taka hanteerde, speelden ze de derde man moeiteloos vrij.',
          ],
          explanation: '"Doordat" introduces a factual cause and requires verb-final order ("hanteerde"), followed by inversion in the main clause ("speelden ze").',
          skills: ['production', 'grammar'],
          vocabulary: ['driehoekscombinatie', 'tiki-taka', 'derde man', 'vrijspelen'],
          grammar: ['subordinate-clauses', 'causality', 'word-order'],
        },
      ],
    },
    {
      id: 'personalise',
      title: 'Tactical Analysis & Cruijffian Philosophy',
      kind: 'personalise',
      intro: 'Step into the role of a football tactician or strategic leader. Analyze how Johan Cruijff\'s invention of Tiki-Taka, positional geometry, and his philosophy ("Elk nadeel heb z\'n voordeel") apply to modern sport, team leadership, or problem solving.',
      exercises: [
        {
          id: 'cruyff-8',
          kind: 'personalise',
          prompt: 'Analyseer hoe Johan Cruijff met het Totaalvoetbal en de uitvinding van het tiki-taka het moderne voetbal veranderde, of leg uit hoe zijn filosofie ("Elk nadeel heb z\'n voordeel", positiespel, de derde man) toegepast kan worden in een professioneel team. Gebruik minstens drie vaktermen (bijv. tiki-taka, positiespel, driehoekscombinatie, derde man, balbezit, overtal, "Elk nadeel heb z\'n voordeel").',
          target: 'Volgens de filosofie van Johan Cruijff draait tiki-taka om constant positiespel en snelle driehoekscombinaties. Door dominant balbezit te houden en de derde man vrij te spelen, creëert een team overtal. Daarnaast leert zijn bekende uitspraak "elk nadeel heb z\'n voordeel" ons om elke tegenslag als een tactische kans te benutten.',
          explanation: 'Use authentic tactical terms (tiki-taka, positiespel, driehoekscombinaties, derde man, overtal) and Cruijffian quotes.',
          skills: ['speaking', 'production', 'coherence', 'idiomatic'],
          vocabulary: ['tiki-taka', 'positiespel', 'driehoekscombinatie', 'derde man', 'balbezit', 'overtal'],
          grammar: ['subordinate-clauses', 'om te', 'inversion'],
          placeholder: 'Volgens de filosofie van Johan Cruijff...',
        },
      ],
    },
  ],
};

export const chapters: Chapter[] = [
  introductionChapter, storyChapter, coffeeChapter, directionsChapter, supermarketChapter, timeAndScheduleChapter, a1Capstone,
  bakeryChapter, doctorMission, talkingAboutDayChapter, transitChapter, housingChapter, pastStorytellingChapter, a2Capstone,
  opinionChapter, landlordMission, hotelMission, doubtChapter, connectionChapter, businessEmailChapter, debatingAgreementChapter, civicServicesChapter,
  workDiscussionMission, newsChapter, debatingWorkChapter, salaryNegotiationMission, formalityChapter, presentationChapter, newsSummaryChapter, futureSpeculationChapter, socialNuanceChapter, workplaceChapter, mediationChapter, argumentationChapter, synthesisChapter, morphingChapter, persuasionChapter, paraphrasingChapter, registerChapter, selfCorrectionChapter, circumlocutionChapter, nuanceChapter, collocationChapter, mirroringChapter, precisionChapter, inferenceChapter, understatementChapter, logicalFlowChapter, b2Capstone, erChapter, diplomacyChapter, formalStyleChapter, passiveVoiceChapter, hypotheticalChapter, reportedSpeechChapter, relativeClauseChapter, infinitiveChapter, doubleInfinitiveChapter, concessionChapter, participialChapter, correlativeChapter, conditionalChapter, causalityChapter, prefixVerbChapter, midfieldChapter, fixedPrepositionChapter, pronominalSplittingChapter, aspectualChapter, modalParticlesChapter, topicalisationChapter, maritimeChapter, footballCruyffChapter,
];

export function getChapter(slug: string) {
  return chapters.find(chapter => chapter.slug === slug);
}
