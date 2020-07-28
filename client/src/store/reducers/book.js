import {
  CLEAR_SEARCH,
  searchBooks,
  getBookAction,
  getBooksAction,
  addBookAction,
  deleteBookAction,
  checkBookAction
} from "../actions/books";

const initialState = {
  books: [],
  searchResults: [],
  book: null,
  loading: false,
  error: null,
  statusLoading: false,
  bookStatus: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case searchBooks.start().type:
    case getBooksAction.start().type:
    case getBookAction.start().type:
    case addBookAction.start().type:
    case deleteBookAction.start().type:
    case searchBooks.start().type:
      return {
        ...state,
        loading: true,
        error: null
      };
    case checkBookAction.start().type:
      return {
        ...state,
        statusLoading: true,
        error: null
      };
    case checkBookAction.success().type:
      return {
        ...state,
        statusLoading: false,
        bookStatus: action.payload
      };
    case searchBooks.success().type:
      return {
        ...state,
        loading: false,
        error: null,
        searchResults: action.payload
      };
    case getBooksAction.success().type:
      return {
        ...state,
        loading: false,
        error: null,
        books: action.payload
      };

    case addBookAction.success().type:
      let books = state.books.slice();
      const index = books.findIndex(b => b.bookId === action.payload.bookId);
      if (index !== -1) {
        books[index] = action.payload;
      } else {
        books = [...books, action.payload];
      }
      return {
        ...state,
        loading: false,
        books
      };
    case deleteBookAction.success().type:
      return {
        ...state,
        loading: false,
        books: state.books.filter(b => b.bookId !== action.payload)
      };
    case addBookAction.failure().type:
    case deleteBookAction.failure().type:
    case getBookAction.failure().type:
    case searchBooks.failure().type:
    case getBooksAction.failure().type:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };
    case checkBookAction.failure().type:
      return {
        ...state,
        loading: false,
        error: action.payload.message
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        searchResults: []
      };
    case getBookAction.success().type:
      return {
        ...state,
        book: action.payload,
        error: null,
        loading: false
      };
    default:
      return state;
  }
};
