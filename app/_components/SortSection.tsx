"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

export default function SortSection() {
  const [sortBy, setSortBy] = useState("");
  function handleChange(event: SelectChangeEvent) {
    setSortBy(event.target.value);
  }
  return (
    <FormControl
      size="small"
      sx={{
        minWidth: {
          sm: "100px",
          md: "120px",
        },
      }}
    >
      <InputLabel>SortBy</InputLabel>
      <Select
        labelId="sortBy"
        id="sortBy"
        value={sortBy}
        label="SortBy"
        onChange={handleChange}
      >
        <MenuItem value="star1">star 1</MenuItem>
        <MenuItem value="star2">star 2</MenuItem>
        <MenuItem value="star3">star 3</MenuItem>
      </Select>
    </FormControl>
  );
}
