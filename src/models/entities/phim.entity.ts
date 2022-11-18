import { timestamp } from 'aws-sdk/clients/cloudfront'
import {
  BelongsToMany,
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import TheLoai from './theloai.entity'
import TheLoaiPhim from './theloaiphim.entity'
import XuatChieu from './xuatchieu.entity'

@Table({
  tableName: 'phims',
})
export default class Phim extends Model<Phim> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  tenPhim!: string

  @Column
  thoiLuongPhim!: timestamp

  @Column
  gioiHanTuoi: number

  @Column
  ngayCongChieu!: Date

  @Column
  trangThai!: boolean

  @BelongsToMany(() => TheLoai, () => TheLoaiPhim)
  theloais: TheLoai[]

  @HasMany(() => XuatChieu, 'idPhim')
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

export { TheLoai }
