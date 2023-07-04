import { type Request, type Response, type NextFunction } from 'express'

const validateJSON = (err: any, req: Request, res: Response, next: NextFunction): Response | undefined => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).send({ message: err.message }) // Bad request
  }
  next()
}

export default validateJSON
