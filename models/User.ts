import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { BaseModel } from './BaseModel'
import { Role } from './Role'
import { LikedMovie } from './LikedMovies'

@Entity()
export class User extends BaseModel {
  @Column()
    firstName: string

  @Column()
    lastName: string

  @Column({ unique: true })
    email: number

  @Column()
    password: string

  @Column()
    birthDate: Date

  @ManyToOne(() => Role, (role) => role.user)
    role: Role

  @Column({ default: 1 })
    status: number

  @Column({ default: null })
    lastLogin: Date

  @Column({ default: 'https://avatars.githubusercontent.com/u/2693364' })
    profilePhoto: string

  @OneToMany(() => LikedMovie, (likedMovie) => likedMovie.user)
    movie: LikedMovie[]
}
