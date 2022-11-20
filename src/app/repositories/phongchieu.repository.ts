import { PhongChieu } from '@models/entities/phongchieu.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { PhongChieuRepositoryInterface } from './interfaces/phongchieu.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class PhongChieuRepository
  extends BaseRepository<PhongChieu>
  implements PhongChieuRepositoryInterface<PhongChieu>
{
  constructor(@ModelContainer(PhongChieu.tableName) PhongChieu: ModelCtor<PhongChieu>) {
    super(PhongChieu)
  }
}

export default PhongChieuRepository
