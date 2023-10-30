import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Type_fuel } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateImageDto2 } from 'src/images/dto/create-image.dto';

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
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mark: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsEnum(Type_fuel)
  fuel: $Enums.Type_fuel;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  km: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  fipe: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEmpty()
  user_id: string;

  @ApiProperty()
  @IsArray()
  @ValidateNested()
  @Type(() => CreateImageDto2)
  image: CreateImageDto2[];
}
