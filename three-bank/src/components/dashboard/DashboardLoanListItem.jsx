import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomModal from "../admin/CustomModal";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const DashboardLoanListItem = props => {
    const item = props;
    const [expand, setExpand] = useState(false);

    const [loading, setLoading] = useState(false);

    const requestCreditData = () => {
        setExpand(prev => !prev);
    };
    const getIconAsPerApprovalState = status => {
        console.log(status);
        if (status == "completed" || status == "approved") {
            return <CheckCircleIcon fontSize="large" color="success" />;
        } else if (status == "waiting") {
            return (
                <HourglassEmptyIcon fontSize="large" sx={{ color: "grey" }} />
            );
        } else {
            return <CancelIcon fontSize="large" sx={{ color: "red" }} />;
        }
    };
    return (
        <>
            <CustomModal
                open={expand}
                handleClose={(e, r) => setExpand(false)}
            />

            <Box
                sx={{
                    display: "flex",
                    direction: "column",
                    justifyContent: "flex-start",
                    borderRadius: "1vh",
                    px: 4,
                    py: 2,
                    my: 2,
                    "&:hover": {
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.12)"
                    }
                }}
                component={Paper}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%"
                    }}
                >
                    <Box>
                        <Typography variant="h4">
                            Loan ID: {item.loanId}
                        </Typography>
                        <Typography
                            variant="h6"
                            display={"flex"}
                            alignItems={"center"}
                        >
                            Loan Amount:
                            <img src="/assets/matic.png" width={"40px"} />
                            {item.loanAmmount}
                        </Typography>
                    </Box>
                    <Box
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                    >
                        {getIconAsPerApprovalState(item.approvedStatus)}
                        <Box height={"8px"}></Box>
                        Status: {item.approvedStatus}
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default DashboardLoanListItem;
