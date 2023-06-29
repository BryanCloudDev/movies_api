import { type User } from '../../models'
import { userRepository } from '../../repositories'

const existsUserById = async (id: number): Promise<void> => {
  const user = getUserbyIdService(id)
  if (user !== null) throw new Error(`The user with the id ${id} does not exist`)
}

const getUserbyIdService = async (id: number): Promise<User | null> => {
  const user = await userRepository.findOne({ where: { id } })
  return user
}

export {
  existsUserById,
  getUserbyIdService
}
