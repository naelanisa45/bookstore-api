import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';

@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.paymentsService.findById(id);
  }

  @Post()
  create(@Body() body: CreatePaymentDto) {
    return this.paymentsService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: UpdatePaymentDto,
  ) {
    return this.paymentsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }
}