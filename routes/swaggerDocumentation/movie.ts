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

/**
 * @swagger
 *
 * /movies:
 *  get:
 *    tags:
 *    - Movie
 *    summary: Get all movies.
 *    parameters:
 *      - name: filter
 *        in: query
 *        required: false
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Filter'
 *    responses:
 *      200:
 *        description: List of movies
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/MovieResponseArray'
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

/**
 * @swagger
 *
 * /movies/like:
 *  post:
 *    tags:
 *    - Movie
 *    summary: Create movie like.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Movielike'
 *    responses:
 *      200:
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
 *     Movielike:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 */
