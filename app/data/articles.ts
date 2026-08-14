import type { CEFR, Exercise } from '../types/learning'

export interface Article {
  id: string
  title: string
  level: CEFR
  content: string
  source: string
  publishedAt: string
  wordHints: Record<string, { meaning: string, category: string }>
  challenge?: Exercise
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
    },
    challenge: {
      id: 'a1-weer-challenge',
      kind: 'personalise',
      skills: ['speaking', 'production'],
      prompt: 'Hoe is het weer vandaag bij jou?',
      context: 'Gebruik de woorden: zon, warm of regenen.',
      vocabulary: ['zon', 'warm', 'regenen'],
      grammar: [],
      placeholder: 'Vandaag is het...',
      target: 'Vandaag schijnt de zon en het is warm.'
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
    },
    challenge: {
      id: 'a2-trein-challenge',
      kind: 'conversation',
      skills: ['speaking', 'automaticity'],
      prompt: 'De conducteur vraagt: "Heeft u een vertraging gehad vandaag?"',
      context: 'Answer the conductor. Mention if the train was on time or if there was a delay.',
      vocabulary: ['vertraging', 'op tijd'],
      grammar: [],
      target: 'Nee, de trein was gelukkig op tijd.'
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
    },
    challenge: {
      id: 'b1-thuiswerken-challenge',
      kind: 'summary-challenge',
      skills: ['writing', 'production', 'coherence'],
      prompt: 'Vat het artikel over thuiswerken kort samen.',
      context: 'Zorg ervoor dat je de belangrijkste voordelen en nadelen noemt.',
      summaryPoints: [
        { id: 'p1', label: 'Minder reistijd', keywords: ['minder reistijd', 'reistijd', 'geen reistijd'] },
        { id: 'p2', label: 'Betere balans', keywords: ['balans', 'werk en privé', 'privé'] },
        { id: 'p3', label: 'Contact met collega\'s', keywords: ['contact', 'collega', 'collega\'s', 'missen'] }
      ],
      vocabulary: ['voordelen', 'werknemers', 'echter', 'lastig'],
      grammar: ['omdat'],
      minimumLength: 20,
      target: 'Thuiswerken heeft voordelen voor werknemers, zoals minder reistijd en een betere balans, maar men mist soms het contact met collega\'s.'
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
    },
    challenge: {
      id: 'b2-duurzaamheid-challenge',
      kind: 'summary-challenge',
      skills: ['writing', 'grammar', 'coherence'],
      prompt: 'Vat het voorstel voor duurzame energie samen en noem de verschillende standpunten.',
      context: 'Identificeer het doel van de regering, het argument van critici en de mening van voorstanders.',
      summaryPoints: [
        { id: 's1', label: 'Transitie versnellen', keywords: ['transitie', 'versnellen', 'voorstel', 'duurzame energie'] },
        { id: 's2', label: 'Hoge kosten', keywords: ['kosten', 'burgers', 'te hoog', 'duur'] },
        { id: 's3', label: 'Noodzaak klimaatactie', keywords: ['noodzaak', 'klimaatactie', 'klimaat', 'actie'] }
      ],
      vocabulary: ['beweren', 'kosten', 'voorstel', 'versnellen'],
      grammar: ['subordinate clauses'],
      minimumLength: 30,
      target: 'De regering wil de transitie naar duurzame energie versnellen. Hoewel critici wijzen op de hoge kosten voor burgers, benadrukken voorstanders de noodzaak van klimaatactie.'
    }
  },
  {
    id: 'a1-supermarkt',
    title: 'Aanbiedingen in de supermarkt',
    level: 'A1',
    source: 'Supermarkt Folder',
    publishedAt: '2026-08-14',
    content: 'In de Nederlandse supermarkt zijn er elke week veel aanbiedingen. Groente en fruit zijn vers en gezond. Bij de kassa kun je betalen met je pinpas. Vergeet niet je eigen tas mee te nemen!',
    wordHints: {
      'aanbiedingen': { meaning: 'special offers / discounts', category: 'noun' },
      'groente': { meaning: 'vegetables', category: 'noun' },
      'vers': { meaning: 'fresh', category: 'adj' },
      'kassa': { meaning: 'checkout / cash register', category: 'noun' },
      'pinpas': { meaning: 'debit card', category: 'noun' },
      'tas': { meaning: 'bag', category: 'noun' }
    },
    challenge: {
      id: 'a1-supermarkt-challenge',
      kind: 'personalise',
      skills: ['speaking', 'production'],
      prompt: 'Wat koop jij meestal in de supermarkt?',
      context: 'Noem minstens twee producten, zoals melk, brood, fruit of kaas.',
      vocabulary: ['boodschappen', 'kopen', 'melk', 'brood', 'groente'],
      grammar: [],
      placeholder: 'Ik koop meestal...',
      target: 'Ik koop meestal vers brood en melk in de supermarkt.'
    }
  },
  {
    id: 'a2-woning',
    title: 'Wonen in een Nederlandse stad',
    level: 'A2',
    source: 'Woonwijzer',
    publishedAt: '2026-08-14',
    content: 'Het vinden van een geschikte woning in de grote stad is soms een uitdaging. Veel appartementen zijn snel verhuurd. Als je een bezichtiging hebt, is het belangrijk om snel te reageren. Let goed op of de huurprijs inclusief gas, water en elektriciteit is.',
    wordHints: {
      'geschikte': { meaning: 'suitable', category: 'adj' },
      'woning': { meaning: 'house / dwelling / home', category: 'noun' },
      'uitdaging': { meaning: 'challenge', category: 'noun' },
      'verhuurd': { meaning: 'rented out', category: 'verb (past part)' },
      'bezichtiging': { meaning: 'viewing / tour', category: 'noun' },
      'inclusief': { meaning: 'inclusive of / including', category: 'prep' }
    },
    challenge: {
      id: 'a2-woning-challenge',
      kind: 'conversation',
      skills: ['speaking', 'production'],
      prompt: 'De makelaar vraagt: "Zoekt u een gemeubileerd appartement of een kale woning?"',
      context: 'Leg uit wat voor soort woning je zoekt en waarom.',
      vocabulary: ['gemeubileerd', 'appartement', 'huur'],
      grammar: [],
      target: 'Ik zoek een gemeubileerd appartement omdat ik hier pas net woon.'
    }
  },
  {
    id: 'b1-gemeente-inschrijven',
    title: 'Verhuizen en inschrijven bij de gemeente',
    level: 'B1',
    source: 'Rijksoverheid Info',
    publishedAt: '2026-08-14',
    content: 'Wanneer je naar een nieuwe gemeente verhuist, ben je wettelijk verplicht om je binnen vijf dagen in te schrijven in de Basisregistratie Personen (BRP). Voor de afspraak op het stadskantoor moet je een geldig legitimatiebewijs en een huurovereenkomst meenemen. Na de inschrijving ontvang je een bevestiging per post.',
    wordHints: {
      'verhuist': { meaning: 'move / relocate', category: 'verb' },
      'wettelijk': { meaning: 'legally', category: 'adv' },
      'verplicht': { meaning: 'obliged / mandatory', category: 'adj' },
      'inschrijven': { meaning: 'to register', category: 'verb' },
      'legitimatiebewijs': { meaning: 'identity document / ID', category: 'noun' },
      'huurovereenkomst': { meaning: 'lease agreement / tenancy contract', category: 'noun' },
      'bevestiging': { meaning: 'confirmation', category: 'noun' }
    },
    challenge: {
      id: 'b1-gemeente-challenge',
      kind: 'summary-challenge',
      skills: ['writing', 'production', 'coherence'],
      prompt: 'Vat kort samen wat de regels zijn bij een verhuizing naar een nieuwe gemeente.',
      context: 'Noem de termijn (binnen hoeveel dagen) en welke documenten je moet meenemen.',
      summaryPoints: [
        { id: 'g1', label: 'Inschrijftermijn', keywords: ['vijf dagen', 'binnen vijf dagen', '5 dagen'] },
        { id: 'g2', label: 'BRP inschrijving', keywords: ['inschrijven', 'BRP', 'Basisregistratie Personen'] },
        { id: 'g3', label: 'Benodigde documenten', keywords: ['legitimatiebewijs', 'huurovereenkomst', 'huurcontract', 'documenten'] }
      ],
      vocabulary: ['inschrijven', 'gemeente', 'verplicht', 'legitimatiebewijs', 'huurovereenkomst'],
      grammar: ['subordinate clauses', 'om te'],
      minimumLength: 25,
      target: 'Als je verhuist, moet je je binnen vijf dagen inschrijven bij de gemeente. Je dient een geldig legitimatiebewijs en een huurovereenkomst mee te nemen naar de afspraak.'
    }
  },
  {
    id: 'b2-zilvervloot-en-kaapvaart',
    title: 'Kaapvaart en zeeoorlog in de Gouden Eeuw',
    level: 'B2',
    source: 'Historisch Tijdschrift',
    publishedAt: '2026-08-14',
    content: 'Tijdens de zeventiende eeuw speelde de maritieme scheepvaart een cruciale rol in de economische en militaire macht van de Republiek. Een belangrijk onderdeel hiervan was de zogeheten kaapvaart: het met toestemming van de overheid aanvallen en plunderen van vijandelijke schepen. Met een officiële kaperbrief van de Staten-Generaal onderschepten Nederlandse vloten Spaanse en Portugese handelsschepen. Het beroemdste succes was de verovering van de Spaanse Zilvervloot door Piet Hein in 1628. Hoewel kaapvaart juridisch verschilde van wetteloze piraterij (zeeroof), waren de omstandigheden aan boord en het geweld op open zee even meedogenloos.',
    wordHints: {
      'cruciale': { meaning: 'crucial / vital', category: 'adj' },
      'toestemming': { meaning: 'permission / consent', category: 'noun' },
      'onderschepten': { meaning: 'intercepted', category: 'verb (past)' },
      'juridisch': { meaning: 'legally / juridical', category: 'adv' },
      'verschilde': { meaning: 'differed', category: 'verb (past)' },
      'wetteloze': { meaning: 'lawless', category: 'adj' },
      'omstandigheden': { meaning: 'conditions / circumstances', category: 'noun' },
      'meedogenloos': { meaning: 'ruthless / merciless', category: 'adj' }
    },
    challenge: {
      id: 'b2-kaapvaart-challenge',
      kind: 'summary-challenge',
      skills: ['writing', 'grammar', 'coherence', 'idiomatic'],
      prompt: 'Vat samen wat de rol van kaapvaart was in de zeventiende eeuw en hoe dit verschilde van piraterij.',
      context: 'Benoem het doel van de kaperbrief, het succes van Piet Hein en het juridische verschil met zeeroof.',
      summaryPoints: [
        { id: 'k1', label: 'Rol van de kaperbrief', keywords: ['kaperbrief', 'toestemming', 'Staten-Generaal', 'overheid'] },
        { id: 'k2', label: 'Zilvervloot Piet Hein', keywords: ['Zilvervloot', 'Piet Hein', '1628', 'buit', 'succes'] },
        { id: 'k3', label: 'Verschil met piraterij', keywords: ['juridisch', 'piraterij', 'zeeroof', 'verschilde', 'wetteloos'] }
      ],
      vocabulary: ['kaperbrief', 'onderscheppen', 'juridisch', 'zeeroof', 'omstandigheden'],
      grammar: ['subordinate clauses', 'relative clauses', 'passive voice'],
      minimumLength: 30,
      target: 'In de Gouden Eeuw was kaapvaart een legale vorm van zeeoorlog waarbij schepen met een officiële kaperbrief vijandelijke vloten aanvielen. Hoewel Piet Hein met de verovering van de Zilvervloot grote rijkdom bracht en kaapvaart juridisch verschilde van wetteloze zeeroof, was het leven aan boord meedogenloos.'
    }
  },
  {
    id: 'b2-totaalvoetbal-en-cruijff',
    title: 'De nalatenschap van Johan Cruijff: Totaalvoetbal, Tiki-Taka en Cruijffiaans',
    level: 'B2',
    source: 'Voetbal & Cultuur Archief',
    publishedAt: '2026-08-14',
    content: 'Johan Cruijff veranderde de internationale voetbalwereld niet alleen met zijn uitzonderlijke techniek en spelinzicht, maar vooral met zijn revolutionaire visie op ruimte, balcirculatie en positiespel. Onder leiding van Cruijff en coach Rinus Michels ontstond in de vroege jaren zeventig het befaamde "Totaalvoetbal", waarbij veldspelers voortdurend van positie wisselden om overtalsituaties te creëren. Als trainer van het legendarische "Dream Team" van FC Barcelona perfectioneerde Cruijff deze filosofie tot het wereldberoemde "tiki-taka": een speelstijl gebaseerd op razendsnelle driehoekscombinaties, dominant balbezit en het principe van de derde man. Cruijff stelde altijd: "De bal moet het werk doen, niet de benen." Via de jeugdopleiding La Masia legde hij het fundament voor het moderne combinatievoetbal. Naast zijn sportieve erfenis verrijkte Cruijff de Nederlandse taal met zijn unieke "Cruijffiaans": schijnbaar eenvoudige, paradoxale uitspraken zoals "Je gaat het pas zien als je het doorhebt" en "Elk nadeel heb z\'n voordeel" (Every disadvantage has its advantage), die tot op de dag van vandaag worden aangehaald in de politiek, het bedrijfsleven en het dagelijks leven.',
    wordHints: {
      'uitzonderlijke': { meaning: 'exceptional / extraordinary', category: 'adj' },
      'spelinzicht': { meaning: 'game insight / tactical vision', category: 'noun' },
      'balcirculatie': { meaning: 'ball circulation / passing flow', category: 'noun' },
      'befaamde': { meaning: 'famous / renowned', category: 'adj' },
      'overtalsituaties': { meaning: 'numerical superiority situations', category: 'noun' },
      'driehoekscombinaties': { meaning: 'triangle passing combinations', category: 'noun' },
      'fundament': { meaning: 'foundation / bedrock', category: 'noun' },
      'combinatievoetbal': { meaning: 'combination football / passing play', category: 'noun' },
      'erfenis': { meaning: 'heritage / legacy', category: 'noun' },
      'paradoxale': { meaning: 'paradoxical', category: 'adj' },
      'aangehaald': { meaning: 'quoted / cited', category: 'verb (past part)' }
    },
    challenge: {
      id: 'b2-cruijff-challenge',
      kind: 'summary-challenge',
      skills: ['writing', 'grammar', 'coherence', 'idiomatic'],
      prompt: 'Vat samen hoe Johan Cruijff met Totaalvoetbal en Tiki-Taka het wereldvoetbal veranderde, en hoe zijn Cruijffiaanse uitspraken ("Elk nadeel heb z\'n voordeel") de Nederlandse cultuur verrijkten.',
      context: 'Benoem het concept Totaalvoetbal / tiki-taka (driehoeken, positiespel, derde man), zijn erfenis bij FC Barcelona (La Masia) en het verschijnsel Cruijffiaans in de Nederlandse taal.',
      summaryPoints: [
        { id: 'c1', label: 'Totaalvoetbal en Tiki-Taka', keywords: ['Totaalvoetbal', 'tiki-taka', 'positiespel', 'driehoeken', 'overtal', 'balbezit'] },
        { id: 'c2', label: 'FC Barcelona en La Masia', keywords: ['Barcelona', 'Dream Team', 'fundament', 'La Masia', 'combinatievoetbal'] },
        { id: 'c3', label: 'Cruijffiaans en aforismen', keywords: ['Cruijffiaans', 'uitspraken', 'nadeel', 'voordeel', 'paradoxaal', 'aangehaald'] }
      ],
      vocabulary: ['tiki-taka', 'positiespel', 'Totaalvoetbal', 'fundament', 'Cruijffiaans', 'paradoxaal', 'erfenis'],
      grammar: ['subordinate clauses', 'relative clauses', 'inversion'],
      minimumLength: 30,
      target: 'Johan Cruijff revolutioneerde het mondiale voetbal met Totaalvoetbal en de uitvinding van tiki-taka gebaseerd op snelle driehoeken en dominant balbezit. Bij FC Barcelona legde hij het fundament voor modern combinatievoetbal, terwijl zijn paradoxale aforismen zoals "Elk nadeel heb z\'n voordeel" de Nederlandse taal blijvend verrijkten.'
    }
  }
]
