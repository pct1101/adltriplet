import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import "../../../css/index/autocomplete.css";

const LocationDropdown = () => {
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);

  const locations = [
    {
      label: "TP. Hồ Chí Minh",
      value: "TP.HCM",
      districts: [
        { label: "Quận Bình Thạnh", value: "BinhThanh" },
        { label: "Quận 1", value: "Quan1" },
        { label: "Quận 2", value: "Quan2" },
      ],
    },
    {
      label: "Hà Nội",
      value: "HaNoi",
      districts: [
        { label: "Quận Ba Đình", value: "BaDinh" },
        { label: "Quận Hoàn Kiếm", value: "HoanKiem" },
      ],
    },
    {
      label: "Đà Nẵng",
      value: "DaNang",
      districts: [
        { label: "Quận Hải Châu", value: "HaiChau" },
        { label: "Quận Sơn Trà", value: "SonTra" },
      ],
    },
    {
      label: "Cần Thơ",
      value: "CanTho",
      districts: [
        { label: "Quận Ninh Kiều", value: "NinhKieu" },
        { label: "Quận Cái Răng", value: "CaiRang" },
      ],
    },
  ];

  // Default selected province (e.g., Hồ Chí Minh)
  const defaultProvince = locations[0];

  // Handle province change
  const handleProvinceChange = (event, newValue) => {
    setProvince(newValue); // Set selected province
    setDistrict(null); // Reset district when province changes
  };

  return (
    <div style={{ width: "300px" }}>
      {/* Province Dropdown */}
      <Autocomplete
        className="district"
        options={locations}
        value={province || defaultProvince} // Default to Hồ Chí Minh
        onChange={handleProvinceChange}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Xóa border
                },
                "&:hover fieldset": {
                  border: "none", // Xóa border khi hover
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Xóa border khi focus
                },
              },
            }}
          />
        )}
      />

      {/* District Dropdown (only shows when a province is selected) */}
      {province && (
        <Autocomplete
          className="district1"
          options={province.districts}
          value={district}
          onChange={(event, newValue) => setDistrict(newValue)}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              className="district"
              label="Chọn quận huyện"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none", // Xóa border
                  },
                  "&:hover fieldset": {
                    border: "none", // Xóa border khi hover
                  },
                  "&.Mui-focused fieldset": {
                    border: "none", // Xóa border khi focus
                  },
                },
              }}
            />
          )}
        />
      )}
    </div>
  );
};

export default LocationDropdown;
