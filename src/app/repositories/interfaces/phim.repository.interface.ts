import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface PhimRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
  createPhim(object: any)
  getPhimDangChieu()
  getPhimSapChieu()
  getPhimSuatChieuNgay(id_phim: number, ngay_chieu: Date)
  doanhThuPhim(object: any)
  tyLeBanVeCuaPhim(object: any)
  PhimGanNhat()
  timKiemPhimTheoTen(ten_phim: string)
}
