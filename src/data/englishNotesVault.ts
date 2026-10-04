export interface EnglishCharacter {
  name: string;
  role: string;
  oneLineDescription: string;
}

export interface EnglishChapterVault {
  id: string;
  unitNumber: number;
  title: string;
  type: 'Story' | 'Poem' | 'Play' | 'Letter' | 'Interview' | 'Documentary';
  author: string;
  authorTitle: string; // e.g. "Author", "Poet", "Playwright"
  characters: EnglishCharacter[];
}

export const ENGLISH_VAULT_CHAPTERS: EnglishChapterVault[] = [
  // UNIT 1
  {
    id: 'eng-u1-story',
    unitNumber: 1,
    title: 'How I Taught My Grandmother to Read',
    type: 'Story',
    author: 'Sudha Murty',
    authorTitle: 'Author',
    characters: [
      {
        name: 'Sudha (Narrator)',
        role: 'Granddaughter & Teacher',
        oneLineDescription: 'A loving 12-year-old girl who reads stories to her grandmother and patiently teaches her the Kannada alphabet.',
      },
      {
        name: 'Krishtakka (Avva)',
        role: 'Grandmother & Student',
        oneLineDescription: 'A determined 62-year-old grandmother who overcomes illiteracy through relentless hard work to become independent.',
      },
      {
        name: 'Triveni',
        role: 'Kannada Novelist (In the story)',
        oneLineDescription: 'A popular Kannada writer whose serialized novel Kashi Yatre inspires the grandmother’s burning desire to learn reading.',
      },
    ],
  },
  {
    id: 'eng-u1-poem',
    unitNumber: 1,
    title: 'Bharat Our Land',
    type: 'Poem',
    author: 'Subramania Bharati',
    authorTitle: 'Poet',
    characters: [
      {
        name: 'The Patriotic Speaker',
        role: 'Poetic Voice',
        oneLineDescription: 'A passionate narrator celebrating the unparalleled natural splendour, ancient wisdom, and cultural pride of Bharat.',
      },
      {
        name: 'Gallant Warriors & Sages',
        role: 'Ancestral Guardians',
        oneLineDescription: 'Historical defenders and enlightened spiritual seers who sanctified the land with courage and divine Brahma-knowledge.',
      },
      {
        name: 'Gautama Buddha',
        role: 'Spiritual Master',
        oneLineDescription: 'The revered philosopher who preached the timeless doctrine of dhamma, non-violence, and universal compassion in Bharat.',
      },
    ],
  },

  // UNIT 2
  {
    id: 'eng-u2-story',
    unitNumber: 2,
    title: 'The Pot Maker',
    type: 'Story',
    author: 'Temsula Ao',
    authorTitle: 'Author',
    characters: [
      {
        name: 'Sentila',
        role: 'Young Protagonist',
        oneLineDescription: 'A spirited and tenacious young girl who perseveres through exhaustion and self-doubt to master traditional pottery.',
      },
      {
        name: 'Arenla',
        role: 'Sentila’s Mother',
        oneLineDescription: 'An expert potter who initially discourages her daughter due to the grueling physical toll and poor financial returns of the craft.',
      },
      {
        name: 'Mesoba',
        role: 'Sentila’s Father',
        oneLineDescription: 'A calm, respectful father who defends his family’s traditions with quiet humility before the village elders.',
      },
      {
        name: 'Onula (Aunty)',
        role: 'Dormitory Supervisor & Mentor',
        oneLineDescription: 'A kind, empathetic village widow who recognizes Sentila’s raw talent and gently instructs her on mastering the shape of pots.',
      },
      {
        name: 'The Village Elders',
        role: 'Community Custodians',
        oneLineDescription: 'Custodians of village heritage who remind the family that traditional crafts belong to the community and must be passed down.',
      },
    ],
  },
  {
    id: 'eng-u2-poem',
    unitNumber: 2,
    title: 'Gifts of Grace: Honouring Our Vocations',
    type: 'Poem',
    author: 'Anonymous',
    authorTitle: 'Poet',
    characters: [
      {
        name: 'The Appreciative Observer',
        role: 'Speaker',
        oneLineDescription: 'A celebratory voice paying lyrical homage to the pride, individuality, and dignity of everyday hardworking vocations across Bharat.',
      },
      {
        name: 'The Craftsmen & Carpenters',
        role: 'Skilled Builders',
        oneLineDescription: 'Dedicated artisans and woodcrafters who create beautiful, essential objects with mathematical precision and devotion.',
      },
      {
        name: 'The Electricians & Shoemakers',
        role: 'Everyday Workers',
        oneLineDescription: 'Humming electricians bringing light to homes and cobblers affirming sturdiness for feet that walk, run, and dance.',
      },
      {
        name: 'The Boatmen & Masons',
        role: 'Traditional Workers',
        oneLineDescription: 'Singing fishermen hauling nets from the sea and masons whose rhythmic labour shapes the living identity of society.',
      },
    ],
  },
  {
    id: 'eng-u2-supp',
    unitNumber: 2,
    title: 'Quality (Supplementary Reading)',
    type: 'Story',
    author: 'John Galsworthy',
    authorTitle: 'Author',
    characters: [
      {
        name: 'Mr. Gessler',
        role: 'Master Bootmaker',
        oneLineDescription: 'An uncompromising, passionate German shoemaker in London who starves rather than compromise on the supreme quality of his craft.',
      },
      {
        name: 'Elder Gessler Brother',
        role: 'Partner & Craftsman',
        oneLineDescription: 'The quiet, equally devoted elder brother who shares the shop and passes away under the strain of unfair industrial competition.',
      },
      {
        name: 'The Narrator',
        role: 'Loyal Customer',
        oneLineDescription: 'A sympathetic gentleman who appreciates the mysterious artistry of Gessler’s boots and mourns the tragic death of the master craftsman.',
      },
    ],
  },

  // UNIT 3
  {
    id: 'eng-u3-story',
    unitNumber: 3,
    title: 'Winds of Change',
    type: 'Documentary',
    author: 'Gaatha.com',
    authorTitle: 'Cultural Collective / Author',
    characters: [
      {
        name: 'Traditional Indian Pankha Artisans',
        role: 'Folk Craftsmen',
        oneLineDescription: 'Skilled craftspeople across Rajasthan, Gujarat, and Bengal who transform bamboo, feathers, and palm leaves into ornate cultural fans.',
      },
      {
        name: 'Home-based Women Workers of Gujarat & Kutch',
        role: 'Embroiderers & Beadworkers',
        oneLineDescription: 'Industrious rural women who tirelessly craft mirror-work and bead-encrusted fans to sustain their households.',
      },
      {
        name: 'Modern Cultural Revivers',
        role: 'Preservationists',
        oneLineDescription: 'Advocates organizing workshops and fairs to rescue the endangered heritage of hand fans from disappearing into history.',
      },
    ],
  },
  {
    id: 'eng-u3-poem',
    unitNumber: 3,
    title: 'Canvas of Soil',
    type: 'Poem',
    author: 'Maya Anthony',
    authorTitle: 'Poet',
    characters: [
      {
        name: 'The Poet-Observer',
        role: 'Speaker',
        oneLineDescription: 'A contemplative voice who views the earth as a painter’s palette where seeds act as brushstrokes waiting for spring.',
      },
      {
        name: 'The Tillers & Gardeners',
        role: 'Earth Artists',
        oneLineDescription: 'Passionate cultivators whose daily toil in the soil blends artistic beauty with the living rhythm of nature.',
      },
    ],
  },
  {
    id: 'eng-u3-supp',
    unitNumber: 3,
    title: 'The Last Leaf (Supplementary Reading)',
    type: 'Story',
    author: 'O. Henry',
    authorTitle: 'Author',
    characters: [
      {
        name: 'Johnsy (Joanna)',
        role: 'Sick Young Artist',
        oneLineDescription: 'A frail young painter suffering from pneumonia who grimly ties her will to live to the falling leaves of an ivy vine.',
      },
      {
        name: 'Sue',
        role: 'Devoted Roommate & Friend',
        oneLineDescription: 'A loving, fiercely protective artist who works relentlessly and cares for Johnsy to keep her spirits from sinking.',
      },
      {
        name: 'Mr. Behrman',
        role: 'Veteran Painter Downstairs',
        oneLineDescription: 'A gruff, failing old painter who sacrifices his life in a freezing midnight storm to paint his masterly leaf that saves Johnsy.',
      },
      {
        name: 'The Doctor',
        role: 'Attending Physician',
        oneLineDescription: 'A pragmatic medical practitioner who understands that medicines are useless without Johnsy’s internal determination to live.',
      },
    ],
  },

  // UNIT 4
  {
    id: 'eng-u4-story',
    unitNumber: 4,
    title: 'Vitamin-M',
    type: 'Story',
    author: 'Asha Nehemiah',
    authorTitle: 'Author',
    characters: [
      {
        name: 'Ravi',
        role: '12-Year-Old Grandson',
        oneLineDescription: 'An observant, affectionate boy who secretly trails his grandfather through city streets to ensure his safety.',
      },
      {
        name: 'Grandpa',
        role: '75-Year-Old Retired Lawyer',
        oneLineDescription: 'A sharp, mischievous chess enthusiast and fiercely independent elder who refuses to be treated like a helpless prisoner.',
      },
      {
        name: 'Vidya (Ravi’s Mother)',
        role: 'Daughter',
        oneLineDescription: 'A caring but overly protective mother whose anxious fussing and loud tone make her aging father feel smothered.',
      },
      {
        name: 'Ravi’s Father',
        role: 'Father',
        oneLineDescription: 'A mild-mannered parent who gets humorously caught between Grandpa’s witty retorts and his wife’s worried instructions.',
      },
      {
        name: 'The Yellow-Cap Stranger on the Bus',
        role: 'Commuter',
        oneLineDescription: 'A pleasant passenger wearing Grandpa’s gifted yellow cap who inadvertently leads Ravi on a wild bus chase.',
      },
    ],
  },
  {
    id: 'eng-u4-poem',
    unitNumber: 4,
    title: 'I Cannot Remember My Mother',
    type: 'Poem',
    author: 'Rabindranath Tagore',
    authorTitle: 'Poet',
    characters: [
      {
        name: 'The Speaker (Bereaved Child)',
        role: 'Poetic Voice',
        oneLineDescription: 'A sensitive child who lost his mother in infancy and experiences her presence through lullabies, flower scents, and the blue sky.',
      },
      {
        name: 'The Mother',
        role: 'Spiritual Presence',
        oneLineDescription: 'An ethereal maternal figure whose lingering love and watchful gaze over her child’s cradle remain permanent throughout his life.',
      },
    ],
  },
  {
    id: 'eng-u4-supp',
    unitNumber: 4,
    title: 'The Lost Child (Supplementary Reading)',
    type: 'Story',
    author: 'Mulk Raj Anand',
    authorTitle: 'Author',
    characters: [
      {
        name: 'The Lost Child',
        role: 'Innocent Protagonist',
        oneLineDescription: 'A cheerful boy visiting a spring fair who begs for toys and sweets, but realizes his parents are his only true desire once separated.',
      },
      {
        name: 'The Father',
        role: 'Strict Father',
        oneLineDescription: 'An authoritative parent whose firm, red-eyed glance instantly disciplines the boy’s repeated requests for toys.',
      },
      {
        name: 'The Mother',
        role: 'Tender Mother',
        oneLineDescription: 'A gentle, affectionate mother who lovingly distracts the boy with dragonflies and blooming mustard fields.',
      },
      {
        name: 'The Rescuing Stranger',
        role: 'Benevolent rescuer',
        oneLineDescription: 'A noble, compassionate gentleman in the shrine crowd who saves the child from being trampled and tries soothing him with gifts.',
      },
    ],
  },

  // UNIT 5
  {
    id: 'eng-u5-interview',
    unitNumber: 5,
    title: 'The World of Limitless Possibilities',
    type: 'Interview',
    author: 'Dr. Deepa Malik (Interviewed)',
    authorTitle: 'Subject / Autobiographical Voice',
    characters: [
      {
        name: 'Dr. Deepa Malik',
        role: 'Paralympic Silver Medallist & Champion',
        oneLineDescription: 'A historic Indian para-athlete and Khel Ratna awardee who transformed spinal paralysis into global sporting glory and inclusion advocacy.',
      },
      {
        name: 'The Interviewer',
        role: 'Sports Journalist',
        oneLineDescription: 'A respectful interviewer who explores Dr. Malik’s fortitude, achievements, and mission of ‘ability beyond disability’.',
      },
      {
        name: 'Dr. Malik’s Family',
        role: 'Support System',
        oneLineDescription: 'The loyal pillars of encouragement whose steadfast backing helped Deepa turn insurmountable obstacles into stepping stones.',
      },
    ],
  },
  {
    id: 'eng-u5-poem',
    unitNumber: 5,
    title: 'Nine Gold Medals',
    type: 'Poem',
    author: 'David Roth',
    authorTitle: 'Poet',
    characters: [
      {
        name: 'The Smallest Runner',
        role: 'Young Special Athlete',
        oneLineDescription: 'A determined boy who stumbles and falls to the track, crying in anguish as his dreams seem destroyed.',
      },
      {
        name: 'The Eight Other Athletes',
        role: 'Empathetic Competitors',
        oneLineDescription: 'Compassionate runners who halt their race, turn back to help the fallen boy to his feet, and finish together holding hands.',
      },
      {
        name: 'The Stadium Spectators',
        role: 'Witnessing Audience',
        oneLineDescription: 'An emotionally moved audience that erupts into a standing ovation celebrating humanity over competition.',
      },
    ],
  },

  // UNIT 6
  {
    id: 'eng-u6-play',
    unitNumber: 6,
    title: 'Twin Melodies',
    type: 'Play',
    author: 'Mitra Phukan',
    authorTitle: 'Playwright',
    characters: [
      {
        name: 'Shruti Sharma',
        role: 'Young Violinist',
        oneLineDescription: 'A gifted, anxious girl torn between her strict father’s classical expectations and her creative passion for fusion music.',
      },
      {
        name: 'Guru Nabin Sharma',
        role: 'Shruti’s Father & Music Principal',
        oneLineDescription: 'A strict classical purist who initially rejects fusion music as noise before proudly discovering his daughter’s mastery.',
      },
      {
        name: 'Leela Devi',
        role: 'Shruti’s Mother',
        oneLineDescription: 'An insightful, warm mother who reconciles father and daughter by reminding Nabin of his own youthful musical rebellion.',
      },
      {
        name: 'Iqbal',
        role: 'Flutist in Fusion Band',
        oneLineDescription: 'A humorous, dependable friend who hosts band rehearsals in his room and encourages Shruti to talk to her father.',
      },
      {
        name: 'Avinash',
        role: 'Tabla Player',
        oneLineDescription: 'An enthusiastic band member whose rhythm anchors the group and who urges Shruti to celebrate her talent boldly.',
      },
      {
        name: 'Peter',
        role: 'Keyboard Player',
        oneLineDescription: 'A pragmatic musician in the fusion quartet who focuses on rehearsals and boosts Shruti’s courage.',
      },
    ],
  },
  {
    id: 'eng-u6-poem',
    unitNumber: 6,
    title: 'A Friend Found in Music',
    type: 'Poem',
    author: 'Bryanna T. Perkins',
    authorTitle: 'Poet',
    characters: [
      {
        name: 'The Speaker',
        role: 'Music Enthusiast',
        oneLineDescription: 'A lonely, reflective individual who considers music a dependable, comforting friend that lifts the spirit when feeling blue.',
      },
    ],
  },

  // UNIT 7
  {
    id: 'eng-u7-story',
    unitNumber: 7,
    title: 'Carrier of Words',
    type: 'Documentary',
    author: 'NCERT / India Post Documentary',
    authorTitle: 'Author / Documentarian',
    characters: [
      {
        name: 'Khetaram',
        role: 'Gramin Dak Sewak (Postman)',
        oneLineDescription: 'A dedicated, 60-year-old desert postman who walks 20 km through Thar sandstorms carrying vital letters and money orders.',
      },
      {
        name: 'Budh Singh',
        role: 'Village Elder',
        oneLineDescription: 'A wise village senior who articulates the community’s deep trust in the postal delivery agents over modern officials.',
      },
      {
        name: 'Panna Devi & Border Families',
        role: 'Desert Inhabitants',
        oneLineDescription: 'Remote villagers living near the border whose emotional survival and sustenance depend on Khetaram’s mailbag.',
      },
      {
        name: 'The BSF Soldiers',
        role: 'Border Patrol',
        oneLineDescription: 'Border security personnel who treat Khetaram with affection, offering him vehicle lifts and hot cups of tea.',
      },
    ],
  },
  {
    id: 'eng-u7-poem',
    unitNumber: 7,
    title: 'Words',
    type: 'Poem',
    author: 'Charles Swain',
    authorTitle: 'Poet',
    characters: [
      {
        name: 'The Philosophical Speaker',
        role: 'Poetic Voice',
        oneLineDescription: 'A reflective guide who warns that careless words depart like empty air, while a few heartfelt words can cheer a lonely soul.',
      },
    ],
  },

  // UNIT 8
  {
    id: 'eng-u8-letter',
    unitNumber: 8,
    title: 'Follow That Dream',
    type: 'Letter',
    author: 'Irene Chua',
    authorTitle: 'Author / Mother',
    characters: [
      {
        name: 'Irene Chua (The Mother)',
        role: 'Loving Mentor & Writer',
        oneLineDescription: 'A wise mother who pens a realistic, encouraging letter urging her daughter to commit years of dedication to achieve her dream.',
      },
      {
        name: 'Ming',
        role: 'Teenage Daughter',
        oneLineDescription: 'An aspiring young girl on the verge of choosing her life ambitions, guided by her mother’s hard-earned life lessons.',
      },
    ],
  },
  {
    id: 'eng-u8-poem',
    unitNumber: 8,
    title: 'Believe in Yourself',
    type: 'Poem',
    author: 'Robert Langley',
    authorTitle: 'Poet',
    characters: [
      {
        name: 'The Life Mentor',
        role: 'Guiding Speaker',
        oneLineDescription: 'An inspiring mentor urging youth to discard comfortable stagnation, overcome fear, and courageously take the first step forward.',
      },
    ],
  },
];
