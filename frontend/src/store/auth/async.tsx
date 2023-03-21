import { createAsyncThunk } from '@reduxjs/toolkit';
import { serviceAPI } from '../../services';
import { IUser } from '../../types/User';
import { setUser } from './authSlice';

interface ILoginPayload {
	password: string;
	email: string;
}

export const getCurrentUser = createAsyncThunk(
	'auth/getCurrentUser',
	async function (_: void, { dispatch, rejectWithValue }) {
		try {
			const response = await serviceAPI.fetchCurrentUser();
			dispatch(setUser(response.data.user));
		} catch (err: any) {
			// FIXME errors types
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
	async function (user: IUser, { rejectWithValue }) {
		try {
			await serviceAPI.fetchRegistr(user);
		} catch (err: any) {
			// FIXME errors types
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
			// FIXME errors types
			if (err.response && err.response.data.message) {
				return rejectWithValue(err.response.data.message);
			} else {
				return rejectWithValue(err.message);
			}
		}
	}
);
