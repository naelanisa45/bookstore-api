import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBookAuthorDto {
  @IsUUID(undefined, {
    message: 'Book ID harus berupa UUID yang valid',
  })
  @IsNotEmpty({ message: 'Book ID tidak boleh kosong' })
  bookId: string;

  @IsUUID(undefined, {
    message: 'Author ID harus berupa UUID yang valid',
  })
  @IsNotEmpty({ message: 'Author ID tidak boleh kosong' })
  authorId: string;
}