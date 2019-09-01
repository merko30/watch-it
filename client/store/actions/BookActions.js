import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";

import createAction from "../utils/createAction";

export const searchBooks = createAction("SEARCH_BOOKS");
export const getBooksAction = createAction("GET_BOOKS");
export const getBookAction = createAction("GET_BOOK");
export const addBookAction = createAction("ADD_BOOK");
export const changeStatusAction = createAction("CHANGE_STATUS");
export const deleteBookAction = createAction("DELETE_BOOK");

export const CLEAR_SEARCH = "CLEAR_SEARCH";

import {
  REACT_APP_SERVER_API_URL,
  REACT_APP_GOOGLE_BOOKS_API_KEY
} from "react-native-dotenv";

export const search = term => dispatch => {
  dispatch(searchBooks.start());
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${term}&printType=books&key=${REACT_APP_GOOGLE_BOOKS_API_KEY}`
  )
    .then(response => response.json())
    .then(json => {
      dispatch(searchBooks.success(json.items));
    });
};

export const getBooks = () => async dispatch => {
  dispatch(getBooksAction.start());
  try {
    const response = await Axios.get(`${REACT_APP_SERVER_API_URL}/books`);
    const json = await response.data;
    if (response.status == 200) {
      dispatch(getBooksAction.success(json.books));
    } else {
      dispatch(getBooksAction.failure(json));
    }
  } catch (error) {
    dispatch(getBooksAction.failure(error));
  }
};

export const getBook = id => async dispatch => {
  dispatch(getBookAction.start());
  try {
    delete Axios.defaults.headers["Authorization"];
    const response = await Axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}?key=${REACT_APP_GOOGLE_BOOKS_API_KEY}`
    );
    const json = await response.data;
    dispatch(getBookAction.success(json));
    const token = await AsyncStorage.getItem("token");
    Axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  } catch (error) {
    dispatch(getBookAction.failure(error));
  }
};

export const addBook = book => async dispatch => {
  dispatch(addBookAction.start());

  try {
    const response = await Axios.post(
      `${REACT_APP_SERVER_API_URL}/books`,
      JSON.stringify(book)
    );
    const json = await response.data;
    dispatch(addBookAction.success(json));
  } catch (error) {
    dispatch(addBookAction.failure(error.response.data));
  }
};

export const deleteBook = id => async dispatch => {
  dispatch(deleteBookAction.start());
  try {
    const response = await Axios.delete(
      `${REACT_APP_SERVER_API_URL}/books/${id}`
    );
    dispatch(deleteBookAction.success(id));
  } catch (error) {
    dispatch(deleteBookAction.failure(error.response.data));
  }
};

export const changeStatus = (id, status) => async dispatch => {
  dispatch(changeStatusAction.start());
  try {
    const response = await Axios.put(
      `${REACT_APP_SERVER_API_URL}/books/${id}`,
      { status }
    );
    const json = await response.data;
    if (response.status == 200) {
      dispatch(changeStatusAction.success(json));
    } else {
      dispatch(changeStatusAction.failure(json));
    }
  } catch (error) {
    dispatch(changeStatusAction.failure(error));
  }
};

export const clearSearch = () => dispatch => {
  dispatch({
    type: CLEAR_SEARCH
  });
};
