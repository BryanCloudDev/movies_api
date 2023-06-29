import { type Role } from '../../models'
import { roleRepository } from '../../repositories'

const isRolevalid = async (id: number): Promise<boolean | undefined> => {
  if (id === null) return false

  const role = await getRoleByIdService(id)
  if (role === null) throw new Error('The role is not registered in DB')
}

const getRoleByIdService = async (id: number): Promise<Role | null> => {
  const role = await roleRepository.findOne({ where: { id } })
  return role
}

export {
  isRolevalid,
  getRoleByIdService
}
