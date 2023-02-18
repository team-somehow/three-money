import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Link } from "react-router-dom";

function AccountListItem({
    icon,
    bankName,
    cardNumber,
    isActive,
    enquiryDate,
    onClickHandle,
}) {
    console.log(icon);
    return (
        <Box my={2} mx={4} data-aos="fade-down">
            <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                <Box display={"flex"} alignItems={"center"}>
                    <Box>
                        {icon ? (
                            <img
                                style={{
                                    width: "50px",
                                }}
                                src={`${icon}`}
                            />
                        ) : (
                            <AccountBalanceIcon
                                color="primary"
                                sx={{
                                    fontSize: "42px",
                                }}
                            />
                        )}
                    </Box>
                    <Box ml={3}>
                        <Typography variant="h6" fontWeight={"bold"}>
                            {bankName}
                        </Typography>
                        <Box display={"flex"}>
                            <Typography>Loan ID: </Typography>
                            <Typography>{cardNumber}</Typography>
                        </Box>
                        <Box display={"flex"}>
                            <Typography>
                                {enquiryDate ? "Enquired on: " : "Status: "}
                            </Typography>
                            <Typography
                                color={isActive ? "green" : "red"}
                                fontWeight={"bold"}
                            >
                                {enquiryDate
                                    ? enquiryDate
                                    : isActive
                                    ? " Active"
                                    : " Pending"}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {onClickHandle ? (
                    <div onClick={onClickHandle} style={{ cursor: "pointer" }}>
                        <ArrowForwardIosIcon />
                    </div>
                ) : (
                    <Box>
                        <ArrowForwardIosIcon />
                    </Box>
                )}
            </Box>
            <Divider />
        </Box>
    );
}

export default AccountListItem;
