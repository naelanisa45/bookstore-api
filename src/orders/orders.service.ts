import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity.js';
import { Customer } from '../customers/entities/customer.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: {
        customer: true,
        orderItems: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        customer: true,
        orderItems: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Pesanan tidak ditemukan');
    }

    return order;
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    const customer = await this.customerRepository.findOne({
    where: { id: dto.customerId },
  });

  if (!customer) {
    throw new NotFoundException('Pelanggan tidak ditemukan');
  }

  const order = this.orderRepository.create({
    customer,
    status: 'pending',
    totalAmount: 0,
  });

  return this.orderRepository.save(order);
}

  async update(id: string, dto: UpdateOrderDto): Promise<Order> {
  const order = await this.findById(id);

  if (dto.customerId) {
    const customer = await this.customerRepository.findOne({
      where: { id: dto.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Pelanggan tidak ditemukan');
    }

    order.customer = customer;
  }

  return this.orderRepository.save(order);
}

  async remove(id: string): Promise<void> {
    const order = await this.findById(id);
    await this.orderRepository.softRemove(order);
  }
}