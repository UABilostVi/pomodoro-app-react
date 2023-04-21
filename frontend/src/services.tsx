import axios from 'axios';
import { IUserSettings } from './types/User';
import { ILoginPayload, IRegPayload } from './types/Auth';

const axs = axios.create({
	baseURL: 'http://localhost:3001/api',
});

export const serviceAPI = {
	fetchLogin(loginPayload: ILoginPayload) {
		return axs.post('users/login', loginPayload);
	},

	fetchDelUser() {
		return axs.delete('users/me', {
			headers: {
				Authorization: `${localStorage.getItem('token')}`,
			},
		});
	},

	fetchRegistr(newUser: IRegPayload) {
		return axs.post('users/register', newUser);
	},

	fetchCurrentUser() {
		return axs.get('users/me', {
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
	},

	fetchUserSettings(settings: IUserSettings) {
		return axs.patch(
			'users/me',
			{ settings },
			{
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			}
		);
	},
};
