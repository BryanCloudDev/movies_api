import { type Response, type NextFunction } from 'express'
import { Roles, type ICustomRequest } from '../dto'
import { errorMessageHandler, getRoleByIdService } from '../services'

const validateRoleOnCreate = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const roleSent: number = req.body.roleId !== undefined ? req.body.roleId : Roles.USER

    const role = await getRoleByIdService(roleSent)

    if (role === null) {
      return res.status(404).json({
        message: `The role with id ${roleSent} is not registered in DB`
      })
    }
    req.role = role

    next()
  } catch (error: any) {
    next()
    throw new Error(errorMessageHandler(error, 'Error in validate role on creation middleware').message)
  }
}

export default validateRoleOnCreate
