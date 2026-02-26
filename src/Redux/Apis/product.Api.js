import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./auth.Api";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery,
  tagTypes: ["Product"],
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/admin/product/createProduct",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    getProducts: builder.query({
      query: () => ({
        url: "/admin/product/allProducts",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/product/allProducts/deleteProduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/product/allProducts/updateProduct/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"]
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation
} = productApi;
