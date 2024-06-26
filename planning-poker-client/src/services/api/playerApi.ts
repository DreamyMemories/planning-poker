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
  try {
    const response = await axios.get(`${baseUrl}/player/lobby/${gameId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data as PlayerResponse[];

  } catch (error) {
    // Handle errors here, e.g., if the server returns a non-200 response code
    console.error("Error making GET request:", error);
    throw error;
  }
}

export async function updatePlayer(
  playerUpdate: PlayerUpdate
): Promise<PlayerResponse> {
  try {
    const response = await axios.post(
      `${baseUrl}/player/update/${playerUpdate.playerId}`,
      playerUpdate,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data as PlayerResponse;
  } catch (error) {
    // Handle errors here, e.g., if the server returns a non-200 response code
    console.error("Error making POST request:", error);
    throw error;
  }
}

export async function updateAllPlayer(
  playerUpdateMany: PlayerUpdateMany
): Promise<PlayerUpdateMany> {
  try {
    const response = await axios.post(
      `${baseUrl}/player/update/all/${playerUpdateMany.gameId}`,
      playerUpdateMany,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data as PlayerUpdateMany;
  } catch (error) {
    // Handle errors here, e.g., if the server returns a non-200 response code
    console.error("Error making POST request:", error);
    throw error;
  }
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
