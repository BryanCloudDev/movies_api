import { type NextFunction, type Response } from 'express'
import { type ICustomRequest, Roles, Status } from '../../dto'
import { errorMessageHandler, getRoleByIdService } from '../../services'

const validateRoleId = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const roleSent: number = req.body.roleId ?? req.params.id
    const id = roleSent ?? Roles.USER

    const role = await getRoleByIdService(id)

    if (role === null) {
      return res.status(404).json({
        message: `The role with id ${id} is not registered in DB`
      })
    }

    if (role.status === Status.INACTIVE) {
      return res.status(400).json({
        message: 'The role has been marked already as inactive'
      })
    }

    req.role = role

    next()
  } catch (error: any) {
    next()
    throw new Error(errorMessageHandler(error, 'Error in validate role id middleware').message)
  }
}

export default validateRoleId
