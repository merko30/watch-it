import {axios} from '../config/axios';
import {Book} from '../types/Book';
import Axios from 'axios';

export interface GetBooksParams {
  page?: number;
  status?: string;
}

const API_URL = '/books';

export const getAll = async (params: GetBooksParams) => {
  let url = new URL(API_URL);

  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value),
  );

  return await axios.get(url.href);
};

export const put = async (book: Partial<Book>) => {
  return await axios.put(API_URL, book);
};

export const checkStatus = async (id: string) => {
  return await axios.get(`${API_URL}/exits/${id}`);
};

export const remove = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`);
};

const GOOGLE_KEY = 'AIzaSyDaGGtPkgtg3dT4n5jp8ZfKZsT0ETTsHIc';

export const searchBooksByTerm = async (term: string) => {
  delete Axios.defaults.headers['Authorization'];
  return await Axios.get(
    `https://www.googleapis.com/books/v1/volumes?key=${GOOGLE_KEY}&q=${term}&printType=books`,
  );
};

export const getSingleBook = async (id: string) => {
  delete Axios.defaults.headers['Authorization'];
  return await Axios.get(
    `https://www.googleapis.com/books/v1/volumes/${id}?key=${GOOGLE_KEY}`,
  );
};
