import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './entities/shipment.entity.js';
import { Order } from '../orders/entities/order.entity.js';
import { CreateShipmentDto } from './dto/create-shipment.dto.js';
import { UpdateShipmentDto } from './dto/update-shipment.dto.js';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Shipment[]> {
    return this.shipmentRepository.find({
      relations: {
        order: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
      relations: {
        order: true,
      },
    });

    if (!shipment) {
      throw new NotFoundException('Pengiriman tidak ditemukan');
    }

    return shipment;
  }

  async create(body: CreateShipmentDto): Promise<Shipment> {
    const order = await this.orderRepository.findOne({
      where: { id: body.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order tidak ditemukan');
    }

    const existingShipment = await this.shipmentRepository.findOne({
      where: {
        order: { id: body.orderId },
      },
    });

    if (existingShipment) {
      throw new ConflictException(
        'Pengiriman untuk order ini sudah tersedia',
      );
    }

    const shipment = this.shipmentRepository.create({
      order,
      courier: body.courier,
      trackingNumber: body.trackingNumber,
      shippingAddress: body.shippingAddress,
      shippingCost: body.shippingCost,
      status: 'pending',
    });

    return this.shipmentRepository.save(shipment);
  }

  async update(
    id: string,
    body: UpdateShipmentDto,
  ): Promise<Shipment> {
    const shipment = await this.findById(id);

    Object.assign(shipment, body);

    return this.shipmentRepository.save(shipment);
  }

  async remove(id: string): Promise<void> {
    const shipment = await this.findById(id);

    await this.shipmentRepository.softRemove(shipment);
  }
}