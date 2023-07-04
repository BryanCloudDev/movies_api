import { type IFilterResponse, type IFilter } from '../dto'
import { type Repository } from 'typeorm'
import type BaseModel from '../models/BaseModel'
import { FilterResponse, errorMessageHandler } from './'

const createFilter = async <T extends BaseModel>(reqFilter: IFilter<T>, model: T, repository: Repository<T>): Promise<IFilterResponse> => {
  try {
    const { where, limit, offset, select, order, relations }: IFilter<typeof model> = reqFilter

    const repositoryPromise = repository.find({ where, skip: offset, take: limit, select, order, relations })
    const countPromise = repository.count({ where })
    const [response, count] = await Promise.all([repositoryPromise, countPromise])

    return new FilterResponse(response, reqFilter, count).getResponse()
  } catch (error: any) {
    throw new Error(errorMessageHandler(error, `Error in filter ${model.constructor.name}`).message)
  }
}

export default createFilter
