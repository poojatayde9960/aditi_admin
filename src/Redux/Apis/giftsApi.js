import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "./auth.Api"

export const giftsApi = createApi({
    reducerPath: "giftsApi",
    baseQuery,
    tagTypes: ["gifts"],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => {
        return {
            getGifts: builder.query({
                query: () => {
                    return {
                        url: "/admin/gift/getAll",
                        method: "GET"
                    }
                },
                providesTags: ["gifts"]
            }),
            addGifts: builder.mutation({
                query: GiftsData => {
                    return {
                        url: "/admin/gift/AddGift",
                        method: "POST",
                        body: GiftsData
                    }
                },
                invalidatesTags: ["gifts"]
            }),
            adminGiftAssign: builder.mutation({
                query: GiftsData => {
                    return {
                        url: "/admin/gift/assign",
                        method: "POST",
                        body: GiftsData
                    }
                },
                invalidatesTags: ["gifts"]
            }),
            updateGifts: builder.mutation({
                query: GiftsData => {
                    return {
                        url: `/admin/gift/updateGift/${GiftsData.id}`,
                        method: "PUT",
                        body: GiftsData
                    }
                },
                invalidatesTags: ["gifts"]
            }),
            deleteGifts: builder.mutation({
                query: id => {
                    return {
                        url: `/admin/gift/deleteGift/${id}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ["gifts"]
            }),
            giftGetById: builder.query({
                query: (id) => ({
                    url: `/admin/gift/user/${id}`,
                    method: "GET",
                }),
                providesTags: ["gifts"],
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
