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
  tableName: 'khachhangs',
})
export default class KhachHang extends Model<KhachHang> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  tenKhachHang: string

  @Column
  email: string

  @Column
  diaChi: string

  @Column
  soDienThoai!: string

  @Column
  matKhau!: string

  @Column
  ngaySinh: Date

  @HasMany(() => VeBan, 'idKhachHang')
  ves: VeBan[]

  @Column
  isDelete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { KhachHang }
