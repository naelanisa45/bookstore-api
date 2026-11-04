import { IsUUID, IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreatePaymentDto {
@IsUUID(undefined, { message: 'Order ID harus berupa UUID yang valid'})
@IsNotEmpty({ message: 'Order ID tidak boleh kosong' })
orderId: string;

  @IsString({ message: 'Metode pembayaran harus berupa teks'})
  @IsNotEmpty({ message: 'Metode pembayaran tidak boleh kosong'})
  @MaxLength(50, { message: 'Metode pembayaran maksimal 50 karakter'})
  paymentMethod: string;

  @IsOptional()
  @IsString({ message: 'Transaction ID harus berupa teks'})
  @MaxLength(100, {message: 'Transaction ID maksimal 100 karakter'})
  transactionId?: string;
}