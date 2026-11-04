import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { OrderItemsService } from './order-items.service.js';
import { CreateOrderItemDto } from './dto/create-order-item.dto.js';
import { UpdateOrderItemDto } from './dto/update-order-item.dto.js';

@Controller('order-items')
export class OrderItemsController {
  constructor(
    private readonly orderItemsService: OrderItemsService,
  ) {}

  @Get()
  findAll() {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.orderItemsService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateOrderItemDto) {
    return this.orderItemsService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemsService.remove(id);
  }
}