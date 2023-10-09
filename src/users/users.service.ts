import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/users.repository';
// import { UnauthorizedError } from 'src/common/errors/types/UnauthorizedError';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  findAll() {
    // throw new UnauthorizedError('Acesso não autorizado');
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
