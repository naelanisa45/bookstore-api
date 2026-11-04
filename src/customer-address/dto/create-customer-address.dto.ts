import {
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches,
  IsUUID,
} from 'class-validator';

export class CreateCustomerAddressDto {
  @IsString({ message: 'Nama penerima harus berupa teks' })
  @IsNotEmpty({ message: 'Nama penerima tidak boleh kosong' })
  @MaxLength(150, { message: 'Nama penerima maksimal 150 karakter' })
  recipientName: string;

  @IsNotEmpty({ message: 'Nomor telepon tidak boleh kosong' })
  @Matches(/^[0-9]+$/, { message: 'Nomor telepon hanya boleh berisi angka'})
  @MaxLength(12, { message: 'Nomor telepon maksimal 12 digit'})
  phone: string;

  @IsString({ message: 'Alamat harus berupa teks' })
  @IsNotEmpty({ message: 'Alamat tidak boleh kosong' })
  address: string;

  @IsString({ message: 'Kota harus berupa teks' })
  @IsNotEmpty({ message: 'Kota tidak boleh kosong' })
  @MaxLength(100, { message: 'Kota maksimal 100 karakter' })
  city: string;

  @IsString({ message: 'Kode pos harus berupa teks' })
  @IsNotEmpty({ message: 'Kode pos tidak boleh kosong' })
  @MaxLength(10, { message: 'Kode pos maksimal 10 karakter' })
  postalCode: string;

  @IsUUID('4', { message: 'Customer ID harus berupa UUID yang valid' })
  @IsNotEmpty({ message: 'Customer ID tidak boleh kosong' })
  customerId: string;
}