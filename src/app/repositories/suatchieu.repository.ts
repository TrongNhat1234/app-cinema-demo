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

  async getAllNgay() {
    return await DB.sequelize.query(
      'SELECT * FROM ' +
        this.modelName() +
        ' where is_delete = 0 and (DATE(NOW()) - ngay_chieu) <=15 order by ngay_chieu desc ',
      {
        type: QueryTypes.SELECT,
      },
    )
  }

  async createSuatChieu(object: any) {
    const a = await DB.sequelize.query(
      "call them_suatchieu('" +
        object.gio_bat_dau +
        "', '" +
        object.gio_ket_thuc +
        "', " +
        object.id_phong_chieu +
        ', ' +
        object.id_dinh_dang_phim +
        ', ' +
        object.id_phim +
        ", '" +
        object.ngay_chieu +
        "')",
      {
        type: QueryTypes.CALL,
      },
    )
    return a
  }

  async updateSuatChieu(object: any) {
    const a = await DB.sequelize.query(
      'Update ' +
        this.modelName() +
        " set gio_bat_dau =  '" +
        object.gio_bat_dau +
        " ' , gio_ket_thuc = '" +
        object.gio_ket_thuc +
        " ', ngay_chieu = '" +
        object.ngay_chieu +
        " ' , id_phong_chieu = " +
        object.id_phong_chieu +
        ' where id = ' +
        object.id,
      {
        type: QueryTypes.UPDATE,
      },
    )
    return a
  }
}

export default SuatChieuRepository
