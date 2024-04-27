import axios from "axios";
import { GameRequest, GameResponse, GameUpdate } from "../../types/game";

const baseUrl = process.env.REACT_APP_BASE_URL;

export async function initGame(
  gameResponse: GameRequest
): Promise<GameResponse> {
  // let gameResult = await fetch(`${baseUrl}/game/init`, requestOptionGame);
  try {
    const response = await axios.post(`${baseUrl}/game/init`, gameResponse, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data as GameResponse;
  } catch (error) {
    // Handle errors here, e.g., if the server returns a non-200 response code
    console.error("Error making POST request:", error);
    throw error;
  }
}

export async function updateGame(gameUpdate: GameUpdate): Promise<GameUpdate> {
  try {
    const response = await axios.post(
      `${baseUrl}/game/update/${gameUpdate.gameId}`,
      gameUpdate,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data as GameUpdate;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
}

export async function fetchGameStatus(gameId: string): Promise<GameResponse> {
  try {
    const response = await axios.get(`${baseUrl}/game/status/${gameId}`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data as GameResponse;
  } catch {
    console.error("Error making GET request");
    throw new Error("Error making GET request");
  }
}
