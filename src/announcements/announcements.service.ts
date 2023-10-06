import { Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { AnnouncementRepository } from './repositories/announcements.repository';

@Injectable()
export class AnnouncementsService {
  constructor(private readonly repository: AnnouncementRepository) {}

  create(createAnnouncementDto: CreateAnnouncementDto) {
    return this.repository.create(createAnnouncementDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, updateAnnouncementDto: UpdateAnnouncementDto) {
    return this.repository.update(id, updateAnnouncementDto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}
