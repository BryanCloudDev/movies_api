import { type IRoleRequest } from '../../dto'
import { type Role } from '../../models'
import { errorMessageHandler } from '../'
import { roleRepository } from '../../repositories'

const getRoleByIdService = async (id: number): Promise<Role | null> => {
  try {
    const role = await roleRepository.findOne({ where: { id } })
    return role
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, 'Error in get role by id service').message)
  }
}

const createRoleInstanceService = (roleRequest: IRoleRequest): Role => {
  try {
    const role = roleRepository.create({ ...roleRequest })
    return role
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, 'Error in create role instance').message)
  }
}

const createRoleService = async (movie: Role): Promise<Role> => {
  try {
    const role = await roleRepository.save(movie)
    return role
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, 'Error in save role').message)
  }
}

export {
  createRoleInstanceService,
  createRoleService,
  getRoleByIdService
}
