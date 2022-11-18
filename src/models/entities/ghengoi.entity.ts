import {
  BelongsTo,
  ForeignKey,
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import LoaiGhe from './loaighe.entity'
import PhongChieu from './phongchieu.entity'
import VeBan from './veban.entity'

@Table({
  tableName: 'ghengois',
})
export default class GheNgoi extends Model<GheNgoi> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  daySo!: number

  @Column
  hangSo!: number

  @Column
  daChon!: boolean

  @ForeignKey(() => LoaiGhe)
  @Column
  idGhe!: number

  @BelongsTo(() => LoaiGhe, 'idGhe')
  loaighe!: LoaiGhe

  @ForeignKey(() => PhongChieu)
  @Column
  idPhongChieu!: number

  @BelongsTo(() => PhongChieu, 'idPhongChieu')
  phongchieu!: PhongChieu

  @HasMany(() => VeBan, 'idGheNgoi')
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

export { GheNgoi }
