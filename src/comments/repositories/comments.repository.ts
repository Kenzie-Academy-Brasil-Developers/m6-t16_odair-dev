import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentEntity } from '../entities/comment.entity';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createCommentDto: CreateCommentDto,
    token_id: string,
  ): Promise<CommentEntity> {
    createCommentDto = { ...createCommentDto, user_id: token_id };
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

  async findByAnnouncement(id: string): Promise<CommentEntity[]> {
    const findAnnouncement = await this.prisma.announcement.findUnique({
      where: {
        id,
      },
    });
    if (findAnnouncement) {
      const findComments = await this.prisma.comment.findMany({
        where: {
          announcement_id: id,
        },
      });
      if (findComments.length == 0) {
        throw new NotFoundException(
          'There are no comments for this announcement.',
        );
      }
      return findComments;
    } else {
      throw new NotFoundException('Announcement not found');
    }
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
    token_id: string,
    type: string,
  ): Promise<CommentEntity> {
    const findComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
    if (!findComment) {
      throw new NotFoundException('Comment not found');
    }
    if (type == 'COMPRADOR') {
      if (findComment.user_id == token_id) {
        return this.prisma.comment.update({
          where: {
            id,
          },
          data: updateCommentDto,
        });
      } else {
        throw new UnauthorizedException(
          'Only owner can perform this operation',
        );
      }
    }
  }

  async remove(
    id: string,
    token_id: string,
    type: string,
  ): Promise<CommentEntity> {
    const findComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
    if (!findComment) {
      throw new NotFoundException('Comment not found');
    }
    if (type == 'COMPRADOR') {
      if (findComment.user_id == token_id) {
        return this.prisma.comment.delete({
          where: {
            id,
          },
        });
      } else {
        throw new UnauthorizedException(
          'Only the owner of the ad or comment can perform this operation',
        );
      }
    }
    const verifyOwner = await this.prisma.announcement.findUnique({
      where: {
        id: findComment.announcement_id,
      },
    });
    if (verifyOwner.user_id == token_id) {
      return this.prisma.comment.delete({
        where: {
          id,
        },
      });
    } else {
      throw new UnauthorizedException(
        'Only the owner of the ad or comment can perform this operation',
      );
    }
  }
}
