import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity.js';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException('Penulis tidak ditemukan');
    }

    return author;
  }

  async create(body: any): Promise<Author> {
    const author = new Author();
    
    Object.assign(author, body);

    const savedAuthor = await this.authorRepository.save(author);

    return savedAuthor;
  }

  async update(id: string, body: any): Promise<Author> {
    const author = await this.findById(id);

    Object.assign(author, body);

    return this.authorRepository.save(author);
  }

  async remove(id: string): Promise<void> {
    const author = await this.findById(id);

    await this.authorRepository.softRemove(author);
  }
}
