import { type Request } from 'express'
import { type Movie } from '../../models'

export interface ICustomRequest extends Request {
  movie: Movie
}
