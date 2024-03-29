import React, { forwardRef, useState } from "react";
import bgimg from "../../assets/background.jpeg";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import bg from "../../assets/flag.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";

const darktheme = createTheme({
  palette: {
    mode:"dark"
  },
});

const boxstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: "75%",
  height: "70%",
  bgcolor: "background.paper",
  boxshadow: 24,
};

const center = {
  position: "relative",
  top: "50%",
  left: "37%",
};

// async function loginUser(credentials) {
//   try {
//     const response = await axios.post('https://www.tanaghomtech.com/magazine/public/api/login', credentials, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.log(error.response); // Access the error response object
//     throw error; // Re-throw the error so it can be caught by the caller
//   }
// }

async function loginUser(credentials) {

  const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  return fetch('https://www.tanaghomtech.com/magazine/public/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': csrfToken


    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`); // Log the username and password

    const response = await loginUser({
      email,
      password
    });
    console.log("response:",response); // Log the entire response

    if ('access_token' in response) {
      Swal.fire("Success", "Welcome to admin panel", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        localStorage.setItem('accessToken', response['access_token']);
        // localStorage.setItem('user', JSON.stringify(response['user']));
        navigate('/admin/categories'); // Use navigate instead of window.location.href
      });
    } else {
      Swal.fire("Failed", "error");
    }
  }
  return (
    <>
      <div
        style={{
          backgroundSize: "cover",
          backgroundColor:"#f5f5f5",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <Box sx={boxstyle}>
          <Grid container>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "cover",
                  marginTop: "80px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  height: "50vh",
                  color: "#f5f5f5",
                }}
              ></Box>
            </Grid>
            <Grid item xs={12} sm={12} lg={6}>
              <Box
                style={{
                  backgroundSize: "cover",
                  height: "70vh",
                  minHeight: "500px",
                  backgroundColor: "#d00c06",
                }}
              >
                <ThemeProvider theme={darktheme}>
                <Container>
                  <Box height={35} />
                  <Box sx={center}>
                    <Avatar sx={{ ml: "35px", mb: "4px", bgcolor: "#ffffff" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h4">
                      تسجيل دخول
                    </Typography>
                  </Box>
                  <Box
                   component="form"
                   noValidate
                   onSubmit={handleSubmit}
                   sx={{ mt : 2 }}
                  >
                  <Box height={35} />
                  <Grid container spacing={1}>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                    
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="البريد الالكتروني"
                        name="email"
                        autoComplete="email"
                        onChange={e => setEmail(e.target.value)}

                       
                      
                     />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="كلمة المرور"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={e => setPassword(e.target.value)}

                      />
                    </Grid>
                    <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
                     <Button
                      type="submit"
                      variant="contained"
                      fullWidth={true}                     
                      size="large"
                      sx={{
                       mt:"10px",
                       mr:"20px",
                       borderRadius:28,
                       color:"#000",
                       minWidth:"170px",
                       backgroundColor:"#f9f2f2",
                      }}
                     >
                     تسجيل دخول
                     </Button>
                    </Grid>

                  </Grid>
                  </Box>
                </Container>
                </ThemeProvider>
               
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Login;
