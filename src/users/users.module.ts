import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from './repositories/users.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
