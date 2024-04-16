import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlayerDto {
  /**
   * The uuid of the player
   * @example 751bdd84dd184bf3831750b8486168fb
   */
  @ApiProperty()
  @IsString()
  playerId: string;
  /**
   * The display name of the Player
   * @example er42
   */
  @IsString()
  name: string;
  /**
   * The game uuid of the player
   * @example 977ax184dd184bf3831750b84861683k
   */
  @ApiProperty()
  @IsString()
  gameId: string;
}
