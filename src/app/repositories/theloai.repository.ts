import TheLoai from '@models/entities/theloai.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { TheLoaiRepositoryInterface } from './interfaces/theloai.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class TheLoaiRepository
  extends BaseRepository<TheLoai>
  implements TheLoaiRepositoryInterface<TheLoai>
{
  constructor(@ModelContainer(TheLoai.tableName) TheLoai: ModelCtor<TheLoai>) {
    super(TheLoai)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }
}

export default TheLoaiRepository
