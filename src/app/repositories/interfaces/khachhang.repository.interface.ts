import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface KhachHangRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  findOrCreateByEmail(so_dien_thoai: string, password: string)
  findBySoDienThoai(so_dien_thoai: string)
}
