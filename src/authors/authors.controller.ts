import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { AuthorsService } from './authors.service.js';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.authorsService.findById(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.authorsService.create(body);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.authorsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}