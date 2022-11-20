import { Expose } from 'class-transformer'
import { Allow, IsNotEmpty, IsNumber, IsDate, IsString, IsEmail } from 'class-validator'

export class CreateDto {
  @Expose()
  @IsNotEmpty()
  @IsDate()
  gio_bat_dau: Date

  @Expose()
  @IsNotEmpty()
  @IsDate()
  gio_ket_thuc: Date

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id_phim: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id_phong_chieu: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id_dinh_dang_phim: number
}
