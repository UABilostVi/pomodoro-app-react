import axios from 'axios';
import { IUser } from './types/User';

const axs = axios.create({
	baseURL: 'http://localhost:3001/api',
});

export const serviceAPI = {
	fetchLogin(loginPayload: any) {
		return axs.post('users/login', loginPayload);
	},

	// fetchLogout() {
	// 	return axs.delete('users/logout', {
	// 		headers: {
	// 			Authorization: `${localStorage.getItem('userToken')}`,
	// 		},
	// 	});
	// },

	fetchRegistr(newUser: IUser) {
		return axs.post('users/register', newUser);
	},

	// fetchCategories() {
	// 	return axs.get('categories');
	// },

	// fetchAddCategory(category) {
	// 	return axs.post(`categories`, category, {
	// 		headers: {
	// 			Authorization: `${localStorage.getItem('userToken')}`,
	// 		},
	// 	});
	// },

	// fetchAllCourses() {
	// 	return axs.get('courses/all');
	// },

	// fetchAllAuthors() {
	// 	return axs.get('authors/all');
	// },

	fetchCurrentUser() {
		return axs.get('users/me', {
			headers: {
				Authorization: `${localStorage.getItem('token')}`,
			},
		});
	},

	// fetchDelCourse(courseId) {
	// 	return axs.delete(`courses/${courseId}`, {
	// 		headers: {
	// 			Authorization: `${localStorage.getItem('userToken')}`,
	// 		},
	// 	});
	// },

	// fetchCreateCourse(course) {
	// 	return axs.post(`courses/add`, course, {
	// 		headers: {
	// 			Authorization: `${localStorage.getItem('userToken')}`,
	// 		},
	// 	});
	// },

	// fetchCreateAuthor(author) {
	// 	return axs.post(`authors/add`, author, {
	// 		headers: {
	// 			Authorization: `${localStorage.getItem('userToken')}`,
	// 		},
	// 	});
	// },

	// fetchUpdateCourse(data, courseId) {
	// 	return axs.put(`courses/${courseId}`, data, {
	// 		headers: {
	// 			Authorization: `${localStorage.getItem('userToken')}`,
	// 		},
	// 	});
	// },
};