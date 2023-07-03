import { type NextFunction, type Response } from 'express'
import { type ICustomRequest, Status } from '../../dto'
import { errorMessageHandler } from '../../services'

const validateRoleOnDelete = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const role = req.role

    if (role.status === Status.INACTIVE) {
      return res.status(400).json({
        message: 'The role has been marked already as inactive'
      })
    }

    next()
  } catch (error: any) {
    next()
    throw new Error(errorMessageHandler(error, 'Error in validate role on delete middleware').message)
  }
}

export default validateRoleOnDelete
