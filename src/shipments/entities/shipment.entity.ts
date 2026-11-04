import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToOne, JoinColumn } from 'typeorm';
import type { Order } from '../../orders/entities/order.entity.js';

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne('Order', 'shipment')
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'varchar', length: 100 })
  courier: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  trackingNumber: string;

  @Column({ type: 'text' })
  shippingAddress: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  shippingCost: number;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  shippedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deliveredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}