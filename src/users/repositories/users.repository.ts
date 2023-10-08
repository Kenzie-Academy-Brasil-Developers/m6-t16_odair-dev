import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<UserEntity> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<UserEntity> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
