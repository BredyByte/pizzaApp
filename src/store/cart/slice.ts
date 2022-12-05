import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { CartSliceState, CartItem } from './types';


const {items, totalPrice} = getCartFromLocalStorage();

const initialState: CartSliceState = {
    items,
    totalPrice
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action:PayloadAction<CartItem>) => {
            const findItem = state.items.find(obj => obj.id === action.payload.id);
            if(findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                });
            }
            state.totalPrice = calcTotalPrice(state.items);
        },
        removeItem: (state, action:PayloadAction<string>) => {
            state.items = state.items.filter(obj => obj.id !== action.payload);
        },
        minusItem: (state, action:PayloadAction<string>) => {
            const findItem = state.items.find(obj => obj.id === action.payload);
            if(findItem) {
                findItem.count--
            }
        },
        clearItems: (state) => {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;