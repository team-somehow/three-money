import { Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import AccountListItem from "../../components/AccountListItem";
import DetailsCard from "../../components/DetailsCard";
import { CreditDataContext } from "../../contexts/CreditDataContextProvider";

const Age = () => {
  const creditDataCtx = useContext(CreditDataContext);

  return (
    <Box width={"76%"} m={"auto"}>
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
      <Box>
        <Typography variant="h4">Your Accounts</Typography>
        <AccountListItem
          icon="/assets/hdfc_logo.png"
          bankName={"HDFC Bank"}
          cardNumber={"**** *890"}
          isActive={true}
        />
      </Box>
    </Box>
  );
};

export default Age;
