import { Game, Status } from '@prisma/client';
import { IsEnum, isIdentityCard, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GameEntity implements Game {
  id: string;

  @IsString()
  gameId: string;

  @IsString()
  name: string;

  @IsString()
  createdById: string;

  // @IsNumber()
  average: number | null;

  @IsEnum(Status)
  gameStatus: Status;
}
