import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsString({ message: 'Nama penulis harus berupa teks' })
  @IsNotEmpty({ message: 'Nama penulis tidak boleh kosong' })
  @MaxLength(150, { message: 'Nama penulis maksimal 150 karakter' })
  name: string;
}