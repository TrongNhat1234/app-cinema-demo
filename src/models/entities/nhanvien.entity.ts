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

@Table({
  tableName: 'nhanviens',
})
export default class NhanVien extends Model<NhanVien> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  hoTen!: string

  @Column
  ngaySinh: Date

  @Column
  diaChi: string

  @Column
  email!: string

  @Column
  ngayVaoLam: Date

  @Column
  gioiTinh: boolean

  @Column
  matKhau!: string

  @Column
  vaiTro!: string

  @BelongsToMany(() => CaLam, () => CaLamNhanVien)
  calams: CaLam[]

  @Column
  isDelete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { NhanVien }
