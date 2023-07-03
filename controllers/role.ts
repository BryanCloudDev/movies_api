import { type IRoleRequest, Status } from '../dto'
import { type Request, type Response } from 'express'
import { Role } from '../models'
import { createFilter, createRoleInstanceService, createRoleService, errorMessageHandler } from '../services'
import { roleRepository } from '../repositories'

const createRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { ...roleRequest }: IRoleRequest = req.body

    const roleInstance = createRoleInstanceService(roleRequest)
    await createRoleService(roleInstance)

    return res.status(200).json({
      message: 'Successfully created'
    })
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in create role'))
  }
}

const deleteRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const id = parseInt(req.params.id)

    await roleRepository.update(id, {
      status: Status.INACTIVE
    })

    return res.status(204).json({})
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in delete movie'))
  }
}

const getAllRoles = async (req: Request, res: Response): Promise<Response> => {
  try {
    const reqFilter = req.query.filter as string
    if (reqFilter !== undefined) {
      const roles = await createFilter(reqFilter, new Role(), roleRepository)
      return res.status(200).json(roles)
    }

    const roles = await roleRepository.find()

    return res.status(200).json(roles)
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in get all roles'))
  }
}

export {
  createRole,
  deleteRole,
  getAllRoles
}
