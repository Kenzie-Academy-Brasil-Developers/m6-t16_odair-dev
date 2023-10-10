import { $Enums, Type_fuel } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateImageDto } from 'src/images/dto/create-image.dto';

export class CreateAnnouncementDto {
  @IsString()
  @IsNotEmpty()
  mark: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsEnum(Type_fuel)
  fuel: $Enums.Type_fuel;

  @IsNumber()
  @IsNotEmpty()
  km: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  fipe: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEmpty()
  user_id: string;
}

export class CreateAnnouncementAndImageDto {
  @IsString()
  @IsNotEmpty()
  mark: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsEnum(Type_fuel)
  fuel: $Enums.Type_fuel;

  @IsNumber()
  @IsNotEmpty()
  km: number;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  fipe: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEmpty()
  user_id: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateImageDto)
  image: CreateImageDto;
}
