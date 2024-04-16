import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { GameService } from './game.service';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiUnprocessableEntityResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { UpdateGameDto } from './dto/update-game.dto';
import { CreateGameDto } from './dto/create-game.dto';

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('/init')
  @ApiCreatedResponse({ description: 'Created Succesfully 🎉' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request 😞' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request 😆' })
  async create(@Body() gameData: CreateGameDto): Promise<CreateGameDto> {
    return this.gameService.create(gameData);
  }

  @Get('/status/:gameId')
  @ApiOkResponse({ description: 'The resource was returned successfully 🎉' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request 😆' })
  @ApiNotFoundResponse({ description: 'Resource not found 😞' })
  findOne(@Param('gameId') gameId: string) {
    return this.gameService.findOne(gameId);
  }

  @Patch('/update/:id')
  @ApiOkResponse({ description: 'The resource was updated successfully 🎉' })
  @ApiNotFoundResponse({ description: 'Resource not found 😞' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request 😆' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request 😞' })
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gameService.update(id, updateGameDto);
  }
}
