import { Injectable, NotFoundException } from '@nestjs/common';
import  { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAddress } from './entities/customer-address.entity.js';
import { Customer } from '../customers/entities/customer.entity.js';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto.js';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto.js';


@Injectable()
export class CustomerAddressService {
    constructor(
        @InjectRepository(CustomerAddress)
        private readonly customerAddressRepository: Repository<CustomerAddress>,

        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
    ) {}

    // Menmapilkan semua alamat
    async findAll(): Promise<CustomerAddress[]> {
        return this.customerAddressRepository.find({
            relations: { customer: true},
            order: { createdAt: 'DESC' },
        });
    }

    // Menampilkan alamat berdasarkan ID
    async findById(id: string): Promise<CustomerAddress> {
        const customerAddress = await this.customerAddressRepository.findOne({
            where: { id },
            relations: {customer: true},
        });

        if (!customerAddress) {
            throw new NotFoundException('Alamat customer tidak ditemukan');
        }

        return customerAddress;
    }

    // Menambahkan alamat baru
    async create(dto: CreateCustomerAddressDto): Promise<CustomerAddress> {
        const customer = await this.customerRepository.findOne({
            where: { id: dto.customerId },
        });

        if (!customer) {
            throw new NotFoundException('Customer tidak ditemukan');
        }

        const customerAddress = this.customerAddressRepository.create({
            recipientName: dto.recipientName,
            phone: dto.phone,
            address: dto.address,
            city: dto.city,
            postalCode: dto.postalCode,
            customer: customer,
        });

        return this.customerAddressRepository.save(customerAddress);
    }

    // Mengubah alamat
    async update(
        id: string,
        dto: UpdateCustomerAddressDto,
    ): Promise<CustomerAddress> {
        const customerAddress = await this.findById(id);

        if (dto.customerId) {
            const customer = await this.customerRepository.findOne({
                where: { id: dto.customerId },
            });

            if (!customer) {
                throw new NotFoundException('Customer tidak ditemukan');
            }

            customerAddress.customer = customer;
        }

        Object.assign(customerAddress, {
            recipientName: dto.recipientName,
            phone: dto.phone,
            address: dto.address,
            city: dto.city,
            postalCode: dto.postalCode,
        });

        return this.customerAddressRepository.save(customerAddress);
    }

    // Menghapus alamat
    async remove(id: string): Promise<void> {
        const customerAddress = await this.findById(id);
        await this.customerAddressRepository.remove(customerAddress);
    }
}
