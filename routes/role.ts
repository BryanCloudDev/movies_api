import { Roles } from '../dto'
import { Router } from 'express'
import { body, param } from 'express-validator'
import { createRole, deleteRole, getAllRoles } from '../controllers'
import { validateFields, validateJWT, validateQuery, validateRole, validateRoleId } from '../middlewares'

const roleRouter = Router()

/**
 * @swagger
 *
 * /roles/{id}:
 *  delete:
 *    tags:
 *    - Role
 *    summary: Deletes a role by id.
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
 *              $ref: '#/components/schemas/RoleAlreadyInactive'
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
 *        description: Role not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/RoleNotFound'
 *      422:
 *        description: Unprocessable entity
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UnprocessableEntity'
 */
roleRouter.delete('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    validateFields,
    validateRoleId
  ],
  deleteRole
)

roleRouter.get('/',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    validateQuery
  ],
  getAllRoles
)

roleRouter.post('/',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    body('name').notEmpty().isString().trim(),
    validateFields
  ],
  createRole
)

/**
 * @swagger
 * components:
 *   schemas:
 *     RoleAlreadyInactive:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: The role has been marked already as inactive
 *     RoleNotFound:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: The role the id 5 does not exist
 *     FailedLogin:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Email or passowrd incorrect
 */

export default roleRouter
