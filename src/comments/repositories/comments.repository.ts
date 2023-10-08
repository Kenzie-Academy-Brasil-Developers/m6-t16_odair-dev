import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentEntity } from '../entities/comment.entity';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    return this.prisma.comment.create({
      data: createCommentDto,
    });
  }

  async findAll(): Promise<CommentEntity[]> {
    return this.prisma.comment.findMany();
  }

  async findOne(id: string): Promise<CommentEntity> {
    const findComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
    if (!findComment) {
      throw new NotFoundException('Comment not found');
    }
    return findComment;
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentEntity> {
    const findComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
    if (!findComment) {
      throw new NotFoundException('Comment not found');
    }
    return this.prisma.comment.update({
      where: {
        id,
      },
      data: updateCommentDto,
    });
  }

  async remove(id: string): Promise<CommentEntity> {
    const findComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
    if (!findComment) {
      throw new NotFoundException('Comment not found');
    }
    return this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}
