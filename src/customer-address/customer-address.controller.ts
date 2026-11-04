import { Get, Body, Controller, Delete, Param, Post, Patch } from '@nestjs/common';
import { CreateCustomerAddressDto } from './dto/create-customer-address.dto.js';
import { CustomerAddressService } from './customer-address.service.js';
import { UpdateCustomerAddressDto } from './dto/update-customer-address.dto.js';

@Controller('customer-address')
export class CustomerAddressController {
    constructor(
        private readonly customerAddressService: CustomerAddressService,
    ) {}

    // Menampilkan semua alamat
    @Get()
    findAll() {
        return this.customerAddressService.findAll();
    }

    // Menampilkan alamat berdasarkan ID
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.customerAddressService.findById(id);
    }

    // Menambahkan alamat baru
    @Post()
    create(@Body() dto: CreateCustomerAddressDto) {
        return this.customerAddressService.create(dto);
    }

    // Mengubah alamat
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateCustomerAddressDto,
    ) {
        return this.customerAddressService.update(id, dto);
    }

    // Menghapus alamat
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.customerAddressService.remove(id);
    }
}
