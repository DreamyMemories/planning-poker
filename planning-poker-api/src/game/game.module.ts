import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GameController],
  providers: [GameService, PrismaService],
})
export class GameModule {}
