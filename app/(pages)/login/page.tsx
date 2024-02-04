import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { Box, Typography } from "@mui/material";
import LoginButton from "@app/ui/login/login-button";
import { authOptions } from "@lib/auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

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
      <Suspense>
        <LoginButton />
      </Suspense>
    </Box>
  );
}
