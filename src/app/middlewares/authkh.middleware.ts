import { KhachHang } from '@models/entities/khachhang.entity'
import { AuthRequest } from '@interfaces/response.interface'
import { ExpressMiddlewareInterface } from 'routing-controllers'
import { Service } from 'typedi'
import { HttpException } from '@exceptions/http.exception'
import { IAccessTokenKH } from '@interfaces/token.interface'
import { verifyTokenKH } from '@utils/token'

@Service()
export class AuthMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional
  async use(request: AuthRequest, response: any, next?: (err?: any) => any): Promise<any> {
    const bearer = request.headers.authorization
    if (!bearer || !bearer.startsWith('Bearer ')) {
      return next(new HttpException(401, 'Unauthorised'))
    }

    const accessToken = bearer.split('Bearer ')[1].trim()
    try {
      const payload = (await verifyTokenKH(accessToken)) as IAccessTokenKH
      const khachhang = await KhachHang.findOne({
        where: {
          so_dien_thoai: payload.so_dien_thoai,
        },
        raw: true,
      })

      if (!khachhang) {
        return next(new HttpException(401, 'Unauthorised'))
      }

      request.khachhang = khachhang

      return next()
    } catch (error) {
      return next(new HttpException(401, 'Unauthorised'))
    }
  }
}
