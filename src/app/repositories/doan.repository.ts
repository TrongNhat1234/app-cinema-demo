import DoAn from '@models/entities/doan.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { DoAnRepositoryInterface } from './interfaces/doan.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class DoAnRepository extends BaseRepository<DoAn> implements DoAnRepositoryInterface<DoAn> {
  constructor(@ModelContainer(DoAn.tableName) DoAn: ModelCtor<DoAn>) {
    super(DoAn)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }

  async createDoAn(object: any) {
    const a = await DB.sequelize.query(
      'INSERT INTO ' +
        this.modelName() +
        " (ten_do_an, gia,size) VALUES ('" +
        object.ten_do_an +
        "', '" +
        object.size +
        "', " +
        object.gia +
        ')',
      {
        type: QueryTypes.INSERT,
      },
    )
    return a
  }
}

export default DoAnRepository
