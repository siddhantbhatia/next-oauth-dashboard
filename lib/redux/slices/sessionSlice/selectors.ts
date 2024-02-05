import type { ReduxState } from "@lib/redux";

export const selectSession = (state: ReduxState) => state.session.value;
