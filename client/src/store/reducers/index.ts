import {combineReducers} from '@reduxjs/toolkit';

import auth from './auth';
import books from './books';

const reducer = combineReducers({
  auth,
  books,
});

export default reducer;

export type RootState = ReturnType<typeof reducer>;
