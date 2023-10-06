import { $Enums, Type_user } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsDate, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birth: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Type_user)
  @IsOptional()
  type: $Enums.Type_user;
}
