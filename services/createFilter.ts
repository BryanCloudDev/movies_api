import { type Repository } from 'typeorm'
import { type IFilter } from '../dto/filter/IFilterUser'
import { type BaseModel } from '../models/BaseModel'

const createFilter = async (reqFilter: string, model: BaseModel, repository: Repository<typeof model>): Promise<any> => {
  const { where, limit, offset, select, order }: IFilter<typeof model> = JSON.parse(reqFilter)

  const repositoryPromise = repository.find({ where, skip: offset, take: limit, select, order })
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
      first: encodeURIComponent(JSON.stringify({
        ...query,
        offset: 0
      })),
      previous: encodeURIComponent(JSON.stringify({
        ...query,
        offset: Math.max(offset - limit, 0)
      })),
      next: encodeURIComponent(JSON.stringify({
        ...query,
        offset: offset + limit
      })),
      last: encodeURIComponent(JSON.stringify({
        ...query,
        offset: Math.floor(count / limit) * limit
      }))
    }
  }
}

export default createFilter
