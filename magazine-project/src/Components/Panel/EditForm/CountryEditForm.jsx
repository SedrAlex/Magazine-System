import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppStore } from "../../../Pages/Store";
import axios from "axios";
import Swal from "sweetalert2";

const CountrytEditForm = ({fid, closeEvent }) => {
  const [name, setName] = useState("");
//   const [rows, setRows] = useState([]);
  const setRows = useAppStore((state) => state.setRows);

  useEffect(() => {
    console.log("FID: " + fid.id );
    setName(fid.countryName)
  },[])
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const getCountries= () => {
    axios
      .get("https://www.tanaghomtech.com/magazine/public/api/country")
      .then((response) => {
        console.log(response.data.data);
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setRows(data); // Assuming the data is an array of categories
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };


  const updateCountry = () => {
    const token = localStorage.getItem("accessToken"); // Retrieve the token from local storage

    axios
      .put(
        `https://www.tanaghomtech.com/magazine/public/api/country/${fid.id}`,
        { countryName: name },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        getCountries()
        closeEvent();
        Swal.fire("تم تعديل اسم الدولة", "تم تعديل اسم الدولة بشكل صحيح", "success");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        closeEvent();

        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
      تعديل اسم الدولة
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={20} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="اسم الدولة"
            variant="outlined"
            size="small"
            onChange={handleNameChange}
            value={name}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        {/* <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="اسم الفئة"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="outlined-basic"
            label="اسم الفئة"
            variant="outlined"
            size="small"
            sx={{ minWidth: "100%" }}
          />
        </Grid> */}
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={updateCountry}>
            تعديل
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default CountrytEditForm;
