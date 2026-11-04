import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity.js';
import { CreatePublisherDto } from './dto/create-publisher.dto.js';
import { UpdatePublisherDto } from './dto/update-publisher.dto.js';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  async findAll(): Promise<Publisher[]> {
    return this.publisherRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOne({
      where: { id },
    });

    if (!publisher) {
      throw new NotFoundException('Penerbit tidak ditemukan');
    }

    return publisher;
  }

  async create(dto: CreatePublisherDto): Promise<Publisher> {
    const publisher = this.publisherRepository.create(dto);
    return this.publisherRepository.save(publisher);
  }

  async update(
    id: string,
    dto: UpdatePublisherDto,
  ): Promise<Publisher> {
    const publisher = await this.findById(id);

    Object.assign(publisher, dto);

    return this.publisherRepository.save(publisher);
  }

  async remove(id: string): Promise<void> {
    const publisher = await this.findById(id);
    await this.publisherRepository.softRemove(publisher);
  }
}