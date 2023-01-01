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
      const id = req.body.id
      const ngayChieu = req.body.ngay_chieu
      const findAllPhimData = await this.PhimRepository.getPhimSuatChieuNgay(id, ngayChieu)
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
      console.log(data)
      const Phim = await this.PhimRepository.createPhim(data)

      return this.setCode(200)
        .setData(data)
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
  @Put('/delete/:id')
  async delete(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id, 10)
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
