import { NhanVien } from '@models/entities/nhanvien.entity'
import { KhachHang } from '@models/entities/khachhang.entity'

import { isEmpty } from './../../common/utils/util'
import VeBan from '@models/entities/veban.entity'

import {
  Authorized,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Put,
  Req,
  Res,
  UseBefore,
} from 'routing-controllers'
import { NextFunction, Response, Request } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import VeBanRepository from '@repositories/veban.repository'
import NhanVienRepository from '@repositories/nhanvien.repository'
import KhachHangRepository from '@repositories/khachhang.repository'

import { NVMiddleware } from '@middlewares/nv.middleware'
import { AuthMiddleware } from '@middlewares/authkh.middleware'

import { UpdateDto } from '../../dtos/veban.dto'
import { verifyToken } from '@utils/token'
import jwt from 'jsonwebtoken'
import { env } from '@env'

import { AdminMiddleware } from '@middlewares/admin.middleware'
import { AuthRequest } from '@interfaces/response.interface'
import {
  plainToInstance,
  plainToClass,
  classToPlain,
  instanceToPlain,
  serialize,
} from 'class-transformer'

@JsonController('/vebans')
@Service()
export class VeBansController extends BaseController {
  constructor(protected VeBanRepository: VeBanRepository) {
    super()
  }

  @Get('/list')
  async getVeBan(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllVeBansData = await this.VeBanRepository.getAll()
      return this.setCode(200).setData(findAllVeBansData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @Get('/')
  async getVeBanIdPhim(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const id_ve_ban = req.query.id_ve_ban
      const findAllVeBansData = await this.VeBanRepository.findById(id_ve_ban)
      return this.setCode(200).setData(findAllVeBansData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @Get('/xacnhanthongtinve')
  async xacNhanThongTinVe(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const id_suat_chieu = req.query.id_suat_chieu
      const id_ghe_ngoi = req.query.id_ghe_ngoi

      const findAllVeBansData = await this.VeBanRepository.xacNhanThongTinVe(
        id_suat_chieu,
        id_ghe_ngoi,
      )
      const a = []
      for (let i = 0; i < findAllVeBansData.length; i++) {
        a.push(findAllVeBansData[i].ten_the_loai)
      }
      console.log(a)
      const data = {
        ten_phim: findAllVeBansData[0].ten_phim,
        ten_the_loai: a,
        ten_phong_chieu: findAllVeBansData[0].ten_phong_chieu,
        day_so: findAllVeBansData[0].day_so,
        hang_so: findAllVeBansData[0].hang_so,
        ten_dinh_dang: findAllVeBansData[0].ten_dinh_dang,
        gio_bat_dau: findAllVeBansData[0].gio_bat_dau,
        gio_ket_thuc: findAllVeBansData[0].gio_ket_thuc,
        thoi_luong_phim: findAllVeBansData[0].thoi_luong_phim,
      }
      return this.setCode(200).setData(data).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @Get('/xacnhanthongtinve2')
  async xacNhanThongTinVe2(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      let data = {}
      console.log(data)
      const list_id_ghe_ngoi = req.query.id_ghe_ngoi
      const id_suat_chieu = req.query.id_suat_chieu
      const ghe = []
      const listghe = list_id_ghe_ngoi.split(',')
      const a = []
      for (let i = 0; i < listghe.length; ++i) {
        const findAllVeBansData = await this.VeBanRepository.xacNhanThongTinVe(
          id_suat_chieu,
          listghe[i],
        )
        if (i == 0) {
          for (let i2 = 0; i2 < findAllVeBansData.length; i2++) {
            a.push(findAllVeBansData[i2].ten_the_loai)
          }
        }
        const b = []
        console.log(findAllVeBansData[0].hang_so)
        b.push(findAllVeBansData[0].hang_so)
        b.push(findAllVeBansData[0].day_so)
        ghe.push(b)
        const c = listghe.length - 1
        if (i == c) {
          data = {
            ten_phim: findAllVeBansData[0].ten_phim,
            ten_the_loai: a,
            ten_phong_chieu: findAllVeBansData[0].ten_phong_chieu,
            ghe_so: ghe,
            ten_dinh_dang: findAllVeBansData[0].ten_dinh_dang,
            gio_bat_dau: findAllVeBansData[0].gio_bat_dau,
            gio_ket_thuc: findAllVeBansData[0].gio_ket_thuc,
            thoi_luong_phim: findAllVeBansData[0].thoi_luong_phim,
          }
        }
      }
      console.log(data)
      return this.setCode(200).setData(data).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @UseBefore(AuthMiddleware)
  @Put('/updatekh')
  async DatVeVeBanKH(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: UpdateDto = req.body
      for (let i = 0; i < data.id_ghe_ngoi.length; i++) {
        const status = await this.VeBanRepository.checkTrangThai(
          data.id_suat_chieu,
          data.id_ghe_ngoi[i],
        )
        console.log(status[0].trang_thai)
        if (status[0].trang_thai != 1 && !isEmpty(status[0].id_khach_hang)) {
          const data2 = {
            id_suat_chieu: data.id_suat_chieu,
            id_ghe_ngoi: data.id_ghe_ngoi[i],
          }
          const DatVeVeBanNV = await this.VeBanRepository.DatVeVeBanNV(data2)
        } else {
          return this.setData({})
            .setCode(500)
            .setMessage('Ve da duoc mua hoac dang xem')
            .responseErrors(res)
        }
      }
      return this.setCode(200)
        .setData(data)
        .setMessage('Them moi ve ban successfully')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @UseBefore(NVMiddleware)
  @Put('/updatenv')
  async DatVeVeBanNV(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data = req.body
      for (let i = 0; i < data.id_ghe_ngoi.length; i++) {
        const status = await this.VeBanRepository.checkTrangThai(
          data.id_suat_chieu,
          data.id_ghe_ngoi[i],
        )
        console.log(status[0].trang_thai)
        if (status[0].trang_thai != 1 && !isEmpty(status[0].id_nhan_vien)) {
          const data2 = {
            id_suat_chieu: data.id_suat_chieu,
            id_ghe_ngoi: data.id_ghe_ngoi[i],
          }
          const DatVeVeBanNV = await this.VeBanRepository.DatVeVeBanNV(data2)
        } else {
          return this.setData({})
            .setCode(500)
            .setMessage('Ve da duoc mua hoac dang xem')
            .responseErrors(res)
        }
      }
      return this.setCode(200)
        .setData(data)
        .setMessage('Them moi ve ban successfully')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @UseBefore(NVMiddleware)
  @Put('/updateghedangxemnhanvien')
  async DangXemNhanVien(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim()
      const email = await jwt.verify(accessToken, env.app.jwt_secret as jwt.Secret).email
      const nv = await new NhanVienRepository(NhanVien).findByEmailRole(email)
      const id_nhan_vien = nv[0].id
      const id_suat_chieu = req.body.id_suat_chieu
      const id_ghe_ngoi = req.body.id_ghe_ngoi
      const data = {
        id_nhan_vien,
        id_suat_chieu,
        id_ghe_ngoi,
      }
      const check = await this.VeBanRepository.checkTrangThai(id_suat_chieu, id_ghe_ngoi)
      if (isEmpty(check[0].id_khach_hang) && check[0].id_nhan_vien == id_nhan_vien) {
        await this.VeBanRepository.ChonGheNhanVien(id_suat_chieu, id_ghe_ngoi, id_nhan_vien)
        return this.setCode(200)
          .setData(data)
          .setMessage('Chon ghe Nhan Vien successfully')
          .responseSuccess(res)
      } else if (isEmpty(check[0].id_khach_hang) && isEmpty(check[0].id_nhan_vien)) {
        await this.VeBanRepository.ChonGheNhanVien(id_suat_chieu, id_ghe_ngoi, id_nhan_vien)
        return this.setCode(200)
          .setData(data)
          .setMessage('Chon ghe Nhan Vien successfully')
          .responseSuccess(res)
      } else {
        return this.setData({})
          .setCode(500)
          .setMessage('loi! Ghe Dang Duoc Xem')
          .responseErrors(res)
      }
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @UseBefore(AuthMiddleware)
  @Put('/updateghedangxemkhachhang')
  async DangXemKhachHang(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim()
      const so_dien_thoai = await jwt.verify(accessToken, env.app.jwt_secret as jwt.Secret)
      const kh = await new KhachHangRepository(KhachHang).findBySoDienThoai(
        so_dien_thoai.so_dien_thoai,
      )
      const id_khach_hang = kh[0].id
      const id_suat_chieu = req.body.id_suat_chieu
      const id_ghe_ngoi = req.body.id_ghe_ngoi
      const data = {
        id_khach_hang,
        id_suat_chieu,
        id_ghe_ngoi,
      }
      const check = await this.VeBanRepository.checkTrangThai(id_suat_chieu, id_ghe_ngoi)
      if (isEmpty(check[0].id_nhan_vien) && check[0].id_khach_hang == id_khach_hang) {
        await this.VeBanRepository.ChonGheKhachHang(id_suat_chieu, id_ghe_ngoi, id_khach_hang)
        return this.setCode(200)
          .setData(data)
          .setMessage('Chon ghe Khach Hang successfully')
          .responseSuccess(res)
      } else if (isEmpty(check[0].id_nhan_vien) && isEmpty(check[0].id_khach_hang)) {
        await this.VeBanRepository.ChonGheKhachHang(id_suat_chieu, id_ghe_ngoi, id_khach_hang)
        return this.setCode(200)
          .setData(data)
          .setMessage('Chon ghe KhacHang successfully')
          .responseSuccess(res)
      } else {
        return this.setData({})
          .setCode(500)
          .setMessage('loi! Ghe Dang Duoc Xem')
          .responseErrors(res)
      }
      console.log(data)
      await this.VeBanRepository.ChonGheKhachHang(id_suat_chieu, id_ghe_ngoi, id_khach_hang)
      return this.setCode(200)
        .setData(data)
        .setMessage('Chon ghe khach hang successfully')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }
}

export default VeBansController
