import { Phim } from '@models/entities/phim.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { PhimRepositoryInterface } from './interfaces/phim.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class PhimRepository extends BaseRepository<Phim> implements PhimRepositoryInterface<Phim> {
  constructor(@ModelContainer(Phim.tableName) Phim: ModelCtor<Phim>) {
    super(Phim)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }
}

export default PhimRepository
