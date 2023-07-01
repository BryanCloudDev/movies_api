import { type Repository } from 'typeorm'
import { type IFilter } from '../dto/filter/IFilterUser'
import { type BaseModel } from '../models/BaseModel'

const createFilter = async (reqFilter: string, model: BaseModel, repository: Repository<typeof model>): Promise<any> => {
  const { where, limit, offset, select }: IFilter<typeof model> = JSON.parse(reqFilter)
  const repositoryPromise = repository.find({ ...where, skip: offset, take: limit, select })
  const countPromise = repository.count()
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
      first: encodeURIComponent(`{"limit":${limit},"offset": 0,"select": [${selectArray.join(',')}]}`),
      previous: encodeURIComponent(`{"limit":${limit},"offset": ${Math.max(offset - limit, 0)},"select": [${selectArray.join(',')}]}`),
      next: encodeURIComponent(`{"limit":${limit},"offset": ${offset + limit},"select": [${selectArray.join(',')}]}`),
      last: encodeURIComponent(`{"limit":${limit},"offset": ${Math.floor(count / limit) * limit},"select": [${selectArray.join(',')}]}`)
    }
  }
}

export default createFilter
