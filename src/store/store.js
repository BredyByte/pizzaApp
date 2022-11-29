import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';


export const store = configureStore({
  reducer: { filter, cart },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});