import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface GheNgoiRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  getGheDaMua(idSuatChieu: number)
  getGheChuaMua(idSuatChieu: number)
  getGheDangChon(idSuatChieu: number)
}
