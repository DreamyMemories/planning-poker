import React from "react";
import { useTheme } from "../../../ThemeContext";
import { GameResponse } from "../../../types/game";
import { PlayerResponse } from "../../../types/player";
import { CardPicker } from "../../CardPicker/CardPicker";
import { MaterialUISwitch } from "../../DarkModeButton";
import { Players } from "../../Players/Players";
import { GameController } from "../GameController/GameController";
import "./GameArea.css";

interface GameAreaProps {
  game: GameResponse;
  players: PlayerResponse[];
  currentPlayerId: string;
}
export const GameArea: React.FC<GameAreaProps> = ({
  game,
  players,
  currentPlayerId,
}) => {
  const {theme, toggleTheme } = useTheme();
  return (
    <>
      <div className="Header">
        <MaterialUISwitch sx={{float: "right"}} checked={theme.palette.mode === "dark"} onClick={toggleTheme} />
      </div>
      <div className="ContentArea">
        <Players
          game={game}
          players={players}
          currentPlayerId={currentPlayerId}
        />
        <GameController
          game={game}
          currentPlayerId={currentPlayerId}
        />
      </div>
      <div className="Footer">
        <CardPicker
          game={game}
          players={players}
          currentPlayerId={currentPlayerId}
        />
      </div>
    </>
  );
};

export default GameArea;
