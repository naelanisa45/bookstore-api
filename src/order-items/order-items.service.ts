import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './entities/order-item.entity.js';
import { Order } from '../orders/entities/order.entity.js';
import { Book } from '../books/entities/book.entity.js';
import { CreateOrderItemDto } from './dto/create-order-item.dto.js';
import { UpdateOrderItemDto } from './dto/update-order-item.dto.js';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find({
      relations: {
        order: true,
        book: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<OrderItem> {
    const data = await this.orderItemRepository.findOne({
      where: { id },
      relations: {
        order: true,
        book: true,
      },
    });

    if (!data) {
      throw new NotFoundException('Detail pesanan tidak ditemukan');
    }

    return data;
  }

  async create(dto: CreateOrderItemDto): Promise<OrderItem> {
    const order = await this.orderRepository.findOne({
      where: { id: dto.orderId },
    });

    if (!order) {
      throw new NotFoundException('Pesanan tidak ditemukan');
    }

    const book = await this.bookRepository.findOne({
      where: { id: dto.bookId },
    });

    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }

    const subtotal = dto.quantity * dto.unitPrice;

    const data = this.orderItemRepository.create({
      order,
      book,
      quantity: dto.quantity,
      unitPrice: dto.unitPrice,
      subtotal,
    });

    return this.orderItemRepository.save(data);
  }

  async update(
    id: string,
    dto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    const data = await this.findById(id);

    if (dto.orderId) {
      const order = await this.orderRepository.findOne({
        where: { id: dto.orderId },
      });

      if (!order) {
        throw new NotFoundException('Pesanan tidak ditemukan');
      }

      data.order = order;
    }

    if (dto.bookId) {
      const book = await this.bookRepository.findOne({
        where: { id: dto.bookId },
      });

      if (!book) {
        throw new NotFoundException('Buku tidak ditemukan');
      }

      data.book = book;
    }

    if (dto.quantity !== undefined) {
      data.quantity = dto.quantity;
    }

    if (dto.unitPrice !== undefined) {
      data.unitPrice = dto.unitPrice;
    }

    data.subtotal = data.quantity * data.unitPrice;

    return this.orderItemRepository.save(data);
  }

  async remove(id: string): Promise<void> {
    const data = await this.findById(id);

    await this.orderItemRepository.remove(data);
  }
}