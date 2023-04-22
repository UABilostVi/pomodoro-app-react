import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategory } from '../../types/Category';

export const categoriesApi = createApi({
	reducerPath: 'categoriesApi',
	tagTypes: ['Categories'],
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
		getCategories: builder.query<ICategory[], void>({
			query: () => `categories`,
			providesTags: () => ['Categories'],
		}),
		getCategoryById: builder.query<ICategory, string>({
			query: (id) => `categories/${id}`,
			providesTags: () => ['Categories'],
		}),
		addCategory: builder.mutation<ICategory, ICategory>({
			query: (categ) => ({ url: `categories`, method: 'POST', body: categ }),
			invalidatesTags: ['Categories'],
		}),
		delCategory: builder.mutation<ICategory, ICategory>({
			query: (categ) => ({ url: `categories/${categ._id}`, method: 'DELETE' }),
			invalidatesTags: ['Categories'],
		}),
		editCategory: builder.mutation<ICategory, ICategory>({
			query: (categ) => ({
				url: `categories/${categ._id}`,
				method: 'PUT',
				body: categ,
			}),
			invalidatesTags: ['Categories'],
		}),
	}),
});

export const {
	useGetCategoryByIdQuery,
	useGetCategoriesQuery,
	useAddCategoryMutation,
	useDelCategoryMutation,
	useEditCategoryMutation,
} = categoriesApi;
