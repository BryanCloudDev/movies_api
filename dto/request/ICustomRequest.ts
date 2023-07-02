import { type Request } from 'express'
import { type Movie } from '../../models'

export default interface ICustomRequest extends Request {
  movie: Movie
}
