import { type Response, type NextFunction } from 'express'
import { type ICustomRequest, type IFilter } from '../dto'
import type BaseModel from '../models/BaseModel'

const validateQuery = (req: ICustomRequest, res: Response, next: NextFunction): Response | undefined => {
  const reqFilter = req.query.filter as string
  if (reqFilter !== undefined) {
    let { where, limit, offset, select, order, relations }: IFilter<BaseModel> = JSON.parse(reqFilter)

    if (isNaN(limit) || isNaN(offset)) {
      return res.status(400).json({
        message: 'In order to paginate you need to send at least limit and offset'
      })
    }

    if (where === undefined) {
      where = {}
    }

    if (select === undefined) {
      select = {}
    }

    if (order === undefined) {
      order = {}
    }

    if (relations === undefined) {
      relations = {}
    }

    req.filter = {
      limit,
      offset,
      where,
      select,
      order,
      relations
    }
  }

  next()
}

export default validateQuery
