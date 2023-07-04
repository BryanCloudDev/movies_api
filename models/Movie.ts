import { Column, Entity, OneToMany } from 'typeorm'
import { Status } from '../dto'
import BaseModel from './BaseModel'
import LikedMovie from './LikedMovies'

@Entity()
export default class Movie extends BaseModel {
  @Column()
    name: string

  @Column()
    description: string

  @Column({ nullable: true })
    director: string

  @Column()
    genre: string

  @Column({ nullable: true })
    releaseDate: Date

  @Column({ nullable: true })
    duration: number

  @Column()
    rating: number

  @Column({ nullable: true })
    countryOrigin: string

  @Column()
    language: string

  @Column({ nullable: true })
    poster: string

  @Column({ default: Status.ACTIVE })
    status: number

  @OneToMany(() => LikedMovie, (likedMovie) => likedMovie.movie)
    likes: LikedMovie[]
}
