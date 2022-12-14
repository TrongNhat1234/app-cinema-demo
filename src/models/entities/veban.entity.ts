import { timestamp } from 'aws-sdk/clients/cloudfront'
import {
  Column,
  CreatedAt,
  HasMany,
  BelongsTo,
  Model,
  PrimaryKey,
  Table,
  BelongsToMany,
  ForeignKey,
  UpdatedAt,
} from 'sequelize-typescript'
import SuatChieu from './suatchieu.entity'
import GiaVe from './giave.entity'
import NhanVien from './nhanvien.entity'
import GheNgoi from './ghengoi.entity'
import KhachHang from './khachhang.entity'

@Table({
  tableName: 'vebans',
})
export default class VeBan extends Model<VeBan> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  ngay_ban!: Date

  @ForeignKey(() => SuatChieu)
  @Column
  id_suat_chieu!: number

  @BelongsTo(() => SuatChieu)
  suatchieu: SuatChieu

  @ForeignKey(() => NhanVien)
  @Column
  id_nhan_vien!: number

  @BelongsTo(() => NhanVien)
  nhanvien: NhanVien

  @ForeignKey(() => GheNgoi)
  @Column
  id_ghe_ngoi!: number

  @BelongsTo(() => GheNgoi)
  ghe: GheNgoi

  @ForeignKey(() => KhachHang)
  @Column
  id_khach_hang!: number

  @BelongsTo(() => KhachHang, 'id_khach_hang')
  khach_hang: KhachHang

  @Column
  gia_ve!: number

  @Column
  trang_thai!: number

  @Column
  is_delete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { VeBan }
