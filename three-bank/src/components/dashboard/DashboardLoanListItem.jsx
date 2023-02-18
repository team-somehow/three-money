import { Box, Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomModal from "../admin/CustomModal";
const DashboardLoanListItem = (props) => {
    const item = props;
    const [expand, setExpand] = useState(false);

    const [loading, setLoading] = useState(false);

    const requestCreditData = () => {
        setExpand((prev) => !prev);
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
                    marginBottom: "1vh",
                    borderRadius: "1vh",
                    paddingY: "3vh",
                    paddingX: "2vw",
                    mb: 3,
                }}
                component={Paper}
                // elevation={6}
                // className={"awesome-bg-0"}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginX: "2%",
                        height: "100%",
                        flexGrow: 1,
                        gap: "1.5vh",
                    }}
                >
                    <Typography variant="body1">
                        Loan ID: {item.loanId}
                    </Typography>
                    <Button variant="contained" disabled>
                        Status: {item.approvedStatus}
                    </Button>
                </Box>
                <Box>
                    <Typography>Loan Amount:{item.loanAmmount}</Typography>
                </Box>
            </Box>
        </>
    );
};

export default DashboardLoanListItem;
