import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { albumsApi } from "./apis/albumsApi";

const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer, // or albums: albumsApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(albumsApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store };
export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks/removeUser";
export {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from "./apis/albumsApi";
