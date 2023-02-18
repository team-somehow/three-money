import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import AccountListItem from "../../components/AccountListItem";
import DetailsCard from "../../components/DetailsCard";

import AppreciateCard from "../../components/AppreciateCard";
import { CreditDataContext } from "../../contexts/CreditDataContextProvider";

const Age = () => {
    const creditDataCtx = useContext(CreditDataContext);

    return (
        <Box width={"76%"} mx={"auto"}>
            <DetailsCard
                mainHeading={"Medium Impact"}
                lastUpdated={JSON.stringify(
                    creditDataCtx.userCreditRequest[0].timestamp
                )}
                label={"Excellent"}
                labelBackground={"green"}
                leftHeadingNumber={1}
                leftHeadingTitle={"Active Accounts"}
                rightHeadingNumber={"0"}
                rightHeadingTitle={"Closed Accounts"}
            />
            <AppreciateCard
                headingText={"Credit Card portfolio"}
                subHeading={
                    "You only have credit card accounts. This is good starting point"
                }
                label={""}
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
