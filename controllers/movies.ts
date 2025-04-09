// import axios from "axios";
import { RequestHandler } from 'express'

const getAll: RequestHandler = async (req, res, next) => {
  // let query = { user: req.user._id };

  // query = { ...query, ...req.query };

  try {
    const movies: string[] = []
    res.json({ movies })
  } catch (error) {
    next(error)
  }
}

const createOrUpdate: RequestHandler = async (req, res, next) => {
  try {
    // const movie = await Movie.findOneAndUpdate(
    //   { id: req.body.id },
    //   { ...req.body, user: req.user._id },
    //   { upsert: true, new: true }
    // );
    const movie = {}
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

export { getAll, createOrUpdate, remove, checkMovie, search, getSingleMovie }
