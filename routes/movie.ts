import { Router } from 'express'
import { createMovie, deleteMovie, updateMovie } from '../controllers/movie'
import { param } from 'express-validator'
import { validateFields } from '../middlewares/validateFields'

const movieRouter = Router()

movieRouter.post('/',
  [

  ],
  createMovie
)

movieRouter.patch('/:id',
  [
    param('id').isNumeric(),
    validateFields
  ],
  updateMovie
)

movieRouter.delete('/:id',
  [
    param('id').isNumeric(),
    validateFields
  ],
  deleteMovie
)

export default movieRouter
