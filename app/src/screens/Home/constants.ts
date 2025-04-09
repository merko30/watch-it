import { MovieStatus } from 'types';

export const MOVIE_LISTS = [
  {
    name: 'wishlist' as MovieStatus,
    title: 'Wishlist',
    backgroundColor: 'orange',
  },
  {
    name: 'watching' as MovieStatus,
    title: 'Watching',
    backgroundColor: 'chocolate',
  },
  {
    name: 'watched' as MovieStatus,
    title: 'Watched',
    backgroundColor: 'brown',
  },
  {
    name: 'watch-again' as MovieStatus,
    title: 'Watch again',
    backgroundColor: 'brown',
  },
];

export const MOVIELIST_HEIGHT = 320;
export const TITLE_HEIGHT = 35;

export const MOVIELIST_MAP = {
  wishlist: 'gold',
  watching: 'orange',
  watched: 'secondary',
  'watch-again': 'primary',
};
