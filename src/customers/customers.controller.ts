
import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CustomersService } from './customers.service.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';

@Controller('customers')
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
  ) {}

  // Menampilkan semua customer
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  // Menampilkan customer berdasarkan ID
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.customersService.findById(id);
  }

  // Menambahkan customer
  @Post()
  create(@Body() dto: CreateCustomerDto) {
    return this.customersService.create(dto);
  }

  // Mengubah data customer
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, dto);
  }

  // Menghapus customer
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
