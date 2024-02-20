"use client";

import { useState, useEffect } from "react";

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
import getAllUserData from "@app/data/get-user-data";
import filterUserStringData, {
  FilterRule,
} from "@app/util/filter-user-string-data";

import { DashboardProps } from "./types";
import { UserData } from "@app/types/user";

const filterRules: FilterRule[] = [
  { property: "first_name", regex: "^G", regexFlag: "i" },
  { property: "last_name", regex: "^W", regexFlag: "i" },
];

export default function UserDataTable(props: DashboardProps) {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [maskFlag, setMaskFlag] = useState(true);
  const [unmaskedRows, setUnmaskedRows] = useState(new Set<UserData["id"]>());

  useEffect(() => {
    fetchData([]);
  }, []);

  const fetchData = async (ids: Array<UserData["id"]>) => {
    const userData = await getAllUserData(ids);
    const filteredData = filterUserStringData(filterRules, userData);

    setUserData(filteredData);
  };

  const onRowClick = (id: UserData["id"]) => {
    if (!unmaskedRows.has(id)) {
      unmaskedRows.add(id);
    } else {
      unmaskedRows.delete(id);
    }

    fetchData(Array.from(unmaskedRows));
    setUnmaskedRows(unmaskedRows);
  };

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
                onClick={() => onRowClick(row.id)}
              >
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.first_name}</TableCell>
                <TableCell align="left">{row.last_name}</TableCell>
                <TableCell align="left" data-testid="user-email">
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
