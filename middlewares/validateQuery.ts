import { type NextFunction, type Request, type Response } from 'express'

const validateQuery = (req: Request, res: Response, next: NextFunction): Response | undefined => {
  const reqFilter = req.query.filter as string
  if (reqFilter !== undefined) {
    const { limit, offset, where, select } = JSON.parse(reqFilter)

    if (limit === undefined || offset === undefined || where === undefined || select === undefined) {
      return res.status(400).json({
        message: 'In order to paginate you need to send limit, select, where and offset'
      })
    }
  }

  next()
}

export default validateQuery
