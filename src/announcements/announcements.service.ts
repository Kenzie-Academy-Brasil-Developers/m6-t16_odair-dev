import { Injectable } from '@nestjs/common';
import { CreateAnnouncementAndImageDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AnnouncementRepository } from './repositories/announcements.repository';

@Injectable()
export class AnnouncementsService {
  constructor(private readonly repository: AnnouncementRepository) {}

  create(
    createAnnouncementDto: CreateAnnouncementAndImageDto,
    type: string,
    id: string,
  ) {
    return this.repository.create(createAnnouncementDto, type, id);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  findByAdvertiser(id: string) {
    return this.repository.findByAdvertiser(id);
  }

  update(
    id: string,
    token_id: string,
    updateAnnouncementDto: UpdateAnnouncementDto,
  ) {
    return this.repository.update(id, token_id, updateAnnouncementDto);
  }

  remove(id: string, token_id: string) {
    return this.repository.remove(id, token_id);
  }
}
