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
  try {
    const user = await userRepository.findOne({ where: { email } })
    if (user !== null) throw new Error(`The email ${email} is already registered in DB`)
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, 'Error in check if email exists service').message)
  }
}

const existsUserById = async (id: number): Promise<void> => {
  try {
    const user = await getUserbyIdService(id)
    if (user === null) throw new Error(`The user with the id ${id} does not exist`)
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, 'Error in exists user by id service').message)
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

const userValidationRules = [
  body('email', 'The email is not valid').isEmail().trim().custom(emailExists),
  body('firstName', 'The first name is mandatory').not().isEmpty().trim(),
  body('lastName', 'The last name is mandatory').not().isEmpty().trim(),
  body('password', 'The password is mandatory and must have at least 6 characters').isLength({ min: 6 }).trim(),
  body('birthDate', 'The birthdate is mandatory').not().isEmpty()
]

export {
  checkIfRoleIsSent,
  createUserInstanceService,
  createUserService,
  emailExists,
  existsUserById,
  getUserbyIdService,
  userValidationRules
}
