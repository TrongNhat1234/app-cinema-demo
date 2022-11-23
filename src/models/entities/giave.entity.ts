import { timestamp } from 'aws-sdk/clients/cloudfront'
import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  BelongsToMany,
  UpdatedAt,
} from 'sequelize-typescript'
import VeBan from './veban.entity'

@Table({
  tableName: 'giaves',
})
export default class GiaVe extends Model<GiaVe> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  gia_ve!: number

  @Column
  is_delete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { GiaVe }
