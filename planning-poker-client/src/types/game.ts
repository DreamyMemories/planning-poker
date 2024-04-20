import { Status } from './status';

export interface Game {
  id?: string;
  gameId: string | null;
  name: string | null;
  average?: string | null;
  GameStatus?: Status;
  createdById?: string;
}

export interface GameResponse {
  ID: string;
  Name: string;
  ModeratorID: string;
  Average?: string | null;
  GameStatus: Status;
}

export interface GameRequest {
  name: string;
}

export interface GameUpdate {
  gameId: string;
  GameStatus: Status;
  average?: number;
}
