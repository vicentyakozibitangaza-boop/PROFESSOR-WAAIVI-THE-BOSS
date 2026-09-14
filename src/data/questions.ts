import { QuizQuestion } from '../types';

export const MUSIC_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'Classic Rock',
    genreIcon: 'disc',
    question: "Which iconic British band recorded their landmark final studio album, 'Abbey Road', in 1969?",
    options: [
      "The Rolling Stones",
      "The Beatles",
      "The Who",
      "Led Zeppelin"
    ],
    correctIndex: 1,
    explanation: "Recorded in the summer of 1969, 'Abbey Road' was the final album all four Beatles recorded together, featuring the famous zebra crossing cover photo."
  },
  {
    id: 2,
    category: 'Acoustic Instruments',
    genreIcon: 'guitar',
    question: "Which acoustic string instrument is the smallest and highest-pitched member of the violin family, standardly tuned to G-D-A-E?",
    options: [
      "Viola",
      "Violin",
      "Cello",
      "Mandolin"
    ],
    correctIndex: 1,
    explanation: "The violin's four strings are tuned in perfect fifths: G3, D4, A4, and E5, spanning more than three octaves."
  },
  {
    id: 3,
    category: 'Pop History',
    genreIcon: 'music',
    question: "Released in November 1982, which Quincy Jones-produced record became the best-selling studio album of all time worldwide?",
    options: [
      "Thriller (Michael Jackson)",
      "Bad (Michael Jackson)",
      "Purple Rain (Prince)",
      "Off the Wall (Michael Jackson)"
    ],
    correctIndex: 0,
    explanation: "'Thriller' produced seven Billboard Hot 100 top 10 singles and has sold over 70 million copies worldwide."
  },
  {
    id: 4,
    category: 'Music Theory',
    genreIcon: 'volume-2',
    question: "In musical notation, what Italian term instructs the performer or ensemble to gradually play louder?",
    options: [
      "Diminuendo",
      "Staccato",
      "Crescendo",
      "Legato"
    ],
    correctIndex: 2,
    explanation: "'Crescendo' comes from the Italian verb 'crescere' (to grow) and is noted with a widening hairpin symbol (<)."
  },
  {
    id: 5,
    category: 'Jazz',
    genreIcon: 'radio',
    question: "Recorded in 1959, Miles Davis's monumental album 'Kind of Blue' is celebrated as the defining masterwork of which style?",
    options: [
      "Bebop",
      "Modal Jazz",
      "Dixieland",
      "Ragtime"
    ],
    correctIndex: 1,
    explanation: "'Kind of Blue' moved away from rapid hard-bop chord transitions to modal scales, featuring John Coltrane, Cannonball Adderley, and Bill Evans."
  },
  {
    id: 6,
    category: 'Classical',
    genreIcon: 'piano',
    question: "Which Italian Baroque composer wrote the celebrated violin concertos known as 'The Four Seasons' (Le quattro stagioni) in 1723?",
    options: [
      "Antonio Vivaldi",
      "Johann Sebastian Bach",
      "George Frideric Handel",
      "Claudio Monteverdi"
    ],
    correctIndex: 0,
    explanation: "Vivaldi composed 'The Four Seasons' accompanied by descriptive sonnets, sonically capturing summer thunderstorms, ice skidding, and birdsong."
  },
  {
    id: 7,
    category: 'Hip-Hop',
    genreIcon: 'mic',
    question: "Which critically acclaimed 1994 debut album launched The Notorious B.I.G. with iconic tracks like 'Juicy' and 'Big Poppa'?",
    options: [
      "Illmatic",
      "Ready to Die",
      "Life After Death",
      "Reasonable Doubt"
    ],
    correctIndex: 1,
    explanation: "'Ready to Die' was the only studio album released during Biggie's lifetime, revitalizing East Coast hip-hop with autobiographical storytelling."
  },
  {
    id: 8,
    category: 'Keyboards',
    genreIcon: 'piano',
    question: "A standard full-size modern acoustic grand or upright piano features how many total keys?",
    options: [
      "76 keys",
      "84 keys",
      "88 keys",
      "92 keys"
    ],
    correctIndex: 2,
    explanation: "A standard piano features 88 keys: 52 white keys (naturals) and 36 black keys (accidentals), providing seven octaves plus a minor third."
  },
  {
    id: 9,
    category: 'Soul & R&B',
    genreIcon: 'mic',
    question: "Which legendary artist, widely honored as the 'Queen of Soul', was the first woman ever inducted into the Rock and Roll Hall of Fame?",
    options: [
      "Diana Ross",
      "Aretha Franklin",
      "Etta James",
      "Gladys Knight"
    ],
    correctIndex: 1,
    explanation: "Aretha Franklin was inducted into the Rock and Roll Hall of Fame in 1987, having recorded iconic masterworks like 'Respect' and 'Natural Woman'."
  },
  {
    id: 10,
    category: 'Epic Rock',
    genreIcon: 'disc',
    question: "Which six-minute Queen masterpiece, composed by Freddie Mercury, famously spent nine consecutive weeks at No. 1 on the UK singles chart in 1975?",
    options: [
      "Somebody to Love",
      "We Are the Champions",
      "Bohemian Rhapsody",
      "Don't Stop Me Now"
    ],
    correctIndex: 2,
    explanation: "'Bohemian Rhapsody' broke conventional pop formulas by combining balladry, opera parody, and hard rock without a recurring chorus."
  }
];
