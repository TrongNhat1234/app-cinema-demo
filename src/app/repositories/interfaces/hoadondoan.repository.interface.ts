import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface HoaDonDoAnRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  createHoaDonDoAn(id_nhan_vien: number, giam_gia: number)
}
