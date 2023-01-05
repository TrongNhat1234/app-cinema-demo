import { Expose } from 'class-transformer'
import { Allow, IsBoolean, IsNotEmpty, IsNumber, IsDate, IsString, IsEmail } from 'class-validator'

export class CreateDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  vat_tro: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  mat_khau: string

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  gioi_tinh: boolean

  @Expose()
  @IsNotEmpty()
  @IsString()
  ngay_vao_lam: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  email: string

  @Expose()
  @IsNotEmpty()
  @IsString()
  dia_chi: string

  @Expose()
  @IsNotEmpty()
  @IsDate()
  ngay_sinh: Date

  @Expose()
  @IsNotEmpty()
  @IsString()
  ho_ten: string
}
