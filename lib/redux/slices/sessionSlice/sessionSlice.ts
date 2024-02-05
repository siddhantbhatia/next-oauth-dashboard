import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Session } from "next-auth";

const initialState: SessionState = {
  value: null,
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    initialialiseSession: (state, action: PayloadAction<Session | null>) => {
      state.value = action.payload;
    },
    clearSession: (state) => {
      state.value = null;
    },
  },
});

/* Types */
export interface SessionState {
  value: Session | null;
}
