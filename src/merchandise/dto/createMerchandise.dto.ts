import { IsString, IsNotEmpty, IsBoolean } from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class CreateMerchandiseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  desc: string;

  @IsBoolean()
  @IsNotEmpty()
  enable: boolean;

  @IsNumber()
  cost: number;
  @IsNumber()
  price: number;
}
