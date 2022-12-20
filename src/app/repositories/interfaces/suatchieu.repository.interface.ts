import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'
export interface SuatChieuRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  createSuatChieu(object: any)
  getAllNgay()
  updateSuatChieu(object: any)
}
