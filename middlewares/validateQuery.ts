import { type Response, type NextFunction, type Request } from 'express'

const validateQuery = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
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
  } catch (error) {

  }
}

export default validateQuery
