import React, { useState } from "react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardNav from "../../components/accounts/DashboardNav";
import { Box, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ChatBot from "react-simple-chatbot";
const steps = [
    {
        id: "0",
        message: "Welcome to Your personal Assitant",
        trigger: "1"
    },
    {
        id: "1",
        message: "Choose one of the options",
        trigger: "2"
    },
    {
        id: "2",
        options: [
            { value: 1, label: "Exit", trigger: "3" },
            { value: 2, label: "Number 2", trigger: "1" },
            { value: 3, label: "Number 3", trigger: "1" }
        ]
    },

    {
        id: "3",
        message: "Adios Amigo",
        end: true
    }
];
const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: "flex" }}>
            <DashboardNav
                routes={[
                    {
                        headingText: "My Account",
                        path: "/dashboard/details",
                        mainIcon: <AccountCircleIcon fontSize="large" />
                    },
                    {
                        headingText: "Apply Loan",
                        path: "/dashboard/loan",
                        mainIcon: <ArrowOutwardIcon fontSize="large" />
                    },
                    {
                        headingText: "My Loans",
                        path: "/dashboard/loan-payment",
                        mainIcon: <MonetizationOnIcon fontSize="large" />
                    }
                ]}
            />

           
            <Outlet />
        </Box>
    );
};

export default Dashboard;
