export type BookStatus = 'wishlist' | 'reading' | 'read';

export enum Loading {
  COMMON = 'common',
  STATUS = 'status',
  DELETE = 'delete',
}

export interface Book {
  _id: string;
  id: string;
  title: string;
  authors: string[];
  user: string;
  status: BookStatus;
  thumbnail: string;
}

export interface Author {
  id: string;
  name: string;
}

export interface GoodreadsBook {
  id: string;
  isbn?: string;
  image_url: string;
  small_image_url: string;
  publisher: string;
  title: string;
  authors: Author[];
  description: string;
  average_rating: number;
  num_pages: number;
  ratings_count: number;
  similar_books: {
    book: Partial<GoodreadsBook>[];
  };
}
