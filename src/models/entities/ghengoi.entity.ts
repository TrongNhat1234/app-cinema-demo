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
  day_so!: number

  @Column
  hangSo!: number

  @Column
  da_chon!: boolean

  @ForeignKey(() => LoaiGhe)
  @Column
  id_ghe!: number

  @BelongsTo(() => LoaiGhe)
  loaighe!: LoaiGhe

  @ForeignKey(() => PhongChieu)
  @Column
  id_phong_chieu!: number

  @BelongsTo(() => PhongChieu)
  phongchieu!: PhongChieu

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

export { GheNgoi }
