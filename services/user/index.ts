import { type IUserRequest } from '../../dto/user/IUserRequest'
import { User } from '../../models'
import { userRepository } from '../../repositories'
import { encrypt } from '../auth'
import { getRoleByIdService } from '../role'

const existsUserById = (id: number): void => {
  const user = getUserbyIdService(id)
  if (user === null) throw new Error(`The user with the id ${id} does not exist`)
}

const getUserbyIdService = async (id: number): Promise<User | null> => {
  const user = await userRepository.findOne({ where: { id } })
  return user
}

const createUserInstanceService = async (userRequest: IUserRequest, roleId: number): Promise<User> => {
  const role = await getRoleByIdService(roleId)

  if (role !== null) {
    userRequest.password = await encrypt(userRequest.password)
    const user = userRepository.create({ ...userRequest, role })
    return user
  }
  return new User()
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
