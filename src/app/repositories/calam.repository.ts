import CaLam from '@models/entities/calam.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { CaLamRepositoryInterface } from './interfaces/calam.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class CaLamRepository extends BaseRepository<CaLam> implements CaLamRepositoryInterface<CaLam> {
  constructor(@ModelContainer(CaLam.tableName) CaLam: ModelCtor<CaLam>) {
    super(CaLam)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }
}

export default CaLamRepository
