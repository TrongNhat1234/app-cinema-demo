import { SuatChieu } from '@models/entities/suatchieu.entity'
import { Request, Response, NextFunction } from 'express'
import { IAccessToken, IRefreshToken } from '@interfaces/token.interface'

import {
  Authorized,
  CurrentUser,
  Get,
  Post,
  JsonController,
  Param,
  Put,
  Req,
  Res,
  UseBefore,
} from 'routing-controllers'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import SuatChieuRepository from '@repositories/suatchieu.repository'
const jwt = require('jsonwebtoken')
import { CreateDto } from '../../dtos/suatchieu.dto'

import { isEmpty } from './../../common/utils/util'

import { AdminMiddleware } from '@middlewares/admin.middleware'
import { AuthRequest } from '@interfaces/response.interface'
import {
  plainToInstance,
  plainToClass,
  classToPlain,
  instanceToPlain,
  serialize,
} from 'class-transformer'
import console from 'console'

@JsonController('/suatchieus')
@Service()
export class SuatChieusController extends BaseController {
  constructor(protected SuatChieuRepository: SuatChieuRepository) {
    super()
  }

  @Get('/list')
  async getSuatChieu(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllSuatChieusData = await this.SuatChieuRepository.getAll()
      return this.setCode(200)
        .setData(findAllSuatChieusData)
        .setMessage('Success')
        .responseSuccess(res)
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  @Get('/')
  async getSuatChieuTheoIdPhim(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const id_phim: number = req.query.id_phim
      const findAllSuatChieusData = await this.SuatChieuRepository.suatChieuTheoIdPhim(id_phim)
      return this.setCode(200)
        .setData(findAllSuatChieusData)
        .setMessage('Success')
        .responseSuccess(res)
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  @Get('/listngay')
  async getSuatChieuTheoNgay(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllSuatChieusData = await this.SuatChieuRepository.getAllNgay()
      return this.setCode(200)
        .setData(findAllSuatChieusData)
        .setMessage('Success')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @UseBefore(AdminMiddleware)
  @Post('/create')
  async createSuatChieu(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: CreateDto = req.body
      console.log(data)
      const suatchieu = await this.SuatChieuRepository.createSuatChieu(data)
      if (suatchieu[0].Message == 'Them suat chieu thanh cong') {
        return this.setCode(200)
          .setData(data)
          .setMessage('Create suatchieus successfully')
          .responseSuccess(res)
      } else {
        return this.setCode(500)
          .setData({})
          .setMessage('Khung gio nay tai phong chieu nay ngay nay da co')
          .responseSuccess(res)
      }
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @UseBefore(AdminMiddleware)
  @Put('/update')
  async delete(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data = req.body
      const id = parseInt(req.body.id, 10)
      const findSuatChieuData = await this.SuatChieuRepository.findById(id)
      if (!isEmpty(findSuatChieuData)) {
        const SuatChieu = await this.SuatChieuRepository.updateSuatChieu(data)
        return this.setCode(200)
          .setData(data)
          .setMessage('update SuatChieu Success')
          .responseSuccess(res)
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

export default SuatChieusController
