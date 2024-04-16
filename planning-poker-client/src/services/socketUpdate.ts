import { io } from "socket.io-client";
import React, { useState, useEffect } from "react";

const socket = io(`${process.env.REACT_APP_BASE_URL}`);

export function getSocketId(): string {
  return socket.id;
}

export function useSocketUpdate(updateName: string) {
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    socket.on(updateName, () => {
      setUpdateCount((x) => x + 1);
    });

    return () => {
      socket.off(updateName);
    };
  }, [updateName]);

  return updateCount;
}

export function useSocketCallback(
  updateName: string,
  callback: (...args: any[]) => void
) {
  useEffect(() => {
    socket.on(updateName, callback);

    return () => {
      socket.off(updateName);
    };
  }, [callback, updateName]);
}
export function useSocketCallbackDisconnect(playerId: string) {
  useEffect(() => {
    socket.on("disconnect", () => {
      socket.emit("disconnectPlayer", playerId);
    });
  }, [playerId]);
}
