import { type Response, type NextFunction } from 'express'
import { type ICustomRequest, Status } from '../dto'
import { type User } from '../models'

const validateUserOnDelete = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
  const user = req.user as User

  if (user.status === Status.INACTIVE || user.status === Status.BANNED) {
    return res.status(400).json({
      message: `The user has been marked already as ${user.status === Status.INACTIVE ? 'inactive' : 'banned'}`
    })
  }

  next()
}

export default validateUserOnDelete
