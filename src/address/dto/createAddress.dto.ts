import { User } from '@prisma/client';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPostalCode,
  IsString,
} from 'class-validator';

export class CreateAddressDto {
  @IsNumber()
  @IsNotEmpty()
  user: User;
  @IsString()
  @IsNotEmpty()
  country: string;
  @IsString()
  state?: string;
  @IsString()
  city?: string;
  @IsString()
  district?: string;
  @IsPostalCode('TW')
  postalCode?: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsBoolean()
  @IsNotEmpty()
  type: boolean;
}
