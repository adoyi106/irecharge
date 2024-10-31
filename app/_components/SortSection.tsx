"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SortSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  // const [sortBy, setSortBy] = useState("");
  const sortBy = searchParams.get("sortBy") || "";
  // function handleSort(sortBy: string) {
  //   console.log(sortBy);
  //   console.log(searchParams);
  // }
  function handleChange(event: SelectChangeEvent) {
    const newSortBy = event.target.value;
    const params = new URLSearchParams();

    params.set("sortBy", newSortBy);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
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
        <MenuItem value="name-asc">Sort by name(A-Z)</MenuItem>
        <MenuItem value="name-desc">Sort by name(Z-A)</MenuItem>
        <MenuItem value="category-asc">Sort by category(A-Z)</MenuItem>
        <MenuItem value="category-desc">Sort by category(Z-A)</MenuItem>
      </Select>
    </FormControl>
  );
}
