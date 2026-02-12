import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
   baseUrl: `${import.meta.env.VITE_BASE_URL}/admin`,
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/product/createProduct",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    getProducts: builder.query({
      query: () => ({
        url: "/product/allProducts",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/allProducts/deleteProduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/product/allProducts/updateProduct/${id}`,
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
