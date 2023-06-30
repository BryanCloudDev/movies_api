import { type NextFunction, type Request, type Response } from 'express'
import jwt from 'jsonwebtoken'
import { type IJwtPayload } from '../dto/auth/IJwtpayload'
import { userRepository } from '../repositories'
import { Status } from '../dto/enums/status'

const validateJWT = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const authToken = req.header('Authorization')

    if (authToken === undefined) {
      return res.status(401).json({
        message: 'Authorization token must be present'
      })
    }

    const [, token] = authToken.split(' ')
    const payload = jwt.verify(token, String(process.env.JWT_KEY))
    const { id } = payload as IJwtPayload

    const user = await userRepository.findOne({ where: { id } })

    if (user === null) {
      return res.status(401).json({
        message: 'Invalid token'
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

    next()
  } catch (error) {
    console.log(error.message)

    return res.status(401).json({
      message: 'Invalid token'
    })
  }
}

export {
  validateJWT
}
