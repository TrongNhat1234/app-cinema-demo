import { ModelCtor } from 'sequelize-typescript'

import DB from '@models/index'
import LoaiGhe from '@models/entities/loaighe.entity'
import PhongChieu from '@models/entities/phongchieu.entity'
import GheNgoi from '@models/entities/ghengoi.entity'
import Phim from '@models/entities/phim.entity'
import TheLoai from '@models/entities/theloai.entity'
import TheLoaiPhim from '@models/entities/theloaiphim.entity'
import NhanVien from '@models/entities/nhanvien.entity'
import CaLam from '@models/entities/calam.entity'
import CaLamNhanVien from '@models/entities/calamnhanvien.entity'
import DinhDangPhim from '@models/entities/dinhdangphim.entity'
import XuatChieu from '@models/entities/xuatchieu.entity'
import DoAn from '@models/entities/doan.entity'
import HoaDonDoAn from '@models/entities/hoadondoan.entity'
import HoaDonChiTiet from '@models/entities/hoadonchitiet.entity'
import KhachHang from '@models/entities/khachhang.entity'
import GiaVe from '@models/entities/giave.entity'
import VeBan from '@models/entities/veban.entity'

export function getModelFromTableName(tableName: string): ModelCtor | undefined {
  let item = undefined
  switch (tableName) {
    case LoaiGhe.tableName:
      item = DB.sequelize.model(LoaiGhe)
      break
    case PhongChieu.tableName:
      item = DB.sequelize.model(PhongChieu)
      break
    case GheNgoi.tableName:
      item = DB.sequelize.model(GheNgoi)
      break
    case Phim.tableName:
      item = DB.sequelize.model(Phim)
      break
    case TheLoai.tableName:
      item = DB.sequelize.model(TheLoai)
      break
    case TheLoaiPhim.tableName:
      item = DB.sequelize.model(TheLoaiPhim)
      break
    case NhanVien.tableName:
      item = DB.sequelize.model(NhanVien)
      break
    case CaLam.tableName:
      item = DB.sequelize.model(CaLam)
      break
    case CaLamNhanVien.tableName:
      item = DB.sequelize.model(CaLamNhanVien)
      break
    case DinhDangPhim.tableName:
      item = DB.sequelize.model(DinhDangPhim)
      break
    case XuatChieu.tableName:
      item = DB.sequelize.model(XuatChieu)
      break
    case DoAn.tableName:
      item = DB.sequelize.model(DoAn)
      break
    case HoaDonDoAn.tableName:
      item = DB.sequelize.model(HoaDonDoAn)
      break
    case HoaDonChiTiet.tableName:
      item = DB.sequelize.model(HoaDonChiTiet)
      break
    case KhachHang.tableName:
      item = DB.sequelize.model(KhachHang)
      break
    case GiaVe.tableName:
      item = DB.sequelize.model(GiaVe)
      break
    case VeBan.tableName:
      item = DB.sequelize.model(VeBan)
      break

    default:
      item = undefined
      break
  }
  return item
}
