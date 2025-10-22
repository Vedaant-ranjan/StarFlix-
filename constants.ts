import type { HeroData, ContentRow } from './types';

const PROJECT_VIPER_VIDEO_URL = 'https://www.febspot.com/get_file/9/431918388ccd7329368cdaabcd9752dd/529000/529117/529117_720p.mp4';
const TAARE_ZAMEEN_PAR_VIDEO_URL = 'https://www.febspot.com/get_file/18/8a64a914a0c995ab6fae978bcf3c24e8/1240000/1240735/1240735_720p.mp4';


export const HERO_DATA: HeroData = {
    id: 0, // Added ID to conform to ContentItem
    category: 'MOVIE',
    title: 'Taare Zameen Par',
    description: 'An eight-year-old boy is thought to be a lazy trouble-maker, until the new art teacher has the patience and compassion to discover the real problem behind his struggles in school.',
    year: 2007,
    rating: 'U/A 7+',
    genres: ['Drama'],
    details: ['Movie', '2007', 'U/A 7+'],
    backgroundImageUrl: 'https://m.media-amazon.com/images/M/MV5BMDhjZWViN2YtMmUzYS00MGI1LTk3MTQtM2U5N2U2YjU5N2E3XkEyXkFqcGdeQXVyNTE0MDc0NTM@._V1_FMjpg_UX1000_.jpg',
    imageUrl: 'https://stat4.bollywoodhungama.in/wp-content/uploads/2016/03/51206127.jpg',
    videoUrl: TAARE_ZAMEEN_PAR_VIDEO_URL,
    progress: 30, // The user has watched 30% of this movie
};

export const CONTENT_ROWS: ContentRow[] = [
  {
    id: 'continue-watching',
    title: 'Continue Watching',
    items: [
      { id: 1, title: 'The Witcher', imageUrl: 'https://picsum.photos/seed/witcher/400/225', description: 'A solitary monster hunter struggles to find his place in a world where people often prove more wicked than beasts.', year: 2019, rating: 'TV-MA', genres:['Fantasy', 'Action'], progress: 75 },
      { id: 2, title: 'Stranger Things', imageUrl: 'https://picsum.photos/seed/stranger/400/225', description: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.', year: 2016, rating: 'TV-14', genres:['Sci-Fi', 'Horror'], progress: 50 },
      { id: 3, title: 'The Crown', imageUrl: 'https://picsum.photos/seed/crown/400/225', description: 'Follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.', year: 2016, rating: 'TV-MA', genres:['Drama', 'History'], progress: 20 },
      { id: 4, title: 'Black Mirror', imageUrl: 'https://picsum.photos/seed/mirror/400/225', description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.', year: 2011, rating: 'TV-MA', genres:['Sci-Fi', 'Thriller'], progress: 90 },
      { id: 5, title: 'Money Heist', imageUrl: 'https://picsum.photos/seed/heist/400/225', description: 'An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.', year: 2017, rating: 'TV-MA', genres:['Crime', 'Thriller'], progress: 60 },
      { id: 6, title: 'Dark', imageUrl: 'https://picsum.photos/seed/dark/400/225', description: 'A family saga with a supernatural twist, set in a German town, where the disappearance of two young children exposes the relationships among four families.', year: 2017, rating: 'TV-MA', genres:['Mystery', 'Sci-Fi'], progress: 35 },
    ],
  },
  {
    id: 'trending-now',
    title: 'Trending Now',
    items: [
      { id: 19, title: 'Taare Zameen Par', imageUrl: 'https://stat4.bollywoodhungama.in/wp-content/uploads/2016/03/51206127.jpg', description: 'An eight-year-old boy is thought to be a lazy trouble-maker, until the new art teacher has the patience and compassion to discover the real problem behind his struggles in school.', year: 2007, rating: 'PG', genres:['Drama', 'Family'], videoUrl: TAARE_ZAMEEN_PAR_VIDEO_URL },
      { id: 7, title: 'Bridgerton', imageUrl: 'https://picsum.photos/seed/bridgerton/400/225', description: 'Wealth, lust, and betrayal set in the backdrop of Regency era England, seen through the eyes of the powerful Bridgerton family.', year: 2020, rating: 'TV-MA', genres:['Romance', 'Drama'] },
      { id: 8, title: 'The Expanse', imageUrl: 'https://picsum.photos/seed/expanse/400/225', description: 'A police detective in the asteroid belt, the first officer of an interplanetary ice freighter, and an earth-bound United Nations executive slowly unravel a vast conspiracy.', year: 2015, rating: 'TV-14', genres:['Sci-Fi', 'Mystery'] },
      { id: 9, title: 'The Queens Gambit', imageUrl: 'https://picsum.photos/seed/gambit/400/225', description: 'Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.', year: 2020, rating: 'TV-MA', genres:['Drama'] },
      { id: 10, title: 'Lupin', imageUrl: 'https://picsum.photos/seed/lupin/400/225', description: 'Inspired by the adventures of Arsène Lupin, gentleman thief Assane Diop sets out to avenge his father for an injustice inflicted by a wealthy family.', year: 2021, rating: 'TV-MA', genres:['Crime', 'Action'] },
      { id: 11, title: 'Cobra Kai', imageUrl: 'https://picsum.photos/seed/cobra/400/225', description: 'Decades after their 1984 All Valley Karate Tournament bout, a middle-aged Daniel LaRusso and Johnny Lawrence find themselves martial-arts rivals again.', year: 2018, rating: 'TV-14', genres:['Action', 'Comedy'] },
    ],
  },
  {
    id: 'new-releases',
    title: 'New Releases',
    items: [
      { id: 13, title: 'Arcane', imageUrl: 'https://picsum.photos/seed/arcane/400/225', description: 'Set in utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions-and the power that will tear them apart.', year: 2021, rating: 'TV-14', genres:['Animation', 'Action'] },
      { id: 14, title: 'Inventing Anna', imageUrl: 'https://picsum.photos/seed/anna/400/225', description: 'A journalist with a lot to prove investigates the case of Anna Delvey, the Instagram-legendary German heiress who stole the hearts of New York\'s social scene - and stole their money as well.', year: 2022, rating: 'TV-MA', genres:['Drama'] },
      { id: 15, 'title': 'All of Us Are Dead', imageUrl: 'https://picsum.photos/seed/dead/400/225', description: 'A high school becomes ground zero for a zombie virus outbreak. Trapped students must fight their way out - or turn into one of the rabid infected.', year: 2022, rating: 'TV-MA', genres:['Horror', 'Action'] },
      { id: 16, title: 'The Sandman', imageUrl: 'https://picsum.photos/seed/sandman/400/225', description: 'Upon escaping after decades of imprisonment by a mortal wizard, Dream, the personification of dreams, sets about to reclaim his lost equipment.', year: 2022, rating: 'TV-MA', genres:['Fantasy', 'Drama'] },
      { id: 17, title: 'Wednesday', imageUrl: 'https://picsum.photos/seed/wednesday/400/225', description: 'While attending Nevermore Academy, Wednesday Addams attempts to master her emerging psychic ability, thwart a monstrous killing spree, and solve the supernatural mystery that embroiled her parents 25 years ago.', year: 2022, rating: 'TV-14', genres:['Comedy', 'Fantasy'] },
      { id: 18, title: 'Cyberpunk Edgerunners', imageUrl: 'https://picsum.photos/seed/edgerunners/400/225', description: 'A Street Kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an Edgerunner.', year: 2022, rating: 'TV-MA', genres:['Animation', 'Sci-Fi'] },
    ],
  },
];