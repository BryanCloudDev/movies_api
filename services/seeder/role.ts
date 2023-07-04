import { createRoleInstanceService, createRoleService } from '../role'

const createInitialRoles = async (initialRoles: string[]): Promise<void> => {
  for (const name of initialRoles) {
    const role = createRoleInstanceService({ name })
    await createRoleService(role)
  }
}

export default createInitialRoles
