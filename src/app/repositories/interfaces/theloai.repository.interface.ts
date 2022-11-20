import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export type TheLoaiRepositoryInterface<M extends Model> = BaseRepositoryInterface
