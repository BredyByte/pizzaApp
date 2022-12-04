import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

enum Statuses {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
};
interface FetchPizzasParams {
  sortBy: string,
  order: string,
  category: string,
  search: string,
  pageCount: number
};
type PizzaStructure = {
  img: string,
  title: string,
  id: number
};
type PizzaItem = {
  id: string,
  imageUrl: string,
  name: string,
  types: number[],
  sizes: number[],
  price: number,
  category: number,
  rating: number,
  description: string,
  structure: PizzaStructure[]
};
interface PizzaSliceState {
  items: PizzaItem[],
  status: Statuses
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, search, pageCount } = params;
    const { data } = await axios.get<PizzaItem[]>(
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
  reducers: {
    setItems: (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
    }
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // }
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
