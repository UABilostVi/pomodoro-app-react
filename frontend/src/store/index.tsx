import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import { categoriesApi } from './categories/categoriesApi';
import { tasksApi } from './tasks/tasksApi';

const store = configureStore({
	reducer: {
		auth: authReducer,
		[categoriesApi.reducerPath]: categoriesApi.reducer,
		[tasksApi.reducerPath]: tasksApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			categoriesApi.middleware,
			tasksApi.middleware
		),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
