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

  it ("should show a thumbs up emoji if the game is in progress and the player has a value", async () => {
    const mockGameInProgress = {
      ...mockGame,
      GameStatus: Status.IN_PROGRESS,
    };
    render(
      <CustomThemeProvider>
        <Players players={mockPlayer} game={mockGameInProgress} currentPlayerId="1" />
      </CustomThemeProvider>
    );

    const thumbsUpElement = screen.getAllByText("👍");
    expect(thumbsUpElement.length).toBe(mockPlayer.length);
  })

  it("should show a thinking emoji if the game is in progress and the player has no value", async () => {
    const mockPlayerNoValue = [
      {
        GameID: "1",
        ID: "1",
        Name: "Player 1",
        Value: 0,
      },
    ];
    const mockGameInProgress = {
      ...mockGame,
      GameStatus: Status.IN_PROGRESS,
    };
    render(
      <CustomThemeProvider>
        <Players players={mockPlayerNoValue} game={mockGameInProgress} currentPlayerId="1" />
      </CustomThemeProvider>
    );
    expect(screen.getByText("🤔")).toBeInTheDocument();
  });
});
