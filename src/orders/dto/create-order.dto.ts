
import {
  IsUUID,
  IsNotEmpty,
} from 'class-validator';

export class CreateOrderDto {
  @IsUUID(undefined, {
    message: 'Customer ID harus berupa UUID yang valid',
  })
  @IsNotEmpty({
    message: 'Customer ID tidak boleh kosong',
  })
  customerId: string;
}
