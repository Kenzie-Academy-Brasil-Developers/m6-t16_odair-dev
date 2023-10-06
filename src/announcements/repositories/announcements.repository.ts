import { Injectable } from '@nestjs/common';
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
    return this.prisma.announcement.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateAnnouncementDto: UpdateAnnouncementDto,
  ): Promise<AnnouncementEntity> {
    return this.prisma.announcement.update({
      where: {
        id,
      },
      data: updateAnnouncementDto,
    });
  }

  async remove(id: string): Promise<AnnouncementEntity> {
    return this.prisma.announcement.delete({
      where: {
        id,
      },
    });
  }
}
