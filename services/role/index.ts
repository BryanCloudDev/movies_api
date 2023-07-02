import { type Role } from '../../models'
import { roleRepository } from '../../repositories'
import errorMessageHandler from '../errorMessage'

const isRolevalid = async (id: number): Promise<boolean | undefined> => {
  if (id === null) return false

  const role = await getRoleByIdService(id)
  if (role === null) throw new Error('The role is not registered in DB')
}

const getRoleByIdService = async (id: number): Promise<Role | null | undefined> => {
  try {
    const role = await roleRepository.findOne({ where: { id } })
    return role
  } catch (error: any) {
    errorMessageHandler(error, 'Error in get role by id service')
  }
}

export {
  isRolevalid,
  getRoleByIdService
}
