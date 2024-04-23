import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grow,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../states/store";
import { setPlayer } from "../../../states/PlayerSlice";
import { setGame } from "../../../states/GameSlice";
import { GameRequest, GameResponse } from "../../../types/game";
import { PlayerRequest, PlayerResponse } from "../../../types/player";
import { Status } from "../../../types/status";
import "./CreateGame.css";
import { initGame } from "../../../services/api/gameApi";
import { initPlayer } from "../../../services/api/playerApi";

export const CreateGame = () => {
  const history = useNavigate();
  const [gameName, setGameName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [hasDefaults, setHasDefaults] = useState({ game: true, name: true });

  const [gameData, setGameData] = useState<GameResponse | undefined>();

  const [playerData, setPlayerData] = useState<PlayerResponse | undefined>();

  const dispatch = useAppDispatch();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const gameResponse: GameRequest = {
      name: gameName,
    };
    
    try {
      const initGameSettings = await initGame(gameResponse);
      setGameData(initGameSettings);
      console.log("Setting game data")
      const playerResponse: PlayerRequest = {
        name: playerName,
        gameId: initGameSettings.ID,
      };

      const initPlayerSettings = await initPlayer(playerResponse);
      setPlayerData(initPlayerSettings);
    } catch (ex) {
      return (
        <Typography>
          An error has occured while trying to initiialise the game 😞
        </Typography>
      );
    }
  };

  useEffect(() => {
    if (gameData && playerData) {
      dispatch(setGame(gameData));
      dispatch(setPlayer(playerData));
      history(`/game/${gameData.ID}`);
    }
  }, [gameData, playerData, history, dispatch]);

  const emptyGameName = () => {
    if (hasDefaults.game) {
      setGameName("");
      hasDefaults.game = false;
      setHasDefaults(hasDefaults);
    }
  };

  const emptyCreatorName = () => {
    if (hasDefaults.name) {
      setPlayerName("");
      hasDefaults.name = false;
      setHasDefaults(hasDefaults);
    }
  };

  return (
    <Grow in={true} timeout={1000}>
      <form onSubmit={handleSubmit}>
        <Card variant="outlined" className="CreateGameCard">
          <CardHeader
            className="CreateGameCardHeader"
            title="Create New Session"
            titleTypographyProps={{ variant: "h4" }}
          />
          <CardContent className="CreateGameCardContent">
            <CustomInputLabel>Choose a Session Name</CustomInputLabel>
            <TextField
              className="CreateGameTextField"
              required
              id="filled-required"
              placeholder="Enter a session name"
              value={gameName || ""}
              onClick={() => emptyGameName()}
              variant="outlined"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setGameName(event.target.value)
              }
            />
            <CustomInputLabel>Choose a Display Name</CustomInputLabel>
            <TextField
              className="CreateGameTextField"
              required
              id="filled-required"
              placeholder="Enter your name"
              value={playerName || ""}
              onClick={() => emptyCreatorName()}
              variant="outlined"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPlayerName(event.target.value)
              }
            />
          </CardContent>
          <CardActions className="CreateGameCardAction">
            <Button
              type="submit"
              variant="contained"
              className="CreateGameButton"
              sx={{ backgroundColor: "#de3f3e", color: "white" }}
            >
              Create Game
            </Button>
          </CardActions>
        </Card>
      </form>
    </Grow>
  );
};

export const CustomInputLabel = styled(InputLabel)({
  color: "black",
  fontSize: "1.2rem",
  paddingBottom: "10px",
  paddingTop: "10px",
});
