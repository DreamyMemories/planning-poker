import { Status } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGameDto {
  // /**
  //  * The auto generated id used by MongoDB
  //  * @example c21bdfn3984184bf3831750b8486168q1
  //  */
  // @IsString()
  id: string;
  /**
   * The game uuid of the game
   * @example 751bdd84dd184bf3831750b8486168fb
   */
  @ApiProperty()
  @IsString()
  gameId: string;
  /**
   * The average value of the votes
   * @example 8
   */
  @ApiProperty()
  // @IsNumber()
  average: number;
  /**
   * The status of the game
   * @example IN PROGRESS
   */
  @ApiProperty()
  @IsEnum(Status)
  gameStatus: Status;
}
