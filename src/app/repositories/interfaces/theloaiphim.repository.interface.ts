import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface TheLoaiPhimRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  findByIdPhim(id_phim: number)
  createTheLoaiPhim(id_phim: number, id_the_loai: number)
}
