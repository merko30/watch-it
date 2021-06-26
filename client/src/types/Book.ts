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

export interface GoogleBook {
  id: string;
  volumeInfo: {
    industryIdentifiers: Array<{type: string; identifier: string}>;
    imageLinks: Record<
      'smallThumbnail' | 'thumbnail' | 'small' | 'medium' | 'large',
      string
    >;
    publisher: string;
    title: string;
    authors: string[];
    description: string;
    averageRating: number;
    pagesCount: number;
    ratingsCount: number;
  };
}
