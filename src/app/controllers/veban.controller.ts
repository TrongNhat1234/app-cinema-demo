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

  @Get('/id_ve_ban=:id_ve_ban')
  async getVeBanIdPhim(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const id_ve_ban = req.params.id_ve_ban
      const findAllVeBansData = await this.VeBanRepository.findById(id_ve_ban)
      return this.setCode(200).setData(findAllVeBansData).setMessage('Success').responseSuccess(res)
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
      const data: UpdateDto = req.body
      if (isEmpty(data.id_khach_hang)) {
        data.id_khach_hang = null
      }
      const status = (await this.VeBanRepository.findById(data.id)).trang_thai
      if (status != 1) {
        const DatVeVeBanNV = await this.VeBanRepository.DatVeVeBanNV(data)
        return this.setCode(200)
          .setData(data)
          .setMessage('Them moi ve ban successfully')
          .responseSuccess(res)
      } else {
        return this.setData({})
          .setCode(500)
          .setMessage('Ve da duoc mua hoac dang xem')
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
  @Put('/updatekh')
  async DatVeVeBanKH(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim()
      const so_dien_thoai = await jwt.verify(accessToken, env.app.jwt_secret as jwt.Secret)
      const kh = await new KhachHangRepository(KhachHang).findBySoDienThoai(
        so_dien_thoai.so_dien_thoai,
      )
      const data: UpdateDto = {
        id: req.body.id,
        id_khach_hang: kh[0].id,
      }
      console.log(data)
      const status = (await this.VeBanRepository.findById(data.id)).trang_thai
      if (status != 1) {
        const DatVeVeBanNV = await this.VeBanRepository.DatVeVeBanNV(data)
        return this.setCode(200)
          .setData(data)
          .setMessage('Them moi ve ban successfully')
          .responseSuccess(res)
      } else {
        return this.setData({})
          .setCode(500)
          .setMessage('Ve da duoc mua hoac dang xem')
          .responseErrors(res)
      }
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }
}

export default VeBansController
