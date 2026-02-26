import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "./auth.Api"

export const dashboardApi = createApi({
    reducerPath: "dashboardApi",
    baseQuery,
    tagTypes: ["dashboard"],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => {
        return {
            getCardstatus: builder.query({
                query: () => {
                    return {
                        url: "/admin/getDashboardStat",
                        method: "GET"
                    }
                },
                providesTags: ["dashboard"]
            }),
            getUserConversionRate: builder.query({
                query: () => {
                    return {
                        url: "/admin/getUserConversionRate",
                        method: "GET"
                    }
                },
                providesTags: ["dashboard"]
            }),

            getTopSelling: builder.query({
                query: () => {
                    return {
                        url: "/admin/topSelling",
                        method: "GET"
                    }
                },
                providesTags: ["dashboard"]
            }),

            getSaleByPercent: builder.query({
                query: () => {
                    return {
                        url: "/admin/salesByPercent",
                        method: "GET"
                    }
                },
                providesTags: ["dashboard"]
            }),

            getSaleByMonthly: builder.query({
                query: () => {
                    return {
                        url: "/admin/getMonthlySales",
                        method: "GET"
                    }
                },
                providesTags: ["dashboard"]
            }),




        }
    }
})

export const { useGetCardstatusQuery, useGetUserConversionRateQuery, useGetTopSellingQuery, useGetSaleByPercentQuery, useGetSaleByMonthlyQuery } = dashboardApi
