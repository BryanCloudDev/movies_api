import { type FindOptionsOrder, type FindOptionsSelect, type FindOptionsWhere } from 'typeorm'

export interface IFilter<T> {
  where: FindOptionsWhere<T> | Array<FindOptionsWhere<T>> | undefined
  limit: number
  offset: number
  select: FindOptionsSelect<T>
  order: FindOptionsOrder<T> | undefined
}
