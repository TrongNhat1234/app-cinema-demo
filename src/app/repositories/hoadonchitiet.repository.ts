import HoaDonChiTiet from '@models/entities/hoadonchitiet.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { HoaDonChiTietRepositoryInterface } from './interfaces/hoadonchitiet.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class HoaDonChiTietRepository
  extends BaseRepository<HoaDonChiTiet>
  implements HoaDonChiTietRepositoryInterface<HoaDonChiTiet>
{
  constructor(@ModelContainer(HoaDonChiTiet.tableName) HoaDonChiTiet: ModelCtor<HoaDonChiTiet>) {
    super(HoaDonChiTiet)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }
  async findbyidhoadon(id_hoa_don_do_an: number) {
    return await DB.sequelize.query('call list_hoa_don_chi_tiet(' + id_hoa_don_do_an + ')', {
      type: QueryTypes.CALL,
    })
  }

  async findbyidhoadondoan(id_hoa_don_do_an: number, id_do_an: number) {
    return await DB.sequelize.query(
      'SELECT * FROM ' +
        this.modelName() +
        ' where is_delete = 1 and id_hoa_don_do_an = ' +
        id_hoa_don_do_an +
        ' and id_do_an = ' +
        id_do_an,
      {
        type: QueryTypes.SELECT,
      },
    )
  }

  async createHoaDonChiTiet(object: any) {
    const a = await DB.sequelize.query(
      'INSERT INTO ' +
        this.modelName() +
        ' ( id_hoa_don_do_an,id_do_an,so_luong,created_at,updated_at) VALUES (' +
        object.id_hoa_don_do_an +
        ',' +
        object.id_do_an +
        ',' +
        object.so_luong +
        ',NOW(),NOW())',
      {
        type: QueryTypes.INSERT,
      },
    )
    return a
  }

  async updateHoaDonChiTiet(object: any) {
    const a = await DB.sequelize.query(
      'UPDATE ' +
        this.modelName() +
        ' set updated_at = NOW(),so_luong = ' +
        object.so_luong +
        ' where id_hoa_don_do_an = ' +
        object.id_hoa_don_do_an +
        ' and id_do_an = ' +
        object.id_do_an,
      {
        type: QueryTypes.UPDATE,
      },
    )
    return a
  }

  async updateHoaDonChiTietCreate(object: any) {
    const a = await DB.sequelize.query(
      'UPDATE ' +
        this.modelName() +
        ' set updated_at = NOW(),is_delete = 0 ,so_luong = ' +
        object.so_luong +
        ' where id_hoa_don_do_an = ' +
        object.id_hoa_don_do_an +
        ' and id_do_an = ' +
        object.id_do_an,
      {
        type: QueryTypes.UPDATE,
      },
    )
    return a
  }

  async deleteHoaDonChiTiet(object: any) {
    const a = await DB.sequelize.query(
      'UPDATE ' +
        this.modelName() +
        ' set updated_at = NOW(),is_delete = 1 where id_hoa_don_do_an = ' +
        object.id_hoa_don_do_an +
        ' and id_do_an = ' +
        object.id_do_an,
      {
        type: QueryTypes.UPDATE,
      },
    )
    return a
  }
}

export default HoaDonChiTietRepository
