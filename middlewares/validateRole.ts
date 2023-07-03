import { type NextFunction, type Request, type Response } from 'express'
import { type User } from '../models'
import { type Roles } from '../dto'

const validateRole = (roles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role }: User = req.user as User
    const { id } = role

    if (!roles.includes(id)) {
      return res.status(403).json({
        message: 'You are not authorized'
      })
    }

    next()
  }
}

export default validateRole
