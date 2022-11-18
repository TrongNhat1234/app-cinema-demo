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
  tableName: 'xuatchieus',
})
export default class XuatChieu extends Model<XuatChieu> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  gioBatDau!: timestamp

  @Column
  gioKetThuc!: timestamp

  @ForeignKey(() => Phim)
  @Column
  idPhim!: number

  @BelongsTo(() => Phim, 'idPhim')
  phim: Phim

  @ForeignKey(() => PhongChieu)
  @Column
  idPhongChieu!: number

  @BelongsTo(() => PhongChieu, 'idPhongChieu')
  phongchieu: PhongChieu

  @ForeignKey(() => DinhDangPhim)
  @Column
  idDinhDangPhim!: number

  @BelongsTo(() => DinhDangPhim, 'idDinhDangPhim')
  dinhdangphim: DinhDangPhim

  @HasMany(() => VeBan, 'idVeBan')
  vebans!: VeBan[]

  @Column
  isDelete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { XuatChieu }
