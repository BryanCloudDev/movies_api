import { Router } from 'express'
import { createMovie, deleteMovie, updateMovie } from '../controllers/movie'
import { param } from 'express-validator'
import { validateFields } from '../middlewares/validateFields'
import { validateJWT } from '../middlewares/validateJWT'
import validateRole from '../middlewares/validateRole'
import Roles from '../dto/enums/roles'

const movieRouter = Router()

movieRouter.post('/',
  [
    validateJWT,
    validateRole([Roles.ADMIN])
  ],
  createMovie
)

movieRouter.patch('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    validateFields
  ],
  updateMovie
)

movieRouter.delete('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    validateFields
  ],
  deleteMovie
)

export default movieRouter
