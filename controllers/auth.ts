import { type NextFunction, type Request, type Response } from 'express'
import { passport } from '../services/passport/localStrategy'
import { type User } from '../models'
import { generateJWT } from '../services/auth'

const login = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('local', async (err: Error | null, user: User | false, info: any) => {
    try {
      if (err !== null || user === false) {
        return res.json(info)
      }

      req.login(user, { session: false }, async (err: any) => {
        if (err !== undefined) { next(err); return }

        const token = await generateJWT({ id: user.id, email: user.email, role: user.role.id })
        return res.json({ token })
      })
    } catch (e) {
      next(e)
    }
  })(req, res, next)
}

export {
  login
}
