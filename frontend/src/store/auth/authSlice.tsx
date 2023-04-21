import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUser, loginUser, getCurrentUser } from './async';
import { IUserSettings } from '../../types/User';
import { IAuthState, IUserInfo } from '../../types/Auth';

const initialState: IAuthState = {
	loading: false,
	error: null,
	success: false,
	userInfo: {
		username: '',
		email: '',
		settings: {
			worktime: 15,
			shortbreak: 3,
			longbreak: 15,
			iterations: 2,
		},
	},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUserInfo>) => {
			state.userInfo = action.payload;
		},
		unSetUser: (state) => {
			state.userInfo = initialState.userInfo;
		},
		unSetSucces: (state) => {
			state.success = false;
		},
		setSettings: (state, action: PayloadAction<IUserSettings>) => {
			state.userInfo.settings = action.payload;
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
			state.success = true;
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

export const { setUser, unSetUser, unSetSucces, setSettings } =
	authSlice.actions;

export default authSlice.reducer;
