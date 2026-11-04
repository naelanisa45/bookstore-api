import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePublisherDto {
  @IsString({ message: 'Nama penerbit harus berupa teks' })
  @IsNotEmpty({ message: 'Nama penerbit tidak boleh kosong' })
  @MaxLength(150, { message: 'Nama penerbit maksimal 150 karakter' })
  name: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @MaxLength(150, { message: 'Email maksimal 150 karakter' })
  email: string;
}