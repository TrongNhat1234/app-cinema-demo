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
import Phim from './phim.entity'
import TheLoai from './theloai.entity'

@Table({
  tableName: 'theloaiphims',
})
export default class TheLoaiPhim extends Model<TheLoaiPhim> {
  @ForeignKey(() => Phim)
  @Column
  id_phim: string

  @ForeignKey(() => TheLoai)
  @Column
  id_the_loai: string

  @Column
  is_delete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { TheLoaiPhim }
