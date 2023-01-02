import TheLoai from '@models/entities/theloai.entity'
import TheLoaiPhim from '@models/entities/theloaiphim.entity'
import { TheLoaiPhimDto } from '../../dtos/theloaiphim.dto'

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
import TheLoaiRepository from '@repositories/theloai.repository'
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

@JsonController('/theloais')
@Service()
export class TheLoaisController extends BaseController {
  constructor(protected TheLoaiRepository: TheLoaiRepository) {
    super()
  }

  @Get('/list')
  async getTheLoai(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllTheLoaisData = await this.TheLoaiRepository.getAll()
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

  @Get('/list')
  async getTheLoaiListId(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const idphim = req.query.idphim
      const findAllIDTheLoaiPhimsData = await new TheLoaiPhimRepository(TheLoaiPhim).findByIdPhim(
        idphim,
      )
      const list = []
      findAllIDTheLoaiPhimsData.map(function (theLoaiPhim) {
        list.push(theLoaiPhim?.id_the_loai)
      })
      const findAllTheLoaisData = await this.TheLoaiRepository.FindByListId(list)
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
}

export default TheLoaisController
