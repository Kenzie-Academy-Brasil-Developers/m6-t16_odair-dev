import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsEmpty()
  announcement_id: string;
}
