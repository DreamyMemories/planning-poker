import { Status } from './status';

export interface PlayerRequest {
  name: string;
  gameId: string;
}

export interface PlayerUpdate {
  playerId: string;
  value?: number;
}

export interface PlayerUpdateMany {
  gameId: string;
  value: number;
}

export interface PlayerResponse {
  Name: string;
  ID: string;
  GameID: string;
  socketId?: string;
  Value: number 
}