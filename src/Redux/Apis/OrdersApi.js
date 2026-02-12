import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const OrderApi = createApi({
    reducerPath: "OrderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: "include",
    }),
    tagTypes: ["order"],
    endpoints: (builder) => {
        return {
            getOders: builder.query({
                query: () => {
                    return {
                        url: "/admin/order/getAllOrder",
                        method: "GET"
                    }
                },
                providesTags: ["order"]
            }),
            getOdersById: builder.query({
                query: (id) => {
                    return {
                        url: `/admin/order/getOrderById/${id}`,
                        method: "GET"
                    }
                },
                providesTags: ["order"]
            }),

            updateStatus: builder.mutation({
                query: ({ orderId, status }) => ({
                    url: `/users/order/update-status/${orderId}`,
                    method: "PUT",
                    body: { Status: status },
                }),
                invalidatesTags: ["order"],
            }),
            getOrderDetailById: builder.query({
                query: (orderId) => {
                    return {
                        url: `/admin/users/getHisOrders/${orderId}`,
                        method: "GET"
                    }
                },
                providesTags: ["order"]
            }),

        }
    }
})

export const {
    useGetOrderDetailByIdQuery,
    useGetOdersQuery,
    useGetOdersByIdQuery,
    useUpdateStatusMutation
} = OrderApi
