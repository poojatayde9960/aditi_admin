import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const OrderApi = createApi({
    reducerPath: "OrderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: "include",
    }),
    tagTypes: ["order"],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => {
        return {
            getOrders: builder.query({
                query: () => {
                    return {
                        url: "/admin/order/getAllOrder",
                        method: "GET"
                    }
                },
                providesTags: ["order"]
            }),
            getOrdersById: builder.query({
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
                        url: `/admin/users/${orderId}`,
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
    useGetOrdersQuery,
    useGetOrdersByIdQuery,
    useUpdateStatusMutation
} = OrderApi
