import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Book, BookStatus, GoogleBook, Loading} from '../../types';

import {
  GetBooksParams,
  getAll,
  put,
  checkStatus,
  remove,
  searchBooksByTerm,
  getSingleBook,
} from '../../api/books';

import {AppThunk} from '../../types';

import errorHandler from '../../utils/errorHandler';

export interface State {
  books: Book[];
  searchResults: any[];
  loadings: Record<Loading, boolean>;
  error: string | null;
  bookStatus: null | BookStatus;
  book: GoogleBook | null;
}

const initialState: State = {
  books: [],
  searchResults: [],
  book: null,
  loadings: {} as any,
  error: null,
  bookStatus: null,
};

const books = createSlice({
  name: 'books',
  initialState,
  reducers: {
    startLoading: (state, action: PayloadAction<{key?: Loading}>) => {
      const key = (action.payload.key
        ? action.payload.key
        : Loading.COMMON) as Loading;
      state.loadings[key] = true;
    },
    error: (
      state,
      action: PayloadAction<{error: string; loadingKey?: Loading}>,
    ) => {
      const key = action.payload.loadingKey
        ? action.payload.loadingKey
        : Loading.COMMON;
      state.error = action.payload.error;
      state.loadings[key] = false;
    },
    checkBookSuccess: (state, action: PayloadAction<BookStatus>) => {
      state.loadings[Loading.STATUS] = false;
      state.bookStatus = action.payload;
    },
    getBooksSuccess: (state, action: PayloadAction<Book[]>) => {
      // state.books = groupBooksInShelves(state.books, action.payload);
      state.books = action.payload;
      state.loadings[Loading.COMMON] = false;
    },
    addOrUpdateBookSuccess: (state, action: PayloadAction<Book>) => {
      let index = state.books.findIndex((b) => b._id === action.payload._id);
      if (state.books[index]) {
        state.books[index] = action.payload;
      } else {
        state.books.push(action.payload);
      }
      state.loadings[Loading.COMMON] = false;
    },
    deleteBookSuccess: (state, action: PayloadAction<string>) => {
      // state.books = groupBooksInShelves(state.books,ungroupBooks(state.books).filter((b) => b._id !== action.payload));
      state.books = state.books.filter((b) => b.bookId !== action.payload);
      state.loadings[Loading.DELETE] = false;
    },
    searchSuccess: (state, action: PayloadAction<GoogleBook[]>) => {
      state.searchResults = action.payload;
      state.loadings[Loading.STATUS] = false;
    },
    getBookSuccess: (state, action: PayloadAction<GoogleBook>) => {
      state.book = action.payload;
      state.loadings[Loading.COMMON] = false;
    },
  },
});

export const {
  startLoading,
  getBooksSuccess,
  addOrUpdateBookSuccess,
  deleteBookSuccess,
  checkBookSuccess,
  getBookSuccess,
  searchSuccess,
  error,
} = books.actions;

export default books.reducer;

export const getBooks = (params: GetBooksParams): AppThunk => async (
  dispatch,
) => {
  dispatch(startLoading({}));
  try {
    const {
      data: {books},
    } = await getAll(params);
    dispatch(getBooksSuccess(books));
  } catch (err) {
    dispatch(error({error: errorHandler(err)}));
  }
};

export const addOrUpdateBook = (book: Partial<Book>): AppThunk => async (
  dispatch,
) => {
  dispatch(startLoading({}));
  try {
    const {
      data: {book: newBook},
    } = await put(book);
    dispatch(addOrUpdateBookSuccess(newBook));
  } catch (err) {
    dispatch(error({error: errorHandler(err)}));
  }
};

export const checkBook = (id: string): AppThunk => async (dispatch) => {
  dispatch(startLoading({key: Loading.STATUS}));
  try {
    const {
      data: {bookStatus},
    } = await checkStatus(id);
    dispatch(checkBookSuccess(bookStatus));
  } catch (err) {
    dispatch(error({error: errorHandler(err), loadingKey: Loading.STATUS}));
  }
};

export const deleteBook = (id: string): AppThunk => async (dispatch) => {
  dispatch(startLoading({key: Loading.DELETE}));
  try {
    await remove(id);
    dispatch(deleteBookSuccess(id));
  } catch (err) {
    dispatch(error({error: errorHandler(err), loadingKey: Loading.DELETE}));
  }
};

export const getBook = (id: string): AppThunk => async (dispatch) => {
  dispatch(startLoading({}));
  try {
    const {
      data: {book},
    } = await getSingleBook(id);
    dispatch(getBookSuccess(book));
  } catch (err) {
    dispatch(error({error: errorHandler(err)}));
  }
};

export const search = (term: string): AppThunk => async (dispatch) => {
  dispatch(startLoading({key: Loading.STATUS}));
  try {
    const {
      data: {
        books: {items: books},
      },
    } = await searchBooksByTerm(term);
    dispatch(searchSuccess(books));
  } catch (err) {
    dispatch(error({error: errorHandler(err), loadingKey: Loading.STATUS}));
  }
};
