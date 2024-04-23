import React, { useState, useEffect } from "react";
// Grab game ID from game slice
import { useAppSelector } from "../states/store";

export function useInitiateSocket() : WebSocket | null {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const gameId = useAppSelector((state) => state.gameState.game?.ID);
  useEffect(() => {
    if (!gameId) {
      return;
    }
    const socket = new WebSocket(`${process.env.REACT_APP_BASE_URL}/ws/${gameId}`);

    socket.onopen = () => {
      console.log("Socket connected");
    }

    socket.onerror = (error) => {
      console.error("Socket error", error);
    }

    socket.onclose = () => {
      console.log("Socket closed");
    }

    setWs(socket);
  }, [gameId])
  return ws
}

export function useSocketCallback(
  ws: WebSocket | null,
  updateName: string,
  callback: (...args: any[]) => void
) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === updateName) {
        callback();
      }
    }
    ws?.addEventListener("message", handleMessage);

    return () => {
      ws?.removeEventListener("message", handleMessage);
    };
  }, [callback, updateName, ws]);
}