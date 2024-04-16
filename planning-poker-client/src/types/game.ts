import { Status } from './status';

export interface Game {
  id?: string;
  gameId: string | null;
  name: string | null;
  average?: string | null;
  gameStatus?: Status;
  createdById?: string;
}

export interface GameResponse {
  id?: string;
  gameId: string;
  name: string;
  createdById: string;
  average?: string | null;
  gameStatus: Status;
}

export interface GameRequest {
  gameId: string;
  name: string;
  createdById: string;
  gameStatus: Status | null;
}

export interface GameUpdate {
  gameId: string;
  gameStatus: Status;
  average?: number;
}
