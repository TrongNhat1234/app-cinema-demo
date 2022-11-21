import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export type VeBanRepositoryInterface<M extends Model> = BaseRepositoryInterface
