import { Entity, Column, OneToMany } from 'typeorm'
import { BaseModel } from './BaseModel'
import { LikedMovie } from './LikedMovies'
import { Status } from '../dto/enums/status'

@Entity()
export class Movie extends BaseModel {
  @Column()
    name: string

  @Column()
    description: string

  @Column()
    director: string

  @Column()
    genre: string

  @Column()
    releaseDate: Date

  @Column()
    duration: number

  @Column()
    rating: number

  @Column()
    countryOrigin: string

  @Column()
    language: string

  @Column()
    poster: string

  @Column({ default: Status.ACTIVE })
    status: number

  @OneToMany(() => LikedMovie, (likedMovie) => likedMovie.movie)
    likes: LikedMovie[]
}
