import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.prisma.user.create({
      data: createUserDto,
    });
    return plainToInstance(UserEntity, newUser);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return plainToInstance(UserEntity, users);
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
    return plainToInstance(UserEntity, findUser);
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
    const user = this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
    return plainToInstance(UserEntity, user);
  }

  async remove(id: string): Promise<UserEntity> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!findUser) {
      throw new NotFoundException('User not found');
    } else {
      return this.prisma.user.delete({
        where: {
          id,
        },
      });
    }
  }
}
