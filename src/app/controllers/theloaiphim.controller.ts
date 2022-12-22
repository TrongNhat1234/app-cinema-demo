import TheLoaiPhim from '@models/entities/theloaiphim.entity'
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
import TheLoaiPhimRepository from '@repositories/theloaiphim.repository'

import { AdminMiddleware } from '@middlewares/admin.middleware'
import { AuthRequest } from '@interfaces/response.interface'
import {
  plainToInstance,
  plainToClass,
  classToPlain,
  instanceToPlain,
  serialize,
} from 'class-transformer'

@JsonController('/theloaiphims')
@Service()
export class TheLoaiPhimsController extends BaseController {
  constructor(protected TheLoaiPhimRepository: TheLoaiPhimRepository) {
    super()
  }

  @Get('/list')
  async getTheLoaiPhim(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllTheLoaiPhimsData = await this.TheLoaiPhimRepository.getAll()
      return this.setCode(200)
        .setData(findAllTheLoaiPhimsData)
        .setMessage('Success')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @Get('/id_phim=:id_phim')
  async getTheLoaiPhimIdPhim(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const id_phim = req.params.id_phim
      const findAllTheLoaiPhimsData = await this.TheLoaiPhimRepository.findByIdPhim(id_phim)
      return this.setCode(200)
        .setData(findAllTheLoaiPhimsData)
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

export default TheLoaiPhimsController
