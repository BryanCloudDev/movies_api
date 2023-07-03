import { Roles } from '../dto'
import { Router } from 'express'
import { body, param } from 'express-validator'
import { createRole, deleteRole, getAllRoles } from '../controllers'
import { validateFields, validateJWT, validateRole, validateRoleId } from '../middlewares'
import validateRoleOnDelete from '../middlewares/role/validateRole'

const roleRouter = Router()

roleRouter.delete('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    validateFields,
    validateRoleId,
    validateRoleOnDelete
  ],
  deleteRole
)

roleRouter.get('/',
  [
    validateJWT,
    validateRole([Roles.ADMIN])
  ],
  getAllRoles
)

roleRouter.post('/',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    body('name').notEmpty().trim(),
    validateFields
  ],
  createRole
)

export default roleRouter
