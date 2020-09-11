import {axios} from '../config/axios';
import {Book} from '../types/Book';

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
  return await axios.get(`${API_URL}/exists/${id}`);
};

export const remove = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const searchBooksByTerm = async (term: string) => {
  return await axios.get(`${API_URL}/search/${term}`);
};

export const getSingleBook = async (id: string) => {
  return await axios.get(`${API_URL}/${id}`);
};
