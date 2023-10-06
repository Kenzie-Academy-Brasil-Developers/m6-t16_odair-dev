import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentsRepository } from './repositories/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly repository: CommentsRepository) {}

  create(createCommentDto: CreateCommentDto) {
    return this.repository.create(createCommentDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateCommentDto: UpdateCommentDto) {
    return this.repository.update(id, updateCommentDto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
