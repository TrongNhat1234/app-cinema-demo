import { SuatChieu } from '@models/entities/suatchieu.entity'
import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'
export interface SuatChieuRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  createSuatChieu(object: any)
  getAllNgay()
  updateSuatChieu(object: any)
  suatChieuTheoIdPhim(id_phim: number)
}
