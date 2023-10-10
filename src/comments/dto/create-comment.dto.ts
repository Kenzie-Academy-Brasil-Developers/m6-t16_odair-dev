import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  announcement_id: string;
}
