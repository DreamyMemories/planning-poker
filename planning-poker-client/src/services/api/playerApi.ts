import {
  PlayerResponse,
  PlayerUpdate,
  PlayerUpdateMany,
} from "../../types/player";

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function initPlayer(
  playerResponse: PlayerResponse
): Promise<PlayerResponse> {
  const requestOptionPlayer = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playerResponse),
  };

  let playerResult = await fetch(`${baseUrl}player/init`, requestOptionPlayer);
  let playerObj = await playerResult.json();
  return playerObj as PlayerResponse;
}

export async function fetchPlayerLobby(
  gameId: string
): Promise<PlayerResponse[]> {
  const requestOptionPlayer = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  let playerResult = await fetch(
    `${baseUrl}player/lobby/${gameId}`,
    requestOptionPlayer
  );
  let gameObj = await playerResult.json();
  return gameObj as PlayerResponse[];
}

export async function updatePlayer(
  playerUpdate: PlayerUpdate
): Promise<PlayerUpdate> {
  const requestOptionGame = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playerUpdate),
  };

  let playerResult = await fetch(
    `${baseUrl}player/update/${playerUpdate.playerId}`,
    requestOptionGame
  );
  let playerObj = await playerResult.json();
  return playerObj as PlayerUpdate;
}

export async function updateAllPlayer(
  playerUpdateMany: PlayerUpdateMany
): Promise<PlayerUpdateMany> {
  const requestOptionPlayer = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playerUpdateMany),
  };

  let playerResult = await fetch(
    `${baseUrl}player/update/all/${playerUpdateMany.gameId}`,
    requestOptionPlayer
  );
  let playerObj = await playerResult.json();
  return playerObj as PlayerUpdateMany;
}

export async function removePlayer(playerId: string) {
  const requestOptionPlayer = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(playerId),
  };

  let playerResult = await fetch(
    `${baseUrl}remove/${playerId}`,
    requestOptionPlayer
  );
  let playerObj = await playerResult.json();
  return playerObj;
}
