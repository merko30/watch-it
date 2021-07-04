import {axios} from '../config/axios';
// import {Movie} from '../types/Movie';

export interface GetBooksParams {
  page?: number;
  status?: string;
}

const API_URL = '/movies';

export const getAll = async () => {
  let url = new URL(API_URL);

  // if (params) {
  //   Object.entries(params).forEach(([key, value]) =>
  //     url.searchParams.append(key, value),
  //   );
  // }

  return await axios.get(url.href);
};

export const put = async () => {
  // TODO: add book
  return await axios.put(API_URL);
};

export const checkStatus = async (id: string) => {
  return await axios.get(`${API_URL}/status/${id}`);
};

export const remove = async (id: string) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const searchMovies = async (term: string) => {
  return await axios.get(`${API_URL}/search/${term}`);
};

export const getSingleMovie = async (id: string) => {
  return await axios.get(`${API_URL}/${id}`);
};
