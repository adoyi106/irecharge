"use client";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_store/store";
import { HiPencil, HiTrash } from "react-icons/hi";
import { deleteHotel, Hotel } from "../_store/hoteSlice";
import { useState } from "react";
import Form from "./Form";

interface HotelDashboardProps {
  filter: string;
}

export default function HotelTable({ filter }: HotelDashboardProps) {
  const { hotels } = useSelector((state: RootState) => state.hotels);
  const [showForm, setShowForm] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const dispatch = useDispatch();

  //Conditions for filtering
  if (!hotels.length) return null;
  let displayedHotels: Hotel[] | undefined;
  if (filter === "all") displayedHotels = hotels;
  if (filter === "1star")
    displayedHotels = hotels.filter((hotel) => hotel.category === "1star");
  if (filter === "2star")
    displayedHotels = hotels.filter((hotel) => hotel.category === "2star");
  if (filter === "3star")
    displayedHotels = hotels.filter((hotel) => hotel.category === "3star");

  //close show form
  function handleClose() {
    setShowForm(false);
  }

  //function to handle edit click
  function handleEditClick(id: string) {
    //find the particular item id clicked
    const [item] = hotels.filter((hotel) => hotel.id === id);
    console.log(item);
    setShowForm(true);
    setSelectedHotel(item);
  }
  console.log(hotels);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead
          sx={{
            bgcolor: "#fff",
            margin: "2rem",
            textTransform: "uppercase",
            letterSpacing: "0.4px",
            fontWeight: "600",
          }}
        >
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Adress</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Category</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedHotels?.map((hotel) => (
            <TableRow
              key={hotel.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell aria-label="name" component="th" scope="row">
                {hotel.name}
              </TableCell>
              <TableCell aria-label="address" sx={{ color: " #15803d" }}>
                {hotel.address}
              </TableCell>
              <TableCell aria-label="country">{hotel.country}</TableCell>
              <TableCell aria-label="rating">{hotel.category}</TableCell>
              <TableCell>
                {/* {editingHotelIndex === hotel.id ? (
                  <CreateHotelForm
                    hotel={hotel}
                    onUpdateData={(newData) =>
                      dispatch(updateHotel({ newData }))
                    }
                    // onCancel={dispatch(editHotel({ index: null }))}
                  />
                ) : ( */}
                <Button onClick={() => handleEditClick(hotel.id)}>
                  <HiPencil />
                </Button>
                {showForm && (
                  <Form
                    open={showForm}
                    onClose={handleClose}
                    hotel={selectedHotel}
                  />
                )}
                {/* )} */}
                <Button onClick={() => dispatch(deleteHotel(hotel.id))}>
                  <HiTrash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
