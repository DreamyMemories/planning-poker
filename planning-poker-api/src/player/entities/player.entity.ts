import { IsNumber, IsString } from 'class-validator';
import { Player } from '@prisma/client';

export class PlayerEntity implements Player {
  @IsString()
  id: string;

  @IsString()
  playerId: string;

  @IsString()
  name: string;

  @IsString()
  gameId: string;

  @IsString()
  socketId: string;

  @IsNumber()
  value: number;
}
