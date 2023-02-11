import TheLoaiPhimRepository from '@repositories/theloaiphim.repository'
import { TheLoaiPhim } from '@models/entities/theloaiphim.entity'
import { Phim } from '@models/entities/phim.entity'
import { isEmpty } from './../../common/utils/util'

import {
  Authorized,
  CurrentUser,
  Post,
  Get,
  JsonController,
  Param,
  Put,
  Delete,
  Req,
  Res,
  UseBefore,
} from 'routing-controllers'
import { NextFunction, Response, Request } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import PhimRepository from '@repositories/phim.repository'
import { CreateDto } from '../../dtos/phim.dto'
import { AdminMiddleware } from '@middlewares/admin.middleware'
import { AuthRequest } from '@interfaces/response.interface'
import {
  plainToInstance,
  plainToClass,
  classToPlain,
  instanceToPlain,
  serialize,
} from 'class-transformer'

@JsonController('/phims')
@Service()
export class PhimsController extends BaseController {
  constructor(protected PhimRepository: PhimRepository) {
    super()
  }

  @Get('/list')
  async getTheLoai(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllTheLoaisData = await this.PhimRepository.getAll()
      return this.setCode(200)
        .setData(findAllTheLoaisData)
        .setMessage('Success')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @Get('/doanhthuphim')
  async doanhThu(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const data = req.query
      let data1
      if (data.id_phim == null) {
        data1 = {
          ngay_bat_dau: data.ngay_bat_dau,
          ngay_ket_thuc: data.ngay_ket_thuc,
          id_phim: 'null',
        }
      } else {
        data1 = data
      }
      const doanhThu = await this.PhimRepository.doanhThuPhim(data1)
      console.log(doanhThu)
      let sum = 0
      for (let i = 0; i < doanhThu.length; i++) {
        sum = sum + doanhThu[i].doanh_thu
      }
      const data2 = [
        doanhThu,
        {
          tong_doanh_thu: sum,
        },
      ]

      return this.setCode(200).setData(data2).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @Get('/tyledoanhthuphim')
  async tyLeDoanhThu(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const data = req.query
      let data1
      if (data.id_phim == null) {
        data1 = {
          ngay_bat_dau: data.ngay_bat_dau,
          ngay_ket_thuc: data.ngay_ket_thuc,
          id_phim: 'null',
        }
      } else {
        data1 = data
      }

      const doanhThu = await this.PhimRepository.tyLeBanVeCuaPhim(data1)
      return this.setCode(200).setData(doanhThu).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @Get('/listphimdangchieus')
  async getDangChieu(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllPhimData = await this.PhimRepository.getPhimDangChieu()
      return this.setCode(200).setData(findAllPhimData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @Get('/listphimsapchieus')
  async getListSapChieus(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllPhimData = await this.PhimRepository.getPhimSapChieu()
      return this.setCode(200).setData(findAllPhimData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @Get('/listphimsuatchieungays')
  async getPhimSuatChieuNgay(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const id_phim = req.query.id_phim
      const ngayChieu = req.query.ngay_chieu
      const findAllPhimData = await this.PhimRepository.getPhimSuatChieuNgay(id_phim, ngayChieu)
      console.log(findAllPhimData)
      return this.setCode(200).setData(findAllPhimData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @UseBefore(AdminMiddleware)
  @Post('/create')
  async createPhim(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: CreateDto = req.body
      const data2 = {
        ten_phim: data.ten_phim,
        thoi_luong_phim: data.thoi_luong_phim,
        gioi_han_tuoi: data.gioi_han_tuoi,
        ngay_cong_chieu: data.ngay_cong_chieu,
      }
      const Phim = await this.PhimRepository.createPhim(data2)
      const data3 = await this.PhimRepository.PhimGanNhat()
      for (let i = 0; i < data.id_the_loai.length; i++) {
        await new TheLoaiPhimRepository(TheLoaiPhim).createTheLoaiPhim(
          data3[0].id,
          data.id_the_loai[i],
        )
      }
      return this.setCode(200)
        .setData(data2)
        .setMessage('Create phims successfully')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @UseBefore(AdminMiddleware)
  @Put('/delete')
  async delete(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.body.id, 10)
      const findPhimData = await this.PhimRepository.findById(id)
      if (!isEmpty(findPhimData)) {
        const ass = await this.PhimRepository.deleteById(id)
        return this.setCode(200).setData(ass).setMessage('Success').responseSuccess(res)
      } else {
        return this.setCode(500).setMessage('id is null').responseSuccess(res)
      }
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }
}

export default PhimsController
