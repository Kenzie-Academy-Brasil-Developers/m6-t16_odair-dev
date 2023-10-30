import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserAddressDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserAddressDto): Promise<UserEntity> {
    const { Address, ...rest } = createUserDto;
    const newUser = await this.prisma.user.create({
      data: rest,
    });
    const newAddress = { ...Address, user_id: newUser.id };
    await this.prisma.address.create({
      data: newAddress,
    });
    const userReturn = await this.prisma.user.findUnique({
      where: {
        id: newUser.id,
      },
      include: {
        Address: true,
      },
    });
    return plainToInstance(UserEntity, userReturn);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();
    return plainToInstance(UserEntity, users);
  }

  async findOne(id: string, token_id: string): Promise<UserEntity> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        Address: true,
      },
    });
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    if (id == token_id) {
      return plainToInstance(UserEntity, findUser);
    } else {
      throw new UnauthorizedException('Only owner can perform this operation');
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        Address: true,
      },
    });
    return findUser;
  }

  async update(
    id: string,
    token_id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    if (id == token_id) {
      const user = this.prisma.user.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
      return plainToInstance(UserEntity, user);
    } else {
      throw new UnauthorizedException('Only owner can perform this operation');
    }
  }

  async remove(id: string, token_id: string): Promise<UserEntity> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    if (id == token_id) {
      return this.prisma.user.delete({
        where: {
          id,
        },
        include: {
          Address: true,
        },
      });
    } else {
      throw new UnauthorizedException('Only owner can perform this operation');
    }
  }
}
