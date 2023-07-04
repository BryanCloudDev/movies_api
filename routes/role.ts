import { Roles } from '../dto'
import { Router } from 'express'
import { body, param } from 'express-validator'
import { createRole, deleteRole, getAllRoles } from '../controllers'
import { validateFields, validateJWT, validateQuery, validateRole, validateRoleId } from '../middlewares'

const roleRouter = Router()

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

export default roleRouter
