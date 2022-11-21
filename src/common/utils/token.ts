import { KhachHang } from '@models/entities/khachhang.entity'
import NhanVien from '@models/entities/nhanvien.entity'
import {
  IAccessToken,
  IRefreshToken,
  IAccessTokenKH,
  IRefreshTokenKH,
} from '@interfaces/token.interface'
import jwt from 'jsonwebtoken'
import { env } from '@env'

const createAccessToken = (email: string) => {
  return jwt.sign(
    {
      email: email,
    },
    env.app.jwt_secret as jwt.Secret,
    {
      expiresIn: '3h',
    },
  )
}

const createRefreshToken = (nhanvien: NhanVien): string => {
  return jwt.sign(
    {
      id: nhanvien.id,
    },
    env.app.jwt_secret as jwt.Secret,
    {
      expiresIn: '1d',
    },
  )
}

const verifyToken = async (
  token: string,
): Promise<jwt.VerifyErrors | IAccessToken | IRefreshToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.app.jwt_secret as jwt.Secret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload as IAccessToken | IRefreshToken)
    })
  })
}

const createAccessTokenKH = (so_dien_thoai: string) => {
  return jwt.sign(
    {
      so_dien_thoai: so_dien_thoai,
    },
    env.app.jwt_secret as jwt.Secret,
    {
      expiresIn: '3h',
    },
  )
}

const createRefreshTokenKH = (khachhang: KhachHang): string => {
  return jwt.sign(
    {
      id: khachhang.id,
    },
    env.app.jwt_secret as jwt.Secret,
    {
      expiresIn: '1d',
    },
  )
}

const verifyTokenKH = async (
  token: string,
): Promise<jwt.VerifyErrors | IAccessTokenKH | IRefreshTokenKH> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, env.app.jwt_secret as jwt.Secret, (err, payload) => {
      if (err) return reject(err)
      resolve(payload as IAccessTokenKH | IRefreshTokenKH)
    })
  })
}

export {
  createAccessToken,
  createRefreshToken,
  verifyToken,
  createAccessTokenKH,
  createRefreshTokenKH,
  verifyTokenKH,
}
