import React from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardNav from "../../components/accounts/DashboardNav";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex" }}>
            <DashboardNav
                routes={[
                    {
                        headingText: "My Account",
                        path: "/dashboard/details",
                        mainIcon: <AccountCircleIcon fontSize="large" />,
                    },
                    {
                        headingText: "Apply Loan",
                        path: "/dashboard/loan",
                        mainIcon: <MonetizationOnIcon fontSize="large" />,
                    },
                    {
                        headingText: "My Loans",
                        path: "/dashboard/loan-payment",
                        mainIcon: <MonetizationOnIcon fontSize="large" />,
                    },
                ]}
            />
            <Outlet />
        </Box>
    );
};

export default Dashboard;
