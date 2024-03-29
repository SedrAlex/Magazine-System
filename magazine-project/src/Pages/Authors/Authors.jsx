import React from "react";
import Sidenav from "../../Components/Panel/Sidenav/Sidenav";
import Box from "@mui/material/Box";
import Navbar from "../../Components/Panel/Navbar/Navbar";
import { useAppStore } from "../Store";
import AuthorsList from "./AuthorsList";

const Authors = () => {
  return (
    <>
    <div className="bgcolor">
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}> */}
        <Box  component="main" sx={{ display: "flex", justifyContent: "center", alignItems: "center",p:3,flexGrow: 0.4, }}>
          <AuthorsList />
        </Box>
      </Box>
    </div>
  </>
  );
};

export default Authors;
