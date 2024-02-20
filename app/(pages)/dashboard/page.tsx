import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import getAllUserData from "@app/data/get-all-user-data";
import filterUserStringData, {
  FilterRule,
} from "@app/util/filter-user-string-data";
import UserDataTable from "@app/ui/dashboard/user-data-table";

const filterRules: FilterRule[] = [
  { property: "first_name", regex: "^G", regexFlag: "i" },
  { property: "last_name", regex: "^W", regexFlag: "i" },
];

export default async function DashboardHomePage() {
  const userData = await getAllUserData();
  const filteredData = filterUserStringData(filterRules, userData);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Typography component="h2" variant="h5">
        User data
      </Typography>
      <Typography component="h3" variant="subtitle1">
        The data has been filtered for first name starting with &quot;G&quot; or
        last name &quot;W&quot;
      </Typography>
      <Typography component="h4" variant="subtitle2">
        Click on the email cell to mask/unmask the email address
      </Typography>
      <UserDataTable userData={filteredData} />
    </Box>
  );
}
