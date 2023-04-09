import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import { categoriesApi } from './categories/categoriesApi';

const store = configureStore({
	reducer: {
		auth: authReducer,
		[categoriesApi.reducerPath]: categoriesApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(categoriesApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
