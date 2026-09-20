import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class WalletActionDto {
  @IsNotEmpty({ message: 'User id is required.' })
  userId: string;

  @IsNotEmpty({ message: 'Amount is required.' })
  amount: number;
}
