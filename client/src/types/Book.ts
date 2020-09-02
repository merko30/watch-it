export type BookStatus = 'wishlist' | 'reading' | 'read';

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
      thumbnail?: string;
      smallThumbnail?: string;
    };
    authors: string[];
    description: string[];
    averageRating: number;
  };
}
