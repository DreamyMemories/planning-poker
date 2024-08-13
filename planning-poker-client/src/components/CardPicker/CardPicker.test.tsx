import { render } from "@testing-library/react";
import { GameResponse } from "../../types/game";
import { Status } from "../../types/status";

const mockGame: GameResponse = {
  GameStatus: Status.NOT_STARTED,
  ID: "1",
  Name: "Game 1",
  ModeratorID: "1",
};

describe("CardPicker Component", () => {
  it("should render CardPicker component showing its value and name when game started", () => {
    const mockGameNotStarted = {};
    render();
  });
});
