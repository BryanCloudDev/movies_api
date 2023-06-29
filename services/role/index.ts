import { roleRepository } from '../../repositories'

const isRolevalid = async (id: number): Promise<boolean | undefined> => {
  if (id === null) return false

  const role = await roleRepository.findOne({ where: { id } })
  if (role === null) throw new Error('The role is not registered in DB')
}

export {
  isRolevalid
}
