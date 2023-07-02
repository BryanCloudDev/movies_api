import { type Response, type NextFunction } from 'express'
import type ICustomRequest from '../dto/request/ICustomRequest'
import { getRoleByIdService } from '../services/role'
import { Role } from '../models'
import Roles from '../dto/enums/roles'

const validateRoleOnCreate = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const roleSent: number = req.body.roleId !== undefined ? req.body.roleId : Roles.USER

  console.log(roleSent)
  const role = await getRoleByIdService(roleSent)

  console.log(role)

  if (!(role instanceof Role)) {
    return res.status(role?.message !== undefined ? 500 : 404).json({
      message: role?.message !== undefined ? role.message : `The role with id ${roleSent} is not registered in DB`
    })
  }

  req.role = role

  next()
}

export default validateRoleOnCreate
