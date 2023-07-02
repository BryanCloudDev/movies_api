import { type Request, type Response, type NextFunction } from 'express'
import { userRepository } from '../repositories'
import errorMessageHandler from '../services/errorMessage'
import { getUserbyIdService } from '../services/user'

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
    return res.status(500).json(errorMessageHandler(error, 'Error in validate Email in change'))
  }
}

export default validateEmailInChange
