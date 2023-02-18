import { Box } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { links } from "../../data";

import DashboardNav from "../../components/DashboardNav";

const DashboardDetails = () => {
  return (
    <Box display={{ xl: "flex", sm: "initial" }}>
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/dashboard/">Home</Link>
        <Link to="/dashboard/details">Dashboard Details</Link>
        {links.map((link) => (
          <Link to={link.path}>{link.name}</Link>
        ))}
      </div> */}
      <DashboardNav routes={links} />
      <Outlet />
    </Box>
  );
};

export default DashboardDetails;
