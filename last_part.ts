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

export const chapters: Chapter[] = [introductionChapter, storyChapter, coffeeChapter, formalityChapter, bakeryChapter, doctorMission, talkingAboutDayChapter, a1Capstone, opinionChapter, landlordMission, hotelMission, workDiscussionMission, newsChapter, debatingWorkChapter, salaryNegotiationMission, presentationChapter, newsSummaryChapter, doubtChapter, futureSpeculationChapter, socialNuanceChapter, workplaceChapter, mediationChapter, argumentationChapter, synthesisChapter, morphingChapter, persuasionChapter, paraphrasingChapter, registerChapter, selfCorrectionChapter, circumlocutionChapter, nuanceChapter, collocationChapter, mirroringChapter, precisionChapter, inferenceChapter, understatementChapter, logicalFlowChapter, b2Capstone, erChapter, diplomacyChapter, connectionChapter]

export function getChapter(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug)
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
