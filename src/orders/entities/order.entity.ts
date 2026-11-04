import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity.js';
import { OrderItem } from '../../order-items/entities/order-item.entity.js';
import { Payment } from '../../payments/entities/payment.entity.js';
import { Shipment } from '../../shipments/entities/shipment.entity.js';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne('Customer', 'orders', { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;

  @Column({ type: 'varchar', length: 30, default: 'pending' })
  status: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalAmount: number;

  @OneToMany('OrderItem', 'order')
  orderItems: OrderItem[];

  @OneToOne('Payment', 'order')
  payment: Payment;

  @OneToOne('Shipment', 'order')
  shipment: Shipment;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date;
}