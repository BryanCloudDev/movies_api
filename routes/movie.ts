import { Roles } from '../dto'
import { Router } from 'express'
import { body, param } from 'express-validator'
import { createMovie, deleteMovie, getAllMovies, getLikeCountForMovies, likeAMovie, unlikeAMovie, updateMovie } from '../controllers'
import { validateFields, validateIdMovie, validateJWT, validateLikedMovieonCreate, validateLikedMovieonDelete, validateRole, validateStatus } from '../middlewares'

const movieRouter = Router()

movieRouter.get('/',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER])
  ],
  getAllMovies
)

movieRouter.get('/like/count',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER])
  ],
  getLikeCountForMovies
)

movieRouter.delete('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    validateFields,
    validateIdMovie
  ],
  deleteMovie
)

movieRouter.delete('/like/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER]),
    param('id', 'The id of the movie is mandatory').notEmpty(),
    param('id').isNumeric(),
    validateFields,
    validateIdMovie,
    validateLikedMovieonDelete
  ],
  unlikeAMovie
)

movieRouter.patch('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    validateFields,
    validateIdMovie,
    validateStatus
  ],
  updateMovie
)

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

movieRouter.post('/like',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER]),
    body('id', 'The id of the movie is mandatory').notEmpty(),
    body('id').isNumeric(),
    validateIdMovie,
    validateFields,
    validateLikedMovieonCreate
  ],
  likeAMovie
)

export default movieRouter
