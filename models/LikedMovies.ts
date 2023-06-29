import { Entity, ManyToOne } from 'typeorm'
import { Movie } from './Movie'
import { User } from './User'
import { BaseModel } from './BaseModel'

@Entity()
export class LikedMovie extends BaseModel {
  @ManyToOne(() => Movie, (movie) => movie.movie)
    movie: Movie

  @ManyToOne(() => User, (user) => user.movie)
    user: User
}
