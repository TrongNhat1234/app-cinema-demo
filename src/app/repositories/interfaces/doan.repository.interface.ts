import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface DoAnRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  createDoAn(object: any)
}
