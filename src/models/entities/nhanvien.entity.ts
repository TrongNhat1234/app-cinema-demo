import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  BelongsToMany,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import CaLam from './calam.entity'
import CaLamNhanVien from './calamnhanvien.entity'
import VeBan from './veban.entity'

@Table({
  tableName: 'nhanviens',
})
export default class NhanVien extends Model<NhanVien> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  ho_ten!: string

  @Column
  ngay_sinh: Date

  @Column
  dia_chi: string

  @Column
  email!: string

  @Column
  ngay_vao_lam: Date

  @Column
  gioi_tinh: boolean

  @Column
  mat_khau!: string

  @Column
  vai_tro!: string

  @BelongsToMany(() => CaLam, () => CaLamNhanVien)
  calams: CaLam[]

  @HasMany(() => VeBan)
  vebans!: VeBan[]

  @Column
  is_delete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { NhanVien }
