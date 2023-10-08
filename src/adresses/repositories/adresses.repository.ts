import { Injectable, NotFoundException } from '@nestjs/common';
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
    const findAdress = await this.prisma.address.findUnique({
      where: {
        id,
      },
    });
    if (!findAdress) {
      throw new NotFoundException('Adress not found');
    }
    return findAdress;
  }

  async update(id: string, updateAdressDto: UpdateAdressDto) {
    const findAdress = await this.prisma.address.findUnique({
      where: {
        id,
      },
    });
    if (!findAdress) {
      throw new NotFoundException('Adress not found');
    }
    return this.prisma.address.update({
      where: {
        id,
      },
      data: updateAdressDto,
    });
  }

  async remove(id: string) {
    const findAdress = await this.prisma.address.findUnique({
      where: {
        id,
      },
    });
    if (!findAdress) {
      throw new NotFoundException('Adress not found');
    }
    return await this.prisma.address.delete({
      where: {
        id,
      },
    });
  }
}
