import {
  Column,
  CreatedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript'
import GheNgoi from './ghengoi.entity'
import SuatChieu from './suatchieu.entity'

@Table({
  tableName: 'phongchieus',
})
export default class PhongChieu extends Model<PhongChieu> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  ten_phong_chieu: string

  @HasMany(() => GheNgoi)
  ghengois!: GheNgoi[]

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

export { PhongChieu }
