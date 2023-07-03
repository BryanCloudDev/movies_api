import { type NextFunction, type Request, type Response } from 'express'
import { Status } from '../dto/enums/status'

const validateStatus = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const statusId = parseInt(req.body.status)

  if (!(statusId in Status)) {
    return res.status(400).json({
      message: `Status with id ${statusId} is not valid`
    })
  }

  next()
}

export default validateStatus
