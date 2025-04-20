import { MovieStatus } from 'types';

export const MOVIE_LISTS = [
  {
    name: 'wishlist' as MovieStatus,
    title: 'Wishlist',
  },
  {
    name: 'watching' as MovieStatus,
    title: 'Watching',
  },
  {
    name: 'watched' as MovieStatus,
    title: 'Watched',
  },
  {
    name: 'watch-again' as MovieStatus,
    title: 'Watch again',
  },
];

export const MOVIELIST_HEIGHT = 320;
export const TITLE_HEIGHT = 35;

export const MOVIELIST_MAP = {
  wishlist: 'beige',
  watching: 'gold',
  watched: 'orange',
  'watch-again': 'chocolate',
};
