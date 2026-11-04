import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity.js';
import { Order } from '../orders/entities/order.entity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { UpdatePaymentDto } from './dto/update-payment.dto.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Payment[]> {
    return this.paymentRepository.find({
      relations: {
        order: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: {
        order: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Pembayaran tidak ditemukan');
    }

    return payment;
  }

  async create(body: CreatePaymentDto): Promise<Payment> {
    const order = await this.orderRepository.findOne({
      where: { id: body.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    const existingPayment = await this.paymentRepository.findOne({
      where: {
        order: { id: body.orderId },
      },
    });

    if (existingPayment) {
      throw new ConflictException(
        'Pembayaran untuk order ini sudah tersedia',
      );
    }

    const payment = this.paymentRepository.create({
      order,
      amount: Number(order.totalAmount),
      paymentMethod: body.paymentMethod,
      transactionId: body.transactionId,
      status: 'pending',
    });

    return this.paymentRepository.save(payment);
  }

  async update(
    id: string,
    body: UpdatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.findById(id);

    Object.assign(payment, body);

    return this.paymentRepository.save(payment);
  }

  async remove(id: string): Promise<void> {
    const payment = await this.findById(id);

    await this.paymentRepository.softRemove(payment);
  }
}