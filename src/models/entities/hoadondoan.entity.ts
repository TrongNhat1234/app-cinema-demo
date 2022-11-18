import {
  Column,
  CreatedAt,
  HasMany,
  BelongsToMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import HoaDonDoAn from './hoadondoan.entity'
import HoaDonChiTiet from './hoadonchitiet.entity'

@Table({
  tableName: 'doans',
})
export default class DoAn extends Model<DoAn> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  ngayBan!: Date

  @Column
  giamGia!: number

  @Column
  tongTien!: number

  @BelongsToMany(() => DoAn, () => HoaDonChiTiet)
  doans: DoAn[]

  @Column
  isDelete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { DoAn }
