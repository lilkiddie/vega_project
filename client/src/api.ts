import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiHost } from './const';

export interface Company {
    key: string;
    name: string;
}

export interface ShareData {
    key: string;
    count: number;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: apiHost }),
    endpoints: (builder) => ({
        getCompanies: builder.query<Record<string, string>, void>({
            query: () => ({ url: '/companies' }),
        }),
        getChartInfo: builder.mutation<Record<string, number>, ShareData[]>({
            query: (data: ShareData[]) => ({
                url: '/companies/shares',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useGetCompaniesQuery, useGetChartInfoMutation } = api;
