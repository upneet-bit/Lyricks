import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { billBoardApi } from './services/billboard';
import { spotifyApi } from './services/spotify';

export const store = configureStore({
  reducer: {
    [billBoardApi.reducerPath] : billBoardApi.reducer,
    [spotifyApi.reducerPath] : spotifyApi.reducer,
    player: playerReducer
  },
  middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(billBoardApi.middleware), //adding all reducer middlewares here
});
