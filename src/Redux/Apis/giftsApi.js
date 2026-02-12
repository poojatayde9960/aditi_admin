import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const giftsApi = createApi({
    reducerPath: "giftsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/admin`,
        credentials: "include",
    }),
    tagTypes: ["gifts"],
    endpoints: (builder) => {
        return {
            getGifts: builder.query({
                query: () => {
                    return {
                        url: "/gift/getAll",
                        method: "GET"
                    }
                },
                providesTags: ["gifts"]
            }),
            addGifts: builder.mutation({
                query: GiftsData => {
                    return {
                        url: "/gift/AddGift",
                        method: "POST",
                        body: GiftsData
                    }
                },
                invalidatesTags: ["gifts"]
            }),
            adminGiftAssign: builder.mutation({
                query: GiftsData => {
                    return {
                        url: "/gift/assign",
                        method: "POST",
                        body: GiftsData
                    }
                },
                invalidatesTags: ["gifts"]
            }),
            updateGifts: builder.mutation({
                query: GiftsData => {
                    return {
                        url: `/gift/updateGift/${GiftsData.id}`,
                        method: "PUT",
                        body: GiftsData
                    }
                },
                invalidatesTags: ["gifts"]
            }),
            deleteGifts: builder.mutation({
                query: id => {
                    return {
                        url: `/gift/deleteGift/${id}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ["gifts"]
            }),
            giftGetById: builder.query({
                query: (id) => ({
                    url: `/gift/user/${id}`,
                    method: "GET",
                }),
                providesTags: ["gift"],
            }),

        }
    }
})

export const {
    useGetGiftsQuery,
    useAddGiftsMutation,
    useUpdateGiftsMutation,
    useDeleteGiftsMutation,
    useGiftGetByIdQuery,
    useAdminGiftAssignMutation
} = giftsApi
