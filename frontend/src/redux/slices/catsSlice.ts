import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SellProps } from './filterSlice';

export type SearchCatsParams = {
  sortBy: string;
  order: string;
  currentPage: number;
  issell: string | number;
};

export const fetchCats = createAsyncThunk(
  'cats/fetchCatsStatus',
  async (params: SearchCatsParams) => {
    const { sortBy, order, currentPage, issell } = params;
    
    // Убедитесь, что issell передается как число, а не как строка
    const issellParam = issell === 'all' || issell === '' ? undefined : Number(issell);
    
    const { data } = await axios.get(`http://localhost:3000/cats`, {
      params: {
        sortBy,
        order,
        currentPage,
        issell: issellParam
      }
    });
    
    console.log('Response data:', data);
    return data as CatsItems[];
  },
);

export type CatsItems = {
  id: number; // Измените string на number
  img: string;
  name: string;
  buy: string;
  breed: string;
  description: string;
  discount: number;
  price: number;
  age: number;
  issell: number;
  isfavorite: boolean;
};

interface CatsSliceState {
  items: CatsItems[];
  status: 'loading' | 'success' | 'error';
}

const initialState: CatsSliceState = {
  items: [],
  status: 'loading',
};

const catsSlice = createSlice({
  name: 'cats',
  initialState,
  reducers: {
    setCats(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCats.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchCats.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchCats.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const { setCats } = catsSlice.actions;
export default catsSlice.reducer;