import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsDate,
} from '@nestjs/class-validator';

export class CategoryDto {
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  desc: string;

  @IsBoolean()
  @IsNotEmpty()
  enable: boolean;

  @IsDate()
  createAt: Date;
  @IsDate()
  updateAt: Date;
  @IsDate()
  deleteAt: Date;
}
