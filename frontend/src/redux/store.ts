import { configureStore } from "@reduxjs/toolkit";
import convertFormReducer from "./reducers/convertFormSlice";
import { convertApiSlice } from "./api/convertApiSlice";

export const store = configureStore({
  reducer: {
    convertForm: convertFormReducer,
    [convertApiSlice.reducerPath]: convertApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([convertApiSlice.middleware]);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;