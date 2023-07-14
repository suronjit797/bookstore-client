import { configureStore } from "@reduxjs/toolkit";

import { api } from "./features/api";
import wishListReducer from "./features/wishList/wishListSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishListReducer,

    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
