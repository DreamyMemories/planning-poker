import React from "react";
import { GameResponse } from "../../../types/game";
import { CardPicker } from "../../CardPicker/CardPicker";
import { Players } from "../../Players/Players";
import { GameController } from "../GameController/GameController";
import "./GameArea.css";
import { PlayerResponse } from "../../../types/player";

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
  return (
    <>
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
