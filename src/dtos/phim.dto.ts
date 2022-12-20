import { Expose } from 'class-transformer'
import { Allow, IsNotEmpty, IsNumber, IsDate, IsString, IsEmail } from 'class-validator'

export class CreateDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  ten_phim: String

  @Expose()
  @IsNotEmpty()
  @IsDate()
  thoi_luong_phim: Date

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  gioi_han_tuoi: number

  @Expose()
  @IsNotEmpty()
  @IsDate()
  ngay_cong_chieu: Date
}
