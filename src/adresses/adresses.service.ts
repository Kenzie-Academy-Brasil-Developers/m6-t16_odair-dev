import { Injectable } from '@nestjs/common';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { AddressRepository } from './repositories/adresses.repository';

@Injectable()
export class AdressesService {
  constructor(private readonly repository: AddressRepository) {}

  create(createAdressDto: CreateAdressDto) {
    return this.repository.create(createAdressDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateAdressDto: UpdateAdressDto) {
    return this.repository.update(id, updateAdressDto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
