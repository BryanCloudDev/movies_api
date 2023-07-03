import { type NextFunction, type Response } from 'express'
import { type ICustomRequest } from '../../dto'
import { getUserbyIdService, errorMessageHandler } from '../../services'

const validateUserId = async (req: ICustomRequest, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const id = parseInt(req.params.id)

    const user = await getUserbyIdService(id)

    if (user === null) {
      return res.status(404).json({
        message: `The user the id ${id} does not exist`
      })
    }

    req.user = user

    next()
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, 'Error in exists user by id middleware').message)
  }
}

export default validateUserId
