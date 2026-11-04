import { IsNotEmpty, IsString, IsInt, IsUUID, MaxLength, Min } from 'class-validator';

export class CreateBookDto {
  @IsString({ message: 'Judul buku harus berupa teks' })
  @IsNotEmpty({ message: 'Judul buku tidak boleh kosong' })
  @MaxLength(200, { message: 'Judul buku maksimal 200 karakter' })
  title: string;

  @IsString({ message: 'ISBN harus berupa teks' })
  @IsNotEmpty({ message: 'ISBN tidak boleh kosong' })
  @MaxLength(20, { message: 'ISBN maksimal 20 karakter' })
  isbn: string;

  @IsInt({ message: 'Tahun terbit harus berupa angka bulat' })
  @Min(1, { message: 'Tahun terbit tidak valid' })
  publishedYear: number;

  @IsUUID('4', { message: 'Category ID harus berupa UUID yang valid' })
  @IsNotEmpty({ message: 'Category ID tidak boleh kosong' })
  categoryId: string;

  @IsUUID('4', { message: 'Publisher ID harus berupa UUID yang valid' })
  @IsNotEmpty({ message: 'Publisher ID tidak boleh kosong' })
  publisherId: string;
}