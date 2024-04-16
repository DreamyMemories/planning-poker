import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import playerReducer from "./PlayerSlice"
import gameReducer from "./GameSlice"

export const store = configureStore({
  reducer: {
    playerState: playerReducer,
    gameState: gameReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;