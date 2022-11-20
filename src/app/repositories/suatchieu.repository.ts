import { SuatChieu } from '@models/entities/suatchieu.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { SuatChieuRepositoryInterface } from './interfaces/suatchieu.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class SuatChieuRepository
  extends BaseRepository<SuatChieu>
  implements SuatChieuRepositoryInterface<SuatChieu>
{
  constructor(@ModelContainer(SuatChieu.tableName) SuatChieu: ModelCtor<SuatChieu>) {
    super(SuatChieu)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }

  async createSuatChieu(object: any) {
    const a = await DB.sequelize.query(
      'INSERT INTO ' +
        this.modelName() +
        " (gio_bat_dau, gio_ket_thuc,id_phim,id_phong_chieu,id_dinh_dang_phim) VALUES ('" +
        object.gio_bat_dau +
        "', '" +
        object.gio_ket_thuc +
        "', " +
        object.id_phim +
        ', ' +
        object.id_phong_chieu +
        ', ' +
        object.id_dinh_dang_phim +
        ')',
      {
        type: QueryTypes.INSERT,
      },
    )
    return a
  }
}

export default SuatChieuRepository
