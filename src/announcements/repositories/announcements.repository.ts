import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnnouncementAndImageDto } from '../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';
import { AnnouncementEntity } from '../entities/announcement.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AnnouncementRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createAnnouncementDto: CreateAnnouncementAndImageDto,
    type: string,
    id: string,
  ): Promise<AnnouncementEntity> {
    createAnnouncementDto = { ...createAnnouncementDto, user_id: id };
    const { image, ...rest } = createAnnouncementDto;
    if (type == 'ANUNCIANTE') {
      const newAnnouncement = await this.prisma.announcement.create({
        data: rest,
      });
      if (image) {
        for (const i of image) {
          const newImage = { ...i, announcement_id: newAnnouncement.id };
          await this.prisma.image.create({
            data: newImage,
          });
        }
      }
      return await this.prisma.announcement.findUnique({
        where: {
          id: newAnnouncement.id,
        },
        include: {
          image: true,
        },
      });
    } else {
      throw new ForbiddenException(
        'Only ANUNCIANTE can perform this operation',
      );
    }
  }

  async findAll(): Promise<AnnouncementEntity[]> {
    const announcements = await this.prisma.announcement.findMany({
      include: {
        user: true,
        image: true,
      },
    });
    return plainToInstance(AnnouncementEntity, announcements);
  }

  async findByAdvertiser(id: string): Promise<AnnouncementEntity[]> {
    const findAnnouncements = await this.prisma.announcement.findMany({
      where: {
        user_id: id,
      },
      include: {
        image: true,
        user: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });
    if (!findAnnouncements) {
      throw new NotFoundException('Announcement not found');
    }
    return findAnnouncements;
  }

  async findOne(id: string): Promise<AnnouncementEntity> {
    const findAnnouncement = await this.prisma.announcement.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            cpf: true,
            phone: true,
            birth: true,
            description: true,
            type: true,
          },
        },
        image: true,
        comment: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
    if (!findAnnouncement) {
      throw new NotFoundException('Announcement not found');
    }
    return plainToInstance(AnnouncementEntity, findAnnouncement);
  }

  async update(
    id: string,
    token_id: string,
    updateAnnouncementDto: UpdateAnnouncementDto,
  ): Promise<AnnouncementEntity> {
    const findAnnouncement = await this.prisma.announcement.findUnique({
      where: {
        id,
      },
    });
    if (!findAnnouncement) {
      throw new NotFoundException('Announcement not found');
    }
    if (token_id == findAnnouncement.user_id) {
      ////////////////////////////////////////////////////////////////////////
      return this.prisma.announcement.update({
        where: {
          id,
        },
        include: {
          image: true,
        },
        data: updateAnnouncementDto,
      });
    } else {
      throw new ForbiddenException('Only owner can perform this operation');
    }
  }

  async remove(id: string, token_id: string): Promise<AnnouncementEntity> {
    const findAnnouncement = await this.prisma.announcement.findUnique({
      where: {
        id,
      },
    });
    if (!findAnnouncement) {
      throw new NotFoundException('Announcement not found');
    }
    if (token_id == findAnnouncement.user_id) {
      return this.prisma.announcement.delete({
        where: {
          id,
        },
      });
    } else {
      throw new ForbiddenException('Only owner can perform this operation');
    }
  }
}
