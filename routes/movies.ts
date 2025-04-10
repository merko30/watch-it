import express from 'express'
const router = express.Router()

import {
  getAll,
  insertOrUpdate,
  remove,
  getOne,
  search,
  getTMDBMovie
} from '../controllers/movies'

router.route('/').get(getAll).post(insertOrUpdate)

router.get('/search/:term', search)

router.route('/:id').get(getOne).delete(remove)

router.get('/:type/:id', getTMDBMovie)

export default router
