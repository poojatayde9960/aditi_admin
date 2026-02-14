import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/admin`,
        credentials: "include",
    }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/users",
                        method: "GET"
                    }
                },
                providesTags: ["user"]
            }),
            getAverageMonthlyOrders: builder.query({
                query: () => ({
                    url: "/order/getAverageMonthlyOrders",
                    method: "GET",
                }),
                providesTags: ["user"],
            }),

        }
    }
})

export const { useGetUsersQuery, useGetAverageMonthlyOrdersQuery } = usersApi
