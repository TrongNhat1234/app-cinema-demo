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
          " (so_dien_thoai, mat_khau) VALUES ('" +
          so_dien_thoai +
          "', '" +
          password +
          "')",
        // "INSERT INTO `users` (email, password) VALUES('" + email + "','" + password + "')",
        {
          type: QueryTypes.INSERT,
        },
      )
    }
  }
}

export default KhachHangRepository
