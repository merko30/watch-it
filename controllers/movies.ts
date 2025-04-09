// import axios from "axios";
import { RequestHandler } from 'express'
import { db } from '../db'
import { movies as moviesTable } from '../db/schema'

const getAll: RequestHandler = async (req, res, next) => {
  const { page, limit } = req.query || {}
  const pageNumber = Number(page) || 1
  const limitNumber = Number(limit) || 10
  const offset = (pageNumber - 1) * limitNumber
  try {
    const movies = await db
      .select()
      .from(moviesTable)
      .limit(limitNumber)
      .offset(offset)
    const totalMovies = await db.$count(moviesTable)
    const totalPages = Math.ceil(totalMovies / limitNumber)
    res.json({
      movies,
      meta: {
        page: pageNumber,
        limit: limitNumber,
        totalPages,
        totalMovies
      }
    })
  } catch (error) {
    next(error)
  }
}

const create: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.auth!
    const movie = await db
      .insert(moviesTable)
      .values({ userId, ...req.body })
      .returning()
    res.json({ movie })
  } catch (error) {
    next(error)
  }
}

const checkMovie: RequestHandler = async (req, res, next) => {
  try {
    // const movie = await Movie.findOne({
    //   id: req.params.id,
    //   user: req.user._id,
    // });
    // if (movie) {
    //   res.json({ movieStatus: movie.status });
    // } else {
    res.json({ movieStatus: null })
    // }
  } catch (error) {
    next(error)
  }
}

const remove: RequestHandler = async (req, res, next) => {
  try {
    // await Movie.findOneAndDelete({ id: req.params.id });
    res.json({ ok: true })
  } catch (error) {
    next(error)
  }
}

const getSingleMovie: RequestHandler = async (req, res, next) => {
  try {
    // const response = await axios.get(
    //   `${process.env.TMDB_API_BASE_URL}/${req.params.type}/${req.params.id}?api_key=${process.env.TMDB_API_KEY}`,

    // );

    // const volume = await response.data

    res.json({ volume: {} })
  } catch (error) {
    next(error)
  }
}

const search: RequestHandler = async (req, res, next) => {
  try {
    // const response = await axios.get(
    //   `${process.env.TMDB_API_BASE_URL}/search/multi?query=${req.params.term}&api_key=${process.env.TMDB_API_KEY}`,

    // );

    // const { results } = response.data;

    res.json({ results: [] })
  } catch (error) {
    next(error)
  }
}

export { getAll, create, remove, checkMovie, search, getSingleMovie }
