import { Hotel } from "./hoteSlice";

export function saveHotelsToLocalStorage(hotels: Hotel[]) {
  localStorage.setItem("hotels", JSON.stringify(hotels));
}
