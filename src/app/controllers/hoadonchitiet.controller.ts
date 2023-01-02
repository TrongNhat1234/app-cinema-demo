import HoaDonChiTiet from '@models/entities/hoadonchitiet.entity'
import { CreateDto } from '../../dtos/hoadonchitiet.dto'
import NhanVienRepository from '@repositories/nhanvien.repository'
import { NhanVien } from '@models/entities/nhanvien.entity'
import jwt from 'jsonwebtoken'

import { verifyToken } from '@utils/token'

import { isEmpty } from '../../common/utils/util'

import {
  Authorized,
  CurrentUser,
  Get,
  JsonController,
  Param,
  Put,
  Post,
  Req,
  Res,
  UseBefore,
} from 'routing-controllers'
import { NextFunction, Response, Request } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import HoaDonChiTietRepository from '@repositories/hoadonchitiet.repository'
import { env } from '@env'

import { NVMiddleware } from '@middlewares/nv.middleware'
import { AuthRequest } from '@interfaces/response.interface'
import {
  plainToInstance,
  plainToClass,
  classToPlain,
  instanceToPlain,
  serialize,
} from 'class-transformer'

@JsonController('/hoadonchitiets')
@Service()
export class HoaDonChiTietsController extends BaseController {
  constructor(protected HoaDonChiTietRepository: HoaDonChiTietRepository) {
    super()
  }

  @UseBefore(NVMiddleware)
  @Get('/list/id')
  async getHoaDonChiTiet(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const id = req.query.id_hoa_don_do_an
      const findAllHoaDonChiTietsData = await this.HoaDonChiTietRepository.findbyidhoadon(id)
      return this.setCode(200)
        .setData(findAllHoaDonChiTietsData)
        .setMessage('Success')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @UseBefore(NVMiddleware)
  @Post('/create')
  async createPhim(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: CreateDto = req.body
      const HoaDonChiTietxoa = await this.HoaDonChiTietRepository.findbyidhoadondoan(
        data.id_hoa_don_do_an,
        data.id_do_an,
      )
      console.log(HoaDonChiTietxoa)

      if (isEmpty(HoaDonChiTietxoa)) {
        const HoaDonChiTiet = await this.HoaDonChiTietRepository.createHoaDonChiTiet(data)
      } else {
        const HoaDonChiTiet = await this.HoaDonChiTietRepository.updateHoaDonChiTietCreate(data)
      }

      return this.setCode(200)
        .setData(data)
        .setMessage('Create hoa don chi tiet successfully')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @UseBefore(NVMiddleware)
  @Put('/update')
  async updateHoaDonChiTiet(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: CreateDto = req.body
      const HoaDonChiTiet = await this.HoaDonChiTietRepository.updateHoaDonChiTiet(data)

      return this.setCode(200)
        .setData(data)
        .setMessage('update hoa don chi tiet successfully')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @UseBefore(NVMiddleware)
  @Put('/delete')
  async deleteHoaDonChiTiet(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data = {
        id_hoa_don_do_an: parseInt(req.query.id_hoa_don_do_an, 10),
        id_do_an: parseInt(req.query.id_do_an, 10),
      }
      const HoaDonChiTiet = await this.HoaDonChiTietRepository.deleteHoaDonChiTiet(data)

      return this.setCode(200)
        .setData(data)
        .setMessage('delete hoa don chi tiet successfully')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }
}

export default HoaDonChiTietsController
