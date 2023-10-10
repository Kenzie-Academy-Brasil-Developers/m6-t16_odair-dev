import {
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementAndImageDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Announcements')
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createAnnouncementDto: CreateAnnouncementAndImageDto,
    @Request() req,
  ) {
    return this.announcementsService.create(
      createAnnouncementDto,
      req.user.type,
      req.user.id,
    );
  }

  @Get()
  findAll() {
    return this.announcementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.announcementsService.findOne(id);
  }

  @Get('advertiser/:id')
  findByAdvertiser(@Param('id') id: string) {
    return this.announcementsService.findByAdvertiser(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementDto,
    @Request() req,
  ) {
    return this.announcementsService.update(
      id,
      req.user.id,
      updateAnnouncementDto,
    );
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.announcementsService.remove(id, req.user.id);
  }
}
