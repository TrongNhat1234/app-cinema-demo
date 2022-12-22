import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface GheNgoiRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  getGheDaMua(idPhim: number, idSuatChieu: number)
  getGheChuaMua(idPhim: number, idSuatChieu: number)
}
