"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { makeStore, ReduxStore, sessionSlice } from "@lib/redux";
import { Session } from "next-auth";

export const StoreProvider = ({
  session,
  children,
}: React.PropsWithChildren<{ session: Session | null }>) => {
  const storeRef = useRef<ReduxStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(
      sessionSlice.actions.initialialiseSession(session)
    );
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};
