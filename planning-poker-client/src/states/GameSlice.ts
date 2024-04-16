import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameResponse } from "../types/game";

interface IGameState{
    game: GameResponse | null
}

const initialState: IGameState = {
    game: null
}

export const gameSlice = createSlice({
    name: "gameSlice",
    initialState,
    reducers: {
        setGame: (state, action: PayloadAction<GameResponse>) => {
            state.game = action.payload;
        }
    },
})

export default gameSlice.reducer
export const {setGame} = gameSlice.actions;