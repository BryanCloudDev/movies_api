import { type IRoleRequest } from '../dto'
import { type Request, type Response } from 'express'
import { createRoleInstanceService, createRoleService, errorMessageHandler } from '../services'

const createRole = async (req: Request, res: Response): Promise<Response> => {
  try {
    const name: IRoleRequest = req.body.name

    const roleInstance = createRoleInstanceService(name)
    await createRoleService(roleInstance)

    return res.status(200).json({
      message: 'Successfully created'
    })
  } catch (error: any) {
    return res.status(500).json(errorMessageHandler(error, 'Error in create role'))
  }
}

const deleteRole = (req: Request, res: Response) => {

}

const getRoles = (req: Request, res: Response) => {

}

export {
  createRole,
  deleteRole,
  getRoles
}
