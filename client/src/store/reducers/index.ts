import {combineReducers} from '@reduxjs/toolkit';

import auth from './auth';
import books from './books';
import ui from './ui';

const reducer = combineReducers({
  ui,
  auth,
  books,
});

export default reducer;

export type RootState = ReturnType<typeof reducer>;
