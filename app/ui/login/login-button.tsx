"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Button } from "@mui/material";

export default function LoginButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  return (
    <Button
      onClick={() => signIn("google", { callbackUrl })}
      variant="contained"
    >
      Sign in with Google
    </Button>
  );
}
