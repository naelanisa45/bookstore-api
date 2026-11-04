import { IsNotEmpty, IsUUID, IsInt, Min, IsNumber } from 'class-validator';

export class CreateOrderItemDto {
  @IsUUID(undefined, {
    message: 'Order ID harus berupa UUID yang valid',
  })
  @IsNotEmpty({ message: 'Order ID tidak boleh kosong' })
  orderId: string;

  @IsUUID(undefined, {
    message: 'Book ID harus berupa UUID yang valid',
  })
  @IsNotEmpty({ message: 'Book ID tidak boleh kosong' })
  bookId: string;

  @IsInt({ message: 'Jumlah buku harus berupa bilangan bulat' })
  @Min(1, { message: 'Jumlah buku minimal 1' })
  quantity: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Harga satuan harus berupa angka maksimal 2 angka desimal' },
  )
  @Min(0, { message: 'Harga satuan tidak boleh negatif' })
  unitPrice: number;
}