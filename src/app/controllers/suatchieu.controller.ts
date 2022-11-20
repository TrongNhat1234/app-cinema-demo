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
      return this.setData(findAllSuatChieusData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }
  @UseBefore(AdminMiddleware)
  @Post('/create')
  async createSuatChieu(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: CreateDto = req.body
      const suatchieu = await this.SuatChieuRepository.createSuatChieu(data)
      return this.setData(data).setMessage('Create suatchieus successfully').responseSuccess(res)
    } catch (error) {
      return this.setStack(error.stack).setMessage('Error').responseErrors(res)
    }
  }
}

export default SuatChieusController
