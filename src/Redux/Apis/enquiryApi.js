import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./auth.Api";

export const enquiryApi = createApi({
    reducerPath: "enquiryApi",
    baseQuery,
    tagTypes: ["enquiry"],
    refetchOnMountOrArgChange: true,
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
