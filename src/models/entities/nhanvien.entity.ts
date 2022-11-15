import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'

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

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { NhanVien }
