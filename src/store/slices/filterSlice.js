import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sort: {
    name: 'Popularity',
    sortProperty: 'rating'
  },
  searchValue: '',
  pageCount: 1,
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state = initialState, action) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
    setPageCount: (state, action) => {
      state.pageCount =  action.payload
    }
  }
});

export const { setCategoryId, setSort, setSearchValue, setPageCount } = filterSlice.actions;

export default filterSlice.reducer

