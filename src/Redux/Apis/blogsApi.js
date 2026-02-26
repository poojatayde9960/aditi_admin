import { createApi } from "@reduxjs/toolkit/query/react"
import { baseQuery } from "./auth.Api"

export const blogsApi = createApi({
    reducerPath: "blogsApi",
    baseQuery,
    tagTypes: ["blogs"],
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => {
        return {
            getBlogs: builder.query({
                query: () => {
                    return {
                        url: "/admin/blog/getBlog",
                        method: "GET"
                    }
                },
                providesTags: ["blogs"]
            }),
            addBlogs: builder.mutation({
                query: BlogsData => {
                    return {
                        url: "/admin/blog/add",
                        method: "POST",
                        body: BlogsData
                    }
                },
                invalidatesTags: ["blogs"]
            }),
            updateBlogs: builder.mutation({
                query: ({ id, data }) => ({
                    url: `/admin/blog/update/${id}`,
                    method: "PATCH",
                    body: data
                }),
                invalidatesTags: ["blogs"],
            }),

            deleteBlogs: builder.mutation({
                query: id => {
                    return {
                        url: `/admin/blog/delete/${id}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ["blogs"]
            }),

        }
    }
})

export const { useGetBlogsQuery, useAddBlogsMutation, useUpdateBlogsMutation, useDeleteBlogsMutation } = blogsApi
