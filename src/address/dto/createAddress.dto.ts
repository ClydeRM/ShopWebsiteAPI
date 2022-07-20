import { IsBoolean, IsNotEmpty, IsPostalCode, IsString } from 'class-validator';

export class CreateAddressDto {
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
