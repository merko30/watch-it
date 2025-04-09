import express from 'express'
const router = express.Router()

import {
  getAll,
  create,
  remove,
  getOne,
  search,
  getTMDBMovie
} from '../controllers/movies'

router.route('/').get(getAll).post(create)

router.get('/search/:term', search)

router.route('/:id').get(getOne).delete(remove)

router.get('/:type/:id', getTMDBMovie)

export default router
