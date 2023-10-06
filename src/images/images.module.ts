import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageRepository } from './repositories/images.respository';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService, ImageRepository],
})
export class ImagesModule {}
