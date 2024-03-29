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

  async findByEmailRole(email: string) {
    return await DB.sequelize.query(
      'SELECT id FROM ' + this.modelName() + " WHERE email = '" + email + "' and vai_tro='nv'",
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

  async createNV(object: any) {
    const a = await DB.sequelize.query(
      'INSERT INTO ' +
        this.modelName() +
        " (vai_tro, mat_khau,gioi_tinh,ngay_vao_lam,email,dia_chi,ngay_sinh,ho_ten,created_at,updated_at) VALUES ('" +
        object.vai_tro +
        "', '" +
        object.mat_khau +
        "', " +
        object.gioi_tinh +
        ", '" +
        object.ngay_vao_lam +
        "', '" +
        object.email +
        "', '" +
        object.dia_chi +
        "', '" +
        object.ngay_sinh +
        "', '" +
        object.ho_ten +
        "',NOW(),NOW())",
      {
        type: QueryTypes.INSERT,
      },
    )
    return a
  }
}

export default NhanVienRepository
