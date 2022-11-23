import { Expose } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class TheLoaiPhimDto {
  @Expose()
  @IsNumber()
  @IsOptional()
  id_phim: number

  @Expose()
  @IsNumber()
  @IsOptional()
  id_the_loai: number
}
