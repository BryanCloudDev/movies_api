import { Router } from 'express'
import { createMovie } from '../controllers/movie'

const movieRouter = Router()

movieRouter.post('/',
  [

  ],
  createMovie
)

export default movieRouter
