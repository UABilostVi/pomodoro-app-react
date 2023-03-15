import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './';

type CategoriesState = any[];

const initialState: CategoriesState = [];

export const counterSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		addNewCategory: (state, action: PayloadAction<any>) => {
			state.push(action.payload);
		},
	},
});

export const { addNewCategory } = counterSlice.actions;

export const selectCategory = (state: RootState) => state.categories;

export default counterSlice.reducer;
