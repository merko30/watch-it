import { Movie } from 'types';
import { axios } from '../config/axios';

export interface GetMoviesParams {
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

export const updateMovie = async (data: Partial<Movie>) =>
  await axios.post(API_URL, data);

export const getMovieOrShow = async (id: number) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const remove = async (id: number) => {
  return await axios.delete(`${API_URL}/${id}`);
};

export const searchMovies = async (term: string) => {
  return await axios.get(`${API_URL}/search/${term}`);
};

export const getSingleMovie = async ({
  id,
  type,
}: {
  id: number;
  type: string;
}) => {
  return await axios.get(`${API_URL}/${type}/${id}`);
};
