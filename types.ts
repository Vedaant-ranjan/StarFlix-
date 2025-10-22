export interface ContentItem {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  year: number;
  rating: string;
  genres: string[];
  category?: 'Movie' | 'Show';
  progress?: number; // Optional progress for 'Continue Watching'
  videoUrl?: string;
}

export interface ContentRow {
  id: string;
  title: string;
  items: ContentItem[];
}

export interface HeroData extends ContentItem {
  category: 'Movie';
  details: string[];
  backgroundImageUrl: string;
}