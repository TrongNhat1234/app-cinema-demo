import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'
export interface TheLoaiRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  FindByListId(object: any)
}
