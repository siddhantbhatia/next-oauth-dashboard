import { Box, Typography } from "@mui/material";
import LoginButton from "@app/ui/login/login-button";
import { Suspense } from "react";

export default function Login() {
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
