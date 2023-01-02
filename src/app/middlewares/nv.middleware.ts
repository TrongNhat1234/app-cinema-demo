import { NhanVien } from '@models/entities/nhanvien.entity'
import { AuthRequest } from '@interfaces/response.interface'
import { ExpressMiddlewareInterface } from 'routing-controllers'
import { Service } from 'typedi'
import { HttpException } from '@exceptions/http.exception'
import { IAccessToken } from '@interfaces/token.interface'
import { verifyToken } from '@utils/token'
import UserType from '@enum/user.enum'

@Service()
export class NVMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional
  async use(request: AuthRequest, response: any, next?: (err?: any) => any): Promise<any> {
    const bearer = request.headers.authorization
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return next(new HttpException(401, 'Unauthorised'))
    }
    const accessToken = bearer.split('Bearer ')[1].trim()
    try {
      const payload = (await verifyToken(accessToken)) as IAccessToken
      console.log(payload)
      const NV = await NhanVien.findOne({
        where: {
          email: payload.email,
          vai_tro: 'nv',
        },
        raw: true,
      })

      request.nhanvien = NV
      return next()
    } catch (error) {
      return next(new HttpException(401, 'Unauthorised'))
    }
  }
}
