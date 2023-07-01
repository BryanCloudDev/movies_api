import { Router } from 'express'
import { createMovie, deleteMovie, getAllMovies, updateMovie } from '../controllers/movie'
import { body, param } from 'express-validator'
import { validateFields } from '../middlewares/validateFields'
import { validateJWT } from '../middlewares/validateJWT'
import validateRole from '../middlewares/validateRole'
import Roles from '../dto/enums/roles'
import { existsMovieById } from '../services/movie'

const movieRouter = Router()

movieRouter.post('/',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    body('countryOrigin', 'The country of origin is mandatory').notEmpty().trim(),
    body('description', 'The description is mandatory').notEmpty().trim(),
    body('director', 'The director is mandatory').notEmpty().trim(),
    body('duration', 'The duration must be an integer').isInt(),
    body('genre', 'The genre is mandatory').notEmpty().trim(),
    body('language', 'The language is mandatory').notEmpty().trim(),
    body('name', 'The name is mandatory').notEmpty().trim(),
    body('poster', 'The poster must be a valid URL').isURL().trim(),
    body('rating', 'The rating must be a float').isFloat(),
    body('releaseDate', 'The release date must be a valid date').isISO8601(),
    validateFields
  ],
  createMovie
)

movieRouter.patch('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    param('id').custom(existsMovieById),
    validateFields
  ],
  updateMovie
)

movieRouter.delete('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    param('id').custom(existsMovieById),
    validateFields
  ],
  deleteMovie
)

movieRouter.get('/',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER])
  ],
  getAllMovies
)

export default movieRouter
