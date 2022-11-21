import { timestamp } from 'aws-sdk/clients/cloudfront'
import {
  Column,
  CreatedAt,
  HasMany,
  BelongsTo,
  Model,
  PrimaryKey,
  Table,
  BelongsToMany,
  ForeignKey,
  UpdatedAt,
} from 'sequelize-typescript'
import Phim from './phim.entity'
import DinhDangPhim from './dinhdangphim.entity'
import PhongChieu from './phongchieu.entity'
import VeBan from './veban.entity'

@Table({
  tableName: 'suatchieus',
})
export default class SuatChieu extends Model<SuatChieu> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  gio_bat_dau!: Date

  @Column
  gio_ket_thuc!: Date

  @ForeignKey(() => Phim)
  @Column
  id_phim!: number

  @BelongsTo(() => Phim)
  phim: Phim

  @ForeignKey(() => PhongChieu)
  @Column
  id_phong_chieu!: number

  @BelongsTo(() => PhongChieu)
  phongchieu: PhongChieu

  @ForeignKey(() => DinhDangPhim)
  @Column
  id_dinh_dang_phim!: number

  @BelongsTo(() => DinhDangPhim)
  dinhdangphim: DinhDangPhim

  @HasMany(() => VeBan)
  vebans!: VeBan[]

  @Column
  is_delete!: boolean

  @Column
  ngay_chieu!: Date

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { SuatChieu }
