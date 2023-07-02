import { type NextFunction, type Request, type Response } from 'express'
import { passport } from '../services/passport/localStrategy'
import { type User } from '../models'
import { generateJWT } from '../services/auth'
import { Status } from '../dto/enums/status'

const login = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('local', async (err: Error | null, user: User | false, info: any) => {
    try {
      if (err !== null || user === false) {
        return res.status(400).json(info)
      }

      const status = user.status

      if (status === Status.INACTIVE) {
        return res.status(403).json({
          message: 'Your account has been deleted'
        })
      }

      if (status === Status.BANNED) {
        return res.status(403).json({
          message: 'Your account has been banned'
        })
      }

      req.login(user, { session: false }, async (err: any) => {
        if (err !== undefined) { next(err); return }

        const token = await generateJWT({ id: user.id, email: user.email, role: user.role.id })
        return res.status(200).json({ token })
      })
    } catch (e) {
      next(e)
    }
  })(req, res, next)
}

export {
  login
}
