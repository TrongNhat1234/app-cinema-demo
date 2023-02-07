import KhachHang from '@models/entities/khachhang.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { KhachHangRepositoryInterface } from './interfaces/khachhang.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from './../../common/utils/util'

@Service({ global: true })
class KhachHangRepository
  extends BaseRepository<KhachHang>
  implements KhachHangRepositoryInterface<KhachHang>
{
  constructor(@ModelContainer(KhachHang.tableName) KhachHang: ModelCtor<KhachHang>) {
    super(KhachHang)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }

  async findBySoDienThoai(so_dien_thoai: string) {
    return await DB.sequelize.query(
      'SELECT * FROM ' +
        this.modelName() +
        " where is_delete = 0 and so_dien_thoai = '" +
        so_dien_thoai +
        "'",
      {
        type: QueryTypes.SELECT,
      },
    )
  }
  async getVeCuaKhachHang(id: number) {
    const listve = await DB.sequelize.query('call ve_cua_khach_hang(' + id + '  )', {
      type: QueryTypes.CALL,
    })
    return listve
  }

  async findOrCreateByEmail(so_dien_thoai: string, password: string) {
    console.log(this.modelName())
    const customer = await DB.sequelize.query(
      'SELECT * FROM ' +
        this.modelName() +
        " WHERE so_dien_thoai = '" +
        so_dien_thoai +
        "' and  mat_khau = '" +
        password +
        "'",
      { type: QueryTypes.SELECT },
    )
    if (!isEmpty(customer)) {
      return customer
    } else {
      return await DB.sequelize.query(
        'INSERT INTO ' +
          this.modelName() +
          " (so_dien_thoai, mat_khau,created_at,updated_at) VALUES ('" +
          so_dien_thoai +
          "', '" +
          password +
          "',NOW(),NOW())",
        // "INSERT INTO `users` (email, password) VALUES('" + email + "','" + password + "')",
        {
          type: QueryTypes.INSERT,
        },
      )
    }
  }
}

export default KhachHangRepository
