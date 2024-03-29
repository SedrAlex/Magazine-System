import React, { useEffect, useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, InputLabel, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAppStore } from "../../../Pages/Store";
import axios from "axios";
import Swal from "sweetalert2";

const AuthorEditForm = ({fid, closeEvent }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null)
  const setRows = useAppStore((state) => state.setRows);

  useEffect(() => {
    console.log("FID: " + fid.id );
    setPhone(fid.phone)
    setEmail(fid.email)
    setName(fid.writerName)


  },[]) 
   const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  // const handlePhotoChange = (event) => {
  //   const file = event.target.files[0];
  //   setImage(event.target.value);
  // };

  const getWriters = () => {
    axios
      .get("https://www.tanaghomtech.com/magazine/public/api/writer")
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

 

  const updateAuthor = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("accessToken"); // Retrieve the token from local storage

    const formData = new FormData();
    formData.append("id", fid.id);
    formData.append("writerName", name);
    formData.append("email", email);
    formData.append("phone", phone);
    // Append the image file to formData
    formData.append("image", image); // Assuming `image` is the state variable holding the file
    axios
      .post(
        "https://www.tanaghomtech.com/magazine/public/api/writer/updateProfile",
        formData, // Use the formData object here

        {
          headers: {
            Authorization: `Bearer ${token}`,
            // 'Content-Type': 'multipart/form-data',

            // Include the token in the Authorization header
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        getWriters();
        closeEvent();
        Swal.fire("تم تعديل معلومات الكاتب", "تم تعديل معلومات الكاتب بشكل صحيح", "success");
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
      تعديل معلومات الكاتب
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
            required
            fullWidth
            id="outlined-basic"
            label="اسم الكاتب"
            variant="outlined"
            size="small"
            onChange={handleNameChange}
            value={name}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            required
            fullWidth
            name="email"
            autoComplete="email"
            label="البريد الالكتروني"
            variant="outlined"
            size="small"
            onChange={handleEmailChange}
            value={email}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="outlined-basic"
            label="رقم الموبايل"
            variant="outlined"
            autoComplete="phone"
            size="small"
            onChange={handlePhoneChange}
            value={phone}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <InputLabel htmlFor="outlined-basic">تسمية الحقل  هنا</InputLabel> */}
          {/* <TextField
            type="file"
            required
            fullWidth
            size="small"
            onChange={handlePhotoChange}
            value={image}
            sx={{ minWidth: "100%" }}
            inputProps={{
              accept: "image/png, image/jpeg, image/gif, image/svg+xml",
            }}
          /> */}

          <Button variant="contained" component="label">
          تعديل الصورة
            <input
              type="file"
              hidden
              required
              fullWidth
              size="small"
              accept="image/*"
              id="select-image"
              style={{ display: "none" }}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={updateAuthor}>
              تعديل 
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthorEditForm;
