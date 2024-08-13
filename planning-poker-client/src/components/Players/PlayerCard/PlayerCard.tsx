import { CardContent, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "../../../ThemeContext";
import { GameResponse } from "../../../types/game";
import { PlayerResponse } from "../../../types/player";
import { Status } from "../../../types/status";
import { fibonacciCards } from "../../CardPicker/CardConfigs";
import { CustomPlayerCard, CustomPlayerCardTitle } from "./PlayerCard.Styles";
import "./PlayerCard.css";

interface PlayerCardProps {
  game: GameResponse;
  player: PlayerResponse;
  currentPlayerId: string;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  game,
  player,
  currentPlayerId,
}) => {
  const isModerator = (moderatorId: string, currentPlayerId: string) => {
    return moderatorId === currentPlayerId;
  };
  const { theme } = useTheme();
  return (
    <CustomPlayerCard
      variant="outlined"
      className="PlayerCard"
      sx={{
        backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
        border: "solid 2px red",
      }}
      data-testid="player-card"
    >
      <CustomPlayerCardTitle
        title={player.Name}
        titleTypographyProps={{
          variant: "subtitle2",
          noWrap: true,
          color: theme.palette.mode === "dark" ? "white" : "black",
        }}
        sx={{
          backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
        }}
      />
      <CardContent className="PlayerCardContent">
        <Typography variant="h2" className="PlayerCardContentMiddle">
          {getCardValue(player, game)}
        </Typography>
      </CardContent>
    </CustomPlayerCard>
  );
};

const getCardValue = (player: PlayerResponse, game: GameResponse) => {
  if (game.GameStatus === Status.IN_PROGRESS) {
    return player.Value && (player.Value > 0 || player.Value === -1)
      ? "👍"
      : "🤔";
  }

  if (game.GameStatus === Status.FINISHED) {
    if (player.Value === 0) {
      return "☕"; // coffee emoji
    } else if (player.Value === -1) {
      return "❓";
    }
    return getCardDisplayValue(player.Value);
  }
  return "😊";
};

const getCardDisplayValue = (
  cardValue: number | undefined
): string | number | undefined => {
  return (
    fibonacciCards.find((card) => card.value === cardValue)?.displayValue ||
    cardValue
  );
};
