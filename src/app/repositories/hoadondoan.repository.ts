import HoaDonDoAn from '@models/entities/hoadondoan.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { HoaDonDoAnRepositoryInterface } from './interfaces/hoadondoan.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class HoaDonDoAnRepository
  extends BaseRepository<HoaDonDoAn>
  implements HoaDonDoAnRepositoryInterface<HoaDonDoAn>
{
  constructor(@ModelContainer(HoaDonDoAn.tableName) HoaDonDoAn: ModelCtor<HoaDonDoAn>) {
    super(HoaDonDoAn)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }
}

export default HoaDonDoAnRepository
