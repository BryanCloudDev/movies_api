
import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'
import { userRepository } from '../repositories'
import { getUserbyIdService } from '../services/user'

const validateFields = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }
  next()
}

const validateEmailInChange = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const email: string = req.body.email

    if (email === undefined) {
      next()
      return undefined
    }

    const id = parseInt(req.params.id)
    const user = await getUserbyIdService(id)

    if (user !== null && user.email !== email) {
      const existingEmail = await userRepository.findOne({ where: { email } })

      if (existingEmail !== null) {
        return res.status(400).json({
          message: `Email ${email} is already in use`
        })
      }
    }

    next()
  } catch (error: any) {
    console.log(error)
  }
}

export {
  validateFields,
  validateEmailInChange
}
