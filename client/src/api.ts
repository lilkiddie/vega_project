import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiHost } from './const';

export interface Company {
    key: string;
    name: string;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: apiHost }),
    endpoints: (builder) => ({
    getCompanies: builder.query<Company[], void>({
        query: () => ({ url: '/companies' }),
    }),
    }),
});

export const { useGetCompaniesQuery } = api;
