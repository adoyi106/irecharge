import { configureStore } from "@reduxjs/toolkit";
import hotelsReducer from "./hoteSlice";

const store = configureStore({
  reducer: {
    hotels: hotelsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
