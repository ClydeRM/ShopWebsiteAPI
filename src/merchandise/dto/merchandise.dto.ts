import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsDate,
} from '@nestjs/class-validator';
import { IsNumber } from 'class-validator';

export class MerchandiseDto {
  id: number;

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

  @IsDate()
  createAt: Date;
  @IsDate()
  updateAt: Date;
  @IsDate()
  deleteAt: Date;
}
