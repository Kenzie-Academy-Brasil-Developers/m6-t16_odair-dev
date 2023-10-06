import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAdressDto {
  @IsString()
  @IsNotEmpty()
  cep: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsNumber()
  @IsOptional()
  number: number;

  @IsString()
  @IsNotEmpty()
  complement: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
