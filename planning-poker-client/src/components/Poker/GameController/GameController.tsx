import { PlayArrow } from "@mui/icons-material";
import RefreshIcon from "@mui/icons-material/Autorenew";
import ExitToApp from "@mui/icons-material/ExitToApp";
import LinkIcon from "@mui/icons-material/Link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grow,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import { blue, green, orange } from "@mui/material/colors";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../ThemeContext";
import { updateGame } from "../../../services/api/gameApi";
import {
  fetchPlayerLobby,
  updateAllPlayer,
} from "../../../services/api/playerApi";
import { GameResponse, GameUpdate } from "../../../types/game";
import { PlayerUpdateMany } from "../../../types/player";
import { Status } from "../../../types/status";
import "./GameController.css";

interface GameControllerProps {
  game: GameResponse;
  currentPlayerId: string;
}

export const GameController: React.FC<GameControllerProps> = ({
  game,
  currentPlayerId,
}) => {
  const history = useNavigate();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [gameData, setGameData] = useState<GameUpdate | undefined>();
  const { theme } = useTheme();

  const copyInviteLink = () => {
    const dummy = document.createElement("input");
    const initGameUrl = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = initGameUrl;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setShowCopiedMessage(true);
  };

  const startGame = async (gameId: string) => {
    try {
      const gameUpdate: GameUpdate = {
        gameId: gameId,
        GameStatus: Status.IN_PROGRESS,
        average: 0,
      };

      const updateGameStatus = await updateGame(gameUpdate);
      setGameData(updateGameStatus);
    } catch (ex) {
      return (
        <Typography>
          An error has occured while trying to update game status 😞
        </Typography>
      );
    }
  };

  const resetGame = async (gameId: string) => {
    try {
      const playerUpdateMany: PlayerUpdateMany = {
        gameId: gameId,
        value: 0,
      };

      await updateAllPlayer(playerUpdateMany);

      const gameUpdate: GameUpdate = {
        gameId: gameId,
        GameStatus: Status.NOT_STARTED,
        average: 0,
      };

      const gameResetAverage = await updateGame(gameUpdate);
      setGameData(gameResetAverage);
    } catch (ex) {
      return (
        <Typography>
          An error has occured while trying to reset the game 😞
        </Typography>
      );
    }
  };

  const finishGame = async (gameId: string) => {
    try {
      const fetchPlayersData = await fetchPlayerLobby(gameId);
      if (fetchPlayersData) {
        const filteredPlayersData = fetchPlayersData.filter((obj) => {
          return obj.Value && obj.Value > 0;
        });

        const values = filteredPlayersData.map((player) => player.Value);
        const sum = values.reduce((total, value) => total! + value!, 0);
        const average = sum! / filteredPlayersData!.length;
        const gameUpdate: GameUpdate = {
          gameId: gameId,
          GameStatus: Status.FINISHED,
          average: Math.round(average),
        };
        const updateGameAverage = await updateGame(gameUpdate);
        setGameData(updateGameAverage);
        if (!gameData?.average) {
          setGameData(updateGameAverage);
        }
      }
    } catch (ex) {
      return (
        <Typography>
          An error has occured while trying to finish the game 😞
        </Typography>
      );
    }
  };

  const leaveGame = () => {
    history(`/`);
  };

  const isModerator = (moderatorId: string, currentPlayerId: string) => {
    return moderatorId === currentPlayerId;
  };

  const mainButton =
    game.GameStatus === Status.NOT_STARTED ? (
      <div className="GameControllerButtonContainer">
        <div className="GameControllerButton">
          <IconButton
            onClick={() => startGame(game.ID ?? "")}
            data-testid="start-button"
            color="primary"
          >
            <PlayArrow fontSize="large" style={{ color: green[500] }} />
          </IconButton>
        </div>
        <Typography variant="caption">Start</Typography>
      </div>
    ) : (
      <div className="GameControllerButtonContainer">
        <div className="GameControllerButton">
          <IconButton
            onClick={() => finishGame(game.ID)}
            data-testid="reveal-button"
            color="primary"
          >
            <VisibilityIcon fontSize="large" style={{ color: green[500] }} />
          </IconButton>
        </div>
        <Typography variant="caption">Reveal</Typography>
      </div>
    );

  function setStatus(status: Status): string {
    switch (status) {
      case Status.NOT_STARTED:
        return "Not Started";
      case Status.IN_PROGRESS:
        return "In Progress";
      case Status.FINISHED:
        return "Finished";
      default:
        return "";
    }
  }

  function gameFinished(status: Status): boolean {
    switch (status) {
      case Status.FINISHED:
        return true;
      default:
        return false;
    }
  }

  return (
    <Grow in={true} timeout={2000}>
      <div className="GameController">
        <GameControllerCard variant="outlined">
          <CardHeader
            align="center"
            title={setStatus(game.GameStatus)}
            action={
              gameFinished(game.GameStatus) && (
                <>
                  <div className="GameControllerCardHeaderAverageContainer">
                    <Divider
                      sx={{ margin: "0px 10px 0px 10px" }}
                      orientation="vertical"
                      flexItem
                    />
                    <StatusAndAverageTypography variant="subtitle1">
                      Average:
                    </StatusAndAverageTypography>
                    <StatusAndAverageTypography
                      variant="subtitle1"
                      className="GameControllerCardHeaderAverageValue"
                    >
                      {game.Average || "0"}
                    </StatusAndAverageTypography>
                  </div>
                </>
              )
            }
            className="GameControllerCardTitle"
          ></CardHeader>
          <CardContent className="GameControllerCardContentArea">
            {isModerator(game.ModeratorID ?? "", currentPlayerId) && (
              <>
                {mainButton}
                <div className="GameControllerButtonContainer">
                  <div className="GameControllerButton">
                    <IconButton
                      data-testid={"restart-button"}
                      onClick={() => resetGame(game.ID ?? "")}
                    >
                      <RefreshIcon fontSize="large" color="error" />
                    </IconButton>
                  </div>
                  <Typography variant="caption">Restart</Typography>
                </div>
              </>
            )}
            <div className="GameControllerButtonContainer">
              <div className="GameControllerButton">
                <IconButton
                  data-testid="exit-button"
                  onClick={() => leaveGame()}
                >
                  <ExitToApp fontSize="large" style={{ color: orange[500] }} />
                </IconButton>
              </div>
              <Typography variant="caption">Exit</Typography>
            </div>
            <div
              title="Copy invite link"
              className="GameControllerButtonContainer"
            >
              <div className="GameControllerButton">
                <IconButton
                  data-testid="invite-button"
                  onClick={() => copyInviteLink()}
                >
                  <LinkIcon fontSize="large" style={{ color: blue[500] }} />
                </IconButton>
              </div>
              <Typography variant="caption">Invite</Typography>
            </div>
          </CardContent>
        </GameControllerCard>
        <Snackbar
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          open={showCopiedMessage}
          autoHideDuration={5000}
          onClose={() => setShowCopiedMessage(false)}
        >
          <Alert severity="success">Invite Link copied to clipboard!</Alert>
        </Snackbar>
      </div>
    </Grow>
  );
};

const StatusAndAverageTypography = styled(Typography)({
  fontSize: "1.25rem",
});

const GameControllerCard = styled(Card)(({theme}) => ({
  borderRadius: "10px",
  borderWidth: "5px",
  borderColor: theme.palette.mode === "dark" ? "white" : "black",
}));
