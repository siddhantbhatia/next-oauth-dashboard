"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Box, Button, Typography } from "@mui/material";

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        gap: "8px",
      }}
    >
      <Typography variant="h5" component="h1">
        OAuth Dashboard Login
      </Typography>
      <Button
        onClick={() => signIn("google", { callbackUrl })}
        variant="contained"
      >
        Sign in with Google
      </Button>
    </Box>
  );
}
