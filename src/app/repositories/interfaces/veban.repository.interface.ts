import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface VeBanRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  DatVeVeBanNV(data: any)
  checkTrangThai(id_suat_chieu: number, id_ghe_ngoi: number)
  xacNhanThongTinVe(id_suat_chieu: number, id_ghe_ngoi: number)
  ChonGheKhachHang(id_suat_chieu: number, id_ghe_ngoi: number, id_khach_hang: number)
  ChonGheNhanVien(id_suat_chieu: number, id_ghe_ngoi: number, id_nhan_vien: number)
}
