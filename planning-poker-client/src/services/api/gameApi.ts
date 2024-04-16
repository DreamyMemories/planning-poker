import { GameResponse, GameUpdate } from "../../types/game";

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function initGame(
  gameResponse: GameResponse
): Promise<GameResponse> {
  const requestOptionGame = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gameResponse),
  };

  let gameResult = await fetch(`${baseUrl}game/init`, requestOptionGame);
  let gameObj = await gameResult.json();
  return gameObj as GameResponse;
}

export async function updateGame(gameUpdate: GameUpdate): Promise<GameUpdate> {
  const requestOptionGame = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(gameUpdate),
  };

  let gameResult = await fetch(
    `${baseUrl}game/update/${gameUpdate.gameId}`,
    requestOptionGame
  );
  let gameObj = await gameResult.json();
  return gameObj as GameUpdate;
}

export async function fetchGameStatus(gameId: string): Promise<GameResponse> {
  const requestOptionGame = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  let gameResult = await fetch(
    `${baseUrl}game/status/${gameId}`,
    requestOptionGame
  );
  let gameObj = await gameResult.json();
  return gameObj as GameResponse;
}
