import VeBan from '@models/entities/veban.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { VeBanRepositoryInterface } from './interfaces/veban.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class VeBanRepository extends BaseRepository<VeBan> implements VeBanRepositoryInterface<VeBan> {
  constructor(@ModelContainer(VeBan.tableName) VeBan: ModelCtor<VeBan>) {
    super(VeBan)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }
}

export default VeBanRepository
