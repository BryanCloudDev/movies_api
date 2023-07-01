import { type FindOptionsSelect, type FindManyOptions } from 'typeorm'

export interface IFilter<T> {
  where: FindManyOptions<T>
  limit: number
  offset: number
  select: FindOptionsSelect<T>
}
