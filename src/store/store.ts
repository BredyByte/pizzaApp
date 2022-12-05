import filter from './filter/slice';
import cart from './cart/slice';
import pizza from './pizza/slice';
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