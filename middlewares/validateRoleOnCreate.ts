import { type Response, type NextFunction } from 'express'
import { Roles, type ICustomRequest } from '../dto'
import { Role } from '../models'
import { getRoleByIdService } from '../services/role'

const validateRoleOnCreate = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const roleSent: number = req.body.roleId !== undefined ? req.body.roleId : Roles.USER

  const role = await getRoleByIdService(roleSent)

  if (!(role instanceof Role)) {
    return res.status(role?.message !== undefined ? 500 : 404).json({
      message: role?.message !== undefined ? role.message : `The role with id ${roleSent} is not registered in DB`
    })
  }

  req.role = role

  next()
}

export default validateRoleOnCreate
