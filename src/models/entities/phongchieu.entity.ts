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
  tableName: 'phongchieus',
})
export default class PhongChieu extends Model<PhongChieu> {
  @PrimaryKey
  @Column
  id!: number

  @Column
  tenPhongChieu: string

  @HasMany(() => GheNgoi, 'idPhongChieu')
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

export { PhongChieu }
