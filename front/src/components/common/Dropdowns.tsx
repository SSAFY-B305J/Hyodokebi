import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface DropdownsProps {
  category: string;
  cities: string[];
}

export default function Dropdowns({ category, cities }: DropdownsProps) {
  const [selectedCity, setSelectedCity] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCity(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{category}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCity}
          label={category}
          onChange={handleChange}
        >
          {cities.map((city, index) => (
            <MenuItem
              key={index}
              value={city}
            >
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
