import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class BaseModel {
  @PrimaryGeneratedColumn()
    id: number

  @CreateDateColumn()
    createdOn: Date

  @UpdateDateColumn()
    updatedOn: Date
}
