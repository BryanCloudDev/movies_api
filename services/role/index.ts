import { type Role } from '../../models'
import { roleRepository } from '../../repositories'
import errorMessageHandler from '../errorMessage'

const getRoleByIdService = async (id: number): Promise<Role | null | undefined | { message: string }> => {
  try {
    const role = await roleRepository.findOne({ where: { id } })
    return role
  } catch (error: any) {
    return errorMessageHandler(error, 'Error in get role by id service')
  }
}

export {
  getRoleByIdService
}
