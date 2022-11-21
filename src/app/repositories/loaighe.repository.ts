import LoaiGhe from '@models/entities/loaighe.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { LoaiGheRepositoryInterface } from './interfaces/loaighe.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class LoaiGheRepository
  extends BaseRepository<LoaiGhe>
  implements LoaiGheRepositoryInterface<LoaiGhe>
{
  constructor(@ModelContainer(LoaiGhe.tableName) LoaiGhe: ModelCtor<LoaiGhe>) {
    super(LoaiGhe)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }
}

export default LoaiGheRepository
