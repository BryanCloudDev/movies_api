import { type IFilter } from '../../dto'
import type BaseModel from '../../models/BaseModel'

const createUriComponent = (object: any): string => {
  return `?filter=${encodeURIComponent(JSON.stringify(object))}`
}

const getFilter = ({ where, limit, select, order, relations }: IFilter<BaseModel>): any => {
  const query: {
    where: any
    limit: any
    offset: any
    select: any
    order: any
    relations: any
  } = {
    where: undefined,
    limit,
    offset: undefined,
    select: undefined,
    order: undefined,
    relations: undefined
  }

  const selectArray = Object.entries(select).map(entry => entry[1])

  if (where !== undefined && Object.keys(where).length !== 0) {
    query.where = where
  }

  if (order !== undefined && Object.keys(order).length !== 0) {
    query.order = order
  }

  if (relations !== undefined && Object.keys(relations).length !== 0) {
    query.order = order
  }

  if (select !== undefined && Object.keys(select).length !== 0) {
    query.select = selectArray
  }

  return query
}

export {
  createUriComponent,
  getFilter
}
