import { body } from 'express-validator'
import { type IUserRequest } from '../../dto'
import { type Role, type User } from '../../models'
import { encrypt } from '../auth'
import { errorMessageHandler } from '../'
import { userRepository } from '../../repositories'

const checkIfRoleIsSent = async (role: number): Promise<void> => {
  if (role !== undefined) throw new Error('You are not allowed to perform this action')
}

const createUserInstanceService = async (userRequest: IUserRequest, role: Role): Promise<User> => {
  try {
    userRequest.password = await encrypt(userRequest.password)
    const user = userRepository.create({ ...userRequest, role })

    return user
  } catch (error) {
    throw new Error(errorMessageHandler(error, 'Error in create user instance').message)
  }
}

const createUserService = async (user: User): Promise<User> => {
  try {
    const createdUser = await userRepository.save(user)
    return createdUser
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, 'Error in create user service').message)
  }
}

const emailExists = async (email: string): Promise<void> => {
  const user = await userRepository.findOne({ where: { email } })
  if (user !== null) {
    throw new Error(`The email ${email} is already registered in DB`)
  }
}

const getUserbyIdService = async (id: number): Promise<User | null> => {
  try {
    const user = await userRepository.findOne({ where: { id } })
    return user
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, 'Error in get user by id service').message)
  }
}

// const getUserResponseFiltered = (users: User[]): IUserResponse[] => {
//   const usersFiltered = users.map(user => {
//     const { role, ...userResponse } = user

//     const result: IUserResponse = {
//       ...userResponse,
//       roleId: role.id
//     }

//     return result
//   })

//   return usersFiltered
// }

const userValidationRules = [
  body('email', 'The email is not valid').isEmail().trim().custom(emailExists),
  body('firstName', 'The first name is mandatory').not().isEmpty().isString().isLength({ max: 30 }).trim(),
  body('lastName', 'The last name is mandatory').not().isEmpty().isString().isLength({ max: 30 }).trim(),
  body('password', 'The password is mandatory and must have at least 6 characters').isLength({ min: 6 }).trim(),
  body('birthDate', 'The birthdate is mandatory').not().isEmpty().isISO8601(),
  body('profilePhoto', 'The profilePhoto must be a valid URL').optional().isURL().trim()
]

const userOptionsValidations = [
  body('firstName', 'The first name must have a valid value').optional().not().isEmpty().isString().trim(),
  body('lastName', 'The last name must have a valid value').optional().not().isEmpty().isString().trim(),
  body('email', 'The email must have a valid value').optional().not().isEmpty().isEmail().trim(),
  body('birthDate', 'The birthdate must have a valid value').optional().not().isEmpty().isISO8601().trim(),
  body('profilePhoto', 'The profile photo must have a valid value').optional().isURL().trim(),
  body('roleId', 'The role id must have a valid value').optional().not().isEmpty().isInt().trim(),
  body('status', 'The status must have a valid value').optional().not().isEmpty().isInt().trim()
]

export {
  checkIfRoleIsSent,
  createUserInstanceService,
  createUserService,
  emailExists,
  // getUserResponseFiltered,
  getUserbyIdService,
  userValidationRules,
  userOptionsValidations
}
