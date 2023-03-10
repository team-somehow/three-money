import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AccountListItem from "../../components/AccountListItem";
import DetailsCard from "../../components/DetailsCard";
import { CreditDataContext } from "../../contexts/CreditDataContextProvider";

// from data.accounts from each account currenttime-account start time

const firebaseStructure = {
    arcanaUid: "hussain",
    pan: "hussain",
    personalDetails: {
        incomeDetails: {
            yearlyIncome: 1000,
        },
    },
    accounts: [
        {
            bankProvider: "three-bank",
            accountStartTime: new Date("2022"),
            loans: [
                {
                    loanType: "personal",
                    loanId: 69,
                    loanAmount: 100000,
                    loanTenure: 15,
                    paymentsMade: 3,
                    payments: [
                        {
                            year: 2022,
                            calendar: [
                                {
                                    month: "december",
                                    state: "on_time",
                                },
                            ],
                        },
                        {
                            year: 2023,
                            calendar: [
                                {
                                    month: "january",
                                    state: "semi_delayed",
                                },
                                {
                                    month: "february",
                                    state: "delayed",
                                },
                            ],
                        },
                    ],
                },
                {
                    loanType: "home",
                    loanId: 99,
                    loanAmount: 3000000,
                    loanTenure: 4,
                    paymentsMade: 4,
                    payments: [
                        {
                            year: 2022,
                            calendar: [
                                {
                                    month: "august",
                                    state: "on_time",
                                },
                                {
                                    month: "september",
                                    state: "semi_delayed",
                                },
                                {
                                    month: "october",
                                    state: "on_time",
                                },
                                {
                                    month: "november",
                                    state: "on_time",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

const Age = () => {
    const creditDataCtx = useContext(CreditDataContext);

    // const

    return (
        <Box width={"76%"} mx={"auto"}>
            <Box
                sx={{
                    display: "flex",
                    direction: "column",
                    justifyContent: "center",
                    borderRadius: "1vh",
                    px: 4,
                    py: 2,
                    my: 4,
                    mt: 6,
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                }}
            >
                <Typography
                    sx={{
                        fontSize: 40,
                        textAlign: "center",
                    }}
                >
                    Age
                </Typography>
            </Box>

            <DetailsCard
                mainHeading={"Medium Impact"}
                lastUpdated={JSON.stringify(
                    creditDataCtx.userCreditRequest[0].timestamp
                )}
                label={"Adept"}
                labelBackground={"green"}
                leftHeadingNumber={1}
                leftHeadingTitle={"Active Accounts"}
                rightHeadingNumber={`1y 3m`}
                rightHeadingTitle={"Age of Accounts"}
            />
            <Box>
                <Typography variant="h4">Your Accounts</Typography>
                <AccountListItem
                    bankName={"Three Bank"}
                    cardNumber={"**** *890"}
                    isActive={true}
                />
            </Box>
        </Box>
    );
};

export default Age;
