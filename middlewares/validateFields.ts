
import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'

const validateFields = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }
  next()
}

export {
  validateFields
}
