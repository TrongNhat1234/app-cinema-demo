import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript'
import HoaDonDoAn from './hoadondoan.entity'
import DoAn from './doan.entity'

@Table({
  tableName: 'hoadonchitiets',
})
export default class HoaDonChiTiet extends Model<HoaDonChiTiet> {
  @ForeignKey(() => HoaDonDoAn)
  @Column
  idHoaDon: number

  @ForeignKey(() => DoAn)
  @Column
  idDoAn: number

  @Column
  soLuong: number

  @Column
  isDelete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { HoaDonChiTiet }
