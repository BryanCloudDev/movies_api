import { type NextFunction, type Request, type Response } from 'express'
import { Status } from '../dto/enums/status'
import { passport } from '../services/passport/localStrategy'
import { type User } from '../models'

const validateJWT = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('jwt', async (err: Error | null, user: User | false, info: any) => {
    try {
      if (err !== null || user === false) {
        return res.json({
          message: info.message
        })
      }

      if (user.status === Status.INACTIVE) {
        return res.status(401).json({
          message: 'User has been deleted'
        })
      }

      if (user.status === Status.BANNED) {
        return res.status(401).json({
          message: 'User has been banned'
        })
      }

      req.login(user, { session: false }, async (err: any) => {
        if (err !== undefined) { next(err) }

        next()
      })
    } catch (error) {
      next(error)
    }
  })(req, res, next)
}

export {
  validateJWT
}
