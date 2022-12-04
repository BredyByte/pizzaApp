import filter from './slices/filterSlice';
import cart from './slices/cartSlice';
import pizza from './slices/pizzaSlice';
import { configureStore } from '@reduxjs/toolkit';
import {useDispatch} from "react-redux";
// import logger from 'redux-logger';


export const store = configureStore({
  reducer: { filter, cart, pizza },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();