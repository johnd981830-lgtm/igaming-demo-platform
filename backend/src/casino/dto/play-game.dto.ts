import { IsNotEmpty, IsString } from 'class-validator';

export class PlayGameDto {
  @IsNotEmpty({ message: 'User id is required.' })
  userId: string;

  @IsNotEmpty({ message: 'Game id is required.' })
  gameId: string;

  @IsNotEmpty({ message: 'Wager is required.' })
  wager: number;
}
