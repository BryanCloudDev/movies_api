import { Router } from 'express'
import { body, param } from 'express-validator'
import { checkIfRoleIsSent, existsUserById, userValidationRules } from '../services/user'
import { validateEmailInChange, validateFields } from '../middlewares/validateFields'
import { createUser, getUserbyId } from '../controllers'
import { isRolevalid } from '../services/role'
import { deleteUser, getAllUsers, getMoviesLikedByUser, getUserProfile, updateUser } from '../controllers/user'
import { validateJWT } from '../middlewares/validateJWT'
import validateRole from '../middlewares/validateRole'
import Roles from '../dto/enums/roles'
import validateQuery from '../middlewares/validateQuery'

const userRouter = Router()

userRouter.get('/profile',
  [
    validateJWT,
    validateRole([Roles.ADMIN, Roles.USER])
  ], getUserProfile)

userRouter.get('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    param('id').custom(existsUserById),
    validateFields
  ], getUserbyId)

userRouter.post('/',
  [
    ...userValidationRules,
    body('roleId').custom(checkIfRoleIsSent),
    validateFields
  ], createUser)

userRouter.post('/admin',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    ...userValidationRules,
    body('roleId').custom(isRolevalid),
    validateFields
  ], createUser)

userRouter.patch('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    param('id').custom(existsUserById),
    validateEmailInChange,
    body('roleId').custom(isRolevalid),
    validateFields
  ], updateUser)

userRouter.delete('/:id',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    param('id').custom(existsUserById),
    validateFields
  ], deleteUser)

userRouter.get('/',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    validateQuery
  ], getAllUsers)

userRouter.get('/:id/movie',
  [
    validateJWT,
    validateRole([Roles.ADMIN]),
    param('id').isNumeric(),
    param('id').custom(existsUserById),
    validateFields
  ], getMoviesLikedByUser)

export default userRouter
