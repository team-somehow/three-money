import {
    Box,
    Button,
    Paper,
    Typography,
    CircularProgress
} from "@mui/material";
import React, { useState } from "react";
import CustomModal from "./CustomModal";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const AdminApprovalListItem = props => {
    const item = props;
    const [expand, setExpand] = useState(false);

    const requestCreditData = () => {
        setExpand(prev => !prev);
    };

    return (
        <>
            <CustomModal
                open={expand}
                handleClose={(e, r) => setExpand(false)}
                panCardNumber={item.panCardNumber}
                amount={item.loanAmmount}
                tenure={item.loanTenure}
                {...item}
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    marginBottom: "1vh",
                    borderRadius: "1vh",
                    paddingY: "3vh",
                    paddingX: "2vw",
                    mb: 3
                }}
                component={Paper}
            >
                <Box
                    sx={{
                        marginX: "2%",
                        height: "100%",
                        flexGrow: 1,
                        gap: "1.5vh"
                    }}
                >
                    <Typography variant="h4">Loan Id: {item.loanId}</Typography>
                    <Typography variant="body1">
                        Loan Amount: {item.loanAmmount}
                    </Typography>
                </Box>
                <Box width="20%">
                    <Button
                        fullWidth
                        onClick={() => requestCreditData()}
                        sx={{
                            py: 2
                        }}
                        variant="contained"
                        color="success"
                        startIcon={<ArrowOutwardIcon fontSize="large" />}
                    >
                        Approve Loan
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default AdminApprovalListItem;
