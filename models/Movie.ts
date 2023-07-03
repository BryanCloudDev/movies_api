import { Entity, Column, OneToMany } from 'typeorm'
import BaseModel from './BaseModel'
import { Status } from '../dto'
import LikedMovie from './LikedMovies'

@Entity()
export default class Movie extends BaseModel {
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
