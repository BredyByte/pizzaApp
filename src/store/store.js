import filter from './slices/filterSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';


export const store = configureStore({
  reducer: { filter },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});