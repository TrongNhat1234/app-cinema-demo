import { Expose } from 'class-transformer'
import { Allow, IsNotEmpty, IsNumber, IsDate, IsString, IsEmail } from 'class-validator'

export class CreateDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id_hoa_don_do_an: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id_do_an: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  so_luong: number
}
