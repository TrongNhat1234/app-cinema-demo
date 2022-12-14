import { KhachHang } from '@models/entities/khachhang.entity'
import NhanVien from '@models/entities/nhanvien.entity'

import { Request, Response } from 'express'

export interface ApiResponse {
  status: boolean
  code: number
  data: any
  message: string
}

export interface AuthRequest extends Request {
  nhanvien: NhanVien
}

export interface AuthRequest extends Request {
  khachhang: KhachHang
}
