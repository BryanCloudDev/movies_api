import { type Request, type Response, type NextFunction } from 'express'

const validateEnvForDocs = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const enviroment = process.env.NODE_ENV
  if (enviroment !== undefined && enviroment !== 'development') {
    return res.status(403).json({
      message: 'Page cannot be accesed'
    })
  }
  next()
}

export default validateEnvForDocs
