import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsEmpty()
  user_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  announcement_id: string;
}
