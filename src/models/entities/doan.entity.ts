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
import HoaDonChiTiet from './hoadonchitiet.entity'
import HoaDonDoAn from './hoadondoan.entity'

@Table({
  tableName: 'doans',
})
export default class DoAn extends Model<DoAn> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  ten_do_an!: string

  @Column
  size!: string

  @Column
  gia!: number

  @BelongsToMany(() => HoaDonDoAn, () => HoaDonChiTiet)
  hoadons: HoaDonDoAn[]

  @Column
  is_delete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { DoAn }
