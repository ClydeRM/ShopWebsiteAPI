import { IsDate } from '@nestjs/class-validator';
import { IsString, IsPostalCode } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  country?: string;
  @IsString()
  state?: string;
  @IsString()
  city?: string;
  @IsString()
  district?: string;
  @IsPostalCode()
  postalCode?: string;
  @IsString()
  address?: string;
  @IsDate()
  deleteAt?: Date;
}
