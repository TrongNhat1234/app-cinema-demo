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
import SuatChieu from './suatchieu.entity'

@Table({
  tableName: 'dinhdangphims',
})
export default class DinhDangPhim extends Model<DinhDangPhim> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  ten_dinh_dang!: string

  @HasMany(() => SuatChieu)
  suatchieus!: SuatChieu[]

  @Column
  is_delete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { DinhDangPhim }
