import { NextFunction, Response, Request } from 'express'
import { LoginDto } from '../../dtos/auth.dto'
import UserRepository from '@repositories/user.repository'
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
import User from '@models/entities/user.entity'

@JsonController('/auth')
@Service()
class AuthController extends BaseController {
  constructor(protected authRepository: UserRepository) {
    super()
  }

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const loginDto: LoginDto = req.body
      const { email, password } = loginDto

      const data = await this.authRepository.findOrCreateByEmail(email, password)
      const user = data[0]
      // if (data[1] == true) {
      //   // Create a new collection for new user
      //   await this.authRepository.createCollection(`Collection #${data[0].id}`, data[0].id);
      // }

      const accessToken = createAccessToken(email)
      const refreshToken = createRefreshToken(user)
      // Save to redisnonce
      setCacheExpire(`auth_refresh_email_${email}`, refreshToken, REFRESH_TTL)

      return this.setData({
        accessToken,
        refreshToken,
      })
        .setCode(200)
        .setMessage('Success')
        .responseSuccess(res)
    } catch (error) {
      return this.setCode(error?.status || 500)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res)
    }
  }

  @Post('/refresh')
  async refresh(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { accessToken, refreshToken } = req.body
      const decryptAccess = (await verifyToken(accessToken)) as IAccessToken
      const email = decryptAccess.email
      const oldRefresh = await getCacheExpire(`auth_refresh_email_${email}`)
      if (JSON.parse(oldRefresh?.toLowerCase() as string) == refreshToken.toLowerCase()) {
        const data = await this.authRepository.findByEmail(email)
        const user = data[0]
        const newAccessToken = createAccessToken(email)
        const newRefreshToken = createRefreshToken(user)

        // set refresh to redis
        setCacheExpire(`auth_refresh_address_${email}`, newRefreshToken, REFRESH_TTL)

        return this.setData({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        })
          .setCode(200)
          .setMessage('Success')
          .responseSuccess(res)
      } else {
        throw new BadRequestError('Wrong Tokens')
      }
    } catch (error) {
      return this.setCode(error?.status || 500)
        .setMessage(error?.message || 'Internal server error')
        .responseErrors(res)
    }
  }
}

export default AuthController
