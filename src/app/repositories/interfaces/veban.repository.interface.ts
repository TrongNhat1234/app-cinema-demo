import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface VeBanRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  DatVeVeBanNV(data: any)
}
