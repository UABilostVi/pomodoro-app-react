import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/User';
import { registerUser, loginUser, getCurrentUser } from './async';

interface IState {
	loading: boolean;
	userInfo: IUser | null;
	error: null | any;
	success: boolean;
}

const initialState: IState = {
	loading: false,
	userInfo: null,
	error: null,
	success: false,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state.userInfo = action.payload;
		},
		unSetUser: (state) => {
			state.userInfo = null;
		},
		unSetSucces: (state) => {
			state.success = false;
		},
	},
	extraReducers(builder) {
		builder.addCase(registerUser.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(registerUser.fulfilled, (state) => {
			state.loading = false;
			state.success = true;
		});
		builder.addCase(registerUser.rejected, (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		});
		builder.addCase(loginUser.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(loginUser.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(loginUser.rejected, (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		});
		builder.addCase(getCurrentUser.pending, (state) => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(getCurrentUser.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		});
	},
});

export const { setUser, unSetUser, unSetSucces } = authSlice.actions;

export default authSlice.reducer;
