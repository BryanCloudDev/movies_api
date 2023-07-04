import { Roles } from '../dto'
import { Router } from 'express'
import { body, param } from 'express-validator'
import { createMovie, deleteMovie, getAllMovies, getLikeCountForMovies, likeAMovie, unlikeAMovie, updateMovie } from '../controllers'
import { validateFields, validateIdMovie, validateJWT, validateLikedMovieonCreate, validateLikedMovieonDelete, validateQuery, validateRole, validateStatus } from '../middlewares'
import { moviePatchValidations, moviePostValidations } from '../services/movie'

const movieRouter = Router()

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

movieRouter.get('/',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER]),
    validateQuery
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

movieRouter.patch('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    ...moviePatchValidations,
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
    ...moviePostValidations,
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
