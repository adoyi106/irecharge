"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useState } from "react";

export default function FilterSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [filterBy, setFilterBy] = useState("");
  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("category", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }
  function handleChange(event: SelectChangeEvent) {
    setFilterBy(event.target.value);
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
      <InputLabel>FilterBy</InputLabel>
      <Select
        labelId="filterBy"
        id="filterBy"
        value={filterBy}
        label="FilterBy"
        onChange={handleChange}
      >
        <MenuItem value="all" onClick={() => handleFilter("all")}>
          all
        </MenuItem>
        <MenuItem value="1star" onClick={() => handleFilter("1star")}>
          1star
        </MenuItem>
        <MenuItem value="2star" onClick={() => handleFilter("2star")}>
          2star
        </MenuItem>
        <MenuItem value="3star" onClick={() => handleFilter("3star")}>
          3star
        </MenuItem>
      </Select>
    </FormControl>
  );
}
