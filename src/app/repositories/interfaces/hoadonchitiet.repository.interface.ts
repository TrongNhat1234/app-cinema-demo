import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface HoaDonChiTietRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  findbyidhoadon(id_hoa_don_do_an: number)
  findbyidhoadondoan(id_hoa_don_do_an: number, id_do_an: number)
  createHoaDonChiTiet(object: any)
  updateHoaDonChiTiet(object: any)
  updateHoaDonChiTietCreate(object: any)
  deleteHoaDonChiTiet(object: any)
}
