
import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'

const validateFields = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json(errors)
  }
  next()
}

export default validateFields
