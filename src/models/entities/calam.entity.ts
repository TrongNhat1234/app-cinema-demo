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
import NhanVien from './nhanvien.entity'
import CaLamNhanVien from './calamnhanvien.entity'

@Table({
  tableName: 'calams',
})
export default class CaLam extends Model<CaLam> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  gioBatDau!: timestamp

  @Column
  gioKetThuc!: timestamp

  @BelongsToMany(() => NhanVien, () => CaLamNhanVien)
  nhanviens: NhanVien[]

  @Column
  isDelete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { CaLam }
