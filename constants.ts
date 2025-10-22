import type { HeroData, ContentRow } from './types';

const TAARE_ZAMEEN_PAR_VIDEO_URL = 'https://www.febspot.com/get_file/18/8a64a914a0c995ab6fae978bcf3c24e8/1240000/1240735/1240735_720p.mp4';


export const HERO_DATA: HeroData = {
    id: 0, // Added ID to conform to ContentItem
    category: 'Movie',
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
    id: 'trending-now',
    title: 'Trending Now',
    items: [
      { id: 19, title: 'Taare Zameen Par', imageUrl: 'https://stat4.bollywoodhungama.in/wp-content/uploads/2016/03/51206127.jpg', description: 'An eight-year-old boy is thought to be a lazy trouble-maker, until the new art teacher has the patience and compassion to discover the real problem behind his struggles in school.', year: 2007, rating: 'PG', genres:['Drama', 'Family'], category: 'Movie', videoUrl: TAARE_ZAMEEN_PAR_VIDEO_URL },
    ],
  },
];