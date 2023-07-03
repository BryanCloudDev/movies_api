import { type IFilterResponse, type IFilter } from '../dto'
import { type Repository } from 'typeorm'
import type BaseModel from '../models/BaseModel'
import { errorMessageHandler } from './'
import { createUriComponent } from './utils/utils'

const createFilter = async (reqFilter: string, model: BaseModel, repository: Repository<typeof model>): Promise<IFilterResponse> => {
  try {
    const { where, limit, offset, select, order, relations }: IFilter<typeof model> = JSON.parse(reqFilter)

    const repositoryPromise = repository.find({ where, skip: offset, take: limit, select, order, relations })
    const countPromise = repository.count({ where })

    const selectArray = Object.entries(select).map(entry => entry[1])
    const [response, count] = await Promise.all([repositoryPromise, countPromise])

    const query = {
      where,
      limit,
      select: selectArray,
      order
    }

    return {
      response,
      meta: {
        itemCount: response.length,
        totalPages: Math.ceil(count / limit),
        currentPage: Math.ceil(offset / limit) + 1
      },
      links: {
        first: createUriComponent({
          ...query,
          offset: 0
        }),
        previous: createUriComponent({
          ...query,
          offset: Math.max(offset - limit, 0)
        }),
        next: createUriComponent({
          ...query,
          offset: offset + limit
        }),
        last: createUriComponent({
          ...query,
          offset: Math.floor(count / limit) * limit
        })
      }
    }
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, `Error in filter ${model.constructor.name}`).message)
  }
}

export default createFilter
