import { timestamp } from 'aws-sdk/clients/cloudfront'
import { Time } from 'aws-sdk/clients/codedeploy'
import {
  BelongsToMany,
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import TheLoai from './theloai.entity'
import TheLoaiPhim from './theloaiphim.entity'
import SuatChieu from './suatchieu.entity'

@Table({
  tableName: 'phims',
})
export default class Phim extends Model<Phim> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  ten_phim!: string

  @Column
  thoi_luong_phim!: Date

  @Column
  gioi_han_tuoi: number

  @Column
  ngay_cong_chieu!: Date

  @Column
  trang_thai!: boolean

  @BelongsToMany(() => TheLoai, () => TheLoaiPhim)
  theloais: TheLoai[]

  @HasMany(() => SuatChieu)
  suatchieus!: SuatChieu[]

  @Column
  is_delete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { Phim }
