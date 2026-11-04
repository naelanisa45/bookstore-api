import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { BookAuthorsService } from './book-authors.service.js';
import { CreateBookAuthorDto } from './dto/create-book-author.dto.js';
import { UpdateBookAuthorDto } from './dto/update-book-author.dto.js';

@Controller('book-authors')
export class BookAuthorsController {
  constructor(
    private readonly bookAuthorsService: BookAuthorsService,
  ) {}

  @Get()
  findAll() {
    return this.bookAuthorsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookAuthorsService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateBookAuthorDto) {
    return this.bookAuthorsService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBookAuthorDto,
  ) {
    return this.bookAuthorsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookAuthorsService.remove(id);
  }
}