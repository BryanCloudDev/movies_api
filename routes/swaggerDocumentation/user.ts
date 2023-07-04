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
 *              $ref: '#/components/schemas/UserResponseArray'
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
 *              $ref: '#/components/schemas/Filter'
 *    responses:
 *      200:
 *        description: No content
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponseArray'
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
 * /users/{id}/movies:
 *  get:
 *    tags:
 *    - User
 *    summary: Get all movies liked by user id.
 *    parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       description: User id to be searched.
 *       schema:
 *         type: integer
 *         format: int64
 *         minimum: 1
 *     - in: query
 *       name: filter
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Filter'
 *    responses:
 *      200:
 *        description: No content
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
 * /users/{id}:
 *  patch:
 *    tags:
 *    - User
 *    summary: Edit user by id.
 *    parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       description: User id to be searched.
 *       schema:
 *         type: integer
 *         format: int64
 *         minimum: 1
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserPatch'
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
 * /users/:
 *  post:
 *    tags:
 *    - User
 *    summary: Register for regular user.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SuccessMessage'
 *      422:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UnprocessableEntity'
 */

/**
 * @swagger
 *
 * /users/admin:
 *  post:
 *    tags:
 *    - User
 *    summary: Register for admin user.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserAdmin'
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SuccessMessage'
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
 *      422:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UnprocessableEntity'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserBase:
 *         type: object
 *         properties:
 *           firstName:
 *             type: string
 *           lastName:
 *             type: string
 *           email:
 *             type: string
 *             format: email
 *           birthDate:
 *             type: string
 *             format: date-time
 *           profilePhoto:
 *             type: string
 *             format: uri
 *     User:
 *       allOf:
 *         - $ref: '#/components/schemas/UserBase'
 *         - type: object
 *           properties:
 *             password:
 *               type: string
 *     UserAdmin:
 *       allOf:
 *         - $ref: '#/components/schemas/User'
 *         - type: object
 *           properties:
 *             role:
 *               type: integer
 *               example: 1
 *     UserPatch:
 *       allOf:
 *         - $ref: '#/components/schemas/UserBase'
 *         - type: object
 *           properties:
 *             roleId:
 *               type: integer
 *             status:
 *               type: integer
 *     UserResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/UserBase'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             createdOn:
 *               type: string
 *               format: date-time
 *               example: "2023-07-02T08:04:10.000Z"
 *             status:
 *               type: integer
 *               example: 1
 *     UserResponseAdmin:
 *       allOf:
 *         - $ref: '#/components/schemas/UserResponse'
 *         - type: object
 *           properties:
 *             updatedOn:
 *               type: string
 *               format: date-time
 *               example: "2023-07-04T01:09:01.000Z"
 *             lastLogin:
 *               type: string
 *               format: date-time
 *               example: "2023-07-04T01:09:02.000Z"
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
 *     FilterResponseUser:
 *       type: object
 *       properties:
 *         response:
 *           $ref: '#/components/schemas/UserArray'
 *         meta:
 *           $ref: '#/components/schemas/MetaSchema'
 *         links:
 *           $ref: '#/components/schemas/LinksSchema'
 *       required:
 *         - response
 *         - meta
 *         - links
 *     UserResponseArray:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/UserResponseAdmin'
 */
