import {
  Card,
  CardContent,
  Grid,
  Grow,
  Slide,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { GameResponse } from "../../types/game";
import { PlayerResponse, PlayerUpdate } from "../../types/player";
import { Status } from "../../types/status";
import { CardConfig, fibonacciCards } from "./CardConfigs";
import "./CardPicker.css";
import { updatePlayer } from "../../services/api/playerApi";
import pickCardSound from "../../assets/pick-card.mp3";
import dealingCardSound from "../../assets/dealingcards.mp3";
import hoverCardSound from "../../assets/hover-card.mp3";

interface CardPickerProps {
  game: GameResponse;
  players: PlayerResponse[];
  currentPlayerId: string;
}
export const CardPicker: React.FC<CardPickerProps> = ({
  game,
  players,
  currentPlayerId,
}) => {
  const cardSound = new Audio(pickCardSound);
  const dealCardSound = new Audio(dealingCardSound);
  const hoverCardAudio = new Audio(hoverCardSound);
  const [isSelected, setSelected] = useState(-2);

  const playHoverCardSound = () => {
    hoverCardAudio.volume = 0.3;
    hoverCardAudio.play();
  };

  const pauseHoverCardSound = () => {
    hoverCardAudio.pause();
  };

  const playPlayer = async (
    gameId: string,
    playerId: string,
    card: CardConfig
  ) => {
    if (game.GameStatus !== Status.FINISHED) {
      cardSound.volume = 0.3;
      cardSound.play();

      var cards = document.getElementsByClassName("CardPicker");
      for (var i = 0; i < cards.length; i++) {
        cards.item(i)?.setAttribute("style", "background-color: white");
      }

      document
        .getElementById(`card-${card.displayValue}`)
        ?.setAttribute("style", "background-color: lightgrey");

      setSelected(card.value);

      const playerUpdate: PlayerUpdate = {
        playerId: playerId,
        value: card.value,
      };

      const fetchPlayerData = await updatePlayer(playerUpdate);

      return fetchPlayerData.Value;
    }
  };

  const cards = fibonacciCards;

  return (
    <Grow in={true} timeout={1000}>
      <div>
        {game.GameStatus === Status.NOT_STARTED ? (
          <Typography variant="h5" sx={{ paddingTop: "20px" }}>
            Session not ready for Voting! Wait for moderator to start..
          </Typography>
        ) : (
          <>
            <Typography variant="h5">Click on the card to vote!</Typography>
            <div className="CardPickerContainer">
              <Grid container spacing={4} justifyItems="center">
                {cards.map((card: CardConfig, index) => (
                  <Grid key={card.value} item xs>
                    <Slide
                      in={true}
                      direction={"right"}
                      timeout={(1000 * index) / 2}
                      onEnter={() => {
                        dealCardSound.volume = 0.3;
                        dealCardSound.play();
                      }}
                    >
                      <Card
                        id={`card-${card.displayValue}`}
                        className="CardPicker"
                        variant="outlined"
                        onClick={() =>
                          playPlayer(game.ID ?? "", currentPlayerId, card)
                        }
                        onMouseEnter={() => playHoverCardSound()}
                        onMouseLeave={() => pauseHoverCardSound()}
                        sx={{
                          background: "white",
                          border: "2px solid red",
                          pointerEvents: getPointerEvent(game),
                          ":hover": {
                            scale: card.value === isSelected ? "1.00" : "1.20",
                            backgroundColor: "grey",
                          },
                        }}
                      >
                        <CardContent className="CardContent">
                          {card.value >= 0 && (
                            <>
                              <Typography
                                className="CardContentTop"
                                variant="caption"
                              >
                                {card.value === isSelected ? (
                                  <Typography
                                    variant="caption"
                                    className="CardContentSelected"
                                  >
                                    ✔
                                  </Typography>
                                ) : (
                                  <Typography variant="caption">
                                    {card.displayValue}
                                  </Typography>
                                )}
                              </Typography>
                              <Typography
                                className="CardContentMiddle"
                                variant="h4"
                              >
                                {card.displayValue}
                              </Typography>
                              <Typography
                                className="CardContentBottom"
                                variant="caption"
                              >
                                {card.displayValue}
                              </Typography>
                            </>
                          )}
                          {card.value === -1 && (
                            <>
                              <Typography
                                className="CardContentTop"
                                variant="caption"
                              >
                                {card.value === isSelected && (
                                  <Typography
                                    variant="caption"
                                    className="CardContentSelected"
                                  >
                                    ✔
                                  </Typography>
                                )}
                              </Typography>
                              <Typography
                                className="CardContentMiddle"
                                variant="h4"
                                sx={{
                                  padding:
                                    card.value !== isSelected
                                      ? "30px 0px"
                                      : "10px 0px",
                                }}
                              >
                                ❓
                              </Typography>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </Slide>
                  </Grid>
                ))}
              </Grid>
            </div>
          </>
        )}
      </div>
    </Grow>
  );
};

const getPointerEvent = (game: GameResponse) => {
  if (game.GameStatus === Status.FINISHED) {
    return "none";
  }
  return "inherit";
};
