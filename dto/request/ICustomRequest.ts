import { type Request } from 'express'
import { type LikedMovie, type Role, type Movie } from '../../models'
import type BaseModel from '../../models/BaseModel'
import type IFilter from '../filter/IFilterUser'

export default interface ICustomRequest extends Request {
  movie: Movie
  role: Role
  like: LikedMovie
  filter: IFilter<BaseModel> | undefined
}
