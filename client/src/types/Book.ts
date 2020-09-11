export type BookStatus = 'wishlist' | 'reading' | 'read';

export enum Loading {
  COMMON = 'common',
  STATUS = 'status',
  DELETE = 'delete',
}

export interface Book {
  _id: string;
  bookId: string;
  title: string;
  authors: string[];
  reader: string;
  status: BookStatus;
  thumbnail?: string;
}

export interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    categories: string[];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
    authors: string[];
    description: string;
    averageRating?: number;
    pageCount: number;
    mainCategory?: string;
    ratingsCount?: number;
  };
}
