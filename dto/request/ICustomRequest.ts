import { type Request } from 'express'
import { type Role, type Movie, type LikedMovie } from '../../models'

export default interface ICustomRequest extends Request {
  movie: Movie
  role: Role
  like: LikedMovie
}
