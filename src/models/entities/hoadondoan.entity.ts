import {
  Column,
  CreatedAt,
  HasMany,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import NhanVien from './nhanvien.entity'
import HoaDonChiTiet from './hoadonchitiet.entity'

@Table({
  tableName: 'hoadondoans',
})
export default class HoaDonDoAn extends Model<HoaDonDoAn> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  ngay_ban!: Date

  @Column
  giam_gia!: number

  @Column
  tong_tien!: number

  @BelongsToMany(() => HoaDonDoAn, () => HoaDonChiTiet)
  hoadondoans: HoaDonDoAn[]

  @ForeignKey(() => NhanVien)
  @Column
  id_nhan_vien!: number

  @BelongsTo(() => NhanVien)
  nhanvien!: NhanVien

  @Column
  is_delete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { HoaDonDoAn }
