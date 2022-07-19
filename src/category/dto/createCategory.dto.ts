import { IsString, IsNotEmpty, IsBoolean } from '@nestjs/class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  desc: string;

  @IsBoolean()
  @IsNotEmpty()
  enable: boolean;
}
