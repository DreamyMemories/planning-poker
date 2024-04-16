import { CircularProgress, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { GameResponse } from "../../types/game";
import { Player } from "../../types/player";
import { GameArea } from "./GameArea/GameArea";
import "./Poker.css";
import { CreatePlayerDialog } from "./CreatePlayerDialog/CreatePlayerDialog";
import { useAppDispatch, useAppSelector } from "../../states/store";
import { setGame } from "../../states/GameSlice";
import { useSocketCallback } from "../../services/socketUpdate";
import { fetchPlayerLobby, removePlayer } from "../../services/api/playerApi";
import { fetchGameStatus } from "../../services/api/gameApi";

export const Poker = () => {
  const [gameData, setGameData] = useState<GameResponse | undefined>();
  const [playersData, setPlayersData] = useState<Player[] | undefined>();
  const [loading, setIsLoading] = useState(false);

  const playerDataState = useAppSelector((state) => state.playerState);

  const dispatch = useAppDispatch();
  const fetchLobby = useCallback(async () => {
    try {
      const gameId = window.location.href.replace(/([^\/]*\/){4}/, "");

      if (gameId) {
        const fetchPlayersData = await fetchPlayerLobby(gameId);
        setPlayersData(fetchPlayersData);

        const fetchGameData = await fetchGameStatus(gameId);
        setGameData(fetchGameData);
      }
    } catch (err) {
      return (
        <Typography>
          An error has occured while trying to fetch the lobby 😞
        </Typography>
      );
    }
  }, []);

  // Establish socket connection, and send a REST API request to check whether game has started
  useSocketCallback("join", fetchLobby);

  useEffect(() => {
    if (gameData) {
      dispatch(setGame(gameData));
    }
    fetchLobby();
  }, []);

  if (loading) {
    return (
      <div className="PokerLoading">
        <CircularProgress />
      </div>
    );
  }

  if (!gameData && !playersData) {
    return <Typography>Game not found</Typography>;
  }

  return (
    <>
      {gameData && playersData && playerDataState.player?.playerId ? (
        <GameArea
          game={gameData}
          players={playersData}
          currentPlayerId={playerDataState.player?.playerId}
        />
      ) : (
        <CreatePlayerDialog open={true}></CreatePlayerDialog>
      )}
    </>
  );
};

export default Poker;
