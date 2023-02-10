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
        " (ten_phim, thoi_luong_phim,gioi_han_tuoi,ngay_cong_chieu,created_at,updated_at) VALUES ('" +
        object.ten_phim +
        "', '" +
        object.thoi_luong_phim +
        "', " +
        object.gioi_han_tuoi +
        ",'" +
        object.ngay_cong_chieu +
        "',NOW(),NOW())",
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
        ' where id in (select distinct id_phim FROM cinema.suatchieus where  ngay_chieu >=  DATE(NOW()))',
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

  async getPhimSuatChieuNgay(id_phim: number, ngay_chieu: Date) {
    const suatchieus = await DB.sequelize.query(
      'call phim_suatchieu_ngay(' + id_phim + ",' " + ngay_chieu + "'  )",
      { type: QueryTypes.CALL },
    )
    return suatchieus
  }
  async doanhThuPhim(object: any) {
    const phims = await DB.sequelize.query(
      "call bao_cao_doanhthu_phim('" +
        object.ngay_bat_dau +
        "',' " +
        object.ngay_ket_thuc +
        "'," +
        object.id_phim +
        ' )',
      { type: QueryTypes.CALL },
    )
    return phims
  }
}

export default PhimRepository
