import { type NextFunction, type Request, type Response } from 'express'
import { passport } from '../services/passport/localStrategy'
import { type User } from '../models'
import errorMessageHandler from '../services/errorMessage'
import { Status } from '../dto'

const validateJWT = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('jwt', async (err: Error | null, user: User | false, info: any) => {
    try {
      if (err !== null || user === false) {
        return res.status(400).json({
          message: info.message
        })
      }

      if (user.status === Status.INACTIVE) {
        return res.status(403).json({
          message: 'User has been deleted'
        })
      }

      if (user.status === Status.BANNED) {
        return res.status(403).json({
          message: 'User has been banned'
        })
      }

      req.login(user, { session: false }, async (err: any) => {
        if (err !== undefined) { next(err) }

        next()
      })
    } catch (error) {
      next(error)
      return res.status(500).json(errorMessageHandler(error, 'Error in jwt verification'))
    }
  })(req, res, next)
}

export default validateJWT
