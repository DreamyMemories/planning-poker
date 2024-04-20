import axios from "axios";
import {
  PlayerRequest,
  PlayerResponse,
  PlayerUpdate,
  PlayerUpdateMany,
} from "../../types/player";

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function initPlayer(
  playerResponse: PlayerRequest
): Promise<PlayerResponse> {

  try {
    const response = await axios.post(
      `${baseUrl}/player/init`,
      playerResponse,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response.data);
    return response.data as PlayerResponse;
  } catch (error) {
    // Handle errors here, e.g., if the server returns a non-200 response code
    console.error("Error making POST request:", error);
    throw error;
  }
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
