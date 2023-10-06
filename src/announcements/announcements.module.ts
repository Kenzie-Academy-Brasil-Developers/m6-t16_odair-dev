import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnnouncementRepository } from './repositories/announcements.repository';

@Module({
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService, PrismaService, AnnouncementRepository],
})
export class AnnouncementsModule {}
