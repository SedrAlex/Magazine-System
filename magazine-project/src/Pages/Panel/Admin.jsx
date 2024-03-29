import React from "react";
import Sidenav from "../../Components/Panel/Sidenav/Sidenav";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Panel/Navbar/Navbar";
import "../../Dash.css"
const Admin = () => {
  return (
    <>
    <div className="bgcolor">
      {/* <Navbar  /> */}
      <Sidenav />
      <Outlet />
      </div>
    </>
  );
};

export default Admin;
