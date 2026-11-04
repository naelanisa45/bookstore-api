import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookAuthor } from './entities/book-author.entity.js';
import { Book } from '../books/entities/book.entity.js';
import { Author } from '../authors/entities/author.entity.js';
import { CreateBookAuthorDto } from './dto/create-book-author.dto.js';
import { UpdateBookAuthorDto } from './dto/update-book-author.dto.js';

@Injectable()
export class BookAuthorsService {
  constructor(
    @InjectRepository(BookAuthor)
    private readonly bookAuthorRepository: Repository<BookAuthor>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<BookAuthor[]> {
    return this.bookAuthorRepository.find({
      relations: {
        book: true,
        author: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string): Promise<BookAuthor> {
    const data = await this.bookAuthorRepository.findOne({
      where: { id },
      relations: {
        book: true,
        author: true,
      },
    });

    if (!data) {
      throw new NotFoundException('Data book author tidak ditemukan');
    }

    return data;
  }

  async create(dto: CreateBookAuthorDto): Promise<BookAuthor> {
    const book = await this.bookRepository.findOne({
      where: { id: dto.bookId },
    });

    if (!book) {
      throw new NotFoundException('Buku tidak ditemukan');
    }

    const author = await this.authorRepository.findOne({
      where: { id: dto.authorId },
    });

    if (!author) {
      throw new NotFoundException('Penulis tidak ditemukan');
    }

    const data = this.bookAuthorRepository.create({
      book,
      author,
    });

    return this.bookAuthorRepository.save(data);
  }

  async update(
    id: string,
    dto: UpdateBookAuthorDto,
  ): Promise<BookAuthor> {
    const data = await this.findById(id);

    if (dto.bookId) {
      const book = await this.bookRepository.findOne({
        where: { id: dto.bookId },
      });

      if (!book) {
        throw new NotFoundException('Buku tidak ditemukan');
      }

      data.book = book;
    }

    if (dto.authorId) {
      const author = await this.authorRepository.findOne({
        where: { id: dto.authorId },
      });

      if (!author) {
        throw new NotFoundException('Penulis tidak ditemukan');
      }

      data.author = author;
    }

    return this.bookAuthorRepository.save(data);
  }

  async remove(id: string): Promise<void> {
    const data = await this.findById(id);
    await this.bookAuthorRepository.remove(data);
  }
}