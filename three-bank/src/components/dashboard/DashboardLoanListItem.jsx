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
                    borderRadius: "1vh",
                    px: 4,
                    py: 2,
                    my: 2,
                    "&:hover": {
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                    },
                }}
                component={Paper}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
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
                    <Button variant="contained" disabled>
                        Status: {item.approvedStatus}
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default DashboardLoanListItem;
