import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ShipmentsService } from './shipments.service.js';
import { CreateShipmentDto } from './dto/create-shipment.dto.js';
import { UpdateShipmentDto } from './dto/update-shipment.dto.js';

@Controller('shipments')
export class ShipmentsController {
  constructor(
    private readonly shipmentsService: ShipmentsService,
  ) {}

  @Get()
  findAll() {
    return this.shipmentsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.shipmentsService.findById(id);
  }

  @Post()
  create(@Body() body: CreateShipmentDto) {
    return this.shipmentsService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdateShipmentDto,
  ) {
    return this.shipmentsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentsService.remove(id);
  }
}