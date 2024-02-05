/* Core */
import { configureStore } from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";

/* Instruments */
import { reducer } from "./rootReducer";

export const makeStore = () => {
  return configureStore({
    reducer,
  });
};

export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;

/* Types */
export type ReduxStore = ReturnType<typeof makeStore>;
export type ReduxState = ReturnType<ReduxStore["getState"]>;
export type ReduxDispatch = ReduxStore["dispatch"];
