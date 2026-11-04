import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity.js';
import { Category } from '../categories/entities/category.entity.js';
import { Publisher } from '../publishers/entities/publisher.entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';
import { UpdateBookDto } from './dto/update-book.dto.js';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,

        @InjectRepository(Publisher)
        private readonly publisherRepository: Repository<Publisher>,
    ) {}

    async findAll(): Promise<Book[]> {
        return this.bookRepository.find({
            relations: {
                category: true,
                publisher: true,
            },
            order: { createdAt: 'DESC'},
        });
    }

    async findById(id: string): Promise<Book> {
        const book = await this.bookRepository.findOne({
            where: {id},
            relations: {
                category: true,
                publisher: true,
            },
        });

        if (!book) {
            throw new NotFoundException('Buku tidak ditemukan');
        }

        return book;
    }

    async create(dto: CreateBookDto): Promise<Book> {
        const category = await this.categoryRepository.findOne({
            where: { id: dto.categoryId},
        });

        if (!category) {
            throw new NotFoundException('Kategori tidak ditemukan');
        }

        const publisher = await this.publisherRepository.findOne({
            where: { id: dto.publisherId},
        });

        if (!publisher) {
            throw new NotFoundException('Penerbit tidak ditemukan');
        }

        const book = this.bookRepository.create({
            title: dto.title,
            isbn: dto.isbn,
            publishedYear: dto.publishedYear,
            category: category,
            publisher: publisher,
        });

        return this.bookRepository.save(book);
    }

    async update(id: string, dto: UpdateBookDto): Promise<Book> {
        const book = await this.findById(id);

        if(dto.categoryId) {
            const category = await this.categoryRepository.findOne({
                where: {id: dto.categoryId},
            });

            if (!category) {
                throw new NotFoundException('Kategori tidak ditemukan');
            }

            book.category = category;
        }

        if (dto.publisherId) {
            const publisher = await this.publisherRepository.findOne({
                where: {id: dto.publisherId},
            });

            if (!publisher) {
                throw new NotFoundException('Penerbit tidak ditemukan');
            }

            book.publisher = publisher;
        }

        Object.assign(book, {
            title: dto.title,
            isbn: dto.isbn,
            publishedYear: dto.publishedYear,
        });
    
        return this.bookRepository.save(book);
    }

    async remove(id: string): Promise<void> {
    const book = await this.findById(id);
    await this.bookRepository.softRemove(book);
  }
}
