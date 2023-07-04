import { Roles } from '../dto'
import { Router } from 'express'
import { body, param } from 'express-validator'
import { createUser, deleteUser, getAllUsers, getMoviesLikedByUser, getUserById, getUserProfile, updateUser } from '../controllers'
import { checkIfRoleIsSent, userValidationRules } from '../services'
import { validateEmailInChange, validateFields, validateJWT, validateQuery, validateRole, validateRoleId, validateStatus, validateUserId, validateUserOnDelete } from '../middlewares'

const userRouter = Router()

/**
 * @swagger
 *
 * /users/{id}:
 *  delete:
 *    tags:
 *    - User
 *    summary: Deletes a user by id.
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: User id to be deleted.
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
 *              $ref: '#/components/schemas/UserAlreadyInactive'
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
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 */
userRouter.delete('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id', 'id must be a numeric value').isNumeric(),
    validateFields,
    validateUserId,
    validateUserOnDelete
  ],
  deleteUser
)

/**
 * @swagger
 *
 * /users/profile:
 *  get:
 *    tags:
 *    - User
 *    summary: Get user profile using bearer token.
 *    responses:
 *      200:
 *        description: No content
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
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
userRouter.get('/profile',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER])
  ],
  getUserProfile
)

/**
 * @swagger
 *
 * /users/{id}:
 *  get:
 *    tags:
 *    - User
 *    summary: Get a user by id.
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: User id to be retrieved.
 *        schema:
 *          type: integer
 *          format: int64
 *          minimum: 1
 *    responses:
 *      200:
 *        description: Success response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponseAdmin'
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
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserNotFound'
 */
userRouter.get('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    validateUserId,
    validateFields
  ],
  getUserById
)

/**
 * @swagger
 *
 * /users:
 *  get:
 *    tags:
 *    - User
 *    summary: Get all users.
 *    parameters:
 *      - in: query
 *        name: filter
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FilterRespose'
 *    responses:
 *      200:
 *        description: No content
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *              - $ref: '#/components/schemas/UserResponseAdminArray'
 *              - $ref: '#/components/schemas/FilterResponseUser'
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
userRouter.get('/',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    validateQuery
  ],
  getAllUsers
)

userRouter.get('/:id/movies',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    validateUserId,
    validateFields,
    validateQuery
  ],
  getMoviesLikedByUser
)

userRouter.patch('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    validateUserId,
    validateEmailInChange,
    body('roleId').isNumeric(),
    validateRoleId,
    validateFields,
    validateStatus
  ],
  updateUser
)

userRouter.post('/',
  [
    ...userValidationRules,
    body('roleId').custom(checkIfRoleIsSent),
    validateFields,
    validateRoleId
  ],
  createUser
)

userRouter.post('/admin',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    ...userValidationRules,
    body('roleId').isNumeric(),
    validateRoleId,
    validateFields
  ],
  createUser
)

/**
 * @swagger
 * components:
 *   schemas:
 *     UserDeleted:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: User has been deleted
 *     UserBanned:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: User has been banned
 *     UserNotFound:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: The user the id 5 does not exist
 *     UserUnauthorized:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: You are not authorized
 *     UserAlreadyInactive:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: The user has been marked already as inactive
 *     UnprocessableEntity:
 *        type: object
 *        properties:
 *          errors:
 *            type: array
 *            items:
 *              type: object
 *              properties:
 *                type:
 *                  type: string
 *                  example: field
 *                value:
 *                  type: string
 *                  example: a string
 *                msg:
 *                  type: string
 *                  example: id must be a numeric value
 *                path:
 *                  type: string
 *                  example: id
 *                location:
 *                  type: string
 *                  example: params
 *     UserResponseAdmin:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 18
 *         createdOn:
 *           type: string
 *           format: date-time
 *           example: "2023-07-02T08:04:10.000Z"
 *         updatedOn:
 *           type: string
 *           format: date-time
 *           example: "2023-07-04T01:09:01.000Z"
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           example: "example@example.com"
 *         birthDate:
 *           type: string
 *           format: date-time
 *           example: "2023-06-29T08:28:06.000Z"
 *         status:
 *           type: integer
 *           example: 1
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           example: "2023-07-04T01:09:02.000Z"
 *         profilePhoto:
 *           type: string
 *           format: uri
 *           example: "https://avatars.githubusercontent.com/u/2693364"
 *     UserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 18
 *        createdOn:
 *          type: string
 *          format: date-time
 *          example: "2023-07-02T08:04:10.000Z"
 *        firstName:
 *          type: string
 *          example: "John"
 *        lastName:
 *          type: string
 *          example: "Doe"
 *        email:
 *          type: string
 *          example: "example@example.com"
 *        birthDate:
 *          type: string
 *          format: date-time
 *          example: "2023-06-29T08:28:06.000Z"
 *        status:
 *          type: integer
 *          example: 1
 *        profilePhoto:
 *          type: string
 *          format: uri
 *          example: "https://avatars.githubusercontent.com/u/2693364"
 *        roleId:
 *          type: integer
 *          example: 1
 *     PaginationError:
 *       type: string
 *       example: In order to paginate you need to send at least limit and offset
 *     MetaSchema:
 *       type: object
 *       properties:
 *         itemCount:
 *           type: integer
 *         totalPages:
 *           type: integer
 *         currentPage:
 *           type: integer
 *     LinksSchema:
 *       type: object
 *       properties:
 *         first:
 *           type: string
 *           format: uri
 *         previous:
 *           type: string
 *           format: uri
 *           nullable: true
 *         next:
 *           type: string
 *           format: uri
 *           nullable: true
 *         last:
 *           type: string
 *           format: uri
 *     FilterResponseUser:
 *       type: object
 *       properties:
 *         response:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserResponseAdmin'
 *         meta:
 *           $ref: '#/components/schemas/MetaSchema'
 *         links:
 *           $ref: '#/components/schemas/LinksSchema'
 *       required:
 *         - response
 *         - meta
 *         - links
 *     UserResponseAdminArray:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/UserResponseAdmin'
 */

export default userRouter
