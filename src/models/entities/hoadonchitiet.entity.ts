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
  id_hoa_don: number

  @ForeignKey(() => DoAn)
  @Column
  id_do_an: number

  @Column
  so_luong: number

  @Column
  is_delete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { HoaDonChiTiet }
