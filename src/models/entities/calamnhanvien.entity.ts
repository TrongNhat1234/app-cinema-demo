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
import NhanVien from './nhanvien.entity'
import CaLam from './calam.entity'

@Table({
  tableName: 'calamnhanviens',
})
export default class CaLamNhanVien extends Model<CaLamNhanVien> {
  @ForeignKey(() => NhanVien)
  @Column
  idNhanVien: number

  @ForeignKey(() => CaLam)
  @Column
  idCaLam: number

  @Column
  isDelete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { CaLamNhanVien }
