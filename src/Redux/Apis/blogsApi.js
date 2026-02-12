import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const blogsApi = createApi({
    reducerPath: "blogsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BASE_URL}/admin`,
        credentials: "include",
    }),
    tagTypes: ["blogs"],
    endpoints: (builder) => {
        return {
            getBlogs: builder.query({
                query: () => {
                    return {
                        url: "/blog/getBlog",
                        method: "GET"
                    }
                },
                providesTags: ["blogs"]
            }),
            addBlogs: builder.mutation({
                query: BlogsData => {
                    return {
                        url: "/blog/add",
                        method: "POST",
                        body: BlogsData
                    }
                },
                invalidatesTags: ["blogs"]
            }),
            updateBlogs: builder.mutation({
                query: ({ id, data }) => ({
                    url: `/blog/update/${id}`,
                    method: "PATCH",
                    body: data
                }),
                invalidatesTags: ["blogs"],
            }),

            deleteBlogs: builder.mutation({
                query: id => {
                    return {
                        url: `/blog/delete/${id}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ["blogs"]
            }),

        }
    }
})

export const { useGetBlogsQuery, useAddBlogsMutation, useUpdateBlogsMutation, useDeleteBlogsMutation } = blogsApi
