import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Sort = {
  name: string;
  sortProperty: string;
  img: string;
};

interface FilterState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
  sell: number;
}

const initialState: FilterState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: 'сначала взрослые',
    sortProperty: 'age',
    img: '',
  },
  sell: 0, // По умолчанию "Все"
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSell(state, action: PayloadAction<number>) {
      state.sell = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.sell = Number(action.payload.sell); // Правильное преобразование
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
  setSell,
} = filterSlice.actions;

export default filterSlice.reducer;