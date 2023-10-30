import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImageRepository } from './repositories/images.respository';

@Injectable()
export class ImagesService {
  constructor(private readonly repository: ImageRepository) {}

  create(createImageDto: CreateImageDto) {
    return this.repository.create(createImageDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateImageDto: UpdateImageDto) {
    return this.repository.update(id, updateImageDto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }

  removeByAnnouncement(id: string) {
    return this.repository.removeByAnnouncement(id);
  }
}
