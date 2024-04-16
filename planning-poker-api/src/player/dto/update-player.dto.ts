import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlayerDto {
  /**
   * The uuid of the player
   * @example 751bdd84dd184bf3831750b8486168fb
   */
  @ApiProperty()
  @IsString()
  playerId: string;
  /**
   * The vote of the Player
   * @example 2
   */
  @ApiProperty()
  @IsNumber()
  value?: number;

  gameId?: string;
}
