import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'

@Table({
  tableName: 'users',
})
export default class User extends Model<User> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  name: string

  @Column
  email!: string

  @Column
  password!: string

  @Column
  isDelete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { User }
