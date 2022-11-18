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
  tenGhe: string

  @HasMany(() => GheNgoi, 'gheid')
  ghengois!: GheNgoi[]

  @Column
  isDelete!: boolean

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date
}

export { LoaiGhe }
