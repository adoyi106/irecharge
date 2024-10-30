"use client";
import { Button } from "@mui/material";
import SortSection from "./SortSection";
import FilterSection from "./FilterSection";
import { useState } from "react";
import Form from "./Form";

export default function HotelOperations() {
  const [showForm, setShowForm] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  function handleAddHotel() {
    // setSelectedHotel(null);
    setShowForm(true);
  }
  function handleCloseForm() {
    setShowForm(false);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "1.8rem",
        justifyContent: "flex-end",
        paddingBottom: "1.5rem",
      }}
    >
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
        }}
        onClick={handleAddHotel}
      >
        Add hotel
      </Button>
      {showForm && (
        <Form open={showForm} onClose={handleCloseForm} hotel={selectedHotel} />
      )}
      <SortSection />
      <FilterSection />
    </div>
  );
}
