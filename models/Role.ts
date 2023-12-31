import { Column, Entity, OneToMany } from 'typeorm'
import BaseModel from './BaseModel'
import User from './User'
import { Status } from '../dto'

@Entity()
export default class Role extends BaseModel {
  @Column()
    name: string

  @Column({ default: Status.ACTIVE })
    status: number

  @OneToMany(() => User, (user) => user.role)
    user: User[]
}
