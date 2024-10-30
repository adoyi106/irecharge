import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveHotelsToLocalStorage } from "./useLocalStorage";

//state state for hotel
export interface Hotel {
  id: string;
  name: string;
  address: string;
  country: string;
  category: string;
  createdAt: number;
}
//state for hotells
interface HotelState {
  hotels: Hotel[];
  categories: string[];
}
const initialState: HotelState = {
  hotels:
    typeof window !== "undefined" && localStorage.getItem("hotels")
      ? JSON.parse(localStorage.getItem("hotels") || "[]")
      : [],
  categories: ["1star", "2star", "3star"],
};

const hotelSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    addHotel(state, action: PayloadAction<Hotel>) {
      state.hotels.push(action.payload);
      saveHotelsToLocalStorage(state.hotels);
    },
    deleteHotel(state, action: PayloadAction<string>) {
      state.hotels = state.hotels.filter(
        (hotel) => hotel.id !== action.payload
      );
      saveHotelsToLocalStorage(state.hotels);
    },
    updateHotel(state, action: PayloadAction<Hotel>) {
      const index = state.hotels.findIndex(
        (hotel) => hotel.id === action.payload.id
      );
      if (index !== -1) {
        state.hotels[index] = action.payload;
        saveHotelsToLocalStorage(state.hotels);
      }
    },
  },
});
export const { addHotel, deleteHotel, updateHotel } = hotelSlice.actions;
export default hotelSlice.reducer;

// Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
