import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnnouncementDto } from '../dto/create-announcement.dto';
import { UpdateAnnouncementDto } from '../dto/update-announcement.dto';
import { AnnouncementEntity } from '../entities/announcement.entity';

@Injectable()
export class AnnouncementRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
  ): Promise<AnnouncementEntity> {
    return this.prisma.announcement.create({
      data: createAnnouncementDto,
    });
  }

  async findAll(): Promise<AnnouncementEntity[]> {
    return this.prisma.announcement.findMany();
  }

  async findOne(id: string): Promise<AnnouncementEntity> {
    const findAnnouncement = await this.prisma.announcement.findUnique({
      where: {
        id,
      },
    });
    if (!findAnnouncement) {
      throw new NotFoundException('Announcement not found');
    }
    return findAnnouncement;
  }

  async update(
    id: string,
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
    return this.prisma.announcement.update({
      where: {
        id,
      },
      data: updateAnnouncementDto,
    });
  }

  async remove(id: string): Promise<AnnouncementEntity> {
    const findAnnouncement = await this.prisma.announcement.findUnique({
      where: {
        id,
      },
    });
    if (!findAnnouncement) {
      throw new NotFoundException('Announcement not found');
    }
    return this.prisma.announcement.delete({
      where: {
        id,
      },
    });
  }
}
