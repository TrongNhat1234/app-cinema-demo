import HoaDonDoAn from '@models/entities/hoadondoan.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { HoaDonDoAnRepositoryInterface } from './interfaces/hoadondoan.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class HoaDonDoAnRepository
  extends BaseRepository<HoaDonDoAn>
  implements HoaDonDoAnRepositoryInterface<HoaDonDoAn>
{
  constructor(@ModelContainer(HoaDonDoAn.tableName) HoaDonDoAn: ModelCtor<HoaDonDoAn>) {
    super(HoaDonDoAn)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }

  async hoaDonVuaTao() {
    const hoaDon = await DB.sequelize.query(
      'select*from ' + this.modelName() + ' ORDER BY created_at DESC LIMIT 1 ',
      {
        type: QueryTypes.SELECT,
      },
    )
    return hoaDon
  }

  async createHoaDonDoAn(id_nhan_vien: number) {
    const a = await DB.sequelize.query('call them_hoa_don_do_an(' + id_nhan_vien + ')', {
      type: QueryTypes.CALL,
    })
    return a
  }

  async doanhThuDoAn(object: any) {
    const hddoans = await DB.sequelize.query(
      "call bao_cao_doanhthu_doan_ngay('" +
        object.ngay_bat_dau +
        "',' " +
        object.ngay_ket_thuc +
        "')",
      { type: QueryTypes.CALL },
    )
    return hddoans
  }
}

export default HoaDonDoAnRepository
