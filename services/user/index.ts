import { type User } from '../../models'
import { userRepository } from '../../repositories'

const existsUserById = (id: number): void => {
  const user = getUserbyIdService(id)
  if (user === null) throw new Error(`The user with the id ${id} does not exist`)
}

const getUserbyIdService = async (id: number): Promise<User | null> => {
  const user = await userRepository.findOne({ where: { id } })
  return user
}

const emailExists = async (email: string): Promise<void> => {
  const user = await userRepository.findOne({ where: { email } })
  if (user !== null) throw new Error(`The email ${email} is already registered in DB`)
}

export {
  existsUserById,
  getUserbyIdService,
  emailExists
}
