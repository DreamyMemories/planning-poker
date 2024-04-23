import Dialog from "@mui/material/Dialog";
import {
  Button,
  Card,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { PlayerRequest, PlayerResponse } from "../../../types/player";
import { setPlayer } from "../../../states/PlayerSlice";
import { useAppDispatch } from "../../../states/store";
import { initPlayer } from "../../../services/api/playerApi";

export interface CreatePlayerDialogProps {
  open: boolean;
}

export function CreatePlayerDialog(props: CreatePlayerDialogProps) {
  const { open } = props;
  const [isOpen, setOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerData] = useState<PlayerResponse | undefined>();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const gameId = window.location.href.replace(/([^\/]*\/){4}/, "");

    try {
      const playerResponse: PlayerRequest = {
        name: playerName,
        gameId: gameId,
      };

      const initPlayerSettings = await initPlayer(playerResponse);
      setPlayerData(initPlayerSettings);
    } catch (ex) {}

    handleClose();
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (playerData) {
      dispatch(setPlayer(playerData));
    }
  });

  return (
    <Card>
      <Dialog open={open} onClose={handleClose} onKeyUp={handleEnter}>
        <DialogTitle>Choose a Display name</DialogTitle>
        <DialogContent>
          <TextField
            className="CreateGameTextField"
            required
            id="filled-required"
            placeholder="Enter player name"
            variant="outlined"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPlayerName(event.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            variant="contained"
            className="CreateGameButton"
            sx={{ backgroundColor: "#de3f3e", color: "white" }}
            onClick={handleSubmit}
          >
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
