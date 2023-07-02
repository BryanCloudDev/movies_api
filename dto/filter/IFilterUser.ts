import { type FindOptionsRelations, type FindOptionsOrder, type FindOptionsSelect, type FindOptionsWhere } from 'typeorm'

export default interface IFilter<T> {
  limit: number
  offset: number
  order: FindOptionsOrder<T> | undefined
  select: FindOptionsSelect<T>
  where: FindOptionsWhere<T> | Array<FindOptionsWhere<T>> | undefined
  relations: FindOptionsRelations<T>
}
