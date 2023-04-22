import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITask } from '../../types/Tasks';

export const tasksApi = createApi({
	reducerPath: 'tasksApi',
	tagTypes: ['Tasks'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:3001/api/',
		prepareHeaders: (headers) => {
			return headers.set(
				'Authorization',
				`Bearer ${localStorage.getItem('token')}`
			);
		},
	}),
	endpoints: (builder) => ({
		getTasks: builder.query<ITask[], void>({
			query: () => `tasks`,
			providesTags: () => ['Tasks'],
		}),
		getTaskById: builder.query<ITask, string>({
			query: (id) => `tasks/${id}`,
			providesTags: () => ['Tasks'],
		}),
		addTask: builder.mutation<ITask, ITask>({
			query: (task) => ({ url: `tasks`, method: 'POST', body: task }),
			invalidatesTags: ['Tasks'],
		}),
		delTask: builder.mutation<ITask, ITask>({
			query: (task) => ({ url: `tasks/${task._id}`, method: 'DELETE' }),
			invalidatesTags: ['Tasks'],
		}),
		editTask: builder.mutation<ITask, ITask>({
			query: (task) => ({
				url: `tasks/${task._id}`,
				method: 'PATCH',
				body: task,
			}),
			invalidatesTags: ['Tasks'],
		}),
	}),
});

export const {
	useGetTasksQuery,
	useGetTaskByIdQuery,
	useAddTaskMutation,
	useDelTaskMutation,
	useEditTaskMutation,
} = tasksApi;
