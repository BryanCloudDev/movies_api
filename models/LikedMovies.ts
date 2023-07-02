import { Entity, ManyToOne } from 'typeorm'
import BaseModel from './BaseModel'
import Movie from './Movie'
import User from './User'

@Entity()
export default class LikedMovie extends BaseModel {
  @ManyToOne(() => Movie, (movie) => movie.likes)
    movie: Movie

  @ManyToOne(() => User, (user) => user.likes)
    user: User
}
