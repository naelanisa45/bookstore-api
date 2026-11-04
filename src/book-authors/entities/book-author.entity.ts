import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import type { Book } from '../../books/entities/book.entity.js';
import type { Author } from '../../authors/entities/author.entity.js';

@Entity('book_authors')
export class BookAuthor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('Book', 'bookAuthors', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ManyToOne('Author', 'bookAuthors', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @CreateDateColumn()
  createdAt: Date;
}