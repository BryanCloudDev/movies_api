import { Entity, Column, OneToMany } from 'typeorm'
import BaseModel from './BaseModel'
import User from './User'

@Entity()
export default class Role extends BaseModel {
  @Column()
    name: string

  @OneToMany(() => User, (user) => user.role)
    user: User[]
}
