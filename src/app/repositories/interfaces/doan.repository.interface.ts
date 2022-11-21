import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export type DoAnRepositoryInterface<M extends Model> = BaseRepositoryInterface
