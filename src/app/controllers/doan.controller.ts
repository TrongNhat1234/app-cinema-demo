import DoAn from '@models/entities/doan.entity'
import { CreateDto } from '../../dtos/phim.dto'

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
import DoAnRepository from '@repositories/doan.repository'

import { AdminMiddleware } from '@middlewares/admin.middleware'
import { AuthRequest } from '@interfaces/response.interface'
import {
  plainToInstance,
  plainToClass,
  classToPlain,
  instanceToPlain,
  serialize,
} from 'class-transformer'

@JsonController('/doans')
@Service()
export class DoAnsController extends BaseController {
  constructor(protected DoAnRepository: DoAnRepository) {
    super()
  }

  @Get('/list')
  async getDoAn(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllDoAnsData = await this.DoAnRepository.getAll()
      return this.setData(findAllDoAnsData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  @Post('/create')
  async createPhim(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: CreateDto = req.body
      console.log(data)
      const DoAn = await this.DoAnRepository.createDoAn(data)

      return this.setCode(200)
        .setData(data)
        .setMessage('Create do an successfully')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }
}

export default DoAnsController
