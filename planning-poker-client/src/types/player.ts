import { Status } from './status';

export interface Player {
  name: string;
  playerId: string;
  gameId: string;
  status?: Status 
  value?: number 
  emoji?: string;
}

export interface PlayerRequest {
  name: string;
  playerId: string;
  gameId: string;
  value?: number;
  status?: Status; 
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
  name: string;
  playerId: string;
  gameId: string;
  socketId?: string;
  status?: Status 
  value?: number 
}