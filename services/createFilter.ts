import { type Repository } from 'typeorm'
import { type IFilter } from '../dto/filter/IFilterUser'
import { type BaseModel } from '../models/BaseModel'

const createFilter = async (reqFilter: string, model: BaseModel, repository: Repository<typeof model>): Promise<any> => {
  const { where, limit, offset, select }: IFilter<typeof model> = JSON.parse(reqFilter)

  const repositoryPromise = repository.find({ where, skip: offset, take: limit, select })
  const countPromise = repository.count({ where })

  const selectArray = Object.entries(select).map(entry => entry[1])
  const [response, count] = await Promise.all([repositoryPromise, countPromise])

  return {
    response,
    meta: {
      itemCount: response.length,
      totalPages: Math.ceil(count / limit),
      currentPage: Math.ceil(offset / limit) + 1
    },
    links: {
      first: encodeURIComponent(JSON.stringify({
        where: where !== null ? where : null,
        limit: limit !== null ? limit : null,
        offset: offset !== null ? 0 : null,
        select: select !== null ? selectArray : null
      })),
      previous: encodeURIComponent(JSON.stringify({
        where: where !== null ? where : null,
        limit: limit !== null ? limit : null,
        offset: offset !== null ? Math.max(offset - limit, 0) : null,
        select: select !== null ? selectArray : null
      })),
      next: encodeURIComponent(JSON.stringify({
        where: where !== null ? where : null,
        limit: limit !== null ? limit : null,
        offset: offset !== null ? offset + limit : null,
        select: select !== null ? selectArray : null
      })),
      last: encodeURIComponent(JSON.stringify({
        where: where !== null ? where : null,
        limit: limit !== null ? limit : null,
        offset: offset !== null ? Math.floor(count / limit) * limit : null,
        select: select !== null ? selectArray : null
      }))
    }
  }
}

export default createFilter
