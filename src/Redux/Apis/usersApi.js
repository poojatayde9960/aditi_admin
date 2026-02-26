import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "./auth.Api"

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery,
    tagTypes: ["user"],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/admin/users",
                        method: "GET"
                    }
                },
                providesTags: ["user"]
            }),
            getAverageMonthlyOrders: builder.query({
                query: () => ({
                    url: "/admin/order/getAverageMonthlyOrders",
                    method: "GET",
                }),
                providesTags: ["user"],
            }),

        }
    }
})

export const { useGetUsersQuery, useGetAverageMonthlyOrdersQuery } = usersApi
