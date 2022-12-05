import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {FetchPizzasParams, PizzaSliceState, PizzaStructure, Statuses, PizzaItem} from './types';



export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {sortBy, order, category, search, pageCount} = params;
        const {data} = await axios.get<PizzaItem[]>(
            `https://637ce41a72f3ce38eab0b9e2.mockapi.io/items?page=${pageCount}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
        );

        return data;
    }
);

const initialState: PizzaSliceState = {
    items: [],
    status: Statuses.LOADING,
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.status = Statuses.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = Statuses.SUCCESS;
            state.items = action.payload;
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = Statuses.ERROR;
            state.items = [];
        });
    }
});

export default pizzaSlice.reducer;
