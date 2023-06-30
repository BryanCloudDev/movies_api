import { body } from 'express-validator'
import { type IUserRequest } from '../../dto/user/IUserRequest'
import { type Role, type User } from '../../models'
import { userRepository } from '../../repositories'
import { encrypt } from '../auth'

const existsUserById = async (id: number): Promise<void> => {
  const user = await getUserbyIdService(id)
  if (user === null) throw new Error(`The user with the id ${id} does not exist`)
}

const getUserbyIdService = async (id: number): Promise<User | null> => {
  const user = await userRepository.findOne({ where: { id } })
  return user
}

const createUserInstanceService = async (userRequest: IUserRequest, role: Role): Promise<User> => {
  userRequest.password = await encrypt(userRequest.password)
  const user = userRepository.create({ ...userRequest, role })
  return user
}

const createUserService = async (user: User): Promise<User> => {
  const createdUser = await userRepository.save(user)
  return createdUser
}

const emailExists = async (email: string): Promise<void> => {
  const user = await userRepository.findOne({ where: { email } })
  if (user !== null) throw new Error(`The email ${email} is already registered in DB`)
}

const userValidationRules = [
  body('email', 'The email is not valid').isEmail().trim().custom(emailExists),
  body('firstName', 'The first name is mandatory').not().isEmpty().trim(),
  body('lastName', 'The last name is mandatory').not().isEmpty().trim(),
  body('password', 'The password is mandatory and must have at least 6 characters').isLength({ min: 6 }).trim(),
  body('birthDate', 'The birthdate is mandatory').not().isEmpty()
]

export {
  existsUserById,
  getUserbyIdService,
  createUserInstanceService,
  createUserService,
  emailExists,
  userValidationRules
}
