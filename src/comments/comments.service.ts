import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './repositories/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly repository: CommentsRepository) {}

  create(createCommentDto: CreateCommentDto, token_id: string) {
    return this.repository.create(createCommentDto, token_id);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  findByAnnouncement(id: string) {
    return this.repository.findByAnnouncement(id);
  }

  update(
    id: string,
    updateCommentDto: UpdateCommentDto,
    token_id: string,
    type: string,
  ) {
    return this.repository.update(id, updateCommentDto, token_id, type);
  }

  remove(id: string, token_id: string, type: string) {
    return this.repository.remove(id, token_id, type);
  }
}
