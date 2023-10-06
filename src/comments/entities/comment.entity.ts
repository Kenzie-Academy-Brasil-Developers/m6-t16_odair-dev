import { Comment } from '@prisma/client';

export class CommentEntity implements Comment {
  id: string;
  comment: string;
  user_id: string;
  createdAt: Date;
  announcement_id: string;
}
