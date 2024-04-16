import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { Game, GameResponse } from "../../../types/game";
import { Player } from "../../../types/player";
import { Status } from "../../../types/status";
import "./PlayerCard.css";
import { fibonacciCards } from "../../CardPicker/CardConfigs";
import { CustomPlayerCard, CustomPlayerCardTitle } from "./PlayerCard.Styles";

interface PlayerCardProps {
  game: GameResponse;
  player: Player;
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
  return (
    <CustomPlayerCard
      variant="outlined"
      className="PlayerCard"
      sx={{
        backgroundColor: "white",
        border: "solid 2px red",
      }}
    >
      <CustomPlayerCardTitle
        title={player.name}
        titleTypographyProps={{ variant: "subtitle2", noWrap: true }}
      />
      <CardContent className="PlayerCardContent">
        <Typography variant="h2" className="PlayerCardContentMiddle">
          {getCardValue(player, game)}
        </Typography>
      </CardContent>
    </CustomPlayerCard>
  );
};

const getCardValue = (player: Player, game: GameResponse) => {
  if (game.gameStatus === Status.IN_PROGRESS) {
    return player.value && (player.value > 0 || player.value === -1)
      ? "👍"
      : "🤔";
  }

  if (game.gameStatus === Status.FINISHED) {
    if (player.value === 0) {
      return "☕"; // coffee emoji
    } else if (player.value === -1) {
      return "❓";
    }
    return getCardDisplayValue(player.value);
  }
  return "☻";
};

const getCardDisplayValue = (
  cardValue: number | undefined
): string | number | undefined => {
  return (
    fibonacciCards.find((card) => card.value === cardValue)?.displayValue ||
    cardValue
  );
};
