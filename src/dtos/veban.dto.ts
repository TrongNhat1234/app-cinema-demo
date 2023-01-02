import { Expose } from 'class-transformer'
import { Allow, IsNotEmpty, IsNumber, IsDate, IsString, IsEmail } from 'class-validator'

export class UpdateDto {
  @Expose()
  @IsNumber()
  id_khach_hang: number

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id: number
}
