import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'http';
import { PrismaService } from 'src/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameEntity } from './entities/game.entity';

@Injectable()
@WebSocketGateway({ cors: true })
export class GameService {
  @WebSocketServer()
  server: Server;
  constructor(private prisma: PrismaService) {}

  async findOne(gameId: string): Promise<GameEntity> {
    const result = await this.prisma.game.findUniqueOrThrow({
      where: { gameId: gameId },
    });
    return result;
  }

  async update(
    gameId: string,
    updateGameDto: UpdateGameDto,
  ): Promise<UpdateGameDto> {
    const updatedGame = await this.prisma.game.update({
      where: { gameId: gameId },
      data: updateGameDto,
    });

    this.server.emit('join');

    return updatedGame;
  }

  async create(createGameDto: CreateGameDto): Promise<CreateGameDto> {
    return await this.prisma.game.create({
      data: createGameDto,
    });
  }
}
