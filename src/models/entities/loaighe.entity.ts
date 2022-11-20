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

@Table({
  tableName: 'loaighes',
})
export default class LoaiGhe extends Model<LoaiGhe> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  ten_ghe: string

  @HasMany(() => GheNgoi)
  ghengois!: GheNgoi[]

  @Column
  is_delete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { LoaiGhe }
