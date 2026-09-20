import { IsNotEmpty, IsString } from 'class-validator';

export class ProfileQueryDto {
  @IsString()
  @IsNotEmpty({ message: 'User id is required.' })
  userId: string;
}
