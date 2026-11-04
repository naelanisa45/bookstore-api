
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  Matches
} from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'Nama harus berupa teks' })
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @MaxLength(150, { message: 'Nama maksimal 150 karakter' })
  name: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @MaxLength(150, { message: 'Email maksimal 150 karakter' })
  email: string;

  @Matches(/^[0-9]+$/, { message: 'Nomor telepon hanya boleh berisi angka' })
  @IsNotEmpty({ message: 'Nomor telepon tidak boleh kosong' })
  @MaxLength(20, { message: 'Nomor telepon maksimal 12 karakter' })
  phone: string;
}
