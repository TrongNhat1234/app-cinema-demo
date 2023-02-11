import TheLoaiPhim from '@models/entities/theloaiphim.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { TheLoaiPhimRepositoryInterface } from './interfaces/theloaiphim.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class TheLoaiPhimRepository
  extends BaseRepository<TheLoaiPhim>
  implements TheLoaiPhimRepositoryInterface<TheLoaiPhim>
{
  constructor(@ModelContainer(TheLoaiPhim.tableName) TheLoaiPhim: ModelCtor<TheLoaiPhim>) {
    super(TheLoaiPhim)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }

  async findByIdPhim(id_phim: number) {
    return await DB.sequelize.query(
      'SELECT * FROM ' + this.modelName() + ' WHERE id_phim = ' + id_phim + '',
      {
        type: QueryTypes.SELECT,
      },
    )
  }

  async createTheLoaiPhim(id_phim: number, id_the_loai: number) {
    return await DB.sequelize.query(
      'insert into theloaiphims (id_phim,id_the_loai) values (' +
        id_phim +
        ' , ' +
        id_the_loai +
        ')',
      {
        type: QueryTypes.INSERT,
      },
    )
  }
}

export default TheLoaiPhimRepository
