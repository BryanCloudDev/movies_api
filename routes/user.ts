import { Roles } from '../dto'
import { Router } from 'express'
import { body, param } from 'express-validator'
import { createUser, deleteUser, getAllUsers, getMoviesLikedByUser, getUserById, getUserProfile, updateUser } from '../controllers'
import { checkIfRoleIsSent, userValidationRules } from '../services'
import { validateEmailInChange, validateFields, validateJWT, validateQuery, validateRole, validateRoleOnCreate, validateStatus, validateUserId, validateUserOnDelete } from '../middlewares'

const userRouter = Router()

userRouter.get('/profile',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER])
  ],
  getUserProfile
)

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
    validateFields
  ],
  getMoviesLikedByUser
)

userRouter.delete('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    validateUserId,
    validateUserOnDelete,
    validateFields
  ],
  deleteUser
)

userRouter.patch('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    validateUserId,
    validateEmailInChange,
    body('roleId').isNumeric(),
    validateRoleOnCreate,
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
    validateRoleOnCreate
  ],
  createUser
)

userRouter.post('/admin',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    ...userValidationRules,
    body('roleId').isNumeric(),
    validateRoleOnCreate,
    validateFields
  ],
  createUser
)

export default userRouter
