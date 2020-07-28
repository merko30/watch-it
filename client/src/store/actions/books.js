import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";

import createAction from "../utils/createAction";

export const searchBooks = createAction("SEARCH_BOOKS");
export const getBooksAction = createAction("GET_BOOKS");
export const getBookAction = createAction("GET_BOOK");
export const addBookAction = createAction("ADD_BOOK");
export const checkBookAction = createAction("CHECK_BOOK");
export const deleteBookAction = createAction("DELETE_BOOK");

export const CLEAR_SEARCH = "CLEAR_SEARCH";

import {
  REACT_APP_SERVER_API_URL,
  REACT_APP_GOOGLE_BOOKS_API_KEY
} from "react-native-dotenv";

import { axios } from "../../config/axios";

export const search = term => async dispatch => {
  dispatch(searchBooks.start());
  try {
    delete Axios.defaults.headers["Authorization"];
    const {
      data: { items: books }
    } = await Axios.get(
      `https://www.googleapis.com/books/v1/volumes?key=${REACT_APP_GOOGLE_BOOKS_API_KEY}&q=${term}&printType=books`
    );
    dispatch(searchBooks.success(books));
  } catch (error) {
    console.log(error);
    dispatch(searchBooks.failure(error));
  }
};

export const getBooks = () => async dispatch => {
  dispatch(getBooksAction.start());
  try {
    const {
      data: { books }
    } = await axios.get(`/books`);
    dispatch(getBooksAction.success(books));
  } catch (error) {
    dispatch(getBooksAction.failure(error));
  }
};

export const getBook = id => async dispatch => {
  dispatch(getBookAction.start());
  try {
    delete Axios.defaults.headers["Authorization"];
    const { data } = await Axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${REACT_APP_GOOGLE_BOOKS_API_KEY}`
    );
    dispatch(getBookAction.success(data));
  } catch (error) {
    dispatch(getBookAction.failure(error));
  }
};

export const addOrUpdateBook = book => async dispatch => {
  dispatch(addBookAction.start());
  try {
    const {
      data: { book: newBook }
    } = await axios.put(`${REACT_APP_SERVER_API_URL}/books`, book);
    dispatch(addBookAction.success(newBook));
  } catch (error) {
    dispatch(addBookAction.failure("error"));
  }
};

export const checkBook = id => async dispatch => {
  dispatch(checkBookAction.start());
  try {
    const {
      data: { bookStatus }
    } = await axios.get(`${REACT_APP_SERVER_API_URL}/books/exists/${id}`);
    dispatch(checkBookAction.success(bookStatus));
  } catch (error) {
    console.log(error);
    dispatch(checkBookAction.failure("error"));
  }
};

export const deleteBook = id => async dispatch => {
  dispatch(deleteBookAction.start());
  try {
    await axios.delete(`${REACT_APP_SERVER_API_URL}/books/${id}`);
    dispatch(deleteBookAction.success(id));
  } catch (error) {
    dispatch(deleteBookAction.failure(error.response.data));
  }
};

export const clearSearch = () => dispatch => {
  dispatch({
    type: CLEAR_SEARCH
  });
};
