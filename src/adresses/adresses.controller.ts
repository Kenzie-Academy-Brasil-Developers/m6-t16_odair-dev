import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Body, Patch, Param, Delete } from '@nestjs/common';
import { AdressesService } from './adresses.service';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Adresses')
@Controller('adresses')
export class AdressesController {
  constructor(private readonly adressesService: AdressesService) {}

  @Post()
  create(@Body() createAdressDto: CreateAdressDto) {
    return this.adressesService.create(createAdressDto);
  }

  @Get()
  findAll() {
    return this.adressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adressesService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdressDto: UpdateAdressDto) {
    return this.adressesService.update(id, updateAdressDto);
  }

  @ApiBearerAuth()
  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adressesService.remove(id);
  }
}
