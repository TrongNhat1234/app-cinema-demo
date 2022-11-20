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
  gio_bat_dau!: Date

  @Column
  gio_ket_thuc!: Date

  @BelongsToMany(() => NhanVien, () => CaLamNhanVien)
  nhanviens: NhanVien[]

  @Column
  is_delete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { CaLam }
