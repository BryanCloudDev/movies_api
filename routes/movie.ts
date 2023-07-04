import { Roles } from '../dto'
import { Router } from 'express'
import { body, param } from 'express-validator'
import { createMovie, deleteMovie, getAllMovies, getLikeCountForMovies, likeAMovie, unlikeAMovie, updateMovie } from '../controllers'
import { validateFields, validateIdMovie, validateJWT, validateLikedMovieonCreate, validateLikedMovieonDelete, validateQuery, validateRole, validateStatus } from '../middlewares'
import { moviePatchValidations, moviePostValidations } from '../services/movie'

const movieRouter = Router()

/**
 * @swagger
 *
 * /movies/{id}:
 *  delete:
 *    tags:
 *    - Movie
 *    summary: Deletes a movie by id.
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Movie id to be deleted.
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *    responses:
 *      204:
 *        description: No content
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MovieAlreadyInactive'
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *              - $ref: '#/components/schemas/UserDeleted'
 *              - $ref: '#/components/schemas/UserBanned'
 *              - $ref: '#/components/schemas/UserUnauthorized'
 *              - $ref: '#/components/schemas/UnprocessableEntity'
 *      404:
 *        description: Movie not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MovieNotFound'
 *      422:
 *        description: Unprocessable entity
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UnprocessableEntity'
 */
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

/**
 * @swagger
 *
 * /movies/like/{id}:
 *  delete:
 *    tags:
 *    - Movie
 *    summary: Deletes a movie like by id.
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Movie like id to be deleted.
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *    responses:
 *      204:
 *        description: No content
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MovieAlreadyInactive'
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *              - $ref: '#/components/schemas/UserDeleted'
 *              - $ref: '#/components/schemas/UserBanned'
 *              - $ref: '#/components/schemas/UserUnauthorized'
 *              - $ref: '#/components/schemas/UnprocessableEntity'
 *      404:
 *        description: Movie not found
 *        content:
 *          application/json:
 *            schema:
*               $ref: '#/components/schemas/MovieLikeNotFound'
 *      422:
 *        description: Unprocessable entity
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UnprocessableEntity'
 */
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

/**
 * @swagger
 *
 * /movies:
 *  get:
 *    tags:
 *    - Movie
 *    summary: Get all movies.
 *    parameters:
 *      - in: query
 *        name: filter
 *        schema:
 *          $ref: '#/components/schemas/Filter'
 *    responses:
 *      200:
 *        description: List of movies
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MovieArray'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PaginationError'
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *              - $ref: '#/components/schemas/UserDeleted'
 *              - $ref: '#/components/schemas/UserBanned'
 *              - $ref: '#/components/schemas/UserUnauthorized'
 */
movieRouter.get('/',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER]),
    validateQuery
  ],
  getAllMovies
)

/**
 * @swagger
 *
 * /movies/like/count:
 *  get:
 *    tags:
 *    - Movie
 *    summary: Get movie like count.
 *    responses:
 *      200:
 *        description: List of movies with likes
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MovieLikeArray'
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *              - $ref: '#/components/schemas/UserDeleted'
 *              - $ref: '#/components/schemas/UserBanned'
 *              - $ref: '#/components/schemas/UserUnauthorized'
 */
movieRouter.get('/like/count',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER])
  ],
  getLikeCountForMovies
)

/**
 * @swagger
 *
 * /movies/{id}:
 *  patch:
 *    tags:
 *    - Movie
 *    summary: Edit movie by id.
 *    responses:
 *      204:
 *        description: No content
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/StatusError'
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *              - $ref: '#/components/schemas/UserDeleted'
 *              - $ref: '#/components/schemas/UserBanned'
 *              - $ref: '#/components/schemas/UserUnauthorized'
 *      404:
 *        description: Movie not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MovieNotFound'
 *      422:
 *        description: Unprocessable entity
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UnprocessableEntity'
 */
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

/**
 * @swagger
 *
 * /movies:
 *  post:
 *    tags:
 *    - Movie
 *    summary: Create movie.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movie'
 *    responses:
 *      200:
 *        description: No content
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessMessage'
 *      403:
 *        description: Forbidden
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *              - $ref: '#/components/schemas/UserDeleted'
 *              - $ref: '#/components/schemas/UserBanned'
 *              - $ref: '#/components/schemas/UserUnauthorized'
 *      422:
 *        description: Unprocessable entity
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UnprocessableEntity'
 */
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

/**
 * @swagger
 * components:
 *   schemas:
 *     MovieAlreadyInactive:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: The movie has been marked already as inactive
 *     MovieNotFound:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: The movie the id 5 does not exist
 *     MovieLikeNotFound:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: The movie with the id 5 has not received a like from you
 *     MovieLike:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         name:
 *           type: string
 *           example: Interestellar
 *         likes:
 *           type: integer
 *           example: 45
 *     MovieLikeArray:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/MovieLike'
 *     StatusError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Status with id 10 is not valid
 *     Movie:
 *       type: object
 *       properties:
 *         countryOrigin:
 *           type: string
 *         description:
 *           type: string
 *         director:
 *           type: string
 *         duration:
 *           type: integer
 *         genre:
 *           type: string
 *         language:
 *           type: string
 *         name:
 *           type: string
 *         poster:
 *           type: string
 *           format: uri
 *         rating:
 *           type: integer
 *         releaseDate:
 *           type: string
 *           format: date-time
 *     MovieResponse:
 *        allOf:
 *          - $ref: '#/components/schemas/Movie'
 *          - type: object
 *            properties:
 *              id:
 *                type: integer
 *              createdOn:
 *                type: string
 *                format: date-time
 *              updatedOn:
 *                type: string
 *                format: date-time
 *              status:
 *                type: integer
 *     MovieResponseArray:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/MovieResponse'
 *     FilterResponseMovie:
 *       type: object
 *       properties:
 *         response:
 *           $ref: '#/components/schemas/MovieResponseArray'
 *         meta:
 *           $ref: '#/components/schemas/MetaSchema'
 *         links:
 *           $ref: '#/components/schemas/LinksSchema'
 *       required:
 *         - response
 *         - meta
 *         - links
 */

export default movieRouter
