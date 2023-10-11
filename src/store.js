import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import podcastsReducer from "./slices/podcastsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    podcasts: podcastsReducer,
  },
});

export default store;
