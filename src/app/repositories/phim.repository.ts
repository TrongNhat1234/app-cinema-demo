import { Phim } from '@models/entities/phim.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { PhimRepositoryInterface } from './interfaces/phim.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class PhimRepository extends BaseRepository<Phim> implements PhimRepositoryInterface<Phim> {
  constructor(@ModelContainer(Phim.tableName) Phim: ModelCtor<Phim>) {
    super(Phim)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }

  async createPhim(object: any) {
    const a = await DB.sequelize.query(
      'INSERT INTO ' +
        this.modelName() +
        " (ten_phim, thoi_luong_phim,gioi_han_tuoi,ngay_cong_chieu) VALUES ('" +
        object.ten_phim +
        "', '" +
        object.thoi_luong_phim +
        "', " +
        object.gioi_han_tuoi +
        ",'" +
        object.ngay_cong_chieu +
        "')",
      {
        type: QueryTypes.INSERT,
      },
    )
    return a
  }

  async getPhimDangChieu() {
    const phims = await DB.sequelize.query(
      'SELECT * FROM ' +
        this.modelName() +
        ' where id in (select distinct id_phim FROM cinema.suatchieus where (DATE(NOW()) - ngay_chieu) <=15)',
      { type: QueryTypes.SELECT },
    )
    return phims
  }

  async getPhimSapChieu() {
    const phims = await DB.sequelize.query(
      'SELECT * FROM ' + this.modelName() + ' where (DATE(NOW()) - DATE(ngay_cong_chieu)) <= 0',
      { type: QueryTypes.SELECT },
    )
    return phims
  }

  async getPhimSuatChieuNgay(id: number, ngay_chieu: Date) {
    const phims = await DB.sequelize.query(
      'call phim_suatchieu_ngay(' + id + ', ' + ngay_chieu + '  )',
      { type: QueryTypes.CALL },
    )
    return phims
  }
}

export default PhimRepository
