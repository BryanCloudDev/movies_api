import { Router } from 'express'
import { createMovie, deleteMovie, getAllMovies, getLikeCountForMovies, updateMovie } from '../controllers/movie'
import { body, param } from 'express-validator'
import Roles from '../dto/enums/roles'
import { validateJWT, validateRole, validateFields, validateIdMovie, validateLikedMovie } from '../middlewares'
import { likeAMovie, unlikeAMovie } from '../controllers/likedMovie'

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
    validateIdMovie,
    validateFields
  ],
  updateMovie
)

movieRouter.delete('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    validateIdMovie,
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

movieRouter.post('/like',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER]),
    body('id', 'The id of the movie is mandatory').notEmpty(),
    body('id').isNumeric(),
    validateIdMovie,
    validateFields
  ],
  likeAMovie
)

movieRouter.delete('/like/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER]),
    param('id', 'The id of the movie is mandatory').notEmpty(),
    param('id').isNumeric(),
    validateFields,
    validateIdMovie,
    validateLikedMovie
  ],
  unlikeAMovie
)

movieRouter.get('/like/count',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER])
  ],
  getLikeCountForMovies
)

export default movieRouter
