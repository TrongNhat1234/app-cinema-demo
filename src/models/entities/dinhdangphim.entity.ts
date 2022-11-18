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
import XuatChieu from './xuatchieu.entity'

@Table({
  tableName: 'dinhdangphims',
})
export default class DinhDangPhim extends Model<DinhDangPhim> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  tenDinhDang!: string

  @HasMany(() => XuatChieu, 'idDinhDangPhim')
  xuatchieus!: XuatChieu[]

  @Column
  isDelete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { DinhDangPhim }
