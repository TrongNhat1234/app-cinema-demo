import HoaDonChiTiet from '@models/entities/hoadonchitiet.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { HoaDonChiTietRepositoryInterface } from './interfaces/hoadonchitiet.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class HoaDonChiTietRepository
  extends BaseRepository<HoaDonChiTiet>
  implements HoaDonChiTietRepositoryInterface<HoaDonChiTiet>
{
  constructor(@ModelContainer(HoaDonChiTiet.tableName) HoaDonChiTiet: ModelCtor<HoaDonChiTiet>) {
    super(HoaDonChiTiet)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }
}

export default HoaDonChiTietRepository
