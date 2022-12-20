import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface PhimRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  createPhim(object: any)
}
