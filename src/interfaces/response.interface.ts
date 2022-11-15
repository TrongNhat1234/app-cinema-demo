import User from '@models/entities/user.entity'
import { Request, Response } from 'express'

export interface ApiResponse {
  status: boolean
  code: number
  data: any
  message: string
}

export interface AuthRequest extends Request {
  user: User
}
