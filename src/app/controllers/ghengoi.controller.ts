import { GheNgoi } from '@models/entities/ghengoi.entity'
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
import { NextFunction, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import GheNgoiRepository from '@repositories/ghengoi.repository'

import { AdminMiddleware } from '@middlewares/admin.middleware'
import { AuthRequest } from '@interfaces/response.interface'
import {
  plainToInstance,
  plainToClass,
  classToPlain,
  instanceToPlain,
  serialize,
} from 'class-transformer'

@JsonController('/ghengois')
@Service()
export class GheNgoisController extends BaseController {
  constructor(protected GheNgoiRepository: GheNgoiRepository) {
    super()
  }

  @Get('/list')
  async getTheLoai(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllGheNgoisData = await this.GheNgoiRepository.getAll()
      return this.setData(findAllGheNgoisData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @Get('/damuas')
  async getGheDaMua(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const idSuatChieu = req.body.id_suat_chieu
      const findAllGheNgoisData = await this.GheNgoiRepository.getGheDaMua(idSuatChieu)
      return this.setCode(200)
        .setData(findAllGheNgoisData)
        .setMessage('Success')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @Get('/chuamuas')
  async getGheChuaMua(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const idSuatChieu = req.body.id_suat_chieu
      const findAllGheNgoisData = await this.GheNgoiRepository.getGheChuaMua(idSuatChieu)
      return this.setCode(200)
        .setData(findAllGheNgoisData)
        .setMessage('Success')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @Get('/dangchons')
  async getGheDangChon(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const idSuatChieu = req.body.id_suat_chieu
      const findAllGheNgoisData = await this.GheNgoiRepository.getGheDangChon(idSuatChieu)
      return this.setCode(200)
        .setData(findAllGheNgoisData)
        .setMessage('Success')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }
}

export default GheNgoisController
