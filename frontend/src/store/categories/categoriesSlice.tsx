import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';
import { ICategory } from '../../types/Category';

type CategoriesState = ICategory[];

const initialState: CategoriesState = [];

export const counterSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		addNewCategory: (state, action: PayloadAction<ICategory>) => {
			state.push(action.payload);
		},
	},
});

export const { addNewCategory } = counterSlice.actions;

export const selectCategory = (state: RootState) => state.categories;

export default counterSlice.reducer;
