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

  async DatVeVeBanNV(object: any) {
    const a = await DB.sequelize.query(
      'UPDATE ' +
        this.modelName() +
        ' set trang_thai = 1, id_khach_hang = ' +
        object.id_khach_hang +
        ' where id_suat_chieu = ' +
        object.id_suat_chieu +
        ' and id_ghe_ngoi = ' +
        object.id_ghe_ngoi,
      {
        type: QueryTypes.UPDATE,
      },
    )
    return a
  }

  async gheDangXem10p(id_suat_chieu: number, id_ghe_ngoi: number) {
    const a = await DB.sequelize.query(
      'UPDATE ' +
        this.modelName() +
        ' set trang_thai = 2 where id_suat_chieu = ' +
        id_suat_chieu +
        ' and id_ghe_ngoi = ' +
        id_ghe_ngoi,
      {
        type: QueryTypes.UPDATE,
      },
    )
    return a
  }

  async checkTrangThai(id_suat_chieu: number, id_ghe_ngoi: number) {
    return await DB.sequelize.query(
      'SELECT trang_thai FROM ' +
        this.modelName() +
        ' where is_delete = 0 and id_suat_chieu = ' +
        id_suat_chieu +
        ' and id_ghe_ngoi = ' +
        id_ghe_ngoi,
      {
        type: QueryTypes.SELECT,
      },
    )
  }

  async xacNhanThongTinVe(id_suat_chieu: number, id_ghe_ngoi: number) {
    return await DB.sequelize.query(
      'call xac_nhan_thong_tin_ve(' + id_suat_chieu + ', ' + id_ghe_ngoi + ')',
      {
        type: QueryTypes.CALL,
      },
    )
  }
}

export default VeBanRepository
