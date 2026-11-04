import { IsUUID, IsString, IsNotEmpty, IsNumber, IsOptional, MaxLength, Min, IsAlphanumeric } from 'class-validator';

export class CreateShipmentDto {
  @IsUUID(undefined, { message: 'Order ID harus berupa UUID yang valid'})
  @IsNotEmpty({ message: 'Order ID tidak boleh kosong' })
  orderId: string;

  @IsString({ message: 'Nama kurir harus berupa teks' })
  @IsNotEmpty({ message: 'Nama kurir tidak boleh kosong' })
  @MaxLength(100, {message: 'Nama kurir maksimal 100 karakter'})
  courier: string;

  @IsOptional()
  @IsAlphanumeric('en-US', { message: 'Nomor resi harus berupa teks dan angka' })
  @MaxLength(100, { message: 'Nomor resi maksimal 100 karakter'})
  trackingNumber?: string;

  @IsString({ message: 'Alamat pengiriman harus berupa teks' })
  @IsNotEmpty({ message: 'Alamat pengiriman tidak boleh kosong' })
  shippingAddress: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Biaya pengiriman harus berupa angka maksimal 2 desimal' },
  )
  @Min(0, { message: 'Biaya pengiriman tidak boleh kurang dari 0' })
  shippingCost: number;
}