import { sessionSlice } from "./slices";
import { locationSlice } from "./slices/locationSlice";

export const reducer = {
  session: sessionSlice.reducer,
  location: locationSlice.reducer,
};
