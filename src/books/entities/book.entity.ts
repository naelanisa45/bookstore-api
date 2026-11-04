import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import type { Category } from '../../categories/entities/category.entity.js';
import type { Publisher } from '../../publishers/entities/publisher.entity.js';
import type { BookAuthor } from '../../book-authors/entities/book-author.entity.js';
import type { OrderItem } from '../../order-items/entities/order-item.entity.js';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  isbn: string;

  @Column({ type: 'int' })
  publishedYear: number;

  @ManyToOne('Category', 'books', { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne('Publisher', 'books', { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publisher;

  @OneToMany('BookAuthor', 'book')
  bookAuthors: BookAuthor[];

  @OneToMany('OrderItem', 'book')
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}