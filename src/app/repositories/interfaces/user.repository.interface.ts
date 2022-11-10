import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface UserRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  findByEmail(email: string)
  findOrCreateByEmail(email: string, password: string)
  findByAddress(address: string): Promise<M>
}
