
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CustomersModule } from './customers/customers.module.js';
import { CustomerAddressModule } from './customer-address/customer-address.module.js';
import { CategoriesModule } from './categories/categories.module.js';
import { PublishersModule } from './publishers/publishers.module.js';
import { BooksModule } from './books/books.module.js';
import { AuthorsModule } from './authors/authors.module.js';
import { BookAuthorsModule } from './book-authors/book-authors.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { OrderItemsModule } from './order-items/order-items.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { ShipmentsModule } from './shipments/shipments.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'staging', 'production')
          .default('development'),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    CustomersModule,

    CustomerAddressModule,

    CategoriesModule,

    PublishersModule,

    BooksModule,

    AuthorsModule,

    BookAuthorsModule,

    OrdersModule,

    OrderItemsModule,

    PaymentsModule,

    ShipmentsModule,    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
