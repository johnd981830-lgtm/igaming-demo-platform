import { IsNotEmpty, IsString } from 'class-validator';

export class PlaceBetDto {
  @IsNotEmpty({ message: 'User id is required.' })
  userId: string;

  @IsNotEmpty({ message: 'Match id is required.' })
  matchId: string;

  @IsString()
  @IsNotEmpty({ message: 'Selection is required.' })
  selection: string;

  @IsNotEmpty({ message: 'Stake is required.' })
  stake: number;
}
