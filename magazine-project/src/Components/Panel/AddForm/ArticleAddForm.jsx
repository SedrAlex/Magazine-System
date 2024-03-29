import React, { useEffect, useRef, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useArticleStore } from "../../../Pages/Store";
import axios from "axios";
import Swal from "sweetalert2";
import QuillEditorToolbar from "../Text-editor/QuillEditorToolbar";
import Editor from "../Editor/Editor";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ArticleAddForm = ({fid, closeEvent }) => {
  const imageRef = useRef();
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");

  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedcountryName, setSelectedCountryName] = useState(""); // This will hold the selected category name

  const [writers, setWriters] = useState([]);
  const [writer, setWriter] = useState("");
  const [selectedwriterName, setSelectedwriterName] = useState(""); // This will hold the selected category name

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // This will hold the selected category name

  const [content, setEditorContent] = useState("");

  const [image, setImage] = useState(null);

  //   const [rows, setRows] = useState([]);
  const setRows = useArticleStore((state) => state.setRows);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleBreifChange = (event) => {
    setBrief(event.target.value);
  };
  // const handleCategoryChange = (event) => {

  //   setCategory(event.target.value);
  // };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setCategory(selectedValue);

   

    // Find the selected category name from the original list of categories
    const selectedCategory = categories.find((cat) => cat.id === selectedValue);
    if (selectedCategory) {
      setSelectedCategoryName(selectedCategory.categoryName);
    }
  };
  const handleCountryChange = (event) => {
    const selectedValue = event.target.value;
    setCountry(selectedValue);
    // Find the selected category name from the original list of categories
    const selectedCountry = countries.find(
      (country) => country.id === selectedValue
    );
    if (selectedCountry) {
      setSelectedCountryName(selectedCountry.countryName);
    }
  };

  const handleWriterChange = (event) => {
    const selectedValue = event.target.value;
    setWriter(selectedValue);
    // Find the selected category name from the original list of categories
    const selectedWriter = writers.find(
      (writer) => writer.id === selectedValue
    );
    if (selectedWriter) {
      setSelectedwriterName(selectedWriter.writerName);
    }
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  const getArticles = () => {
    axios
      .get(
        "https://www.tanaghomtech.com/magazine/public/api/article?include=category,country,writer"
      )
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

  const getCategories = () => {
    axios
      .get("https://www.tanaghomtech.com/magazine/public/api/category")
      .then((response) => {
        console.log(response.data.data);
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        console.log(data);
        setCategories(data); // Assuming the data is an array of categories
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };

  const getWriters = () => {
    axios
      .get("https://www.tanaghomtech.com/magazine/public/api/writer")
      .then((response) => {
        console.log(response.data.data);
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        console.log(data);
        setWriters(data); // Assuming the data is an array of categories
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
  const getCountries = () => {
    axios
      .get("https://www.tanaghomtech.com/magazine/public/api/country")
      .then((response) => {
        console.log(response.data.data);
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        console.log(data);
        setCountries(data); // Assuming the data is an array of categories
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  };
  const createArticle = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("accessToken"); // Retrieve the token from local storage

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category_id", category);
    formData.append("country_id", country);
    formData.append("writer_id", writer);
    formData.append("brief", brief);

    formData.append("content", content); // Append the editor's content

    // Append the image file to formData
    formData.append("imageLink", image); // Assuming `image` is the state variable holding the file
    axios
      .post(
        "https://www.tanaghomtech.com/magazine/public/api/article",
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
        getArticles();
        closeEvent();
        Swal.fire("تم اضافة المقال", "تمت اضافة المقال بشكل صحيح", "success");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        closeEvent();
        Swal.fire("Error", error.message, "error");
      });
  };

  useEffect(() => {
    getCategories();
    getWriters();
    getCountries();
  }, []);
  return (
    <>
      <Box
        sx={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: 2,
        }}
      />
      <Typography variant="h5" align="center">
        اضافة المقال
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
            fullWidth
            id="outlined-basic"
            label="العنوان"
            variant="outlined"
            size="small"
            onChange={handleTitleChange}
            value={title}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">الفئة</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={category}
              label="الفئة"
              onChange={handleCategoryChange}
            >
              {categories &&
                categories.length > 0 &&
                categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.categoryName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">الكاتب</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={writer}
              label="الكاتب"
              onChange={handleWriterChange}
            >
              {writers &&
                writers.length > 0 &&
                writers.map((writer) => (
                  <MenuItem key={writer.id} value={writer.id}>
                    {writer.writerName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-select-small-label">الدولة</InputLabel>
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={country}
              label="الدولة"
              onChange={handleCountryChange}
            >
              {countries &&
                countries.length > 0 &&
                countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.countryName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="الموجز"
            variant="outlined"
            size="small"
            onChange={handleBreifChange}
            value={brief}
            sx={{ minWidth: "100%" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label">
            تحميل صورة المقال
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

        <Grid
          item
          xs={12}
          sx={{
            p: 2,
          }}
        >
          <Editor fid={fid} onChange={handleEditorChange} />{" "}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
            <Button variant="contained" onClick={createArticle}>
              اضافة
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default ArticleAddForm;
