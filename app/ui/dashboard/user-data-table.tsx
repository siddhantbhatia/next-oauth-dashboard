"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

import { DashboardProps } from "./types";
import { UserData } from "@app/types/user";
import getSingleUserData from "@app/data/get-single-user-data";

export default function UserDataTable(props: DashboardProps) {
  const [userData, setUserData] = useState<UserData[]>(props.userData);
  const [unmaskedRows, setUnmaskedRows] = useState(new Set<UserData["id"]>());

  const fetchOnDemandData = async (id: UserData["id"]) => {
    const singleUserData = await getSingleUserData(id);

    const maskedUserData = userData.filter((data) => data.id === id)[0];
    maskedUserData.email = singleUserData.email;

    setUserData([...userData]);
  };

  const maskOnDemandData = async (id: UserData["id"]) => {
    const unMaskedUserData = userData.filter((data) => data.id === id)[0];
    unMaskedUserData.email = "***";

    setUserData([...userData]);
  };
  const onRowClick = (id: UserData["id"]) => {
    if (unmaskedRows.has(id)) {
      unmaskedRows.delete(id);
      maskOnDemandData(id);
    } else {
      unmaskedRows.add(id);

      fetchOnDemandData(id);
    }

    setUnmaskedRows(unmaskedRows);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">First name</TableCell>
              <TableCell align="left">Last name</TableCell>
              <TableCell align="left">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                hover={true}
              >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.first_name}</TableCell>
                <TableCell align="left">{row.last_name}</TableCell>
                <TableCell
                  align="left"
                  data-testid="user-email"
                  onClick={() => onRowClick(row.id)}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  {row.email}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
