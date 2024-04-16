import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerResponse } from "../types/player";

interface IPlayerState  {
  player: PlayerResponse | null;
}

const initialState: IPlayerState = {
    player: null,
}

export const playerSlice = createSlice({
    name: "playerSlice",
    initialState,
    reducers: {
        setPlayer: (state, action: PayloadAction<PlayerResponse>) => {
            state.player = action.payload;
        },
    },
})

export default playerSlice.reducer

export const {setPlayer} = playerSlice.actions