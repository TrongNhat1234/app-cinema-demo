import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface NhanVienRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  findByEmail(email: string)
  findByEmailPassWord(email: string, password: string)
}
