import { Injectable } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { PrismaService } from 'src/prisma.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerManyDto } from './dto/update-player-many.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayerEntity } from './entities/player.entity';

@Injectable()
@WebSocketGateway({ cors: true })
export class PlayerService implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private prisma: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<CreatePlayerDto> {
    const newPlayer = await this.prisma.player.create({
      data: createPlayerDto,
    });
    this.server.emit('join');
    return newPlayer;
  }

  async findAll(gameId: string): Promise<PlayerEntity[]> {
    const result = await this.prisma.player.findMany({
      where: { gameId: { equals: gameId } },
    });
    return result;
  }

  async findOne(playerId: string): Promise<PlayerEntity> {
    const result = await this.prisma.player.findUniqueOrThrow({
      where: { playerId: playerId },
    });
    return result;
  }

  async update(playerId: string, updatePlayerDto: UpdatePlayerDto) {
    const updatedPlayer = await this.prisma.player.update({
      where: { playerId: playerId },
      data: updatePlayerDto,
    });
    this.server.emit('join');

    return updatedPlayer;
  }

  async updateMany(gameId: string, updatePlayerManyDto: UpdatePlayerManyDto) {
    const updatedMany = await this.prisma.player.updateMany({
      where: { gameId: gameId },
      data: { value: updatePlayerManyDto.value },
    });
    this.server.emit('join');

    return updatedMany;
  }

  async remove(playerId: string) {
    const removePlayer = await this.prisma.player.delete({
      where: { playerId: playerId },
    });
    this.server.emit('join');

    return removePlayer;
  }

  async handleDisconnect(client: Socket) {
    try {
      await this.prisma.player.delete({
        where: { socketId: client.id },
      });
      this.server.emit('join');
    } catch (ex) {
      console.log('failed to disconnect user',ex);
    }
  }
}
