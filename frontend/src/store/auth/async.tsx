import { createAsyncThunk } from '@reduxjs/toolkit';
import { serviceAPI } from '../../services';
import { IUserSettings } from '../../types/User';
import { setUser, setSettings } from './authSlice';
import { ILoginPayload, IRegPayload } from '../../types/Auth';

export const getCurrentUser = createAsyncThunk(
	'auth/getCurrentUser',
	async function (_: void, { dispatch, rejectWithValue }) {
		try {
			const response = await serviceAPI.fetchCurrentUser();
			dispatch(setUser(response.data.user));
		} catch (err: any) {
			if (err.response && err.response.data.message) {
				return rejectWithValue(err.response.data.message);
			} else {
				return rejectWithValue(err.message);
			}
		}
	}
);

export const registerUser = createAsyncThunk(
	'auth/register',
	async function (user: IRegPayload, { rejectWithValue }) {
		try {
			await serviceAPI.fetchRegistr(user);
		} catch (err: any) {
			if (err.response && err.response.data.message) {
				return rejectWithValue(err.response.data.message);
			} else {
				return rejectWithValue(err.message);
			}
		}
	}
);

export const loginUser = createAsyncThunk(
	'auth/login',
	async function (payload: ILoginPayload, { dispatch, rejectWithValue }) {
		try {
			const response = await serviceAPI.fetchLogin(payload);
			localStorage.setItem('token', response.data.token);
			dispatch(setUser(response.data.user));
		} catch (err: any) {
			if (err.response && err.response.data.message) {
				return rejectWithValue(err.response.data.message);
			} else {
				return rejectWithValue(err.message);
			}
		}
	}
);

export const changeSettings = createAsyncThunk(
	'auth/changeSettings',
	async function (payload: IUserSettings, { dispatch, rejectWithValue }) {
		try {
			const response = await serviceAPI.fetchUserSettings(payload);
			console.log(response.data);
			dispatch(setSettings(response.data));
		} catch (err: any) {
			if (err.response && err.response.data.message) {
				return rejectWithValue(err.response.data.message);
			} else {
				return rejectWithValue(err.message);
			}
		}
	}
);
