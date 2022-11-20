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
  ten_khach_hang: string

  @Column
  email: string

  @Column
  dia_chi: string

  @Column
  so_dien_thoai!: string

  @Column
  mat_khau!: string

  @Column
  ngay_sinh: Date

  @HasMany(() => VeBan, 'id_khachhang')
  ves: VeBan[]

  @Column
  is_delete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { KhachHang }
