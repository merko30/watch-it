import express from 'express'
import ip from 'ip'
import cors from 'cors'
import { expressjwt } from 'express-jwt'
import multer from 'multer'

import routes from './routes/index'

const app = express()

app.use(multer().single('avatar'))
app.use(cors())
// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms")
// );

console.log(ip.address())

const jwtMiddleware = expressjwt({
  secret: process.env.JWT_SECRET!,
  algorithms: ['HS256'],
  requestProperty: 'auth'
}).unless({
  path: [
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/forgot-password',
    '/api/auth/reset-password',
    '/api/movies/search/:term'
  ]
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', jwtMiddleware, routes)

const port = process.env.PORT || 4000

app.listen(port, () => console.log(`App running on port ${port}.`))
