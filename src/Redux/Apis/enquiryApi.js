import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const enquiryApi = createApi({
    reducerPath: "enquiryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        credentials: "include", // if cookies/session needed
    }),
    tagTypes: ["enquiry"],
    endpoints: (builder) => ({
        getEnquiry: builder.query({
            query: () => "/users/contactus/getall",
            providesTags: ["enquiry"],
        }),

        enquiryStatus: builder.mutation({
            query: ({ id }) => ({
                url: `/users/contactus/Contacted/${id}`,
                method: "PUT", // ✅ POST → PUT
            }),
            invalidatesTags: ["enquiry"],
        }),
        enquiryDelete: builder.mutation({
            query: ({ id }) => ({
                url: `/users/contactus/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["enquiry"],
        }),
    }),
});

export const { useGetEnquiryQuery, useEnquiryStatusMutation, useEnquiryDeleteMutation } = enquiryApi;
