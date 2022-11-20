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
  tableName: 'loginadmins',
})
export default class LoginAdmin extends Model<LoginAdmin> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  email!: string
  @Column
  is_delete!: boolean
  @Column
  password!: string

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { LoginAdmin }
