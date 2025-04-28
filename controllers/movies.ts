import { RequestHandler } from 'express'
import { eq } from 'drizzle-orm'

import { db } from '../db'
import { movies as moviesTable, statusEnum } from '../db/schema'

const getAll: RequestHandler = async (req, res, next) => {
  const { page, limit } = req.query || {}
  const pageNumber = Number(page) || 1
  const limitNumber = Number(limit) || 20
  const offset = (pageNumber - 1) * limitNumber
  const statusParam = statusEnum.enumValues.find(
    (status) => status === req.query.status
  )
  try {
    const movies = await db
      .select()
      .from(moviesTable)
      .limit(limitNumber)
      .offset(offset)
      .where(statusParam ? eq(moviesTable.status, statusParam) : undefined)
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

const insertOrUpdate: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.auth!
    console.log(req.body)

    const [movie] = await db
      .insert(moviesTable)
      .values({ userId, ...req.body })
      .onConflictDoUpdate({
        target: moviesTable.tmdbId,
        set: {
          status: req.body.status
        }
      })
      .returning()
    res.json({ movie })
  } catch (error) {
    next(error)
  }
}

const getOne: RequestHandler = async (req, res, next) => {
  try {
    const [movie] = await db
      .select()
      .from(moviesTable)
      .where(eq(moviesTable.tmdbId, parseInt(req.params.id)))
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' })
    } else {
      res.json({ movie })
    }
  } catch (error) {
    next(error)
  }
}

const remove: RequestHandler = async (req, res, next) => {
  try {
    const [movie] = await db
      .delete(moviesTable)
      .where(eq(moviesTable.id, parseInt(req.params.id)))
      .returning()

    if (!movie) {
      res.status(404).json({ message: 'Movie not found' })
    }

    res.json({
      message: 'Movie deleted successfully'
    })
  } catch (error) {
    next(error)
  }
}

const getTMDBMovie: RequestHandler = async (req, res, next) => {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_BASE_URL}/${req.params.type}/${req.params.id}?api_key=${process.env.TMDB_API_KEY}`
    )

    const movie = await response.json()

    if (!movie) {
      res.status(404).json({ message: 'Movie not found' })
    }

    res.json({ volume: movie })
  } catch (error) {
    next(error)
  }
}

const search: RequestHandler = async (req, res, next) => {
  try {
    const response = await fetch(
      `${process.env.TMDB_API_BASE_URL}/search/multi?query=${req.params.term}&api_key=${process.env.TMDB_API_KEY}`
    )

    const { results } = await response.json()

    res.json({ results })
  } catch (error) {
    next(error)
  }
}

export { getAll, insertOrUpdate, remove, getOne, search, getTMDBMovie }
