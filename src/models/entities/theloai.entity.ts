import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  BelongsToMany,
} from 'sequelize-typescript'
import Phim from './phim.entity'
import TheLoaiPhim from './theloaiphim.entity'

@Table({
  tableName: 'theloais',
})
export default class TheLoai extends Model<TheLoai> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  ten_the_loai!: string

  @BelongsToMany(() => Phim, () => TheLoaiPhim)
  phims: Phim[]

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { TheLoai }
