import { type Request } from 'express'
import { type Role, type Movie } from '../../models'

export default interface ICustomRequest extends Request {
  movie: Movie
  role: Role
}
