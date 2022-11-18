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
import XuatChieu from './xuatchieu.entity'
import GiaVe from './giave.entity'
import NhanVien from './nhanvien.entity'
import GheNgoi from './ghengoi.entity'
import KhachHang from './khachhang.entity'

@Table({
  tableName: 'ves',
})
export default class Ve extends Model<Ve> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  ngayBan!: Date

  @Column
  tongTien!: number

  @ForeignKey(() => XuatChieu)
  @Column
  idXuatChieu!: number

  @BelongsTo(() => XuatChieu, 'idXuatChieu')
  xuatchieu: XuatChieu

  @ForeignKey(() => GiaVe)
  @Column
  idGiaVe!: number

  @BelongsTo(() => GiaVe, 'idGiaVe')
  giave: GiaVe

  @ForeignKey(() => NhanVien)
  @Column
  idNhanVien!: number

  @BelongsTo(() => NhanVien, 'idNhanVien')
  nhanvien: NhanVien

  @ForeignKey(() => GheNgoi)
  @Column
  idGheNgoi!: number

  @BelongsTo(() => GheNgoi, 'idGheNgoi')
  ghe: GheNgoi

  @ForeignKey(() => KhachHang)
  @Column
  idKhachHang!: number

  @BelongsTo(() => KhachHang, 'idKhachHang')
  khachhang: KhachHang

  @Column
  isDelete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { Ve }
