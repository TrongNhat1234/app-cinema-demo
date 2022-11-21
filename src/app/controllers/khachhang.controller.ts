import { isEmpty } from './../../common/utils/util'
import { KhachHang } from '@models/entities/khachhang.entity'
import { NextFunction, Response, Request } from 'express'
import { LoginDto } from '../../dtos/khachhang.dto'
import KhachHangRepository from '@repositories/khachhang.repository'
import { BaseController } from './base.controller'
import { BadRequestError, Body, Get, JsonController, Post, Req, Res } from 'routing-controllers'
import { Service } from 'typedi'
import { setCacheExpire, getCacheExpire } from '@services/redis'
import { createAccessTokenKH, createRefreshTokenKH, verifyTokenKH } from '@utils/token'
import { loginMessage } from '@utils/message'
import { ethers } from 'ethers'
import { REFRESH_TTL } from '@utils/constants'

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
}

export default KhachHangController
