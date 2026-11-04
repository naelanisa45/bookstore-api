
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from './entities/customer.entity.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  // Menampilkan semua customer
  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // Menampilkan customer berdasarkan ID
  async findById(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Customer tidak ditemukan');
    }

    return customer;
  }

  // Menambahkan customer
  async create(dto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(dto);
    return this.customerRepository.save(customer);
  }

  // Mengubah data customer
  async update(
    id: string,
    dto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.findById(id);

    Object.assign(customer, dto);

    return this.customerRepository.save(customer);
  }

  // Menghapus customer (soft delete)
  async remove(id: string): Promise<void> {
    const customer = await this.findById(id);
    await this.customerRepository.softRemove(customer);
  }
}
