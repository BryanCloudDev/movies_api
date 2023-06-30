import { Router } from 'express'
import { body, param } from 'express-validator'
import { emailExists, existsUserById } from '../services/user'
import { validateEmailInChange, validateFields } from '../middlewares/validateFields'
import { createUser, getUserbyId } from '../controllers'
import { isRolevalid } from '../services/role'
import { deleteUser, getAllUsers, getUserProfile, updateUser } from '../controllers/user'
import { validateJWT } from '../middlewares/validateJWT'
import validateRole from '../middlewares/validateRole'
import Roles from '../dto/enums/roles'

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
    body('email', 'The email is not valid').isEmail().trim(),
    body('email').custom(emailExists),
    body('firstName', 'The first name is mandatory').not().isEmpty().trim(),
    body('lastName', 'The last name is mandatory').not().isEmpty().trim(),
    body('password', 'The password is mandatory and more than 6 characters').isLength({ min: 6 }).trim(),
    body('birthDate', 'The birthdate is mandatory').not().isEmpty(),
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
    validateFields
  ], getAllUsers)

export default userRouter
