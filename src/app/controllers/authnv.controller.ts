import { isEmpty } from './../../common/utils/util'
import { NhanVien } from '@models/entities/nhanvien.entity'
import { NextFunction, Response, Request } from 'express'
import { LoginDto } from '../../dtos/auth.dto'
import NhanVienRepository from '@repositories/nhanvien.repository'
import { BaseController } from './base.controller'
import { BadRequestError, Body, Get, JsonController, Post, Req, Res } from 'routing-controllers'
import { Service } from 'typedi'
import { setCacheExpire, getCacheExpire } from '@services/redis'
import { createAccessToken, createRefreshToken, verifyToken } from '@utils/token'
import { loginMessage } from '@utils/message'
import { ethers } from 'ethers'
import { REFRESH_TTL } from '@utils/constants'
import random from '@utils/random'
import { IAccessToken } from '@interfaces/token.interface'

@JsonController('/authnv')
@Service()
class AuthNvController extends BaseController {
  constructor(protected authnvRepository: NhanVienRepository) {
    super()
  }

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const loginDto: LoginDto = req.body
      const { email, password } = loginDto
      console.log(loginDto)
      const data = await this.authnvRepository.findByEmailPassWord(email, password)
      console.log(data)
      const nhanvien: NhanVien = data[0]

      console.log(nhanvien)
      // if (data[1] == true) {
      //   // Create a new collection for new user
      //   await this.authRepository.createCollection(`Collection #${data[0].id}`, data[0].id);
      // }

      const accessToken = createAccessToken(email)
      const refreshToken = createRefreshToken(nhanvien)
      // Save to redisnonce
      setCacheExpire(`auth_refresh_email_${email}`, refreshToken, REFRESH_TTL)
      return this.setData({
        accessToken: accessToken,
        refreshToken: refreshToken,
        role: nhanvien?.vai_tro,
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

export default AuthNvController
