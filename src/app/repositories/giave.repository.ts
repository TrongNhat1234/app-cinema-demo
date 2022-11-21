import GiaVe from '@models/entities/giave.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { GiaVeRepositoryInterface } from './interfaces/giave.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class GiaVeRepository extends BaseRepository<GiaVe> implements GiaVeRepositoryInterface<GiaVe> {
  constructor(@ModelContainer(GiaVe.tableName) GiaVe: ModelCtor<GiaVe>) {
    super(GiaVe)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }
}

export default GiaVeRepository
