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

export {
  existsUserById,
  getUserbyIdService,
  createUserInstanceService,
  createUserService,
  emailExists
}
