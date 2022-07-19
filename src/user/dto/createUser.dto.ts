import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class createUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  role: Role;
}
