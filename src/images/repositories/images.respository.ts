import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImageDto } from '../dto/create-image.dto';
import { ImageEntity } from '../entities/image.entity';
import { UpdateImageDto } from '../dto/update-image.dto';

@Injectable()
export class ImageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createImageDto: CreateImageDto): Promise<ImageEntity> {
    return this.prisma.image.create({
      data: createImageDto,
    });
  }

  async findAll(): Promise<ImageEntity[]> {
    return this.prisma.image.findMany();
  }

  async findOne(id: string): Promise<ImageEntity> {
    return this.prisma.image.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateImageDto: UpdateImageDto,
  ): Promise<ImageEntity> {
    return this.prisma.image.update({
      where: {
        id,
      },
      data: updateImageDto,
    });
  }

  async remove(id: string): Promise<ImageEntity> {
    return this.prisma.image.delete({
      where: {
        id,
      },
    });
  }
}
