import type BaseModel from '../../models/BaseModel'

export default interface IFilterResponse {
  response: BaseModel[]
  meta: {
    itemCount: number
    totalPages: number
    currentPage: number
  }
  links: {
    first: string
    previous: string
    next: string
    last: string
  }
}
