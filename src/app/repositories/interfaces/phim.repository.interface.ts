import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export type PhimRepositoryInterface<M extends Model> = BaseRepositoryInterface
