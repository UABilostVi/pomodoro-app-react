import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categories/categoriesSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
	reducer: {
		categories: categoriesReducer,
		auth: authReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
