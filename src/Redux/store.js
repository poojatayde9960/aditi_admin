import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../Redux/Apis/auth.Api";
import { productApi } from "./Apis/product.Api";
import { usersApi } from "./Apis/usersApi";
import { OrderApi } from "./Apis/OrdersApi";
import { dashboardApi } from "./Apis/dashboardApi";
import { giftsApi } from "./Apis/giftsApi";
import { blogsApi } from "./Apis/blogsApi";
import authSlice from "./slice/authSlice"


const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [OrderApi.reducerPath]: OrderApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [giftsApi.reducerPath]: giftsApi.reducer,
    [blogsApi.reducerPath]: blogsApi.reducer,

    Auth: authSlice

  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(OrderApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(giftsApi.middleware)
      .concat(blogsApi.middleware)
});

export default store;
