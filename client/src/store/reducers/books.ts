import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Book, BookStatus, GoogleBook} from '../../types';

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
  loading: boolean;
  error: string | null;
  statusLoading: boolean;
  bookStatus: null | BookStatus;
  book: GoogleBook | null;
}

const initialState: State = {
  books: [],
  searchResults: [],
  book: null,
  loading: false,
  error: null,
  statusLoading: false,
  bookStatus: null,
};

const books = createSlice({
  name: 'books',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    error: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    checkBookStart: (state) => {
      state.statusLoading = true;
    },
    checkBookSuccess: (state, action: PayloadAction<BookStatus>) => {
      state.statusLoading = false;
      state.bookStatus = action.payload;
    },
    getBooksSuccess: (state, action: PayloadAction<Book[]>) => {
      // state.books = groupBooksInShelves(state.books, action.payload);
      state.books = action.payload;
      state.loading = false;
    },
    addOrUpdateBookSuccess: (state, action: PayloadAction<Book>) => {
      // let book = Object.values(state.books).reduce((acc,t) => acc.concat(t)).find((b) => b._id === action.payload._id);
      let book = state.books.find((b) => b._id === action.payload._id);
      if (book) {
        book = action.payload;
      } else {
        state.books.push(action.payload);
      }
      state.loading = false;
    },
    deleteBookSuccess: (state, action: PayloadAction<string>) => {
      // state.books = groupBooksInShelves(state.books,ungroupBooks(state.books).filter((b) => b._id !== action.payload));
      state.books = state.books.filter((b) => b._id !== action.payload);
      state.loading = false;
    },
    searchSuccess: (state, action: PayloadAction<GoogleBook[]>) => {
      state.searchResults = action.payload;
      state.loading = false;
    },
    getBookSuccess: (state, action: PayloadAction<GoogleBook>) => {
      state.book = action.payload;
      state.loading = false;
    },
  },
});

export const {
  startLoading,
  checkBookStart,
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
  dispatch(startLoading());
  try {
    const {
      data: {books},
    } = await getAll(params);
    dispatch(getBooksSuccess(books));
  } catch (error) {
    dispatch(error(error.message));
  }
};

export const addOrUpdateBook = (book: Partial<Book>): AppThunk => async (
  dispatch,
) => {
  dispatch(startLoading());
  try {
    const {
      data: {book: newBook},
    } = await put(book);
    dispatch(addOrUpdateBookSuccess(newBook));
  } catch (error) {
    dispatch(error(error.message));
  }
};

export const checkBook = (id: string): AppThunk => async (dispatch) => {
  dispatch(checkBookStart());
  try {
    const {
      data: {bookStatus},
    } = await checkStatus(id);
    dispatch(checkBookSuccess(bookStatus));
  } catch (err) {
    dispatch(error(errorHandler(err)));
  }
};

export const deleteBook = (id: string): AppThunk => async (dispatch) => {
  dispatch(startLoading());
  try {
    await remove(id);
    dispatch(deleteBookSuccess(id));
  } catch (err) {
    dispatch(error(errorHandler(err)));
  }
};

export const getBook = (id: string): AppThunk => async (dispatch) => {
  dispatch(startLoading());
  try {
    const {data} = await getSingleBook(id);
    dispatch(getBookSuccess(data));
  } catch (error) {
    console.log('error', error);
    dispatch(error(error));
  }
};

export const search = (term: string): AppThunk => async (dispatch) => {
  dispatch(startLoading());
  try {
    const {
      data: {items: books},
    } = await searchBooksByTerm(term);
    dispatch(searchSuccess(books));
  } catch (error) {
    console.log('error', error);
    dispatch(error(error));
  }
};
