import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums, Type_user } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsDate, IsEmail, IsEnum } from 'class-validator';
import { CreateAdressDto } from 'src/adresses/dto/create-adress.dto';

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
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @IsEnum(Type_user)
  @IsOptional()
  type: $Enums.Type_user;
}

export class CreateUserAddressDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birth: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;

  @ApiPropertyOptional()
  @IsEnum(Type_user)
  @IsOptional()
  type: $Enums.Type_user;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAdressDto)
  Address: CreateAdressDto;
}
