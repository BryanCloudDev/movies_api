import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { LikedMovie, Role } from '.'
import { Status } from '../dto'
import BaseModel from './BaseModel'

@Entity()
export default class User extends BaseModel {
  @Column()
    firstName: string

  @Column()
    lastName: string

  @Column({ unique: true })
    email: string

  @Column()
    password: string

  @Column()
    birthDate: Date

  @ManyToOne(() => Role, (role) => role.user)
    role: Role

  @Column({ default: Status.ACTIVE })
    status: number

  @Column({ default: null })
    lastLogin: Date

  @Column({ default: 'https://avatars.githubusercontent.com/u/2693364' })
    profilePhoto: string

  @OneToMany(() => LikedMovie, (likedMovie) => likedMovie.user)
    likes: LikedMovie[]
}
