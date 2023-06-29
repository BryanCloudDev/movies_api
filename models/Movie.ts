import { Entity, Column } from 'typeorm'
import { BaseModel } from './BaseModel'

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

  @Column()
    status: boolean
}
