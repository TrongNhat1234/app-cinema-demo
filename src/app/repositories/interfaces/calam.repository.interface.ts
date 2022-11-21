import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export type CaLamRepositoryInterface<M extends Model> = BaseRepositoryInterface
