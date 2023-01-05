import { isEmpty } from './../../common/utils/util'
import { KhachHang } from '@models/entities/khachhang.entity'
import { NextFunction, Response, Request } from 'express'
import { LoginDto } from '../../dtos/khachhang.dto'
import KhachHangRepository from '@repositories/khachhang.repository'
import { BaseController } from './base.controller'
import { NVMiddleware } from '@middlewares/nv.middleware'
import { AuthMiddleware } from '@middlewares/authkh.middleware'
import {
  BadRequestError,
  Body,
  Get,
  Put,
  JsonController,
  Post,
  Req,
  Res,
  UseBefore,
} from 'routing-controllers'
import { Service } from 'typedi'
import { setCacheExpire, getCacheExpire } from '@services/redis'
import { createAccessTokenKH, createRefreshTokenKH, verifyTokenKH } from '@utils/token'
import { loginMessage } from '@utils/message'
import { ethers } from 'ethers'
import { REFRESH_TTL } from '@utils/constants'
import { AdminMiddleware } from '@middlewares/admin.middleware'
import { AuthRequest } from '@interfaces/response.interface'
import jwt from 'jsonwebtoken'
import { env } from '@env'

@JsonController('/khachhangs')
@Service()
class KhachHangController extends BaseController {
  constructor(protected KhachHangRepository: KhachHangRepository) {
    super()
  }

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const loginDto: LoginDto = req.body
      const { so_dien_thoai, password } = loginDto
      console.log(loginDto)
      const data = await this.KhachHangRepository.findOrCreateByEmail(so_dien_thoai, password)
      console.log(data)
      const khachhang: KhachHang = data[0]

      console.log(khachhang)
      // if (data[1] == true) {
      //   // Create a new collection for new user
      //   await this.authRepository.createCollection(`Collection #${data[0].id}`, data[0].id);
      // }

      const accessToken = createAccessTokenKH(so_dien_thoai)
      const refreshToken = createRefreshTokenKH(khachhang)
      // Save to redisnonce
      setCacheExpire(`authkh_refresh_email_${so_dien_thoai}`, refreshToken, REFRESH_TTL)
      return this.setData({
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
        .setCode(200)
        .setMessage('Success')
        .responseSuccess(res)
    } catch (error) {
      return this.setData({})
        .setCode(error?.status || 500)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res)
    }
  }

  @UseBefore(AuthMiddleware)
  @Get('/listve')
  async getVeKhachHang(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim()
      const so_dien_thoai = await jwt.verify(accessToken, env.app.jwt_secret as jwt.Secret)
      const kh = await new KhachHangRepository(KhachHang).findBySoDienThoai(
        so_dien_thoai.so_dien_thoai,
      )
      const findAllVeKhachHangsData = await this.KhachHangRepository.getVeCuaKhachHang(kh[0].id)
      return this.setCode(200)
        .setData(findAllVeKhachHangsData)
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
  async getKhachHang(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllKhachHangsData = await this.KhachHangRepository.getAll()
      return this.setCode(200)
        .setData(findAllKhachHangsData)
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
  @Put('/delete')
  async delete(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.body.id, 10)
      const findKhachHangData = await this.KhachHangRepository.findById(id)
      if (!isEmpty(findKhachHangData)) {
        const KhachHang = await this.KhachHangRepository.deleteById(id)
        return this.setCode(200)
          .setData(KhachHang)
          .setMessage('Delete khách hàng Success')
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

export default KhachHangController
