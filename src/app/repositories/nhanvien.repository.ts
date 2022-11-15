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

  async findByEmail(email: string) {
    return await DB.sequelize.query("SELECT * FROM `users` WHERE email = '" + email + "'", {
      type: QueryTypes.SELECT,
    })
  }

  async findByEmailPassWord(email: string, password: string) {
    const nhanvien = await DB.sequelize.query(
      "SELECT * FROM `nhanviens` WHERE email = '" + email + "' and  matKhau = '" + password + "'",
      { type: QueryTypes.SELECT },
    )
    return nhanvien
  }
}

export default NhanVienRepository
