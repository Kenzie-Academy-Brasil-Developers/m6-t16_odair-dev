import { Injectable } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UserRepository) {}

  create(createUserDto: CreateUserAddressDto) {
    return this.repository.create(createUserDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string, token_id: string) {
    return this.repository.findOne(id, token_id);
  }

  findByEmail(email: string) {
    return this.repository.findByEmail(email);
  }

  update(id: string, token_id: string, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, token_id, updateUserDto);
  }

  remove(id: string, token_id: string) {
    return this.repository.remove(id, token_id);
  }
}
