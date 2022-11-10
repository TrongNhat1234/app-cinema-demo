import { AuthRequest } from '@interfaces/response.interface'
import { ExpressMiddlewareInterface } from 'routing-controllers'
import { Service } from 'typedi'
import { HttpException } from '@exceptions/http.exception'
import { IAccessToken } from '@interfaces/token.interface'
import { verifyToken } from '@utils/token'
import User from '@models/entities/user.entity'

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
      const payload = (await verifyToken(accessToken)) as IAccessToken
      const user = await User.findOne({
        where: {
          address: payload.address,
        },
        raw: true,
      })

      if (!user) {
        return next(new HttpException(401, 'Unauthorised'))
      }

      request.user = user

      return next()
    } catch (error) {
      return next(new HttpException(401, 'Unauthorised'))
    }
  }
}
