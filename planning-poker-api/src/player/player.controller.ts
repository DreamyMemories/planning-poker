import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Player } from '@prisma/client';
import { PlayerService } from './player.service';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerManyDto } from './dto/update-player-many.dto';

@ApiTags('Player')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('/init')
  @ApiCreatedResponse({ description: 'Created Succesfully 🎉' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request 😞' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request 😆' })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get('/lobby/:gameId')
  @ApiOkResponse({ description: 'The resource was returned successfully 🎉' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request 😆' })
  @ApiNotFoundResponse({ description: 'Resource not found 😞' })
  findAll(@Param('gameId') gameId: string) {
    return this.playerService.findAll(gameId);
  }

  @Get('/find/:playerId')
  @ApiOkResponse({ description: 'The resource was returned successfully 🎉' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request 😆' })
  @ApiNotFoundResponse({ description: 'Resource not found 😞' })
  findOne(@Param('playerId') playerId: string) {
    return this.playerService.findOne(playerId);
  }

  @Patch('/update/:playerId')
  @ApiOkResponse({ description: 'The resource was updated successfully 🎉' })
  @ApiNotFoundResponse({ description: 'Resource not found 😞' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request 😆' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request 😞' })
  async update(
    @Param('playerId') playerId: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return await this.playerService.update(playerId, updatePlayerDto);
  }

  @Patch('/update/all/:gameId')
  @ApiOkResponse({ description: 'The resource was updated successfully 🎉' })
  @ApiNotFoundResponse({ description: 'Resource not found 😞' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request 😆' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request 😞' })
  async updateMany(
    @Param('gameId') gameId: string,
    @Body() updatePlayerManyDto: UpdatePlayerManyDto,
  ) {
    return await this.playerService.updateMany(gameId, updatePlayerManyDto);
  }
  @Delete('remove/:playerId')
  @ApiOkResponse({ description: 'The resource was deleted successfully 🎉' })
  @ApiNotFoundResponse({ description: 'Resource not found 😞' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request 😆' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request 😞' })
  async remove(@Param('playerId') playerId: string) {
    return await this.playerService.remove(playerId);
  }
}
