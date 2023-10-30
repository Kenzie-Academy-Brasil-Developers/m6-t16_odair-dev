import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  announcement_id: string;
}

export class CreateImageDto2 {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsEmpty()
  announcement_id: string;
}
