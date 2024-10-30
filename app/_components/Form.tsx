import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_store/store";
import { addHotel, Hotel, updateHotel } from "../_store/hoteSlice";

interface HotelDialogProps {
  open: boolean;
  hotel: Hotel | null;
  onClose: () => void;
}
interface City {
  country: string;
}
export default function Form({ open, hotel, onClose }: HotelDialogProps) {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.hotels.categories);
  const [loading, setLoading] = useState(false);
  //Set form data
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    address: "",
    category: "",
  });
  const [countries, setCountries] = useState<string[]>([]);

  console.log(categories);
  //Control data when hotel is created or edited
  useEffect(
    function () {
      if (hotel) {
        setFormData({
          name: hotel.name || "",
          address: hotel.address || "",
          country: hotel.country || "",
          category: hotel.category || "",
        });
      } else {
        setFormData({ name: "", country: "", address: "", category: "" });
      }
    },
    [hotel]
  );
  //   get countries
  useEffect(function () {
    async function fetchCountries() {
      setLoading(true);
      try {
        const res = await fetch(
          "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
        );
        const data: City[] = await res.json();

        const uniqueCountries = Array.from(
          new Set(data.map((city: any) => city.country))
        );
        setLoading(false);
        setCountries(uniqueCountries);

        // console.log(uniqueCountries);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCountries();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.country ||
      !formData.address ||
      !formData.category
    ) {
      return;
    }

    const hotelData: Hotel = {
      id: hotel?.id || crypto.randomUUID(),
      ...formData,
      createdAt: hotel?.createdAt || Date.now(),
    };
    if (hotel) {
      dispatch(updateHotel(hotelData));
    } else {
      dispatch(addHotel(hotelData));
    }
    onClose();
  }
  return (
    <Dialog open={open} onClose={onClose} key={hotel?.id}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add hotel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Hotel name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          <TextField
            select
            label="country"
            value={formData.country}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, country: e.target.value }))
            }
            SelectProps={{
              native: true,
            }}
            fullWidth
            required
            // disabled={loading}
            margin="dense"
          >
            <option value="" disabled>
              Select a country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
            {/* {loading ? (
              <MenuItem>
                <CircularProgress size={24} />
              </MenuItem>
            ) : (
              countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))
            )} */}
          </TextField>
          <TextField
            label="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            fullWidth
            multiline
            rows={2}
          />

          <TextField
            select
            label="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            fullWidth
            margin="dense"
            required
          >
            <option value="" disabled>
              Select hotel category
            </option>
            {categories.map((category: any) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
              // <option key={category} value={category}>
              //   {category}
              // </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {hotel ? "Update" : "Add"} Hotel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
