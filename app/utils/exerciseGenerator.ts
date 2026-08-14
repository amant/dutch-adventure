import type { Exercise, ChapterStage, Chapter, ExerciseKind, SkillDimension } from '../types/learning'

// A small dictionary to help generate exercises if we don't have enough context
const contextDictionary: Record<string, { target: string, prompt: string, explanation: string }> = {
  'wonen': { prompt: 'I live in Amsterdam.', target: 'Ik woon in Amsterdam.', explanation: 'Use "wonen" for living in a place.' },
  'zijn': { prompt: 'I am a student.', target: 'Ik ben een student.', explanation: 'Use "zijn" for identity.' },
  'denken': { prompt: 'I think that it is good.', target: 'Ik denk dat het goed is.', explanation: 'Use "denken dat" for opinions.' },
  'vinden': { prompt: 'I find it difficult.', target: 'Ik vind het moeilijk.', explanation: 'Use "vinden" for personal opinions.' },
  'thuiswerken': { prompt: 'I like working from home.', target: 'Ik werk graag thuis.', explanation: 'Thuiswerken means working from home.' },
  'handig': { prompt: 'It is very useful.', target: 'Het is erg handig.', explanation: 'Handig means useful or handy.' },
  'omdat-clause': { prompt: 'I am staying home because it is raining.', target: 'Ik blijf thuis omdat het regent.', explanation: 'Verbs go to the end after omdat.' },
  'word-order': { prompt: 'Yesterday I went to the city.', target: 'Gisteren ging ik naar de stad.', explanation: 'Inversion happens when a sentence starts with time/place.' },
  'perfect-tense': { prompt: 'I have eaten a sandwich.', target: 'Ik heb een broodje gegeten.', explanation: 'Use "hebben" + participle for most past actions.' },
  'last hebben van': { prompt: 'I have a backache.', target: 'Ik heb last van mijn rug.', explanation: 'Use "last hebben van" for physical discomfort.' },
  'afspraak': { prompt: 'I would like to make an appointment.', target: 'Ik wil graag een afspraak maken.', explanation: 'An afspraak is an appointment.' },
  'hoewel': { prompt: 'Although it is cold, I am going outside.', target: 'Hoewel het koud is, ga ik naar buiten.', explanation: 'Hoewel is a subordinating conjunction (verb at end).' },
  'opstaan': { prompt: 'I get up at 7 o\'clock.', target: 'Ik sta om 7 uur op.', explanation: 'Opstaan is a separable verb.' },
  'schoonmaken': { prompt: 'I am cleaning the kitchen.', target: 'Ik maak de keuken schoon.', explanation: 'Schoonmaken is a separable verb.' },
  'verwarming': { prompt: 'The heating is broken.', target: 'De verwarming is kapot.', explanation: 'Verwarming means heating.' },
  'repareren': { prompt: 'Can you repair it?', target: 'Kunt u het repareren?', explanation: 'Repareren means to fix or repair.' },
  'tevreden': { prompt: 'I am not satisfied with the service.', target: 'Ik ben niet tevreden over de service.', explanation: 'Tevreden means satisfied.' },
  'formal-v-informal': { prompt: 'How are you? (formal)', target: 'Hoe gaat het met u?', explanation: 'Use "u" for formal situations.' },
  'duurzaam': { prompt: 'Sustainable energy', target: 'Duurzame energie', explanation: 'Duurzaam means sustainable.' },
  'tot slot': { prompt: 'In conclusion', target: 'Tot slot', explanation: 'Use "Tot slot" to end a presentation.' },
  'speculeren': { prompt: 'I am speculating about the future.', target: 'Ik ben aan het speculeren over de toekomst.', explanation: 'Speculeren means to speculate.' },
  'onderhandelen': { prompt: 'We need to negotiate the salary.', target: 'We moeten onderhandelen over het salaris.', explanation: 'Onderhandelen means to negotiate.' },
  'samenvatten': { prompt: 'Can you summarize the article?', target: 'Kun je het artikel samenvatten?', explanation: 'Samenvatten means to summarize.' },
  'overtuigen': { prompt: 'I want to convince you.', target: 'Ik wil je overtuigen.', explanation: 'Overtuigen means to convince.' },
  'pronominal-adverbs': { prompt: 'I am thinking about it.', target: 'Ik denk eraan.', explanation: 'Merge "er" + "aan" for "about it".' },
  'ermee': { prompt: 'I am working with it.', target: 'Ik ben ermee bezig.', explanation: 'Met + het becomes ermee.' },
  'daarom': { prompt: 'That is why I am here.', target: 'Daarom ben ik hier.', explanation: 'Om + dat becomes daarom.' },
  'nominalisation': { prompt: 'The prices are rising.', target: 'De stijging van de prijzen.', explanation: 'Transform the verb "stijgen" into the noun "stijging".' },
  'toename': { prompt: 'The number of people is increasing.', target: 'De toename van het aantal mensen.', explanation: 'Toename means increase.' },
  'uitbreiding': { prompt: 'The company is expanding.', target: 'De uitbreiding van het bedrijf.', explanation: 'Uitbreiding means expansion.' },
  'passive-voice': { prompt: 'The project is being prepared.', target: 'Het project wordt voorbereid.', explanation: 'Use "worden" + past participle for the passive process.' },
  'worden': { prompt: 'It is being done.', target: 'Het wordt gedaan.', explanation: 'Worden is the auxiliary for the passive voice.' },
  'gepland': { prompt: 'The meeting is being planned.', target: 'De vergadering wordt gepland.', explanation: 'Gepland is the past participle of plannen.' },
  'conditional': { prompt: 'If I had money, I would buy it.', target: 'Als ik geld had, zou ik het kopen.', explanation: 'Use "had" and "zou" for hypotheticals.' },
  'had': { prompt: 'If I had time...', target: 'Als ik tijd had...', explanation: 'Had is the past tense of hebben, used for hypotheticals.' },
  'zou': { prompt: 'I would do it.', target: 'Ik zou het doen.', explanation: 'Zou means would.' },
  'conditional-past': { prompt: 'If I had known it, I would have come.', target: 'Als ik het had geweten, zou ik zijn gekomen.', explanation: 'For past hypotheticals, use "had [participle]" and "zou zijn/hebben [participle]".' },
  'diplomatic-reframing': { prompt: 'Can you say that more politely?', target: 'Het zou misschien beter zijn als...', explanation: 'Use softeners like "zou" and "misschien" for diplomacy.' },
  'verzachten': { prompt: 'You should soften your feedback.', target: 'Je zou je feedback wat moeten verzachten.', explanation: 'Verzachten means to soften or mitigate.' },
  'zullen': { prompt: 'It will rain tomorrow.', target: 'Het zal morgen regenen.', explanation: 'Use "zullen" for future predictions.' },
  'indirecte-rede': { prompt: 'He said that he was coming.', target: 'Hij zei dat hij kwam.', explanation: 'In indirect speech with "dat", the verb moves to the end.' },
  'beweren': { prompt: 'They claim that it is true.', target: 'Ze beweren dat het waar is.', explanation: 'Beweren means to claim or assert.' },
  'aangeven': { prompt: 'She indicated that she agreed.', target: 'Zij gaf aan dat ze het ermee eens was.', explanation: 'Aangeven means to indicate or state.' },
  'vragen of': { prompt: 'He asked whether we were ready.', target: 'Hij vroeg of we klaar waren.', explanation: 'Use "of" for indirect questions.' },
  'betrekkelijke-bijzinnen': { prompt: 'The book that I am reading is interesting.', target: 'Het boek dat ik lees, is interessant.', explanation: 'Use "dat" for het-words in relative clauses.' },
  'die': { prompt: 'The colleague who is helping me.', target: 'De collega die mij helpt.', explanation: 'Use "die" for de-words in relative clauses.' },
  'dat': { prompt: 'The report that we received.', target: 'Het rapport dat we hebben ontvangen.', explanation: 'Use "dat" for het-words in relative clauses.' },
  'waarmee': { prompt: 'The tool with which we work.', target: 'Het gereedschap waarmee we werken.', explanation: 'Use "waarmee" for things with preposition met.' },
  'met wie': { prompt: 'The person with whom I spoke.', target: 'De persoon met wie ik sprak.', explanation: 'Use "met wie" for people with preposition met.' },
  'wat': { prompt: 'Everything that he says.', target: 'Alles wat hij zegt.', explanation: 'Use "wat" after indefinite pronouns like alles.' },
  'om-te-infinitief': { prompt: 'We are calling to make an appointment.', target: 'We bellen om een afspraak te maken.', explanation: 'Use "om ... te" for purpose clauses.' },
  'op te lossen': { prompt: 'It is important to solve the problem.', target: 'Het is belangrijk om het probleem op te lossen.', explanation: 'In separable verbs with "te", insert "te" between prefix and stem.' },
  'voor te bereiden': { prompt: 'You do not need to prepare a presentation.', target: 'U hoeft geen presentatie voor te bereiden.', explanation: 'The semi-auxiliary "hoeven" requires "te".' },
  'hoeven': { prompt: 'You don\'t have to wait.', target: 'Je hoeft niet te wachten.', explanation: '"Hoeven... niet" takes "te" + infinitive.' },
  'dubbele-infinitief': { prompt: 'We had to wait for three hours.', target: 'We hebben drie uur moeten wachten.', explanation: 'In compound tenses, modal participles become infinitives (IPP).' },
  'moeten wachten': { prompt: 'We had to wait for three hours.', target: 'We hebben drie uur moeten wachten.', explanation: 'Use the double infinitive "moeten wachten" with auxiliary "hebben".' },
  'laten repareren': { prompt: 'She had her car repaired.', target: 'Zij heeft haar auto laten repareren.', explanation: 'Causative "laten" takes the double infinitive "laten repareren".' },
  'leren programmeren': { prompt: 'He taught me how to program.', target: 'Hij heeft me leren programmeren.', explanation: '"Leren" takes the double infinitive without "ge-" prefix in compound tenses.' },
  'horen aankomen': { prompt: 'We heard the train arriving.', target: 'We hebben de trein horen aankomen.', explanation: 'Perception verbs trigger the double infinitive in compound tenses.' },
  'toegevende-verbanden': { prompt: 'Although the costs are high, we proceed.', target: 'Hoewel de kosten hoog zijn, gaan we door.', explanation: 'Use "hoewel" with verb-final word order for concessive clauses.' },
  'ondanks': { prompt: 'Despite the bad weather, we went outside.', target: 'Ondanks het slechte weer gingen we naar buiten.', explanation: '"Ondanks" is a preposition taking a noun phrase.' },
  'ondanks dat': { prompt: 'Despite the fact that it was late, we worked on.', target: 'Ondanks dat het laat was, werkten we door.', explanation: '"Ondanks dat" is a conjunction introducing a subclause.' },
  'weliswaar': { prompt: 'The plan is ambitious, but feasible.', target: 'Het plan is weliswaar ambitieus, maar haalbaar.', explanation: '"Weliswaar" is paired with "maar" for balanced contrast.' },
  'hoe ook': { prompt: 'No matter how difficult it is, we keep going.', target: 'Hoe moeilijk het ook is, we gaan door.', explanation: 'Use "hoe + [adj] + ... + ook" for correlative concessions.' },
  'deelwoordconstructies': { prompt: 'The measures to be taken.', target: 'De te nemen maatregelen.', explanation: 'Use the gerundive "te nemen" for passive necessity.' },
  'het-te-deelwoord': { prompt: 'The problems to be solved.', target: 'De op te lossen problemen.', explanation: 'Insert "te" between the separable prefix and stem.' },
  'te nemen': { prompt: 'The measures that must be taken.', target: 'De te nemen maatregelen.', explanation: 'The gerundive indicates necessity or future action.' },
  'gelet op': { prompt: 'Considering the recent developments.', target: 'Gelet op de recente ontwikkelingen.', explanation: '"Gelet op" is a formal concise participial clause.' },
  'al doende': { prompt: 'Practice makes perfect (while doing one learns).', target: 'Al doende leert men.', explanation: '"Al doende" expresses learning through hands-on practice.' },
  'toenemend': { prompt: 'The increasing costs.', target: 'De toenemende kosten.', explanation: 'Present participle inflected with "-e".' },
  'correlatieve-voegwoorden': { prompt: 'Both the team and the management agree.', target: 'Zowel het team als de directie is akkoord.', explanation: 'Use "zowel ... als ..." for parallel coordination.' },
  'zowel als': { prompt: 'Both the plan and the budget are approved.', target: 'Zowel het plan als het budget is goedgekeurd.', explanation: 'Use "zowel ... als ..." for parallel elements.' },
  'niet alleen maar ook': { prompt: 'Not only are costs rising, but revenue is also dropping.', target: 'Niet alleen stijgen de kosten, maar ook de omzet daalt.', explanation: 'Fronting "niet alleen" triggers inversion, paired with "maar ook".' },
  'noch noch': { prompt: 'Neither the manager nor the advisors knew about it.', target: 'Noch de manager, noch de adviseurs wisten ervan.', explanation: 'Noch ... noch carries negative meaning without extra "niet".' },
  'enerzijds anderzijds': { prompt: 'On the one hand it brings opportunities, on the other hand risks.', target: 'Enerzijds biedt het kansen, anderzijds brengt het risico\'s met zich mee.', explanation: 'Enerzijds and anderzijds trigger subject-verb inversion.' },
  'hoe des te': { prompt: 'The sooner we start, the faster we finish.', target: 'Hoe eerder we beginnen, des te sneller zijn we klaar.', explanation: 'Use "hoe + [comp], des te + [comp]" for proportional comparison.' },
  'voorwaardelijke-verbanden': { prompt: 'We agree, provided that the costs remain within budget.', target: 'We gaan akkoord, mits de kosten binnen het budget blijven.', explanation: 'Use "mits" with subclause verb-final word order for strict prerequisites.' },
  'mits': { prompt: 'Provided that the budget allows it.', target: 'Mits het budget het toelaat.', explanation: '"Mits" means provided that / only if ("alleen als").' },
  'tenzij': { prompt: 'The meeting goes ahead unless the manager is ill.', target: 'De vergadering gaat door, tenzij de manager ziek is.', explanation: '"Tenzij" means unless / except if ("behalve als").' },
  'op voorwaarde dat': { prompt: 'On condition that the targets are met.', target: 'Op voorwaarde dat de doelen worden behaald.', explanation: '"Op voorwaarde dat" introduces formal contractual conditions.' },
  'gesteld dat': { prompt: 'Suppose that inflation rises further.', target: 'Gesteld dat de inflatie verder oploopt.', explanation: '"Gesteld dat" introduces hypothetical premises.' },
  'voor zover': { prompt: 'As far as I know, everything is in order.', target: 'Voor zover ik weet, is alles in orde.', explanation: '"Voor zover" introduces restrictive qualifications.' },
  'mocht': { prompt: 'Should you have any questions, please contact us.', target: 'Mocht u vragen hebben, neem dan contact op.', explanation: '"Mocht(en)" triggers inverted conditional clauses without "als".' },
  'oorzakelijke-verbanden': { prompt: 'The train service stopped because a tree fell on the tracks.', target: 'Doordat de boom op het spoor viel, lag het treinverkeer stil.', explanation: 'Use "doordat" with subclause verb-final order for involuntary physical causes.' },
  'doordat': { prompt: 'Because the power went out, the servers stopped.', target: 'Doordat de stroom uitviel, stopten de servers.', explanation: '"Doordat" is strictly used for involuntary causes and physical events.' },
  'aangezien': { prompt: 'Since the deadline has passed, we cannot process the application.', target: 'Aangezien de termijn is verstreken, kunnen we de aanvraag niet behandelen.', explanation: '"Aangezien" introduces a formal reasoned justification or premise.' },
  'te wijten aan': { prompt: 'The delay is due to a software error.', target: 'De vertraging is te wijten aan een softwarefout.', explanation: '"Te wijten aan" assigns causal blame for negative outcomes or faults.' },
  'te danken aan': { prompt: 'The success is thanks to the dedication of the team.', target: 'Het succes is te danken aan de inzet van het team.', explanation: '"Te danken aan" (or dankzij) expresses positive merit and attribution.' },
  'waardoor': { prompt: 'The supplier went bankrupt, as a result of which production was halted.', target: 'De leverancier ging failliet, waardoor de productie stillag.', explanation: '"Waardoor" introduces a relative subclause expressing an objective consequence.' },
  'dermate dat': { prompt: 'Costs rose so rapidly that management had to intervene.', target: 'De kosten stegen dermate snel dat de directie moest ingrijpen.', explanation: 'Use "dermate [adj/adv] dat" to express an extreme degree and consequence.' },
  'opdat': { prompt: 'Protocols were tightened so that accidents can be prevented.', target: 'Protocollen zijn aangescherpt, opdat incidenten voorkomen kunnen worden.', explanation: '"Opdat" introduces a formal subordinate clause of purpose.' },
  'teneinde te': { prompt: 'We restructured processes in order to guarantee quality.', target: 'We herzien de processen, teneinde de kwaliteit te waarborgen.', explanation: '"Teneinde... te" is a high-register formal purpose infinitive.' },
  'scheidbare-werkwoorden': { prompt: 'This issue occurs very rarely in practice.', target: 'Dit probleem komt zelden voor in de praktijk.', explanation: 'Separable "vóórkomen" (occur) splits in main clauses.' },
  'onscheidbare-werkwoorden': { prompt: 'The specialist prevents a medical error.', target: 'De specialist voorkomt een medische fout.', explanation: 'Inseparable "voorkómen" (prevent) never splits in main clauses.' },
  'voorkomen': { prompt: 'The doctor prevents a complication.', target: 'De arts voorkomt een complicatie.', explanation: '"Voorkómen" (prevent) is inseparable and takes no "ge-" in the participle.' },
  'overleggen': { prompt: 'The minister consulted with the union.', target: 'De minister heeft met de vakbond overlegd.', explanation: '"Overléggen" (consult) is inseparable, forming participle "overlegd".' },
  'ondergaan': { prompt: 'The company underwent a restructuring.', target: 'Het bedrijf heeft een herstructurering ondergaan.', explanation: '"Ondergáán" (undergo) is inseparable, forming participle "ondergaan".' },
  'achterhalen': { prompt: 'The police are trying to trace the truth.', target: 'De politie probeert de toedracht te achterhalen.', explanation: '"Achterhálen" is strictly inseparable, taking "te" before the whole verb.' },
  'doorbreken': { prompt: 'The mediator broke the deadlock.', target: 'De bemiddelaar heeft de impasse doorbroken.', explanation: '"Doorbréken" (break deadlock) is inseparable, forming "doorbroken".' },
  'doorlopen': { prompt: 'Employees must complete the training.', target: 'Medewerkers moeten het complete traject doorlopen.', explanation: '"Doorlópen" (complete education/process) is inseparable.' },
  'middenveld-syntaxis': { prompt: 'We are traveling to Brussels by train tomorrow.', target: 'Wij reizen morgen met de trein naar Brussel.', explanation: 'In the Dutch midfield, adverbial adjuncts follow strict Time -> Manner -> Place (TMP) order.' },
  'tmp-volgorde': { prompt: 'I am taking the high-speed train to Amsterdam tomorrow.', target: 'Ik reis morgen met de sneltrein naar Amsterdam.', explanation: 'TMP sequence: Tijd (morgen) -> Manier (met de sneltrein) -> Plaats (naar Amsterdam).' },
  'objectplaatsing': { prompt: 'I read the contract carefully yesterday.', target: 'Ik heb het contract gisteren aandachtig gelezen.', explanation: 'Definite direct objects precede Time and Manner in the Dutch midfield.' },
  'negatie-scope': { prompt: 'The manager is not sending the report to the client today.', target: 'De manager stuurt het rapport vandaag niet naar de klant.', explanation: '"Niet" follows definite objects and time, preceding prepositional phrases.' }
}

export function generateExercisesForConcept(key: string, type: 'vocabulary' | 'grammar', kind: ExerciseKind): Exercise {
  const info = contextDictionary[key] || {
    prompt: `Use the concept: ${key}`,
    target: `[Correct usage of ${key}]`,
    explanation: `Practice using ${key} in a sentence.`
  }

  const skills: SkillDimension[] = []
  if (kind === 'typed') skills.push('production', 'spelling')
  if (kind === 'flexibility') skills.push('production', 'automaticity')
  if (kind === 'conversation') skills.push('speaking', 'production')
  if (kind === 'speed-drill') skills.push('automaticity', 'production')
  if (kind === 'reframing-drill') skills.push('production', 'pragmatic')
  if (kind === 'pronominal-drill') skills.push('production', 'grammar')
  if (kind === 'nominalisation-drill') skills.push('production', 'grammar')
  if (kind === 'passive-drill') skills.push('production', 'grammar')
  if (kind === 'reported-speech-drill') skills.push('production', 'grammar')
  if (kind === 'relative-clause-drill') skills.push('production', 'grammar')
  if (kind === 'infinitive-drill') skills.push('production', 'grammar')
  if (kind === 'double-infinitive-drill') skills.push('production', 'grammar')
  if (kind === 'concession-drill') skills.push('production', 'grammar')
  if (kind === 'participial-drill') skills.push('production', 'grammar')
  if (kind === 'correlative-drill') skills.push('production', 'grammar')
  if (kind === 'conditional-drill') skills.push('production', 'grammar')
  if (kind === 'causality-drill') skills.push('production', 'grammar')
  if (kind === 'prefix-verb-drill') skills.push('production', 'grammar')
  if (kind === 'midfield-drill') skills.push('production', 'grammar')
  if (kind === 'fixed-preposition-drill') skills.push('production', 'grammar')
  if (kind === 'pronominal-splitting-drill') skills.push('production', 'grammar')
  if (kind === 'aspect-drill') skills.push('production', 'grammar')

  if (kind === 'reframing-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      reframingData: {
        bluntSentence: `Direct version of ${key}`,
        softeningElements: ['misschien', 'zou', 'eventueel'],
        targetContext: 'Professional Meeting'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      correction: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'pronominal-drill') {
    const prepMap: Record<string, string> = {
      'ermee': 'met',
      'erop': 'op',
      'eraan': 'aan',
      'daarvoor': 'voor',
      'daarmee': 'met'
    }
    const prep = prepMap[key] || 'op'
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      pronominalData: {
        sentence: info.target,
        preposition: prep,
        object: key.startsWith('d') ? 'dat' : 'het'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: key,
      explanation: info.explanation
    }
  }

  if (kind === 'nominalisation-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      nominalisationData: {
        verbalSentence: `De ${key} gebeurt nu.`,
        targetNoun: key
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'passive-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      passiveData: {
        activeSentence: `Men ${key} het project.`,
        focus: 'process'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'reported-speech-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      reportedSpeechData: {
        directQuote: `Ik zal ${key}.`,
        speaker: 'De collega',
        reportingClause: 'De collega zei dat...',
        quoteType: 'statement'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'relative-clause-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      relativeClauseData: {
        mainClause: `Het onderwerp is belangrijk.`,
        subordinateInfo: `We bespreken ${key} vandaag.`,
        antecedent: key,
        antecedentType: key === 'wat' ? 'general-wat' : key === 'met wie' ? 'person-prep' : key === 'waarmee' ? 'thing-prep' : 'het-word'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'infinitive-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      infinitiveData: {
        mainClause: 'Het is van groot belang voor het team.',
        infinitiveAction: `${key} volgens afspraak`,
        constructionType: 'purpose-om-te',
        hint: 'Use (om...) te and place all verbal elements at the end.'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'double-infinitive-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      doubleInfinitiveData: {
        sentenceContext: 'Situatie in het verleden (compound tense met regerend werkwoord):',
        auxiliary: 'hebben',
        governingVerb: key.includes('laten') ? 'laten' : key.includes('leren') ? 'leren' : key.includes('horen') ? 'horen' : 'moeten',
        governingType: key.includes('laten') ? 'causative-laten' : key.includes('leren') ? 'instruction-leren-helpen' : key.includes('horen') ? 'perception' : 'modal',
        mainVerb: key.replace('laten ', '').replace('leren ', '').replace('horen ', '').replace('moeten ', ''),
        hint: 'Apply the Infinitivus Pro Participio (IPP) rule with double infinitive at the end.'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'concession-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      concessionData: {
        triggerType: key.includes('ondanks') ? 'ondanks-noun-vs-clause' : key.includes('al') ? 'al-inversion' : key.includes('hoe') ? 'hoe-ook-correlative' : key.includes('weliswaar') ? 'weliswaar-maar' : 'hoewel-ofschoon',
        premiseA: `De omstandigheid (${key}) is uitdagend.`,
        contrastB: 'We zetten het plan desondanks succesvol voort.',
        connectorCue: key,
        structureFormula: 'Toegevende structuur met correcte woordvolgorde',
        hint: 'Combine the statements with accurate conjunctions and word order.'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'participial-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      participialData: {
        triggerType: key.includes('op te lossen') || key.includes('het-te-deelwoord') || key.includes('te nemen') ? 'gerundive-modal' : key.includes('toenemend') ? 'present-participle-attr' : key.includes('al') ? 'al-participle-simultaneous' : 'concise-clause',
        baseClause: `De situatie met betrekking tot ${key}.`,
        participleCue: key,
        structureFormula: 'Deelwoordconstructie met correcte verbuiging en positie',
        hint: 'Use the concise participial form.'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'correlative-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      correlativeData: {
        pairType: key.includes('niet alleen') ? 'niet-alleen-maar-ook' : key.includes('noch') ? 'noch-noch' : key.includes('enerzijds') ? 'enerzijds-anderzijds' : key.includes('hoe') ? 'hoe-des-te' : 'zowel-als',
        premiseA: `Eerste aspect van ${key}.`,
        premiseB: `Tweede aspect van ${key}.`,
        pairCue: key,
        structureFormula: 'Correlatieve balansstructuur met parallelle woordvolgorde',
        hint: 'Balance both parts using the correlative pair.'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'conditional-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      conditionalData: {
        conditionType: key.includes('tenzij') ? 'tenzij' : key.includes('op voorwaarde') ? 'op-voorwaarde-dat' : key.includes('gesteld') ? 'gesteld-dat' : key.includes('voor zover') ? 'voor-zover' : key.includes('mocht') ? 'mocht-inversion' : 'mits',
        mainPremise: `De hoofdgebeurtenis met betrekking tot ${key}.`,
        conditionPremise: `De specifieke voorwaarde of restrictie (${key}).`,
        connectorCue: key,
        structureFormula: 'Voorwaardelijke constructie met correcte bijzin-woordvolgorde',
        hint: 'Combine both clauses with appropriate conditional conjunction and subordinate verb order.'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'causality-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      causalityData: {
        relationType: key.includes('aangezien') ? 'aangezien-reden' : key.includes('te wijten aan') ? 'te-wijten-aan' : key.includes('te danken aan') ? 'te-danken-aan' : key.includes('waardoor') ? 'waardoor-gevolg' : key.includes('dermate') ? 'dermate-dat' : key.includes('opdat') ? 'opdat-doel' : key.includes('teneinde') ? 'teneinde-te' : 'doordat-oorzaak',
        premiseOrCause: `De situatie of oorzakelijke factor met betrekking tot ${key}.`,
        resultOrAction: `Het gevolg of de doelgerichte actie (${key}).`,
        connectorCue: key,
        structureFormula: 'Oorzakelijk, consecutief of doelgericht verband met correcte zinsstructuur',
        hint: 'Combine both premises using the specified causal/consecutive connector.'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'prefix-verb-drill') {
    const isSeparable = key.includes('scheidbare') || key === 'vóórkomen' || key === 'óndergaan' || key === 'óverleggen'
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      prefixVerbData: {
        verb: key.replace(/^(vóór|voor|onder|ónder|over|óver|door|dóór|achter|om)/, '$1'),
        stressPattern: isSeparable ? 'separable-stressed-prefix' : 'inseparable-stressed-stem',
        stressedForm: isSeparable ? `${key} (scheidbaar)` : `${key} (onscheidbaar)`,
        meaningDefinition: `Oefen de juiste vervoeging en scheidbaarheid van ${key}.`,
        targetStructure: 'present-main',
        contextPrompt: info.prompt,
        structureFormula: isSeparable ? '[Onderwerp] + [vorm] + [rest] + [voorvoegsel]' : '[Onderwerp] + [samengesteld werkwoord] + [rest]',
        hint: isSeparable ? 'Het werkwoord splitst in de hoofdzin.' : 'Het werkwoord is onscheidbaar en splitst nooit.'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'midfield-drill') {
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      midfieldData: {
        focusRule: key.includes('object') ? 'definite-vs-indefinite-object' : key.includes('negatie') ? 'negation-placement' : 'tmp-order',
        slots: {
          time: 'morgen',
          manner: 'met de trein',
          place: 'naar kantoor'
        },
        contextPrompt: info.prompt,
        providedElements: ['Onderwerp', 'Tijd', 'Manier', 'Plaats'],
        structureFormula: '[Onderwerp] + [PV] + [Tijd] + [Manier] + [Plaats]',
        hint: 'Respecteer de volgorde: Tijd -> Manier -> Plaats.'
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'fixed-preposition-drill') {
    const isAdj = key.includes('opgewassen') || key.includes('verantwoordelijk') || key.includes('trots') || key.includes('gehecht')
    const isNoun = key.includes('behoefte') || key.includes('bezwaar') || key.includes('gebrek') || key.includes('toegang')
    const prep = key.includes('twijfelen') || key.includes('bijdragen') || key.includes('voldoen') || key.includes('behoefte') ? 'aan'
      : key.includes('rekening houden') || key.includes('gepaard gaan') || key.includes('bemoeien') ? 'met'
      : key.includes('bestand') || key.includes('opgewassen') || key.includes('bezwaar') || key.includes('verzetten') ? 'tegen'
      : key.includes('neerleggen') || key.includes('betrokken') ? 'bij'
      : key.includes('inspelen') || key.includes('trots') || key.includes('vertrouwen') ? 'op'
      : key.includes('voorzien') || key.includes('geïnteresseerd') ? 'in'
      : key.includes('verantwoordelijk') || key.includes('geschikt') ? 'voor'
      : 'aan'

    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      fixedPrepositionData: {
        collocationType: isAdj ? 'adjective-preposition' : isNoun ? 'noun-preposition' : 'verb-preposition',
        governingHead: key,
        fixedPreposition: prep,
        contextPrompt: info.prompt,
        commonTransferErrors: [`${key} over`, `${key} voor`],
        structureFormula: `[Onderwerp] + [${key}] + ${prep} + [Object]`,
        hint: `Combineer '${key}' met het vaste voorzetsel '${prep}'.`
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'pronominal-splitting-drill') {
    const rWord = key.startsWith('d') ? 'daar' : key.startsWith('w') ? 'waar' : key.startsWith('h') ? 'hier' : 'er'
    const prep = key.includes('over') ? 'over' : key.includes('aan') ? 'aan' : key.includes('mee') ? 'mee' : key.includes('naar') ? 'naar' : 'in'
    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      pronominalSplittingData: {
        rWord: rWord as any,
        preposition: prep,
        combinedForm: `${rWord}${prep}`,
        clauseType: 'main-clause',
        contextPrompt: info.prompt,
        providedElements: [rWord, prep, 'het onderwerp'],
        structureFormula: `[Onderwerp] + [PV] + ${rWord} + [Middenveld] + ${prep} + [Werkwoord(en)]`,
        splittingStatus: 'natural-split-preferred',
        hint: `Plaats '${rWord}' vroeg in de zin en zet '${prep}' vlak vóór het werkwoord.`
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  if (kind === 'aspect-drill') {
    const isAanHet = key.includes('aan het')
    const isOpHetPunt = key.includes('op het punt')
    const isPlegen = key.includes('plegen')
    const isDreigen = key.includes('dreigen') || key.includes('beloven')

    return {
      id: `smart-${type}-${key}-${kind}`,
      kind,
      prompt: info.prompt,
      skills,
      aspectData: {
        aspectCategory: isAanHet ? 'progressive-aan-het' : isOpHetPunt ? 'imminent-op-het-punt' : isPlegen ? 'customary-plegen' : isDreigen ? 'prospective-dreigen-beloven' : 'posture-durative',
        postureOrAspectVerb: key,
        infinitiveAction: 'uitvoeren',
        contextPrompt: info.prompt,
        clauseType: 'main-clause',
        structureFormula: isAanHet ? '[Onderwerp] + [zijn] + [Middenveld] + aan het + [infinitief]' : `[Onderwerp] + [${key}] + [Middenveld] + te + [infinitief]`,
        hint: `Gebruik de juiste aspectuele constructie met '${key}'.`
      },
      vocabulary: type === 'vocabulary' ? [key] : [],
      grammar: type === 'grammar' ? [key] : [],
      target: info.target,
      explanation: info.explanation
    }
  }

  return {
    id: `smart-${type}-${key}-${kind}`,
    kind,
    prompt: info.prompt,
    target: info.target,
    explanation: info.explanation,
    skills,
    vocabulary: type === 'vocabulary' ? [key] : [],
    grammar: type === 'grammar' ? [key] : [],
    automaticitySeconds: kind === 'speed-drill' ? 4 : undefined
  }
}

export function createSmartReviewChapter(vocabularyKeys: string[], grammarKeys: string[]): Chapter {
  const stages: ChapterStage[] = []

  // Stage 1: Recognition / Discovery (for the ones you struggle with)
  if (vocabularyKeys.length > 0) {
    stages.push({
      id: 'smart-discover',
      title: 'Quick Refresh',
      kind: 'discover',
      intro: 'Let\'s review these concepts you\'ve encountered recently.',
      exercises: vocabularyKeys.slice(0, 3).map(k => ({
        id: `smart-info-${k}`,
        kind: 'info',
        prompt: `Remember: ${k}`,
        context: contextDictionary[k]?.target || `Usage example for ${k}`,
        skills: ['recognition', 'meaning'],
        vocabulary: [k]
      }))
    })
  }

  // Stage 2: Production
  const productionExercises: Exercise[] = [
    ...vocabularyKeys.slice(0, 2).map(k => generateExercisesForConcept(k, 'vocabulary', 'typed')),
    ...grammarKeys.slice(0, 1).map(k => generateExercisesForConcept(k, 'grammar', 'typed'))
  ]

  if (productionExercises.length > 0) {
    stages.push({
      id: 'smart-retrieve',
      title: 'Active Retrieval',
      kind: 'retrieve',
      intro: 'Try to produce these without hints.',
      exercises: productionExercises
    })
  }

  // Stage 3: High-pressure use
  if (vocabularyKeys.length > 0 || grammarKeys.length > 0) {
    const mainConcept = vocabularyKeys[0] || grammarKeys[0]
    stages.push({
      id: 'smart-automate',
      title: 'Automate Retrieval',
      kind: 'review',
      intro: 'Quick! Recall these concepts before the timer runs out.',
      exercises: [
        generateExercisesForConcept(mainConcept, vocabularyKeys[0] ? 'vocabulary' : 'grammar', 'speed-drill')
      ]
    })

    stages.push({
      id: 'smart-personalise',
      title: 'Real-world Use',
      kind: 'personalise',
      intro: 'Let\'s use what you know in a short conversation.',
      exercises: [{
        ...generateExercisesForConcept(mainConcept, vocabularyKeys[0] ? 'vocabulary' : 'grammar', 'conversation'),
        prompt: `Can you use ${mainConcept} in a sentence about your day?`,
        aiPersonality: { isDifficult: true, style: 'helpful', pushbackProbability: 0.5 }
      }]
    })
  }

  return {
    slug: 'smart-review',
    level: 'A1', // Dynamic
    title: 'Smart Review Session',
    capability: 'Reinforce weak spots and automate retrieval.',
    description: 'A dynamically generated session targeting your specific bottlenecks.',
    estimatedMinutes: 5,
    stages
  }
}

export function createActivationChapter(concepts: { key: string, kind: 'vocabulary' | 'grammar' }[]): Chapter {
  const stages: ChapterStage[] = []

  // Stage 1: Transformation (Bridging the gap)
  if (concepts.length > 0) {
    stages.push({
      id: 'activate-bridge',
      title: 'Bridge the Gap',
      kind: 'transform',
      intro: 'You know what these mean. Now let\'s try to manipulate them.',
      exercises: concepts.map(c => generateExercisesForConcept(c.key, c.kind, 'flexibility'))
    })

    // Stage 2: Retrieval
    stages.push({
      id: 'activate-retrieve',
      title: 'Own the Concept',
      kind: 'retrieve',
      intro: 'Produce these from scratch.',
      exercises: concepts.map(c => generateExercisesForConcept(c.key, c.kind, 'typed'))
    })

    // Stage 3: Personalisation
    stages.push({
      id: 'activate-personalise',
      title: 'Make it Yours',
      kind: 'personalise',
      intro: 'Use these in your own context.',
      exercises: concepts.map(c => ({
        ...generateExercisesForConcept(c.key, c.kind, 'conversation'),
        prompt: `Tell me something using "${c.key}".`,
        aiPersonality: { isDifficult: false, style: 'helpful', pushbackProbability: 0.3 }
      }))
    })
  }

  return {
    slug: 'activation-session',
    level: 'B2',
    title: 'Activation Session',
    capability: 'Turn passive recognition into active production.',
    description: 'A focused session to bridge your knowledge gaps.',
    estimatedMinutes: 8,
    stages
  }
}

export function createSpeedChapter(vocabularyKeys: string[], grammarKeys: string[]): Chapter {
  const allKeys = [...vocabularyKeys, ...grammarKeys]
  return {
    slug: 'speed-review',
    level: 'B1',
    title: 'High-Pressure Retrieval',
    capability: 'Automaticity under pressure.',
    description: 'Focus on reducing retrieval time for familiar concepts.',
    estimatedMinutes: 5,
    stages: [
      {
        id: 'speed-drills',
        title: 'Speed Drills',
        kind: 'retrieve',
        intro: 'You have very little time. Don\'t think, just produce!',
        exercises: allKeys.slice(0, 5).map(k => {
          const type = vocabularyKeys.includes(k) ? 'vocabulary' : 'grammar'
          const ex = generateExercisesForConcept(k, type, 'speed-drill')
          ex.automaticitySeconds = 3 // Extra tight!
          return ex
        })
      }
    ]
  }
}

export function createFluencyChapter(history: { key: string, prompt: string, snippet: string, type: 'vocabulary' | 'grammar' }[]): Chapter {
  return {
    slug: 'fluency-challenge',
    level: 'B2',
    title: 'Dynamic Fluency Challenge',
    capability: 'Automate production of your most used phrases.',
    description: 'A challenge built from your own history. Speak fast to build automaticity.',
    estimatedMinutes: 5,
    stages: [
      {
        id: 'fluency-stage',
        title: 'Spontaneous Retrieval',
        kind: 'review',
        intro: 'You have used these before. Now say them faster.',
        exercises: history.map((h, idx) => ({
          id: `fluency-${h.key}-${idx}`,
          kind: 'fluency-challenge',
          prompt: h.prompt,
          target: h.snippet,
          context: `You previously said: "${h.snippet}"`,
          skills: ['automaticity', 'speaking', 'production'],
          vocabulary: h.type === 'vocabulary' ? [h.key] : [],
          grammar: h.type === 'grammar' ? [h.key] : [],
          automaticitySeconds: 10
        }))
      }
    ]
  }
}

export function createScenarioMission(scenario: string, concepts: { key: string, kind: 'vocabulary' | 'grammar' }[]): Chapter {
  return {
    slug: 'sandbox-mission',
    level: 'B2',
    title: `Mission: ${scenario}`,
    capability: 'Adapt your language to a specific, custom context.',
    description: `A personalized mission focused on: ${scenario}`,
    estimatedMinutes: 10,
    stages: [
      {
        id: 'sandbox-understand',
        title: 'Vocabulary Preparation',
        kind: 'understand',
        intro: `To prepare for this scenario, let's look at how we might use these concepts.`,
        exercises: concepts.map(c => ({
          id: `sandbox-info-${c.key}`,
          kind: 'info',
          prompt: `Relevant concept: ${c.key}`,
          context: contextDictionary[c.key]?.target || `In this scenario, you might need ${c.key}.`,
          skills: ['recognition', 'meaning'],
          vocabulary: c.kind === 'vocabulary' ? [c.key] : [],
          grammar: c.kind === 'grammar' ? [c.key] : []
        }))
      },
      {
        id: 'sandbox-mission',
        title: 'The Simulation',
        kind: 'personalise',
        intro: `Goal: ${scenario}. Use as much Dutch as you can, and try to incorporate your target concepts.`,
        exercises: [{
          id: 'sandbox-simulator',
          kind: 'conversation',
          prompt: `Let's start. You are in this situation: ${scenario}. What do you say?`,
          skills: ['speaking', 'production', 'pragmatic'],
          vocabulary: concepts.filter(c => c.kind === 'vocabulary').map(c => c.key),
          grammar: concepts.filter(c => c.kind === 'grammar').map(c => c.key),
          aiPersonality: {
            isDifficult: true,
            style: 'colloquial',
            pushbackProbability: 0.6
          },
          missionGoals: concepts.slice(0, 3).map(c => ({
            id: `goal-${c.key}`,
            label: `Use "${c.key}" naturally`,
            keywords: [c.key]
          }))
        }]
      }
    ]
  }
}
