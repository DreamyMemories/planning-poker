import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import { CustomThemeProvider } from "../../ThemeContext";
import { GameResponse } from "../../types/game";
import { PlayerResponse } from "../../types/player";
import { Status } from "../../types/status";
import { Players } from "./Players";


const mockPlayer: PlayerResponse[] = [
  {
    GameID: "1",
    ID: "1",
    Name: "Player 1",
    Value: 5,
  },
  {
    GameID: "1",
    ID: "2",
    Name: "Player 2",
    Value: 2,
  },
];

const mockGame: GameResponse = {
  GameStatus: Status.FINISHED,
  ID: "1",
  Name: "Game 1",
  ModeratorID: "1",
};

describe("Players Component", () => {
  it("should render Players component showing its value and name", async () => {
    render(
      <CustomThemeProvider>
        <Players players={mockPlayer} game={mockGame} currentPlayerId="1" />
      </CustomThemeProvider>
    );
    const playerCards = screen.getAllByTestId("player-card");
    expect(playerCards.length).toBe(mockPlayer.length);
    mockPlayer.forEach((player: PlayerResponse) => {
      expect(screen.getByText(player.Name)).toBeInTheDocument();
      expect(screen.getByText(player.Value.toString())).toBeInTheDocument();
    });
  });

});
