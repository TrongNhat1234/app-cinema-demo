import { Expose } from 'class-transformer'
import { Allow, IsNotEmpty, IsNumber, IsDate, IsString, IsEmail } from 'class-validator'

export class CreateDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  giam_gia: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id_nhan_vien: number
}
