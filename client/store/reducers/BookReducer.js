import {
  CLEAR_SEARCH,
  searchBooks,
  getBookAction,
  getBooksAction,
  addBookAction,
  deleteBookAction,
  changeStatusAction
} from "../actions/BookActions";

const InitialState = {
  books: [],
  searchResults: [],
  book: null,
  loading: false,
  error: null
};

const bookReducer = (state = InitialState, action) => {
  switch (action.type) {
    case searchBooks.start().type:
    case getBooksAction.start().type:
    case getBookAction.start().type:
      return {
        ...state,
        loading: true,
        error: null
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
    case addBookAction.start().type:
    case changeStatusAction.start().type:
    case deleteBookAction.start().type:
    case searchBooks.start().type:
      return {
        ...state,
        loading: true
      };
    case addBookAction.success().type:
      return {
        ...state,
        loading: false,
        books: [...state.books, action.payload.book]
      };
    case changeStatusAction.success().type:
      const changedBook = action.payload;
      const newBooks = state.books;
      const indexOfBook = newBooks.findIndex(b => b._id == changedBook._id);
      newBooks[indexOfBook] = changedBook;
      return {
        ...state,
        loading: false,
        books: newBooks
      };
    case deleteBookAction.success().type:
      return {
        ...state,
        loading: false,
        books: state.books.filter(b => b._id !== action.payload)
      };
    case addBookAction.failure().type:
    case changeStatusAction.failure().type:
    case deleteBookAction.failure().type:
    case getBookAction.failure().type:
    case searchBooks.failure().type:
    case getBooksAction.failure().type:
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
        book: action.payload
      };
    default:
      return state;
  }
};

export default bookReducer;
