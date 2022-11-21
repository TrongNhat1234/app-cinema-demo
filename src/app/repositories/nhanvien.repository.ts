import NhanVien from '@models/entities/nhanvien.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { NhanVienRepositoryInterface } from './interfaces/nhanvien.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'
import { env } from '@env'
const { QueryTypes } = require('sequelize')
import DB from '@models/index'
import { isEmpty } from 'class-validator'

@Service({ global: true })
class NhanVienRepository
  extends BaseRepository<NhanVien>
  implements NhanVienRepositoryInterface<NhanVien>
{
  constructor(@ModelContainer(NhanVien.tableName) NhanVien: ModelCtor<NhanVien>) {
    super(NhanVien)
  }

  modelName = function () {
    const nameModel: string = this.model.toString().split(' ')[1].toLowerCase() + 's'
    return nameModel
  }

  async findByEmail(email: string) {
    return await DB.sequelize.query(
      'SELECT * FROM ' + this.modelName() + " WHERE email = '" + email + "'",
      {
        type: QueryTypes.SELECT,
      },
    )
  }

  async findByEmailPassWord(email: string, password: string) {
    const nhanvien = await DB.sequelize.query(
      'SELECT * FROM ' +
        this.modelName() +
        " WHERE email = '" +
        email +
        "' and mat_khau = '" +
        password +
        "'",
      { type: QueryTypes.SELECT },
    )
    return nhanvien
  }
}

export default NhanVienRepository
