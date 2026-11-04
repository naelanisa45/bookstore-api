import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { PublishersService } from './publishers.service.js';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import { UpdatePublisherDto } from './dto/update-publisher.dto.js';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  @Get()
  findAll() {
    return this.publishersService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.publishersService.findById(id);
  }

  @Post()
  create(@Body() dto: CreatePublisherDto) {
    return this.publishersService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePublisherDto,
  ) {
    return this.publishersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publishersService.remove(id);
  }
}