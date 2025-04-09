import express from 'express'
const router = express.Router()

import {
  getAll,
  create,
  remove,
  checkMovie,
  search,
  getSingleMovie
} from '../controllers/movies'

router.get('/search/:term', search)

router.get('/', getAll)

router.post('/', create)

router.get('/exists/:id', checkMovie)

router.get('/:type/:id', getSingleMovie)

router.delete('/:id', remove)

export default router
