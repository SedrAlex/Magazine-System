import React from "react";
import Sidenav from "../../Components/Panel/Sidenav/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../Components/Panel/Navbar/Navbar";
import CountriesList from "./CountriesList";
import { useAppStore } from "../Store";

const Countries = () => {
  return (
    <>
    <div className="bgcolor">
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
        <Box  component="main" sx={{ display: "flex", justifyContent: "center", alignItems: "center",p:3,flexGrow: 0.4, }}>
          <CountriesList />
        </Box>
      </Box>
    </div>
  </>
  );
};

export default Countries;
