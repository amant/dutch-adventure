export interface Idiom {
  phrase: string;
  literal: string;
  meaning: string;
  example: string;
  level: 'B1' | 'B2';
  category: 'work' | 'social' | 'general';
}

export const idioms: Idiom[] = [
  {
    phrase: 'Nu komt de aap uit de mouw',
    literal: 'Now the monkey comes out of the sleeve',
    meaning: 'Now the truth is finally revealed (often when someone\'s true intentions become clear).',
    example: 'Oh, dus je wilde die promotie de hele tijd al? Nu komt de aap uit de mouw!',
    level: 'B2',
    category: 'general',
  },
  {
    phrase: 'Met de deur in huis vallen',
    literal: 'To fall with the door into the house',
    meaning: 'To get straight to the point without any small talk.',
    example: 'Ik zal maar meteen met de deur in huis vallen: we moeten je contract beëindigen.',
    level: 'B1',
    category: 'general',
  },
  {
    phrase: 'Iets onder de knie krijgen',
    literal: 'To get something under the knee',
    meaning: 'To master something or get the hang of it.',
    example: 'Nederlandse grammatica is lastig, maar ik begin het onder de knie te krijgen.',
    level: 'B1',
    category: 'general',
  },
  {
    phrase: 'Een oogje in het zeil houden',
    literal: 'To keep an eye in the sail',
    meaning: 'To keep an eye on things, to monitor a situation.',
    example: 'Kun jij een oogje in het zeil houden terwijl ik even weg ben?',
    level: 'B2',
    category: 'general',
  },
  {
    phrase: 'Dat slaat als een tang op een varken',
    literal: 'That hits like a pair of tongs on a pig',
    meaning: 'That makes no sense at all / is completely irrelevant.',
    example: 'Wat je nu zegt, slaat echt als een tang op een varken.',
    level: 'B2',
    category: 'general',
  },
  {
    phrase: 'De bloemetjes buiten zetten',
    literal: 'To put the flowers outside',
    meaning: 'To go out and party / celebrate.',
    example: 'Na het examen gaan we flink de bloemetjes buiten zetten!',
    level: 'B1',
    category: 'social',
  },
  {
    phrase: 'Het ijs breken',
    literal: 'To break the ice',
    meaning: 'To break the ice in a social situation.',
    example: 'Hij vertelde een grapje om het ijs te breken.',
    level: 'B1',
    category: 'social',
  },
  {
    phrase: 'Iemand een hart onder de riem steken',
    literal: 'To stick a heart under someone\'s belt',
    meaning: 'To encourage someone who is going through a hard time.',
    example: 'We stuurden haar een kaartje om haar een hart onder de riem te steken.',
    level: 'B2',
    category: 'social',
  },
];
