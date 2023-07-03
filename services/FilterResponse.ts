import { type IFilter, type IFilterResponse } from '../dto'
import type BaseModel from '../models/BaseModel'
import { getFilter, createUriComponent } from './utils/utils'

export default class FilterResponse {
  private readonly _response: BaseModel[]
  private _totalPages: number
  private _currentpage: number
  private readonly _limit: number
  private readonly _offset: number
  private readonly _count: number
  private readonly _filter: IFilter<BaseModel>

  constructor (response: BaseModel[], filterOptions: IFilter<BaseModel>, count: number) {
    this._response = response
    this._limit = filterOptions.limit
    this._offset = filterOptions.offset
    this._count = count
    this._filter = filterOptions
    this.setTotalPages()
    this.setCurrentPage()
  }

  setTotalPages (): void {
    this._totalPages = Math.ceil(this._count / this._limit)
  }

  get getTotalPages (): number {
    return this._totalPages
  }

  setCurrentPage (): void {
    this._currentpage = Math.ceil(this._offset / this._limit) + 1
  }

  get getCurrentPage (): number {
    return this._currentpage
  }

  getResponse (): IFilterResponse {
    const query = getFilter(this._filter)

    return {
      response: this._response,
      meta: {
        itemCount: this._response.length,
        totalPages: this.getTotalPages,
        currentPage: this.getCurrentPage
      },
      links: {
        first: createUriComponent({ ...query, offset: 0 }),
        previous: this._offset > 0
          ? createUriComponent({
            ...query,
            offset: Math.max(this._offset - this._limit, 0)
          })
          : null,
        next: this._offset < (this.getTotalPages - 1) * this._limit
          ? createUriComponent({
            ...query,
            offset: this._offset + this._limit
          })
          : null,
        last: createUriComponent({
          ...query,
          offset: (this.getTotalPages * this._response.length) - this._limit
        })
      }
    }
  }
}
