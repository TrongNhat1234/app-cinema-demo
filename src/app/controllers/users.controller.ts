import { UpdateProfileDto } from './../../dtos/user.dto'
import User from '@models/entities/user.entity'
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
import UserRepository from '@repositories/user.repository'
import { AdminMiddleware } from '@middlewares/admin.middleware'
import { AuthRequest } from '@interfaces/response.interface'
import {
  plainToInstance,
  plainToClass,
  classToPlain,
  instanceToPlain,
  serialize,
} from 'class-transformer'

@JsonController('/users')
@Service()
export class UsersController extends BaseController {
  constructor(protected userRepository: UserRepository) {
    super()
  }

  @Get('/list')
  async getUser(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllUsersData = await User.findAll()
      return this.setCode(200).setData(findAllUsersData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }

  @UseBefore(AdminMiddleware)
  @Get('/detail')
  async getUserDetail(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const user = req.body.user
      const { id } = user
      const findUserById = await this.userRepository.findById(id)
      return this.setCode(200).setData(findUserById).setMessage('Success').responseSuccess(res)
    } catch (error: any) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage('Error')
        .responseErrors(res)
    }
  }
}

export default UsersController
