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
  Switch,
  FormControlLabel,
} from "@mui/material";
import Image from "next/image";

import { DashboardProps } from "./types";

export default function UserDataTable({ userData }: DashboardProps) {
  const [maskFlag, setMaskFlag] = useState(true);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <FormControlLabel
        control={
          <Switch
            checked={maskFlag}
            onChange={() => {
              setMaskFlag(!maskFlag);
            }}
            name="mask-switch"
            inputProps={{ "aria-label": "controlled" }}
          />
        }
        label="Mask emails"
      />
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
              >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.first_name}</TableCell>
                <TableCell align="left">{row.last_name}</TableCell>
                <TableCell align="left" data-testid="user-email">
                  {maskFlag ? "***" : row.email}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
