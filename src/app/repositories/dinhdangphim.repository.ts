import DinhDangPhim from '@models/entities/dinhdangphim.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { DinhDangPhimRepositoryInterface } from './interfaces/dinhdangphim.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class DinhDangPhimRepository
  extends BaseRepository<DinhDangPhim>
  implements DinhDangPhimRepositoryInterface<DinhDangPhim>
{
  constructor(@ModelContainer(DinhDangPhim.tableName) DinhDangPhim: ModelCtor<DinhDangPhim>) {
    super(DinhDangPhim)
  }
}

export default DinhDangPhimRepository
