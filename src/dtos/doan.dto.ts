import { Expose } from 'class-transformer'
import { Allow, IsNotEmpty, IsNumber, IsDate, IsString, IsEmail } from 'class-validator'

export class CreateDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  ten_do_an: String

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  gia: Number

  @Expose()
  @IsNotEmpty()
  @IsString()
  size: string

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id_phong_chieu: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id_dinh_dang_phim: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  ngay_chieu: Date
}
