import { apiSlice } from '../../../app/api/apiSlice';

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/api/categories',
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApiSlice;
