import DashboardHeader from "@app/ui/dashboard/header";
import DashboardSideNav from "@app/ui/dashboard/sidenav";
import { Box } from "@mui/system";

export default async function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <DashboardHeader />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <DashboardSideNav />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: "#80808026", p: 3 }}>
          {children}
        </Box>
      </Box>
      <div
        style={{
          height: "30px",
          width: "100%",
          backgroundColor: "black",
          color: "white",
          padding: "10px 0",
          textAlign: "center",
        }}
      >
        2024 OAuth Dashboard. All Rights Reserved.
      </div>
    </Box>
  );
}
