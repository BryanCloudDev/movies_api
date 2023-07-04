import { Router } from 'express'
import { login } from '../controllers'
import { body } from 'express-validator'
import { validateFields } from '../middlewares'

const authRouter = Router()

/**
 * @swagger
 *
 * /login:
 *  post:
 *    tags:
 *    - Login
 *    summary: Login for users.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/LoginCredentials'
 *    responses:
 *      200:
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BearerToken'
 *      400:
 *        description: Bad request
 *        content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailedLogin'
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
authRouter.post('/',
  [
    body('email', 'The email address is not valid').isEmail().trim(),
    body('password', 'Password is required').notEmpty().trim(),
    validateFields
  ],
  login
)

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginCredentials:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *     BearerToken:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: Bearer Token used for authentication
 *     FailedLogin:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Email or passowrd incorrect
 */

export default authRouter
