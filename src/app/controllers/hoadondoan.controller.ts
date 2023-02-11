import HoaDonDoAn from '@models/entities/hoadondoan.entity'
import { CreateDto } from '../../dtos/hoadondoan.dto'
import NhanVienRepository from '@repositories/nhanvien.repository'
import { NhanVien } from '@models/entities/nhanvien.entity'
import jwt from 'jsonwebtoken'

import { verifyToken } from '@utils/token'

import { isEmpty } from './../../common/utils/util'

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
import HoaDonDoAnRepository from '@repositories/hoadondoan.repository'
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

@JsonController('/hoadondoans')
@Service()
export class HoaDonDoAnsController extends BaseController {
  constructor(protected HoaDonDoAnRepository: HoaDonDoAnRepository) {
    super()
  }

  @UseBefore(NVMiddleware)
  @Get('/list')
  async getHoaDonDoAn(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllHoaDonDoAnsData = await this.HoaDonDoAnRepository.getAll()
      return this.setCode(200)
        .setData(findAllHoaDonDoAnsData)
        .setMessage('Success')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @Get('/doanhthudoan')
  async doanhThu(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const data = req.query
      const doanhThu = await this.HoaDonDoAnRepository.doanhThuDoAn(data)
      console.log(doanhThu)
      let sum = 0
      for (let i = 0; i < doanhThu.length; i++) {
        sum = sum + doanhThu[i].tongtien
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

  @UseBefore(NVMiddleware)
  @Get('/list/id')
  async getHoaDonDoAnId(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const id = req.query.id
      const findAllHoaDonDoAnsData = await this.HoaDonDoAnRepository.findById(id)
      return this.setCode(200)
        .setData(findAllHoaDonDoAnsData)
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
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim()
      const email = await jwt.verify(accessToken, env.app.jwt_secret as jwt.Secret).email
      console.log(email)
      const nv = await new NhanVienRepository(NhanVien).findByEmailRole(email)
      if (!isEmpty(nv)) {
        const data: CreateDto = {
          id_nhan_vien: nv[0].id,
          giam_gia: req.body.giam_gia,
        }
        const HoaDonDoAn = await this.HoaDonDoAnRepository.createHoaDonDoAn(
          data.id_nhan_vien,
          data.giam_gia,
        )

        const data2 = await this.HoaDonDoAnRepository.hoaDonVuaTao()
        console.log('aaa' + data2)
        return this.setCode(200)
          .setData(data2)
          .setMessage('Create hoa don do an successfully')
          .responseSuccess(res)
      } else {
        return this.setData({}).setCode(500).setMessage('Error').responseErrors(res)
      }
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }
  @UseBefore(NVMiddleware)
  @Put('/delete')
  async deleteHoaDonDoAn(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const id = req.body.id
      const HoaDonDoAn = await this.HoaDonDoAnRepository.deleteById(id)

      return this.setCode(200)
        .setData(id)
        .setMessage('delete hoa don do an successfully')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }
}

export default HoaDonDoAnsController
