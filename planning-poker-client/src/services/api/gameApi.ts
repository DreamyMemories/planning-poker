import axios from "axios";
import { GameRequest, GameResponse, GameUpdate } from "../../types/game";

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function initGame(
  gameResponse: GameRequest
): Promise<GameResponse> {
  // let gameResult = await fetch(`${baseUrl}/game/init`, requestOptionGame);
  try {
    const response = await axios.post(`${baseUrl}/game/init`, gameResponse, {
      headers: { "Content-Type": "application/json" }
    });
    console.log(response.data)
    return response.data as GameResponse;
  } catch (error) {
    // Handle errors here, e.g., if the server returns a non-200 response code
    console.error('Error making POST request:', error);
    throw error;
  }
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
