import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdressDto } from '../dto/create-adress.dto';
import { UpdateAdressDto } from '../dto/update-adress.dto';
import { AdressEntity } from '../entities/adress.entity';

@Injectable()
export class AddressRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdressDto: CreateAdressDto): Promise<AdressEntity> {
    return this.prisma.address.create({
      data: createAdressDto,
    });
  }

  async findAll(): Promise<AdressEntity[]> {
    return this.prisma.address.findMany();
  }

  async findOne(id: string): Promise<AdressEntity> {
    return await this.prisma.address.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateAdressDto: UpdateAdressDto) {
    return this.prisma.address.update({
      where: {
        id,
      },
      data: updateAdressDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.address.delete({
      where: {
        id,
      },
    });
  }
}
